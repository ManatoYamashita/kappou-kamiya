# Repository Guidelines

## Project Structure & Module Organization
- `app/` は Next.js App Router の中心で、`page.tsx` がトップ、`news/` が記事詳細、`components/` が再利用可能な UI をまとめます。
- スタイルと状態は主に Server Component + `globals.css` + Tailwind ユーティリティで構成し、微細なデータは `app/data/` に JSON/TS で配置します。
- 外部サービス連携は `libs/microcms.ts` に閉じ込め、`public/` 配下に画像やフォントを置きます。新規モジュールはこの分離を保ち、依存を一方向にしてください。

## Build, Test, and Development Commands
- `npm run dev` : ホットリロード付きの開発サーバー (Next 15)。`NEXT_PUBLIC_*` などの環境変数は `.env.local` で定義。
- `npm run build` : 本番用最適化ビルド。microCMS への API アクセスに必要なキーが設定されているか検証してください。
- `npm run start` : `build` 成果物を本番モードで起動し、レンダリングやキャッシュの最終確認を行います。
- `npm run lint` : ESLint + `eslint-config-next` による静的解析。警告は PR 前にゼロにすること。

## Coding Style & Naming Conventions
- TypeScript/React 19 構成。2 スペースインデント、PascalCase コンポーネント名、camelCase フック/ユーティリティを徹底します。
- Server Component をデフォルトとし、クライアント機能が必要な場合のみ `"use client"` を宣言。ユーティリティは `libs/` に純粋関数として切り出してください。
- Tailwind v4 を使用し、クラスは意味順 (レイアウト→色→アニメーション) で並べます。アニメーションは framer-motion / GSAP どちらか一方に統一。

## Testing Guidelines
- 現時点で公式テストスクリプトは未導入ですが、各コンポーネントには React Testing Library + `@testing-library/jest-dom` を想定した `__tests__` を隣接配置してください。
- インテグレーションは Playwright を推奨し、`tests/e2e/` にシナリオを作成後 `npx playwright test` を定義しましょう。
- 重要なコンポーネントでは 80% 以上のステートメントカバレッジを目標に Istanbul レポートを収集してください。

## Commit & Pull Request Guidelines
- Git 履歴は `FEATURE: xxx` 形式です。`FIX:`, `CHORE:`, `DOCS:` などタイプ + コロン + 先頭大文字の文で統一してください。
- PR では 1) 背景と解決策、2) 確認済みテスト (`npm run lint`, `npm run build` 等)、3) 関連 Issue/スクリーンショットを含めます。スクリーンショットは `public/pr/` に配置して参照できるようにしてください。
- 依存追加や API キーが必要な変更時は `.env.example` を更新し、レビュアーが同条件で確認できるよう保証します。

## Security & Configuration Tips
- microCMS の `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` は `.env.local` にのみ置き、`NEXT_PUBLIC_` 接頭辞を付ける値は読み取り専用に限定してください。
- `next.config.ts` の最適化オプションを変更する際は `npm run start` で挙動を確認し、CSP や画像ドメインの追加は必ず README と `.env.example` に記録します。

## Docs 連携運用ルール
- 仕様変更や不具合対応で得た知見は `docs/` 配下、または本 `AGENTS.md` に必ず反映し、PR テンプレートの「Docs Updated?」チェックを通過させます。
- 既存ルールが無い領域は `{領域名}.md` 形式で新設し、300 行を超える場合はファイルを分割して検索性を維持してください。
- Issue には追加・更新したドキュメントのパスを明記し、レビューではコード差分と同等に確認します。Docs 未更新の場合はマージ禁止とします。
