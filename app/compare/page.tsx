import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비교 | 주역 학습 웹",
  description:
    "주역 학습 웹과 일반 점술 앱의 차이를 목적, 사용 방식, 의사결정 지원 관점에서 비교합니다.",
};

const items = [
  {
    title: "핵심 목적",
    left: "결과/예측 중심 사용",
    right: "학습/성찰 중심 사용",
  },
  {
    title: "의사결정 지원",
    left: "일반 해석 위주",
    right: "4축 질문(돈/일/관계/시간) 기반 실행 점검",
  },
  {
    title: "결과물 형태",
    left: "단발성 읽기",
    right: "반복 가능한 질문-행동 루프",
  },
  {
    title: "학습 구조",
    left: "방법론이 불투명한 경우가 많음",
    right: "괘 요약 + 6효 포인트 + 성찰 질문 구조화",
  },
];

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6 pt-24">
      <header>
        <h1 className="text-2xl font-bold">주역 학습 웹 vs 일반 점술 앱</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">최종 업데이트: 2026-02-26</p>
      </header>

      <p className="text-sm text-[var(--text-muted)]">
        요약: 주역 학습 웹은 "예언"보다 "성찰과 실행"에 초점을 둡니다. 즉시 해답을 주는 방식보다,
        생각을 정리하고 행동을 설계하는 반복 가능한 학습 루프를 제공합니다.
      </p>

      <section className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="paper-panel rounded-xl p-4 space-y-2">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-xs text-[var(--text-muted)]">일반 점술 앱</p>
            <p className="text-sm">{item.left}</p>
            <p className="pt-1 text-xs text-[var(--text-muted)]">주역 학습 웹</p>
            <p className="text-sm text-[#f4dfad]">{item.right}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
