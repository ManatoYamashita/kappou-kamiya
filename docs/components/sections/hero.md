# Hero Component

## 概要

`app/components/Hero.tsx`は、トップページのファーストビュー（ヒーローセクション）を担当するコンポーネントです。ロゴ動画、背景画像、ナビゲーションリンク、予約ボタンを含みます。

## ファイル情報

- **パス**: `app/components/Hero.tsx`
- **行数**: 115行
- **コンポーネントタイプ**: Server Component（デフォルト）

## 主要機能

### 1. ロゴ動画の自動再生
WebM形式の動画を自動再生し、エラーハンドリングも実装しています。

```typescript
'use client';

const videoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
  if (videoRef.current) {
    videoRef.current.play().catch((error) => {
      console.log('動画の自動再生がブロックされました:', error);
    });
  }
}, []);

return (
  <video
    ref={videoRef}
    muted
    loop
    playsInline
    className="w-32 md:w-40 h-auto relative z-10"
  >
    <source src="/images/kamiya-logo.webm" type="video/webm" />
  </video>
);
```

**属性説明**:
- `muted`: 音声なし（自動再生に必須）
- `loop`: ループ再生
- `playsInline`: iOSでのインライン再生

### 2. 背景画像の優先読み込み
LCP（Largest Contentful Paint）最適化のため、背景画像を優先的に読み込みます。

```typescript
<Image
  src="/images/kamiya-cover.webp"
  alt="割烹 神谷"
  fill
  sizes="100vw"
  priority
  loading='eager'
  fetchPriority="high"
  decoding="async"
  className="object-cover"
/>
```

**最適化ポイント**:
- `priority`: 優先読み込み
- `loading='eager'`: 即座に読み込み
- `fetchPriority="high"`: 高優先度
- `sizes="100vw"`: 全画面幅

### 3. ナビゲーションリンク
4つの主要セクションへのリンクを提供します。

```typescript
<nav className="mt-8 md:mt-12">
  <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-lg md:text-xl">
    <li>
      <Link href="/#concept" className="hover:text-accent transition-colors">
        店舗理念
      </Link>
    </li>
    <li><Link href="/#menu">お品書き</Link></li>
    <li><Link href="/news">お知らせ</Link></li>
    <li><Link href="/#info">店舗情報</Link></li>
  </ul>
</nav>
```

### 4. 予約ボタン
汎用`Btn`コンポーネントを使用しています。

```typescript
<div className="mt-8">
  <Btn
    text="ご予約はこちら"
    href="/#info"
    color="white"
  />
</div>
```

## レイアウト構造

```html
<section id="hero-section" className="relative min-h-screen flex items-center justify-center">
  <!-- 背景画像 -->
  <div className="absolute inset-0">
    <Image ... />
    <div className="absolute inset-0 bg-black/30" /> {/* オーバーレイ */}
  </div>

  <!-- コンテンツ -->
  <div className="relative z-10 text-center text-white">
    <!-- ロゴ動画 -->
    <video ... />

    <!-- キャッチコピー -->
    <h1>四季の移ろいを感じる、本格割烹料理</h1>
    <p>埼玉県川口市 三代続く老舗の味</p>

    <!-- ナビゲーション -->
    <nav>...</nav>

    <!-- 予約ボタン -->
    <Btn ... />
  </div>
</section>
```

## レスポンシブデザイン

### モバイル（< 768px）
```typescript
<div className="flex flex-col items-center">
  <video className="w-32" />
  <h1 className="text-3xl">...</h1>
  <nav>
    <ul className="flex flex-col gap-4">...</ul>
  </nav>
</div>
```

### デスクトップ（>= 768px）
```typescript
<div className="grid grid-cols-3 items-center gap-8">
  {/* 左ナビ */}
  <nav className="col-span-1">...</nav>

  {/* 中央ロゴ */}
  <div className="col-span-1">
    <video className="w-40" />
    <h1 className="text-5xl">...</h1>
  </div>

  {/* 右ナビ */}
  <nav className="col-span-1">...</nav>
</div>
```

