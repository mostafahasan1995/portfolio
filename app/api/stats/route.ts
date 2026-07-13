import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { readVisits, aggregate } from "@/lib/visits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export async function POST(req: NextRequest) {
  const configured = process.env.STATS_PASSCODE;
  if (!configured) {
    return NextResponse.json(
      { error: "Stats passcode is not configured. Set STATS_PASSCODE in your environment." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  const passcode = typeof body.passcode === "string" ? body.passcode : "";

  if (!passcode || !safeEqual(passcode, configured)) {
    // constant-ish delay to slow brute-force attempts
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ error: "Invalid passcode." }, { status: 401 });
  }

  const visits = await readVisits();
  return NextResponse.json({ ok: true, stats: aggregate(visits) });
}
