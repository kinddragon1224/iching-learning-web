import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "기초 학습 트랙(4주) | 역 학습 웹",
  description: "8괘에서 64괘까지 해석 구조를 익히는 4주 학습 커리큘럼",
};

const weeks = [
  {
    title: "1주차 · 음양과 8괘 기본 문법",
    goal: "음양·팔괘의 핵심 상징을 구분하고 설명할 수 있다.",
    tasks: ["8괘 상징 카드 정리", "상징군 매핑 실습", "개인 해석 노트 1회"],
  },
  {
    title: "2주차 · 64괘 구조 이해",
    goal: "상괘/하괘 조합으로 64괘의 구조를 읽을 수 있다.",
    tasks: ["괘 조합 원리 학습", "대표 8괘 확장 실습", "핵심 괘 10개 요약"],
  },
  {
    title: "3주차 · 해석 프레임 훈련",
    goal: "같은 괘를 상황별로 다르게 해석하는 기준을 익힌다.",
    tasks: ["케이스 3개 해석", "해석 근거 문장화", "피드백 기반 수정"],
  },
  {
    title: "4주차 · 적용과 정리",
    goal: "학습 내용을 실무/일상 의사결정에 연결한다.",
    tasks: ["적용 보고서 1회", "재사용 템플릿 정리", "다음 학습 계획 수립"],
  },
];

export default function BasicTrackPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">학습 프로그램</p>
        <h1 className="text-3xl font-bold">기초 학습 트랙 (4주)</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          점술 서비스가 아니라 해석 역량을 훈련하는 학습 트랙입니다.
        </p>
      </header>

      <section className="rounded-xl border border-[rgba(212,178,106,0.3)] p-4 text-sm">
        <p><b>대상:</b> 역 해석을 체계적으로 처음 정리하려는 학습자</p>
        <p className="mt-1"><b>형태:</b> 주차별 미션 + 체크리스트 + 적용 노트</p>
        <p className="mt-1"><b>성과:</b> 8괘~64괘를 상황에 맞게 설명하고 적용하는 기본 역량</p>
      </section>

      <section className="space-y-3">
        {weeks.map((w) => (
          <article key={w.title} className="paper-panel rounded-xl p-4">
            <h2 className="font-semibold">{w.title}</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">목표: {w.goal}</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-[var(--text-muted)] space-y-1">
              {w.tasks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-3 text-sm">
        <h2 className="font-semibold">1주차 학습 콘텐츠 (실전)</h2>
        <p className="text-[var(--text-muted)]">
          이번 주의 핵심은 “상징을 외우는 것”이 아니라 “상징을 상황 문장으로 바꾸는 것”입니다.
          아래 순서대로 진행해 보세요.
        </p>

        <div className="space-y-2">
          <p><b>Step 1. 음양 문장화</b></p>
          <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
            <li>양: 확장·추진·표현이 필요한 상태를 한 문장으로 적기</li>
            <li>음: 정리·수용·축적이 필요한 상태를 한 문장으로 적기</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p><b>Step 2. 8괘 상징 적용</b></p>
          <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
            <li>건/곤/진/손/감/리/간/태 중 현재 상황에 가장 가까운 괘 1개 선택</li>
            <li>선택한 괘의 상징군(자연·가족·신체·동물)을 2개 이상 연결해 해석</li>
            <li>해석을 “지금 나는 ___를 해야 한다” 문장으로 마무리</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p><b>Step 3. 체크리스트</b></p>
          <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
            <li>상징을 그대로 복붙하지 않고 내 상황 언어로 바꿨는가?</li>
            <li>감정 해소가 아니라 행동 선택으로 연결했는가?</li>
            <li>24시간 내 실행할 1개 행동을 캘린더에 넣었는가?</li>
          </ul>
        </div>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-3 text-sm">
        <h2 className="font-semibold">2주차 학습 콘텐츠 (구조 읽기)</h2>
        <p className="text-[var(--text-muted)]">
          2주차는 64괘를 “외우는 대상”이 아니라 “상괘/하괘 조합 규칙”으로 이해하는 주간입니다.
        </p>

        <div className="space-y-2">
          <p><b>Step 1. 조합 분해</b></p>
          <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
            <li>한 괘를 고른 뒤 상괘/하괘를 먼저 분리한다.</li>
            <li>각 괘의 상징군을 1개씩 뽑아 “상황 충돌/보완”을 본다.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p><b>Step 2. 10괘 요약 노트</b></p>
          <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
            <li>대표 10괘를 골라 괘마다 2문장 요약을 만든다.</li>
            <li>문장 형식: “이 괘는 ___ 상황에서 ___를 우선한다.”</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p><b>Step 3. 저메모리용 오늘 Top-3</b></p>
          <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
            <li>오늘 볼 괘 1개 정하기</li>
            <li>상괘/하괘 한 줄로 분리하기</li>
            <li>실행 문장 1개 캘린더에 넣기</li>
          </ul>
        </div>
      </section>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/checkout" className="rounded-lg bg-[var(--gold-line)] px-4 py-2 font-semibold text-black">
          이 트랙 신청하기
        </Link>
        <Link href="/pro" className="rounded-lg border border-white/30 px-4 py-2">
          Pro 소개로 돌아가기
        </Link>
      </div>
    </main>
  );
}
