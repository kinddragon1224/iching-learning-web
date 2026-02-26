import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header className="space-y-2">
        <p className="text-sm text-[var(--text-muted)]">신청 완료 (데모)</p>
        <h1 className="text-2xl font-bold">플랜 신청이 접수됐어</h1>
        <p className="text-sm text-[var(--text-muted)]">입력한 이메일로 온보딩 안내가 발송될 예정이야.</p>
      </header>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <p>다음 단계</p>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>운영팀이 1영업일 내 온보딩 안내를 보낸다.</li>
          <li>팀/엔터프라이즈는 좌석 및 권한 정책 확인 후 개설된다.</li>
          <li>현재는 데모 단계로 실제 결제는 진행되지 않는다.</li>
        </ul>
      </section>

      <div className="flex gap-2">
        <Link href="/pro" className="rounded-lg bg-[var(--gold-line)] px-4 py-2 text-sm font-semibold text-black">
          Pro 소개로 돌아가기
        </Link>
        <Link href="/" className="rounded-lg border border-white/30 px-4 py-2 text-sm">
          홈으로
        </Link>
      </div>
    </main>
  );
}
