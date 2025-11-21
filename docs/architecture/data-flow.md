# データフローと状態管理

## 概要

割烹神谷プロジェクトは、**グローバル状態管理ライブラリを使用しない**シンプルなデータフロー設計を採用しています。Next.js 16のServer ComponentsとCache Componentsを最大限活用し、必要最小限のクライアント側状態のみを管理します。

## データソース

### 1. 静的データ（`app/data/menu.ts`）
**メニュー情報の管理**

```typescript
// 型定義
export type MenuCategory = '懐石コース' | 'お祝い・法事コース' |
  '牛しゃぶ・ふぐ' | '逸品料理' | 'ランチ' | 'テイクアウト';

export interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: MenuCategory;
}

// データ
export const allMenuItems: MenuItem[] = [ /* 34件のメニュー */ ];
export const menuCategories: MenuCategory[] = [ /* 6カテゴリー */ ];
```

**データフロー**:
```
app/data/menu.ts
    ↓ import
app/components/Menu.tsx
    ↓ フィルタリング（activeCategory）
表示（カテゴリごと）
```

**特徴**:
- ビルド時に静的にバンドル
- 型安全性の確保
- バージョン管理下で管理

---

### 2. 動的データ（MicroCMS）
**ニュース・お知らせの管理**

#### 初期化（`libs/microcms.ts`）
```typescript
import { createClient } from 'microcms-js-sdk';

// 環境変数のバリデーション
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// クライアント作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});
```

**環境変数**:
- `MICROCMS_SERVICE_DOMAIN`: サービスドメイン（必須）
- `MICROCMS_API_KEY`: APIキー（必須、サーバー側のみ）

---

## データ取得パターン

### パターン1: トップページのニュース一覧
**場所**: `app/components/News.tsx`

```typescript
async function fetchNews() {
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: {
        fields: 'id,title,publishedAt,thumbnail',
        limit: 5, // 最新5件のみ
      },
    });
    return { posts: data.contents, error: null };
  } catch (error: any) {
    const apiError: ApiError = {
      message: error.message || '不明なエラー',
      status: getErrorStatus(error) || 500
    };
    return { posts: [], error: apiError };
  }
}
```

**データフロー**:
```
MicroCMS API
    ↓ client.get()
News.tsx（Server Component）
    ↓ エラーハンドリング
表示 or エラーメッセージ
```

---

### パターン2: ニュース一覧ページ
**場所**: `app/news/page.tsx`

```typescript
async function fetchAllNews() {
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: {
        fields: 'id,title,description,publishedAt,thumbnail,category',
        limit: 100, // 最大100件
      },
    });
    return data.contents;
  } catch (error) {
    console.error('microCMS APIエラー:', error);
    return [];
  }
}
```

**データフロー**:
```
MicroCMS API
    ↓ client.get()
page.tsx（Server Component）
    ↓ map()
カード表示（サムネイル、タイトル、説明）
```

---

### パターン3: ニュース詳細ページ（SSG）
**場所**: `app/news/[id]/page.tsx`

#### データ取得
```typescript
async function getBlogPost(id: string): Promise<Props | null> {
  try {
    const data = await client.get({
      endpoint: `news/${id}`,
    });
    return data;
  } catch (error) {
    console.error('microCMS APIエラー:', error);
    return null;
  }
}
```

#### 静的パス生成
```typescript
export async function generateStaticParams() {
  try {
    const contentIds = await client.getAllContentIds({ endpoint: 'news' });
    return contentIds.map((contentId) => ({ id: contentId }));
  } catch (error) {
    console.error('microCMS APIエラー (静的パス生成):', error);
    return [];
  }
}
```

**データフロー**:
```
【ビルド時】
MicroCMS API
    ↓ getAllContentIds()
generateStaticParams()
    ↓ 各IDごとにページ生成
静的HTML出力

【リクエスト時】
静的HTML
    ↓ Hydration
ArticleContent.tsx（Client Component）
    ↓ useEffect（画像処理）
記事表示
```

---

## エラーハンドリング戦略

### レベル1: ネットワークエラー
```typescript
try {
  const data = await client.get({ endpoint: 'news' });
  return { posts: data.contents, error: null };
} catch (error: any) {
  // エラーステータスを判定
  const status = getErrorStatus(error) || 500;
  return { posts: [], error: { message: error.message, status } };
}
```

### レベル2: ステータスコード別処理
**News.tsx**:
```typescript
// 500系エラー
if (error && error.status >= 500) {
  return <div>サービスがメンテナンス中です...</div>;
}

// 404エラー
if (error && error.status === 404) {
  notFound(); // Next.js 404ページへ
}
```

### レベル3: フォールバック表示
```typescript
// データが空の場合
if (posts.length === 0 && !error) {
  return <div>お知らせはまだありません。</div>;
}
```

---

## 状態管理パターン

