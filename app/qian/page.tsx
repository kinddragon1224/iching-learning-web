import Image from "next/image";
import Link from "next/link";
import { findHexagram } from "@/data/hexagrams";

export default function QianPage() {
  const hex = findHexagram(1)!;
  const imgSrc = process.env.NODE_ENV === "production" ? "/iching-learning-web/cards-qian-temp.png" : "/cards-qian-temp.png";

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-5">
      <Link href="/hexagrams" className="text-sm underline">← 목록으로</Link>
      <header>
        <h1 className="text-2xl font-bold">{hex.id}. {hex.nameKo}</h1>
        <p className="text-neutral-500">{hex.nameEn}</p>
        <p className="mt-3">{hex.summary}</p>
      </header>

      <section className="rounded-2xl border p-3 bg-neutral-50">
        <Image
          src={imgSrc}
          alt="건괘 임시 카드 이미지"
          width={1024}
          height={1024}
          className="w-full h-auto rounded-xl"
          priority
        />
      </section>

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

      {hex.learningNotes && (
        <section>
          <h2 className="font-semibold mb-2">학습 해설</h2>
          <ul className="space-y-2">
            {hex.learningNotes.map((n, i) => (
              <li key={i} className="border rounded-lg p-3 text-sm">{n}</li>
            ))}
          </ul>
        </section>
      )}

      {hex.reflectionQuestions && (
        <section>
          <h2 className="font-semibold mb-2">적용 질문</h2>
          <ul className="space-y-2">
            {hex.reflectionQuestions.map((q, i) => (
              <li key={i} className="border rounded-lg p-3 text-sm">{q}</li>
            ))}
          </ul>
        </section>
      )}

      {hex.faithGuide && (
        <section className="rounded-xl border border-amber-300 bg-amber-50 p-4">
          <h2 className="font-semibold mb-2">신앙/윤리 가드레일</h2>
          <p className="text-sm">{hex.faithGuide}</p>
        </section>
      )}
    </main>
  );
}
