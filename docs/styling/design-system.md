# Design System（デザインシステム）

## 概要

割烹神谷プロジェクトのデザインシステムは、**和の美意識**と**現代的なWebデザイン**を融合させた独自のスタイルガイドです。三代続く老舗日本料理店の伝統と品格を表現しつつ、ユーザーフレンドリーな体験を提供します。

## デザインコンセプト

### 和風トーン（Japanese Aesthetic）

#### 1. 侘寂（わびさび）の美学
- **シンプルさ**: 過度な装飾を避け、本質的な美しさを追求
- **自然な色合い**: 人工的な鮮やかさではなく、自然界の落ち着いた色調
- **経年変化**: 時間の経過を感じさせる温かみのある質感

#### 2. 余白の美
- **空間の使い方**: 情報を詰め込まず、十分な余白で視覚的な「間」を作る
- **呼吸感**: コンテンツ間に適切なスペーシングで落ち着きを演出
- **視線誘導**: 余白によって自然に視線が流れるレイアウト

#### 3. 伝統と革新の融合
- **明朝体**: 伝統的な日本の書体で格式と品格を表現
- **アニメーション**: 控えめで上品な動きで現代的な洗練を追加
- **レスポンシブデザイン**: モダンなWeb技術で全デバイスに対応

#### 4. 四季の感覚
- **季節感**: 日本料理の根幹である旬の食材や季節の移ろいを意識
- **自然のモチーフ**: 和紙の質感、墨の色合い、金茶色のアクセント
- **調和**: 全ての要素が調和し、統一感のあるデザイン

---

## カラーパレット

### デザイン哲学
色彩は**自然界の素材**からインスピレーションを得ています。和紙の温かみ、墨の深み、金茶の落ち着きが、料亭の雰囲気を忠実に再現します。

### プライマリカラー

#### Paper（和紙 / 紙色）
```css
--color-paper: #f8f6f1;
```

**特徴**:
- 和紙をイメージした温かみのあるオフホワイト
- 柔らかい光を感じさせる微細な黄味
- 長時間の閲覧でも目に優しい

**用途**:
- メイン背景色
- カードの背景
- ボタンの白色バリエーション
- ヘッダーのスクロール時背景

**心理効果**: 清潔感、落ち着き、上品さ

---

#### Ink（墨 / 墨色）
```css
--color-ink: #1a1a1a;
```

**特徴**:
- 書道の墨をイメージした深い黒
- 純黒（#000000）よりも柔らかく、読みやすい
- 高いコントラストで視認性を確保

**用途**:
- 本文テキスト
- 見出し
- ボタンの黒色バリエーション
- フッター背景
- ボーダー

**心理効果**: 権威、洗練、高級感

---

#### Accent（金茶 / 金茶色）
```css
--color-accent: #8c7851;
```

**特徴**:
- 伝統的な日本の配色である「金茶色」
- 温かみがありつつ落ち着いた印象
- 和のテイストを象徴する色

**用途**:
- ホバー時のアクセントカラー
- リンクの強調表示
- 区切り線や装飾要素
- 選択状態の表示

**心理効果**: 温かみ、伝統、安心感

---

### セカンダリカラー

#### Background（グローバル背景）
```css
--background: #EEEEEE;
```

**用途**:
- body要素のベース背景色
- 和紙風テクスチャのベース

---

#### Foreground（テキスト）
```css
--foreground: #1a1a1a;
```

**用途**:
- デフォルトのテキストカラー
- `--color-ink`と同値

---

### TailwindCSS設定

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'paper': '#f8f6f1',
        'ink': '#1a1a1a',
        'accent': '#8c7851',
      },
    },
  },
}
```

---

### ボタン専用カラー

現在のBtn.tsxコンポーネントでは、以下のカラーも使用されています：

```css
/* Default variant */
--btn-default-bg: transparent
--btn-default-hover: #151515

/* Primary variant */
--btn-primary-bg: #111111
--btn-primary-hover: #f5f5f5

