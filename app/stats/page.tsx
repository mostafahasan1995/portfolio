"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Lock,
  LoaderCircle,
  Users,
  Eye,
  Clock,
  ArrowLeft,
  Search,
  Trash2,
  RefreshCw,
  Database,
  HardDrive,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import type { Stats, Visit, VisitFacets } from "@/lib/visits";

interface Health {
  ok: boolean;
  storage?: "postgres" | "file";
  tookMs?: number;
  database?: {
    connected: boolean;
    latencyMs?: number;
    totalVisits?: number;
    firstVisitAt?: string | null;
    latestVisitAt?: string | null;
    connection?: { host: string; port: string; database: string | null } | null;
    error?: string;
  };
  file?: { path: string; total: number; note?: string };
  fallback?: { storage: string; path: string; total: number };
  env?: {
    hasDatabaseUrl: boolean;
    hasPasscode: boolean;
    onVercel: boolean;
    vercelEnv: string | null;
    region: string | null;
    nodeEnv: string | null;
  };
  dataCheck?: { canRead: boolean; matchedRows: number; sample: Visit[] };
  error?: string;
}

interface VisitsResponse {
  ok: boolean;
  rows: Visit[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  facets: VisitFacets;
  error?: string;
}

const EMPTY_FILTERS = { browser: "", os: "", device: "", country: "" };

export default function StatsPage() {
  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Access denied.");
      else setUnlocked(true);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline dark:text-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        {!unlocked ? (
          <div className="mx-auto mt-12 max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-6 text-center">
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark">
                <Lock className="h-6 w-6" />
              </span>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Private Analytics
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enter the passcode to view visitor statistics.
              </p>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Passcode"
                autoFocus
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {error && <p className="text-sm text-rose-500">{error}</p>}
              <button
                type="submit"
                disabled={loading || !passcode}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 dark:bg-primary-dark dark:hover:bg-blue-600"
              >
                {loading ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
                Unlock
              </button>
            </form>
          </div>
        ) : (
          <Dashboard passcode={passcode} />
        )}
      </div>
    </main>
  );
}

function Dashboard({ passcode }: { passcode: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [health, setHealth] = useState<Health | null>(null);
  const [data, setData] = useState<VisitsResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [notice, setNotice] = useState("");

  // table controls
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const api = useCallback(
    (url: string, init?: RequestInit) =>
      fetch(url, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          "x-stats-passcode": passcode,
          ...(init?.headers || {}),
        },
      }),
    [passcode]
  );

