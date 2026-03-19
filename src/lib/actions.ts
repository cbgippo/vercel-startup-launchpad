"use server";

import { auth } from "@clerk/nextjs/server";
import { sql } from "./db";
import { generateMockLaunchAssets } from "./mock-ai";

export type Brief = {
  id: string;
  user_id: string;
  title: string;
  notes: string;
  generated_json: Record<string, any> | null;
  created_at: string;
  updated_at: string;
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

  const generated = generateMockLaunchAssets(brief.notes);
  return updateBriefGeneratedJson(id, generated);
}
