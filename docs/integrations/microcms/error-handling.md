# MicroCMS Error Handling

## 概要

MicroCMS APIとの統合において、適切なエラーハンドリングはユーザー体験とアプリケーションの安定性に不可欠です。このドキュメントでは、エラーハンドリングのベストプラクティスと実装方法を説明します。

## エラーの種類

### 1. ネットワークエラー
**原因**:
- インターネット接続の問題
- MicroCMSサーバーのダウン
- タイムアウト

**ステータスコード**: なし（`error.response`が存在しない）

### 2. 認証エラー
**原因**:
- APIキーが間違っている
- APIキーが無効化されている

**ステータスコード**: `401 Unauthorized`

### 3. リソース不在エラー
**原因**:
- 指定されたエンドポイントが存在しない
- 指定されたコンテンツIDが存在しない

**ステータスコード**: `404 Not Found`

### 4. サーバーエラー
**原因**:
- MicroCMSサーバーの内部エラー
- メンテナンス中

**ステータスコード**: `500 Internal Server Error`, `503 Service Unavailable`

### 5. レート制限エラー
**原因**:
- API呼び出し回数が制限を超えた

**ステータスコード**: `429 Too Many Requests`

## エラーハンドリングパターン

### パターン1: 基本的なtry-catch

```typescript
import { client } from '@/libs/microcms';

async function fetchNews() {
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: { limit: 5 },
    });
    return { posts: data.contents, error: null };
  } catch (error: any) {
    console.error('MicroCMS APIエラー:', error);
    return { posts: [], error: { message: error.message } };
  }
}
```

### パターン2: ステータスコード別処理

```typescript
type ApiError = {
  message: string;
  status: number;
};

function getErrorStatus(error: any): number | null {
  // APIエラーレスポンスからステータスコードを取得
  if (error.response?.status) {
    return error.response.status;
  }
  if (error.status) {
    return error.status;
  }
  return null;
}

async function fetchNewsWithErrorHandling() {
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: { limit: 5 },
    });
    return { posts: data.contents, error: null };
  } catch (error: any) {
    const apiError: ApiError = {
      message: error.message || '不明なエラー',
      status: getErrorStatus(error) || 500,
    };
    console.error(`MicroCMS APIエラー [${apiError.status}]:`, apiError.message);
    return { posts: [], error: apiError };
  }
}
```

### パターン3: リトライロジック

```typescript
async function fetchWithRetry<T>(
  fetcher: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetcher();
    } catch (error: any) {
      lastError = error;
      const status = getErrorStatus(error);

      // リトライすべきでないエラー（401, 404）
      if (status === 401 || status === 404) {
        throw error;
      }

      // 最後の試行でない場合は待機
      if (i < maxRetries - 1) {
        console.log(`リトライ ${i + 1}/${maxRetries}...`);
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError!;
}

// 使用例
const data = await fetchWithRetry(() =>
  client.get({ endpoint: 'news', queries: { limit: 5 } })
);
```

## UIでのエラー表示

### News.tsx のエラーハンドリング

```typescript
export default async function News() {
  const { posts, error } = await fetchNews();

  // 500系エラー
  if (error && error.status >= 500) {
    return (
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">お知らせ</h2>
          <p className="text-gray-600">
            サービスがメンテナンス中か、一時的にアクセスできません。
            <br />
            しばらく経ってから再度お試しください。
          </p>
        </div>
      </section>
    );
  }

  // 404エラー
  if (error && error.status === 404) {
    notFound(); // Next.js 404ページへ
  }

  // その他のエラー
  if (error) {
    return (
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">お知らせ</h2>
          <p className="text-red-600">
            エラーが発生しました: {error.message}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            問題が続く場合は、お手数ですが店舗までお問い合わせください。
          </p>
        </div>
      </section>
    );
  }

  // データが空の場合
  if (posts.length === 0) {
    return (
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">お知らせ</h2>
          <p className="text-gray-600">
            お知らせはまだありません。
          </p>
        </div>
      </section>
    );
  }

  // 正常時の表示
  return (
    <section className="py-16 px-6 md:px-16 bg-white">
      {/* ニュース一覧 */}
    </section>
  );
}
```

