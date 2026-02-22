import Link from "next/link";
import { HEXAGRAMS } from "@/data/hexagrams";

function TrustChip({ text }: { text: string }) {
  return <span className="gold-chip rounded-full px-3 py-1 text-xs">{text}</span>;
}

export default function Home() {
  const today = HEXAGRAMS[new Date().getDate() % HEXAGRAMS.length];
  const detailHref = today.id === 1 ? "/qian" : `/hexagrams/${today.id}`;

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8">
      <header className="space-y-3 text-center">
        <p className="text-xs tracking-[0.22em] text-[var(--text-muted)]">ICHING LEARNING SYSTEM</p>
        <h1 className="text-4xl font-bold leading-tight">조용한 우주감으로 설계한 주역 학습 랜딩 v2</h1>
        <p className="mx-auto max-w-2xl text-sm text-[var(--text-muted)]">
          점술 앱이 아니라, 고전 텍스트를 탐색하고 복기하는 학습형 웹서비스. 과장 없는 신뢰 구조와
          프리미엄 미니멀 UI를 결합했습니다.
        </p>
      </header>

      <section className="hero-grid">
        <article className="paper-panel panel-hover hero-main rounded-2xl p-6 relative overflow-hidden">
          <div className="glow-orb absolute -top-12 -right-8 h-40 w-40" />
          <p className="text-xs text-[var(--text-muted)]">오늘의 괘</p>
          <h2 className="text-3xl font-semibold mt-1">
            {today.id}. {today.nameKo}
          </h2>
          <p className="mt-3 text-sm text-[var(--text-muted)] max-w-xl">{today.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <TrustChip text="학습 중심" />
            <TrustChip text="비예언" />
            <TrustChip text="윤리 가드레일" />
          </div>
          <div className="mt-6 flex gap-3">
            <Link href={detailHref} className="rounded-lg bg-[var(--gold-line)] px-4 py-2 text-sm font-semibold text-black">
              학습 시작
            </Link>
            <Link href="/hexagrams" className="rounded-lg border border-[rgba(212,178,106,0.45)] px-4 py-2 text-sm">
              64괘 탐색
            </Link>
          </div>
        </article>

        <article className="paper-panel panel-hover rounded-2xl p-5">
          <p className="text-xs text-[var(--text-muted)]">전환 최적화</p>
          <h3 className="text-lg font-semibold mt-1">게스트 체크아웃 우선</h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">계정 생성 강제 없이 결제 진입. 압박 카피 없이 명확한 환불 규칙 제시.</p>
          <Link href="/checkout" className="inline-block mt-4 text-sm underline">
            비회원 결제 보기
          </Link>
        </article>

        <article className="paper-panel panel-hover rounded-2xl p-5">
          <p className="text-xs text-[var(--text-muted)]">프라이싱</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg border border-[rgba(212,178,106,0.45)] p-3">
              <p className="text-xs text-[var(--text-muted)]">월</p>
              <p className="font-semibold">39,000</p>
            </div>
            <div className="rounded-lg border border-[rgba(212,178,106,0.45)] p-3">
              <p className="text-xs text-[var(--text-muted)]">연</p>
              <p className="font-semibold">390,000</p>
            </div>
          </div>
          <Link href="/pricing" className="inline-block mt-4 text-sm underline">
            요금 정책 보기
          </Link>
        </article>
      </section>

      <section className="grid sm:grid-cols-3 gap-3">
        <Link href="/search" className="paper-panel panel-hover rounded-xl p-4 text-center">키워드 검색</Link>
        <Link href="/policy" className="paper-panel panel-hover rounded-xl p-4 text-center">학습 윤리/신앙 가이드</Link>
        <Link href="/qian" className="paper-panel panel-hover rounded-xl p-4 text-center">중천건 샘플 상세</Link>
      </section>

      <footer className="text-xs text-[var(--text-muted)] border-t border-[rgba(212,178,106,0.25)] pt-4">
        본 서비스는 학습 참고용이며 운명 단정, 공포 유도, 강압 결제를 지양합니다.
      </footer>
    </main>
  );
}
