import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { readFileSync } from "fs";
import { join } from "path";

export async function POST() {
  try {
    const schemaPath = join(process.cwd(), "src/lib/schema.sql");
    const schemaSql = readFileSync(schemaPath, "utf8");

    await sql`BEGIN`;
    await sql.unsafe(schemaSql);
    await sql`COMMIT`;

    return NextResponse.json({ success: true, message: "Schema migrated" });
  } catch (error) {
    await sql`ROLLBACK`;
    console.error("Migration failed:", error);
    return NextResponse.json(
      { success: false, error: "Migration failed" },
      { status: 500 }
    );
  }
}
