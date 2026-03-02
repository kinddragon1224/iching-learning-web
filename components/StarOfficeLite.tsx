"use client";

import Link from "next/link";

export default function StarOfficeLite() {
  return (
    <section className="paper-panel rounded-2xl p-5 star-office-lite">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">모라 작업실</h2>
        <span className="text-xs text-emerald-300">● online</span>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3 text-xs">
        <div className="rounded-lg border border-white/15 p-2">
          <p className="text-[var(--text-muted)]">현재 상태</p>
          <p className="mt-1">주역 코퍼스 QA 유지</p>
        </div>
        <div className="rounded-lg border border-white/15 p-2">
          <p className="text-[var(--text-muted)]">진행</p>
          <p className="mt-1">64괘 교정 완료</p>
        </div>
        <div className="rounded-lg border border-white/15 p-2">
          <p className="text-[var(--text-muted)]">다음 작업</p>
          <p className="mt-1">홈 UX 폴리시</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className="star-dot star-dot-1" />
        <span className="star-dot star-dot-2" />
        <span className="star-dot star-dot-3" />
        <span className="text-[var(--text-muted)]">작업 흐름 시각화</span>
      </div>

      <div className="mt-3 flex gap-2 text-xs">
        <Link href="/daily" className="rounded-lg border border-[var(--gold-line)] px-3 py-1.5">오늘의 물음</Link>
        <Link href="/studio" className="rounded-lg border border-white/30 px-3 py-1.5">학습실험실</Link>
      </div>
    </section>
  );
}
