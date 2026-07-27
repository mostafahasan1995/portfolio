import { promises as fs } from "fs";
import path from "path";
import {
  hasDatabase,
  dbInsertVisit,
  dbReadVisits,
  dbQueryVisits,
  dbClearVisits,
  dbFacets,
  dbHealth,
} from "@/backend/visits";

/** Compact visit record — short keys keep the JSON file small. */
export interface Visit {
  t: number; // unix seconds
  ip: string;
  b: string; // browser
  o: string; // os
  d: string; // device: mobile | tablet | desktop
  r: string; // referrer host ("direct" if none)
  p: string; // path
  c: string; // country code (from Vercel edge header, if present)
}

/** Filter / search / pagination options for the visits table. */
export interface VisitQuery {
  page: number; // 1-based
  pageSize: number;
  q?: string; // free-text search across ip, referrer and path
  browser?: string;
  os?: string;
  device?: string;
  country?: string;
  from?: number; // unix seconds, inclusive
  to?: number; // unix seconds, inclusive
  sort?: "newest" | "oldest";
}

export interface VisitPage {
  rows: Visit[];
  total: number; // rows matching the filters
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Distinct values used to populate the filter dropdowns. */
export interface VisitFacets {
  browsers: string[];
  os: string[];
  devices: string[];
  countries: string[];
}

const MAX_RECORDS = 5000; // hard cap so the JSON file never grows unbounded
export const MAX_PAGE_SIZE = 200;

function filePath(): string {
  if (process.env.VISITS_FILE) return process.env.VISITS_FILE;
  // Vercel's app dir is read-only; only /tmp is writable (and ephemeral).
  if (process.env.VERCEL) return "/tmp/visits.json";
  return path.join(process.cwd(), ".data", "visits.json");
}

async function readVisitsFile(): Promise<Visit[]> {
  try {
    const raw = await fs.readFile(filePath(), "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function readVisits(): Promise<Visit[]> {
  if (hasDatabase()) {
    try {
      return await dbReadVisits();
    } catch {
      /* fall back to the local file if the DB is unreachable */
    }
  }
  return readVisitsFile();
}

export async function appendVisit(v: Visit): Promise<void> {
  if (hasDatabase()) {
    try {
      await dbInsertVisit(v); // durable — never deleted
      return;
    } catch {
      /* fall back to the local file if the DB is unreachable */
    }
  }
  const fp = filePath();
  await fs.mkdir(path.dirname(fp), { recursive: true });
  const visits = await readVisitsFile();
  visits.push(v);
  const capped = visits.slice(-MAX_RECORDS);
  await fs.writeFile(fp, JSON.stringify(capped));
}

/** Normalise raw query params into a safe, clamped VisitQuery. */
export function normalizeQuery(input: Partial<VisitQuery>): VisitQuery {
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Math.floor(Number(input.pageSize) || 25))
  );
  const page = Math.max(1, Math.floor(Number(input.page) || 1));
  const clean = (s?: string) => {
    const v = (s ?? "").trim();
    return v ? v.slice(0, 120) : undefined;
  };
  const num = (n?: number) => (Number.isFinite(Number(n)) ? Number(n) : undefined);
  return {
    page,
    pageSize,
    q: clean(input.q),
    browser: clean(input.browser),
    os: clean(input.os),
    device: clean(input.device),
    country: clean(input.country),
    from: num(input.from),
    to: num(input.to),
    sort: input.sort === "oldest" ? "oldest" : "newest",
  };
}

/** In-memory equivalent of the SQL filter, used by the JSON-file fallback. */
function matches(v: Visit, q: VisitQuery): boolean {
  if (q.browser && v.b !== q.browser) return false;
  if (q.os && v.o !== q.os) return false;
  if (q.device && v.d !== q.device) return false;
  if (q.country && v.c !== q.country) return false;
  if (q.from !== undefined && v.t < q.from) return false;
  if (q.to !== undefined && v.t > q.to) return false;
  if (q.q) {
    const needle = q.q.toLowerCase();
    const hay = `${v.ip} ${v.r} ${v.p}`.toLowerCase();
    if (!hay.includes(needle)) return false;
  }
  return true;
}

/** Paginated + filtered visits. Uses SQL when a database is configured. */
export async function queryVisits(input: Partial<VisitQuery>): Promise<VisitPage> {
  const q = normalizeQuery(input);
  if (hasDatabase()) {
    try {
      return await dbQueryVisits(q);
    } catch {
      /* fall back to the local file if the DB is unreachable */
    }
  }
  const all = await readVisitsFile();
  const filtered = all.filter((v) => matches(v, q));
  filtered.sort((a, b) => (q.sort === "oldest" ? a.t - b.t : b.t - a.t));
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / q.pageSize));
  const page = Math.min(q.page, totalPages);
  const start = (page - 1) * q.pageSize;
  return {
    rows: filtered.slice(start, start + q.pageSize),
    total,
    page,
    pageSize: q.pageSize,
    totalPages,
  };
}