/* Primary White variant */
--btn-primary-white-bg: #f1ecdf
--btn-primary-white-hover: #111111
```

---

### カラーコントラスト（アクセシビリティ）

| 組み合わせ | コントラスト比 | WCAG基準 |
|---|---|---|
| Paper (#f8f6f1) × Ink (#1a1a1a) | 15.8:1 | AAA適合 ✓ |
| Accent (#8c7851) × Paper (#f8f6f1) | 4.8:1 | AA適合 ✓ |
| Ink (#1a1a1a) × Background (#EEEEEE) | 14.2:1 | AAA適合 ✓ |

**アクセシビリティ基準**:
- **WCAG AAA**: 7:1以上（見出し・本文すべて対応）
- **WCAG AA**: 4.5:1以上（通常テキスト）、3:1以上（大きなテキスト）

---

## タイポグラフィ

### デザイン哲学
本プロジェクトでは、**明朝体（Mincho / Serif）のみ**を使用し、日本料理店らしい格式高い印象を統一的に表現します。ゴシック体は使用しません。

### フォントファミリー

#### Primary: Shippori Mincho（しっぽり明朝）

```typescript
import { Shippori_Mincho } from 'next/font/google';

const mincho = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
  display: 'swap',
  preload: true,
  weight: ["400", "500", "700"],
});
```

**特徴**:
- SIL Open Font License（商用利用可能）
- 日本語約1,000文字カバー
- 現代的でバランスの取れた明朝体
- 縦横比が整っており、Webでの可読性に優れる

**用途**:
- すべてのテキスト（見出し、本文、ボタン、ナビゲーション）
- プライマリフォントとして全体の印象を統一

---

#### Fallback: Noto Serif JP（Noto Serif 日本語）

```typescript
import { Noto_Serif_JP } from 'next/font/google';

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: 'swap',
  preload: 'true',
  weight: ["400", "500", "700"],
});
```

**特徴**:
- SIL Open Font License（商用利用可能）
- 日本語23,000+文字カバー（JIS X 0208, JIS X 0213完全対応）
- Googleによる高品質なセリフ体
- Shippori Minchoでカバーされない文字をサポート

**用途**:
- Shippori Minchoで表示できない文字のフォールバック
- 旧字体、外字、記号などの補完

---

#### System Fallback Fonts

```css
/* tailwind.config.js */
fontFamily: {
  'mincho': [
    'var(--font-shippori-mincho)',
    'var(--font-noto-serif)',
    '"Yu Mincho"',
    'YuMincho',
    '"Hiragino Mincho ProN"',
    '"Hiragino Mincho Pro"',
    'serif'
  ],
}
```

**フォールバックチェーン**:
1. **Shippori Mincho**: プライマリ（Google Fonts）
2. **Noto Serif JP**: セカンダリ（Google Fonts）
3. **Yu Mincho**: Windows/Mac標準の明朝体
4. **Hiragino Mincho Pro**: Mac/iOS標準の明朝体
5. **serif**: ブラウザデフォルトのセリフ体

**重要**: すべてのフォントは無料かつ商用利用可能です。

---

### フォントウェイト

| ウェイト | 値 | 用途 |
|---|---|---|
| Regular | 400 | 本文、通常のテキスト |
| Medium | 500 | 強調テキスト、ナビゲーション |
| Bold | 700 | 見出し、重要な情報 |

**使用例**:
```tsx
<h1 className="font-mincho font-bold text-4xl">割烹 神谷</h1>
<p className="font-mincho font-normal text-base">本文テキスト</p>
<nav className="font-mincho font-medium text-sm">ナビゲーション</nav>
```

---

### フォントサイズ

| サイズ | Tailwindクラス | px | 用途 |
|---|---|---|---|
| 5xl | `text-5xl` | 48px | ヒーローセクション見出し |
| 4xl | `text-4xl` | 36px | ページ見出し（h1） |
| 3xl | `text-3xl` | 30px | セクション見出し（h2） |
| 2xl | `text-2xl` | 24px | サブ見出し（h3） |
| xl | `text-xl` | 20px | 強調テキスト |
| lg | `text-lg` | 18px | ボタン、ナビゲーション |
| base | `text-base` | 16px | 本文（デフォルト） |
| sm | `text-sm` | 14px | 補足テキスト、日付 |

---

### 行間・字間

```css
/* globals.css */
body {
  line-height: 1.7; /* 本文 */
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.5; /* 見出し */
  letter-spacing: 0.05em; /* 5%の字間 */
}
```

**行間（line-height）**:
- **本文**: 1.7（170%）- 日本語の可読性を考慮した広めの設定
- **見出し**: 1.5（150%）- 見出しはやや詰めて力強さを表現

**字間（letter-spacing）**:
- **デフォルト**: 0.05em（5%）- 明朝体の美しさを引き立てる
- **ナビゲーション**: 0.15em（15%）- 視認性とデザイン性を向上

---

### フォント最適化

```typescript
// layout.tsx
display: 'swap'  // FOUTを防ぐ
preload: true    // 初期表示を高速化
```

**最適化ポイント**:
1. **Font Display: Swap**: システムフォントを先に表示し、Web Fontsが読み込まれたら置き換え
2. **Preload**: 重要なフォントを優先的に読み込み
3. **Variable Fonts**: CSS変数で柔軟に管理

---

## スペーシング

### デザイン哲学
スペーシングは**8pxグリッド**を基準とし、調和の取れたリズム感を生み出します。

### カスタムスペーシング

```javascript
// tailwind.config.js
spacing: {
  '128': '32rem', // 512px - 大きなセクション間隔
}
```

### セクション間隔

| クラス | px | 用途 |
|---|---|---|
| `py-12` | 上下48px | 標準セクション間隔 |
| `py-16` | 上下64px | 大きなセクション間隔 |
| `py-20` | 上下80px | 特大セクション間隔 |
| `py-24` | 上下96px | ヒーローセクション |

### パディング（内側の余白）

| クラス | px | 用途 |
|---|---|---|
| `p-4` | 16px | 小さなパディング |
| `p-6` | 24px | モバイルコンテナ |
| `p-8` | 32px | 標準パディング |
| `p-16` | 64px | デスクトップコンテナ |

### マージン（外側の余白）

| クラス | px | 用途 |
|---|---|---|
| `mb-4` | 16px | 小さなマージン |
| `mb-8` | 32px | 標準マージン |
| `mb-12` | 48px | 大きなマージン |
| `mb-16` | 64px | セクション区切り |

### グリッドギャップ

| クラス | px | 用途 |
|---|---|---|
| `gap-4` | 16px | 密なグリッド |
| `gap-6` | 24px | 標準グリッド |
| `gap-8` | 32px | 広いグリッド |

---

## レイアウト

### コンテナパターン

#### 標準コンテナ
```tsx
<div className="container mx-auto px-6 md:px-16">
  {/* コンテンツ */}
