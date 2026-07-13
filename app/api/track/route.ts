import { NextRequest, NextResponse } from "next/server";
import { appendVisit, parseUA, type Visit } from "@/lib/visits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const ua = req.headers.get("user-agent") || "";
    const { b, o, d } = parseUA(ua);

    const fwd = req.headers.get("x-forwarded-for") || "";
    const ip = fwd.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

    // The real "where did they come from" is document.referrer (sent as body.ref);
    // the request's Referer header is always this same site (the tracking fetch's page).
    const ref = typeof body.ref === "string" ? body.ref : "";
    const selfHost = (req.headers.get("host") || req.nextUrl.host || "").split(":")[0];
    let refHost = "direct";
    try {
      if (ref) {
        const host = new URL(ref).hostname;
        // same-site / internal navigation counts as direct
        refHost = host === selfHost ? "direct" : host;
      }
    } catch {
      /* ignore malformed referrer */
    }

    const visit: Visit = {
      t: Math.floor(Date.now() / 1000),
      ip,
      b,
      o,
      d,
      r: refHost,
      p: typeof body.path === "string" ? body.path.slice(0, 120) : "/",
      c: req.headers.get("x-vercel-ip-country") || "",
    };

    await appendVisit(visit);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
