import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-5">
      <h1 className="text-2xl font-bold">요금 안내</h1>
      <p className="text-sm text-[var(--text-muted)]">학습형 서비스 기준의 단순/투명 가격 정책입니다.</p>

      <section className="grid sm:grid-cols-2 gap-3">
        <article className="paper-panel rounded-xl p-5">
          <p className="text-sm text-[var(--text-muted)]">매월 구독</p>
          <p className="text-3xl font-bold mt-1">39,000원</p>
          <p className="text-xs text-[var(--text-muted)] mt-2">매달 자동 결제, 언제든 해지 가능</p>
        </article>
        <article className="paper-panel rounded-xl p-5">
          <p className="text-sm text-[var(--text-muted)]">1년 이용</p>
          <p className="text-3xl font-bold mt-1">390,000원</p>
          <p className="text-xs text-[var(--text-muted)] mt-2">연 결제로 비용 절감</p>
        </article>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <p>• 7일 이내, 쿠폰 3회 미만 사용 시 전액 환불</p>
        <p>• 카운트다운/허위 희소성/강제 업셀 없음</p>
        <p>• 학습 도구로 제공되며 예측/단정 서비스가 아닙니다</p>
      </section>

      <Link href="/checkout" className="inline-block rounded-lg bg-[var(--gold-line)] px-4 py-2 text-sm font-semibold text-black">
        비회원으로 시작하기
      </Link>
    </main>
  );
}
