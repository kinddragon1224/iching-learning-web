"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Plan = {
  key: "monthly" | "yearly";
  title: string;
  price: number;
  billing: string;
  badge?: string;
};

const PLANS: Plan[] = [
  { key: "monthly", title: "월간", price: 39000, billing: "월 39,000원" },
  { key: "yearly", title: "연간", price: 390000, billing: "연 390,000원", badge: "2개월 절약" },
];

function won(v: number) {
  return `${v.toLocaleString("ko-KR")}원`;
}

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<Plan["key"]>("monthly");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [agreeRefund, setAgreeRefund] = useState(false);

  const selectedPlan = useMemo(() => PLANS.find((p) => p.key === plan) ?? PLANS[0], [plan]);
  const canPay = email.includes("@") && agreePolicy && agreeRefund;

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold">결제</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">64괘 학습/성찰 콘텐츠 이용을 위한 결제 페이지야.</p>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
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
                <p className="font-semibold">{p.title}</p>
                {p.badge && <span className="rounded-full bg-[var(--gold-line)] px-2 py-0.5 text-xs text-black">{p.badge}</span>}
              </div>
              <p className="mt-2 text-lg font-bold">{won(p.price)}</p>
              <p className="text-xs text-[var(--text-muted)]">{p.billing}</p>
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

        <div className="rounded-lg border border-[rgba(212,178,106,0.25)] p-3 text-sm">
          <p className="font-semibold">포함 혜택</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--text-muted)]">
            <li>64괘 상세 해석 페이지 전체 접근</li>
            <li>4축 질문 기반 오늘 실행 저장 기능</li>
            <li>업데이트되는 카드 해석 콘텐츠 우선 반영</li>
          </ul>
        </div>

        <div className="rounded-lg border border-[rgba(212,178,106,0.25)] p-3 text-sm space-y-1">
          <div className="flex items-center justify-between">
            <span>선택 요금제</span>
            <b>{selectedPlan.title}</b>
          </div>
          <div className="flex items-center justify-between">
            <span>결제 금액(VAT 포함)</span>
            <b>{won(selectedPlan.price)}</b>
          </div>
          <p className="text-xs text-[var(--text-muted)]">* 데모 단계: 실제 PG 결제 연동 전</p>
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
        {canPay ? `${won(selectedPlan.price)} 결제 진행` : "필수 항목을 입력/동의해줘"}
      </button>
    </main>
  );
}
