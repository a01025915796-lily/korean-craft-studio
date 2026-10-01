import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PracticeNotice } from "@/components/PracticeNotice";
import "./globals.css";

export const metadata: Metadata = {
  title: "온결 공방 | 한국 전통 공예",
  description:
    "손끝의 결을 잇는 한국 전통 공예 공방 '온결 공방'의 실습용 프로토타입입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-3 focus:text-surface"
        >
          본문으로 바로가기
        </a>
        <PracticeNotice variant="banner" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
