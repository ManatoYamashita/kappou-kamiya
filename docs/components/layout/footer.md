# Footer Component

## 概要

`app/components/Footer.tsx`は、アプリケーション全体で使用されるグローバルフッターコンポーネントです。店舗情報、営業時間、サイト内リンク、コピーライトを表示します。

## ファイル情報

- **パス**: `app/components/Footer.tsx`
- **行数**: 89行
- **コンポーネントタイプ**: Server Component（デフォルト）

## 主要機能

### 1. 店舗情報表示
セマンティックHTML（`<address>`タグ）を使用して店舗情報を表示します。

```typescript
<address className="not-italic">
  <p className="text-sm">埼玉県川口市市栄町1-1-1</p>
  <p className="text-sm mt-1">
    <a href="tel:0482565551" className="hover:text-accent transition-colors">
      TEL: 048-256-5551
    </a>
  </p>
</address>
```

### 2. 営業時間表示
```typescript
<div>
  <h3 className="font-bold mb-2">営業時間</h3>
  <p className="text-sm">ランチ: 11:30 - 14:00</p>
  <p className="text-sm">ディナー: 17:00 - 22:00</p>
  <p className="text-sm mt-2 text-gray-600">定休日: 日曜日</p>
</div>
```

### 3. サイト内リンク
```typescript
<nav>
  <h3 className="font-bold mb-2">サイトマップ</h3>
  <ul className="space-y-1 text-sm">
    <li><Link href="/">トップ</Link></li>
    <li><Link href="/#concept">店舗理念</Link></li>
    <li><Link href="/#menu">お品書き</Link></li>
    <li><Link href="/news">お知らせ</Link></li>
    <li><Link href="/#info">店舗情報</Link></li>
  </ul>
</nav>
```

### 4. ロゴ動画表示
Header同様、Hydration対策を実装しています。

```typescript
'use client';

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

return (
  {isMounted ? (
    <video muted loop playsInline>
      <source src="/images/kamiya-logo.webm" type="video/webm" />
    </video>
  ) : (
    <Image src="/images/kamiya-logo.webp" ... />
  )}
);
```

### 5. コピーライト表示
動的に現在の年を取得して表示します。

```typescript
<p className="text-center text-sm text-gray-600">
  © {new Date().getFullYear()} 割烹 神谷 All Rights Reserved.
</p>
```

## レイアウト構造

```html
<footer className="bg-ink text-paper py-12 mt-auto">
  <div className="container mx-auto px-6 md:px-16">
    <!-- ロゴ -->
    <div className="mb-8">
      {/* ロゴ動画/画像 */}
    </div>

    <!-- 3カラムレイアウト -->
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <!-- 店舗情報 -->
      <div>{/* address */}</div>

      <!-- 営業時間 -->
      <div>{/* 営業時間 */}</div>

      <!-- サイトマップ -->
      <nav>{/* リンク */}</nav>
    </div>

    <!-- 区切り線 -->
    <div className="border-t border-paper/20 pt-6">
      <!-- コピーライト -->
      <p>{/* © ... */}</p>
    </div>
  </div>
</footer>
```

## レスポンシブデザイン

| 画面幅 | レイアウト |
|---|---|
| `< 768px` | 1カラム（縦並び） |
| `>= 768px` | 3カラム（横並び） |

## スタイリング

### 背景色
```typescript
className="bg-ink text-paper"
```

- `bg-ink`: ダークカラー（#1a1a1a）
- `text-paper`: ライトカラー（#f8f6f1）

### ホバーエフェクト
```typescript
<Link className="hover:text-accent transition-colors">
  お知らせ
</Link>
```

## アクセシビリティ

### セマンティックHTML
```html
<footer>
  <address>{/* 店舗情報 */}</address>
  <nav>{/* サイトマップ */}</nav>
</footer>
```

### リンクのアクセシビリティ
```typescript
<a href="tel:0482565551">TEL: 048-256-5551</a>
```

電話番号を`tel:`スキームでリンク化し、モバイルでワンタップで発信可能にしています。

## 使用例

### 各ページでの使用
```typescript
// app/page.tsx
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      {/* コンテンツ */}
      <Footer />
    </main>
  );
}
```

### ルートレイアウトでの使用（代替案）
```typescript
// app/layout.tsx
import Footer from './components/Footer';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer /> {/* すべてのページで表示 */}
      </body>
    </html>
  );
}
```

## トラブルシューティング

### 問題: フッターがページ下部に固定されない
**原因**: 親要素の高さが不足

**解決策**:
```css
/* globals.css */
html, body {
  min-height: 100vh;
}

#__next {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  margin-top: auto;
}
```

### 問題: 動画が再生されない
**原因**: `isMounted`フラグの問題

**確認**:
```typescript
console.log('isMounted:', isMounted);
```

## 関連ドキュメント

- [Header Component](./header.md)
- [Layout Structure](../../architecture/component-hierarchy.md)
- [Responsive Design](../../styling/responsive-design.md)
