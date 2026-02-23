"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { HEXAGRAMS } from "@/data/hexagrams";
import { FAQS } from "@/data/faq";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";

const KnowledgeUniverse = dynamic(
  () => import("@/components/graph/KnowledgeUniverse").then((m) => m.KnowledgeUniverse),
  { ssr: false }
);

type Step = "concept" | "apply" | "reflect";

const STEP_LABEL: Record<Step, string> = {
  concept: "개념",
  apply: "적용",
  reflect: "회고",
};

function TrustChip({ text }: { text: string }) {
  return <span className="gold-chip rounded-full px-3 py-1 text-xs">{text}</span>;
}

export default function Home() {
  const [step, setStep] = useState<Step>("concept");
  const [quizChoice, setQuizChoice] = useState<string | null>(null);

  const today = useMemo(() => HEXAGRAMS[new Date().getDate() % HEXAGRAMS.length], []);
  const detailHref = today.id === 1 ? "/qian" : `/hexagrams/${today.id}`;

  const progress = step === "concept" ? 34 : step === "apply" ? 67 : 100;
  const isCorrect = quizChoice === "balance";

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8">
      <header className="space-y-3 text-center">
        <p className="text-xs tracking-[0.22em] text-[var(--text-muted)]">ICHING LEARNING SYSTEM</p>
        <h1 className="text-4xl font-bold leading-tight">읽는 페이지가 아니라, 학습이 진행되는 주역 도구</h1>
        <p className="mx-auto max-w-2xl text-sm text-[var(--text-muted)]">
          오늘의 괘를 학습 플로우로 바로 연결하고, 퀴즈/오답노트/복습으로 기억에 남기는 구조.
        </p>
      </header>

      <KnowledgeUniverse />

      <section className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-6 relative overflow-hidden">
          <div className="glow-orb absolute -top-12 -right-8 h-40 w-40" />
          <p className="text-xs text-[var(--text-muted)]">오늘의 괘</p>
          <h2 className="text-3xl font-semibold mt-1">{today.id}. {today.nameKo}</h2>
          <p className="mt-3 text-sm text-[var(--text-muted)] max-w-xl">{today.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <TrustChip text="학습 중심" />
            <TrustChip text="비예언" />
            <TrustChip text="윤리 가드레일" />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={detailHref}>오늘 학습 시작</ButtonLink>
            <ButtonLink href="/hexagrams" variant="secondary">64괘 탐색</ButtonLink>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-[var(--text-muted)]">오늘 목표</p>
          <h3 className="text-lg font-semibold mt-1">20분 집중 학습</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)] list-disc pl-5">
            <li>핵심 원리 1개 이해</li>
            <li>적용 질문 1개 답변</li>
            <li>복습 예약 1회 등록</li>
          </ul>
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">3단 학습 플로우</h3>
            <span className="text-xs text-[var(--text-muted)]">진행률 {progress}%</span>
          </div>

          <div className="progress-rail">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm">
            {(Object.keys(STEP_LABEL) as Step[]).map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`rounded-lg border p-3 text-left ${
                  step === s
                    ? "border-[rgba(212,178,106,0.8)] bg-[rgba(212,178,106,0.14)]"
                    : "border-[rgba(212,178,106,0.35)]"
                }`}
              >
                <p className="text-xs text-[var(--text-muted)]">Step</p>
                <p className="font-semibold">{STEP_LABEL[s]}</p>
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-[rgba(212,178,106,0.35)] p-4 text-sm text-[var(--text-muted)]">
            {step === "concept" && "음/양의 균형 원리를 읽고, 오늘 괘의 핵심 구조를 파악해."}
            {step === "apply" && "현재 상황에 적용할 질문 1개를 선택해서 짧게 답해."}
            {step === "reflect" && "오늘 판단에서 바꿀 행동 1가지를 오답노트에 남겨."}
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-[var(--text-muted)]">복습/기록</p>
          <h3 className="text-lg font-semibold mt-1">학습 도구</h3>
          <div className="mt-3 space-y-2 text-sm">
            <Link href="/search" className="block rounded-lg border border-[rgba(212,178,106,0.35)] p-3">오답노트 열기</Link>
            <Link href="/policy" className="block rounded-lg border border-[rgba(212,178,106,0.35)] p-3">윤리 가이드 확인</Link>
            <Link href="/hexagrams" className="block rounded-lg border border-[rgba(212,178,106,0.35)] p-3">복습 괘 선택</Link>
          </div>
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5">
          <p className="text-xs text-[var(--text-muted)]">퀵퀴즈</p>
          <h3 className="text-lg font-semibold mt-1">Q. 주역 학습의 기본 태도로 가장 적절한 것은?</h3>

          <div className="mt-3 grid gap-2">
            {[
              ["fortune", "정답을 단정해 미래를 확정한다"],
              ["balance", "변화를 읽고 균형 잡힌 판단을 연습한다"],
              ["fear", "불안을 키워 의존성을 높인다"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setQuizChoice(key)}
                className={`rounded-lg border p-3 text-left text-sm ${
                  quizChoice === key
                    ? "border-[rgba(212,178,106,0.8)] bg-[rgba(212,178,106,0.14)]"
                    : "border-[rgba(212,178,106,0.35)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {quizChoice && (
            <div className={`mt-3 rounded-lg p-3 text-sm ${isCorrect ? "quiz-ok" : "quiz-bad"}`}>
              {isCorrect
                ? "정답. 주역은 운명 단정이 아니라 변화 해석과 판단 훈련 도구야."
                : "오답. 이 서비스는 공포 유도/단정 예언을 지양하고 성찰 학습을 지향해."}
            </div>
          )}
        </Card>

        <Card className="p-5">
          <p className="text-xs text-[var(--text-muted)]">플랜</p>
          <h3 className="text-lg font-semibold mt-1">요금/시작</h3>
          <div className="mt-2 grid grid-cols-2 gap-2 text-center text-sm">
            <div className="rounded-lg border border-[rgba(212,178,106,0.45)] p-3">
              <p className="text-xs text-[var(--text-muted)]">월</p>
              <p className="font-semibold">39,000</p>
            </div>
            <div className="rounded-lg border border-[rgba(212,178,106,0.45)] p-3">
              <p className="text-xs text-[var(--text-muted)]">연</p>
              <p className="font-semibold">390,000</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <TrustChip text="7일 이내 전액 환불" />
            <TrustChip text="다크패턴 배제" />
          </div>
          <div className="mt-4 flex gap-2">
            <ButtonLink href="/pricing" variant="secondary">요금 자세히</ButtonLink>
            <ButtonLink href="/checkout">지금 시작</ButtonLink>
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">자주 묻는 질문</h2>
        <div className="grid gap-2">
          {FAQS.map((f) => (
            <Card key={f.q} className="p-4">
              <p className="font-medium">{f.q}</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">{f.a}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="text-xs text-[var(--text-muted)] border-t border-[rgba(212,178,106,0.25)] pt-4">
        본 서비스는 학습 참고용이며 운명 단정, 공포 유도, 강압 결제를 지양합니다.
      </footer>
    </main>
  );
}
