"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HEXAGRAMS } from "@/data/hexagrams";

type SectionFilter = "all" | "upper" | "lower";

export default function HexagramListPage() {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState<SectionFilter>("all");

  const filteredBySection = useMemo(() => {
    if (section === "upper") return HEXAGRAMS.filter((h) => h.id <= 30);
    if (section === "lower") return HEXAGRAMS.filter((h) => h.id >= 31);
    return HEXAGRAMS;
  }, [section]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filteredBySection;
    return filteredBySection.filter((h) =>
      [String(h.id), h.nameKo, h.nameEn, h.summary, ...h.keywords].join(" ").toLowerCase().includes(q)
    );
  }, [query, filteredBySection]);

  const randomHexagram = useMemo(() => HEXAGRAMS[Math.floor(Math.random() * HEXAGRAMS.length)], []);

  return (
    <main className="mx-auto max-w-5xl space-y-5 p-6 pt-24">
      <header className="space-y-2">
        <p className="text-sm text-[var(--text-muted)]">전체 학습</p>
        <h1 className="text-2xl font-bold">64괘 목록</h1>
        <p className="text-sm text-[var(--text-muted)]">원하는 괘를 번호/이름/키워드로 찾아 바로 학습해보세요.</p>
      </header>

      <section className="paper-panel rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSection("all")}
            className={`rounded-lg px-3 py-1.5 text-xs border ${section === "all" ? "border-[var(--gold-line)] bg-[rgba(212,178,106,0.14)]" : "border-white/25"}`}
          >
            전체 64괘
          </button>
          <button
            onClick={() => setSection("upper")}
            className={`rounded-lg px-3 py-1.5 text-xs border ${section === "upper" ? "border-[var(--gold-line)] bg-[rgba(212,178,106,0.14)]" : "border-white/25"}`}
          >
            상경 1~30
          </button>
          <button
            onClick={() => setSection("lower")}
            className={`rounded-lg px-3 py-1.5 text-xs border ${section === "lower" ? "border-[var(--gold-line)] bg-[rgba(212,178,106,0.14)]" : "border-white/25"}`}
          >
            하경 31~64
          </button>

          <Link href={`/hexagram/${randomHexagram.id}`} className="rounded-lg border border-white/25 px-3 py-1.5 text-xs">
            랜덤 괘 보기 #{randomHexagram.id}
          </Link>
        </div>

        <input
          className="w-full rounded-lg border border-[rgba(212,178,106,0.35)] bg-transparent px-3 py-2 text-sm"
          placeholder="예: 1, 건, 리더십, 수익"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="text-xs text-[var(--text-muted)]">검색 결과: {results.length}개</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((h) => (
          <Link key={h.id} href={`/hexagram/${h.id}`} className="paper-panel rounded-xl p-4 panel-hover">
            <p className="text-xs text-[var(--text-muted)]">#{h.id.toString().padStart(2, "0")}</p>
            <h2 className="mt-1 font-semibold">{h.nameKo}</h2>
            <p className="text-xs text-[var(--text-muted)]">{h.nameEn}</p>
            <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">{h.summary}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {h.keywords.slice(0, 3).map((k) => (
                <span key={k} className="gold-chip rounded-full px-2 py-0.5 text-[10px]">#{k}</span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
