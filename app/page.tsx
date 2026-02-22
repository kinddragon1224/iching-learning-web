import Link from "next/link";
import { HEXAGRAMS } from "@/data/hexagrams";

function CardSlot({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-amber-300 bg-gradient-to-b from-amber-100 to-amber-50 p-4 text-center">
      <p className="text-xs text-neutral-500">카드 슬롯</p>
      <p className="font-semibold mt-1">{title}</p>
      <p className="text-xs text-neutral-500 mt-2">(이미지는 선용이 제작 예정)</p>
    </div>
  );
}

export default function Home() {
  const today = HEXAGRAMS[new Date().getDate() % HEXAGRAMS.length];

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">상담에 주역이 붙는 반복의 비법</h1>
        <p className="text-sm text-neutral-600">점술 기능이 아닌, 학습/탐색 중심 주역 레퍼런스 웹</p>
      </header>

      <section className="grid sm:grid-cols-3 gap-4">
        <CardSlot title="주간 학습 카드" />
        <CardSlot title="오늘의 괘 카드" />
        <CardSlot title="상담 복기 카드" />
      </section>

      <section className="rounded-2xl border p-5 bg-amber-50">
        <p className="text-xs text-neutral-500 mb-1">오늘의 괘</p>
        <h2 className="text-xl font-semibold">
          {today.id}. {today.nameKo}
        </h2>
        <p className="mt-2 text-sm">{today.summary}</p>
        <Link href={`/hexagrams/${today.id}`} className="inline-block mt-4 text-sm font-medium underline">
          상세 보기
        </Link>
      </section>

      <div className="grid sm:grid-cols-3 gap-3">
        <Link href="/hexagrams" className="rounded-xl border p-4 hover:bg-neutral-50 text-center">
          64괘 목록
        </Link>
        <Link href="/search" className="rounded-xl border p-4 hover:bg-neutral-50 text-center">
          키워드 검색
        </Link>
        <Link href="/policy" className="rounded-xl border p-4 hover:bg-neutral-50 text-center">
          학습 윤리/신앙 가이드
        </Link>
      </div>

      <footer className="text-xs text-neutral-500 border-t pt-4">
        본 서비스는 학습 참고용이며 예언/운명 단정 기능을 제공하지 않습니다.
      </footer>
    </main>
  );
}
