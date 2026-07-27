import { NextRequest, NextResponse } from "next/server";
import { guard } from "@/lib/auth";
import { readVisits, aggregate } from "@/lib/visits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Summary aggregates for the dashboard. Passcode required. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const denied = await guard(req, body);
  if (denied) return denied;

  try {
    const visits = await readVisits();
    return NextResponse.json({ ok: true, stats: aggregate(visits) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
