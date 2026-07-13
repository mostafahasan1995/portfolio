"use client";

import { useState } from "react";
import { Lock, LoaderCircle, Users, Eye, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Stats } from "@/lib/visits";

export default function StatsPage() {
  const [passcode, setPasscode] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
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
      if (!res.ok) {
        setError(data.error || "Access denied.");
      } else {
        setStats(data.stats);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline dark:text-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        {!stats ? (
          <div className="mx-auto mt-12 max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-6 text-center">
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark">
                <Lock className="h-6 w-6" />
              </span>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Private Analytics</h1>
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
                {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                Unlock
              </button>
            </form>
          </div>
        ) : (
          <Dashboard stats={stats} />
        )}
      </div>
    </main>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</div>
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

function Dashboard({ stats }: { stats: Stats }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Visitor Analytics</h1>

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

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="border-b border-gray-200 p-5 font-bold text-gray-900 dark:border-slate-700 dark:text-white">
          Recent visits
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-slate-800 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2">Time</th>
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
              {stats.recent.map((v, i) => (
                <tr key={i} className="text-gray-700 dark:text-gray-300">
                  <td className="whitespace-nowrap px-4 py-2">{new Date(v.t * 1000).toLocaleString()}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-mono text-xs">{v.ip}</td>
                  <td className="px-4 py-2">{v.b}</td>
                  <td className="px-4 py-2">{v.o}</td>
                  <td className="px-4 py-2">{v.d}</td>
                  <td className="px-4 py-2">{v.c || "—"}</td>
                  <td className="px-4 py-2">{v.r}</td>
                  <td className="px-4 py-2">{v.p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
