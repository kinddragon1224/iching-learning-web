import Link from "next/link";
import { notFound } from "next/navigation";
import { BAGUA_ITEMS, getBaguaBySlug } from "@/data/bagua";

export function generateStaticParams() {
  return BAGUA_ITEMS.map((item) => ({ slug: item.slug }));
}

export default async function BaguaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getBaguaBySlug(slug);
  if (!item) return notFound();

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header className="space-y-2">
        <p className="text-sm text-[var(--text-muted)]">8괘 세부 페이지</p>
        <h1 className="text-3xl font-bold">{item.symbol} {item.nameKo} ({item.nameHanja})</h1>
        <p className="text-sm text-[var(--text-muted)]">{item.keyword}</p>
      </header>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <p><b>자연 상징:</b> {item.element}</p>
        <p><b>방위:</b> {item.direction}</p>
        <p><b>계절 감각:</b> {item.season}</p>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <h2 className="font-semibold">무료 해석</h2>
        <p>{item.freeSummary}</p>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <h2 className="font-semibold">설괘전 본문 적용</h2>
        <p>{item.seolgwaBody}</p>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <h2 className="font-semibold">학습 포인트</h2>
        <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)]">
          {item.studyPoints.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <h2 className="font-semibold">현대 적용</h2>
        <p>{item.modernUse}</p>
      </section>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/bagua" className="rounded-lg border border-white/30 px-3 py-2">8괘 목록으로</Link>
        <Link href="/hexagrams" className="rounded-lg border border-white/30 px-3 py-2">64괘 전체 보기</Link>
        <Link href="/explore" className="rounded-lg border border-white/30 px-3 py-2">우주 탐색</Link>
      </div>
    </main>
  );
}
