import Link from "next/link";

export default function ProPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">전문가용</p>
        <h1 className="text-2xl font-bold">I Ching Pro (B2B)</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          심리상담사/코치를 위한 구조화된 의사결정·성찰 워크스페이스
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-white/20 bg-black/30 p-4">
          <h2 className="font-semibold">세션 모드</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--text-muted)]">
            <li>Intake → Session → Action → Follow-up</li>
            <li>해석 근거 트레이스(Explainability)</li>
            <li>상담 요약 PDF 출력</li>
          </ul>
        </article>

        <article className="rounded-xl border border-white/20 bg-black/30 p-4">
          <h2 className="font-semibold">팀 운영</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--text-muted)]">
            <li>팀 계정/권한 관리</li>
            <li>케이스 공유 노트</li>
            <li>품질 KPI 대시보드</li>
          </ul>
        </article>
      </section>

      <section className="rounded-xl border border-[rgba(212,178,106,0.3)] p-4">
        <h2 className="font-semibold">도입 순서 (권장)</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--text-muted)]">
          <li>Solo 파일럿 2주 진행</li>
          <li>팀 플랜으로 확장(좌석/권한)</li>
          <li>리포트/KPI 기반 정식 도입</li>
        </ol>
      </section>

      <div className="flex gap-2">
        <Link href="/checkout" className="rounded-lg bg-[var(--gold-line)] px-4 py-2 text-sm font-semibold text-black">
          플랜 선택
        </Link>
        <Link href="/explore" className="rounded-lg border border-white/30 px-4 py-2 text-sm">
          데모 체험
        </Link>
      </div>
    </main>
  );
}
