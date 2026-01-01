# 割烹神谷プロジェクト ドキュメント

## はじめに

このドキュメントは、割烹神谷（Kappou Kamiya）プロジェクトの技術仕様、開発ガイド、運用手順をまとめたものです。

### プロジェクト概要
三代続く川口の老舗日本料理店「割烹 神谷」の公式ウェブサイト。Next.js 16 + React 19 + TailwindCSS 4を使用した現代的なHeadless CMS統合型Webアプリケーションです。

### 技術スタック
- **フレームワーク**: Next.js 16.0.10 (App Router with Turbopack)
- **React**: 19.2.3
- **スタイリング**: TailwindCSS 4.0
- **CMS**: MicroCMS
- **アニメーション**: GSAP 3.12.7, Framer Motion 12.8.0
- **AI開発ツール**: next-devtools-mcp (MCP Server)

---

## 📚 ドキュメント構成

### 🏗️ Architecture（アーキテクチャ）

プロジェクト全体の設計思想と構造を理解するためのドキュメントです。

- **[プロジェクト概要](./architecture/overview.md)**
  - プロジェクトの目的、主要機能、技術スタック、アーキテクチャの特徴

- **[ディレクトリ構造](./architecture/directory-structure.md)**
  - プロジェクト全体のディレクトリ構造と各ファイルの役割

- **[データフロー](./architecture/data-flow.md)**
  - データソース（静的/動的）、データ取得パターン、状態管理戦略

- **[コンポーネント階層](./architecture/component-hierarchy.md)**
  - コンポーネント構造、Server/Client Components、レンダリング戦略

---

### 🧩 Components（コンポーネント）

各コンポーネントの詳細な仕様と使用方法です。

#### レイアウトコンポーネント
- **[Header](./components/layout/header.md)**
  - グローバルヘッダー、スクロール連動、モバイルメニュー

- **[Footer](./components/layout/footer.md)**
  - グローバルフッター、店舗情報、サイトマップ

- **[PageTransition](./components/layout/page-transition.md)**
  - GSAPページ遷移、カスタムイベント、スクロール制御

#### セクションコンポーネント
- **[Hero](./components/sections/hero.md)**
  - ヒーローセクション、ロゴ動画、背景画像最適化

- **[Menu](./components/sections/menu.md)**
  - メニュー表示、カテゴリーフィルタ、水平スクロール

- **[News](./components/sections/news.md)**
  - ニュース一覧、MicroCMS統合、エラーハンドリング

#### 共通コンポーネント
- **[Btn](./components/common/btn.md)**
  - 汎用ボタン、Link/button自動切り替え、カラーバリエーション

---

### 🔌 Integrations（外部サービス統合）

外部サービスとの連携方法です。

#### MicroCMS
- **[Setup Guide](./integrations/microcms/setup.md)**
  - アカウント作成、API設定、Next.js統合

- **[Error Handling](./integrations/microcms/error-handling.md)**
  - エラーの種類、ハンドリングパターン、リトライロジック

#### Next.js DevTools MCP
- **[Setup Guide](./integrations/next-devtools-mcp/setup.md)**
  - MCPサーバーの設定、AI開発ツールとの統合、使用方法

---

### 🎨 Styling（スタイリング）

デザインシステムとスタイル実装の詳細です。

- **[Design System](./styling/design-system.md)**
  - カラーパレット、タイポグラフィ、スペーシング、レイアウト、和風デザイン要素

---

### ⚡ Performance（パフォーマンス最適化）

Webサイトのパフォーマンスを向上させる戦略です。

- **[Image Optimization](./performance/image-optimization.md)**
  - Next.js Image Component、WebP/AVIF、遅延読み込み、sizes属性

---

### 🔍 SEO（検索エンジン最適化）

検索エンジンでの可視性を高めるための施策です。

- **[Structured Data](./seo/structured-data.md)**
  - JSON-LD、Restaurant Schema、Event Schema、Review Schema、テスト方法

---

### 🚀 Deployment（デプロイ）

本番環境へのデプロイ手順と設定です。

- **[Environment Variables](./deployment/environment-variables.md)**
  - 環境変数の種類、設定方法、セキュリティベストプラクティス

---

### 💻 Development（開発）

開発環境のセットアップと開発ワークフローです。

