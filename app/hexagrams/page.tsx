import Link from "next/link";
import { HEXAGRAMS } from "@/data/hexagrams";

export default function HexagramListPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold mb-4">괘 목록</h1>
      <ul className="space-y-2">
        {HEXAGRAMS.map((h) => (
          <li key={h.id} className="border rounded-xl p-4 hover:bg-neutral-50">
            <Link href={`/hexagrams/${h.id}`}>
              <p className="font-semibold">{h.id}. {h.nameKo} <span className="text-sm text-neutral-500">({h.nameEn})</span></p>
              <p className="text-sm text-neutral-700 mt-1">{h.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
