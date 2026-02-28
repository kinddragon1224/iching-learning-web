"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { HEXAGRAMS } from "@/data/hexagrams";
import { getHexagramContent } from "@/lib/card-index";
import { HexagramLinesOverlay } from "@/components/HexagramLinesOverlay";

type Draw = { baseId: number; lineNo?: number; changedId?: number };

function randId() {
  return Math.floor(Math.random() * 64) + 1;
}

function flipLine(lines: number[], lineNo: number) {
  return lines.map((v, i) => (i === lineNo - 1 ? (v === 1 ? 0 : 1) : v));
}

function sameLines(a: number[], b: number[]) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function findHexIdByLines(target: number[]) {
  for (let id = 1; id <= 64; id += 1) {
    const lines = getHexagramContent(id).lines;
    if (sameLines(lines, target)) return id;
  }
  return null;
}

function findHexIdByLinesFlexible(target: number[]) {
  const direct = findHexIdByLines(target);
  if (direct) return direct;
  return findHexIdByLines([...target].reverse());
}

function kstDateKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export default function DailyPage() {
  const [mode, setMode] = useState<"lite" | "deep">("lite");
  const [question, setQuestion] = useState("");
  const [draw, setDraw] = useState<Draw | null>(null);
  const [castedDate, setCastedDate] = useState<string | null>(null);
  const [isCasting, setIsCasting] = useState(false);
  const questionInputRef = useRef<HTMLInputElement | null>(null);

  const todayKey = kstDateKey();
  const canCast = true;

  useEffect(() => {
    try {
      const raw = localStorage.getItem("daily_cast_v1");
      if (!raw) return;
      const parsed = JSON.parse(raw) as { date: string; mode: "lite" | "deep"; question: string; draw: Draw };
      if (parsed?.date === todayKey && parsed?.draw) {
        setDraw(parsed.draw);
        setMode(parsed.mode ?? "lite");
        setQuestion(parsed.question ?? "");
        setCastedDate(parsed.date);
      }
    } catch {
      // noop
    }
  }, [todayKey]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      questionInputRef.current?.focus();
    }, 120);
    return () => window.clearTimeout(t);
  }, []);

  const baseHex = useMemo(() => (draw ? HEXAGRAMS.find((h) => h.id === draw.baseId) ?? null : null), [draw]);
  const changedHex = useMemo(
    () => (draw?.changedId ? HEXAGRAMS.find((h) => h.id === draw.changedId) ?? null : null),
    [draw]
  );

  const baseLines = useMemo(() => (draw ? getHexagramContent(draw.baseId).lines : [1, 1, 1, 1, 1, 1]), [draw]);
  const changedLines = useMemo(() => {
    if (!draw?.lineNo) return null;
    return flipLine(baseLines, draw.lineNo);
  }, [draw, baseLines]);

  const doCast = () => {
    if (!canCast || isCasting) return;

    setIsCasting(true);
    window.setTimeout(() => {
      const baseId = randId();
      let next: Draw;
      if (mode === "lite") {
        next = { baseId };
      } else {
        const lineNo = Math.floor(Math.random() * 6) + 1;
        const base = getHexagramContent(baseId).lines;
        const changed = flipLine(base, lineNo);
        const changedId = findHexIdByLinesFlexible(changed) ?? undefined;
        next = { baseId, lineNo, changedId };
      }

      setDraw(next);
      setCastedDate(todayKey);
      try {
        localStorage.setItem(
          "daily_cast_v1",
          JSON.stringify({
            date: todayKey,
            mode,
            question,
            draw: next,
          })
        );
      } catch {
        // noop
      }
      setIsCasting(false);
    }, 1400);
  };

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6 pt-24 daily-cast-enter">
      <header>
        <p className="text-sm text-[var(--text-muted)]">오늘의 물음</p>
        <h1 className="text-3xl font-bold">Daily Casting · 라이트/딥</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          점술이 아니라 분별을 돕는 성찰 도구야. 결정은 기도·양심·공동체 지혜와 함께 해.
        </p>
      </header>

      <section className="paper-panel rounded-xl p-4 space-y-3 text-sm daily-glow-panel">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setMode("lite");
              setDraw(null);
            }}
            disabled={!canCast}
            className={`rounded-lg border px-3 py-1.5 text-xs ${mode === "lite" ? "border-[var(--gold-line)]" : "border-white/20"}`}
          >
            Lite (하루 1괘)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("deep");
              setDraw(null);
            }}
            disabled={!canCast}
            className={`rounded-lg border px-3 py-1.5 text-xs ${mode === "deep" ? "border-[var(--gold-line)]" : "border-white/20"}`}
          >
            Deep (본괘 + 변효)
          </button>
        </div>

        <label className="block">
          <p className="mb-1 text-xs text-[var(--text-muted)]">오늘의 질문 (선택)</p>
          <input
            ref={questionInputRef}
            autoFocus
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={!canCast}
            placeholder="예: 오늘 내가 붙들어야 할 태도는 무엇인가?"
            className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={doCast}
            disabled={!canCast || isCasting}
            className="daily-cast-btn rounded-lg px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
          >
            {isCasting ? "괘상 정렬 중..." : canCast ? "오늘의 괘상 뽑기" : "오늘은 이미 뽑았어"}
          </button>
          {!canCast && <p className="text-xs text-[var(--text-muted)]">내일(자정 KST 이후) 다시 뽑을 수 있어.</p>}
        </div>
      </section>

      {isCasting && (
        <section className="paper-panel rounded-xl p-6 text-center space-y-3 daily-cast-chamber">
          <p className="text-xs text-[var(--text-muted)]">하늘의 뜻을 구하는 중...</p>
          <div className="mx-auto w-fit">
            <div className="daily-bars" />
          </div>
        </section>
      )}

      {draw && baseHex && !isCasting && (
        <section className="grid gap-4 md:grid-cols-2">
          <div className="paper-panel rounded-xl p-4 space-y-3 daily-card-pop">
            <p className="text-xs text-[var(--text-muted)]">본괘</p>
            <div className="flex justify-center py-2">
              <HexagramLinesOverlay lines={baseLines} size="small" styleVariant="gold" />
            </div>
            <p className="text-center font-semibold">#{baseHex.id} {baseHex.nameKo}</p>
            {question ? <p className="text-xs text-[var(--text-muted)]">질문: {question}</p> : null}
            <div className="pt-1">
              <Link href={`/hexagram/${baseHex.id}`} className="rounded-lg border border-white/30 px-3 py-1.5 text-xs">
                본괘 상세 보기
              </Link>
            </div>
          </div>

          {mode === "deep" && (
            <div className="paper-panel rounded-xl p-4 space-y-3 daily-card-pop" style={{ animationDelay: "120ms" }}>
              <p className="text-xs text-[var(--text-muted)]">변화 해석</p>
              <p className="text-sm">변효: <b>{draw.lineNo}효</b></p>
              <div className="flex justify-center py-2">
                <HexagramLinesOverlay lines={changedLines ?? baseLines} size="small" styleVariant="gold" />
              </div>
              {changedHex ? (
                <>
                  <p className="text-center font-semibold">변괘 #{changedHex.id} {changedHex.nameKo}</p>
                  <Link href={`/hexagram/${changedHex.id}`} className="rounded-lg border border-white/30 px-3 py-1.5 text-xs">
                    변괘 상세 보기
                  </Link>
                </>
              ) : (
                <p className="text-xs text-[var(--text-muted)]">변괘 매핑 준비 중</p>
              )}
            </div>
          )}
        </section>
      )}

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/studio" className="rounded-lg border border-white/30 px-3 py-2">학습실험실로 이동</Link>
        <Link href="/hexagrams" className="rounded-lg border border-white/30 px-3 py-2">64괘 전체 보기</Link>
      </div>
    </main>
  );
}
