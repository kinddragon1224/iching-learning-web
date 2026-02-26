import Link from "next/link";
import { BAGUA_ITEMS } from "@/data/bagua";

export default function BaguaPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">입문관</p>
        <h1 className="text-3xl font-bold">8괘 세부 학습</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">각 괘의 상징·핵심 의미·현대 적용 포인트를 빠르게 익혀.</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BAGUA_ITEMS.map((g) => (
          <Link key={g.slug} href={`/bagua/${g.slug}`} className="paper-panel rounded-xl p-4 panel-hover">
            <p className="text-xs text-[var(--text-muted)]">{g.symbol} {g.nameHanja}</p>
            <h2 className="mt-1 text-lg font-semibold">{g.nameKo}</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{g.keyword}</p>
            <p className="mt-2 text-xs text-[var(--text-muted)] line-clamp-2">{g.freeSummary}</p>
          </Link>
        ))}
      </section>

      <div className="flex gap-2 text-sm">
        <Link href="/hexagrams" className="rounded-lg border border-white/30 px-3 py-2">전체 64괘 보기</Link>
        <Link href="/explore" className="rounded-lg border border-white/30 px-3 py-2">우주 탐색으로 이동</Link>
      </div>
    </main>
  );
}
