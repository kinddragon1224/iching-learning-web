import Link from "next/link";
import { WeekProgressPanel } from "@/components/programs/WeekProgressPanel";

export default function BasicTrackWeek2Page() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">기초 트랙 · 2주차</p>
        <h1 className="text-3xl font-bold">64괘 구조 이해</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          2주차는 64괘를 외우는 대신 상괘/하괘 조합 규칙으로 읽는 훈련을 진행합니다.
        </p>
      </header>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">Step 1 · 조합 분해</h2>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>한 괘를 고른 뒤 상괘/하괘를 먼저 분리합니다.</li>
          <li>상·하괘 상징군을 1개씩 연결해 상황의 충돌/보완 지점을 정리합니다.</li>
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">Step 2 · 10괘 요약 노트</h2>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>대표 10괘를 골라 괘마다 2문장 요약을 만듭니다.</li>
          <li>문장 형식: “이 괘는 ___ 상황에서 ___를 우선한다.”</li>
        </ul>
      </section>

      <WeekProgressPanel week={2} dailyTask="64괘 중 1개를 고르고 상괘/하괘를 분해해 2문장 요약 작성하기" nextHref="/programs/basic-track/week-3" />

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/programs/basic-track/week-3" className="rounded-lg bg-[var(--gold-line)] px-4 py-2 font-semibold text-black">
          3주차로 이동
        </Link>
        <Link href="/programs/basic-track" className="rounded-lg border border-white/30 px-4 py-2">
          커리큘럼으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
