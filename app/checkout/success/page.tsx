"use client";

import Link from "next/link";
import { useMemo } from "react";

function makeRequestId() {
  const d = new Date();
  const y = d.getFullYear().toString().slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `IC-${y}${m}${day}-${rand}`;
}

export default function CheckoutSuccessPage() {
  const requestId = useMemo(() => makeRequestId(), []);

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6 pt-24">
      <header className="space-y-2">
        <p className="text-sm text-[var(--text-muted)]">신청 완료 (데모)</p>
        <h1 className="text-2xl font-bold">플랜 신청이 접수됐어</h1>
        <p className="text-sm text-[var(--text-muted)]">입력한 이메일로 온보딩 안내가 발송될 예정이야.</p>
      </header>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-[rgba(212,178,106,0.25)] px-3 py-2">
          <span className="text-[var(--text-muted)]">신청번호</span>
          <b>{requestId}</b>
        </div>
        <p className="text-xs text-[var(--text-muted)]">문의 시 신청번호를 함께 전달하면 더 빠르게 확인할 수 있어.</p>
      </section>

      <section className="paper-panel rounded-xl p-4 text-sm space-y-2">
        <p>다음 단계</p>
        <ul className="list-disc pl-5 text-[var(--text-muted)] space-y-1">
          <li>운영팀이 1영업일 내 온보딩 안내를 보낸다.</li>
          <li>팀/엔터프라이즈는 좌석 및 권한 정책 확인 후 개설된다.</li>
          <li>현재는 데모 단계로 실제 결제는 진행되지 않는다.</li>
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
