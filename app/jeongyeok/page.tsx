import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "정역 입문 | 역 학습 웹",
  description: "김일부의 정역 관점을 이해하는 심화 페이지",
};

export default function JeongyeokPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">확장 관점</p>
        <h1 className="text-3xl font-bold">정역 입문: 김일부의 후천 관점</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          정역은 괘를 단순 점사로 소비하기보다, 시대 전환과 질서 변화의 관점에서 읽으려는 해석 전통입니다.
        </p>
      </header>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">1) 정역 핵심 개념 5가지</h2>
        <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)]">
          <li><b>후천 전환:</b> 선천 질서에서 후천 질서로의 이동을 큰 축으로 봅니다.</li>
          <li><b>시간성 강조:</b> 정역은 정적인 상징보다 “때의 이동”에 더 큰 비중을 둡니다.</li>
          <li><b>질서 재배열:</b> 기존 배열을 고정 진리로 보지 않고 재해석 가능한 구조로 다룹니다.</li>
          <li><b>문명 단위 시야:</b> 개인 길흉보다 사회·시대 흐름까지 함께 읽으려 합니다.</li>
          <li><b>실천 지향:</b> 해석의 목적을 예언보다 질서 정렬과 행동 설계에 둡니다.</li>
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-3 text-sm">
        <h2 className="font-semibold">2) 역 vs 정역 비교</h2>
        <div className="space-y-2 text-[var(--text-muted)]">
          <p><b>기본 역:</b> 변화의 보편 원리와 상황 해석에 강함</p>
          <p><b>정역:</b> 전환기의 방향성과 후천 질서 해석에 강함</p>
          <p><b>기본 역:</b> 개인·관계·실무 의사결정에 바로 적용하기 쉬움</p>
          <p><b>정역:</b> 시대적 맥락, 구조적 전환 판단에 유리함</p>
          <p><b>공통점:</b> 둘 다 ‘변화’를 읽는 틀이지만, 강조점이 다릅니다.</p>
        </div>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">3) 적용 예시 3가지</h2>
        <div className="space-y-3 text-[var(--text-muted)]">
          <p>
            <b>예시 A · 커리어 전환:</b> 기본 역으로 현재 역량/리스크를 점검하고,
            정역 관점으로는 “산업 전환의 큰 흐름” 위에서 포지션을 재배치합니다.
          </p>
          <p>
            <b>예시 B · 콘텐츠 전략:</b> 기본 역으로 당장 실행할 포맷을 정하고,
            정역으로는 채널 생태계가 어디로 이동하는지(후천적 수요 변화)를 봅니다.
          </p>
          <p>
            <b>예시 C · 팀 운영:</b> 기본 역으로 갈등/역할을 조정하고,
            정역으로는 조직 구조 자체를 재설계할 시점을 판단합니다.
          </p>
        </div>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">4) 혼용할 때 주의할 점</h2>
        <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)]">
          <li>기본 역 해석과 정역 해석을 한 문장에 섞지 말고, 레이어를 분리하세요.</li>
          <li>당장 실행 판단은 기본 역, 구조 전환 판단은 정역으로 역할을 나누세요.</li>
          <li>정역을 만능 예언처럼 쓰지 말고, 방향성 검토 도구로 제한하세요.</li>
        </ul>
      </section>
    </main>
  );
}
