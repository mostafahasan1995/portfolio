import { Prisma } from "@prisma/client";
import type { Visit, VisitQuery, VisitPage, VisitFacets } from "@/lib/visits";
import { getPrisma } from "./client";

/** Whether a database is configured (via DATABASE_URL). */
export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let schemaReady = false;

/**
 * Ensure the `visits` table exists. This lets the analytics work the moment a
 * DATABASE_URL is provided — no manual migration step required. For a managed
 * schema/migration workflow instead, run `npm run db:push` (or use
 * `prisma migrate`) and remove this call.
 */
async function ensureSchema(): Promise<void> {
  if (schemaReady) return;
  const prisma = getPrisma();
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS visits (
      id SERIAL PRIMARY KEY,
      ts TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      ip TEXT,
      browser TEXT,
      os TEXT,
      device TEXT,
      referrer TEXT,
      path TEXT,
      country TEXT
    )`);
  await prisma.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS visits_ts_idx ON visits (ts)`
  );
  schemaReady = true;
}

type VisitRow = {
  ts: Date;
  ip: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  referrer: string | null;
  path: string | null;
  country: string | null;
};

function toVisit(r: VisitRow): Visit {
  return {
    t: Math.floor(r.ts.getTime() / 1000),
    ip: r.ip ?? "",
    b: r.browser ?? "",
    o: r.os ?? "",
    d: r.device ?? "",
    r: r.referrer ?? "",
    p: r.path ?? "",
    c: r.country ?? "",
  };
}

export async function dbInsertVisit(v: Visit): Promise<void> {
  await ensureSchema();
  await getPrisma().visit.create({
    data: {
      ts: new Date(v.t * 1000),
      ip: v.ip,
      browser: v.b,
      os: v.o,
      device: v.d,
      referrer: v.r,
      path: v.p,
      country: v.c,
    },
  });
}

export async function dbReadVisits(limit = 100000): Promise<Visit[]> {
  await ensureSchema();
  const rows = await getPrisma().visit.findMany({
    orderBy: { ts: "asc" },
    take: limit,
  });
  return rows.map(toVisit);
}

/** Translate a VisitQuery into a Prisma WHERE clause. */
function buildWhere(q: VisitQuery): Prisma.VisitWhereInput {
  const where: Prisma.VisitWhereInput = {};
  if (q.browser) where.browser = q.browser;
  if (q.os) where.os = q.os;
  if (q.device) where.device = q.device;
  if (q.country) where.country = q.country;

  const ts: Prisma.DateTimeFilter = {};
  if (q.from !== undefined) ts.gte = new Date(q.from * 1000);
  if (q.to !== undefined) ts.lte = new Date(q.to * 1000);
  if (Object.keys(ts).length > 0) where.ts = ts;

  if (q.q) {
    where.OR = [
      { ip: { contains: q.q, mode: "insensitive" } },
      { referrer: { contains: q.q, mode: "insensitive" } },
      { path: { contains: q.q, mode: "insensitive" } },
    ];
  }
  return where;
}

/** Filtered + paginated visits, computed in SQL. */
export async function dbQueryVisits(q: VisitQuery): Promise<VisitPage> {
  await ensureSchema();
  const prisma = getPrisma();
  const where = buildWhere(q);

  const total = await prisma.visit.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / q.pageSize));
  const page = Math.min(q.page, totalPages);

  const rows = await prisma.visit.findMany({
    where,
    orderBy: { ts: q.sort === "oldest" ? "asc" : "desc" },
    skip: (page - 1) * q.pageSize,
    take: q.pageSize,
  });

  return {
    rows: rows.map(toVisit),
    total,
    page,
    pageSize: q.pageSize,
    totalPages,
  };
}

/** Distinct values for the filter dropdowns. */
export async function dbFacets(): Promise<VisitFacets> {
  await ensureSchema();
  const prisma = getPrisma();
  const [browsers, os, devices, countries] = await Promise.all([
    prisma.visit.findMany({ distinct: ["browser"], select: { browser: true } }),
    prisma.visit.findMany({ distinct: ["os"], select: { os: true } }),
    prisma.visit.findMany({ distinct: ["device"], select: { device: true } }),
    prisma.visit.findMany({ distinct: ["country"], select: { country: true } }),
  ]);
  const clean = (values: (string | null)[]) =>
    Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort();
  return {
    browsers: clean(browsers.map((r) => r.browser)),
    os: clean(os.map((r) => r.os)),
    devices: clean(devices.map((r) => r.device)),
    countries: clean(countries.map((r) => r.country)),
  };
}

/** Delete all rows. Returns the number deleted. */
export async function dbClearVisits(): Promise<number> {
  await ensureSchema();
  const res = await getPrisma().visit.deleteMany({});
  return res.count;
}

/** Connection details with credentials stripped — safe to return over the API. */
function describeConnection(url?: string) {
  if (!url) return null;
  try {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: u.port || "5432",
      database: u.pathname.replace(/^\//, "") || null,
    };
  } catch {
    return null;
  }
}

/** Round-trip the database and report basic stats. */
export async function dbHealth() {
  const prisma = getPrisma();
  const started = Date.now();
  await prisma.$queryRaw`SELECT 1`;
  const latencyMs = Date.now() - started;

  await ensureSchema();
  const [totalVisits, latest, oldest] = await Promise.all([
    prisma.visit.count(),
    prisma.visit.findFirst({ orderBy: { ts: "desc" }, select: { ts: true } }),
    prisma.visit.findFirst({ orderBy: { ts: "asc" }, select: { ts: true } }),
  ]);

  return {
    latencyMs,
    totalVisits,
    firstVisitAt: oldest ? oldest.ts.toISOString() : null,
    latestVisitAt: latest ? latest.ts.toISOString() : null,
    connection: describeConnection(process.env.DATABASE_URL),
  };
}
