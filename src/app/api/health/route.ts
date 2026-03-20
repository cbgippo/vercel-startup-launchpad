import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    await sql`SELECT 1 as ok`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
