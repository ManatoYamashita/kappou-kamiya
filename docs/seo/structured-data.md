# Structured Data (JSON-LD)

## 概要

構造化データ（JSON-LD）は、検索エンジンがWebページの内容を理解しやすくするための標準フォーマットです。割烹神谷プロジェクトでは、Restaurant、Event、Review、MenuなどのSchema.orgスキーマを実装しています。

## 実装場所

`app/layout.tsx`のルートレイアウトで、`<Script>`タグを使用してJSON-LDを埋め込んでいます。

```typescript
<Script
  id="json-ld"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd),
  }}
/>
```

## Restaurant Schema

レストランの基本情報を定義します。

```json
{
  "@context": "https://schema.org",
  "@type": ["Restaurant", "FoodEstablishment", "LocalBusiness"],
  "name": "割烹 神谷",
  "url": "https://k-kamiya.net",
  "logo": "https://k-kamiya.net/ogp.jpg",
  "image": "https://k-kamiya.net/ogp.jpg",
  "description": "埼玉県川口市で四季の移ろいを感じる本格的な日本料理。旬の食材と熟練の技で織りなす割烹料理をご堪能ください。",
  "telephone": "+81-50-5487-4317",
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
  "acceptsReservations": "True",
  "paymentAccepted": "現金, クレジットカード",
  "currenciesAccepted": "JPY"
}
```

## Opening Hours Schema

営業時間を定義します。

```json
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
]
```

**注意**: 定休日（日曜日）は`dayOfWeek`から除外されています。

## Menu Schema

メニュー情報を定義します。

```json
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
}
```

## Event Schema

特別なコース・イベントを定義します。

```json
"event": [
  {
    "@type": "Event",
    "name": "季節の懐石 花コース",
    "description": "前菜、土瓶蒸し、刺身、牛ヒレ肉変り焼など全8品の贅沢コース",
    "startDate": "2024-03-01",
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
```

## Review Schema

レビュー情報を定義します。

```json
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
]
```

## Aggregate Rating Schema

総合評価を定義します。

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "120"
}
```

## Amenity Feature Schema

施設の設備を定義します。

```json
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
]
```

## Article Schema（ニュース詳細ページ）

ニュース記事にはArticleスキーマを使用します（`app/news/[id]/page.tsx`のメタデータ）。

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPost(id);

  return {
    openGraph: {
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}
```

## テスト方法

### Google Rich Results Test

1. [Rich Results Test](https://search.google.com/test/rich-results)にアクセス
2. URLを入力（例: `https://k-kamiya.net`）
3. 「URLをテスト」をクリック
4. エラーや警告がないか確認

### Schema Markup Validator

1. [Schema.org Validator](https://validator.schema.org/)にアクセス
2. URLまたはJSON-LDコードを入力
3. 検証結果を確認

## リッチスニペット表示例

### Restaurant

```
割烹 神谷 ⭐ 4.8 (120件のレビュー)
日本料理 · ¥¥¥ · 営業中 11:30-14:00, 17:00-22:00
埼玉県川口市市栄町1-1-1
```

### Event

```
季節の懐石 花コース
3月1日～ · ¥8,800
割烹 神谷にて開催
```

## ベストプラクティス

### 1. 正確な情報
すべての情報は正確で最新のものを記載する。

### 2. 必須プロパティの確認
Schema.orgの必須プロパティをすべて含める。

### 3. 画像URLは絶対パス
```json
"image": "https://k-kamiya.net/images/menu-hana.webp"
```

### 4. 日付フォーマット
ISO 8601形式を使用（`YYYY-MM-DD`）。

### 5. 電話番号フォーマット
国際形式を使用（`+81-XX-XXXX-XXXX`）。

## よくある間違い

### 1. 相対パスの使用
```json
// 間違い
"image": "/images/menu.webp"

// 正しい
"image": "https://k-kamiya.net/images/menu.webp"
```

### 2. 無効な日付
```json
// 間違い
"startDate": "2024/03/01"

// 正しい
"startDate": "2024-03-01"
```

### 3. 必須プロパティの欠如
Restaurantスキーマでは`name`、`address`、`servesCuisine`が必須。

## 更新手順

### 1. 営業時間の変更
```typescript
// app/layout.tsx
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", /* ... */],
    "opens": "11:00", // 変更
    "closes": "14:30", // 変更
  },
]
```

### 2. メニューの追加
```typescript
"hasMenuSection": [
  // 既存のメニュー
  {
    "@type": "MenuSection",
    "name": "新メニュー",
    "description": "説明",
    "offers": {
      "@type": "Offer",
      "price": "5000",
      "priceCurrency": "JPY"
    }
  }
]
```

### 3. イベントの追加
```typescript
"event": [
  // 既存のイベント
  {
    "@type": "Event",
    "name": "新イベント",
    "startDate": "2024-12-01",
    // ...
  }
]
```

## 関連ドキュメント

- [Metadata Strategy](./metadata-strategy.md)
- [Sitemap Generation](./sitemap.md)
- [Schema.org Documentation](https://schema.org/)
- [Google Rich Results](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