## アニメーション

### CSS Keyframes（`globals.css`）
```css
#hero-section {
  animation: fadeIn 1.2s ease-out 0.2s both;
}

#hero-section .w-32,
#hero-section .w-40 {
  animation: scaleIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
}

#hero-section nav ul li:nth-child(1) {
  animation: slideUp 0.8s ease-out 1.4s both;
}

#hero-section nav ul li:nth-child(2) {
  animation: slideUp 0.8s ease-out 1.6s both;
}

#hero-section nav ul li:nth-child(3) {
  animation: slideUp 0.8s ease-out 1.8s both;
}

#hero-section nav ul li:nth-child(4) {
  animation: slideUp 0.8s ease-out 2.0s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**アニメーションタイムライン**:
1. 0.2s: Heroセクション全体フェードイン
2. 0.4s: ロゴスケールイン
3. 1.4s~2.0s: ナビゲーションリンク順次スライドアップ

## パフォーマンス最適化

### 1. 画像最適化
```typescript
<Image
  src="/images/kamiya-cover.webp"
  fill
  sizes="100vw"
  priority
  className="object-cover"
/>
```

### 2. 動画の軽量化
- WebM形式使用（MP4より軽量）
- 適切な解像度・ビットレート

### 3. オーバーレイによる可読性向上
```typescript
<div className="absolute inset-0 bg-black/30" />
```

背景画像の上に30%不透明度の黒を重ね、テキストの可読性を向上させています。

## アクセシビリティ

### セマンティックHTML
```html
<section id="hero-section">
  <h1>四季の移ろいを感じる、本格割烹料理</h1>
  <nav>{/* ナビゲーション */}</nav>
</section>
```

### 代替テキスト
```typescript
<Image alt="割烹 神谷" ... />
```

### スキップリンク対応
`id="hero-section"`により、Header内のスキップリンクで飛ばせます。

## Header連動

Headerコンポーネントは、Intersection ObserverでHeroの表示状態を監視し、Hero表示中はヘッダーを非表示にします。

```typescript
// Header.tsx
const heroSection = document.getElementById('hero-section');
const observer = new IntersectionObserver(
  (entries) => {
    setIsHeroVisible(entries[0].isIntersecting);
  },
  { threshold: 0.1 }
);
```

## 使用例

### トップページでの使用
```typescript
// app/page.tsx
import Hero from './components/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
      {/* 他のセクション */}
    </main>
  );
}
```

## トラブルシューティング

### 問題: 動画が再生されない
**原因**: ブラウザの自動再生ポリシー

**確認事項**:
- `muted`属性が設定されているか
- `playsInline`属性が設定されているか（iOS）
- エラーハンドリングが実装されているか

### 問題: 背景画像が表示されない
**原因**: パスまたはサイズ指定の問題

**確認**:
```typescript
console.log('Image path:', '/images/kamiya-cover.webp');
```

### 問題: アニメーションが実行されない
**原因**: `globals.css`の読み込み順序

**確認**:
```typescript
// layout.tsx
import './globals.css';
```

## カスタマイズ

### キャッチコピーの変更
```typescript
<h1 className="text-3xl md:text-5xl font-mincho font-bold mb-4">
  {/* カスタムキャッチコピー */}
</h1>
```

### ナビゲーションリンクの追加
```typescript
<ul className="flex flex-col md:flex-row gap-4 md:gap-8">
  {/* 新しいリンク */}
  <li><Link href="/about">私たちについて</Link></li>
</ul>
```

## 関連ドキュメント

- [Header Component](../layout/header.md)
- [Btn Component](../common/btn.md)
- [Animations](../../styling/animations.md)
- [Image Optimization](../../performance/image-optimization.md)
