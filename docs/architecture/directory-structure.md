# ディレクトリ構造

## プロジェクトルート構造

```
kappou-kamiya/
├── .claude/                      # Claude Code設定
├── .cursor/                      # Cursor IDE設定・ルール
│   └── rules/
│       └── nextjs15-react19-cursorrulues.mdc
├── .git/                         # Gitリポジトリ
├── .gitignore                    # Git除外設定
├── .hintrc                       # Webhint設定
├── app/                          # Next.js App Router
├── docs/                         # プロジェクトドキュメント
├── libs/                         # ライブラリ・ユーティリティ
├── public/                       # 静的ファイル
├── AGENTS.md                     # リポジトリガイドライン
├── CLAUDE.md                     # Claude Code向けガイド
├── README.md                     # プロジェクト概要
├── eslint.config.mjs             # ESLint設定
├── next.config.ts                # Next.js設定
├── package.json                  # 依存関係定義
├── package-lock.json             # 依存関係ロック
├── postcss.config.mjs            # PostCSS設定
├── tailwind.config.js            # TailwindCSS設定
└── tsconfig.json                 # TypeScript設定
```

## app/ ディレクトリ（Next.js App Router）

```
app/
├── components/                   # 再利用可能なコンポーネント
│   ├── Btn.tsx                  # 汎用ボタンコンポーネント
│   ├── Concept.tsx              # 店舗理念セクション
│   ├── Footer.tsx               # グローバルフッター
│   ├── Header.tsx               # グローバルヘッダー
│   ├── Hero.tsx                 # ヒーローセクション
│   ├── Info.tsx                 # 店舗情報・アクセスセクション
│   ├── Menu.tsx                 # メニュー表示セクション
│   ├── News.tsx                 # ニュース一覧セクション
│   ├── PageContent.tsx          # ページコンテンツラッパー
│   └── PageTransition.tsx       # ページ遷移制御
├── data/                         # 静的データ
│   └── menu.ts                  # メニューデータ（型定義含む）
├── news/                         # ニュースページ
│   ├── page.tsx                 # ニュース一覧ページ
│   └── [id]/                    # 動的ルート（ニュース詳細）
│       ├── ArticleContent.tsx   # 記事コンテンツ表示
│       └── page.tsx             # ニュース詳細ページ
├── favicon.ico                   # ファビコン
├── globals.css                   # グローバルCSS（295行）
├── layout.tsx                    # ルートレイアウト
├── not-found.tsx                 # 404エラーページ
├── page.tsx                      # トップページ
└── sitemap.ts                    # 動的サイトマップ生成
```

### app/components/ の役割分類

#### レイアウトコンポーネント
- **Header.tsx**: グローバルナビゲーション、スクロール連動
- **Footer.tsx**: フッター情報、リンク
- **PageTransition.tsx**: GSAPページ遷移制御
- **PageContent.tsx**: コンテンツラッパー、フェードアニメーション

#### セクションコンポーネント（トップページ）
- **Hero.tsx**: ファーストビュー
- **Concept.tsx**: 店舗理念・こだわり
- **Menu.tsx**: メニュー一覧（カテゴリフィルター付き）
- **Info.tsx**: 店舗情報・アクセス・Google Maps
- **News.tsx**: ニュース一覧（MicroCMS連携）

#### 共通コンポーネント
- **Btn.tsx**: 汎用ボタン（Link/button自動切り替え）

## libs/ ディレクトリ

```
libs/
└── microcms.ts                   # MicroCMS SDKクライアント初期化
```

**役割**: 外部ライブラリの初期化とユーティリティ関数

### microcms.ts
- MicroCMS SDKクライアントの作成
- 環境変数バリデーション
- エクスポート: `client`

## public/ ディレクトリ

