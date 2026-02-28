"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { WeekProgressPanel } from "@/components/programs/WeekProgressPanel";

const STORAGE_KEY = "basic-track-week1-checklist";

const checklistItems = [
  "양/음 상태를 각각 1문장으로 적었다",
  "8괘 중 현재 상황에 가까운 괘 1개를 선택했다",
  "상징군 2개 이상으로 해석 문장을 만들었다",
  "24시간 내 실행할 행동 1개를 캘린더에 넣었다",
];

export default function BasicTrackWeek1Page() {
  const [checked, setChecked] = useState<boolean[]>(Array(checklistItems.length).fill(false));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as boolean[];
      if (Array.isArray(parsed) && parsed.length === checklistItems.length) setChecked(parsed);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const doneCount = useMemo(() => checked.filter(Boolean).length, [checked]);

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">기초 트랙 · 1주차</p>
        <h1 className="text-3xl font-bold">음양과 8괘 기본 문법</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          이번 주 목표는 상징을 외우는 것이 아니라, 상징을 내 상황의 실행 문장으로 변환하는 것입니다.
        </p>
      </header>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">Step 1 · 음양 문장화</h2>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>양: 확장·추진·표현이 필요한 상태를 한 문장으로 적기</li>
          <li>음: 정리·수용·축적이 필요한 상태를 한 문장으로 적기</li>
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">Step 2 · 8괘 상징 적용</h2>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>건/곤/진/손/감/리/간/태 중 현재 상황에 가장 가까운 괘 1개 선택</li>
          <li>선택한 괘의 상징군(자연·가족·신체·동물)을 2개 이상 연결해 해석</li>
          <li>해석을 “지금 나는 ___를 해야 한다” 문장으로 마무리</li>
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-3 text-sm">
        <h2 className="font-semibold">Step 3 · 시작 체크리스트</h2>
        <p className="text-[var(--text-muted)]">진행도: {doneCount}/{checklistItems.length}</p>
        <div className="space-y-2">
          {checklistItems.map((item, idx) => (
            <label key={item} className="flex items-start gap-2 rounded-lg border border-white/15 p-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={checked[idx]}
                onChange={(e) => {
                  const next = [...checked];
                  next[idx] = e.target.checked;
                  setChecked(next);
                }}
              />
              <span className="text-[var(--text-muted)]">{item}</span>
            </label>
          ))}
        </div>
      </section>

      <WeekProgressPanel week={1} dailyTask="건/곤/진/손 중 오늘 내 상황에 가장 가까운 괘 1개를 고르고 실행 문장 1개를 작성하기" nextHref="/programs/basic-track/week-2" />

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/programs/basic-track/week-2" className="rounded-lg bg-[var(--gold-line)] px-4 py-2 font-semibold text-black">
          2주차로 이동
        </Link>
        <Link href="/programs/basic-track" className="rounded-lg border border-white/30 px-4 py-2">
          커리큘럼으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
