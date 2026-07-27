import { NextRequest, NextResponse } from "next/server";
import { guard } from "@/lib/auth";
import { queryVisits, visitFacets, clearVisits } from "@/lib/visits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Parse a date-ish query param ("2026-07-01" or a unix-seconds string). */
function parseTime(value: string | null, endOfDay = false): number | undefined {
  if (!value) return undefined;
  if (/^\d+$/.test(value)) return Number(value);
  const d = new Date(endOfDay ? `${value}T23:59:59` : `${value}T00:00:00`);
  const ms = d.getTime();
  return Number.isNaN(ms) ? undefined : Math.floor(ms / 1000);
}

/**
 * Paginated, searchable, filterable visit log.
 *
 *   GET /api/visits?page=1&pageSize=25&q=chrome&browser=Chrome&device=mobile
 *                  &os=Windows&country=DE&from=2026-07-01&to=2026-07-31&sort=newest
 */
export async function GET(req: NextRequest) {
  const denied = await guard(req);
  if (denied) return denied;

  const sp = req.nextUrl.searchParams;
  try {
    const result = await queryVisits({
      page: Number(sp.get("page")) || 1,
      pageSize: Number(sp.get("pageSize")) || 25,
      q: sp.get("q") ?? undefined,
      browser: sp.get("browser") ?? undefined,
      os: sp.get("os") ?? undefined,
      device: sp.get("device") ?? undefined,
      country: sp.get("country") ?? undefined,
      from: parseTime(sp.get("from")),
      to: parseTime(sp.get("to"), true),
      sort: sp.get("sort") === "oldest" ? "oldest" : "newest",
    });
    const facets = await visitFacets();
    return NextResponse.json({ ok: true, ...result, facets });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}

/**
 * Clear the whole visit log.
 *   DELETE /api/visits   (header: x-stats-passcode, or body { passcode })
 */
export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const denied = await guard(req, body);
  if (denied) return denied;

  try {
    const deleted = await clearVisits();
    return NextResponse.json({ ok: true, deleted });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
