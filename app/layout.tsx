import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";

// フォント設定
const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: 'swap',
  preload: true,
  weight: ["400", "500", "700"],
});

const mincho = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
  display: 'swap',
  preload: true,
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "割烹 神谷 | 伝統と季節の味わい",
  description: "埼玉県川口市で四季の移ろいを感じる本格的な日本料理。旬の食材と熟練の技で織りなす割烹料理をご堪能ください。",
  keywords: "割烹, 神谷, 日本料理, 懐石, 川口, 旬, 和食, 個室, 接待, 法事",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://www.kappo-kamiya.com",
    title: "割烹 神谷 | 伝統と季節の味わい",
    description: "三代続く川口の老舗日本料理店。四季折々の食材と一期一会のおもてなしをご堪能ください。",
    siteName: "割烹 神谷",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        {/* 追加メタタグ */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#f7f4ed" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${notoSans.variable} ${mincho.variable} font-sans antialiased bg-paper text-ink`}
        suppressHydrationWarning
      >
        <div className="mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
