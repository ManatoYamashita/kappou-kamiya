# PageTransition Component

## 概要

`app/components/PageTransition.tsx`は、GSAPを使用してページ遷移アニメーションを制御するコンポーネントです。カスタムイベントとスクロール制御を組み合わせ、スムーズなページ遷移体験を提供します。

## ファイル情報

- **パス**: `app/components/PageTransition.tsx`
- **行数**: 168行
- **コンポーネントタイプ**: Client Component (`'use client'`)
- **依存ライブラリ**: GSAP 3.12.7

## 主要機能

### 1. GSAPオーバーレイアニメーション
ページ遷移時に半透明のオーバーレイをアニメーションさせます。

**進入アニメーション**（ページ離脱時）:
```typescript
gsap.to(overlayRef.current, {
  y: '0%',           // 上から下へ
  duration: 0.5,
  ease: 'power3.inOut'
});
```

**退出アニメーション**（ページ表示時）:
```typescript
gsap.to(overlayRef.current, {
  y: '-100%',        // 下から上へ
  duration: 0.5,
  ease: 'power3.out'
});
```

### 2. カスタムイベントによる制御
ページ遷移のタイミングをカスタムイベントで管理します。

**イベント定義**:
- `routeChangeStart`: ページ遷移開始
- `routeChangeComplete`: ページ遷移完了

**イベント発火**:
```typescript
window.dispatchEvent(new CustomEvent('routeChangeStart', { detail: path }));
```

**イベント受信**:
```typescript
window.addEventListener('routeChangeStart', (e: Event) => {
  const customEvent = e as CustomEvent<string>;
  handleRouteChangeStart(customEvent.detail);
});
```

### 3. スクロール禁止制御
アニメーション中はスクロールを禁止します。

**スクロール禁止**:
```typescript
document.documentElement.classList.add('is-changing');
```

**CSS定義**（`globals.css`）:
```css
html.is-changing {
  overflow: hidden;
}
```

**スクロール許可**:
```typescript
document.documentElement.classList.remove('is-changing');
```

### 4. ルートパス遷移のスキップ
トップページへの遷移時はアニメーションをスキップします。

```typescript
const isRootPath = (path: string) => path === '/';

if (path && isRootPath(path)) {
  // アニメーションスキップ
  return;
}
```

### 5. セーフティタイマー
スクロール禁止が長時間続く場合の対策として、5秒後に強制解除します。

```typescript
const safetyTimer = setTimeout(() => {
  document.documentElement.classList.remove('is-changing');
}, 5000);
```

## 状態管理

```typescript
const overlayRef = useRef<HTMLDivElement>(null);  // オーバーレイ要素の参照
const isAnimatingRef = useRef(false);             // アニメーション中フラグ
```

## イベントフロー

```
ユーザーがリンククリック
    ↓
handleLinkClick()
    ↓
routeChangeStart イベント発火
    ↓
handleRouteChangeStart()
    ├─ スクロール禁止（is-changing追加）
    └─ 進入アニメーション（y: 0%）
        ↓
router.push()（600ms遅延）
    ↓
ページ遷移
    ↓
routeChangeComplete イベント発火
    ↓
handleRouteChangeComplete()
    ├─ 200ms遅延（新ページ読み込み待機）
    └─ 退出アニメーション（y: -100%）
        ↓
onComplete()
    └─ スクロール許可（is-changing削除）
```

## リンククリック処理

### 通常のページ遷移
```typescript
const handleLinkClick = (e: MouseEvent) => {
  const anchor = target.closest('a');

  if (
    anchor &&
    anchor.href.startsWith(window.location.origin) &&
    !anchor.hasAttribute('target') &&
    !(e.metaKey || e.ctrlKey)
  ) {
    e.preventDefault();

    const path = new URL(anchor.href).pathname;
    window.dispatchEvent(new CustomEvent('routeChangeStart', { detail: path }));

    setTimeout(() => {
      router.push(path);
    }, 600); // アニメーション時間と同期
  }
};
```

