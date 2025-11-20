# News Component

## 概要

`app/components/News.tsx`は、トップページでニュース・お知らせの最新5件を表示するコンポーネントです。MicroCMS APIからデータを取得し、エラーハンドリングも実装しています。

## ファイル情報

- **パス**: `app/components/News.tsx`
- **行数**: 179行
- **コンポーネントタイプ**: Server Component（デフォルト）

## 主要機能

### 1. MicroCMSからデータ取得
最新5件のニュースをMicroCMS APIから取得します。

```typescript
async function fetchNews() {
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: {
        fields: 'id,title,publishedAt,thumbnail',
        limit: 5,
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

### 2. エラーハンドリング
ステータスコードに応じて異なるエラーメッセージを表示します。

```typescript
// 500系エラー
if (error && error.status >= 500) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600">
        サービスがメンテナンス中か、一時的にアクセスできません。
        <br />
        しばらく経ってから再度お試しください。
      </p>
    </div>
  );
}

// 404エラー
if (error && error.status === 404) {
  notFound(); // Next.js 404ページへ
}

// その他のエラー
if (error) {
  return (
    <div className="text-center py-12">
      <p className="text-red-600">
        エラーが発生しました: {error.message}
      </p>
    </div>
  );
}
```

### 3. 日付フォーマット
dayjsを使用して日付を`YY.MM.DD`形式で表示します。

```typescript
import dayjs from 'dayjs';

const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');
```

### 4. サムネイル画像表示
MicroCMSから取得したサムネイル画像を表示します。

```typescript
{post.thumbnail && (
  <div className="relative h-48 w-full mb-4">
    <Image
      src={post.thumbnail.url}
      alt={post.title}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover rounded"
      loading="lazy"
      decoding="async"
    />
  </div>
)}
```

### 5. 「すべてのお知らせを見る」ボタン
`Btn`コンポーネントを使用してニュース一覧ページへのリンクを表示します。

```typescript
<div className="text-center mt-12">
  <Btn text="すべてのお知らせを見る" href="/news" color="black" />
</div>
```

## 型定義

```typescript
type Props = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
};

type ApiError = {
  message: string;
  status: number;
};
```

## データフロー

```
MicroCMS API
    ↓ client.get()
fetchNews()
    ↓ エラーハンドリング
{ posts, error }
    ↓
News Component
    ├─ エラー表示（エラーがある場合）
    └─ ニュースカード表示（正常時）
```

## ニュースカード表示

```typescript
<Link
  href={`/news/${post.id}`}
  className="block bg-white rounded-lg shadow-md hover:shadow-xl
    transition-shadow duration-300 overflow-hidden"
>
  {/* サムネイル */}
  {post.thumbnail && (
    <div className="relative h-48 w-full">
      <Image src={post.thumbnail.url} ... />
    </div>
  )}

  {/* コンテンツ */}
  <div className="p-6">
    <time className="text-sm text-gray-500" dateTime={post.publishedAt}>
      {formattedDate}
    </time>
    <h3 className="text-xl font-bold mt-2 line-clamp-2">
      {post.title}
    </h3>
  </div>
</Link>
```

## レイアウト構造

```html
<section id="news" className="py-16 px-6 md:px-16 bg-white">
  <h2>お知らせ</h2>

  <!-- ニュースカードグリッド -->
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
    {posts.map((post) => (
      <Link key={post.id}>
        {/* ニュースカード */}
      </Link>
    ))}
  </div>

  <!-- 「すべてのお知らせを見る」ボタン -->
  <div className="text-center mt-12">
    <Btn ... />
  </div>
</section>
```

## レスポンシブデザイン

| 画面幅 | グリッドレイアウト |
|---|---|
| `< 768px` | 1カラム（縦並び） |
| `>= 768px` | 3カラム（横並び） |

## エラーステータス取得

```typescript
function getErrorStatus(error: any): number | null {
  if (error.response?.status) {
    return error.response.status;
  }
  if (error.status) {
    return error.status;
  }
  return null;
}
```

## パフォーマンス最適化

### 1. Server Componentでのデータ取得
サーバー側でデータ取得することで、クライアント側のバンドルサイズを削減します。

### 2. 画像遅延読み込み
```typescript
<Image
  loading="lazy"
  decoding="async"
/>
```

### 3. 必要なフィールドのみ取得
```typescript
queries: {
  fields: 'id,title,publishedAt,thumbnail', // 必要最小限
  limit: 5,
}
```

## アクセシビリティ

### セマンティックHTML
```html
<section id="news">
  <h2>お知らせ</h2>
  <time dateTime="2024-11-20">24.11.20</time>
</section>
```

### リンクの適切な説明
```typescript
<Link href={`/news/${post.id}`}>
  <h3>{post.title}</h3> {/* リンク先の内容を説明 */}
</Link>
```

## 使用例

### トップページでの使用
```typescript
// app/page.tsx
import News from './components/News';

export default function Home() {
  return (
    <main>
      {/* 他のセクション */}
      <News />
      {/* 他のセクション */}
    </main>
  );
}
```

## トラブルシューティング

### 問題: ニュースが表示されない
**原因**: MicroCMS APIエラーまたは環境変数未設定

**確認事項**:
1. 環境変数が正しく設定されているか
   ```bash
   echo $MICROCMS_API_KEY
   echo $MICROCMS_SERVICE_DOMAIN
   ```

2. MicroCMSの`news`エンドポイントが存在するか

3. エラーメッセージを確認
   ```typescript
   console.log('Error:', error);
   ```

### 問題: 画像が表示されない
**原因**: `next.config.ts`のリモートパターン設定

**確認**:
```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.microcms-assets.io',
      pathname: '/assets/**',
    },
  ],
}
```

### 問題: 日付フォーマットがおかしい
**原因**: dayjsのインポートまたはフォーマット指定

**確認**:
```typescript
import dayjs from 'dayjs';
const formatted = dayjs('2024-11-20').format('YY.MM.DD');
console.log(formatted); // "24.11.20"
```

## カスタマイズ

### 表示件数の変更
```typescript
queries: {
  fields: 'id,title,publishedAt,thumbnail',
  limit: 10, // 5 → 10に変更
}
```

### フィールドの追加
```typescript
queries: {
  fields: 'id,title,description,publishedAt,thumbnail,category',
  limit: 5,
}
```

### グリッドレイアウトの変更
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {/* 4カラムレイアウト */}
</div>
```

## 関連ドキュメント

- [MicroCMS Integration](../../integrations/microcms/setup.md)
- [Error Handling](../../integrations/microcms/error-handling.md)
- [Btn Component](../common/btn.md)
- [Image Optimization](../../performance/image-optimization.md)
