"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AXIS_LABEL,
  buildWeeklyReport,
  loadActions,
  saveActions,
  type ActionRecord,
} from "@/lib/action-loop";

export default function SavedPage() {
  const [items, setItems] = useState<ActionRecord[]>([]);

  useEffect(() => {
    setItems(loadActions());
  }, []);

  const weekly = useMemo(() => buildWeeklyReport(items), [items]);

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
            await navigator.clipboard.writeText(weekly.text);
            alert("주간 리포트 복사됨");
          }}
        >
          내보내기(복사)
        </button>
      </section>

      <section className="space-y-2">
        {items.length === 0 && <p className="text-sm text-neutral-500">아직 저장된 실행 항목이 없어.</p>}
        {items.map((r) => (
          <div key={r.id} className="rounded-xl border p-3 text-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">{r.hexagram_title}</p>
              <span className="rounded-full border px-2 py-0.5 text-xs">{AXIS_LABEL[r.question_axis]}</span>
            </div>
            <p className="mt-1 text-xs text-neutral-600">{r.date} · {r.answer_state === "done" ? "했다" : "내일로"}</p>
            <p className="mt-2">{r.question_text}</p>
            <div className="mt-2 flex gap-2">
              <button
                className="rounded border px-2 py-1 text-xs"
                onClick={() => {
                  const note = prompt("메모 수정", r.note || "") ?? r.note;
                  const next = items.map((x) => (x.id === r.id ? { ...x, note } : x));
                  setItems(next);
                  saveActions(next);
                }}
              >
                메모
              </button>
              <button
                className="rounded border px-2 py-1 text-xs"
                onClick={() => {
                  const next = items.filter((x) => x.id !== r.id);
                  setItems(next);
                  saveActions(next);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
