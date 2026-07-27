import { NextRequest, NextResponse } from "next/server";
import { guard } from "@/lib/auth";
import { storageHealth, queryVisits } from "@/lib/visits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Connection test endpoint. Confirms the deployment can reach its database and
 * actually read data back.
 *
 *   GET /api/health?passcode=YOUR_PASSCODE
 *   GET /api/health          (with header: x-stats-passcode: YOUR_PASSCODE)
 *
 * Returns storage mode, connection status + latency, row counts, a small data
 * sample, and which environment variables are visible to the server.
 */
export async function GET(req: NextRequest) {
  const denied = await guard(req);
  if (denied) return denied;

  const startedAt = Date.now();
  try {
    const health = await storageHealth();
    // Prove we can actually read rows back, not just connect.
    const sample = await queryVisits({ page: 1, pageSize: 3, sort: "newest" });

    return NextResponse.json({
      ok: true,
      checkedAt: new Date().toISOString(),
      tookMs: Date.now() - startedAt,
      ...health,
      dataCheck: {
        canRead: true,
        matchedRows: sample.total,
        sample: sample.rows,
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        checkedAt: new Date().toISOString(),
        tookMs: Date.now() - startedAt,
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
  }
}
