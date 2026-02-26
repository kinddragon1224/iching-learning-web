import Link from "next/link";
import { HEXAGRAMS } from "@/data/hexagrams";

export default function HexagramListPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-2 text-2xl font-bold">괘 목록</h1>
      <p className="mb-4 text-sm text-neutral-600">학습하고 싶은 괘를 선택해 4축 해석과 질문으로 들어가보세요.</p>

      <ul className="space-y-2">
        {HEXAGRAMS.map((h) => (
          <li key={h.id} className="rounded-xl border p-4 hover:bg-neutral-50">
            <Link href={`/hexagram/${h.id}`}>
              <p className="font-semibold">
                {h.id}. {h.nameKo} <span className="text-sm text-neutral-500">({h.nameEn})</span>
              </p>
              <p className="mt-1 text-sm text-neutral-700">{h.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
