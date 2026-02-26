"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HEXAGRAMS } from "@/data/hexagrams";

export default function SearchPage() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    if (!q.trim()) return HEXAGRAMS;
    const t = q.toLowerCase();
    return HEXAGRAMS.filter((h) =>
      [h.nameKo, h.nameEn, h.summary, ...h.keywords, ...h.lines].join(" ").toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <main className="mx-auto max-w-4xl space-y-4 p-6 pt-24">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">괘 검색</h1>
        <p className="text-sm text-[var(--text-muted)]">키워드로 바로 찾고 상세 해석으로 이동해.</p>
      </header>

      <input
        className="w-full rounded-xl border border-[rgba(212,178,106,0.35)] bg-transparent px-4 py-3"
        placeholder="예: 재물, 이직, 리더십, 11"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <p className="text-sm text-[var(--text-muted)]">결과 {results.length}개</p>

      <ul className="space-y-2">
        {results.map((h) => (
          <li key={h.id} className="paper-panel rounded-xl p-4 panel-hover">
            <Link href={`/hexagram/${h.id}`}>
              <p className="font-semibold">
                {h.id}. {h.nameKo} <span className="text-xs text-[var(--text-muted)]">({h.nameEn})</span>
              </p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{h.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