### page.tsx のエラーハンドリング

```typescript
// app/news/[id]/page.tsx
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPost(id);

  // 記事が見つからない場合は404ページを表示
  if (!post) {
    notFound();
  }

  return <ArticleContent post={post} />;
}
```

## ロギング戦略

### 本番環境でのエラーログ

```typescript
function logError(error: any, context: string) {
  const errorInfo = {
    context,
    message: error.message,
    status: getErrorStatus(error),
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'production') {
    // 本番環境: 外部ロギングサービスへ送信（例: Sentry）
    console.error('API Error:', JSON.stringify(errorInfo));
    // Sentry.captureException(error);
  } else {
    // 開発環境: コンソールに出力
    console.error(`[${context}] API Error:`, error);
  }
}

// 使用例
try {
  const data = await client.get({ endpoint: 'news' });
  return data.contents;
} catch (error) {
  logError(error, 'fetchNews');
  return [];
}
```

## フォールバック戦略

### 静的フォールバックデータ

```typescript
const FALLBACK_NEWS = [
  {
    id: 'fallback-1',
    title: '現在お知らせはありません',
    publishedAt: new Date().toISOString(),
    thumbnail: null,
  },
];

async function fetchNewsWithFallback() {
  try {
    const data = await client.get({ endpoint: 'news', queries: { limit: 5 } });
    return data.contents;
  } catch (error) {
    logError(error, 'fetchNewsWithFallback');
    return FALLBACK_NEWS;
  }
}
```

### キャッシュからの復元

```typescript
import { unstable_cache } from 'next/cache';

const getCachedNews = unstable_cache(
  async () => {
    const data = await client.get({ endpoint: 'news', queries: { limit: 5 } });
    return data.contents;
  },
  ['news-list'],
  { revalidate: 3600 } // 1時間キャッシュ
);

async function fetchNewsWithCache() {
  try {
    return await getCachedNews();
  } catch (error) {
    logError(error, 'fetchNewsWithCache');
    // キャッシュから復元を試みる
    return FALLBACK_NEWS;
  }
}
```

## テスト

### エラーハンドリングのテスト

```typescript
// __tests__/microcms.test.ts
import { fetchNews } from '@/lib/api';

describe('MicroCMS API Error Handling', () => {
  it('should handle 401 error', async () => {
    // APIキーを無効化した状態でテスト
    const { posts, error } = await fetchNews();
    expect(error).toBeDefined();
    expect(error?.status).toBe(401);
    expect(posts).toEqual([]);
  });

  it('should handle 404 error', async () => {
    // 存在しないIDでテスト
    const post = await getBlogPost('non-existent-id');
    expect(post).toBeNull();
  });

  it('should handle network error', async () => {
    // ネットワークを切断した状態でテスト
    const { posts, error } = await fetchNews();
    expect(error).toBeDefined();
    expect(posts).toEqual([]);
  });
});
```

## ベストプラクティス

### 1. エラーメッセージはユーザーフレンドリーに
技術的な詳細はログに記録し、ユーザーには分かりやすいメッセージを表示する。

### 2. 適切なフォールバック
エラー時も最低限の情報を表示し、完全な空白ページは避ける。

### 3. リトライロジックは慎重に
- 401/404エラーはリトライしない
- 500系エラーのみリトライ
- 指数バックオフを使用

### 4. ログは構造化
JSON形式でログを記録し、後で分析しやすくする。

### 5. ユーザーへの説明
エラーが続く場合の対処方法（お問い合わせ先等）を明示する。

## 関連ドキュメント

- [MicroCMS Setup](./setup.md)
- [API Reference](./api-reference.md)
- [Data Flow](../../architecture/data-flow.md)
- [Troubleshooting](../../troubleshooting/common-issues.md)
