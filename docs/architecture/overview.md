# プロジェクト概要

## 目的

割烹神谷（Kappou Kamiya）は、三代続く川口の老舗日本料理店の公式ウェブサイトです。このプロジェクトは、宴会ニーズ（忘年会、会食など）をターゲットとした顧客に向けて、店舗の魅力と情報を効果的に伝えることを目的としています。

## 背景と要件

### クライアント要件
- **ターゲット**: 宴会ニーズのある顧客（忘年会、会食、接待等）
- **コンテンツ管理**: ブログ・お知らせの更新が簡単にできること
- **デザイン**: 老舗飲食店らしい和風デザイン
- **将来的な拡張**: ECサイト連携の可能性

### 既存サイトからの刷新
既存サイト（https://kappou-kamiya.gorp.jp/）を参考にしつつ、デザインを一新し、現代的な技術スタックで再構築しました。

## 主要機能

### 1. レスポンシブデザイン
- モバイル、タブレット、デスクトップに対応
- モバイルファーストアプローチ
- タッチデバイス最適化

### 2. Headless CMS統合
- **MicroCMS**: ニュース・お知らせの管理
- 非技術者でも簡単にコンテンツを更新可能
- リッチテキストエディタ対応

### 3. リッチなユーザー体験
- GSAPとFramer Motionによる高度なページトランジション
- Intersection Observerによるスクロールアニメーション
- スムーズなナビゲーション

### 4. SEO最適化
- JSON-LD構造化データ（Restaurant、Event、Review、Menu）
- 動的サイトマップ生成
- OGPタグ完備
- メタデータ最適化

### 5. パフォーマンス最適化
- Next.js Image Componentによる画像最適化
- WebP/AVIF対応
- スクリプトの遅延読み込み
- フォント最適化

### 6. アナリティクス・コンプライアンス
- Google Analytics統合
- Consent Manager（GDPR/Cookie同意）

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 16.0.3（App Router + Turbopack）
- **React**: 19.0.0
- **言語**: TypeScript 5
- **スタイリング**: TailwindCSS 4.0

### アニメーション
- **GSAP**: 3.12.7（ページトランジション）
- **Framer Motion**: 12.8.0（要素アニメーション）

### CMS・データ管理
- **MicroCMS**: microcms-js-sdk 3.2.0
- **日付処理**: dayjs 1.11.13

### フォント
- **Noto Sans JP**: ゴシック体（UI要素）
- **Shippori Mincho**: 明朝体（見出し、和風テキスト）

### デプロイ・インフラ
- **ホスティング**: Vercel（推奨）
- **CDN**: Vercel Edge Network
- **ドメイン**: k-kamiya.net

### 外部サービス
- **アナリティクス**: Google Analytics（G-KQMT9X4Q9Z）
- **同意管理**: Consent Manager
- **地図**: Google Maps埋め込み

## アーキテクチャの特徴

### 1. Server Components優先
- 可能な限りReact Server Components（RSC）を使用
- クライアントコンポーネントは必要最小限（`'use client'`の最小化）
- サーバー側でのデータフェッチングによるパフォーマンス向上

### 2. Static Site Generation（SSG）
- ニュース記事は`generateStaticParams`で静的生成
- ビルド時に全ページを事前生成
- Incremental Static Regeneration（ISR）対応

### 3. Headless CMS分離
- フロントエンドとコンテンツ管理の完全分離
- APIベースのコンテンツ取得
- コンテンツ更新時の自動リビルド（Vercel Webhook対応可能）

### 4. モジュール設計
- 再利用可能なコンポーネント設計
- 関心の分離（Layout/Section/Common）
- 型安全性の徹底

### 5. SEO & パフォーマンス
- Core Web Vitals最適化
- 構造化データによるリッチスニペット対応
- 画像・フォント・スクリプトの最適化

## プロジェクト規模

### コードベース
- **総ファイル数**: 約50ファイル
- **TypeScript/TSXファイル**: 20ファイル
- **主要コンポーネント**: 12コンポーネント
- **ページ**: 3ページ（トップ、ニュース一覧、ニュース詳細）

### データ
- **静的メニューアイテム**: 34件（6カテゴリー）
- **画像アセット**: 41ファイル（WebP形式）

## 開発体制

### 開発ツール
- **IDE**: Cursor / Visual Studio Code
- **バージョン管理**: Git / GitHub
- **パッケージマネージャー**: npm

### コーディング規約
- `.cursor/rules/nextjs15-react19-cursorrulues.mdc`に定義
- TypeScript strictモード
- ESLint（Next.js推奨設定）

## 将来の拡張計画

### Phase 2機能（検討中）
1. **EC機能**: Base連携またはStripe統合
2. **予約システム**: オンライン予約機能
3. **多言語対応**: 英語・中国語サイト
4. **会員機能**: ポイントシステム等

### パフォーマンス改善（継続）
- Core Web Vitalsの継続的改善
- バンドルサイズの最適化
- キャッシュ戦略の最適化

## 関連ドキュメント

- [ディレクトリ構造](./directory-structure.md)
- [データフロー](./data-flow.md)
- [コンポーネント階層](./component-hierarchy.md)
- [開発環境セットアップ](../development/getting-started.md)

## 更新履歴

- **2024-11**: プロジェクト初回リリース
- **2024-11**: サイトマップとrobots.txt追加
- **2024-11**: Google Analytics統合
- **2024-11**: Consent Manager導入
- **2024-11**: JSON-LD Event image対応