</div>
```

**設定**:
- `container`: TailwindCSSのコンテナ（最大幅制限）
- `mx-auto`: 中央揃え
- `px-6`: モバイル左右24px
- `md:px-16`: デスクトップ左右64px

---

#### セクションコンテナ
```tsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-6 md:px-16">
    {/* コンテンツ */}
  </div>
</section>
```

**設定**:
- `py-16`: モバイル上下64px
- `md:py-24`: デスクトップ上下96px

---

### グリッドシステム

#### 2カラムレイアウト
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* コンテンツ */}
</div>
```

**用途**: メニュー詳細、画像とテキストの組み合わせ

---

#### 3カラムレイアウト
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* コンテンツ */}
</div>
```

**用途**: ニュース一覧、メニューカード一覧

---

#### 4カラムレイアウト
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* コンテンツ */}
</div>
```

**用途**: アイコングリッド、小さなカード一覧

---

### Flexboxパターン

#### 水平中央揃え
```tsx
<div className="flex justify-center items-center">
  {/* コンテンツ */}
</div>
```

---

#### 左右配置
```tsx
<div className="flex justify-between items-center">
  <div>左側</div>
  <div>右側</div>
</div>
```

**用途**: ヘッダー、ナビゲーション

---

## ボタン（Btn Component）

### デザイン哲学
ボタンは**グラデーションアニメーション**で洗練されたインタラクションを提供します。ホバー時に背景がスライドし、色が反転する動きで、ユーザーに直感的なフィードバックを与えます。

### バリエーション

#### Default（デフォルト）

```tsx
<Btn text="ボタン" href="#" variant="default" />
```

**スタイル**:
```css
background: linear-gradient(90deg, transparent 0%, transparent 50%, #151515 50%);
background-size: 200% 100%;
background-position: 0 0;
color: #1a1a1a; /* ink */
border: 1px solid #1a1a1a;

/* ホバー時 */
background-position: 100% 0;
color: #f5f5f5; /* 白 */
```

