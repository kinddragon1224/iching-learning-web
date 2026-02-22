import Link from "next/link";
import { HEXAGRAMS } from "@/data/hexagrams";
import { FAQS } from "@/data/faq";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";

function TrustChip({ text }: { text: string }) {
  return <span className="gold-chip rounded-full px-3 py-1 text-xs">{text}</span>;
}

export default function Home() {
  const today = HEXAGRAMS[new Date().getDate() % HEXAGRAMS.length];
  const detailHref = today.id === 1 ? "/qian" : `/hexagrams/${today.id}`;

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8">
      <header className="space-y-3 text-center">
        <p className="text-xs tracking-[0.22em] text-[var(--text-muted)]">ICHING LEARNING SYSTEM</p>
        <h1 className="text-4xl font-bold leading-tight">음과 양, 질서와 혼돈을 배우는 학습형 주역 웹</h1>
        <p className="mx-auto max-w-2xl text-sm text-[var(--text-muted)]">
          예언이 아니라 성찰. 고전 원리와 현대적 UI를 결합해 차분하게 학습하는 경험을 만듭니다.
        </p>
      </header>

      <section className="hero-grid">
        <Card className="hero-main p-6 relative overflow-hidden">
          <div className="glow-orb absolute -top-12 -right-8 h-40 w-40" />
          <p className="text-xs text-[var(--text-muted)]">오늘의 괘</p>
          <h2 className="text-3xl font-semibold mt-1">{today.id}. {today.nameKo}</h2>
          <p className="mt-3 text-sm text-[var(--text-muted)] max-w-xl">{today.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <TrustChip text="학습 중심" />
            <TrustChip text="비예언" />
            <TrustChip text="윤리 가드레일" />
          </div>
          <div className="mt-6 flex gap-3">
            <ButtonLink href={detailHref}>학습 시작</ButtonLink>
            <ButtonLink href="/hexagrams" variant="secondary">64괘 탐색</ButtonLink>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-[var(--text-muted)]">학습 데모</p>
          <h3 className="text-lg font-semibold mt-1">3-step 플로우</h3>
          <ul className="mt-2 text-sm text-[var(--text-muted)] space-y-1 list-disc pl-5">
            <li>원리 읽기 (음/양 · 괘 구조)</li>
            <li>상황 해석 프레임 확인</li>
            <li>반추 질문으로 기록</li>
          </ul>
          <ButtonLink href="/qian" variant="ghost">중천건 샘플 보기</ButtonLink>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-[var(--text-muted)]">전환 구조</p>
          <h3 className="text-lg font-semibold mt-1">게스트 체크아웃 우선</h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">계정 생성 강제 없이 결제 진입, 환불 규정과 경계를 먼저 공개합니다.</p>
          <ButtonLink href="/checkout" variant="ghost">비회원 결제 보기</ButtonLink>
        </Card>
      </section>

      <section className="grid sm:grid-cols-2 gap-3">
        <Card className="p-5">
          <p className="text-xs text-[var(--text-muted)]">요금제</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg border border-[rgba(212,178,106,0.45)] p-3">
              <p className="text-xs text-[var(--text-muted)]">월</p>
              <p className="font-semibold">39,000</p>
            </div>
            <div className="rounded-lg border border-[rgba(212,178,106,0.45)] p-3">
              <p className="text-xs text-[var(--text-muted)]">연</p>
              <p className="font-semibold">390,000</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <TrustChip text="7일 이내 전액 환불" />
            <TrustChip text="다크패턴 배제" />
          </div>
          <div className="mt-4 flex gap-2">
            <ButtonLink href="/pricing" variant="secondary">요금 자세히</ButtonLink>
            <ButtonLink href="/checkout">지금 시작</ButtonLink>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-[var(--text-muted)]">빠른 이동</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <Link href="/search" className="rounded-lg border border-[rgba(212,178,106,0.35)] p-3 text-center">키워드 검색</Link>
            <Link href="/policy" className="rounded-lg border border-[rgba(212,178,106,0.35)] p-3 text-center">윤리 가이드</Link>
            <Link href="/hexagrams" className="rounded-lg border border-[rgba(212,178,106,0.35)] p-3 text-center">64괘 목록</Link>
            <Link href="/qian" className="rounded-lg border border-[rgba(212,178,106,0.35)] p-3 text-center">중천건 상세</Link>
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">자주 묻는 질문</h2>
        <div className="grid gap-2">
          {FAQS.map((f) => (
            <Card key={f.q} className="p-4">
              <p className="font-medium">{f.q}</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">{f.a}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="text-xs text-[var(--text-muted)] border-t border-[rgba(212,178,106,0.25)] pt-4">
        본 서비스는 학습 참고용이며 운명 단정, 공포 유도, 강압 결제를 지양합니다.
      </footer>
    </main>
  );
}
