import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl p-6 pt-24">
      <header className="space-y-3 text-center">
        <p className="text-sm text-[var(--text-muted)]">주역 학습 플랫폼</p>
        <h1 className="text-3xl font-bold">어디서부터 시작할까?</h1>
        <p className="text-sm text-[var(--text-muted)]">
          입문은 8괘부터, 익숙하면 64괘 확장으로 넘어가자.
        </p>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        <Link href="/bagua" className="paper-panel rounded-2xl p-5 panel-hover">
          <p className="text-xs text-[var(--text-muted)]">입문 트랙</p>
          <h2 className="mt-1 text-xl font-semibold">8괘부터 배우기</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            설괘전 모티브 기반으로 8괘의 핵심 이미지를 먼저 익혀.
          </p>
        </Link>

        <Link href="/explore" className="paper-panel rounded-2xl p-5 panel-hover">
          <p className="text-xs text-[var(--text-muted)]">확장 트랙</p>
          <h2 className="mt-1 text-xl font-semibold">64괘 탐색하기</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            우주 뷰에서 괘를 탐색하고 상세 해석으로 들어가.
          </p>
        </Link>

        <Link href="/hexagrams" className="paper-panel rounded-2xl p-5 panel-hover">
          <p className="text-xs text-[var(--text-muted)]">전체 보기</p>
          <h2 className="mt-1 text-xl font-semibold">64괘 목록 보기</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            전체 괘를 리스트로 훑고 원하는 괘로 바로 이동해.
          </p>
        </Link>

        <Link href="/pro" className="paper-panel rounded-2xl p-5 panel-hover">
          <p className="text-xs text-[var(--text-muted)]">전문가 트랙</p>
          <h2 className="mt-1 text-xl font-semibold">Pro 상담 워크스페이스</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            상담사/코치용 세션 모드와 팀 운영 기능을 확인해.
          </p>
        </Link>
      </section>
    </main>
  );
}