**特徴**:
- 透明背景から黒背景へスライド
- テキスト色が黒から白に反転
- 軽量な印象で、セカンダリアクション向け

---

#### Primary（プライマリ）

```tsx
<Btn text="ボタン" href="#" variant="primary" />
```

**スタイル**:
```css
background: linear-gradient(90deg, #111111 0%, #111111 50%, #f5f5f5 50%);
background-size: 200% 100%;
background-position: 0 0;
color: #f5f5f5; /* 白 */
border: 1px solid #111111;

/* ホバー時 */
background-position: 100% 0;
color: #1a1a1a; /* 黒 */
```

**特徴**:
- 黒背景から白背景へスライド
- テキスト色が白から黒に反転
- 強調された印象で、メインアクション向け

---

#### Primary White（白背景用プライマリ）

```tsx
<Btn text="ボタン" href="#" variant="primary-white" />
```

**スタイル**:
```css
background: linear-gradient(90deg, #f1ecdf 0%, #f1ecdf 50%, #111111 50%);
background-size: 200% 100%;
background-position: 0 0;
color: #1a1a1a; /* 黒 */
border: 1px solid #f1ecdf;

/* ホバー時 */
background-position: 100% 0;
color: #f5f5f5; /* 白 */
```

**特徴**:
- 明るい背景から黒背景へスライド
- テキスト色が黒から白に反転
- 白背景上で使用する際の視認性を確保

---

### 共通スタイル

```css
/* ベースクラス */
.btn-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px; /* 0.75rem */
  border-radius: 0; /* 角丸なし（和風） */
  padding: 14px 24px; /* 3.5 × 6 */
  font-size: 16px; /* text-base */
  font-weight: 500; /* medium */
  transition: all 0.3s ease;
  will-change: transform;
  overflow: hidden;
}
```

**特徴**:
- **角丸なし**: 和風の直線的な美学
- **ホバーエフェクト**: グラデーションスライドのみ（シャドウや移動なし）
- **トランジション**: 300ms（滑らかだが素早い反応）

---

### 使用例

#### リンクとして使用
```tsx
<Btn
  text="お問い合わせ"
  href="/contact"
  variant="primary"
  aria-label="お問い合わせページへ移動"
/>
```

#### 外部リンク
```tsx
<Btn
  text="おせちの購入"
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  variant="primary"
/>
```

#### ボタンとして使用
```tsx
<Btn
  text="送信する"
  onClick={handleSubmit}
  variant="default"
/>
```

#### ローディング状態
```tsx
<Btn
  text="送信中..."
  loading={true}
  variant="primary"
/>
```

---

## カード

### デザイン哲学
カードは**影と境界線**で立体感を表現し、ホバー時に影が深くなることで奥行きを演出します。

### ニュースカード

```tsx
<div className="bg-white rounded-lg shadow-md
  hover:shadow-xl transition-shadow duration-300
  overflow-hidden">
  <Image src="..." alt="..." />
  <div className="p-6">
    <h3 className="font-mincho font-bold text-xl mb-2">
      タイトル
    </h3>
    <p className="font-mincho text-sm text-gray-600">
      日付・カテゴリ
    </p>
  </div>
</div>
```

**特徴**:
- `shadow-md`: デフォルトで中程度の影
- `hover:shadow-xl`: ホバー時に深い影
- `rounded-lg`: 控えめな角丸（8px）

---

### メニューカード

```tsx
<div className="min-w-[280px] max-w-[320px]
  bg-paper rounded-lg shadow-lg
  hover:shadow-xl transition-all duration-300
  p-6">
  <h4 className="font-mincho font-bold text-xl mb-4">
    メニュー名
  </h4>
  <p className="font-mincho text-base mb-6">
    説明文
  </p>
  <p className="font-mincho font-medium text-lg">
    価格
  </p>
</div>
```

**特徴**:
- `bg-paper`: 和紙色の背景
- 固定幅（280px-320px）でスクロール可能
- `shadow-lg`: デフォルトで深めの影

---

## アニメーション

### デザイン哲学
アニメーションは**控えめで上品**に。和風の落ち着いた雰囲気を損なわないよう、過度な動きは避けます。

### トランジション

#### 標準トランジション
```css
transition-all duration-300 ease-in-out
```

