import Link from "next/link";
import { BAGUA_ITEMS } from "@/data/bagua";
import { HEXAGRAMS } from "@/data/hexagrams";
import { getCardForHexagram } from "@/lib/card-index";

const TRIGRAM_KEY: Record<string, string> = {
  geon: "천",
  gon: "지",
  jin: "뢰",
  son: "풍",
  gam: "수",
  ri: "화",
  gan: "산",
  tae: "택",
};

export default function BaguaPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">입문관</p>
        <h1 className="text-3xl font-bold">8괘 세부 학습</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          설괘전 관점을 바탕으로 8괘의 상징을 익히고, 바로 연결되는 64괘를 함께 보며 구조를 시각적으로 이해해보자.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BAGUA_ITEMS.map((g) => {
          const k = TRIGRAM_KEY[g.slug];
          const related = HEXAGRAMS.filter((h) => {
            const pair = getCardForHexagram(h.id).trigram_pair ?? "";
            return pair.includes(k);
          }).slice(0, 4);

          return (
            <Link key={g.slug} href={`/bagua/${g.slug}`} className="paper-panel rounded-xl p-4 panel-hover">
              <p className="text-xs text-[var(--text-muted)]">{g.symbol} {g.nameHanja}</p>
              <h2 className="mt-1 text-lg font-semibold">{g.nameKo}</h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{g.keyword}</p>
              <p className="mt-2 text-xs text-[var(--text-muted)] line-clamp-2">{g.freeSummary}</p>
              <div className="mt-3 flex flex-wrap gap-1 text-[11px]">
                {related.map((r) => (
                  <span key={r.id} className="rounded-full border border-white/25 px-2 py-0.5 text-[var(--text-muted)]">
                    #{r.id} {r.nameKo.split("(")[0]}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </section>

      <div className="flex gap-2 text-sm">
        <Link href="/hexagrams" className="rounded-lg border border-white/30 px-3 py-2">전체 64괘 보기</Link>
        <Link href="/explore" className="rounded-lg border border-white/30 px-3 py-2">우주 탐색으로 이동하기</Link>
      </div>
    </main>
  );
}
