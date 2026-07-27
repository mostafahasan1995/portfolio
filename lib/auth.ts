import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

/** Whether an admin passcode is configured (STATS_PASSCODE). */
export function passcodeConfigured(): boolean {
  return Boolean(process.env.STATS_PASSCODE);
}

/** Constant-time comparison of a candidate passcode against STATS_PASSCODE. */
export function verifyPasscode(candidate: string | null | undefined): boolean {
  const configured = process.env.STATS_PASSCODE;
  if (!configured || !candidate) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(configured);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Read the passcode from a request. Header is preferred (it does not end up in
 * access logs); the query param exists so endpoints can be tested straight from
 * a browser address bar on Vercel.
 */
export function extractPasscode(req: NextRequest, body?: unknown): string | null {
  const header = req.headers.get("x-stats-passcode");
  if (header) return header;
  const qp = req.nextUrl.searchParams.get("passcode");
  if (qp) return qp;
  if (body && typeof body === "object" && "passcode" in body) {
    const value = (body as { passcode?: unknown }).passcode;
    if (typeof value === "string") return value;
  }
  return null;
}

/**
 * Returns an error response when the request is not authorised, or null when it
 * is. Usage: `const denied = await guard(req); if (denied) return denied;`
 */
export async function guard(
  req: NextRequest,
  body?: unknown
): Promise<NextResponse | null> {
  if (!passcodeConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "STATS_PASSCODE is not configured on the server. Set it in your environment (.env locally, Environment Variables on Vercel).",
      },
      { status: 503 }
    );
  }
  if (!verifyPasscode(extractPasscode(req, body))) {
    // Small delay to blunt brute-force attempts.
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json(
      { ok: false, error: "Invalid or missing passcode." },
      { status: 401 }
    );
  }
  return null;
}
