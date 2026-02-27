import Link from "next/link";

export default function ProPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6 pt-24">
      <header>
        <p className="text-sm text-[var(--text-muted)]">학습 프로그램</p>
        <h1 className="text-2xl font-bold">역 학습 Pro</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          해석 역량과 상담 실무 정리 능력을 키우는 학습 중심 프로그램
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-white/20 bg-black/30 p-4">
          <h2 className="font-semibold">기초 트랙 (4주)</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--text-muted)]">
            <li>8괘 → 64괘 핵심 구조</li>
            <li>해석 프레임 기본 훈련</li>
            <li>주차별 학습 미션</li>
          </ul>
          <Link href="/programs/basic-track" className="mt-3 inline-block text-xs underline text-[var(--text-muted)]">
            커리큘럼 보기
          </Link>
        </article>

        <article className="rounded-xl border border-white/20 bg-black/30 p-4">
          <h2 className="font-semibold">실전 트랙 (8주)</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--text-muted)]">
            <li>상담 케이스 정리법</li>
            <li>질문 설계/피드백 루프</li>
            <li>재상담 연결 구조</li>
          </ul>
        </article>

        <article className="rounded-xl border border-white/20 bg-black/30 p-4">
          <h2 className="font-semibold">운영 도구 구독</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--text-muted)]">
            <li>기록 템플릿</li>
            <li>학습 리포트 자동화</li>
            <li>운영 보드/히스토리 관리</li>
          </ul>
        </article>
      </section>

      <section className="rounded-xl border border-[rgba(212,178,106,0.3)] p-4">
        <h2 className="font-semibold">학습 도입 순서 (권장)</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--text-muted)]">
          <li>기초 트랙 4주로 공통 언어 정렬</li>
          <li>실전 트랙 8주로 케이스 적용</li>
          <li>운영 도구 구독으로 루틴 고정</li>
        </ol>
      </section>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link href="/checkout" className="rounded-lg bg-[var(--gold-line)] px-4 py-2 text-center text-sm font-semibold text-black">
          플랜 신청하기
        </Link>
        <Link href="/pricing" className="rounded-lg border border-white/30 px-4 py-2 text-center text-sm">
          요금표 보기
        </Link>
        <Link href="/policy" className="rounded-lg border border-white/30 px-4 py-2 text-center text-sm">
          정책 확인하기
        </Link>
        <Link href="/explore" className="rounded-lg border border-white/30 px-4 py-2 text-center text-sm">
          데모 체험하기
        </Link>
      </div>
    </main>
  );
}
