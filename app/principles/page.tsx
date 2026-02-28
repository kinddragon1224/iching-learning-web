import type { Metadata } from "next";
import Link from "next/link";
import { BAGUA_ITEMS } from "@/data/bagua";

export const metadata: Metadata = {
  title: "역의 기본 원리 | 역 학습 웹",
  description: "음양과 변화의 기본 원리를 이해하는 입문 페이지",
};

export default function PrinciplesPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">입문 원리</p>
        <h1 className="text-3xl font-bold">역의 기본 원리: 음양과 변화</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          역은 점술이 아니라 변화의 문법이다. 아래 구조를 따라가면 8괘와 64괘를 한 흐름으로 이해할 수 있다.
        </p>
      </header>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">1) 음양은 선악이 아니라 리듬</h2>
        <p>
          “<b>일음일양지위도(一陰一陽之謂道)</b>”는 음과 양이 번갈아 작동하는 흐름 자체가 도라는 뜻이다.
          그래서 해석의 핵심은 맞고 틀림이 아니라 <b>지금 어떤 리듬이 필요한가</b>를 읽는 데 있다.
        </p>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">2) 태극 → 음양 → 사상 → 팔괘 → 64괘</h2>
        <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)]">
          <li>태극: 아직 나뉘지 않은 하나의 근원</li>
          <li>음양: 상반되지만 서로를 필요로 하는 두 작용</li>
          <li>사상: 음양이 다시 분화된 네 가지 양상</li>
          <li>팔괘: 자연과 삶의 기본 상황을 나타내는 8개 기호</li>
          <li>64괘: 현실의 복합 상황을 정밀하게 읽는 확장 구조</li>
        </ul>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-3 text-sm">
        <h2 className="font-semibold">3) 8괘 입문 (64괘로 바로 연결)</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {BAGUA_ITEMS.map((g) => (
            <Link key={g.slug} href={`/bagua/${g.slug}`} className="rounded-lg border border-white/20 p-3 hover:bg-white/5">
              <p className="text-xs text-[var(--text-muted)]">{g.symbol} {g.nameHanja}</p>
              <p className="font-medium">{g.nameKo} · {g.keyword}</p>
              <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">{g.freeSummary}</p>
            </Link>
          ))}
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          각 8괘 상세 페이지에서 상괘/하괘로 연결된 64괘를 시각적으로 확인할 수 있다.
        </p>
      </section>

      <section className="paper-panel rounded-xl p-4 space-y-2 text-sm">
        <h2 className="font-semibold">4) 실전 적용 한 줄</h2>
        <p>
          주역 질문은 “맞다/틀리다”보다, <b>지금 무엇을 줄이고 무엇을 키울지</b>를 결정하는 데 쓰는 것이 가장 실용적이다.
        </p>
      </section>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/bagua" className="rounded-lg border border-white/30 px-3 py-2">8괘 입문으로 이동</Link>
        <Link href="/hexagrams" className="rounded-lg border border-white/30 px-3 py-2">64괘 전체 보기</Link>
      </div>
    </main>
  );
}
