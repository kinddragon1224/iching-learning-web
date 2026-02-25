import { CardImageWithFallback } from "@/components/CardImageWithFallback";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HEXAGRAMS, findHexagram } from "@/data/hexagrams";
import { getCardForHexagram, getHexagramContent } from "@/lib/card-index";
import { getPrimaryAxisById } from "@/lib/primary-axis-map";
import { HexagramLinesOverlay } from "@/components/HexagramLinesOverlay";
import { QuestionActionButtons } from "@/components/QuestionActionButtons";

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
  const q = content.questions;
  const primaryAxis = getPrimaryAxisById(id) ?? "work";
  const title = card.full_name ? `#${id} ${card.full_name} (${card.short_name})` : `#${id} ${card.short_name}`;

  return (
    <main className="mx-auto max-w-3xl space-y-5 p-6">
      <Link href="/" className="text-sm underline">← 우주 화면으로</Link>

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
        <p className="text-neutral-500">({card.short_name}){card.trigram_pair ? ` · ${card.trigram_pair}` : ""}</p>
        <span className="mt-2 inline-block rounded-full border px-2 py-0.5 text-xs">{AXIS_LABEL[primaryAxis]}</span>
        <p className="mt-2">{content.summary}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {card.keywords.slice(0, 3).map((k) => (
            <span key={k} className="rounded-full border px-2 py-0.5">#{k}</span>
          ))}
        </div>
      </header>

      <section className="rounded-xl border p-4">
        <h2 className="mb-3 font-semibold">4축 해석</h2>
        <ul className="space-y-2 text-sm">
          <li><b>[돈]</b> {content.axes.money}</li>
          <li><b>[일]</b> {content.axes.work}</li>
          <li><b>[관계]</b> {content.axes.relation}</li>
          <li><b>[시간]</b> {content.axes.time}</li>
        </ul>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-3 font-semibold">6효 학습 포인트</h2>
        <ol className="space-y-2 text-sm">
          {content.lineTexts.map((line, idx) => (
            <li key={idx} className="rounded-lg bg-neutral-50 px-3 py-2">
              {line}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-3 font-semibold">4축 질문</h2>
        <div className="space-y-3 text-sm">
          <div><b>[돈]</b> {q.money}<QuestionActionButtons hexagramId={id} hexagramTitle={title} axis="money" question={q.money ?? ""} /></div>
          <div><b>[일]</b> {q.work}<QuestionActionButtons hexagramId={id} hexagramTitle={title} axis="work" question={q.work ?? ""} /></div>
          <div><b>[관계]</b> {q.relation}<QuestionActionButtons hexagramId={id} hexagramTitle={title} axis="relation" question={q.relation ?? ""} /></div>
          <div><b>[시간]</b> {q.time}<QuestionActionButtons hexagramId={id} hexagramTitle={title} axis="time" question={q.time ?? ""} /></div>
        </div>
      </section>
    </main>
  );
}
