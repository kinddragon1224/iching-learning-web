"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "basic-track-progress";

export function TrackProgressSummary() {
  const [progress, setProgress] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Record<number, boolean>;
      setProgress(parsed || {});
    } catch {
      // ignore
    }
  }, []);

  const completed = useMemo(() => [1, 2, 3, 4].filter((w) => progress[w]).length, [progress]);
  const percent = Math.round((completed / 4) * 100);

  return (
    <section className="rounded-xl border border-[rgba(212,178,106,0.3)] p-4 text-sm">
      <div className="flex items-center justify-between">
        <p><b>트랙 진행도</b></p>
        <p className="text-[var(--text-muted)]">{completed}/4주 완료</p>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-[var(--gold-line)]" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-2 text-xs text-[var(--text-muted)]">현재 진행률 {percent}%</p>
    </section>
  );
}