- **[Getting Started](./development/getting-started.md)**
  - 前提条件、セットアップ手順、開発コマンド、IDE設定

---

### 🔧 Troubleshooting（トラブルシューティング）

よくある問題と解決策です。

- **[Common Issues](./troubleshooting/common-issues.md)**
  - ビルドエラー、画像表示問題、ページ遷移問題、APIエラー、Hydrationエラー

---

## 📖 クイックスタート

### 新規開発者向け

1. **[Getting Started](./development/getting-started.md)**を読む
2. **[Project Overview](./architecture/overview.md)**でプロジェクトを理解
3. **[Directory Structure](./architecture/directory-structure.md)**でコードベースを把握
4. 開発開始

### 既存メンバー向け

- **新機能追加**: [Component Hierarchy](./architecture/component-hierarchy.md) → 該当コンポーネントのドキュメント
- **バグ修正**: [Common Issues](./troubleshooting/common-issues.md) → 該当ドキュメント
- **デプロイ**: [Environment Variables](./deployment/environment-variables.md)

---

## 🎯 ユースケース別ガイド

### コンポーネント開発
1. [Component Hierarchy](./architecture/component-hierarchy.md)で設計を理解
2. 既存コンポーネント（例: [Header](./components/layout/header.md)）を参考に実装
3. [Design System](./styling/design-system.md)でスタイルを統一

### MicroCMS統合
1. [MicroCMS Setup](./integrations/microcms/setup.md)でセットアップ
2. [Data Flow](./architecture/data-flow.md)でデータ取得パターンを確認
3. [Error Handling](./integrations/microcms/error-handling.md)でエラー対策

### パフォーマンス改善
1. [Image Optimization](./performance/image-optimization.md)で画像を最適化
2. Lighthouse Core Web Vitalsをチェック

### SEO対策
1. [Structured Data](./seo/structured-data.md)でJSON-LDを確認
2. Google Rich Results Testで検証

---

## 🔗 重要なリンク

### 外部リソース
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [MicroCMS Documentation](https://document.microcms.io/)
- [Schema.org](https://schema.org/)

### プロジェクトファイル
- **CLAUDE.md**: Claude Code向けプロジェクトガイド
- **README.md**: プロジェクト概要
- **AGENTS.md**: リポジトリガイドライン

---

## 📝 ドキュメント更新ガイドライン

### ドキュメントの追加
1. 適切なサブディレクトリを選択（または新規作成）
2. Markdown形式で作成
3. `index.md`に追加

### ドキュメントの構造
各ドキュメントは以下の構造を推奨：

```markdown
# タイトル

## 概要
ドキュメントの目的と対象読者

## 前提条件
必要な知識や設定

## 本文
実装の詳細、使用例

## トラブルシューティング
よくある問題と解決策

## 関連ドキュメント
関連する他のドキュメントへのリンク
```

---

## 🤝 貢献

ドキュメントの改善提案や追加は歓迎します。

### 改善の提案
1. GitHubでIssueを作成
2. 改善内容を具体的に記載

### ドキュメントの追加
1. 新しいMarkdownファイルを作成
2. `index.md`に追加
3. プルリクエストを作成

---

## 📊 ドキュメント統計

| カテゴリ | ドキュメント数 |
|---|---|
| Architecture | 4 |
| Components | 7 |
| Integrations | 3 |
| Styling | 1 |
| Performance | 1 |
| SEO | 1 |
| Deployment | 1 |
| Development | 1 |
| Troubleshooting | 1 |
| **合計** | **20** |

---

## 🔄 最終更新

**更新日**: 2026-01-01

**更新内容**:
- セキュリティパッチ適用（CVE-2025-55182対応）
- Next.js 16.0.7 → 16.0.10へアップグレード
- React 19.2.1 → 19.2.3へアップグレード
- React2Shell脆弱性、DoS攻撃、ソースコード露出の修正

---

## 📞 サポート

問題が解決しない場合や質問がある場合:

1. **ドキュメント検索**: このindexから該当ドキュメントを探す
2. **Common Issues**: [よくある問題](./troubleshooting/common-issues.md)を確認
3. **GitHub Issues**: バグ報告・機能リクエスト
4. **開発チームに連絡**: 技術的な問題の相談

---

**Happy Coding! 🎉**
