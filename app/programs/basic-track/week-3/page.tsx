import Link from "next/link";

export default function BasicTrackWeek3Page() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">기초 트랙 · 3주차</p>
        <h1 className="text-3xl font-bold">해석 프레임 훈련</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          같은 괘라도 맥락에 따라 해석이 달라지는 이유를 실전 프레임으로 훈련합니다.
        </p>
      </header>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">Step 1 · 케이스 3개 분리</h2>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>개인 결정, 관계 갈등, 실무 선택 3개 케이스를 분리합니다.</li>
          <li>같은 괘를 각 케이스에 적용해 해석 포인트 차이를 기록합니다.</li>
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">Step 2 · 근거 문장화</h2>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>해석마다 “왜 그렇게 보는지” 근거를 1문장으로 명시합니다.</li>
          <li>상징군/괘 구조/상황 맥락 중 최소 2개를 근거로 연결합니다.</li>
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">Step 3 · 피드백 루프</h2>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>해석 문장을 24시간 뒤 다시 읽고 과장/단정 표현을 줄입니다.</li>
          <li>최종 문장을 “행동 선택” 문장으로 다시 고정합니다.</li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/programs/basic-track/week-4" className="rounded-lg bg-[var(--gold-line)] px-4 py-2 font-semibold text-black">
          4주차로 이동
        </Link>
        <Link href="/programs/basic-track" className="rounded-lg border border-white/30 px-4 py-2">
          커리큘럼으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
