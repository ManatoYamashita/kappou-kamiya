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
  title: "割烹 神谷 | 三代続く川口の老舗日本料理店",
  description: "埼玉県川口市で四季折々の食材が織り成す逸品を和の空間で味わえる老舗割烹料理店。ご接待・結納・法事・歓送迎会などに最適な空間をご用意しております。",
  keywords: "割烹, 神谷, 日本料理, 懐石, 川口, 埼玉, 和食, 個室, 接待, 法事",
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
