"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PlanKey = "basic" | "practical" | "ops";

type Plan = {
  key: PlanKey;
  title: string;
  subtitle: string;
  priceLabel: string;
  priceValue?: number;
  badge?: string;
  features: string[];
};

type CheckoutPayload = {
  plan: PlanKey;
  planTitle: string;
  email: string;
  requestId: string;
  createdAt: string;
  webhookSent?: boolean;
  webhookError?: string;
};

const WEBHOOK_URL = process.env.NEXT_PUBLIC_CHECKOUT_WEBHOOK_URL;

const PLANS: Plan[] = [
  {
    key: "basic",
    title: "기초 학습 트랙 (4주)",
    subtitle: "8괘 → 64괘 구조 입문",
    priceLabel: "99,000원",
    priceValue: 99000,
    badge: "첫 시작",
    features: ["주차별 학습 미션", "핵심 개념 워크북", "복습 체크리스트"],
  },
  {
    key: "practical",
    title: "실전 학습 트랙 (8주)",
    subtitle: "해석 적용 훈련",
    priceLabel: "290,000원",
    priceValue: 290000,
    features: ["케이스 적용 과제", "질문 설계 훈련", "피드백 루프"],
  },
  {
    key: "ops",
    title: "운영 도구 구독",
    subtitle: "템플릿/리포트 자동화",
    priceLabel: "월 49,000원",
    priceValue: 49000,
    features: ["기록 템플릿", "학습 리포트 자동화", "운영 보드"],
  },
];

function won(v: number) {
  return `${v.toLocaleString("ko-KR")}원`;
}

function makeRequestId() {
  const d = new Date();
  const y = d.getFullYear().toString().slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `IC-${y}${m}${day}-${rand}`;
}

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<PlanKey>("basic");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [agreeRefund, setAgreeRefund] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPlan = useMemo(() => PLANS.find((p) => p.key === plan) ?? PLANS[0], [plan]);
  const canPay = email.includes("@") && agreePolicy && agreeRefund;

  const handleSubmit = async () => {
    if (!canPay || isSubmitting) return;
    setIsSubmitting(true);

    const payload: CheckoutPayload = {
      plan,
      planTitle: selectedPlan.title,
      email,
      requestId: makeRequestId(),
      createdAt: new Date().toISOString(),
    };

    if (WEBHOOK_URL) {
      try {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        payload.webhookSent = res.ok;
        if (!res.ok) payload.webhookError = `HTTP ${res.status}`;
      } catch (err) {
        payload.webhookSent = false;
        payload.webhookError = err instanceof Error ? err.message : "Unknown error";
      }
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("iching_pro_checkout", JSON.stringify(payload));
      window.location.href = "/checkout/success";
    }
  };

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6 pt-24">
      <header>
        <h1 className="text-2xl font-bold">결제 / 학습 상품 선택</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">점술 서비스가 아닌 해석 역량 강화를 위한 학습 상품</p>
        <p className="mt-2 inline-block rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
          데모 단계 · 실제 결제는 진행되지 않습니다
        </p>
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
          <p className="text-xs text-[var(--text-muted)]">* 결제 후 24시간 내 학습 시작 안내를 전달합니다(데모 정책 기준)</p>
          {!WEBHOOK_URL && (
            <p className="text-xs text-amber-300">* 저장 연동 전: 현재는 브라우저 내 데모 저장만 동작</p>
          )}
        </div>

        <div className="space-y-2 text-sm">
          <label className="flex items-start gap-2 rounded-lg p-1">
            <input
              type="checkbox"
              checked={agreePolicy}
              onChange={(e) => setAgreePolicy(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0"
            />
            <span className="leading-relaxed">
              <Link href="/policy" className="underline">이용약관/개인정보처리방침</Link>에 동의합니다.
            </span>
          </label>
          <label className="flex items-start gap-2 rounded-lg p-1">
            <input
              type="checkbox"
              checked={agreeRefund}
              onChange={(e) => setAgreeRefund(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0"
            />
            <span className="leading-relaxed">환불 정책(결제 후 7일 이내, 결과물 미사용 조건)에 동의합니다.</span>
          </label>
        </div>
      </section>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canPay || isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--gold-line)] px-4 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />}
          {isSubmitting ? "처리 중..." : canPay ? "신청 완료 페이지로 이동" : "필수 항목을 입력/동의해 주세요"}
        </button>

        <Link
          href="mailto:hello@kinddragon.ai?subject=I%20Ching%20Pro%20문의"
          className="text-center text-xs text-[var(--text-muted)] underline sm:text-sm"
        >
          문의하기 (도입/결제 상담)
        </Link>
      </div>
    </main>
  );
}
