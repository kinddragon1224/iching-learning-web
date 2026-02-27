import { CardImageWithFallback } from "@/components/CardImageWithFallback";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HEXAGRAMS, findHexagram } from "@/data/hexagrams";
import { getCardForHexagram, getHexagramContent } from "@/lib/card-index";
import { getPrimaryAxisById } from "@/lib/primary-axis-map";
import { HexagramLinesOverlay } from "@/components/HexagramLinesOverlay";
import { getHexagramTrack } from "@/data/pro_tracks";

export function generateStaticParams() {
  return HEXAGRAMS.map((h) => ({ id: String(h.id) }));
}

const AXIS_LABEL = { money: "돈", work: "일", relation: "관계", time: "시간" } as const;

export default async function HexagramCardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  const hex = findHexagram(id);
  if (!hex) return notFound();

  const card = getCardForHexagram(id);
  const content = getHexagramContent(id);
  const primaryAxis = getPrimaryAxisById(id) ?? "work";
  const track = getHexagramTrack(id);
  const prevId = id > 1 ? id - 1 : 64;
  const nextId = id < 64 ? id + 1 : 1;

  const related = HEXAGRAMS
    .filter((h) => h.id !== id)
    .map((h) => {
      const overlap = h.keywords.filter((k) => card.keywords.includes(k)).length;
      return { ...h, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap || Math.abs(a.id - id) - Math.abs(b.id - id))
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl space-y-5 p-6">
      <Link href="/" className="text-sm underline">← 홈으로 돌아가기</Link>

      <section className="overflow-hidden rounded-2xl border bg-neutral-50">
        <div className="relative">
          <CardImageWithFallback
            src={card.card_image}
            alt={`#${id} 카드`}
            width={1024}
            height={1024}
            className="h-auto w-full"
            priority
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
            <HexagramLinesOverlay lines={content.lines} size="medium" styleVariant="gold" />
          </div>
        </div>
      </section>

      <header>
        <h1 className="text-2xl font-bold">#{id} {card.full_name ?? card.short_name}</h1>
        <p className="text-[var(--text-muted)]">({card.short_name}){card.trigram_pair ? ` · ${card.trigram_pair}` : ""}</p>
        <span className="mt-2 inline-block rounded-full border px-2 py-0.5 text-xs">{AXIS_LABEL[primaryAxis]}</span>
        <p className="mt-2">{content.summary}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {card.keywords.slice(0, 3).map((k) => (
            <span key={k} className="rounded-full border px-2 py-0.5">#{k}</span>
          ))}
        </div>
      </header>

      {track && (
        <section className="rounded-xl border p-4 space-y-4">
          <div>
            <h2 className="font-semibold">무료 해석 (원문+현대)</h2>
            <p className="mt-2 text-sm"><b>원문 앵커:</b> {track.freePreview.classicalAnchor}</p>
            <p className="text-sm text-[var(--text-muted)]">{track.freePreview.plainMeaning}</p>
            <p className="mt-1 text-sm">{track.freePreview.modernTeaser}</p>
          </div>

          <div className="rounded-lg border border-white/20 bg-black/20 p-3">
            <h3 className="font-medium text-sm">Pro 상담 프레임 (맛보기)</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><b>진단:</b> {track.proFrame.diagnosis}</li>
              <li><b>코칭 질문:</b> {track.proFrame.coachingQuestion}</li>
              <li><b>실행 1스텝:</b> {track.proFrame.actionStep}</li>
            </ul>
          </div>
        </section>
      )}

      <section className="rounded-xl border p-4">
        <h2 className="mb-3 font-semibold">6효 학습 포인트</h2>
        <ol className="space-y-2 text-sm">
          {content.lineTexts.map((line, idx) => (
            <li key={idx} className="rounded-lg bg-black/20 px-3 py-2">
              {track?.linesKorean?.[idx] ? <b className="mr-1">[{track.linesKorean[idx]}]</b> : null}
              {line}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border p-4 space-y-3">
        <h2 className="font-semibold">다른 괘 바로 보기</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href={`/hexagram/${prevId}`} className="rounded-lg border px-3 py-2">← 이전 괘 #{prevId}</Link>
          <Link href="/hexagrams" className="rounded-lg border px-3 py-2">전체 64괘 보기</Link>
          <Link href="/search" className="rounded-lg border px-3 py-2">검색으로 이동</Link>
          <Link href={`/hexagram/${nextId}`} className="rounded-lg border px-3 py-2">다음 괘 #{nextId} →</Link>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">관련 괘 추천</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {related.map((r) => (
              <Link key={r.id} href={`/hexagram/${r.id}`} className="rounded-lg border px-3 py-2">
                #{r.id} {r.nameKo}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
