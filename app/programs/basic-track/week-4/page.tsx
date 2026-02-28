import Link from "next/link";
import { WeekProgressPanel } from "@/components/programs/WeekProgressPanel";

export default function BasicTrackWeek4Page() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">기초 트랙 · 4주차</p>
        <h1 className="text-3xl font-bold">적용과 정리</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          학습 내용을 실제 선택과 운영 루틴에 연결해, 반복 가능한 개인 프레임으로 정리합니다.
        </p>
      </header>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">Step 1 · 적용 보고서 1회</h2>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>최근 2주 내 실제 결정 1건을 골라 해석 적용 과정을 작성합니다.</li>
          <li>결과와 한계를 분리해 기록합니다.</li>
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">Step 2 · 재사용 템플릿 고정</h2>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>내가 자주 쓰는 해석 문장 틀 3개를 고정합니다.</li>
          <li>질문 템플릿 3개(상황/근거/행동)도 함께 고정합니다.</li>
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">Step 3 · 다음 학습 계획</h2>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>약점 영역 1개(예: 구조 해석/문장화/적용)를 지정합니다.</li>
          <li>다음 4주 학습 목표를 1문장으로 작성합니다.</li>
        </ul>
      </section>

      <WeekProgressPanel week={4} dailyTask="적용 보고서 1회 작성 후 다음 4주 학습 목표를 1문장으로 고정하기" />

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/pro" className="rounded-lg bg-[var(--gold-line)] px-4 py-2 font-semibold text-black">
          실전 트랙 보기
        </Link>
        <Link href="/programs/basic-track" className="rounded-lg border border-white/30 px-4 py-2">
          커리큘럼으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
