import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const LaunchAssetsSchema = z.object({
  headline: z.string(),
  subheadline: z.string(),
  featureBullets: z.array(z.string()).min(3).max(6),
  onboardingChecklist: z.array(z.string()).min(5).max(12),
  launchEmail: z.object({
    subject: z.string(),
    body: z.string(),
  }),
});

export type LaunchAssets = z.infer<typeof LaunchAssetsSchema>;

export async function generateLaunchAssetsWithAI(notes: string): Promise<LaunchAssets> {
  const prompt = `You are a startup GTM copy and onboarding assistant.

Generate launch-ready assets from the following rough product notes.

Requirements:
- Return concise, high-signal output.
- Headline: punchy, < 70 chars.
- Subheadline: 1 sentence.
- Feature bullets: 3-6 bullets.
- Onboarding checklist: 5-12 steps.
- Launch email: friendly, practical; include greeting + sign-off.

Product notes:\n${notes}`;

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: LaunchAssetsSchema,
    prompt,
  });

  return object;
}
