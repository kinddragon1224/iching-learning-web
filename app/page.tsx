import Link from "next/link";
import { HEXAGRAMS } from "@/data/hexagrams";

function CardSlot({ title }: { title: string }) {
  return (
    <div className="paper-panel rounded-2xl p-4 text-center">
      <p className="text-xs text-[var(--text-muted)]">카드 슬롯</p>
      <p className="font-semibold mt-1">{title}</p>
      <p className="text-xs text-[var(--text-muted)] mt-2">(이미지는 선용이 제작 예정)</p>
    </div>
  );
}

export default function Home() {
  const today = HEXAGRAMS[new Date().getDate() % HEXAGRAMS.length];
  const detailHref = today.id === 1 ? "/qian" : `/hexagrams/${today.id}`;

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">상담에 주역이 붙는 반복의 비법</h1>
        <p className="text-sm text-[var(--text-muted)]">점술 기능이 아닌, 학습/탐색 중심 주역 레퍼런스 웹</p>
      </header>

      <section className="grid sm:grid-cols-3 gap-4">
        <CardSlot title="주간 학습 카드" />
        <CardSlot title="오늘의 괘 카드" />
        <CardSlot title="상담 복기 카드" />
      </section>

      <section className="paper-panel rounded-2xl p-5">
        <p className="text-xs text-[var(--text-muted)] mb-1">오늘의 괘</p>
        <h2 className="text-xl font-semibold">
          {today.id}. {today.nameKo}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{today.summary}</p>
        <Link href={detailHref} className="inline-block mt-4 text-sm font-medium underline">
          상세 보기
        </Link>
      </section>

      <section className="paper-panel rounded-2xl p-5 space-y-3">
        <p className="text-xs text-[var(--text-muted)]">요금제</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-[rgba(212,178,106,0.45)] p-4">
            <p className="text-sm text-[var(--text-muted)]">매월 구독</p>
            <p className="text-2xl font-bold">39,000원</p>
          </div>
          <div className="rounded-xl border border-[rgba(212,178,106,0.45)] p-4">
            <p className="text-sm text-[var(--text-muted)]">1년 이용</p>
            <p className="text-2xl font-bold">390,000원</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="gold-chip rounded-full px-3 py-1">7일 이내 전액 환불 보장</span>
          <span className="gold-chip rounded-full px-3 py-1">카운트다운/강압 판매 없음</span>
        </div>
        <div className="flex gap-2">
          <Link href="/checkout" className="rounded-lg bg-[var(--gold-line)] px-4 py-2 text-sm font-semibold text-black">
            비회원으로 시작하기
          </Link>
          <Link href="/pricing" className="rounded-lg border border-[rgba(212,178,106,0.45)] px-4 py-2 text-sm">
            요금 자세히 보기
          </Link>
        </div>
      </section>

      <div className="grid sm:grid-cols-4 gap-3">
        <Link href="/hexagrams" className="paper-panel rounded-xl p-4 hover:opacity-90 text-center">
          64괘 목록
        </Link>
        <Link href="/search" className="paper-panel rounded-xl p-4 hover:opacity-90 text-center">
          키워드 검색
        </Link>
        <Link href="/policy" className="paper-panel rounded-xl p-4 hover:opacity-90 text-center">
          학습 윤리/신앙 가이드
        </Link>
        <Link href="/checkout" className="paper-panel rounded-xl p-4 hover:opacity-90 text-center">
          게스트 체크아웃
        </Link>
      </div>

      <footer className="text-xs text-[var(--text-muted)] border-t border-[rgba(212,178,106,0.25)] pt-4">
        본 서비스는 학습 참고용이며 예언/운명 단정 기능을 제공하지 않습니다.
      </footer>
    </main>
  );
}
