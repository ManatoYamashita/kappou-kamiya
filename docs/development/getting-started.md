# Getting Started

## 概要

このドキュメントでは、割烹神谷プロジェクトの開発環境をセットアップする手順を説明します。

## 前提条件

### 必須ソフトウェア

| ソフトウェア | バージョン | インストール方法 |
|---|---|---|
| Node.js | 18以上 | [nodejs.org](https://nodejs.org/) |
| npm | 9以上 | Node.jsに含まれる |
| Git | 最新 | [git-scm.com](https://git-scm.com/) |

### 推奨ソフトウェア

- **VSCode**: コードエディタ
- **Chrome**: ブラウザ（DevTools使用）

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/ManatoYamashita/kappou-kamiya.git
cd kappou-kamiya
```

### 2. 依存関係のインストール

```bash
npm install
```

**インストールされるパッケージ**:
- Next.js 16.0.3
- React 19.0.0
- TailwindCSS 4.0
- GSAP 3.12.7
- Framer Motion 12.8.0
- MicroCMS SDK 3.2.0
- dayjs 1.11.13

### 3. 環境変数の設定

#### .env.localファイルの作成
```bash
cp .env.example .env.local
```

#### 環境変数の編集
```bash
# .env.local
MICROCMS_SERVICE_DOMAIN=your-service-id
MICROCMS_API_KEY=your-api-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**MicroCMS設定の取得**:
1. [MicroCMS](https://microcms.io/)にログイン
2. サービス設定 → API設定
3. サービスドメインとAPIキーをコピー

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

## 開発コマンド

### dev（開発サーバー）
```bash
npm run dev
```

**用途**: 開発中のホットリロード

**ポート**: 3000（デフォルト）

**特徴**:
- ファイル変更時の自動リロード
- Fast Refresh（React）
- エラー表示

### build（本番ビルド）
```bash
npm run build
```

**用途**: 本番環境用の最適化ビルド

**出力**: `.next/`ディレクトリ

**処理内容**:
- TypeScriptコンパイル
- 静的ページ生成（SSG）
- バンドル最適化
- 画像最適化

### start（本番サーバー）
```bash
npm run start
```

**用途**: ビルド後のローカル確認

**前提**: `npm run build`実行済み

### lint（リンター）
```bash
npm run lint
```

**用途**: コード品質チェック

**チェック項目**:
- ESLintルール
- TypeScript型エラー
- Next.js推奨設定

## ディレクトリ構造

```
kappou-kamiya/
├── app/                    # Next.js App Router
│   ├── components/         # コンポーネント
│   ├── data/              # 静的データ
│   ├── news/              # ニュースページ
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # トップページ
│   └── globals.css        # グローバルCSS
├── docs/                   # ドキュメント
├── libs/                   # ライブラリ・ユーティリティ
│   └── microcms.ts        # MicroCMS SDK
├── public/                 # 静的ファイル
│   └── images/            # 画像
├── .env.local             # 環境変数（ローカル）
├── .env.example           # 環境変数テンプレート
├── next.config.ts         # Next.js設定
├── tailwind.config.js     # TailwindCSS設定
├── tsconfig.json          # TypeScript設定
└── package.json           # 依存関係
```

## 開発ワークフロー

### 1. ブランチ作成
```bash
git checkout -b feature/新機能名
```

### 2. 開発
```bash
npm run dev
# コード編集
```

### 3. リンター実行
```bash
npm run lint
```

### 4. ビルド確認
```bash
npm run build
```

### 5. コミット
```bash
git add .
git commit -m "FEATURE: 新機能の説明"
```

**コミットメッセージPrefix**:
- `FEATURE:` 新機能
- `FIX:` バグ修正
- `DOCS:` ドキュメント
- `STYLE:` スタイル変更
- `REFACTOR:` リファクタリング

### 6. プッシュ
```bash
git push origin feature/新機能名
```

### 7. プルリクエスト作成
GitHubでプルリクエストを作成

## IDE設定（VSCode）

### 推奨拡張機能

#### 必須
- **ES7+ React/Redux/React-Native snippets**: Reactスニペット
- **Tailwind CSS IntelliSense**: TailwindCSSオートコンプリート
- **TypeScript and JavaScript Language Features**: 型チェック

#### 推奨
- **Prettier**: コードフォーマッター
- **ESLint**: リンター
- **GitLens**: Git履歴表示

### settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## トラブルシューティング

### ポートが使用中
```bash
# ポートを指定して起動
PORT=3001 npm run dev
```

### node_modules削除
```bash
rm -rf node_modules
npm install
```

### .nextキャッシュクリア
```bash
rm -rf .next
npm run dev
```

### 環境変数が反映されない
```bash
# サーバーを再起動
# Ctrl+C で停止
npm run dev
```

## 次のステップ

- [Coding Conventions](./coding-conventions.md)
- [TypeScript Guidelines](./typescript-guidelines.md)
- [Component Development](../components/layout/header.md)
- [MicroCMS Setup](../integrations/microcms/setup.md)

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