### パターン1: サーバーコンポーネント（状態なし）
**例**: `News.tsx`、`Menu.tsx`（初期データ取得のみ）

```typescript
export default async function News() {
  const { posts, error } = await fetchNews();
  return <div>{/* レンダリング */}</div>;
}
```

**特徴**:
- サーバー側でデータ取得
- 状態管理不要
- SEO最適化

---

### パターン2: クライアントコンポーネント（useStateによるローカル状態）
**例**: `Header.tsx`、`Menu.tsx`（UI制御）

```typescript
'use client';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <header>{/* レンダリング */}</header>;
}
```

**管理する状態**:
- `isScrolled`: スクロール位置（UI変更）
- `isMenuOpen`: モバイルメニュー開閉
- `isHeroVisible`: Heroセクションの可視性
- `isMounted`: クライアント側マウント状態（Hydration対策）

---

### パターン3: カスタムイベントによる状態伝播
**例**: `PageTransition.tsx`

```typescript
// イベント発火
window.dispatchEvent(new CustomEvent('routeChangeStart', { detail: path }));

// イベント受信
window.addEventListener('routeChangeStart', (e) => {
  const customEvent = e as CustomEvent<string>;
  handleRouteChangeStart(customEvent.detail);
});
```

**用途**:
- ページ遷移の開始/完了通知
- コンポーネント間の疎結合な通信
- グローバル状態管理ライブラリの代替

---

## データキャッシング戦略

### 1. Next.js自動キャッシング
**Server Components**:
```typescript
// デフォルトでキャッシュされる
const data = await client.get({ endpoint: 'news' });
```

**revalidate設定**（必要に応じて）:
```typescript
export const revalidate = 3600; // 1時間ごとに再生成
```

### 2. 画像キャッシング
**next.config.ts**:
```typescript
images: {
  minimumCacheTTL: 60 * 60 * 24 * 7, // 7日間
}
```

### 3. 静的生成（SSG）
- `generateStaticParams()`でビルド時に全ページ生成
- デプロイ後は静的HTMLとして配信
- MicroCMS Webhook連携で自動再ビルド可能

---

## データ型定義

### ニュース記事
```typescript
export type Props = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  content: string; // リッチエディタHTML
  publishedAt: string;
  category?: { name: string };
  thumbnail: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  };
};
```

### エラー型
```typescript
type ApiError = {
  message: string;
  status: number;
};
```

---

## データフロー図

### トップページ
```
ユーザーリクエスト
    ↓
Next.js Server
    ├─ 静的データ読み込み（menu.ts）
    └─ MicroCMS API呼び出し（ニュース5件）
        ↓
Server Components レンダリング
    ├─ Hero
    ├─ Concept
    ├─ Menu（menu.ts使用）
    ├─ Info
    └─ News（MicroCMS使用）
        ↓
HTML生成
    ↓
クライアント（Hydration）
    ├─ PageTransition.tsx（GSAP初期化）
    ├─ Header.tsx（スクロールイベント登録）
    └─ Info.tsx（Google Maps遅延読み込み）
```

### ニュース詳細ページ
```
【ビルド時】
generateStaticParams()
    ↓ 全記事ID取得
各記事ページのHTML生成
    ↓
静的ファイル出力

【リクエスト時】
静的HTML配信
    ↓
クライアント（Hydration）
    ↓
ArticleContent.tsx
    ├─ 画像の動的処理（useEffect）
    └─ Intersection Observer設定
```

---

## ベストプラクティス

### 1. Server Componentsを優先
```typescript
// Good: サーバーコンポーネントでデータ取得
export default async function News() {
  const posts = await fetchNews();
  return <div>{posts.map(...)}</div>;
}

// Bad: クライアントコンポーネントでデータ取得
'use client';
export default function News() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { fetchNews().then(setPosts); }, []);
  return <div>{posts.map(...)}</div>;
}
```

### 2. エラーハンドリングの徹底
```typescript
// 必ずtry-catchでエラーをキャッチ
try {
  const data = await client.get({ endpoint: 'news' });
  return data.contents;
} catch (error) {
  console.error('APIエラー:', error);
  return []; // フォールバック値を返す
}
```

### 3. 型安全性の確保
```typescript
// 型定義を必ず作成
export interface MenuItem {
  id: number;
  title: string;
  // ...
}

// 型アサーションは最小限に
const items: MenuItem[] = data; // Good
const items = data as MenuItem[]; // 避けるべき
```

### 4. 環境変数のバリデーション
```typescript
// 起動時に環境変数をチェック
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}
```

---

## 関連ドキュメント

- [MicroCMS統合](../integrations/microcms/setup.md)
- [エラーハンドリング](../integrations/microcms/error-handling.md)
- [型定義リファレンス](../api-reference/type-definitions.md)
- [コンポーネント階層](./component-hierarchy.md)
