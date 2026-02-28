import Link from "next/link";
import corpus from "@/data/hexagram_corpus.generated.json";

type Row = {
  id: number;
  gua_text?: { original?: string; literal_ko?: string; interpretive_ko?: string };
  lines?: Array<{ line_no: number; original?: string; literal_ko?: string; interpretive_ko?: string }>;
};

export default function CorpusStatusPage() {
  const rows = ((corpus as { hexagrams?: Row[] }).hexagrams ?? []).slice().sort((a, b) => a.id - b.id);
  const doneGua = rows.filter((r) => r.gua_text?.original || r.gua_text?.literal_ko || r.gua_text?.interpretive_ko).length;
  const doneLines = rows.filter((r) => (r.lines ?? []).length >= 6).length;

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">데이터 운영</p>
        <h1 className="text-3xl font-bold">코퍼스 반영 현황</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">심층 번역 코퍼스의 괘사/효사 반영률을 확인하는 운영 페이지</p>
      </header>

      <section className="paper-panel rounded-xl p-4 text-sm">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-white/20 p-3">
            <p className="text-xs text-[var(--text-muted)]">괘사 반영</p>
            <p className="text-xl font-semibold">{doneGua} / 64</p>
          </div>
          <div className="rounded-lg border border-white/20 p-3">
            <p className="text-xs text-[var(--text-muted)]">효사 6줄 완성</p>
            <p className="text-xl font-semibold">{doneLines} / 64</p>
          </div>
          <div className="rounded-lg border border-white/20 p-3">
            <p className="text-xs text-[var(--text-muted)]">데이터 로우</p>
            <p className="text-xl font-semibold">{rows.length}</p>
          </div>
        </div>
      </section>

      <section className="paper-panel rounded-xl p-4 text-xs overflow-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="text-left text-[var(--text-muted)]">
              <th className="py-2">ID</th>
              <th className="py-2">괘사 원문</th>
              <th className="py-2">직역</th>
              <th className="py-2">의역</th>
              <th className="py-2">효사 개수</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="py-2">#{r.id}</td>
                <td className="py-2">{r.gua_text?.original ? "✅" : "-"}</td>
                <td className="py-2">{r.gua_text?.literal_ko ? "✅" : "-"}</td>
                <td className="py-2">{r.gua_text?.interpretive_ko ? "✅" : "-"}</td>
                <td className="py-2">{(r.lines ?? []).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="flex gap-2 text-sm">
        <Link href="/hexagrams" className="rounded-lg border border-white/30 px-3 py-2">64괘 보기</Link>
        <Link href="/" className="rounded-lg border border-white/30 px-3 py-2">홈</Link>
      </div>
    </main>
  );
}
