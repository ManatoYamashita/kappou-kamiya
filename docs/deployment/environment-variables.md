# Environment Variables

## 概要

環境変数は、アプリケーションの設定を環境ごとに切り替えるための仕組みです。API キーやサービスドメインなどの機密情報を安全に管理できます。

## 必須環境変数

### MICROCMS_SERVICE_DOMAIN
**説明**: MicroCMSのサービスドメイン

**例**: `your-service-id`（`your-service-id.microcms.io`の`your-service-id`部分）

**用途**: MicroCMS SDKの初期化（`libs/microcms.ts`）

**スコープ**: サーバーサイドのみ

**取得方法**:
1. MicroCMSダッシュボードにログイン
2. サービス設定 → API設定
3. 「サービスドメイン」をコピー

### MICROCMS_API_KEY
**説明**: MicroCMS APIキー

**例**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

**用途**: MicroCMS APIへのアクセス認証

**スコープ**: サーバーサイドのみ

**セキュリティ**:
- `.env.local`に保存（Gitにコミットしない）
- Vercelの環境変数として設定

**取得方法**:
1. MicroCMSダッシュボードにログイン
2. サービス設定 → API設定 → APIキー
3. 「APIキーを発行」をクリック

### NEXT_PUBLIC_SITE_URL
**説明**: デプロイされたサイトのURL

**例**: `https://k-kamiya.net`

**用途**:
- OGP画像のURL生成
- JSON-LD構造化データのURL
- サイトマップのURL
- カノニカルURL

**スコープ**: クライアント・サーバー両方（`NEXT_PUBLIC_`プレフィックス）

**デフォルト値**: `https://kappou-kamiya.vercel.app`

## 環境変数ファイル

### .env.local（ローカル開発）

```bash
# .env.local
MICROCMS_SERVICE_DOMAIN=your-service-id
MICROCMS_API_KEY=your-api-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**注意**: このファイルは`.gitignore`に含まれているため、Gitにコミットされません。

### .env.example（テンプレート）

```bash
# .env.example
NEXT_PUBLIC_SITE_URL=https://example.com
MICROCMS_API_KEY=microcms-api-key
MICROCMS_SERVICE_DOMAIN=microcms-service-domain
```

**用途**:
- 新規開発者のためのテンプレート
- 必要な環境変数の一覧

**使用方法**:
```bash
cp .env.example .env.local
# .env.localを編集して実際の値を設定
```

## 環境ごとの設定

### ローカル開発
**ファイル**: `.env.local`

```bash
MICROCMS_SERVICE_DOMAIN=your-service-id
MICROCMS_API_KEY=your-dev-api-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Vercelデプロイ
**場所**: Vercelプロジェクト設定 → Environment Variables

**設定手順**:
1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」→「Environment Variables」
3. 各環境変数を追加:
   - Key: `MICROCMS_SERVICE_DOMAIN`
   - Value: `your-service-id`
   - Environments: Production, Preview, Development

## 環境変数の読み込み

### サーバーコンポーネント

```typescript
// サーバー側でのみアクセス可能
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;
```

### クライアントコンポーネント

```typescript
// NEXT_PUBLIC_プレフィックス必須
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
```

### バリデーション

```typescript
// libs/microcms.ts
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}
```

**利点**:
- アプリケーション起動時にエラーを検出
- ランタイムエラーを防止

## セキュリティベストプラクティス

### 1. .env.localをGitignore
```bash
# .gitignore
.env.local
.env.*.local
```

### 2. NEXT_PUBLIC_プレフィックスの適切な使用
- 機密情報: プレフィックスなし（サーバーサイドのみ）
- 公開情報: `NEXT_PUBLIC_`プレフィックス（クライアントサイド可）

### 3. 本番環境とdev環境でAPIキーを分ける
- 開発用APIキー
- 本番用APIキー

### 4. 環境変数の定期的なローテーション
定期的にAPIキーを再発行し、セキュリティを維持する。

## トラブルシューティング

### 環境変数が読み込まれない

**原因1**: ファイル名の誤り
```bash
# 間違い
.env

# 正しい
.env.local
```

**原因2**: Next.jsサーバーの再起動が必要
```bash
# 環境変数変更後は必ず再起動
npm run dev
```

**原因3**: NEXT_PUBLIC_プレフィックスの欠如
```bash
# クライアントサイドでアクセスする場合は必須
NEXT_PUBLIC_SITE_URL=https://example.com
```

### Vercelで環境変数が反映されない

**原因**: デプロイ後の設定変更

**解決策**:
1. Environment Variablesを更新
2. 「Redeploy」をクリックして再デプロイ

### MicroCMS APIエラー: 401 Unauthorized

**原因**: APIキーが間違っているまたは設定されていない

**確認**:
```bash
echo $MICROCMS_API_KEY
```

**解決策**:
1. `.env.local`のAPIキーを確認
2. MicroCMSダッシュボードで正しいAPIキーを取得
3. サーバーを再起動

## 環境変数の確認方法

### ローカル開発
```typescript
// app/page.tsx（開発中のみ）
console.log('MICROCMS_SERVICE_DOMAIN:', process.env.MICROCMS_SERVICE_DOMAIN);
console.log('NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);
```

### Vercel
1. Vercelダッシュボード → Settings → Environment Variables
2. 各変数の「Value」を確認（マスクされている）

## 環境変数一覧

| 変数名 | 必須 | スコープ | 用途 |
|---|---|---|---|
| `MICROCMS_SERVICE_DOMAIN` | ✓ | サーバー | MicroCMS接続 |
| `MICROCMS_API_KEY` | ✓ | サーバー | MicroCMS認証 |
| `NEXT_PUBLIC_SITE_URL` | - | 両方 | URL生成 |

## 関連ドキュメント

- [Vercel Setup](./vercel-setup.md)
- [MicroCMS Setup](../integrations/microcms/setup.md)
- [Build Process](./build-process.md)
