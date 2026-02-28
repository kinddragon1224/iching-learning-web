"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="home-hero-bg mx-auto max-w-5xl p-6 pt-24">
      <div className="home-nebula-layer" aria-hidden />
      <div className="home-stars-layer" aria-hidden />
      <div className="home-stars-layer-2" aria-hidden />

      <header className="relative z-10 mx-auto max-w-2xl space-y-4 text-center">
        <p className="text-sm text-[var(--text-muted)] home-fade-in">역 학습 플랫폼</p>
        <div className="home-title-wrap">
          <div className="home-title-backdrop" aria-hidden />
          <div className="home-title-aura" aria-hidden />
          <div className="home-title-particles" aria-hidden />
          <h1 className="text-5xl md:text-6xl font-bold home-title-glow tracking-tight">易 · I Ching</h1>
        </div>
        <p className="text-lg font-semibold home-fade-up">어디서부터 시작할까요?</p>
        <p className="text-sm text-[var(--text-muted)] home-fade-up-delay">처음이라면 8괘부터, 익숙해지면 64괘로 확장해보세요.</p>
      </header>

      <section className="relative z-10 mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Link href="/principles" className="paper-panel rounded-2xl p-5 panel-hover ring-1 ring-[rgba(212,178,106,0.45)]">
          <p className="text-xs text-[var(--text-muted)]">첫걸음</p>
          <h2 className="mt-1 text-xl font-semibold">역의 기본 원리</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">음양과 변화의 기본 구조를 먼저 이해해보세요.</p>
        </Link>

        <Link href="/bagua" className="paper-panel rounded-2xl p-5 panel-hover">
          <p className="text-xs text-[var(--text-muted)]">입문 학습</p>
          <h2 className="mt-1 text-xl font-semibold">8괘부터 배우기</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">기초 8괘의 상징과 핵심 의미를 익혀보세요.</p>
        </Link>

        <Link href="/hexagrams" className="paper-panel rounded-2xl p-5 panel-hover">
          <p className="text-xs text-[var(--text-muted)]">전체 보기</p>
          <h2 className="mt-1 text-xl font-semibold">64괘 목록 보기</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">64괘를 목록에서 빠르게 찾아 학습해보세요.</p>
        </Link>

        <Link href="/explore" className="paper-panel rounded-2xl p-5 panel-hover">
          <p className="text-xs text-[var(--text-muted)]">확장 트랙</p>
          <h2 className="mt-1 text-xl font-semibold">64괘 우주 탐색</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">우주 뷰에서 괘를 탐색하며 흐름을 직관적으로 살펴보세요.</p>
        </Link>

        <Link href="/studio" className="paper-panel rounded-2xl p-5 panel-hover">
          <p className="text-xs text-[var(--text-muted)]">실전 학습</p>
          <h2 className="mt-1 text-xl font-semibold">랜덤 괘 실험실</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">랜덤 괘 퀴즈와 느낌 기록으로 64괘/384효 패턴을 익혀보세요.</p>
        </Link>
      </section>

      <div className="home-bottom-center-tab-wrap" aria-hidden={false}>
        <Link href="/daily" className="home-bottom-center-tab">
          오늘의 물음
        </Link>
      </div>
    </main>
  );
}
