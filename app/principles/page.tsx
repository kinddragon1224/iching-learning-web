import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "역의 기본 원리 | 주역 학습 웹",
  description: "계사전 관점을 바탕으로 음양과 변화의 기본 원리를 이해하는 입문 페이지",
};

export default function PrinciplesPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">입문 원리</p>
        <h1 className="text-3xl font-bold">역의 기본 원리: 음양과 변화</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          이 페이지는 <b>계사전</b>의 핵심 관점을 참고해, 주역을 처음 접하는 분도 이해할 수 있도록 정리했습니다.
        </p>
      </header>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">1) 음양은 선악이 아니라 리듬입니다</h2>
        <p>
          계사전의 핵심 구절로 자주 인용되는 “<b>일음일양지위도(一陰一陽之謂道)</b>”는,
          음과 양이 번갈아 작용하는 흐름 자체를 ‘도’로 본다는 뜻입니다.
        </p>
        <p className="text-[var(--text-muted)]">
          즉, 음은 나쁘고 양은 좋은 것이 아니라, 상황에 따라 필요한 작동 모드가 다를 뿐입니다.
        </p>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">2) 주역은 고정 해석이 아니라 변화의 읽기입니다</h2>
        <p>
          계사전은 역을 ‘변화의 원리’를 읽는 학문으로 봅니다. 그래서 괘는 정답 카드가 아니라,
          현재 흐름을 점검하고 다음 행동을 설계하는 프레임입니다.
        </p>
        <p className="text-[var(--text-muted)]">
          같은 괘라도 사람·시기·맥락에 따라 적용 포인트는 달라질 수 있습니다.
        </p>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">3) 태극 → 음양 → 사상 → 팔괘 → 64괘</h2>
        <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)]">
          <li>태극: 아직 나뉘지 않은 하나의 근원</li>
          <li>음양: 상반되지만 서로를 필요로 하는 두 작용</li>
          <li>사상: 음양이 다시 분화된 네 가지 양상</li>
          <li>팔괘: 자연과 삶의 기본 상황을 나타내는 8개 기호</li>
          <li>64괘: 현실의 복합 상황을 더 정밀하게 읽는 확장 구조</li>
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">4) 실전 적용 한 줄</h2>
        <p>
          주역 질문은 “맞다/틀리다”보다, <b>지금 무엇을 줄이고 무엇을 키울지</b>를 결정하는 데 쓰는 것이 가장 실용적입니다.
        </p>
      </section>
    </main>
  );
}
