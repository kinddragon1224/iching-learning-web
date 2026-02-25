import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="fixed right-3 top-3 z-[100] flex gap-2">
          <Link href="/faq" className="rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur">
            FAQ
          </Link>
          <Link href="/compare" className="rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur">
            Compare
          </Link>
          <Link href="/checkout" className="rounded border border-white/30 bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur">
            Checkout
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
