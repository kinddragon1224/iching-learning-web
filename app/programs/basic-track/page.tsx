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
    href: "/programs/basic-track/week-1",
  },
  {
    title: "2주차 · 64괘 구조 이해",
    goal: "상괘/하괘 조합으로 64괘의 구조를 읽을 수 있다.",
    tasks: ["괘 조합 원리 학습", "대표 8괘 확장 실습", "핵심 괘 10개 요약"],
    href: "/programs/basic-track/week-2",
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
            {w.href && (
              <Link href={w.href} className="mt-3 inline-block text-xs underline text-[var(--text-muted)]">
                이번 주 학습 시작하기
              </Link>
            )}
          </article>
        ))}
      </section>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/programs/basic-track/week-1" className="rounded-lg bg-[var(--gold-line)] px-4 py-2 font-semibold text-black">
          1주차 바로 시작
        </Link>
        <Link href="/checkout" className="rounded-lg border border-white/30 px-4 py-2">
          이 트랙 신청하기
        </Link>
        <Link href="/pro" className="rounded-lg border border-white/30 px-4 py-2">
          Pro 소개로 돌아가기
        </Link>
      </div>
    </main>
  );
}
