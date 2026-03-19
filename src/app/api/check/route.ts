import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'briefs'
    `;
    const exists = (result as any[]).length > 0;
    return NextResponse.json({ exists, result });
  } catch (error) {
    console.error("Check failed:", error);
    return NextResponse.json({ error: "Check failed" }, { status: 500 });
  }
}
