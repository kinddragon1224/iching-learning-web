"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "basic-track-progress";

type Props = {
  week: 1 | 2 | 3 | 4;
  dailyTask: string;
  nextHref?: string;
};

export function WeekProgressPanel({ week, dailyTask, nextHref }: Props) {
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
  const isDone = !!progress[week];

  const markDone = () => {
    const next = { ...progress, [week]: true };
    setProgress(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  };

  return (
    <section className="paper-panel rounded-xl p-4 space-y-3 text-sm">
      <div className="flex items-center justify-between">
        <p className="font-semibold">학습 HUD</p>
        <p className="text-xs text-[var(--text-muted)]">누적 {completed}/4주</p>
      </div>

      <div>
        <p className="text-xs text-[var(--text-muted)]">오늘 할 일 1개</p>
        <p className="mt-1">{dailyTask}</p>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-[var(--gold-line)]" style={{ width: `${percent}%` }} />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={markDone}
          disabled={isDone}
          className="rounded-lg bg-[var(--gold-line)] px-3 py-2 text-xs font-semibold text-black disabled:opacity-50"
        >
          {isDone ? "이번 주 완료됨" : "이번 주 완료 처리"}
        </button>
        {nextHref && (
          <Link href={nextHref} className="rounded-lg border border-white/30 px-3 py-2 text-xs">
            다음 주로 이동
          </Link>
        )}
      </div>
    </section>
  );
}
