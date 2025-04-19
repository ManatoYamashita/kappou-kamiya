import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Shippori_Mincho } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "700"],
});

const mincho = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "割烹 神谷 | 伝統と季節の味わい",
  description: "東京で四季の移ろいを感じる本格的な日本料理。旬の食材と熟練の技で織りなす割烹料理をご堪能ください。",
  keywords: "割烹, 神谷, 日本料理, 懐石, 東京, 旬, 和食",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSans.variable} ${mincho.variable} font-sans antialiased bg-paper text-ink`}
      >
        <div className="mx-auto max-w-screen-xl">
          {children}
        </div>
      </body>
    </html>
  );
}
