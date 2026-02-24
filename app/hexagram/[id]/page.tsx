import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HEXAGRAMS, findHexagram } from "@/data/hexagrams";
import { getCardForHexagram, getHexagramContent, toPublicAsset } from "@/lib/card-index";
import { TodayActionButton } from "@/components/TodayActionButton";
import { getPrimaryAxisById } from "@/lib/primary-axis-map";

export function generateStaticParams() {
  return HEXAGRAMS.map((h) => ({ id: String(h.id) }));
}

const AXIS_LABEL = { money: "돈", work: "일", relation: "관계", time: "시간" } as const;

export default function HexagramCardDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const hex = findHexagram(id);
  if (!hex) return notFound();

  const card = getCardForHexagram(id);
  const content = getHexagramContent(id);
  const q = content.questions;
  const primaryAxis = getPrimaryAxisById(id) ?? "work";

  return (
    <main className="mx-auto max-w-3xl space-y-5 p-6">
      <Link href="/" className="text-sm underline">← 우주 화면으로</Link>

      <section className="overflow-hidden rounded-2xl border bg-neutral-50">
        <Image
          src={toPublicAsset(card.card_image)}
          alt={`#${id} 카드`}
          width={1024}
          height={1024}
          className="h-auto w-full"
          priority
        />
      </section>

      <header>
        <h1 className="text-2xl font-bold">#{id} {card.full_name ?? card.short_name}</h1>
        <p className="text-neutral-500">({card.short_name}){card.trigram_pair ? ` · ${card.trigram_pair}` : ""}</p>
        <span className="mt-2 inline-block rounded-full border px-2 py-0.5 text-xs">{AXIS_LABEL[primaryAxis]}</span>
        <p className="mt-2">{card.one_liner}</p>
      </header>

      <section className="rounded-xl border p-4">
        <h2 className="mb-3 font-semibold">4축 질문</h2>
        <ul className="space-y-2 text-sm">
          <li><b>[돈]</b> {q.money}</li>
          <li><b>[일]</b> {q.work}</li>
          <li><b>[관계]</b> {q.relation}</li>
          <li><b>[시간]</b> {q.time}</li>
        </ul>
      </section>

      <section className="flex items-center justify-between rounded-xl border p-4">
        <p className="text-sm text-neutral-600">오늘 실행할 한 가지를 저장해둘 수 있어.</p>
        <TodayActionButton id={id} text={card.one_liner} />
      </section>
    </main>
  );
}
