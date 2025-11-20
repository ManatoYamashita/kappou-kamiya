# コンポーネント階層

## 概要

割烹神谷プロジェクトのコンポーネント構造は、**Next.js App Routerの規約**に従い、階層的かつモジュール化された設計になっています。Server ComponentsとClient Componentsを適切に使い分け、パフォーマンスとユーザー体験を両立しています。

## コンポーネント階層図

### ルートレイアウト階層

```
app/layout.tsx（Root Layout - Server Component）
├── <html>
│   ├── <head>
│   │   ├── フォント読み込み（Noto Sans JP, Shippori Mincho）
│   │   ├── JSON-LD構造化データ
│   │   ├── Google Analytics
│   │   ├── Consent Manager
│   │   └── スクロール修正スクリプト
│   └── <body>
│       ├── スキップリンク（a11y対応）
│       ├── Header（Client Component）
│       ├── PageTransition（Client Component）
│       ├── PageContent（Client Component）
│       │   └── {children}（各ページ）
│       └── （Footerは各ページ内）
```

---

## ページ階層

### トップページ（`app/page.tsx`）

```
page.tsx（Server Component）
├── Hero（Server Component）
│   ├── ロゴ動画（条件付きレンダリング）
│   ├── 背景画像（Next Image）
│   ├── ナビゲーションリンク
│   └── Btn（予約ボタン）
├── Concept（Client Component - Intersection Observer）
│   ├── 背景画像（2箇所）
│   ├── テキストコンテンツ
│   └── こだわりカード（2枚）
├── Menu（Client Component - UI制御）
│   ├── カテゴリーフィルターボタン（6つ）
│   ├── メニューカードリスト
│   │   └── MenuItem
│   │       ├── 画像（Next Image）
│   │       ├── タイトル
│   │       ├── 説明
│   │       └── 価格
│   └── スクロールインジケーター
├── Info（Client Component - Google Maps遅延読み込み）
│   ├── 店舗情報セクション
│   │   ├── Google Maps iframe
│   │   └── アクセス情報
│   └── アクセス詳細セクション
│       ├── 電車での行き方
│       └── 車での行き方
├── News（Server Component - MicroCMS）
│   ├── ニュースカードリスト
│   │   └── NewsCard
│   │       ├── サムネイル（Next Image）
│   │       ├── タイトル
│   │       └── 公開日
│   └── Btn（すべてのお知らせを見る）
└── Footer（Server Component）
    ├── ロゴ動画
    ├── 店舗住所・電話
    ├── 営業時間
    ├── サイト内リンク
    └── コピーライト
```

---

### ニュース一覧ページ（`app/news/page.tsx`）

```
page.tsx（Server Component）
├── Header（グローバル - layout.tsx）
├── パンくずリスト
├── ページタイトル
├── ニュースカードグリッド
│   └── NewsCard（複数）
│       ├── 画像（Next Image）
│       ├── カテゴリータグ
│       ├── タイトル
│       ├── 説明
│       ├── 公開日（縦書き）
│       └── リンク（記事詳細へ）
├── ページネーションUI（プレースホルダー）
└── Footer（グローバル）
```

---

### ニュース詳細ページ（`app/news/[id]/page.tsx`）

```
page.tsx（Server Component）
├── Header（グローバル - layout.tsx）
└── ArticleContent（Client Component - 画像処理）
    ├── パンくずリスト
    ├── 記事ヘッダー
    │   ├── カテゴリータグ
    │   ├── タイトル（h1）
    │   └── 公開日
    ├── サムネイル画像（Next Image）
    ├── 記事本文
    │   └── HTMLコンテンツ（dangerouslySetInnerHTML）
    │       ├── 見出し（h1-h6）
    │       ├── 段落（p）
    │       ├── リスト（ul, ol）
    │       ├── 画像（Intersection Observer処理）
    │       ├── 引用（blockquote）
    │       └── コード（code, pre）
    ├── 記事フッター
    │   └── 最終更新日
    └── Btn（お知らせ一覧に戻る）
```

---

## コンポーネント分類

### レイアウトコンポーネント

#### 1. Header.tsx（Client Component）
**責務**: グローバルナビゲーション

**主要機能**:
- スクロール位置検知（50px以上で背景色変更）
- Hero表示時の自動非表示（トップページのみ）
- モバイルハンバーガーメニュー
- ロゴ動画の条件付きレンダリング

