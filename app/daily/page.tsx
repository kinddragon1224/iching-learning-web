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
  const [isCasting, setIsCasting] = useState(false);

  // reflective flow (first 3 minutes)
  const [lossText, setLossText] = useState("");
  const [controlYes, setControlYes] = useState("");
  const [controlNo, setControlNo] = useState("");
  const [ifThen, setIfThen] = useState("");
  const [savedCount, setSavedCount] = useState(0);
  const [fitState, setFitState] = useState<"idle" | "fit" | "misfit">("idle");

  const questionInputRef = useRef<HTMLInputElement | null>(null);
  const todayKey = kstDateKey();

  useEffect(() => {
    const t = window.setTimeout(() => questionInputRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    try {
      const rows = JSON.parse(localStorage.getItem("daily_reflections_v1") || "[]") as Array<{ date: string }>;
      setSavedCount(rows.filter((r) => r.date === todayKey).length);
    } catch {
      setSavedCount(0);
    }
  }, [todayKey]);

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

  const authorityMessage = useMemo(() => {
    if (!baseHex) return null;

    const q = (question || "").toLowerCase();
    const isBuild = /개발|만들|출시|서비스|프로덕트|build|launch/.test(q);
    const isMoney = /돈|수익|매출|가격|결제|monet|revenue/.test(q);
    const isRelation = /관계|팀|협업|사람|고객|파트너/.test(q);

    let risk = "지금은 해석을 많이 늘리기보다, 핵심 가설 1개를 검증 없이 밀어붙이는 게 리스크야.";
    let action = "오늘 당장 해야 할 1가지는 \"다음 24시간에 검증할 사용자 행동 지표 1개를 정하기\"";

    if (isBuild) {
      risk = "지금 리스크는 \"기능을 더 붙이는 것\"보다 \"사용자 첫 3분 이탈\"을 못 잡는 거야.";
      action = "오늘 당장 해야 할 1가지는 \"첫 화면에서 CTA 하나만 남기고 완료율 측정\"";
    } else if (isMoney) {
      risk = "지금 리스크는 가치보다 가격/과금 타이밍을 먼저 제시해 신뢰를 잃는 거야.";
      action = "오늘 당장 해야 할 1가지는 \"무료 구간에서 즉시 효용 1개를 먼저 체감시키기\"";
    } else if (isRelation) {
      risk = "지금 리스크는 메시지 불일치로 팀/사용자 기대치가 어긋나는 거야.";
      action = "오늘 당장 해야 할 1가지는 \"핵심 문장 1개(우리는 무엇을 돕는가) 통일\"";
    }

    return {
      risk: `${baseHex.nameKo}: ${risk}`,
      action,
      alt: "어긋난다면 해석을 버리지 말고 질문을 좁혀: \"오늘 내가 통제 가능한 1개\"로 다시 고정해.",
    };
  }, [baseHex, question]);

  const doCast = () => {
    if (isCasting) return;
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
      setFitState("idle");
      setIsCasting(false);
    }, 1200);
  };

  const completionCount = [lossText, controlYes, ifThen].filter((v) => v.trim().length > 0).length;
  const completionPct = Math.round((completionCount / 3) * 100);

  const saveReflection = () => {
    if (!draw || !baseHex) return;
    if (!controlYes.trim() || !ifThen.trim()) {
      alert("통제 가능한 것 1개와 If-Then 1줄은 꼭 입력해줘.");
      return;
    }
    const payload = {
      date: todayKey,
      hexId: baseHex.id,
      hexName: baseHex.nameKo,
      mode,
      question,
      lossText,
      controlYes,
      controlNo,
      ifThen,
      createdAt: new Date().toISOString(),
    };
    try {
      const rows = JSON.parse(localStorage.getItem("daily_reflections_v1") || "[]");
      rows.unshift(payload);
      localStorage.setItem("daily_reflections_v1", JSON.stringify(rows));
      setSavedCount((c) => c + 1);
      alert("오늘 성찰 기록 저장 완료.");
    } catch {
      alert("저장 중 오류가 발생했어.");
    }
  };

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6 pt-24 daily-cast-enter">
      <header>
        <p className="text-sm text-[var(--text-muted)]">오늘의 물음</p>
        <h1 className="text-3xl font-bold">3분 성찰 플로우</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          예언이 아니라 의사결정을 정렬하는 도구야. 오늘은 짧게 1회만 정리하고 끝내자.
        </p>
        <p className="mt-1 text-xs text-[var(--text-muted)]">오늘 저장: {savedCount}회</p>
      </header>

      <section className="paper-panel rounded-xl p-4 space-y-3 text-sm daily-glow-panel">
        <div className="rounded-lg border border-white/15 bg-black/20 p-3 text-xs text-[var(--text-muted)]">
          <p><b>왜 이 플로우인가?</b> 불안 해소를 ‘재추첨’이 아니라 ‘행동 1개’로 바꾸기 위해서야.</p>
          <p className="mt-1">순서: 질문 → 괘상 → 통제 가능/불가 → If-Then 1줄 → 저장 후 종료</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setMode("lite")} className={`rounded-lg border px-3 py-1.5 text-xs ${mode === "lite" ? "border-[var(--gold-line)]" : "border-white/20"}`}>Lite</button>
          <button type="button" onClick={() => setMode("deep")} className={`rounded-lg border px-3 py-1.5 text-xs ${mode === "deep" ? "border-[var(--gold-line)]" : "border-white/20"}`}>Deep</button>
        </div>

        <label className="block">
          <p className="mb-1 text-xs text-[var(--text-muted)]">오늘의 질문 (선택)</p>
          <input
            ref={questionInputRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="예: 오늘 내가 붙들어야 할 태도는?"
            className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2"
          />
        </label>

        <button onClick={doCast} disabled={isCasting} className="daily-cast-btn rounded-lg px-4 py-2 text-sm font-semibold text-black disabled:opacity-60">
          {isCasting ? "정렬 중..." : "오늘의 괘상 뽑기"}
        </button>
      </section>

      {draw && baseHex && !isCasting && (
        <section className="grid gap-4 md:grid-cols-2">
          <div className="paper-panel rounded-xl p-4 space-y-3 daily-card-pop">
            <p className="text-xs text-[var(--text-muted)]">본괘</p>
            <div className="flex justify-center py-2">
              <HexagramLinesOverlay lines={baseLines} size="small" styleVariant="gold" />
            </div>
            <p className="text-center font-semibold">#{baseHex.id} {baseHex.nameKo}</p>
            {question ? <p className="text-xs text-[var(--text-muted)]">질문: {question}</p> : null}
          </div>

          {mode === "deep" && (
            <div className="paper-panel rounded-xl p-4 space-y-3 daily-card-pop" style={{ animationDelay: "120ms" }}>
              <p className="text-xs text-[var(--text-muted)]">변화 해석</p>
              <p className="text-sm">변효: <b>{draw.lineNo}효</b></p>
              <div className="flex justify-center py-2">
                <HexagramLinesOverlay lines={changedLines ?? baseLines} size="small" styleVariant="gold" />
              </div>
              {changedHex ? <p className="text-center font-semibold">변괘 #{changedHex.id} {changedHex.nameKo}</p> : null}
            </div>
          )}
        </section>
      )}

      {draw && baseHex && !isCasting && authorityMessage && (
        <section className="paper-panel rounded-xl p-4 space-y-3 text-sm">
          <h2 className="font-semibold">즉시 판독 (권위형)</h2>
          <p>{authorityMessage.risk}</p>
          <p className="text-[var(--gold-soft)]">{authorityMessage.action}</p>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[var(--text-muted)]">지금 해석이 맞나?</span>
            <button onClick={() => setFitState("fit")} className={`rounded border px-2 py-1 ${fitState === "fit" ? "border-emerald-400" : "border-white/25"}`}>맞아</button>
            <button onClick={() => setFitState("misfit")} className={`rounded border px-2 py-1 ${fitState === "misfit" ? "border-amber-300" : "border-white/25"}`}>아니야</button>
          </div>

          {fitState === "misfit" ? <p className="text-xs text-amber-200">{authorityMessage.alt}</p> : null}
        </section>
      )}

      {draw && baseHex && !isCasting && (
        <section className="paper-panel rounded-xl p-4 space-y-3 text-sm">
          <h2 className="font-semibold">3분 성찰 체크</h2>
          <div className="rounded-lg border border-white/15 p-2">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>성찰 완료도</span>
              <span>{completionPct}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-[var(--gold-line)] transition-all" style={{ width: `${completionPct}%` }} />
            </div>
          </div>
          <label className="block">
            <p className="mb-1 text-xs text-[var(--text-muted)]">1) 이번 선택에서 잃기 싫은 것 1개</p>
            <input value={lossText} onChange={(e) => setLossText(e.target.value)} className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2" />
          </label>
          <label className="block">
            <p className="mb-1 text-xs text-[var(--text-muted)]">2) 통제 가능한 것 1개 (필수)</p>
            <input value={controlYes} onChange={(e) => setControlYes(e.target.value)} className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2" />
          </label>
          <label className="block">
            <p className="mb-1 text-xs text-[var(--text-muted)]">3) 통제 불가능한 것 1개 (선택)</p>
            <input value={controlNo} onChange={(e) => setControlNo(e.target.value)} className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2" />
          </label>
          <label className="block">
            <p className="mb-1 text-xs text-[var(--text-muted)]">4) If-Then 실행 1줄 (필수)</p>
            <input value={ifThen} onChange={(e) => setIfThen(e.target.value)} placeholder="만약 (상황) 이면, (행동) 하겠다." className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2" />
          </label>

          <div className="flex flex-wrap gap-2">
            <button onClick={saveReflection} className="rounded-lg bg-[var(--gold-line)] px-3 py-2 text-xs font-semibold text-black">성찰 저장하고 종료</button>
            <Link href="/saved" className="rounded-lg border border-white/30 px-3 py-2 text-xs">저장 목록 보기</Link>
            <Link href="/" className="rounded-lg border border-white/30 px-3 py-2 text-xs">오늘은 여기까지</Link>
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/studio" className="rounded-lg border border-white/30 px-3 py-2">학습실험실로 이동</Link>
        <Link href="/hexagrams" className="rounded-lg border border-white/30 px-3 py-2">64괘 전체 보기</Link>
      </div>
    </main>
  );
}
