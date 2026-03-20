"use server";

import { auth } from "@clerk/nextjs/server";
import { sql } from "./db";
import { generateMockLaunchAssets } from "./mock-ai";
import { generateLaunchAssetsWithAI } from "./ai";

export type Brief = {
  id: string;
  user_id: string;
  title: string;
  notes: string;
  generated_json: Record<string, any> | null;
  created_at: string;
  updated_at: string;
};

export type OnboardingProgress = {
  step1CreatedBrief: boolean;
  step2GeneratedAssets: boolean;
  step3Completed: boolean;
  completed_at: string | null;
};

export async function getBriefsForUser(): Promise<Brief[]> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const rows = await sql`
    SELECT id, user_id, title, notes, generated_json, created_at, updated_at
    FROM briefs
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;

  return rows as Brief[];
}

export async function createBrief(title: string, notes: string): Promise<Brief> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const rows = await sql`
    INSERT INTO briefs (user_id, title, notes)
    VALUES (${userId}, ${title}, ${notes})
    RETURNING id, user_id, title, notes, generated_json, created_at, updated_at
  `;

  return rows[0] as Brief;
}

export async function getBriefById(id: string): Promise<Brief | null> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const rows = await sql`
    SELECT id, user_id, title, notes, generated_json, created_at, updated_at
    FROM briefs
    WHERE id = ${id} AND user_id = ${userId}
  `;

  return (rows[0] as Brief) ?? null;
}

export async function updateBriefGeneratedJson(id: string, generatedJson: Record<string, any>): Promise<Brief> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const rows = await sql`
    UPDATE briefs
    SET generated_json = ${JSON.stringify(generatedJson)}, updated_at = NOW()
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id, user_id, title, notes, generated_json, created_at, updated_at
  `;

  return rows[0] as Brief;
}

export async function generateAndUpdateBrief(id: string): Promise<Brief> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const brief = await getBriefById(id);
  if (!brief) throw new Error("Brief not found");

  const generated = process.env.OPENAI_API_KEY
    ? await generateLaunchAssetsWithAI(brief.notes)
    : generateMockLaunchAssets(brief.notes);
  return updateBriefGeneratedJson(id, generated);
}

export async function getOnboardingProgress(): Promise<OnboardingProgress> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const briefs = await sql`
    SELECT id, generated_json
    FROM briefs
    WHERE user_id = ${userId}
  `;

  let stateRows: any[] = [];
  try {
    stateRows = await sql`
      SELECT completed_step_3, completed_at
      FROM onboarding_state
      WHERE user_id = ${userId}
    `;
  } catch (err: any) {
    if (err?.code !== "42P01") throw err;
  }

  const step1CreatedBrief = briefs.length > 0;
  const step2GeneratedAssets = briefs.some((b: any) => b.generated_json != null);
  const step3Completed = (stateRows[0]?.completed_step_3 as boolean) ?? false;
  const completed_at = (stateRows[0]?.completed_at as string) ?? null;

  return {
    step1CreatedBrief,
    step2GeneratedAssets,
    step3Completed,
    completed_at,
  };
}

export async function completeOnboardingStep3(): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await sql`
    INSERT INTO onboarding_state (user_id, completed_step_3, completed_at)
    VALUES (${userId}, TRUE, NOW())
    ON CONFLICT (user_id)
    DO UPDATE SET completed_step_3 = TRUE, completed_at = NOW()
  `;
}

export async function createBriefFromTemplate(templateId: string): Promise<Brief> {
  const templates: Record<string, { title: string; notes: string }> = {
    "ai-saas": {
      title: "SignalPath — AI customer research copilot",
      notes:
        "SignalPath is an AI-native customer research copilot for early-stage teams. Founders and PMs paste raw interview notes, call transcripts, and support tickets. SignalPath clusters them into themes and pain points, then turns the insights into launch messaging and onboarding copy you can ship.\n\nTarget users: pre-seed/seed founders and small product teams without research ops.\n\nPositioning: from messy inputs → clear insights → launch-ready messaging. Fast, opinionated, lightweight — not an enterprise BI tool.\n\nKey differentiators: workflow-first (raw notes → themes → prioritized insights → copy), strong defaults for startups, and easy sharing.\n\nTone: practical, direct, founder-friendly.",
    },
    devtool: {
      title: "ShipGuard — CI safety rails for fast-moving teams",
      notes:
        "ShipGuard is a developer tool that prevents risky deploys before they happen. It sits in CI/CD and automatically flags breaking changes (API diffs, missing migrations, risky config changes) with actionable fixes.\n\nTarget users: small engineering teams that move quickly and don’t want to add heavy process.\n\nPositioning: safety rails, not bureaucracy.\n\nDifferentiator: great defaults, fast setup, and clear remediation steps.",
    },
    b2b: {
      title: "OpsBoard — lightweight operations hub for founders",
      notes:
        "OpsBoard is a lightweight operations hub that helps founders keep track of the business without building a full internal tool stack. It centralizes key metrics, tasks, and recurring workflows (billing, support, customer updates).\n\nTarget users: non-technical and technical founders at pre-seed/seed who need operational clarity fast.\n\nPositioning: the simplest way to stay on top of the business.",
    },
  };

  const template = templates[templateId];
  if (!template) throw new Error("Unknown template");
  return createBrief(template.title, template.notes);
}