### ハッシュリンク（同一ページ内）
```typescript
const hash = new URL(anchor.href).hash;

// 同じパスでハッシュリンクの場合は通常動作を許可
if (path === pathname && hash) {
  return; // アニメーションなしでスクロール
}
```

### 外部リンク・新規タブ
```typescript
if (
  anchor.hasAttribute('target') || // target="_blank"
  e.metaKey || e.ctrlKey ||        // Cmd/Ctrl+クリック
  !anchor.href.startsWith(window.location.origin) // 外部リンク
) {
  // デフォルト動作（アニメーションなし）
}
```

## ページ読み込み時の初期化

```typescript
useEffect(() => {
  // オーバーレイを初期位置に設定（画面外上部）
  if (overlayRef.current) {
    gsap.set(overlayRef.current, { y: '-100%' });
  }

  // セーフティタイマー
  const safetyTimer = setTimeout(() => {
    document.documentElement.classList.remove('is-changing');
  }, 5000);

  return () => {
    clearTimeout(safetyTimer);
    document.documentElement.classList.remove('is-changing');
  };
}, []);
```

## オーバーレイ要素

```typescript
<div
  ref={overlayRef}
  className="fixed inset-0 z-50 bg-paper transform -translate-y-full pointer-events-none"
  aria-hidden="true"
/>
```

**スタイル解説**:
- `fixed inset-0`: 全画面固定
- `z-50`: 最前面表示（他のコンテンツの上）
- `bg-paper`: 和紙風背景色（`#f8f6f1`）
- `transform -translate-y-full`: 初期位置（画面外上部）
- `pointer-events-none`: マウスイベント無効化
- `aria-hidden="true"`: スクリーンリーダーから隠す

## パフォーマンス最適化

### 1. アニメーション中フラグ
重複アニメーションを防止します。

```typescript
if (isAnimatingRef.current) return;
isAnimatingRef.current = true;
```

### 2. イベントリスナーのクリーンアップ
```typescript
return () => {
  window.removeEventListener('routeChangeStart', onRouteChangeStart);
  window.removeEventListener('routeChangeComplete', onRouteChangeComplete);
  clearTimeout(safetyTimer);
  document.documentElement.classList.remove('is-changing');
};
```

### 3. GSAP設定の最適化
```typescript
// 初期位置設定（レンダリング前）
gsap.set(overlayRef.current, { y: '-100%' });

// アニメーション実行（60fps）
gsap.to(overlayRef.current, { /* ... */ });
```

## トラブルシューティング

### 問題1: スクロール禁止が解除されない
**原因**: アニメーション完了コールバックが実行されない

**解決策**:
1. セーフティタイマー（5秒）が自動的に解除
2. ページアンマウント時にクリーンアップで解除
3. ページロード完了時に解除（`layout.tsx`のスクリプト）

**デバッグ方法**:
```typescript
console.log('is-changing:', document.documentElement.classList.contains('is-changing'));
```

### 問題2: ページ遷移が遅い
**原因**: アニメーション時間（600ms）が長い

**解決策**:
`duration`と`setTimeout`の時間を短縮（例: 400ms）

```typescript
gsap.to(overlayRef.current, {
  y: '0%',
  duration: 0.4, // 600ms → 400ms
  ease: 'power3.inOut'
});

setTimeout(() => {
  router.push(path);
}, 400); // 600ms → 400ms
```

### 問題3: ルートパス遷移でアニメーションが実行される
**原因**: `isRootPath()`チェックが機能していない

**確認事項**:
```typescript
console.log('path:', path, 'isRoot:', isRootPath(path));
```

## 使用例

### ルートレイアウトでの使用
```typescript
// app/layout.tsx
import PageTransition from './components/PageTransition';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <PageTransition />
        <PageContent>{children}</PageContent>
      </body>
    </html>
  );
}
```

### カスタムリンクでの使用
通常の`<Link>`コンポーネントは自動的に対応。

## 関連ドキュメント

- [PageContent Component](./page-content.md)
- [GSAP Animation](../../styling/animations.md)
- [Troubleshooting: Page Transition Issues](../../troubleshooting/page-transition-issues.md)
- [Global Styles](../../styling/global-styles.md)
