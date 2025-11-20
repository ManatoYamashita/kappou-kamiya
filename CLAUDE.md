# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

割烹 神谷（Kappou Kamiya）の公式ウェブサイト。三代続く川口の老舗日本料理店のオンラインプレゼンスを提供するレストラン向けWebアプリケーションです。

**主な機能:**
- レスポンシブデザインによる多デバイス対応（モバイル、タブレット、デスクトップ）
- MicroCMSを活用したHeadless CMSによるニュース/ブログコンテンツ管理
- GSAPとFramer Motionを使用したリッチなページトランジションとアニメーション
- 構造化データ（JSON-LD）とOGPタグによるSEO最適化
- 動的サイトマップ生成
- Google AnalyticsとConsent Managerの統合

## Tech Stack

- **Framework**: Next.js 16.0.3 (App Router with Turbopack)
- **React**: 19.2.0
- **Styling**: TailwindCSS 4.0
- **Fonts**: Noto Sans JP, Shippori Mincho (Google Fonts)
- **Animation**: GSAP 3.12.7, Framer Motion 12.8.0
- **CMS**: MicroCMS (microcms-js-sdk 3.2.0)
- **Date Handling**: dayjs 1.11.13
- **Deployment**: Vercel推奨
- **AI Development Tools**: next-devtools-mcp (MCP Server for AI-assisted debugging)

## Development Commands

### 開発サーバーの起動
```bash
npm run dev
```
開発サーバーは http://localhost:3000 で起動します。

### ビルド
```bash
npm run build
```

### プロダクションサーバーの起動
```bash
npm run start
```

### リンター実行
```bash
npm run lint
```

**注意**: Next.js 16では`next lint`コマンドが削除されました。現在はESLintを直接使用しています。

## Next.js 16の主要な変更点

### Turbopackがデフォルトに
Next.js 16では、Turbopackがデフォルトのバンドラーになりました。Webpackを使用する場合は`--webpack`フラグを使用してください。

### Breaking Changes
- **Node.js 20.9+**と**TypeScript 5.1+**が必須
- **`next lint`コマンドの削除**: ESLintを直接使用
- **Async params**: `params`と`searchParams`に`await`が必要（既に対応済み）
- **Async utilities**: `cookies()`, `headers()`, `draftMode()`が非同期に
- **middleware.ts廃止**: `proxy.ts`にリネーム（本プロジェクトでは未使用）

### next-devtools-mcp
Next.js 16は、MCP（Model Context Protocol）をサポートしています。`.mcp.json`ファイルを使用して、AI開発ツールとの統合が可能です。

```json
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    }
  }
}
```

このMCPサーバーは、以下の機能を提供します：
- ビルドエラーとランタイムエラーのリアルタイム診断
- ページメタデータとServer Action定義へのアクセス
- 開発サーバーログの統合表示
- Next.js公式ドキュメントへの直接アクセス

## Environment Variables

プロジェクトには以下の環境変数が必要です（`.env.local`ファイルに設定）:

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

- `MICROCMS_SERVICE_DOMAIN`: MicroCMSのサービスドメイン（必須）
- `MICROCMS_API_KEY`: MicroCMS APIキー（必須）
- `NEXT_PUBLIC_SITE_URL`: デプロイされたサイトのURL（OGPとサイトマップで使用）

## Architecture & Code Structure

### Directory Structure