/** Distinct filter values. */
export async function visitFacets(): Promise<VisitFacets> {
  if (hasDatabase()) {
    try {
      return await dbFacets();
    } catch {
      /* fall back to the local file if the DB is unreachable */
    }
  }
  const all = await readVisitsFile();
  const uniq = (get: (v: Visit) => string) =>
    Array.from(new Set(all.map(get).filter(Boolean))).sort();
  return {
    browsers: uniq((v) => v.b),
    os: uniq((v) => v.o),
    devices: uniq((v) => v.d),
    countries: uniq((v) => v.c),
  };
}

/** Delete every stored visit. Returns how many rows were removed. */
export async function clearVisits(): Promise<number> {
  if (hasDatabase()) {
    try {
      return await dbClearVisits();
    } catch {
      /* fall back to the local file if the DB is unreachable */
    }
  }
  const existing = await readVisitsFile();
  const fp = filePath();
  await fs.mkdir(path.dirname(fp), { recursive: true });
  await fs.writeFile(fp, "[]");
  return existing.length;
}

/** Connection/health report — powers the /api/health test endpoint. */
export async function storageHealth() {
  const env = {
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    hasPasscode: Boolean(process.env.STATS_PASSCODE),
    onVercel: Boolean(process.env.VERCEL),
    vercelEnv: process.env.VERCEL_ENV ?? null,
    region: process.env.VERCEL_REGION ?? null,
    nodeEnv: process.env.NODE_ENV ?? null,
  };

  if (hasDatabase()) {
    try {
      const db = await dbHealth();
      return {
        storage: "postgres" as const,
        database: { connected: true, ...db },
        env,
      };
    } catch (e) {
      const file = await readVisitsFile();
      return {
        storage: "postgres" as const,
        database: {
          connected: false,
          error: e instanceof Error ? e.message : String(e),
        },
        fallback: { storage: "file" as const, path: filePath(), total: file.length },
        env,
      };
    }
  }

  const file = await readVisitsFile();
  return {
    storage: "file" as const,
    file: {
      path: filePath(),
      total: file.length,
      note: process.env.VERCEL
        ? "Ephemeral on Vercel — set DATABASE_URL for durable storage."
        : "Local JSON file. Set DATABASE_URL to use Postgres.",
    },
    env,
  };
}

export type StorageHealth = Awaited<ReturnType<typeof storageHealth>>;

/** Minimal, dependency-free user-agent parser (good enough for basic stats). */
export function parseUA(ua: string): { b: string; o: string; d: string } {
  const s = ua || "";
  let b = "Unknown";
  if (/Edg\//.test(s)) b = "Edge";
  else if (/OPR\/|Opera/.test(s)) b = "Opera";
  else if (/Firefox\//.test(s)) b = "Firefox";
  else if (/Chrome\//.test(s) && !/Chromium/.test(s)) b = "Chrome";
  else if (/Chromium/.test(s)) b = "Chromium";
  else if (/Safari\//.test(s) && /Version\//.test(s)) b = "Safari";

  let o = "Unknown";
  if (/Windows NT/.test(s)) o = "Windows";
  else if (/Android/.test(s)) o = "Android";
  else if (/iPhone|iPad|iPod/.test(s)) o = "iOS";
  else if (/Mac OS X/.test(s)) o = "macOS";
  else if (/Linux/.test(s)) o = "Linux";

  let d = "desktop";
  if (/Mobi|iPhone|Android.*Mobile/.test(s)) d = "mobile";
  else if (/iPad|Tablet/.test(s) || (/Android/.test(s) && !/Mobile/.test(s))) d = "tablet";

  return { b, o, d };
}

function tally(visits: Visit[], key: (v: Visit) => string): [string, number][] {
  const m: Record<string, number> = {};
  for (const v of visits) {
    const k = key(v) || "Unknown";
    m[k] = (m[k] || 0) + 1;
  }
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
}

export function aggregate(visits: Visit[]) {
  const now = Date.now() / 1000;
  const dayAgo = now - 86400;
  return {
    total: visits.length,
    unique: new Set(visits.map((v) => v.ip)).size,
    last24h: visits.filter((v) => v.t >= dayAgo).length,
    browsers: tally(visits, (v) => v.b),
    os: tally(visits, (v) => v.o),
    devices: tally(visits, (v) => v.d),
    countries: tally(visits, (v) => v.c).filter(([k]) => k).slice(0, 10),
    referrers: tally(visits, (v) => v.r).filter(([k]) => k && k !== "direct").slice(0, 10),
    paths: tally(visits, (v) => v.p).slice(0, 10),
    recent: [...visits].slice(-60).reverse(),
  };
}

export type Stats = ReturnType<typeof aggregate>;
