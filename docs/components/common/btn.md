# Btn Component

## 概要

`app/components/Btn.tsx`は、アプリケーション全体で使用される汎用ボタンコンポーネントです。リンク（`<Link>`）とボタン（`<button>`）を自動的に切り替え、統一されたデザインとアニメーションを提供します。

## ファイル情報

- **パス**: `app/components/Btn.tsx`
- **行数**: 98行
- **コンポーネントタイプ**: Server/Client Component（使用状況による）

## Props

```typescript
interface BtnProps {
  text: string;          // ボタンテキスト
  href?: string;         // リンク先URL（任意）
  onClick?: () => void;  // クリックハンドラー（任意）
  color?: 'black' | 'white'; // カラーバリエーション（デフォルト: 'black'）
  loading?: boolean;     // ローディング状態（デフォルト: false）
}
```

## 主要機能

### 1. Link/buttonの自動切り替え
`href`プロップの有無に応じて自動的にコンポーネントを切り替えます。

```typescript
if (href) {
  return (
    <Link href={href} className={buttonClasses}>
      {/* ボタンUI */}
    </Link>
  );
} else {
  return (
    <button onClick={onClick} className={buttonClasses} disabled={loading}>
      {/* ボタンUI */}
    </button>
  );
}
```

### 2. カラーバリエーション
2つのカラーバリエーションを提供します。

**Black（デフォルト）**:
```typescript
color === 'black'
  ? 'bg-ink text-paper border-ink hover:bg-paper hover:text-ink'
  : 'bg-paper text-ink border-paper hover:bg-ink hover:text-paper'
```

### 3. ホバーアニメーション
ホバー時に下線と矢印のアニメーションを表示します。

```typescript
<span className="relative inline-block group-hover:underline">
  {text}
</span>
<span className="ml-2 inline-block transform transition-transform duration-300
  group-hover:translate-x-1">
  →
</span>
```

### 4. ローディング状態
`loading`プロップが`true`の場合、ボタンを無効化します。

```typescript
{loading ? (
  <span className="inline-block animate-spin">⏳</span>
) : (
  <>
    <span>{text}</span>
    <span className="ml-2">→</span>
  </>
)}
```

## 使用例

### リンクボタン
```typescript
<Btn
  text="ご予約はこちら"
  href="/#info"
  color="white"
/>
```

### アクションボタン
```typescript
<Btn
  text="送信する"
  onClick={handleSubmit}
  color="black"
  loading={isSubmitting}
/>
```

### デフォルトボタン
```typescript
<Btn text="詳しく見る" href="/about" />
```

## スタイル定義

### 基本クラス
```typescript
const baseClasses = `
  inline-flex
  items-center
  px-8
  py-3
  border-2
  rounded-full
  font-medium
  text-lg
  transition-all
  duration-300
  group
  hover:shadow-lg
`;
```

### カラークラス
```typescript
const colorClasses = color === 'black'
  ? 'bg-ink text-paper border-ink hover:bg-paper hover:text-ink'
  : 'bg-paper text-ink border-paper hover:bg-ink hover:text-paper';
```

### ローディングクラス
```typescript
const loadingClasses = loading ? 'opacity-50 cursor-not-allowed' : '';
```

## アニメーション

### ホバー時
1. **背景色反転**: `bg-ink` → `bg-paper`
2. **テキスト色反転**: `text-paper` → `text-ink`
3. **下線表示**: `group-hover:underline`
4. **矢印移動**: `group-hover:translate-x-1`
5. **影拡大**: `hover:shadow-lg`

### ローディング時
```css
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## アクセシビリティ

### ボタンの無効化
```typescript
<button disabled={loading}>
  {/* ボタンUI */}
</button>
```

### ローディング状態の視覚的フィードバック
```typescript
{loading && <span className="inline-block animate-spin">⏳</span>}
```

### セマンティックHTML
- リンク: `<Link>`（Next.js）
- ボタン: `<button>`

## パフォーマンス最適化

### 1. CSS Transitionsの使用
JavaScriptアニメーションではなく、CSS Transitionsを使用してパフォーマンスを最適化。

```css
transition-all duration-300
```

### 2. Next.js Linkコンポーネント
クライアント側ルーティングによる高速なページ遷移。

```typescript
import Link from 'next/link';
```

## 使用箇所

| コンポーネント | 用途 | 設定 |
|---|---|---|
| Hero | 予約ボタン | `href="/#info"`, `color="white"` |
| News | すべてのお知らせを見る | `href="/news"`, `color="black"` |
| ArticleContent | お知らせ一覧に戻る | `href="/news"`, `color="black"` |

## トラブルシューティング

### 問題: ボタンがクリックできない
**原因**: `loading`プロップが`true`

**確認**:
```typescript
console.log('loading:', loading);
```

### 問題: リンク遷移しない
**原因**: `href`プロップが設定されていない

**確認**:
```typescript
<Btn text="リンク" href="/page" /> {/* href必須 */}
```

### 問題: ホバーアニメーションが動作しない
**原因**: Tailwindの`group`クラスが適用されていない

**確認**:
```typescript
className="... group ..."
```

## カスタマイズ

### 新しいカラーバリエーションの追加
```typescript
interface BtnProps {
  color?: 'black' | 'white' | 'accent'; // 追加
}

const colorClasses = {
  black: 'bg-ink text-paper border-ink hover:bg-paper hover:text-ink',
  white: 'bg-paper text-ink border-paper hover:bg-ink hover:text-paper',
  accent: 'bg-accent text-white border-accent hover:bg-white hover:text-accent',
}[color || 'black'];
```

### サイズバリエーションの追加
```typescript
interface BtnProps {
  size?: 'sm' | 'md' | 'lg'; // 追加
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-8 py-3 text-lg',
  lg: 'px-12 py-4 text-xl',
}[size || 'md'];
```

### アイコンの追加
```typescript
interface BtnProps {
  icon?: React.ReactNode; // 追加
}

return (
  <Link href={href}>
    {icon && <span className="mr-2">{icon}</span>}
    <span>{text}</span>
    <span className="ml-2">→</span>
  </Link>
);
```

## 関連ドキュメント

- [Hero Component](../sections/hero.md)
- [News Component](../sections/news.md)
- [Animations](../../styling/animations.md)
- [Tailwind Configuration](../../styling/tailwind-config.md)
