import type { Metadata } from "next";
import Link from "next/link";
import { Geist_Mono, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "역 학습 웹 MVP",
  description: "점술 기능이 아닌 역 학습/탐색용 웹 서비스 MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} ${notoSerifKr.variable} ${geistMono.variable} antialiased`}>
        <nav className="fixed inset-x-0 top-0 z-[100] px-3 pt-2">
          {/* Mobile compact nav */}
          <div className="md:hidden mx-auto flex max-w-4xl items-center gap-2 rounded-xl border border-white/20 bg-black/65 p-2 backdrop-blur">
            <Link href="/" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">홈</Link>
            <Link href="/daily" className="shrink-0 rounded border border-[var(--gold-line)] bg-[rgba(212,178,106,0.18)] px-3 py-1.5 text-xs font-semibold text-[#f3e4be]">오늘의 물음</Link>
            <details className="ml-auto relative">
              <summary className="list-none cursor-pointer shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">메뉴</summary>
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/20 bg-black/90 p-2 shadow-xl">
                <div className="flex flex-col gap-1 text-xs">
                  <Link href="/principles" className="rounded px-2 py-1.5 hover:bg-white/10">기본 원리</Link>
                  <Link href="/bagua" className="rounded px-2 py-1.5 hover:bg-white/10">8괘 입문</Link>
                  <Link href="/hexagrams" className="rounded px-2 py-1.5 hover:bg-white/10">64괘 목록</Link>
                  <Link href="/explore" className="rounded px-2 py-1.5 hover:bg-white/10">64괘 탐색</Link>
                  <Link href="/studio" className="rounded px-2 py-1.5 hover:bg-white/10">학습 실험실</Link>
                  <Link href="/faq" className="rounded px-2 py-1.5 hover:bg-white/10">자주 묻는 질문</Link>
                </div>
              </div>
            </details>
          </div>

          {/* Desktop full nav */}
          <div className="hidden md:flex mx-auto max-w-4xl gap-2 overflow-x-auto rounded-xl border border-white/20 bg-black/55 p-2 backdrop-blur">
            <Link href="/" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">홈</Link>
            <Link href="/principles" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">기본 원리</Link>
            <Link href="/bagua" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">8괘 입문</Link>
            <Link href="/hexagrams" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">64괘 목록</Link>
            <Link href="/explore" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">64괘 탐색</Link>
            <Link href="/studio" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">학습 실험실</Link>
            <Link href="/daily" className="shrink-0 rounded border border-[var(--gold-line)] bg-[rgba(212,178,106,0.12)] px-3 py-1.5 text-xs text-[#f3e4be]">오늘의 물음</Link>
            <Link href="/faq" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">자주 묻는 질문</Link>
          </div>
        </nav>
        <div className="pt-20 md:pt-16">{children}</div>
      </body>
    </html>
  );
}