```
public/
├── images/                       # 画像アセット（41ファイル）
│   ├── kamiya-logo.webm         # ロゴ動画
│   ├── kamiya-logo.webp         # ロゴ静止画（フォールバック）
│   ├── kamiya-cover.webp        # カバー画像
│   ├── kamiya-*.webp            # 各種画像
│   ├── menu-*.webp              # メニュー画像（34枚）
│   └── p.webp                   # プレースホルダー
├── apple-touch-icon.jpg          # iOS用アイコン
├── favicon.ico                   # ファビコン
├── ogp.jpg                       # OGP画像（1200x630）
├── robots.txt                    # 検索エンジンクローラー設定
└── sitemap.xml                   # 静的サイトマップ
```

### images/ の命名規則
- **logo**: `kamiya-logo.*`
- **カバー・背景**: `kamiya-*.webp`
- **メニュー**: `menu-[メニュー名].webp`
- **お弁当**: `menu-bento-*.webp` または `menu-obento-*.webp`
- **プレースホルダー**: `p.webp`

## docs/ ディレクトリ

```
docs/
├── architecture/                 # アーキテクチャドキュメント
├── components/                   # コンポーネント詳細
├── integrations/                 # 外部サービス統合
├── styling/                      # スタイリング関連
├── performance/                  # パフォーマンス最適化
├── seo/                          # SEO関連
├── accessibility/                # アクセシビリティ
├── deployment/                   # デプロイ関連
├── development/                  # 開発ガイド
├── troubleshooting/              # トラブルシューティング
├── api-reference/                # APIリファレンス
└── index.md                      # ドキュメントインデックス
```

詳細は各サブディレクトリのドキュメントを参照してください。

## 設定ファイル

### next.config.ts
Next.jsの設定ファイル。

**主な設定項目**:
- 画像最適化（リモートパターン、デバイスサイズ、フォーマット）
- CSS最適化（experimental.optimizeCss）
- Content Security Policy

### tailwind.config.js
TailwindCSSのカスタム設定。

**主な設定項目**:
- カスタムカラー（paper、ink、accent）
- カスタムフォント（mincho、sans）
- カスタムアニメーション

### tsconfig.json
TypeScriptの設定ファイル。

**主な設定項目**:
- `strict: true`（厳格な型チェック）
- パスエイリアス（`@/*`）
- Next.js推奨設定

### eslint.config.mjs
ESLintの設定ファイル。

**主な設定項目**:
- Next.js推奨ルール（`next/core-web-vitals`）
- TypeScript対応（`next/typescript`）

### postcss.config.mjs
PostCSSの設定ファイル。

**主な設定項目**:
- TailwindCSS統合

## ファイル命名規則

### コンポーネントファイル
- **PascalCase**: `Header.tsx`、`PageTransition.tsx`
- デフォルトエクスポート推奨

### ページファイル
- **小文字**: `page.tsx`、`layout.tsx`、`not-found.tsx`
- Next.js App Router規約に従う

### データファイル
- **小文字**: `menu.ts`
- 型定義を含む

### 設定ファイル
- **kebab-case**: `next.config.ts`、`eslint.config.mjs`
- ツール標準に従う

### 画像ファイル
- **kebab-case**: `kamiya-logo.webp`、`menu-hana.webp`
- WebP形式推奨

## ディレクトリ構造のベストプラクティス

### 1. App Router規約の遵守
- `app/`直下に`page.tsx`でルート定義
- `[id]/`でダイナミックルート
- `layout.tsx`でレイアウト定義

### 2. コンポーネントの配置
- **app/components/**: ページ固有ではない再利用可能なコンポーネント
- **app/[page]/**: ページ固有のコンポーネント（ArticleContent.tsx等）

### 3. 静的ファイルの管理
- **public/**: ルート直下からアクセス可能な静的ファイル
- **public/images/**: 画像は専用ディレクトリで管理

### 4. ドキュメントの分類
- **docs/**: 技術ドキュメントを体系的に整理
- カテゴリごとにサブディレクトリ作成

## 関連ドキュメント

- [プロジェクト概要](./overview.md)
- [コンポーネント階層](./component-hierarchy.md)
- [データフロー](./data-flow.md)
- [コンポーネント詳細](../components/layout/header.md)
