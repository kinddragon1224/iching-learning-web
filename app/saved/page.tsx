"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AXIS_LABEL,
  buildWeeklyReport,
  loadActions,
  saveActions,
  type ActionRecord,
  type Axis,
} from "@/lib/action-loop";

const FILTERS: Array<{ key: "all" | Axis; label: string }> = [
  { key: "all", label: "전체" },
  { key: "money", label: "돈" },
  { key: "work", label: "일" },
  { key: "relation", label: "관계" },
  { key: "time", label: "시간" },
];

type DailyReflection = {
  date: string;
  hexId: number;
  hexName: string;
  mode: "lite" | "deep";
  question?: string;
  lossText?: string;
  controlYes: string;
  controlNo?: string;
  ifThen: string;
  createdAt: string;
};

export default function SavedPage() {
  const [items, setItems] = useState<ActionRecord[]>([]);
  const [reflections, setReflections] = useState<DailyReflection[]>([]);
  const [filter, setFilter] = useState<"all" | Axis>("all");
  const [active, setActive] = useState<ActionRecord | null>(null);

  useEffect(() => {
    setItems(loadActions());
    try {
      const raw = localStorage.getItem("daily_reflections_v1");
      setReflections(raw ? (JSON.parse(raw) as DailyReflection[]) : []);
    } catch {
      setReflections([]);
    }
  }, []);

  const weekly = useMemo(() => buildWeeklyReport(items), [items]);
  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((r) => r.question_axis === filter)),
    [items, filter]
  );

  const reflectionWeekly = useMemo(() => {
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - 6);
    const recent = reflections.filter((r) => {
      const d = new Date(`${r.date}T00:00:00`);
      return d >= new Date(start.toDateString()) && d <= new Date(end.toDateString());
    });
    return recent;
  }, [reflections]);

  const reflectionInsight = useMemo(() => {
    if (reflectionWeekly.length === 0) {
      return {
        topHex: "-",
        topIfThen: "-",
        risk: "기록이 없어 패턴을 분석할 수 없어.",
        nextAction: "오늘 /daily에서 1회 기록부터 시작",
      };
    }

    const hexCount = new Map<string, number>();
    const ifThenHead = new Map<string, number>();

    reflectionWeekly.forEach((r) => {
      const hexKey = `#${r.hexId} ${r.hexName}`;
      hexCount.set(hexKey, (hexCount.get(hexKey) ?? 0) + 1);

      const head = (r.ifThen || "").slice(0, 18);
      if (head) ifThenHead.set(head, (ifThenHead.get(head) ?? 0) + 1);
    });

    const topHex = [...hexCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
    const topIfThen = [...ifThenHead.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";

    const noControl = reflectionWeekly.filter((r) => !(r.controlYes || "").trim()).length;
    const risk = noControl > 0
      ? "통제 가능한 것 입력이 비어 있는 기록이 있어 실행 전환이 약해질 수 있어."
      : "통제 가능한 것 입력은 안정적이야. 이제 If-Then을 더 구체화하면 좋아.";

    const nextAction = `이번 주 핵심 패턴(${topHex}) 기준으로 If-Then 1줄을 24시간 행동으로 줄여 실행해.`;

    return { topHex, topIfThen, risk, nextAction };
  }, [reflectionWeekly]);

  const exportText = useMemo(() => {
    const recent3 = weekly.recent.slice(0, 3);
    return [
      weekly.text.split("\n")[0],
      `요약: 저장 ${weekly.recent.length}개 / 완료 ${weekly.done} / 보류 ${weekly.defer}`,
      `주요 축: ${AXIS_LABEL[weekly.primary]} (${weekly.primaryPct}%)`,
      `전략: ${weekly.strategy}`,
      `최근 실행 3개:`,
      ...(recent3.length
        ? recent3.map((r, i) => `${i + 1}. ${r.hexagram_title} · ${AXIS_LABEL[r.question_axis]} · ${r.answer_state === "done" ? "완료" : "보류"}`)
        : ["- 기록 없음"]),
    ].join("\n");
  }, [weekly]);

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-6 pt-24">
      <Link href="/" className="text-sm underline">← 홈으로 돌아가기</Link>
      <h1 className="text-2xl font-bold">저장 목록</h1>

      <section className="paper-panel rounded-xl p-4 text-sm">
        <p className="font-semibold">이번 주 요약 (최근 7일)</p>
        <p className="mt-2 text-[var(--text-muted)]">총 저장: <b>{weekly.recent.length}</b> · 완료 {weekly.done} / 보류 {weekly.defer}</p>
        <p className="text-[var(--text-muted)]">가장 많이 다룬 축: <b>{AXIS_LABEL[weekly.primary]}</b> ({weekly.primaryPct}%)</p>
        <button
          className="mt-3 rounded border border-white/30 px-3 py-1.5"
          onClick={async () => {
            await navigator.clipboard.writeText(exportText);
            alert("주간 리포트가 복사되었습니다.");
          }}
        >
          내보내기(복사)
        </button>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm">
        <p className="font-semibold">오늘의 물음 성찰 기록</p>
        <p className="mt-2 text-[var(--text-muted)]">최근 7일 기록: <b>{reflectionWeekly.length}</b>개</p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs">
          <div className="rounded-lg border border-white/15 p-2">
            <p className="text-[var(--text-muted)]">자주 등장한 괘</p>
            <p className="mt-1 font-medium">{reflectionInsight.topHex}</p>
          </div>
          <div className="rounded-lg border border-white/15 p-2">
            <p className="text-[var(--text-muted)]">자주 쓰는 If-Then 패턴</p>
            <p className="mt-1 font-medium">{reflectionInsight.topIfThen}</p>
          </div>
        </div>

        <div className="mt-2 rounded-lg border border-amber-300/25 bg-amber-200/5 p-2 text-xs">
          <p><b>리스크:</b> {reflectionInsight.risk}</p>
          <p className="mt-1"><b>다음 행동 1개:</b> {reflectionInsight.nextAction}</p>
        </div>

        {reflectionWeekly.length === 0 ? (
          <p className="mt-2 text-[var(--text-muted)]">아직 성찰 기록이 없습니다. /daily에서 If-Then 1줄까지 저장해보세요.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-xs">
            {reflectionWeekly.slice(0, 7).map((r, idx) => (
              <li key={`${r.createdAt}-${idx}`} className="rounded border border-white/15 px-2 py-2">
                <p><b>{r.date}</b> · #{r.hexId} {r.hexName} · {r.mode.toUpperCase()}</p>
                {r.question ? <p className="text-[var(--text-muted)]">질문: {r.question}</p> : null}
                <p>통제 가능: {r.controlYes}</p>
                <p className="text-[var(--text-muted)]">If-Then: {r.ifThen}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {items.length === 0 ? (
        <section className="paper-panel rounded-xl p-5 text-sm">
          <p className="text-[var(--text-muted)]">아직 저장이 없습니다. 오늘은 4축 중 하나만 골라 저장해보세요.</p>
          <Link href="/" className="mt-3 inline-block rounded border border-white/30 px-3 py-1.5">첫 저장 하러가기</Link>
        </section>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full border px-3 py-1 text-xs ${filter === f.key ? "border-[var(--gold-line)] bg-[rgba(212,178,106,0.15)]" : "border-white/25"}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <section className="space-y-2">
            {filtered.map((r) => (
              <button
                key={r.id}
                className="paper-panel block w-full rounded-xl p-3 text-left text-sm"
                onClick={() => setActive(r)}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{r.hexagram_title}</p>
                  <span className="rounded-full border border-white/25 px-2 py-0.5 text-xs">{AXIS_LABEL[r.question_axis]}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{r.date} · {r.answer_state === "done" ? "완료" : "보류"}</p>
                <p className="mt-2 line-clamp-2 text-[var(--text-muted)]">{r.question_text}</p>
              </button>
            ))}
          </section>
        </>
      )}

      {active && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4">
          <div className="paper-panel mx-auto mt-24 max-w-md rounded-2xl p-4 text-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{active.hexagram_title}</p>
              <button className="text-xs underline" onClick={() => setActive(null)}>닫기</button>
            </div>
            <p className="mt-2 text-[var(--text-muted)]">{active.question_text}</p>
            <div className="mt-3 flex gap-2">
              <button
                className="rounded border border-white/30 px-2 py-1 text-xs"
                onClick={() => {
                  const next = items.map((x) => (x.id === active.id ? { ...x, answer_state: "done" as const } : x));
                  setItems(next);
                  saveActions(next);
                  setActive({ ...active, answer_state: "done" });
                }}
              >
                완료
              </button>
              <button
                className="rounded border border-white/30 px-2 py-1 text-xs"
                onClick={() => {
                  const next = items.map((x) => (x.id === active.id ? { ...x, answer_state: "defer" as const } : x));
                  setItems(next);
                  saveActions(next);
                  setActive({ ...active, answer_state: "defer" });
                }}
              >
                보류
              </button>
              <button
                className="rounded border border-white/30 px-2 py-1 text-xs"
                onClick={() => {
                  const note = prompt("메모(최대 50자)", active.note || "") ?? active.note;
                  const clipped = note.slice(0, 50);
                  const next = items.map((x) => (x.id === active.id ? { ...x, note: clipped } : x));
                  setItems(next);
                  saveActions(next);
                  setActive({ ...active, note: clipped });
                }}
              >
                메모
              </button>
              <button
                className="rounded border border-white/30 px-2 py-1 text-xs"
                onClick={() => {
                  const next = items.filter((x) => x.id !== active.id);
                  setItems(next);
                  saveActions(next);
                  setActive(null);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
