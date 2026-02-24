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

export default function SavedPage() {
  const [items, setItems] = useState<ActionRecord[]>([]);
  const [filter, setFilter] = useState<"all" | Axis>("all");
  const [active, setActive] = useState<ActionRecord | null>(null);

  useEffect(() => {
    setItems(loadActions());
  }, []);

  const weekly = useMemo(() => buildWeeklyReport(items), [items]);
  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((r) => r.question_axis === filter)),
    [items, filter]
  );

  const exportText = useMemo(() => {
    const recent3 = weekly.recent.slice(0, 3);
    return [
      weekly.text.split("\n")[0],
      `요약: 저장 ${weekly.recent.length}개 / 했다 ${weekly.done} / 내일로 ${weekly.defer}`,
      `주요 축: ${AXIS_LABEL[weekly.primary]} (${weekly.primaryPct}%)`,
      `전략: ${weekly.strategy}`,
      `최근 실행 3개:`,
      ...(recent3.length
        ? recent3.map((r, i) => `${i + 1}. ${r.hexagram_title} · ${AXIS_LABEL[r.question_axis]} · ${r.answer_state === "done" ? "했다" : "내일로"}`)
        : ["- 기록 없음"]),
    ].join("\n");
  }, [weekly]);

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-5">
      <Link href="/" className="text-sm underline">← 우주로 돌아가기</Link>
      <h1 className="text-2xl font-bold">저장 목록</h1>

      <section className="rounded-xl border p-4 text-sm">
        <p className="font-semibold">이번 주 요약(최근 7일)</p>
        <p className="mt-2">총 저장: <b>{weekly.recent.length}</b> · 했다 {weekly.done} / 내일로 {weekly.defer}</p>
        <p>가장 많이 다룬 축: <b>{AXIS_LABEL[weekly.primary]}</b> ({weekly.primaryPct}%)</p>
        <button
          className="mt-3 rounded border px-3 py-1.5"
          onClick={async () => {
            await navigator.clipboard.writeText(exportText);
            alert("주간 리포트 복사됨");
          }}
        >
          내보내기(복사)
        </button>
      </section>

      {items.length === 0 ? (
        <section className="rounded-xl border p-5 text-sm">
          <p className="text-neutral-600">아직 저장이 없어. 오늘은 4축 중 하나만 골라 저장해봐.</p>
          <Link href="/" className="mt-3 inline-block rounded border px-3 py-1.5">첫 저장 하러가기</Link>
        </section>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full border px-3 py-1 text-xs ${filter === f.key ? "bg-black text-white" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <section className="space-y-2">
            {filtered.map((r) => (
              <button
                key={r.id}
                className="block w-full rounded-xl border p-3 text-left text-sm"
                onClick={() => setActive(r)}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{r.hexagram_title}</p>
                  <span className="rounded-full border px-2 py-0.5 text-xs">{AXIS_LABEL[r.question_axis]}</span>
                </div>
                <p className="mt-1 text-xs text-neutral-600">{r.date} · {r.answer_state === "done" ? "했다" : "내일로"}</p>
                <p className="mt-2 line-clamp-2">{r.question_text}</p>
              </button>
            ))}
          </section>
        </>
      )}

      {active && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4">
          <div className="mx-auto mt-24 max-w-md rounded-2xl bg-white p-4 text-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{active.hexagram_title}</p>
              <button className="text-xs underline" onClick={() => setActive(null)}>닫기</button>
            </div>
            <p className="mt-2">{active.question_text}</p>
            <div className="mt-3 flex gap-2">
              <button
                className="rounded border px-2 py-1 text-xs"
                onClick={() => {
                  const next = items.map((x) => (x.id === active.id ? { ...x, answer_state: "done" as const } : x));
                  setItems(next);
                  saveActions(next);
                  setActive({ ...active, answer_state: "done" });
                }}
              >
                했다
              </button>
              <button
                className="rounded border px-2 py-1 text-xs"
                onClick={() => {
                  const next = items.map((x) => (x.id === active.id ? { ...x, answer_state: "defer" as const } : x));
                  setItems(next);
                  saveActions(next);
                  setActive({ ...active, answer_state: "defer" });
                }}
              >
                내일로
              </button>
              <button
                className="rounded border px-2 py-1 text-xs"
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
                className="rounded border px-2 py-1 text-xs"
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
