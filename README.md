# 割烹 神谷 Website

![ogp](https://github.com/user-attachments/assets/f6fd26f2-5e5b-4427-b2f1-670f2bcee032)


[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)

## About

三代続く川口の老舗日本料理店「割烹 神谷」の公式ウェブサイトです。四季折々の食材が織り成す逸品を和の空間で味わえる割烹料理店として、お客様にご利用いただくための情報を提供しています。
ご依頼で制作したWebサイトです。

## 要件

- 訴求は宴会ニーズのある方をターゲットにしていきたい。（忘年会、会食など）
- ブログとかの更新が簡単にできるようにしたい（場合によってはワードプレスやstudioも利用検討したい。)
- デザインは老舗飲食店
- BaseでECサイトをチラッとやっていてそれとかも連携できたら嬉しいと思ってる。
- Xserver使ってるけど、ドメインはないので、gmailを一旦共有するから、そのアカウントでログインして取得してほしい（取得するサイトは教えて欲しい。アフィリエイトでキャッシュバック可能なのでより安くできる）

### 要件定義

- 既存のサイトを参考にしつつ、デザインは一新する。（ordered by Genshin SEZUKI）
https://kappou-kamiya.gorp.jp/

1. トップページ（home）
2. 料理
3. 営業案内
4. 問い合わせ
5. ECサイト
6. ブログ

## Function

- レスポンシブデザイン（スマートフォン、タブレット、PCに対応）
- アニメーション効果によるリッチなユーザー体験
- コンテンツの明確な区分け（店舗理念、お品書き、店舗情報、アクセス情報）

## Feature

- HeadlessCMSでのコンテンツ管理
- EC機能

## Setup

### Dependency

- Node.js (v18以上)
- npm (v9以上)

### Installation

```bash
# リポジトリのクローン
git clone https://github.com/ManatoYamashita/kappou-kamiya.git
cd kappou-kamiya

# 依存関係のインストール
npm install
```

### Run dev server

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) にアクセスして結果を確認できます。

## Tech

- **フレームワーク**: [Next.js 15.3.1](https://nextjs.org/)
- **スタイリング**: [TailwindCSS 4](https://tailwindcss.com/)
- **フォント**: Noto Sans JP, Shippori Mincho (Google Fonts)
- **アニメーション**: CSS Transitions, Intersection Observer API

## Projects

```
kappou-kamiya/
├── app/                # Nextアプリケーションコード
│   ├── components/     # Reactコンポーネント
│   │   ├── Concept.tsx # 店舗理念セクション
│   │   ├── Footer.tsx  # フッター
│   │   ├── Header.tsx  # ヘッダー
│   │   ├── Hero.tsx    # ヒーローセクション
│   │   ├── Info.tsx    # 店舗情報セクション
│   │   └── Menu.tsx    # メニューセクション
│   ├── globals.css     # グローバルCSS
│   ├── layout.tsx      # レイアウトコンポーネント
│   └── page.tsx        # メインページコンポーネント
├── public/             # 静的ファイル
│   └── images/         # 画像ファイル
└── package.json        # 依存関係と設定
```

## Contents

サイトのコンテンツを更新するには、以下のファイルを編集してください：
(Headless CMSでの管理に移行予定)

- `app/components/Menu.tsx` - メニュー情報の更新
- `app/components/Info.tsx` - 店舗情報・営業時間の更新
- `app/components/Concept.tsx` - 店舗理念の更新

## Deployment

このプロジェクトは [Vercel](https://vercel.com) でのデプロイを想定しています。

```bash
# ビルド
npm run build

# ローカルでの動作確認
npm run start
```

## LICENSE

© 2024 割烹 神谷 All Rights Reserved.