**状態**:
```typescript
const [isScrolled, setIsScrolled] = useState(false);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isHeroVisible, setIsHeroVisible] = useState(true);
const [isMounted, setIsMounted] = useState(false);
```

**レンダリング条件**:
- サーバー: ロゴ静止画
- クライアント: ロゴ動画

---

#### 2. Footer.tsx（Server Component）
**責務**: グローバルフッター

**主要機能**:
- 店舗情報表示（住所、電話、営業時間）
- サイト内リンク
- コピーライト表示

**特徴**:
- 状態管理不要（静的コンテンツのみ）
- ロゴ動画はHeader同様に条件付きレンダリング

---

#### 3. PageTransition.tsx（Client Component）
**責務**: ページ遷移アニメーション制御

**主要機能**:
- GSAPによるオーバーレイアニメーション
- カスタムイベント（`routeChangeStart`/`routeChangeComplete`）
- スクロール禁止制御（`is-changing`クラス）
- セーフティタイマー（5秒後強制解除）

**状態**:
```typescript
const overlayRef = useRef<HTMLDivElement>(null);
const isAnimatingRef = useRef(false);
```

**イベントフロー**:
```
リンククリック
    ↓
routeChangeStart イベント発火
    ↓
進入アニメーション（y: 0%）
    ↓
ルーター遷移
    ↓
routeChangeComplete イベント発火
    ↓
退出アニメーション（y: -100%）
    ↓
スクロール禁止解除
```

---

#### 4. PageContent.tsx（Client Component）
**責務**: ページコンテンツのラッパー

**主要機能**:
- フェードインアニメーション
- ルートパス即座表示
- セーフティタイマー（2秒後強制表示）

**アニメーション設定**:
```typescript
gsap.to(contentRef.current, {
  opacity: 1,
  scale: 1,
  y: 0,
  duration: 1,
  delay: 1,
  ease: 'power2.out'
});
```

---

### セクションコンポーネント

#### 5. Hero.tsx（Server Component）
**責務**: ファーストビュー

**主要機能**:
- ロゴ動画の自動再生
- 背景画像の優先読み込み
- ナビゲーションリンク（4つ）
- 予約ボタン

**レスポンシブレイアウト**:
- モバイル: 縦並び
- デスクトップ: ロゴを中央、ナビを両サイド

**アニメーション**:
- `globals.css`のキーフレームアニメーション
- 遅延アニメーション（各要素にanimation-delay）

---

#### 6. Concept.tsx（Client Component）
**責務**: 店舗理念・こだわり紹介

**主要機能**:
- Intersection Observerによるスクロールアニメーション
- 背景画像とテキストの2カラムレイアウト
- こだわりカード（2枚）

**状態**:
```typescript
// 状態管理なし（Intersection Observerのみ）
```

**アニメーション**:
- `.animate-on-scroll`クラス: 初期非表示
- `.fade-in`クラス追加: 表示（`globals.css`）

---

#### 7. Menu.tsx（Client Component）
**責務**: メニュー表示

**主要機能**:
- カテゴリーフィルタリング（6カテゴリー）
- 水平スクロール表示
- スクロールインジケーター
- レスポンシブボタンレイアウト

**状態**:
```typescript
const [activeCategory, setActiveCategory] = useState<MenuCategory>('懐石コース');
const [isChanging, setIsChanging] = useState(false);
const [canScrollRight, setCanScrollRight] = useState(false);
const [useCompactButtons, setUseCompactButtons] = useState(false);
```

**データフロー**:
```
app/data/menu.ts
    ↓ import
allMenuItems.filter(category === activeCategory)
    ↓ map
MenuCard表示
```

---

#### 8. Info.tsx（Client Component）
**責務**: 店舗情報・アクセス

**主要機能**:
- Google Maps遅延読み込み（Intersection Observer）
- 電車・車での行き方表示
- ローディングプレースホルダー

**状態**:
```typescript
const [mapLoaded, setMapLoaded] = useState(false);
```

**遅延読み込み**:
```typescript
const mapObserver = new IntersectionObserver(
  (entries) => {
    if (entry.isIntersecting && !mapLoaded) {
      setMapLoaded(true); // iframe表示
    }
  },
  { rootMargin: '200px 0px' } // 200px手前で読み込み
);
```

---

