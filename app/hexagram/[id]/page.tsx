import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HEXAGRAMS, findHexagram } from "@/data/hexagrams";
import { getCardForHexagram, toPublicAsset } from "@/lib/card-index";
import { TodayActionButton } from "@/components/TodayActionButton";
import { getPrimaryAxisById } from "@/lib/primary-axis-map";

export function generateStaticParams() {
  return HEXAGRAMS.map((h) => ({ id: String(h.id) }));
}

const AXIS_LABEL = { money: "돈", work: "일", relation: "관계", time: "시간" } as const;

function get4AxisQuestions(id: number) {
  const byId: Record<number, Partial<Record<"money" | "work" | "relationship" | "time", string>>> = {
    1: {
      work: "이번 주 최우선 실행 1개를 팀이 같은 문장으로 말할 수 있는가?",
      time: "성급함 대신 점검 시간을 의도적으로 확보했는가?",
    },
    25: {
      money: "무리한 확장 대신 비용 구조를 정리했는가?",
      work: "불필요한 작업 1개를 멈추고 핵심에 집중했는가?",
      relationship: "오해를 줄이기 위한 확인 대화를 먼저 했는가?",
      time: "멈춤과 정리를 위한 시간 블록을 배치했는가?",
    },
    64: {
      money: "검증 전 투입을 줄이고 리스크를 점검했는가?",
      time: "마무리 직전의 조급함을 낮추는 완충 시간을 넣었는가?",
    },
  };

  const fallback = {
    money: "현금흐름을 불안하게 만드는 작은 누수 1개를 찾았나?",
    work: "지금 해야 할 핵심 행동 1개가 문장으로 명확한가?",
    relationship: "협업을 어렵게 만든 오해를 풀기 위한 확인 질문을 했는가?",
    time: "이번 주 회복/집중 시간 블록을 캘린더에 실제로 넣었는가?",
  };

  return {
    money: byId[id]?.money ?? fallback.money,
    work: byId[id]?.work ?? fallback.work,
    relationship: byId[id]?.relationship ?? fallback.relationship,
    time: byId[id]?.time ?? fallback.time,
  };
}

export default function HexagramCardDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const hex = findHexagram(id);
  if (!hex) return notFound();

  const card = getCardForHexagram(id);
  const q = get4AxisQuestions(id);
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
          <li><b>[관계]</b> {q.relationship}</li>
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
