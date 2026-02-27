import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "정역 입문 | 역 학습 웹",
  description: "김일부의 정역 관점을 간단히 이해하는 입문 페이지",
};

export default function JeongyeokPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">확장 관점</p>
        <h1 className="text-3xl font-bold">정역 입문: 김일부의 후천 관점</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          정역은 주어진 괘를 점술적으로 소비하기보다, 시대 전환과 질서 변화의 관점에서 읽으려는 해석 전통입니다.
        </p>
      </header>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">1) 정역은 무엇인가</h2>
        <p>
          정역은 조선 후기 사상가 <b>김일부</b>가 제시한 역학 체계로, 기존 역의 틀을 그대로 반복하기보다
          변화의 방향을 재배치해 읽으려는 시도입니다.
        </p>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">2) 핵심 포인트</h2>
        <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)]">
          <li>선천 중심 해석에서 후천 질서로의 전환 강조</li>
          <li>시간성과 우주 질서의 재배열에 주목</li>
          <li>개인 점사보다 시대·문명 단위의 흐름 해석 비중이 큼</li>
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">3) 이 사이트에서의 활용법</h2>
        <p>
          기본 학습(8괘·64괘)로 구조를 익힌 뒤, 정역 관점은 <b>확장 해석 레이어</b>로 덧붙여 보는 것을 권장합니다.
          즉, 본문은 기본 역 프레임을 따르고, 정역은 관점 비교용으로 분리해 쓰는 방식입니다.
        </p>
      </section>
    </main>
  );
}
