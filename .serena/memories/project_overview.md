# プロジェクト概要
- 割烹 神谷公式サイト (Next.js 16 / React 19 / TypeScript)。Turbopack 利用の App Router 構成。
- microCMS からニュースを取得し、メニューは `app/data/menu.ts` の静的データ。
- Tailwind CSS v4 をメインスタイル、アニメーションは GSAP＋Framer Motion。
- SEO（JSON-LD/OGP/サイトマップ）と画像最適化（Next Image, WebP/AVIF）を実装済み。

# ディレクトリ骨子
- `app/` : App Router。`page.tsx` トップ、`news/` 一覧＋詳細、`components/` 共通 UI、`layout.tsx` グローバル設定、`globals.css`。
- `libs/` : microCMS クライアント初期化。
- `public/` : 静的アセット。
- `docs/` : 開発ドキュメント、ルール類。
- `.cursor/rules/` : Cursor 用ルール（RSC 優先など）。

# 主要依存
- next 16.0.3, react 19.2, react-dom 19.2, tailwindcss 4, gsap 3.12, framer-motion 12.8, dayjs, microcms-js-sdk。

# 環境変数
- `.env.local` に `MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY`, `NEXT_PUBLIC_SITE_URL`（秘密扱い、コミット禁止）。