  // debounce the search box
  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(id);
  }, [search]);

  const loadSummary = useCallback(async () => {
    const [s, h] = await Promise.all([
      api("/api/stats", { method: "POST", body: JSON.stringify({}) }).then((r) =>
        r.json()
      ),
      api("/api/health").then((r) => r.json()),
    ]);
    if (s?.stats) setStats(s.stats);
    setHealth(h);
  }, [api]);

  const loadVisits = useCallback(async () => {
    setBusy(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sort,
    });
    if (debounced) params.set("q", debounced);
    if (filters.browser) params.set("browser", filters.browser);
    if (filters.os) params.set("os", filters.os);
    if (filters.device) params.set("device", filters.device);
    if (filters.country) params.set("country", filters.country);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    try {
      const res = await api(`/api/visits?${params.toString()}`);
      const json: VisitsResponse = await res.json();
      setData(json);
      if (json.page && json.page !== page) setPage(json.page);
    } finally {
      setBusy(false);
    }
  }, [api, page, pageSize, sort, debounced, filters, from, to]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    loadVisits();
  }, [loadVisits]);

  const clearLog = async () => {
    setBusy(true);
    try {
      const res = await api("/api/visits", {
        method: "DELETE",
        body: JSON.stringify({}),
      });
      const json = await res.json();
      setNotice(
        json.ok ? `Cleared ${json.deleted} record(s).` : json.error || "Clear failed."
      );
      setConfirmClear(false);
      setPage(1);
      await Promise.all([loadSummary(), loadVisits()]);
    } finally {
      setBusy(false);
      setTimeout(() => setNotice(""), 4000);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setDebounced("");
    setFilters(EMPTY_FILTERS);
    setFrom("");
    setTo("");
    setPage(1);
  };

  const hasFilters = useMemo(
    () =>
      Boolean(
        debounced || filters.browser || filters.os || filters.device || filters.country || from || to
      ),
    [debounced, filters, from, to]
  );

  const facets = data?.facets;
  const showingFrom = data && data.total > 0 ? (data.page - 1) * data.pageSize + 1 : 0;
  const showingTo = data ? Math.min(data.page * data.pageSize, data.total) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Visitor Analytics
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              loadSummary();
              loadVisits();
            }}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
          >
            <RefreshCw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={() => setConfirmClear(true)}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-100 disabled:opacity-50 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-950/70"
          >
            <Trash2 className="h-4 w-4" />
            Clear log
          </button>
        </div>
      </div>

      {notice && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          {notice}
        </div>
      )}

      <HealthPanel health={health} />

      {stats && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard icon={<Eye className="h-4 w-4" />} label="Total visits" value={stats.total} />
            <StatCard icon={<Users className="h-4 w-4" />} label="Unique IPs" value={stats.unique} />
            <StatCard icon={<Clock className="h-4 w-4" />} label="Last 24h" value={stats.last24h} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Breakdown title="Browsers" rows={stats.browsers} />
            <Breakdown title="Operating Systems" rows={stats.os} />
            <Breakdown title="Devices" rows={stats.devices} />
            <Breakdown title="Countries" rows={stats.countries} />
            <Breakdown title="Referrers" rows={stats.referrers} />
            <Breakdown title="Pages" rows={stats.paths} />
          </div>
        </>
      )}

      {/* Visit log */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-gray-200 p-5 dark:border-slate-700">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-gray-900 dark:text-white">Visit log</h3>
            {hasFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline dark:text-primary-dark"
              >
                <X className="h-3.5 w-3.5" />
                Reset filters
              </button>
            )}
          </div>

          {/* Search + filters */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative sm:col-span-2 lg:col-span-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search IP, referrer or path…"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <FilterSelect
              label="Browser"
              value={filters.browser}
              options={facets?.browsers ?? []}
              onChange={(v) => {
                setFilters((f) => ({ ...f, browser: v }));
                setPage(1);
              }}
            />
            <FilterSelect
              label="OS"
              value={filters.os}
              options={facets?.os ?? []}
              onChange={(v) => {
                setFilters((f) => ({ ...f, os: v }));
                setPage(1);
              }}
            />
            <FilterSelect
              label="Device"
              value={filters.device}
              options={facets?.devices ?? []}
              onChange={(v) => {
                setFilters((f) => ({ ...f, device: v }));
                setPage(1);
              }}
            />
            <FilterSelect
              label="Country"
              value={filters.country}
              options={facets?.countries ?? []}
              onChange={(v) => {
                setFilters((f) => ({ ...f, country: v }));
                setPage(1);
              }}
            />
            <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              From
              <input
                type="date"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              To
              <input
                type="date"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </label>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-slate-800 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2">
                  <button
                    onClick={() => setSort(sort === "newest" ? "oldest" : "newest")}
                    className="inline-flex items-center gap-1 hover:text-primary dark:hover:text-primary-dark"
                  >
                    Time {sort === "newest" ? "↓" : "↑"}
                  </button>
                </th>
                <th className="px-4 py-2">IP</th>
                <th className="px-4 py-2">Browser</th>
                <th className="px-4 py-2">OS</th>
                <th className="px-4 py-2">Device</th>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">Referrer</th>
                <th className="px-4 py-2">Path</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {data?.rows.length ? (
                data.rows.map((v, i) => (
                  <tr key={`${v.t}-${i}`} className="text-gray-700 dark:text-gray-300">
                    <td className="whitespace-nowrap px-4 py-2">
                      {new Date(v.t * 1000).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-mono text-xs">{v.ip}</td>
                    <td className="px-4 py-2">{v.b}</td>
                    <td className="px-4 py-2">{v.o}</td>
                    <td className="px-4 py-2">{v.d}</td>
                    <td className="px-4 py-2">{v.c || "—"}</td>
                    <td className="px-4 py-2">{v.r}</td>
                    <td className="px-4 py-2">{v.p}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500"
                  >
                    {busy ? "Loading…" : hasFilters ? "No visits match these filters." : "No visits recorded yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 p-4 dark:border-slate-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {data ? (
              <>
                Showing <strong>{showingFrom}</strong>–<strong>{showingTo}</strong> of{" "}
                <strong>{data.total}</strong>
              </>
            ) : (
              "…"
            )}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200"
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!data || data.page <= 1 || busy}
                className="rounded-lg border border-gray-300 p-1.5 text-gray-600 disabled:opacity-40 dark:border-slate-700 dark:text-gray-300"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-2 text-sm text-gray-600 dark:text-gray-300">
                {data?.page ?? 1} / {data?.totalPages ?? 1}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!data || data.page >= data.totalPages || busy}
                className="rounded-lg border border-gray-300 p-1.5 text-gray-600 disabled:opacity-40 dark:border-slate-700 dark:text-gray-300"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clear confirmation */}
      {confirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
              Clear the visit log?
            </h3>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              This permanently deletes <strong>all</strong> stored visits
              {health?.database?.totalVisits !== undefined
                ? ` (${health.database.totalVisits} records)`
                : ""}
              . This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmClear(false)}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={clearLog}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-50"
              >
                {busy ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HealthPanel({ health }: { health: Health | null }) {
  if (!health) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-400 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        Checking storage connection…
      </div>
    );
  }

  const isDb = health.storage === "postgres";
  const connected = isDb ? Boolean(health.database?.connected) : true;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {isDb ? (
          <Database className="h-4 w-4 text-primary dark:text-primary-dark" />
        ) : (
          <HardDrive className="h-4 w-4 text-amber-500" />
        )}
        <h3 className="font-bold text-gray-900 dark:text-white">
          Storage: {isDb ? "PostgreSQL (Prisma)" : "JSON file"}
        </h3>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            connected
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
              : "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"
          }`}
        >
          {connected ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <XCircle className="h-3.5 w-3.5" />
          )}
          {connected ? "Connected" : "Not connected"}
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3 lg:grid-cols-4">
        {isDb && health.database?.connection && (
          <Field
            label="Database"
            value={`${health.database.connection.database ?? "?"} @ ${health.database.connection.host}:${health.database.connection.port}`}
          />
        )}
        {isDb && health.database?.latencyMs !== undefined && (
          <Field label="Latency" value={`${health.database.latencyMs} ms`} />
        )}
        {isDb && health.database?.totalVisits !== undefined && (
          <Field label="Rows stored" value={String(health.database.totalVisits)} />
        )}
        {!isDb && health.file && (
          <>
            <Field label="File" value={health.file.path} />
            <Field label="Rows stored" value={String(health.file.total)} />
          </>
        )}
        {health.dataCheck && (
          <Field
            label="Read check"
            value={health.dataCheck.canRead ? `OK (${health.dataCheck.matchedRows} rows)` : "failed"}
          />
        )}
        {health.env && (
          <>
            <Field label="DATABASE_URL" value={health.env.hasDatabaseUrl ? "set" : "missing"} />
            <Field
              label="Environment"
              value={
                health.env.onVercel
                  ? `Vercel${health.env.vercelEnv ? ` (${health.env.vercelEnv})` : ""}${health.env.region ? ` · ${health.env.region}` : ""}`
                  : `local (${health.env.nodeEnv ?? "?"})`
              }
            />
          </>
        )}
        {health.database?.latestVisitAt && (
          <Field
            label="Latest visit"
            value={new Date(health.database.latestVisitAt).toLocaleString()}
          />
        )}
      </dl>

      {(health.database?.error || health.error) && (
        <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
          {health.database?.error || health.error}
        </p>
      )}
      {health.fallback && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
          Falling back to the JSON file ({health.fallback.total} rows).
        </p>
      )}
      {!isDb && health.file?.note && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
          {health.file.note}
        </p>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-gray-400 dark:text-gray-500">{label}</dt>
      <dd className="truncate font-medium text-gray-700 dark:text-gray-200" title={value}>
        {value}
      </dd>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={`Filter by ${label}`}
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200"
    >
      <option value="">All {label.toLowerCase()}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value.toLocaleString()}
      </div>
    </div>
  );
}

function Breakdown({ title, rows }: { title: string; rows: [string, number][] }) {
  const max = Math.max(1, ...rows.map((r) => r[1]));
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-3 font-bold text-gray-900 dark:text-white">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-400">No data yet.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map(([label, count]) => (
            <li key={label}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">{label}</span>
                <span className="font-medium text-gray-500 dark:text-gray-400">{count}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
