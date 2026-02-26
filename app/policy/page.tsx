export default function PolicyPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 p-6 pt-24">
      <h1 className="text-2xl font-bold">이용약관 · 개인정보 · 환불 정책</h1>
      <p className="text-sm text-[var(--text-muted)]">
        I Ching Pro(상담사/코치용) 데모 운영 기준의 기본 정책 안내
      </p>

      <section className="space-y-2">
        <h2 className="font-semibold">1) 서비스 이용약관 (요약)</h2>
        <ul className="list-disc pl-5 text-sm space-y-1 text-[var(--text-muted)]">
          <li>본 서비스는 의사결정·성찰을 돕는 보조 도구입니다.</li>
          <li>의료/법률/투자 등 전문 판단은 별도 전문가 상담을 우선합니다.</li>
          <li>계정 공유, 무단 재판매, 데이터 무단 수집은 금지됩니다.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">2) 개인정보 처리 (요약)</h2>
        <ul className="list-disc pl-5 text-sm space-y-1 text-[var(--text-muted)]">
          <li>수집 항목: 이메일, 선택 플랜, 서비스 이용 로그(데모 범위).</li>
          <li>이용 목적: 신청 접수 확인, 온보딩 안내, 품질 개선.</li>
          <li>보관 기간: 운영 목적 달성 후 지체 없이 파기.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">3) 환불 정책 (요약)</h2>
        <ul className="list-disc pl-5 text-sm space-y-1 text-[var(--text-muted)]">
          <li>결제 후 7일 이내, 서비스 미사용 조건에서 환불 가능합니다.</li>
          <li>이미 사용이 시작된 경우, 사용분을 제외한 금액 기준으로 처리합니다.</li>
          <li>Enterprise 계약형 플랜은 별도 계약서 조항을 따릅니다.</li>
        </ul>
      </section>
    </main>
  );
}