**適用箇所**:
- ボタンホバー
- カードホバー
- リンクホバー
- メニュー開閉

---

#### 長めのトランジション
```css
transition-all duration-500 ease-in-out
```

**適用箇所**:
- ページ遷移
- ヘッダーの表示/非表示
- モーダルの開閉

---

### カスタムアニメーション

#### Fade In（フェードイン）
```javascript
// tailwind.config.js
animation: {
  'fade-in': 'fadeIn 0.8s ease-in-out forwards',
}

keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
}
```

**用途**: ページ読み込み時の要素表示

---

#### Fade Up（フェードアップ）
```javascript
animation: {
  'fade-up': 'fadeUp 1s ease-out forwards',
}

keyframes: {
  fadeUp: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
}
```

**用途**: スクロール連動の要素表示

---

#### Slide Up（スライドアップ）
```css
/* globals.css */
@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0.01;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

**用途**: Hero セクションのアニメーション

---

#### Scale In（スケールイン）
```css
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0.01;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

**用途**: ロゴやアイコンの強調表示

---

### ページ遷移（GSAP）

```typescript
// PageTransition.tsx
gsap.fromTo(
  '.page-content',
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
);
```

**特徴**:
- **opacity**: 0 → 1（フェードイン）
- **y**: 20px → 0（上から表示）
- **duration**: 600ms
- **easing**: power2.out（自然な減速）

---

## 影（Shadow）

### デザイン哲学
影は**奥行きと階層**を表現しますが、和風の控えめな美学に合わせて過度にならないよう調整します。

### 影のレベル

| クラス | 値 | 用途 |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | 微細な影（ホバー前のボタン） |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | 標準の影（カードデフォルト） |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | 深めの影（メニューカード） |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | 最も深い影（カードホバー） |

---

### カスタム影

```css
/* menu-card */
box-shadow:
  0 8px 20px rgba(0, 0, 0, 0.05),
  0 2px 8px rgba(0, 0, 0, 0.03);
```

**特徴**:
- 2層の影で立体感を強調
- 透明度を低く（5%、3%）して控えめに

---

## ボーダー

### 角丸（Border Radius）

| クラス | 値 | 用途 |
|---|---|---|
| `rounded-none` | 0px | ボタン（和風の直線美） |
| `rounded-lg` | 8px | カード |
| `rounded-xl` | 12px | 画像 |
| `rounded-2xl` | 16px | Hero画像 |

---

### ボーダー幅

| クラス | 値 | 用途 |
|---|---|---|
| `border` | 1px | デフォルトのボーダー |
| `border-2` | 2px | ボタン |
| `border-t` | 上のみ1px | セクション区切り |

---

### ボーダー色

```tsx
<div className="border border-ink">...</div>
<div className="border-2 border-accent">...</div>
```

---

## 和風デザイン要素

### 1. 和紙風テクスチャ

```css
/* globals.css */
body {
  background: #EEEEEE;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23d1cdcd' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  background-attachment: fixed;
}
```

**特徴**:
- SVGで微細な繊維感を表現
- 透明度10%で控えめに
- `background-attachment: fixed`でスクロール時に固定

---

### 2. 垂直テキスト（縦書き）

```css
/* globals.css */
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  white-space: nowrap;
  letter-spacing: 0.15em;
  transform: rotate(180deg);
  font-feature-settings: "palt";
}
```

**用途**:
- ニュース一覧ページの日付表示
- 和風の演出が必要な箇所

**使用例**:
```tsx
<div className="vertical-text">
  2024年11月20日
</div>
```

---

### 3. 和風セパレーター（区切り線）

```css
/* globals.css */
.jp-separator {
  display: flex;
  align-items: center;
  margin: 2rem 0;
}

.jp-separator::before,
.jp-separator::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--color-accent);
  opacity: 0.35;
}

.jp-separator::before {
  margin-right: 1rem;
}

.jp-separator::after {
  margin-left: 1rem;
}
```

**使用例**:
```tsx
<div className="jp-separator">
  <span>お品書き</span>
</div>
```

**特徴**:
- アクセントカラーの線
- 中央にテキストを配置
- 透明度35%で控えめに

---

### 4. 家紋風マーク

```css
/* globals.css */
.jp-symbol {
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
}

.jp-symbol::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 0.8rem;
  height: 0.8rem;
  border: 1px solid var(--color-accent);
}
```