```
kappou-kamiya/
├── app/                          # Next.js App Router
│   ├── components/               # Reactコンポーネント
│   │   ├── Header.tsx           # グローバルヘッダー
│   │   ├── Footer.tsx           # グローバルフッター
│   │   ├── Hero.tsx             # トップページのヒーローセクション
│   │   ├── Concept.tsx          # 店舗理念セクション
│   │   ├── Menu.tsx             # メニュー一覧セクション
│   │   ├── Info.tsx             # 店舗情報セクション
│   │   ├── News.tsx             # ニュース一覧セクション
│   │   ├── PageTransition.tsx   # GSAP使用のページ遷移制御
│   │   ├── PageContent.tsx      # ページコンテンツラッパー
│   │   └── Btn.tsx              # 再利用可能なボタンコンポーネント
│   ├── data/
│   │   └── menu.ts              # メニューデータ（TypeScript定義含む）
│   ├── news/
│   │   ├── page.tsx             # ニュース一覧ページ
│   │   └── [id]/
│   │       ├── page.tsx         # ニュース詳細ページ（動的ルート）
│   │       └── ArticleContent.tsx # 記事コンテンツコンポーネント
│   ├── layout.tsx               # ルートレイアウト（メタデータ、JSON-LD、フォント設定）
│   ├── page.tsx                 # トップページ
│   ├── not-found.tsx            # 404ページ
│   ├── sitemap.ts               # 動的サイトマップ生成
│   └── globals.css              # グローバルスタイル
├── libs/
│   └── microcms.ts              # MicroCMS SDKクライアント初期化
├── public/
│   └── images/                  # 静的画像ファイル
├── .cursor/
│   └── rules/
│       └── nextjs15-react19-cursorrulues.mdc # Cursorルール（参照推奨）
├── .mcp.json                    # MCP Server設定（next-devtools-mcp）
└── next.config.ts               # Next.js設定（画像最適化、CSP等）
```

### Key Architecture Patterns

#### 1. Server Components優先
- 基本的にすべてのコンポーネントはReact Server Components（RSC）として実装
- クライアント側の機能が必要な場合のみ`'use client'`ディレクティブを使用
  - 例: `PageTransition.tsx`（GSAPアニメーション）、`ArticleContent.tsx`（Intersection Observer）

#### 2. MicroCMS統合パターン
- `libs/microcms.ts`でSDKクライアントを初期化
- 環境変数の必須チェックを実装
- ニュース記事の取得は`client.get()`を使用
- エラーハンドリングを必ず実装（APIエラー時は`null`や空配列を返す）

#### 3. メタデータとSEO
- `layout.tsx`でグローバルメタデータを定義
- `news/[id]/page.tsx`で動的メタデータを`generateMetadata()`で生成
- JSON-LD構造化データはルートレイアウトで定義（Restaurant, Event, Reviewスキーマ）
- `sitemap.ts`でMicroCMSの記事を含む動的サイトマップを生成

#### 4. データ管理
- **静的データ**: メニュー情報は`app/data/menu.ts`に型定義と共に格納
- **動的データ**: ニュース記事はMicroCMSから取得（ISRで最適化）
- メニューカテゴリーは型安全性のため`MenuCategory`型で定義

#### 5. アニメーション設計
- **ページ遷移**: GSAP使用（`PageTransition.tsx`）
  - カスタムイベント（`routeChangeStart`/`routeChangeComplete`）で制御
  - スクロール禁止クラス（`is-changing`）の管理
  - ルートパス（`/`）への遷移時はアニメーションをスキップ
- **要素アニメーション**: Framer MotionまたはIntersection Observer APIを使用

#### 6. 画像最適化
- Next.js Image Componentを使用
- MicroCMSアセット用のリモートパターン設定済み（`next.config.ts`）
- WebPとAVIF形式をサポート
- キャッシュTTL: 7日間

## Development Guidelines

### Next.js 15 & React 19の非同期API

**重要**: Next.js 15ではいくつかのランタイムAPIが非同期になっています。必ず`await`を使用してください。

```typescript
// 正しい実装
const params = await props.params;
const searchParams = await props.searchParams;
const cookieStore = await cookies();
const headersList = await headers();
```

### TypeScript規約
- すべてのコードはTypeScriptで記述
- インターフェースを型定義に優先（`interface`を`type`より優先）
- enumは使用せず、constマップやユニオン型を使用
- 適切な型推論と型安全性の実装

