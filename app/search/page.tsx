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
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">검색</h1>
      <input
        className="w-full border rounded-xl px-4 py-3"
        placeholder="예: 재물, 이직, 리더십, 11"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <p className="text-sm text-neutral-500">결과 {results.length}개</p>

      <ul className="space-y-2">
        {results.map((h) => (
          <li key={h.id} className="border rounded-xl p-4 hover:bg-neutral-50">
            <Link href={`/hexagrams/${h.id}`}>
              <p className="font-semibold">{h.id}. {h.nameKo}</p>
              <p className="text-sm text-neutral-700 mt-1">{h.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
