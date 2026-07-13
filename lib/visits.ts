import { promises as fs } from "fs";
import path from "path";

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

const MAX_RECORDS = 5000; // hard cap so the file never grows unbounded

function filePath(): string {
  if (process.env.VISITS_FILE) return process.env.VISITS_FILE;
  // Vercel's app dir is read-only; only /tmp is writable (and ephemeral).
  if (process.env.VERCEL) return "/tmp/visits.json";
  return path.join(process.cwd(), ".data", "visits.json");
}

export async function readVisits(): Promise<Visit[]> {
  try {
    const raw = await fs.readFile(filePath(), "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function appendVisit(v: Visit): Promise<void> {
  const fp = filePath();
  await fs.mkdir(path.dirname(fp), { recursive: true });
  const visits = await readVisits();
  visits.push(v);
  const capped = visits.slice(-MAX_RECORDS);
  await fs.writeFile(fp, JSON.stringify(capped));
}

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
