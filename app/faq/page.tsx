import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문 | 주역 학습 웹",
  description:
    "64괘 기반 주역 학습 웹의 자주 묻는 질문. 점술이 아닌 학습/성찰 도구로서의 사용법을 안내합니다.",
};

const faqs = [
  {
    q: "주역 학습 웹은 무엇인가요?",
    a: "64괘를 기반으로 의사결정을 성찰하는 학습 플랫폼입니다. 돈/일/관계/시간의 4축 질문으로 생각을 구조화하도록 돕습니다.",
  },
  {
    q: "점술 앱인가요?",
    a: "아닙니다. 미래를 단정하는 예언형 도구가 아니라, 해석과 자기 점검 질문을 통해 행동을 설계하는 학습/성찰 도구입니다.",
  },
  {
    q: "괘 상세 페이지는 어떻게 활용하나요?",
    a: "요약 → 4축 해석 → 6효 학습 포인트 → 4축 질문 순서로 보고, 오늘 실행할 행동 1개로 연결하시면 됩니다.",
  },
  {
    q: "누가 쓰면 좋나요?",
    a: "창작자, 창업가, 운영자, 실무자처럼 복잡한 선택을 자주 해야 하는 사용자에게 적합합니다.",
  },
  {
    q: "몇 개의 괘를 지원하나요?",
    a: "64괘 전체를 상세 페이지로 지원합니다.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <header>
        <h1 className="text-2xl font-bold">자주 묻는 질문</h1>
        <p className="text-sm text-[var(--text-muted)]">최종 업데이트: 2026-02-26</p>
      </header>

      <section className="space-y-4">
        {faqs.map((f) => (
          <article key={f.q} className="paper-panel rounded-xl p-4">
            <h2 className="font-semibold">{f.q}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{f.a}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
