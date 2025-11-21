import type { Metadata } from "next";
import { Shippori_Mincho, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Viewport } from 'next';
import Header from './components/Header';
import PageTransition from './components/PageTransition';
import PageContent from './components/PageContent';
import LoadingBar from './components/LoadingBar';

// フォント設定
const mincho = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
  display: 'swap',
  preload: true,
  weight: ["400", "500", "700"],
});

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: 'swap',
  preload: true,
  weight: ["400", "500", "700"],
});

// 環境変数からサイトURLを取得
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kappou-kamiya.vercel.app';

// viewportとthemeColorの設定を別のエクスポートとして定義
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eee",
};

// 既存のmetadataからviewportとthemeColorを削除
export const metadata: Metadata = {
  title: "割烹 神谷 | 川口の和食・しゃぶしゃぶ",
  description: "埼玉県川口市で四季の移ろいを感じる本格的な日本料理。旬の食材と熟練の技で織りなす割烹料理をご堪能ください。慶事・法事・接待にぴったりの個室もご用意しております。",
  keywords: "割烹, 神谷, 日本料理, 懐石, 川口, 埼玉, 旬, 和食, 個室, 接待, 法事, 慶事, 会席料理, 宴会, 忘年会, しゃぶしゃぶ, 老舗, 三代目, 季節料理, 伝統料理",
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
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    title: "割烹 神谷 | 川口の和食・しゃぶしゃぶ",
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
    title: "割烹 神谷 | 川口の和食・しゃぶしゃぶ",
    description: "埼玉県川口市で四季の移ろいを感じる本格的な日本料理。旬の食材と熟練の技で織りなす割烹料理をご堪能ください。",
    images: [`${siteUrl}/ogp.jpg`],
  },
  category: "飲食店",
  classification: "日本料理",
  verification: {
    google: "O5tK0KvluMEvB4ik2ItnSy2MV_Nb4glltiMXxCmWlcw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LDスキーマの定義
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "FoodEstablishment", "LocalBusiness"],
    "name": "割烹 神谷",
    "url": siteUrl,
    "logo": `${siteUrl}/ogp.jpg`,
    "image": `${siteUrl}/ogp.jpg`,
    "description": "埼玉県川口市で四季の移ろいを感じる本格的な日本料理。旬の食材と熟練の技で織りなす割烹料理をご堪能ください。",
    "telephone": "+81-50-5487-4317",
    // 0482565551（Google map）
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "市栄町",
      "addressLocality": "川口市",
      "addressRegion": "埼玉県",
      "postalCode": "332-0017",
      "addressCountry": "JP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.80304247094117",
      "longitude": "139.72173139325432"
    },
    "priceRange": "¥¥¥",
    "servesCuisine": ["日本料理", "懐石料理", "割烹料理"],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "11:30",
        "closes": "14:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "17:00",
        "closes": "22:00"
      }
    ],
    "menu": `${siteUrl}/menu`,
    "acceptsReservations": "True",
    "paymentAccepted": "現金, クレジットカード",
    "currenciesAccepted": "JPY",
    "hasMenu": {
      "@type": "Menu",
      "name": "お品書き",
      "description": "四季折々の旬の食材を使った本格的な日本料理",
      "hasMenuSection": [
        {
          "@type": "MenuSection",
          "name": "ランチ",
          "description": "昼の御膳メニュー",
          "offers": {
            "@type": "Offer",
            "price": "2200",
            "priceCurrency": "JPY"
          }
        },
        {
          "@type": "MenuSection",
          "name": "ディナー",
          "description": "夜のコースメニュー",
          "offers": {
            "@type": "Offer",
            "price": "8800",
            "priceCurrency": "JPY"
          }
        }
      ]
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "個室",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "座敷",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "駐車場",
        "value": true
      }
    ],
    "specialties": "季節の会席料理、伝統的な割烹料理",
    "disambiguatingDescription": "埼玉県川口市の老舗割烹料理店。三代続く伝統と技術で作る本格的な日本料理を提供。接待や慶事・法事にも最適な個室完備。",
    "award": "地元で愛される老舗割烹料理店",
    "knowsAbout": ["日本料理", "懐石料理", "伝統的な和食", "季節の食材"],
    "foundingDate": "1950",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "120"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "野村様"
        },
        "datePublished": "2023-09-15",
        "reviewBody": "季節の素材を活かした料理が絶品でした。特に焼き物と椀物が印象的でした。おもてなしも素晴らしく、特別な日に利用するのに最適なお店です。",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "山下様"
        },
        "datePublished": "2023-11-20",
        "reviewBody": "接待で利用しました。個室でゆったりと食事ができ、料理の質も高く、大変満足です。お酒の種類も豊富で、日本酒とのペアリングも楽しめました。",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      }
    ],
    "event": [
      {
        "@type": "Event",
        "name": "季節の懐石 花コース",
        "description": "前菜、土瓶蒸し、刺身、牛ヒレ肉変り焼など全8品の贅沢コース",
        "startDate": "2024-03-01",
        // "endDate": "2024-04-30",
        "image": "/images/menu-hana.webp",
        "location": {
          "@type": "Place",
          "name": "割烹 神谷",
          "address": "埼玉県川口市市栄町1-1-1"
        },
        "offers": {
          "@type": "Offer",
          "price": "8800",
          "priceCurrency": "JPY"
        }
      },
      {
        "@type": "Event",
        "name": "牛しゃぶしゃぶ・檜（ひのき）コース",
        "description": "前菜、刺身、上しゃぶしゃぶ（上和牛霜降肉）など全11品の贅沢なコース",
        "startDate": "2024-07-01",
        // "endDate": "2024-08-31",
        "image": "/images/menu-hinoki.webp",
        "location": {
          "@type": "Place",
          "name": "割烹 神谷",
          "address": "埼玉県川口市市栄町1-1-1"
        },
        "offers": {
          "@type": "Offer",
          "price": "9900",
          "priceCurrency": "JPY"
        }
      }
    ]
  };

  return (
    <html lang="ja" className={`scroll-smooth ${mincho.variable} ${notoSerif.variable}`}>
      <head>
        {/* <meta name="theme-color" content="#f7f4ed" /> */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Resource Hints - Preconnect for external domains */}
        <link rel="preconnect" href="https://images.microcms-assets.io" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.consentmanager.net" />
        <link rel="dns-prefetch" href="https://b.delivery.consentmanager.net" />
        <Script
          id="consent-manager"
          src="https://cdn.consentmanager.net/delivery/autoblocking/92a399f462520.js"
          data-cmp-ab="1"
          data-cmp-host="b.delivery.consentmanager.net"
          data-cmp-cdn="cdn.consentmanager.net"
          data-cmp-codesrc="16"
          strategy="lazyOnload"
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        {/* Google Analyticsタグを遅延読み込みに変更 */}
        <Script
          id="gtag-manager"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-KQMT9X4Q9Z"
        />
        <Script
          id="gtag-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KQMT9X4Q9Z');
            `,
          }}
        />
        {/* スクロール問題修正のためのスクリプト */}
        <Script id="fix-scroll" strategy="afterInteractive">
          {`
            // ページ読み込み完了時に確実にスクロール禁止を解除
            window.addEventListener('load', function() {
              document.documentElement.classList.remove('is-changing');
            });

            // ルートパスの場合は即座にスクロール禁止を解除
            if (window.location.pathname === '/') {
              document.documentElement.classList.remove('is-changing');
            }

            // スクロール禁止が長時間続く場合のフォールバック
            setTimeout(function() {
              document.documentElement.classList.remove('is-changing');
            }, 3000);
          `}
        </Script>
      </head>
      <body
        className={`${mincho.variable} ${notoSerif.variable} font-mincho antialiased bg-paper text-ink`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-paper focus:outline-none"
          tabIndex={0}
          aria-label="メインコンテンツにスキップ"
        >
          メインコンテンツにスキップ
        </a>
        <LoadingBar />
        <Header />
        <PageTransition />
        <PageContent>
          {children}
        </PageContent>
      </body>
    </html>
  );
}
