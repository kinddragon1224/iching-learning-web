"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HEXAGRAMS } from "@/data/hexagrams";
import { getHexagramContent } from "@/lib/card-index";
import { HexagramLinesOverlay } from "@/components/HexagramLinesOverlay";

type QuizState = "idle" | "correct" | "wrong";

function randId() {
  return Math.floor(Math.random() * 64) + 1;
}

function makeOptions(answerId: number) {
  const pool = HEXAGRAMS.filter((h) => h.id !== answerId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((h) => h.id);
  return [...pool, answerId].sort(() => Math.random() - 0.5);
}

export default function StudioPage() {
  const [currentId, setCurrentId] = useState<number>(randId());
  const [quizState, setQuizState] = useState<QuizState>("idle");
  const [selected, setSelected] = useState<number | null>(null);
  const [feeling, setFeeling] = useState("");
  const [myContext, setMyContext] = useState("");
  const [lineNo, setLineNo] = useState(1);

  const hex = useMemo(() => HEXAGRAMS.find((h) => h.id === currentId) ?? HEXAGRAMS[0], [currentId]);
  const hexContent = useMemo(() => getHexagramContent(currentId), [currentId]);
  const options = useMemo(() => makeOptions(currentId), [currentId]);

  const [seenHex, setSeenHex] = useState<Set<number>>(new Set());
  const [seenLines, setSeenLines] = useState<Set<string>>(new Set());

  const handleAnswer = (id: number) => {
    setSelected(id);
    if (id === currentId) setQuizState("correct");
    else setQuizState("wrong");
    setSeenHex((prev) => new Set([...prev, currentId]));
  };

  const saveReflection = () => {
    if (!feeling.trim() && !myContext.trim()) return;
    setSeenLines((prev) => new Set([...prev, `${currentId}-${lineNo}`]));
    setFeeling("");
    setMyContext("");
  };

  const next = () => {
    setCurrentId(randId());
    setQuizState("idle");
    setSelected(null);
    setLineNo(1);
  };

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">학습 실험실</p>
        <h1 className="text-3xl font-bold">랜덤 괘 퀴즈 & 느낌 기록</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">정답 맞히기보다, 원문 상황과 내 상황을 대조하며 패턴 감각을 키우는 학습 모드입니다.</p>
      </header>

      <section className="rounded-xl border border-[rgba(212,178,106,0.3)] p-4 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p><b>진행 현황</b> · 64괘 {seenHex.size}/64 · 384효 {seenLines.size}/384</p>
          <button onClick={next} className="rounded-lg border border-white/30 px-3 py-1.5 text-xs">랜덤 괘 새로 뽑기</button>
        </div>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-3 text-sm">
        <p className="text-xs text-[var(--text-muted)]">현재 문제</p>
        <h2 className="text-xl font-semibold">이 괘의 이름은?</h2>
        <div className="flex justify-center py-2">
          <HexagramLinesOverlay lines={hexContent.lines} size="small" styleVariant="gold" />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {options.map((id) => {
            const h = HEXAGRAMS.find((x) => x.id === id)!;
            const active = selected === id;
            return (
              <button
                key={id}
                onClick={() => handleAnswer(id)}
                className={`rounded-lg border px-3 py-2 text-left ${active ? "border-[var(--gold-line)]" : "border-white/20"}`}
              >
                {h.nameKo}
              </button>
            );
          })}
        </div>
        {quizState === "correct" && <p className="text-emerald-300">정답! {hex.nameKo}</p>}
        {quizState === "wrong" && <p className="text-amber-300">아쉽지만 괜찮아. 정답은 {hex.nameKo}</p>}
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-3 text-sm">
        <h2 className="font-semibold">원문 상황 vs 내 상황 대조</h2>
        {quizState === "idle" ? (
          <p className="text-[var(--text-muted)]">먼저 이름 맞히기를 시도해줘. 정답/오답 후에 대조 학습이 열립니다.</p>
        ) : (
          <>
            <p className="text-[var(--text-muted)]"><b>원문 상황(요약)</b>: {hex.summary}</p>
            <p className="text-xs text-[var(--text-muted)]"><b>효 패턴</b>: {hexContent.lines.join("")}</p>

            <label className="block">
              <p className="mb-1 text-xs text-[var(--text-muted)]">이 괘를 보고 떠오른 느낌</p>
              <textarea value={feeling} onChange={(e) => setFeeling(e.target.value)} rows={3} className="w-full rounded-lg border border-white/20 bg-transparent p-2" />
            </label>

            <label className="block">
              <p className="mb-1 text-xs text-[var(--text-muted)]">내 현재 상황에 적용하면</p>
              <textarea value={myContext} onChange={(e) => setMyContext(e.target.value)} rows={3} className="w-full rounded-lg border border-white/20 bg-transparent p-2" />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <label className="text-xs text-[var(--text-muted)]">연결할 효</label>
              <select value={lineNo} onChange={(e) => setLineNo(Number(e.target.value))} className="rounded border border-white/20 bg-black/30 px-2 py-1 text-xs">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n}효</option>
                ))}
              </select>
              <button onClick={saveReflection} className="rounded-lg bg-[var(--gold-line)] px-3 py-1.5 text-xs font-semibold text-black">기록 저장</button>
            </div>
          </>
        )}
      </section>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/hexagrams" className="rounded-lg border border-white/30 px-4 py-2">64괘 목록으로 학습</Link>
        <Link href="/explore" className="rounded-lg border border-white/30 px-4 py-2">우주 탐색으로 이동</Link>
      </div>
    </main>
  );
}
