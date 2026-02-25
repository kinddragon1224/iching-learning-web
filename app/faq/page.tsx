import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I Ching Learning FAQ",
  description:
    "Frequently asked questions about I Ching Learning Web, a structured reflection and learning tool built on the 64 hexagrams.",
};

const faqs = [
  {
    q: "What is I Ching Learning Web?",
    a: "I Ching Learning Web is a structured learning and reflection platform based on the 64 hexagrams. It helps users think through decisions using 4 practical axes: money, work, relationship, and time.",
  },
  {
    q: "Is this a fortune-telling app?",
    a: "No. It is designed as a learning and reflection tool. The focus is interpretation, self-check questions, and actionable thinking—not deterministic prediction.",
  },
  {
    q: "How should I use a hexagram page?",
    a: "Read the summary, review the 4-axis interpretation, check the six-line learning points, then answer one question and convert it into a concrete action for today.",
  },
  {
    q: "Who is this product for?",
    a: "It is for creators, founders, operators, and learners who want a disciplined framework for reflection and better decision quality.",
  },
  {
    q: "How many hexagrams are supported?",
    a: "All 64 hexagrams are supported with detail pages and practical reflection prompts.",
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
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <header>
        <h1 className="text-2xl font-bold">FAQ</h1>
        <p className="text-sm text-neutral-600">Last updated: 2026-02-25</p>
      </header>

      <section className="space-y-4">
        {faqs.map((f) => (
          <article key={f.q} className="rounded-xl border p-4">
            <h2 className="font-semibold">{f.q}</h2>
            <p className="mt-2 text-sm text-neutral-700">{f.a}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
