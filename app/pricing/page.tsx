import Link from "next/link";

const plans = [
  {
    title: "Solo Practitioner",
    subtitle: "1인 상담사/코치",
    price: "월 49,000원",
    desc: "개인 상담/코칭 파일럿에 적합",
  },
  {
    title: "Studio/Clinic Team",
    subtitle: "팀/소규모 센터",
    price: "월 189,000원 (기본 5석)",
    desc: "팀 권한/협업/케이스 공유 운영",
  },
  {
    title: "Enterprise/Education",
    subtitle: "기관/기업",
    price: "별도 견적",
    desc: "SSO/감사로그/맞춤 온보딩",
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-5 p-6 pt-24">
      <h1 className="text-2xl font-bold">요금 안내 (Pro)</h1>
      <p className="text-sm text-[var(--text-muted)]">상담사/코치용 B2B 워크스페이스 기준의 투명한 플랜 구조</p>

      <section className="grid gap-3 md:grid-cols-3">
        {plans.map((p) => (
          <article key={p.title} className="paper-panel rounded-xl p-5">
            <p className="text-xs text-[var(--text-muted)]">{p.subtitle}</p>
            <p className="mt-1 text-lg font-semibold">{p.title}</p>
            <p className="mt-3 text-2xl font-bold">{p.price}</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{p.desc}</p>
          </article>
        ))}
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <p>• 데모 단계에서는 실제 PG 결제 없이 신청 접수만 진행</p>
        <p>• 환불 정책: 결제 후 7일 이내, 서비스 미사용 시 환불 가능</p>
        <p>• 본 서비스는 성찰/의사결정 지원 도구이며 단정적 예언을 제공하지 않음</p>
      </section>

      <Link href="/checkout" className="inline-block rounded-lg bg-[var(--gold-line)] px-4 py-2 text-sm font-semibold text-black">
        플랜 신청하기
      </Link>
    </main>
  );
}
