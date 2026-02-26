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
  title: "주역 학습 웹 MVP",
  description: "점술 기능이 아닌 주역 학습/탐색용 웹 서비스 MVP",
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
          <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto rounded-xl border border-white/20 bg-black/55 p-2 backdrop-blur">
            <Link href="/" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">홈</Link>
            <Link href="/bagua" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">8괘 입문</Link>
            <Link href="/explore" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">64괘 탐색</Link>
            <Link href="/pro" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">Pro</Link>
            <Link href="/faq" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">자주 묻는 질문</Link>
            <Link href="/checkout" className="shrink-0 rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white">결제</Link>
          </div>
        </nav>
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
