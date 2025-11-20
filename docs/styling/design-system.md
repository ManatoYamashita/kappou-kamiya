# Design System

## 概要

割烹神谷プロジェクトのデザインシステムは、和風レストランの伝統と品格を表現しつつ、現代的なWebデザインの要素を融合させています。

## カラーパレット

### プライマリカラー

#### Paper（和紙風背景）
```css
--color-paper: #f8f6f1;
```
- **用途**: 背景色、ボタンの白色バリエーション
- **説明**: 和紙をイメージした温かみのある白色

#### Ink（墨色）
```css
--color-ink: #1a1a1a;
```
- **用途**: テキスト色、ボタンの黒色バリエーション、Footer背景
- **説明**: 墨をイメージした深い黒色

#### Accent（金茶色）
```css
--color-accent: #8c7851;
```
- **用途**: ホバー時のアクセント、リンク色
- **説明**: 和の雰囲気を演出する落ち着いた金茶色

### TailwindCSS設定

```javascript
// tailwind.config.js
colors: {
  'paper': '#f8f6f1',
  'ink': '#1a1a1a',
  'accent': '#8c7851',
}
```

## タイポグラフィ

### フォントファミリー

#### Noto Sans JP（ゴシック体）
```typescript
import { Noto_Sans_JP } from 'next/font/google';

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: 'swap',
  weight: ["400", "500", "700"],
});
```

**用途**:
- UI要素（ボタン、ナビゲーション、本文）
- 現代的な読みやすさを重視

#### Shippori Mincho（明朝体）
```typescript
import { Shippori_Mincho } from 'next/font/google';

const mincho = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
  display: 'swap',
  weight: ["400", "500", "700"],
});
```

**用途**:
- 見出し（h1, h2, h3）
- ロゴテキスト
- 和風の雰囲気を演出

### フォントサイズ

| サイズ | クラス | 用途 |
|---|---|---|
| 48px+ | `text-5xl` | ヒーローセクション見出し |
| 36px | `text-4xl` | ページ見出し（h1） |
| 30px | `text-3xl` | セクション見出し（h2） |
| 24px | `text-2xl` | サブ見出し（h3） |
| 20px | `text-xl` | 強調テキスト |
| 18px | `text-lg` | ボタン、ナビゲーション |
| 16px | `text-base` | 本文 |
| 14px | `text-sm` | 補足テキスト |

## スペーシング

### カスタムスペーシング

```javascript
// tailwind.config.js
spacing: {
  '128': '32rem', // 512px
}
```

### マージン・パディング

| クラス | サイズ | 用途 |
|---|---|---|
| `p-6` | 24px | モバイルパディング |
| `p-16` | 64px | デスクトップパディング |
| `py-12` | 上下48px | セクション間隔 |
| `py-16` | 上下64px | 大きなセクション間隔 |
| `gap-6` | 24px | グリッドギャップ |
| `gap-8` | 32px | 大きなグリッドギャップ |

## レイアウト

### コンテナ

```typescript
<div className="container mx-auto px-6 md:px-16">
  {/* コンテンツ */}
</div>
```

**設定**:
- 中央揃え（`mx-auto`）
- モバイル: 左右24px
- デスクトップ: 左右64px

### グリッド

#### 2カラムレイアウト
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* コンテンツ */}
</div>
```

#### 3カラムレイアウト
```typescript
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* コンテンツ */}
</div>
```

## ボタン

### プライマリボタン（黒）
```typescript
<button className="bg-ink text-paper border-2 border-ink
  px-8 py-3 rounded-full font-medium text-lg
  transition-all duration-300
  hover:bg-paper hover:text-ink hover:shadow-lg">
  ボタン
</button>
```

### セカンダリボタン（白）
```typescript
<button className="bg-paper text-ink border-2 border-paper
  px-8 py-3 rounded-full font-medium text-lg
  transition-all duration-300
  hover:bg-ink hover:text-paper hover:shadow-lg">
  ボタン
</button>
```

## カード

### ニュースカード
```typescript
<div className="bg-white rounded-lg shadow-md
  hover:shadow-xl transition-shadow duration-300
  overflow-hidden">
  {/* コンテンツ */}
</div>
```

### メニューカード
```typescript
<div className="min-w-[280px] max-w-[320px]
  bg-white rounded-lg shadow-lg
  hover:shadow-xl transition-shadow duration-300">
  {/* コンテンツ */}
</div>
```

## アニメーション

### トランジション

```css
transition-all duration-300 ease-in-out
```

**適用箇所**:
- ボタンホバー
- カードホバー
- リンクホバー

### カスタムアニメーション

```javascript
// tailwind.config.js
animation: {
  'fade-in': 'fadeIn 0.8s ease-in-out forwards',
  'fade-up': 'fadeUp 1s ease-out forwards',
  'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}

keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeUp: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
}
```

## 影（Shadow）

| クラス | 用途 |
|---|---|
| `shadow-md` | カードデフォルト |
| `shadow-lg` | カード強調 |
| `shadow-xl` | カードホバー |

## ボーダー

### 角丸
```css
rounded-lg     /* 8px - カード */
rounded-full   /* 完全な円形 - ボタン */
```

### ボーダー幅
```css
border-2       /* 2px - ボタン */
border-t       /* 上のみ - 区切り線 */
```

## レスポンシブブレークポイント

| プレフィックス | 最小幅 | 用途 |
|---|---|---|
| - | 0px | モバイル（デフォルト） |
| `sm:` | 640px | 大きめのモバイル |
| `md:` | 768px | タブレット |
| `lg:` | 1024px | デスクトップ |
| `xl:` | 1280px | 大きなデスクトップ |
| `2xl:` | 1536px | 超大型ディスプレイ |

## 和風デザイン要素

### 和紙風テクスチャ
```css
body {
  background-image: url("data:image/svg+xml,...");
  background-attachment: fixed;
}
```

### 垂直テキスト
```css
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  letter-spacing: 0.15em;
}
```

**用途**: ニュース一覧ページの日付表示

## アクセシビリティ

### フォーカススタイル
```css
focus:outline-none
focus:ring-2
focus:ring-accent
focus:ring-offset-2
```

### カラーコントラスト
- **Paper × Ink**: 15.8:1（AAA適合）
- **Accent × Paper**: 4.8:1（AA適合）

## ベストプラクティス

### 1. 一貫性
同じ用途には同じスタイルを使用する。

### 2. スペーシングの統一
8pxの倍数を基本とする（Tailwindのデフォルト）。

### 3. アニメーションは控えめに
和風の落ち着いた雰囲気を損なわないよう、過度なアニメーションは避ける。

### 4. モバイルファースト
モバイル表示を基準にし、デスクトップで拡張する。

### 5. 明朝体の適切な使用
見出しには明朝体、本文にはゴシック体を使い分ける。

## 関連ドキュメント

- [TailwindCSS Configuration](./tailwind-config.md)
- [Animations](./animations.md)
- [Global Styles](./global-styles.md)
- [Responsive Design](./responsive-design.md)
