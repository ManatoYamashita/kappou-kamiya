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

// 環境変数からサイトURLを取得
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kappou-kamiya.vercel.app';

export const metadata: Metadata = {
  title: "割烹 神谷 | 伝統と季節の味わい",
  description: "埼玉県川口市で四季の移ろいを感じる本格的な日本料理。旬の食材と熟練の技で織りなす割烹料理をご堪能ください。",
  keywords: "割烹, 神谷, 日本料理, 懐石, 川口, 旬, 和食, 個室, 接待, 法事",
  robots: "index, follow",
  alternates: {
    canonical: siteUrl,
  },
  authors: [{ name: "割烹 神谷" }],
  creator: "割烹 神谷",
  publisher: "割烹 神谷",
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.jpg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  themeColor: "#f7f4ed",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    title: "割烹 神谷 | 伝統と季節の味わい",
    description: "三代続く川口の老舗日本料理店。四季折々の食材と一期一会のおもてなしをご堪能ください。",
    siteName: "割烹 神谷",
    images: [
      {
        url: `${siteUrl}/ogp.jpg`,
        width: 1200,
        height: 630,
        alt: "割烹 神谷",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "割烹 神谷 | 伝統と季節の味わい",
    description: "埼玉県川口市で四季の移ろいを感じる本格的な日本料理。旬の食材と熟練の技で織りなす割烹料理をご堪能ください。",
    images: [`${siteUrl}/ogp.jpg`],
  },
  category: "飲食店",
  classification: "日本料理",
  verification: {
    google: "Google Search Consoleの認証コードをここに入力",
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
