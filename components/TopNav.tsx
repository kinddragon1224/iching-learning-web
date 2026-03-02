"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-[100] px-3 pt-2">
      <div className="mx-auto flex max-w-4xl items-center gap-2 rounded-2xl border border-[rgba(212,178,106,0.35)] bg-black/70 p-2.5 shadow-[0_6px_24px_rgba(0,0,0,0.4)] backdrop-blur" ref={wrapRef}>
        <Link href="/" className="shrink-0 rounded-lg border border-white/25 bg-black/55 px-3.5 py-2 text-xs font-medium text-white" onClick={() => setOpen(false)}>
          홈
        </Link>

        <div className="mx-1 hidden h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(212,178,106,0.55)] to-transparent sm:block" />
        <p className="hidden sm:block text-xs text-[var(--text-muted)]">易 · I Ching</p>
        <div className="mx-1 hidden h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(212,178,106,0.55)] to-transparent sm:block" />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto shrink-0 rounded-lg border border-white/25 bg-black/55 px-3.5 py-2 text-xs font-medium text-white"
          aria-expanded={open}
          aria-label="메뉴 열기"
        >
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden>{open ? "✕" : "☰"}</span>
            메뉴
          </span>
        </button>

        {open && (
          <div className="absolute right-3 top-12 w-48 rounded-xl border border-white/20 bg-black/90 p-2 shadow-xl">
            <div className="flex flex-col gap-1 text-xs">
              <Link href="/daily" className="rounded px-2 py-1.5 hover:bg-white/10" onClick={() => setOpen(false)}>오늘의 물음</Link>
              <Link href="/principles" className="rounded px-2 py-1.5 hover:bg-white/10" onClick={() => setOpen(false)}>기본 원리</Link>
              <Link href="/bagua" className="rounded px-2 py-1.5 hover:bg-white/10" onClick={() => setOpen(false)}>8괘 입문</Link>
              <Link href="/hexagrams" className="rounded px-2 py-1.5 hover:bg-white/10" onClick={() => setOpen(false)}>64괘 목록</Link>
              <Link href="/explore" className="rounded px-2 py-1.5 hover:bg-white/10" onClick={() => setOpen(false)}>64괘 탐색</Link>
              <Link href="/studio" className="rounded px-2 py-1.5 hover:bg-white/10" onClick={() => setOpen(false)}>학습 실험실</Link>
              <Link href="/faq" className="rounded px-2 py-1.5 hover:bg-white/10" onClick={() => setOpen(false)}>자주 묻는 질문</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
