import Link from "next/link";

const BAGUA = [
  { name: "건(乾)", keyword: "하늘 · 창조" },
  { name: "곤(坤)", keyword: "땅 · 수용" },
  { name: "진(震)", keyword: "우레 · 시작" },
  { name: "손(巽)", keyword: "바람 · 스며듦" },
  { name: "감(坎)", keyword: "물 · 위험" },
  { name: "리(離)", keyword: "불 · 밝음" },
  { name: "간(艮)", keyword: "산 · 멈춤" },
  { name: "태(兌)", keyword: "연못 · 기쁨" },
];

export default function BaguaPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">입문관</p>
        <h1 className="text-2xl font-bold">8괘부터 배우기</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">스텝 2에서 각 괘별 현대 이미지/설괘전 해설을 본격 반영할 예정이야.</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {BAGUA.map((g) => (
          <article key={g.name} className="rounded-xl border border-white/20 bg-black/30 p-4">
            <h2 className="font-semibold">{g.name}</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{g.keyword}</p>
          </article>
        ))}
      </section>

      <Link href="/explore" className="inline-block text-sm underline">
        64괘 확장 탐색으로 이동 →
      </Link>
    </main>
  );
}
