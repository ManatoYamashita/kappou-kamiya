# Header Component

## 概要

`app/components/Header.tsx`は、アプリケーション全体で使用されるグローバルヘッダーコンポーネントです。スクロール位置に応じて動的に変化し、レスポンシブデザインに対応したナビゲーションを提供します。

## ファイル情報

- **パス**: `app/components/Header.tsx`
- **行数**: 169行
- **コンポーネントタイプ**: Client Component (`'use client'`)

## 主要機能

### 1. スクロール連動背景色変更
スクロール位置が50px以上になると、背景色が半透明白に変化します。

```typescript
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**スタイル変化**:
- スクロール前: `bg-transparent`（透明）
- スクロール後: `bg-white/90 backdrop-blur-md shadow-md`（半透明白+影）

### 2. Hero表示時の自動非表示
トップページでHeroセクションが表示されている間、ヘッダーを非表示にします。

```typescript
useEffect(() => {
  const heroSection = document.getElementById('hero-section');
  if (!heroSection) {
    setIsHeroVisible(false);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      setIsHeroVisible(entries[0].isIntersecting);
    },
    { threshold: 0.1 }
  );

  observer.observe(heroSection);
  return () => observer.disconnect();
}, []);
```

**表示条件**:
```typescript
className={`${!isHeroVisible ? 'translate-y-0' : '-translate-y-full'}`}
```

### 3. モバイルハンバーガーメニュー
768px以下の画面幅でハンバーガーメニューを表示します。

**ボタン**:
```typescript
<button
  className="md:hidden z-50 relative"
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
>
  <div className="space-y-2">
    <span className={`block w-8 h-0.5 bg-ink transition-transform ${
      isMenuOpen ? 'rotate-45 translate-y-2.5' : ''
    }`} />
    {/* 他のバー */}
  </div>
</button>
```

**モバイルメニュー**:
```typescript
<nav className={`md:hidden fixed inset-0 bg-paper z-40 flex items-center justify-center
  transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
  <ul className="flex flex-col items-center space-y-8 text-2xl">
    {/* メニューアイテム */}
  </ul>
</nav>
```

### 4. ロゴ動画の遅延読み込み
Hydrationエラーを防ぐため、クライアントサイドでマウント後に動画を読み込みます。

```typescript
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

return (
  {isMounted ? (
    <video ref={videoRef} muted loop playsInline className="w-32 h-auto">
      <source src="/images/kamiya-logo.webm" type="video/webm" />
    </video>
  ) : (
    <Image src="/images/kamiya-logo.webp" alt="割烹 神谷" width={128} height={128} />
  )}
);
```

## 状態管理

```typescript
const [isScrolled, setIsScrolled] = useState(false);      // スクロール位置
const [isMenuOpen, setIsMenuOpen] = useState(false);      // モバイルメニュー開閉
const [isHeroVisible, setIsHeroVisible] = useState(true); // Hero表示状態
const [isMounted, setIsMounted] = useState(false);        // マウント状態
const videoRef = useRef<HTMLVideoElement>(null);          // 動画参照
```

## ナビゲーション構造

### デスクトップナビゲーション
```typescript
<nav className="hidden md:flex space-x-8">
  <Link href="/#concept">店舗理念</Link>
  <Link href="/#menu">お品書き</Link>
  <Link href="/news">お知らせ</Link>
  <Link href="/#info">店舗情報</Link>
</nav>
```

### モバイルナビゲーション
同じリンクを縦並びで表示し、メニュー開閉時にスライドアニメーション。

## レスポンシブデザイン

| ブレークポイント | 表示内容 |
|---|---|
| `< 768px` | ハンバーガーメニュー + モバイルナビ |
| `>= 768px` | ロゴ + デスクトップナビ |

## アクセシビリティ

### ARIA属性
```typescript
<button aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}>
```

### キーボードナビゲーション
```typescript
<Link tabIndex={0}>店舗理念</Link>
```

### セマンティックHTML
```html
<header>
  <nav>
    <ul>
      <li><Link /></li>
    </ul>
  </nav>
</header>
```

## パフォーマンス最適化

### 1. 動画の自動再生
```typescript
useEffect(() => {
  if (videoRef.current && isMounted) {
    videoRef.current.play().catch((error) => {
      console.log('動画の自動再生がブロックされました:', error);
    });
  }
}, [isMounted]);
```

### 2. Intersection Observerの適切なクリーンアップ
```typescript
return () => observer.disconnect();
```

### 3. イベントリスナーのクリーンアップ
```typescript
return () => window.removeEventListener('scroll', handleScroll);
```

## 使用例

### ルートレイアウトでの使用
```typescript
// app/layout.tsx
import Header from './components/Header';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
```

## トラブルシューティング

### 問題: ヘッダーが表示されない
**原因**: Hero表示時に自動非表示になっている
**解決策**: スクロールダウンしてHeroセクションを画面外に移動

### 問題: 動画が再生されない
**原因**: ブラウザの自動再生ポリシーによるブロック
**解決策**: `muted`属性とエラーハンドリングが実装済み（正常動作）

### 問題: モバイルメニューが閉じない
**原因**: ページ遷移時に状態がリセットされない
**解決策**: リンククリック時に`setIsMenuOpen(false)`を呼び出す

```typescript
<Link href="/news" onClick={() => setIsMenuOpen(false)}>
  お知らせ
</Link>
```

## 関連ドキュメント

- [Footer Component](./footer.md)
- [PageTransition Component](./page-transition.md)
- [コンポーネント階層](../../architecture/component-hierarchy.md)
- [レスポンシブデザイン戦略](../../styling/responsive-design.md)