### コンポーネント設計
- 関数型・宣言的プログラミングパターンを採用
- DRY原則の遵守
- 早期リターンによる可読性向上
- 命名規則:
  - イベントハンドラには`handle`プレフィックス（`handleClick`等）
  - 真偽値には補助動詞を使用（`isLoading`, `hasError`等）
  - ディレクトリは小文字とダッシュ（`auth-wizard`等）

### スタイリング
- TailwindCSSクラスをコンポーネント内で使用
- カスタムカラーはTailwind設定で定義（`tailwind.config.js`）
  - `paper`: 背景色（#f7f4ed）
  - `ink`: テキスト色（#333）
  - `accent`: アクセント色（#8b4513）
- レスポンシブデザイン: モバイルファースト、Tailwindのブレークポイント使用

### アクセシビリティ
- セマンティックHTMLの使用
- `aria-label`や`aria-hidden`の適切な使用
- スキップリンク実装済み（`layout.tsx`）
- キーボードナビゲーションのサポート

### パフォーマンス
- 画像は必ずNext.js `<Image>`コンポーネントを使用
- スクリプトは`next/script`の`strategy`プロパティで読み込みタイミングを制御
  - Google Analytics: `lazyOnload`
  - Consent Manager: `lazyOnload`
- CSS最適化が有効化済み（`next.config.ts`の`experimental.optimizeCss`）

## Working with MicroCMS

### ニュース記事の型定義

```typescript
type Props = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  content: string;
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

### 記事取得パターン

```typescript
// 一覧取得
const data = await client.get({
  endpoint: 'news',
  queries: {
    fields: 'id,title,publishedAt',
    limit: 10,
  },
});

// 単一記事取得
const data = await client.get({
  endpoint: `news/${id}`,
});
```

### エラーハンドリング
MicroCMS APIを使用する際は必ずtry-catchでエラーハンドリングを実装してください。

```typescript
try {
  const data = await client.get({ endpoint: 'news' });
  return data.contents;
} catch (error) {
  console.error('microCMS APIエラー:', error);
  return [];
}
```

## Testing & Deployment

### ビルド前のチェックリスト
1. `npm run lint`でリンターエラーがないか確認
2. `npm run build`でビルドエラーがないか確認
3. 環境変数が正しく設定されているか確認
4. MicroCMSの接続が正常か確認

### デプロイ（Vercel）
- GitHubリポジトリと連携している場合、`main`ブランチへのプッシュで自動デプロイ
- 環境変数はVercelのプロジェクト設定で設定
- プレビューデプロイは各プルリクエストで自動生成

## Cursor Rules Integration

`.cursor/rules/nextjs15-react19-cursorrulues.mdc`にCursor IDE用のルールが定義されています。主なポイント:

- React Server Componentsを優先
- `'use client'`の最小化
- `useActionState`を`useFormState`（非推奨）の代わりに使用
- 非同期Request APIの正しい使用（`await params`, `await cookies()`等）

このファイルの内容に従ってコードを記述してください。

## Common Patterns & Examples

### 新しいコンポーネントの追加
```typescript
// app/components/NewComponent.tsx
export default function NewComponent() {
  return (
    <section className="px-6 md:px-16 py-12">
      {/* コンテンツ */}
    </section>
  );
}
```

### メニューデータの追加
`app/data/menu.ts`を編集し、`allMenuItems`配列に新しい`MenuItem`オブジェクトを追加してください。

### 新しいページの追加
1. `app/`ディレクトリ内に新しいフォルダを作成
2. `page.tsx`ファイルを作成
3. 必要に応じて`layout.tsx`でメタデータを設定
4. `sitemap.ts`に新しいルートを追加

## Important Notes

- **環境変数の漏洩防止**: `.env.local`は`.gitignore`に含まれています。絶対にコミットしないでください。
- **画像の最適化**: 新しい画像は必ず`/public/images/`に配置し、WebP形式を推奨します。
- **アニメーション**: ページ遷移のスクロール制御に問題がある場合は、`PageTransition.tsx`のセーフティタイマーを確認してください。
- **MicroCMS**: API制限に注意。静的生成（ISR）を活用してAPIコール数を削減してください。
