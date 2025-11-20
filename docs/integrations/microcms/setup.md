# MicroCMS Setup Guide

## 概要

このドキュメントでは、MicroCMS Headless CMSのセットアップ手順と、割烹神谷プロジェクトへの統合方法を説明します。

## MicroCMSとは

MicroCMSは、日本製のHeadless CMSサービスです。APIベースでコンテンツを管理でき、非技術者でも直感的に操作できるダッシュボードを提供します。

**主な特徴**:
- リッチテキストエディタ
- 画像管理
- APIキーベースのアクセス制御
- Webhook対応
- 日本語サポート

## セットアップ手順

### 1. MicroCMSアカウント作成

1. [MicroCMS](https://microcms.io/)にアクセス
2. 「無料で始める」をクリック
3. メールアドレスで登録

### 2. サービス作成

1. ダッシュボードで「サービス作成」
2. サービスID（例: `kappou-kamiya`）を入力
3. サービス名を入力

### 3. APIエンドポイント作成

#### ニュースエンドポイント
1. 「API作成」をクリック
2. **エンドポイント名**: `news`
3. **API型**: リスト形式
4. 「作成」をクリック

#### フィールド定義
以下のフィールドを追加します:

| フィールドID | 表示名 | 種類 | 必須 |
|---|---|---|---|
| title | タイトル | テキスト | ✓ |
| description | 説明 | テキスト | ✓ |
| content | 本文 | リッチエディタ | ✓ |
| thumbnail | サムネイル | 画像 | - |
| category | カテゴリー | セレクト | - |

**カテゴリー選択肢**（例）:
- お知らせ
- イベント
- メニュー
- その他

### 4. APIキー取得

1. サービス設定 → API設定
2. 「APIキーを発行」
3. 以下の2つをコピー:
   - **サービスドメイン**: `xxx.microcms.io`
   - **APIキー**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

## Next.jsプロジェクトへの統合

### 1. パッケージインストール

```bash
npm install microcms-js-sdk
```

### 2. 環境変数設定

#### .env.local作成
```bash
touch .env.local
```

#### 環境変数追加
```bash
# .env.local
MICROCMS_SERVICE_DOMAIN=your-service-id
MICROCMS_API_KEY=your-api-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**注意**: `.env.local`は`.gitignore`に含まれているため、Gitにコミットされません。

### 3. クライアント初期化

#### libs/microcms.ts作成
```typescript
// libs/microcms.ts
import { createClient } from 'microcms-js-sdk';

// 環境変数バリデーション
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

### 4. 型定義作成

```typescript
// types/news.ts
export interface NewsPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  description: string;
  content: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  };
  category?: {
    id: string;
    name: string;
  };
}
```

### 5. データ取得例

```typescript
import { client } from '@/libs/microcms';
import type { NewsPost } from '@/types/news';

// 一覧取得
export async function getNewsList(limit: number = 10) {
  const data = await client.get({
    endpoint: 'news',
    queries: {
      fields: 'id,title,publishedAt,thumbnail',
      limit,
    },
  });
  return data.contents as NewsPost[];
}

// 単一記事取得
export async function getNewsPost(id: string) {
  const data = await client.get({
    endpoint: `news/${id}`,
  });
  return data as NewsPost;
}

// 全ID取得（SSG用）
export async function getAllNewsIds() {
  const ids = await client.getAllContentIds({ endpoint: 'news' });
  return ids;
}
```

## Vercelデプロイ設定

### 環境変数設定
1. Vercelプロジェクト設定 → Environment Variables
2. 以下の3つを追加:
   - `MICROCMS_SERVICE_DOMAIN`
   - `MICROCMS_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`

### Webhook設定（自動再ビルド）

#### Vercel側
1. Vercelプロジェクト設定 → Git → Deploy Hooks
2. 「Create Hook」をクリック
3. フックURL（`https://api.vercel.com/v1/integrations/deploy/...`）をコピー

#### MicroCMS側
1. MicroCMS設定 → Webhook
2. 「Webhook追加」をクリック
3. **Webhook URL**: Vercelフックウォ貼り付け
4. **トリガー**: コンテンツの公開・更新

これにより、MicroCMSでコンテンツを公開・更新するとVercelで自動再ビルドされます。

## 画像最適化

MicroCMS画像をNext.js Image Componentで使用するには、`next.config.ts`に設定が必要です。

```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/assets/**',
      },
    ],
  },
};
```

## トラブルシューティング

### APIエラー: 401 Unauthorized
**原因**: APIキーが間違っている

**解決策**:
1. `.env.local`の`MICROCMS_API_KEY`を確認
2. MicroCMSダッシュボードでAPIキーを再発行

### APIエラー: 404 Not Found
**原因**: エンドポイント名が間違っている

**解決策**:
1. MicroCMSダッシュボードでエンドポイント名を確認
2. `client.get({ endpoint: 'news' })`の`news`が正しいか確認

### 画像が表示されない
**原因**: `next.config.ts`の設定不足

**解決策**:
`remotePatterns`に`images.microcms-assets.io`を追加

## ベストプラクティス

### 1. 環境変数のバリデーション
アプリケーション起動時に環境変数をチェックする。

### 2. 型安全性の確保
TypeScriptの型定義を必ず作成する。

### 3. エラーハンドリング
すべてのAPI呼び出しで`try-catch`を使用する。

### 4. キャッシング戦略
- Server Componentsでデータ取得（自動キャッシュ）
- `revalidate`オプションで再検証間隔を設定

### 5. フィールドの最小化
必要なフィールドのみ`queries.fields`で指定し、APIレスポンスを軽量化する。

## 関連ドキュメント

- [API Reference](./api-reference.md)
- [Error Handling](./error-handling.md)
- [Type Definitions](./type-definitions.md)
- [Data Flow](../../architecture/data-flow.md)
