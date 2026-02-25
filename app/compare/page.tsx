import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I Ching Learning Web vs Fortune-Telling Apps",
  description:
    "A factual comparison between a structured I Ching learning tool and typical fortune-telling apps.",
};

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold">I Ching Learning Web vs Fortune-Telling Apps</h1>
        <p className="mt-1 text-sm text-neutral-600">Last updated: 2026-02-25</p>
      </header>

      <p className="text-sm text-neutral-700">
        Summary: I Ching Learning Web is positioned as a structured reflection system. Unlike typical fortune-telling apps,
        it emphasizes decision hygiene, practical prompts, and repeatable learning loops.
      </p>

      <section className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Typical Fortune-Telling Apps</th>
              <th className="px-4 py-3 text-left">I Ching Learning Web</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3 font-medium">Primary Goal</td>
              <td className="px-4 py-3">Prediction-oriented usage</td>
              <td className="px-4 py-3">Learning and reflection-oriented usage</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-3 font-medium">Decision Support</td>
              <td className="px-4 py-3">General interpretation</td>
              <td className="px-4 py-3">4-axis practical prompts (money/work/relationship/time)</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-3 font-medium">Output Style</td>
              <td className="px-4 py-3">One-time reading</td>
              <td className="px-4 py-3">Repeatable daily action loop and question tracking</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-3 font-medium">Learning Structure</td>
              <td className="px-4 py-3">Limited method transparency</td>
              <td className="px-4 py-3">Hexagram summary + six-line learning points + reflection questions</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
