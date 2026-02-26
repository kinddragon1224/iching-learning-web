"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PlanKey = "solo" | "team" | "enterprise";

type Plan = {
  key: PlanKey;
  title: string;
  subtitle: string;
  priceLabel: string;
  priceValue?: number;
  badge?: string;
  features: string[];
};

const PLANS: Plan[] = [
  {
    key: "solo",
    title: "Solo Practitioner",
    subtitle: "1인 상담사/코치",
    priceLabel: "월 49,000원",
    priceValue: 49000,
    badge: "가장 많이 선택",
    features: ["세션 모드 기본", "월 100건 세션 저장", "기본 PDF 리포트"],
  },
  {
    key: "team",
    title: "Studio/Clinic Team",
    subtitle: "팀/소규모 센터",
    priceLabel: "월 189,000원 (기본 5석)",
    priceValue: 189000,
    features: ["팀 계정/권한", "케이스 공유 노트", "월 1,000건 세션 저장"],
  },
  {
    key: "enterprise",
    title: "Enterprise/Education",
    subtitle: "기관/기업",
    priceLabel: "별도 견적",
    features: ["SSO/감사로그", "맞춤 리포트", "온보딩/교육 지원"],
  },
];

function won(v: number) {
  return `${v.toLocaleString("ko-KR")}원`;
}

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<PlanKey>("solo");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [agreeRefund, setAgreeRefund] = useState(false);

  const selectedPlan = useMemo(() => PLANS.find((p) => p.key === plan) ?? PLANS[0], [plan]);
  const canPay = email.includes("@") && agreePolicy && agreeRefund;

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6 pt-24">
      <header>
        <h1 className="text-2xl font-bold">결제 / 플랜 선택</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">전문가용 주역 상담 워크스페이스 플랜</p>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        {PLANS.map((p) => {
          const active = p.key === plan;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setPlan(p.key)}
              className={`rounded-xl border p-4 text-left transition ${
                active
                  ? "border-[var(--gold-line)] bg-[rgba(212,178,106,0.12)]"
                  : "border-[rgba(212,178,106,0.25)] bg-[var(--indigo-panel)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">{p.title}</p>
                {p.badge && <span className="rounded-full bg-[var(--gold-line)] px-2 py-0.5 text-[10px] text-black">{p.badge}</span>}
              </div>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{p.subtitle}</p>
              <p className="mt-2 text-sm font-bold">{p.priceLabel}</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-[var(--text-muted)]">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </section>

      <section className="paper-panel space-y-4 rounded-xl p-4">
        <label className="block text-sm">
          결제 이메일
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[rgba(212,178,106,0.35)] bg-transparent px-3 py-2"
            placeholder="you@example.com"
          />
        </label>

        <div className="rounded-lg border border-[rgba(212,178,106,0.25)] p-3 text-sm space-y-1">
          <div className="flex items-center justify-between">
            <span>선택 플랜</span>
            <b>{selectedPlan.title}</b>
          </div>
          <div className="flex items-center justify-between">
            <span>결제 금액</span>
            <b>{selectedPlan.priceValue ? won(selectedPlan.priceValue) : "별도 견적"}</b>
          </div>
          <p className="text-xs text-[var(--text-muted)]">* 데모 단계: 실제 PG/인보이스 연동 전</p>
        </div>

        <div className="space-y-2 text-sm">
          <label className="flex items-start gap-2">
            <input type="checkbox" checked={agreePolicy} onChange={(e) => setAgreePolicy(e.target.checked)} className="mt-0.5" />
            <span>
              <Link href="/policy" className="underline">이용약관/개인정보처리방침</Link>에 동의합니다.
            </span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" checked={agreeRefund} onChange={(e) => setAgreeRefund(e.target.checked)} className="mt-0.5" />
            <span>환불 정책(결제 후 7일 이내, 미사용 조건)에 동의합니다.</span>
          </label>
        </div>
      </section>

      <button
        type="button"
        disabled={!canPay}
        className="rounded-lg bg-[var(--gold-line)] px-4 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {canPay ? `${selectedPlan.title} 신청 진행` : "필수 항목을 입력/동의해줘"}
      </button>
    </main>
  );
}
