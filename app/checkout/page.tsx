export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-5">
      <h1 className="text-2xl font-bold">비회원 체크아웃</h1>
      <p className="text-sm text-[var(--text-muted)]">계정 생성 없이 바로 결제할 수 있습니다.</p>

      <section className="paper-panel rounded-xl p-4 space-y-3">
        <label className="block text-sm">
          이메일
          <input className="mt-1 w-full rounded-lg border border-[rgba(212,178,106,0.35)] bg-transparent px-3 py-2" placeholder="you@example.com" />
        </label>
        <label className="block text-sm">
          요금제
          <select className="mt-1 w-full rounded-lg border border-[rgba(212,178,106,0.35)] bg-[var(--indigo-panel)] px-3 py-2">
            <option>월 39,000원</option>
            <option>연 390,000원</option>
          </select>
        </label>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-1">
        <p>결제 요약</p>
        <p className="text-[var(--text-muted)]">총액: 39,000원 (VAT 포함)</p>
        <p className="text-[var(--text-muted)]">7일 이내 환불 조건 적용</p>
      </section>

      <button className="rounded-lg bg-[var(--gold-line)] px-4 py-2 text-sm font-semibold text-black">결제 진행 (UI 데모)</button>
      <p className="text-xs text-[var(--text-muted)]">* 데모 페이지이며 실제 결제는 아직 연결되지 않았습니다.</p>
    </main>
  );
}
