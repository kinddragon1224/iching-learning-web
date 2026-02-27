"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CheckoutPayload = {
  plan: "basic" | "practical" | "ops";
  planTitle: string;
  email: string;
  requestId: string;
  createdAt: string;
  webhookSent?: boolean;
  webhookError?: string;
};

const FALLBACK: CheckoutPayload = {
  plan: "basic",
  planTitle: "기초 학습 트랙 (4주)",
  email: "-",
  requestId: "IC-DEMO-0000",
  createdAt: new Date().toISOString(),
};

export default function CheckoutSuccessPage() {
  const [payload, setPayload] = useState<CheckoutPayload>(FALLBACK);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem("iching_pro_checkout");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as CheckoutPayload;
      setPayload(parsed);
    } catch {
      // ignore invalid session storage payload
    }
  }, []);

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header className="space-y-2">
        <p className="text-sm text-[var(--text-muted)]">신청 완료 (데모)</p>
        <h1 className="text-2xl font-bold">{payload.planTitle} 신청이 접수됐어</h1>
        <p className="text-sm text-[var(--text-muted)]">
          접수 이메일: <b>{payload.email}</b>
        </p>
      </header>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-[rgba(212,178,106,0.25)] px-3 py-2">
          <span className="text-[var(--text-muted)]">신청번호</span>
          <b>{payload.requestId}</b>
        </div>
        <p className="text-xs text-[var(--text-muted)]">문의 시 신청번호를 함께 전달하면 더 빠르게 확인할 수 있어.</p>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <p>연동 상태</p>
        {payload.webhookSent === true && <p className="text-emerald-300">✓ 신청 데이터가 외부 저장소로 전송됨</p>}
        {payload.webhookSent === false && (
          <p className="text-amber-300">! 외부 저장 전송 실패 ({payload.webhookError ?? "unknown"}) — 데모 로컬 저장은 완료</p>
        )}
        {payload.webhookSent === undefined && <p className="text-[var(--text-muted)]">외부 저장 연동 없이 데모 모드로 처리됨</p>}
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <p>다음 단계</p>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>결제 정보 접수 후 24시간 내 학습 시작 안내를 보냅니다.</li>
          <li>선택하신 트랙의 커리큘럼/자료 안내가 함께 제공됩니다.</li>
          <li>현재는 데모 단계로 실제 결제는 진행되지 않습니다.</li>
        </ul>
      </section>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link href="/pro" className="rounded-lg bg-[var(--gold-line)] px-4 py-2 text-center text-sm font-semibold text-black">
          Pro 소개로 돌아가기
        </Link>
        <Link href="/pricing" className="rounded-lg border border-white/30 px-4 py-2 text-center text-sm">
          요금표 다시 보기
        </Link>
        <Link
          href="mailto:hello@kinddragon.ai?subject=I%20Ching%20Pro%20문의"
          className="rounded-lg border border-white/30 px-4 py-2 text-center text-sm"
        >
          문의하기
        </Link>
      </div>
    </main>
  );
}
