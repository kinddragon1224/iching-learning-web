"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HEXAGRAMS } from "@/data/hexagrams";
import { getHexagramContent } from "@/lib/card-index";
import { HexagramLinesOverlay } from "@/components/HexagramLinesOverlay";

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

export default function DailyPage() {
  const [mode, setMode] = useState<"lite" | "deep">("lite");
  const [question, setQuestion] = useState("");
  const [draw, setDraw] = useState<{ baseId: number; lineNo?: number; changedId?: number } | null>(null);

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
    const baseId = randId();
    if (mode === "lite") {
      setDraw({ baseId });
      return;
    }

    const lineNo = Math.floor(Math.random() * 6) + 1;
    const base = getHexagramContent(baseId).lines;
    const changed = flipLine(base, lineNo);
    const changedId = findHexIdByLines(changed) ?? undefined;
    setDraw({ baseId, lineNo, changedId });
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
            onClick={() => setMode("lite")}
            className={`rounded-lg border px-3 py-1.5 text-xs ${mode === "lite" ? "border-[var(--gold-line)]" : "border-white/20"}`}
          >
            Lite (하루 1괘)
          </button>
          <button
            type="button"
            onClick={() => setMode("deep")}
            className={`rounded-lg border px-3 py-1.5 text-xs ${mode === "deep" ? "border-[var(--gold-line)]" : "border-white/20"}`}
          >
            Deep (본괘 + 변효)
          </button>
        </div>

        <label className="block">
          <p className="mb-1 text-xs text-[var(--text-muted)]">오늘의 질문 (선택)</p>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="예: 오늘 내가 붙들어야 할 태도는 무엇인가?"
            className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2"
          />
        </label>

        <button onClick={doCast} className="daily-cast-btn rounded-lg px-4 py-2 text-sm font-semibold text-black">
          오늘의 괘상 뽑기
        </button>
      </section>

      {draw && baseHex && (
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
