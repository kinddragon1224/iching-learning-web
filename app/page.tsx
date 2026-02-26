"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="home-hero-bg mx-auto max-w-5xl p-6 pt-24">
      <div className="home-nebula-layer" aria-hidden />
      <div className="home-stars-layer" aria-hidden />
      <div className="home-stars-layer-2" aria-hidden />

      <header className="relative z-10 space-y-3 text-center">
        <p className="text-sm text-[var(--text-muted)] home-fade-in">주역 학습 플랫폼</p>
        <div className="home-title-wrap">
          <div className="home-title-aura" aria-hidden />
          <div className="home-title-particles" aria-hidden />
          <h1 className="text-3xl font-bold home-title-glow">易 · I Ching</h1>
        </div>
        <p className="text-lg font-semibold home-fade-up">어디서부터 시작할까요?</p>
        <p className="text-sm text-[var(--text-muted)] home-fade-up-delay">처음이라면 8괘부터, 익숙해지면 64괘로 확장해보세요.</p>
      </header>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/bagua" className="paper-panel rounded-2xl p-5 panel-hover ring-1 ring-[rgba(212,178,106,0.45)]">
          <p className="text-xs text-[var(--text-muted)]">입문 트랙 · START HERE</p>
          <h2 className="mt-1 text-xl font-semibold">8괘부터 배우기</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">기초 8괘의 상징·핵심 의미·현대 적용을 먼저 익혀보세요.</p>
        </Link>

        <Link href="/hexagrams" className="paper-panel rounded-2xl p-5 panel-hover">
          <p className="text-xs text-[var(--text-muted)]">전체 보기</p>
          <h2 className="mt-1 text-xl font-semibold">64괘 목록 보기</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">원하는 괘를 리스트에서 바로 선택해 학습해보세요.</p>
        </Link>

        <Link href="/explore" className="paper-panel rounded-2xl p-5 panel-hover">
          <p className="text-xs text-[var(--text-muted)]">확장 트랙</p>
          <h2 className="mt-1 text-xl font-semibold">64괘 우주 탐색</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">우주 뷰에서 괘를 탐색하고 상세 해석으로 들어가보세요.</p>
        </Link>
      </section>
    </main>
  );
}
