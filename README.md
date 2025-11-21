# 割烹 神谷 Website
公式サイト: [k-kamiya.net](https://k-kamiya.net)  
OGP: ![ogp](https://github.com/user-attachments/assets/f6fd26f2-5e5b-4427-b2f1-670f2bcee032)

## 概要
三代続く川口の老舗日本料理店「割烹 神谷」の公式サイト。お品書き・店舗情報・お知らせ・おせち購入導線を提供し、落ち着いた和のトーンで構成しています。

## スタック
- Next.js 16 / React 19 / TypeScript
- Tailwind CSS 4
- 画像最適化: Next.js Image
- コンテンツ: microCMS（ニュース）、ローカルTSデータ（メニュー）
- アニメーション: CSS / GSAP / Framer Motion（一部）

## 主な機能
- レスポンシブ対応（モバイル～デスクトップ）
- ヒーローセクション: 非ループロゴ動画＋おせち購入CTA
- ヘッダー/フッター: シンプルなナビ（お品書き / おせちの購入 / 店舗情報 / ご予約 + お知らせリンクはフッター）
- ニュース: microCMS連携
- メニュー: `app/data/menu.ts` の静的データ
- サイトマップ: `app/sitemap.ts`（動的）＋`public/sitemap.xml`（静的）
- SEO: メタデータ、JSON-LD、OGP、robots.txt

## 環境構築
前提: Node.js 18+, npm 9+
```bash
git clone https://github.com/ManatoYamashita/kappou-kamiya.git
cd kappou-kamiya
npm install
npm run dev
```
開発用URL: http://localhost:3000

## スクリプト
- `npm run dev` : 開発サーバー（Next.js 16 + Turbopack）
- `npm run build` : 本番ビルド
- `npm run start` : 本番ビルドの起動確認
- `npm run lint` : ESLintチェック

## ディレクトリ概要
```
app/
  components/   # 共通UI・セクション（Header, Footer, Hero, Osechi など）
  data/         # メニュー等の静的データ
  news/         # お知らせ一覧・詳細
  globals.css   # グローバルスタイル
  layout.tsx    # ルートレイアウト（メタ・フォント・JSON-LD）
  page.tsx      # トップページ
public/         # 画像・フォント等
libs/           # microCMSクライアント
docs/           # 開発用ドキュメント
```

## コンテンツ更新
- メニュー: `app/data/menu.ts`
- ニュース: microCMS（`news` スキーマ）
- 店舗情報・理念・ヒーロー文言: 該当コンポーネント内（`app/components`）
- ボタンスタイル: `app/components/Btn.tsx`（バリアントは `default / primary / primary-white`）

## ナビゲーションとCTA
- ヘッダー: お品書き / おせちの購入 / 店舗情報 / ご予約（TEL）
- フッター: 上記に加え「お知らせ」「アクセス」を掲出
- ヒーロー: 主CTA「おせちの購入」(primary)、補助「ご予約」(default)

## デプロイ
Vercel想定。環境変数を設定のうえ以下を実行:
```bash
npm run build
npm run start
```

## テストと品質
- ESLint: `npm run lint`
- 主要コンポーネントは React Testing Library を想定（未同梱）。追加時は `__tests__` を隣接配置。

## ライセンス
© 2024 割烹 神谷 All Rights Reserved.