**使用例**:
```tsx
<div className="jp-separator">
  <div className="jp-symbol"></div>
</div>
```

**特徴**:
- 45度回転した正方形で家紋風のデザイン
- 和の装飾要素として使用

---

### 5. メニューカード（和風スタイル）

```css
/* globals.css */
.menu-card {
  background: var(--color-paper);
  border: none;
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.menu-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid var(--color-accent);
  opacity: 0.2;
  transition: opacity 0.4s ease;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 12px 24px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.06);
}

.menu-card:hover::before {
  opacity: 0.5;
}
```

**特徴**:
- 和紙色の背景
- アクセントカラーの内側ボーダー
- ホバー時にわずかに上昇

---

### 6. スクロールアニメーション

```css
/* globals.css */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.33, 1, 0.68, 1);
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
}
```

**使用方法**:
1. 要素に`animate-on-scroll`クラスを追加
2. Intersection Observerで`.fade-in`クラスを追加

**特徴**:
- スクロール連動で滑らかに表示
- カスタムイージング（cubic-bezier）で自然な動き

---

## レスポンシブデザイン

### ブレークポイント

| プレフィックス | 最小幅 | デバイス |
|---|---|---|
| - | 0px | モバイル（デフォルト） |
| `sm:` | 640px | 大きめのモバイル |
| `md:` | 768px | タブレット |
| `lg:` | 1024px | デスクトップ |
| `xl:` | 1280px | 大きなデスクトップ |
| `2xl:` | 1536px | 超大型ディスプレイ |

---

### レスポンシブパターン

#### モバイルファースト
```tsx
<div className="px-6 md:px-16">
  {/* モバイル: 24px、デスクトップ: 64px */}
</div>
```

#### グリッドレスポンシブ
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* モバイル: 1列、タブレット: 2列、デスクトップ: 3列 */}
</div>
```

#### テキストサイズレスポンシブ
```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl">
  {/* モバイル: 30px、タブレット: 36px、デスクトップ: 48px */}
</h1>
```

#### 表示/非表示
```tsx
<div className="hidden md:block">
  {/* タブレット以上で表示 */}
</div>

<div className="md:hidden">
  {/* モバイルのみ表示 */}
</div>
```

---

## アクセシビリティ

### フォーカススタイル

```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
  ボタン
</button>
```

**特徴**:
- デフォルトのoutlineを削除
- アクセントカラーのring（2px）
- ring-offset（2px）で視認性向上

---

### スキップリンク

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-paper"
>
  メインコンテンツにスキップ
</a>
```

**特徴**:
- 通常は非表示（`sr-only`）
- フォーカス時に表示
- キーボードナビゲーションを支援

---

### ARIA属性

```tsx
<button aria-label="メニューを開く" aria-expanded={isOpen}>
  <span className="sr-only">メニューを開く</span>
  <MenuIcon />
</button>
```

---

## ベストプラクティス

### 1. 一貫性の維持
同じ用途には同じスタイルを使用し、デザインシステムから逸脱しない。

### 2. スペーシングの統一
8pxの倍数を基本とし、調和の取れたリズムを生み出す。

### 3. アニメーションは控えめに
和風の落ち着いた雰囲気を損なわないよう、過度なアニメーションは避ける。

### 4. モバイルファースト
モバイル表示を基準にし、デスクトップで拡張する設計。

### 5. 明朝体の統一
すべてのテキストで明朝体を使用し、格式高い印象を保つ。

### 6. カラーコントラストの確保
WCAG AA以上のコントラスト比を維持し、アクセシビリティを確保。

### 7. パフォーマンス優先
画像はNext.js Image Componentを使用し、適切なsizes属性を設定。

### 8. セマンティックHTML
意味のあるHTMLタグを使用し、スクリーンリーダーでの体験を向上。

---

## 関連ドキュメント

- [TailwindCSS Configuration](../../tailwind.config.js)
- [Global Styles](../../app/globals.css)
- [Btn Component](../components/common/btn.md)
- [Header Component](../components/layout/header.md)
- [Hero Component](../components/sections/hero.md)
- [Performance Optimization](../performance/image-optimization.md)

---

**最終更新**: 2025-11-21
**バージョン**: 2.0.0
