import { sql } from "@vercel/postgres";
import type { Visit } from "./visits";

/**
 * Durable visit storage backed by Vercel Postgres.
 * Active only when POSTGRES_URL is present (Vercel sets it automatically once
 * you attach a Postgres store). Otherwise the app falls back to a local JSON
 * file — see lib/visits.ts. Rows here are never deleted.
 */

export function hasPostgres(): boolean {
  return Boolean(process.env.POSTGRES_URL);
}

let schemaReady = false;
async function ensureSchema(): Promise<void> {
  if (schemaReady) return;
  await sql`CREATE TABLE IF NOT EXISTS visits (
    id BIGSERIAL PRIMARY KEY,
    ts TIMESTAMPTZ NOT NULL DEFAULT now(),
    ip TEXT,
    browser TEXT,
    os TEXT,
    device TEXT,
    referrer TEXT,
    path TEXT,
    country TEXT
  )`;
  schemaReady = true;
}

export async function pgInsertVisit(v: Visit): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO visits (ts, ip, browser, os, device, referrer, path, country)
    VALUES (to_timestamp(${v.t}), ${v.ip}, ${v.b}, ${v.o}, ${v.d}, ${v.r}, ${v.p}, ${v.c})`;
}

export async function pgReadVisits(limit = 100000): Promise<Visit[]> {
  await ensureSchema();
  const { rows } = await sql`
    SELECT extract(epoch from ts)::bigint AS t, ip, browser, os, device, referrer, path, country
    FROM visits
    ORDER BY ts ASC
    LIMIT ${limit}`;
  return rows.map((r) => ({
    t: Number(r.t),
    ip: r.ip ?? "",
    b: r.browser ?? "",
    o: r.os ?? "",
    d: r.device ?? "",
    r: r.referrer ?? "",
    p: r.path ?? "",
    c: r.country ?? "",
  }));
}
