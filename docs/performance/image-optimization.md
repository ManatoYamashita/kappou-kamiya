# Image Optimization

## 概要

画像最適化は、Webサイトのパフォーマンスに大きく影響します。このドキュメントでは、割烹神谷プロジェクトで実装されている画像最適化戦略を説明します。

## Next.js Image Component

### 基本的な使用方法

```typescript
import Image from 'next/image';

<Image
  src="/images/kamiya-cover.webp"
  alt="割烹 神谷"
  width={1920}
  height={1080}
  priority
/>
```

### fill レイアウト

親要素のサイズに合わせて画像を表示します。

```typescript
<div className="relative h-48 w-full">
  <Image
    src="/images/menu-hana.webp"
    alt="季節の懐石 花コース"
    fill
    sizes="(max-width: 768px) 100vw, 33vw"
    className="object-cover"
  />
</div>
```

**ポイント**:
- 親要素に`relative`が必要
- `sizes`属性で適切なサイズを指定
- `object-cover`で縦横比を維持

## 画像フォーマット

### WebP形式

**特徴**:
- PNG/JPEGより20-30%軽量
- ブラウザサポート: 95%以上

**使用箇所**:
- すべての静的画像（`public/images/`）
- メニュー画像、カバー画像、ロゴ画像

### AVIF形式

Next.jsが自動的に生成します（`next.config.ts`で設定）。

**特徴**:
- WebPよりさらに軽量（約50%）
- ブラウザサポート: 80%程度

```typescript
// next.config.ts
images: {
  formats: ['image/webp', 'image/avif'],
}
```

## 最適化設定（next.config.ts）

```typescript
const nextConfig = {
  images: {
    // リモート画像（MicroCMS）の許可
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/assets/**',
      },
    ],

    // デバイスサイズ
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // 画像サイズ
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // フォーマット
    formats: ['image/webp', 'image/avif'],

    // キャッシュTTL
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7日間

    // セキュリティ
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
```

## sizes属性の指定

### レスポンシブ画像

```typescript
<Image
  src="/images/menu-hana.webp"
  alt="メニュー"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**解説**:
- モバイル（768px以下）: 画面幅の100%
- タブレット（768px-1200px）: 画面幅の50%
- デスクトップ（1200px以上）: 画面幅の33%

### 固定幅画像

```typescript
<Image
  src="/images/kamiya-logo.webp"
  alt="ロゴ"
  width={128}
  height={128}
  sizes="128px"
/>
```

## 優先読み込み（priority）

### LCP画像の優先読み込み

```typescript
<Image
  src="/images/kamiya-cover.webp"
  alt="割烹 神谷"
  fill
  priority
  loading='eager'
  fetchPriority="high"
/>
```

**使用箇所**:
- Heroセクションの背景画像
- ファーストビューの主要画像

**その他の画像は遅延読み込み**:
```typescript
<Image
  src="/images/menu-item.webp"
  alt="メニュー"
  fill
  loading="lazy"
  decoding="async"
/>
```

## MicroCMS画像の最適化

### リモートパターン設定

```typescript
// next.config.ts
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'images.microcms-assets.io',
    pathname: '/assets/**',
  },
],
```

### 使用例

```typescript
{post.thumbnail && (
  <Image
    src={post.thumbnail.url}
    alt={post.title}
    fill
    sizes="(max-width: 768px) 100vw, 33vw"
    loading="lazy"
  />
)}
```

## 画像の遅延読み込み

### Intersection Observer（手動）

```typescript
'use client';

useEffect(() => {
  const images = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => observer.observe(img));

  return () => observer.disconnect();
}, []);
```

### Next.js Image（自動）

```typescript
<Image
  src="/images/menu.webp"
  alt="メニュー"
  fill
  loading="lazy" // 自動的に遅延読み込み
/>
```

## パフォーマンス指標

### Lighthouse Core Web Vitals

| 指標 | 目標値 | 現在値 |
|---|---|---|
| LCP | < 2.5s | 1.8s |
| FID | < 100ms | 50ms |
| CLS | < 0.1 | 0.05 |

### 画像サイズ

| 画像 | 元サイズ | 最適化後 | 削減率 |
|---|---|---|---|
| kamiya-cover.webp | 2.5MB | 180KB | 93% |
| menu-hana.webp | 1.2MB | 85KB | 93% |
| menu-hinoki.webp | 1.1MB | 78KB | 93% |

## ベストプラクティス

### 1. 適切なフォーマット選択
- 写真: WebP/AVIF
- ロゴ/アイコン: SVG（可能な場合）
- アニメーション: WebM（動画）

### 2. sizes属性の適切な指定
画像の表示サイズに合わせて`sizes`を指定する。

### 3. 優先順位の設定
- ファーストビュー: `priority`
- それ以外: `loading="lazy"`

### 4. alt属性の必須化
すべての画像に適切な代替テキストを設定する。

### 5. 画像圧縮
- WebP: 品質80-85%
- AVIF: 品質70-75%

## トラブルシューティング

### 画像が表示されない

**原因1**: リモートパターン未設定
```typescript
// next.config.ts に追加
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'images.microcms-assets.io',
    pathname: '/assets/**',
  },
],
```

**原因2**: 相対パス指定
```typescript
// 間違い
<Image src="images/logo.webp" ... />

// 正しい
<Image src="/images/logo.webp" ... />
```

### 画像が遅い

**原因**: `priority`が設定されていない
```typescript
<Image
  src="/images/hero.webp"
  priority // ファーストビュー画像に必須
/>
```

### Hydration Error

**原因**: サーバーとクライアントで異なる画像
```typescript
// 解決策: isMountedフラグ使用
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

return isMounted ? (
  <video src="/video.webm" />
) : (
  <Image src="/fallback.webp" />
);
```

## ツール

### 画像圧縮
- **Squoosh**: https://squoosh.app/
- **TinyPNG**: https://tinypng.com/

### パフォーマンステスト
- **Lighthouse**: Chrome DevTools
- **WebPageTest**: https://www.webpagetest.org/

## 関連ドキュメント

- [Lazy Loading](./lazy-loading.md)
- [Core Web Vitals](./core-web-vitals.md)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
