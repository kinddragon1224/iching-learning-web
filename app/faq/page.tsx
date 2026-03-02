import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문 | 주역 학습 웹",
  description:
    "64괘 기반 주역 학습 웹의 자주 묻는 질문. 점술이 아닌 학습/성찰 도구로서의 사용법을 안내합니다.",
};

const faqs = [
  {
    q: "이 웹은 점술 앱인가요?",
    a: "아니요. 미래를 단정하는 예언 도구가 아니라, 상황을 구조화해서 더 나은 결정을 돕는 학습/성찰 도구입니다.",
  },
  {
    q: "처음 들어왔는데 어디서 시작하면 좋나요?",
    a: "권장 순서는 ① 기본 원리 → ② 8괘 입문 → ③ 64괘 목록/탐색 → ④ 랜덤 괘 실험실입니다. 하루 1회는 ‘오늘의 물음’으로 짧게 시작해도 좋습니다.",
  },
  {
    q: "괘 상세 페이지는 어떻게 읽나요?",
    a: "가장 위의 괘사(큰 흐름)부터 보고, 그다음 6효를 현재 단계와 연결하세요. 마지막엔 ‘오늘 실행 1개’를 정하는 방식이 가장 실용적입니다.",
  },
  {
    q: "6효가 어려워요. 핵심만 보면 어떤가요?",
    a: "괜찮습니다. 초효(시작)·삼/사효(전환)·상효(마무리)만 먼저 보세요. 이후 익숙해지면 6효 전체로 확장하면 됩니다.",
  },
  {
    q: "한자를 잘 모르는데 사용 가능한가요?",
    a: "가능합니다. 상세 페이지는 한자 원문과 함께 한글 읽기/해석을 같이 제공합니다. 먼저 한글 해석 중심으로 학습해도 충분합니다.",
  },
  {
    q: "오늘의 물음(Lite/Deep)은 어떻게 다르나요?",
    a: "Lite는 빠른 1괘 성찰용, Deep은 변효/변화를 함께 보며 더 깊게 점검할 때 사용합니다. 바쁜 날은 Lite, 의사결정이 큰 날은 Deep을 권장합니다.",
  },
  {
    q: "랜덤 괘 실험실은 무엇을 위해 있나요?",
    a: "암기보다 패턴 감각을 기르기 위한 학습 모드입니다. 맞추기/틀리기보다 ‘왜 그렇게 읽었는지’ 기록하는 것이 핵심입니다.",
  },
  {
    q: "저장 목록(/saved)은 어떻게 활용하면 좋나요?",
    a: "질문 축(돈/일/관계/시간)별로 기록을 모아보면 반복되는 의사결정 패턴이 보입니다. 주 1회 요약해서 실행 항목만 남기는 방식이 효과적입니다.",
  },
  {
    q: "결과가 마음에 안 들면 다시 뽑아도 되나요?",
    a: "가능하지만, 연속 재추첨보다 처음 결과를 기준으로 10분만 기록/성찰해보는 것을 권장합니다. 핵심은 정답 찾기가 아니라 관점 정렬입니다.",
  },
  {
    q: "누가 쓰면 특히 도움이 되나요?",
    a: "창작자, 창업가, 운영자, 팀 리더처럼 불확실한 선택을 자주 해야 하는 사용자에게 특히 유용합니다.",
  },
  {
    q: "해석이 이상하거나 오타를 발견하면?",
    a: "좋은 피드백입니다. 괘 번호/효 번호/문장 캡처를 함께 알려주시면 우선 교정합니다. 현재는 배치 검수 방식으로 품질을 계속 개선 중입니다.",
  },
  {
    q: "이 서비스가 대신 결정해주나요?",
    a: "아니요. 최종 결정은 사용자 몫입니다. 이 서비스는 판단 재료를 정리하고 시야를 넓히는 보조 도구입니다.",
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
        <p className="text-sm text-[var(--text-muted)]">최종 업데이트: 2026-03-02</p>
      </header>

      <section className="space-y-4">
        {faqs.map((f) => (
          <article key={f.q} className="paper-panel rounded-xl p-4">
            <h2 className="font-semibold">Q. {f.q}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">A. {f.a}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