#### 9. News.tsx（Server Component）
**責務**: ニュース一覧（トップページ）

**主要機能**:
- MicroCMSから最新5件取得
- エラーハンドリング（500系/404系）
- サムネイル画像表示

**データ取得**:
```typescript
async function fetchNews() {
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: { fields: 'id,title,publishedAt,thumbnail', limit: 5 }
    });
    return { posts: data.contents, error: null };
  } catch (error) {
    return { posts: [], error: { message, status } };
  }
}
```

**エラー表示**:
- 500系: メンテナンス中メッセージ
- 404: `notFound()`
- その他: エラーメッセージ

---

#### 10. ArticleContent.tsx（Client Component）
**責務**: 記事コンテンツ表示

**主要機能**:
- リッチエディタHTML表示
- 画像の動的処理（Intersection Observer）
- パンくずリスト
- 記事メタデータ表示

**画像処理**:
```typescript
useEffect(() => {
  const images = contentRef.current.querySelectorAll('img');
  images.forEach((img) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'image-wrapper';
    // 画像をラップ
  });
}, [post.content]);
```

**スタイル定義**:
- インラインCSS（`contentStyles`変数、123行）
- 見出し、段落、リスト、引用のスタイル

---

### 共通コンポーネント

#### 11. Btn.tsx（Server/Client Component）
**責務**: 汎用ボタン

**主要機能**:
- Link/buttonの自動切り替え（`href`有無）
- ローディング状態
- 色バリエーション（black/white）
- ホバーアニメーション

**Props**:
```typescript
interface BtnProps {
  text: string;
  href?: string;
  onClick?: () => void;
  color?: 'black' | 'white';
  loading?: boolean;
}
```

**レンダリング**:
```typescript
if (href) {
  return <Link href={href}>{/* ボタンUI */}</Link>;
} else {
  return <button onClick={onClick}>{/* ボタンUI */}</button>;
}
```

---

## Server vs Client Components

### Server Components（デフォルト）
**使用箇所**:
- `layout.tsx`
- `page.tsx`（すべて）
- `Hero.tsx`
- `Footer.tsx`
- `News.tsx`

**特徴**:
- サーバー側でレンダリング
- データ取得が可能
- バンドルサイズに含まれない
- インタラクティブな機能なし

---

### Client Components（`'use client'`）
**使用箇所**:
- `Header.tsx`
- `PageTransition.tsx`
- `PageContent.tsx`
- `Concept.tsx`
- `Menu.tsx`
- `Info.tsx`
- `ArticleContent.tsx`

**特徴**:
- クライアント側でレンダリング
- useState/useEffect使用可能
- インタラクティブな機能実装
- バンドルサイズに影響

**使用理由**:
- **Header**: スクロールイベント、メニュー開閉
- **PageTransition**: GSAPアニメーション、カスタムイベント
- **Concept**: Intersection Observer
- **Menu**: カテゴリーフィルター、スクロール検知
- **Info**: Google Maps遅延読み込み
- **ArticleContent**: 画像動的処理

---

## コンポーネント再利用戦略

### 1. Btnコンポーネント
**使用箇所**:
- Hero（予約ボタン）
- News（すべてのお知らせを見る）
- ArticleContent（お知らせ一覧に戻る）

### 2. ロゴ動画の条件付きレンダリング
**使用箇所**:
- Header
- Hero
- Footer

**実装パターン**:
```typescript
{isMounted ? (
  <video muted loop playsInline>
    <source src="/images/kamiya-logo.webm" type="video/webm" />
  </video>
) : (
  <Image src="/images/kamiya-logo.webp" ... />
)}
```

---

## コンポーネント設計のベストプラクティス

### 1. 単一責任原則
各コンポーネントは1つの責務のみを持つ。

### 2. Server Components優先
インタラクティブ機能が不要な場合はServer Componentを使用。

### 3. Propsの型定義
すべてのPropsに型定義を付与。

### 4. 条件付きレンダリング
Hydrationエラーを防ぐため、`isMounted`フラグを使用。

### 5. エラーハンドリング
データ取得コンポーネントは必ずエラーハンドリングを実装。

---

## 関連ドキュメント

- [データフロー](./data-flow.md)
- [Header詳細](../components/layout/header.md)
- [PageTransition詳細](../components/layout/page-transition.md)
- [Menu詳細](../components/sections/menu.md)
