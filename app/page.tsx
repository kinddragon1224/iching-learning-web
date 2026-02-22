import Link from "next/link";
import { HEXAGRAMS } from "@/data/hexagrams";

export default function Home() {
  const today = HEXAGRAMS[new Date().getDate() % HEXAGRAMS.length];

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">주역 학습 웹 MVP</h1>
      <p className="text-sm text-neutral-600">
        점술 결과 도구가 아니라, 학습/탐색용 레퍼런스 뷰어입니다.
      </p>

      <section className="rounded-2xl border p-5 bg-amber-50">
        <p className="text-xs text-neutral-500 mb-1">오늘의 괘</p>
        <h2 className="text-xl font-semibold">{today.id}. {today.nameKo}</h2>
        <p className="mt-2 text-sm">{today.summary}</p>
        <Link href={`/hexagrams/${today.id}`} className="inline-block mt-4 text-sm font-medium underline">
          상세 보기
        </Link>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <Link href="/hexagrams" className="rounded-xl border p-4 hover:bg-neutral-50">64괘 목록</Link>
        <Link href="/search" className="rounded-xl border p-4 hover:bg-neutral-50">키워드 검색</Link>
      </div>
    </main>
  );
}
