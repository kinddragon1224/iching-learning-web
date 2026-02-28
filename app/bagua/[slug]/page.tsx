import Link from "next/link";
import { notFound } from "next/navigation";
import { BAGUA_ITEMS, getBaguaBySlug } from "@/data/bagua";
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

export function generateStaticParams() {
  return BAGUA_ITEMS.map((item) => ({ slug: item.slug }));
}

export default async function BaguaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getBaguaBySlug(slug);
  if (!item) return notFound();

  const key = TRIGRAM_KEY[slug] ?? "";
  const relatedUpper = HEXAGRAMS.filter((h) => {
    const pair = getCardForHexagram(h.id).trigram_pair ?? "";
    return pair.startsWith(key);
  });
  const relatedLower = HEXAGRAMS.filter((h) => {
    const pair = getCardForHexagram(h.id).trigram_pair ?? "";
    return pair.endsWith(key);
  });

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header className="space-y-2">
        <p className="text-sm text-[var(--text-muted)]">8괘 세부 페이지</p>
        <h1 className="text-3xl font-bold">{item.symbol} {item.nameKo} ({item.nameHanja})</h1>
        <p className="text-sm text-[var(--text-muted)]">{item.keyword}</p>
      </header>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <p><b>자연 상징:</b> {item.element}</p>
        <p><b>상징군:</b> {item.symbolicSet}</p>
        <p><b>방위:</b> {item.direction}</p>
        <p><b>계절 감각:</b> {item.season}</p>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <h2 className="font-semibold">핵심 해석</h2>
        <p>{item.freeSummary}</p>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <h2 className="font-semibold">설괘전 본문 적용</h2>
        <p>{item.seolgwaBody}</p>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-3">
        <h2 className="font-semibold">이 괘가 포함된 64괘 구조</h2>
        <div className="rounded-xl border border-white/15 p-3">
          <p className="mb-2 text-xs text-[var(--text-muted)]">상괘(위)로 쓰인 경우</p>
          <div className="flex flex-wrap gap-2 text-xs">
            {relatedUpper.map((h, idx) => (
              <Link
                key={`u-${h.id}`}
                href={`/hexagram/${h.id}`}
                className="relation-node rounded-full border px-2 py-1"
                style={{ animationDelay: `${idx * 45}ms` }}
              >
                #{h.id} {h.nameKo.split("(")[0]}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative py-2">
          <div className="relation-line" />
          <div className="mx-auto w-fit rounded-full border border-[var(--gold-line)] bg-black/40 px-3 py-1 text-xs text-[#f0dfb5] relation-core">
            {item.symbol} {item.nameKo}
          </div>
        </div>

        <div className="rounded-xl border border-white/15 p-3">
          <p className="mb-2 text-xs text-[var(--text-muted)]">하괘(아래)로 쓰인 경우</p>
          <div className="flex flex-wrap gap-2 text-xs">
            {relatedLower.map((h, idx) => (
              <Link
                key={`l-${h.id}`}
                href={`/hexagram/${h.id}`}
                className="relation-node rounded-full border px-2 py-1"
                style={{ animationDelay: `${idx * 45}ms` }}
              >
                #{h.id} {h.nameKo.split("(")[0]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-3">
        <h2 className="font-semibold">설괘전 상징 원문 매핑</h2>
        <div className="flex flex-wrap gap-2 text-xs text-[var(--text-muted)]">
          {item.shuoGuaSymbols.map((s) => (
            <span key={s} className="rounded-full border px-2 py-1">{s}</span>
          ))}
        </div>
        <p className="text-[11px] text-[var(--text-muted)]">
          출전: 《周易》 說卦傳 (예: 「乾為馬，坤為牛，震為龍，巽為雞，坎為豕，離為雉，艮為狗，兌為羊」)
        </p>
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
