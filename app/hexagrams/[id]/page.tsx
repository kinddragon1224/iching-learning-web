import Image from "next/image";
import Link from "next/link";
import { HEXAGRAMS, findHexagram } from "@/data/hexagrams";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return HEXAGRAMS.map((h) => ({ id: String(h.id) }));
}

export default function HexagramDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const hex = findHexagram(Number(id));
  if (!hex) return notFound();

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-5">
      <Link href="/hexagrams" className="text-sm underline">← 목록으로</Link>
      <header>
        <h1 className="text-2xl font-bold">{hex.id}. {hex.nameKo}</h1>
        <p className="text-neutral-500">{hex.nameEn}</p>
        <p className="mt-3">{hex.summary}</p>
      </header>

      {hex.id === 1 && (
        <section className="rounded-2xl border p-3 bg-neutral-50">
          <Image
            src="/cards-qian-temp.png"
            alt="건괘 임시 카드 이미지"
            width={1024}
            height={1024}
            className="w-full h-auto rounded-xl"
            priority
          />
          <p className="text-xs text-neutral-500 mt-2">임시 카드 이미지 (추후 교체 예정)</p>
        </section>
      )}

      <section>
        <h2 className="font-semibold mb-2">핵심 키워드</h2>
        <div className="flex flex-wrap gap-2">
          {hex.keywords.map((k) => (
            <span key={k} className="px-2 py-1 rounded-full bg-neutral-100 text-sm">#{k}</span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">6효 요약</h2>
        <ol className="space-y-2">
          {hex.lines.map((line, idx) => (
            <li key={idx} className="border rounded-lg p-3 text-sm">{line}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
