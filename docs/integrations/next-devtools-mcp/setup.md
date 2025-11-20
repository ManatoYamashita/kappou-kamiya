# Next.js DevTools MCP Setup

## 概要

Next.js DevTools MCPは、MCP（Model Context Protocol）を使用して、AI開発ツール（Claude Code、Cursor、Copilotなど）とNext.js開発サーバーを統合するための公式ツールです。Next.js 16から正式にサポートされています。

## 前提条件

### 必須要件
- **Next.js**: 16.0.0以上
- **Node.js**: 20.9以上
- **MCP対応のAIツール**: Claude Code、Cursor、GitHub Copilot等

## セットアップ手順

### 1. プロジェクトルートに.mcp.jsonを作成

```bash
touch .mcp.json
```

### 2. .mcp.jsonに設定を追加

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

### 3. 開発サーバーを起動

```bash
npm run dev
```

Next.js 16の開発サーバーは、起動時に自動的に`/_next/mcp`エンドポイントを公開します。`next-devtools-mcp`パッケージは、このエンドポイントを自動検出して接続します。

## 提供される機能

### 1. ランタイム診断
- ビルドエラーのリアルタイム表示
- ランタイムエラーの詳細な診断
- TypeScript型エラーの確認
- アプリケーションルートの一覧
- ページメタデータの確認
- Server Action定義の表示
- 開発サーバーログの統合表示
- プロジェクト設定の確認

### 2. ドキュメントアクセス
- Next.jsコアメカニズムの詳細情報
- キャッシング戦略のベストプラクティス
- Request APIの使用方法
- ビルド動作の理解
- エラーパターンと解決策
- 最新のベストプラクティス

### 3. アップグレード自動化
- Next.js 16へのアップグレードガイド
- 自動codemod実行
- Breaking changesの段階的な対応支援

## 使用方法

### Claude Codeでの使用

1. **セッション開始時の初期化**

MCPサーバーを使用する前に、`init`ツールを呼び出してコンテキストを設定します。

```
init tool を実行
```

2. **エラー診断**

ビルドエラーやランタイムエラーが発生した場合、AIアシスタントに質問するだけで、MCPサーバーが自動的に診断情報を取得します。

```
「ビルドエラーの原因を教えて」
「ランタイムエラーを解決して」
```

3. **ルート情報の確認**

```
「アプリケーションのルート一覧を表示して」
```

4. **ページメタデータの確認**

```
「トップページのメタデータを確認して」
```

### Cursorでの使用

Cursorでは、`.mcp.json`の設定が自動的に読み込まれ、Next.js開発サーバーとの統合が有効になります。

1. Cursorを開く
2. Next.jsプロジェクトで`npm run dev`を実行
3. Cursorのチャットで「ビルドエラーを確認」などと質問

## トラブルシューティング

### MCPサーバーが接続しない

**症状**: AIアシスタントがNext.jsの診断情報にアクセスできない

**原因1**: 開発サーバーが起動していない
```bash
# 解決策: 開発サーバーを起動
npm run dev
```

**原因2**: .mcp.jsonの設定が間違っている
```json
// 正しい設定を確認
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    }
  }
}
```

**原因3**: Next.jsのバージョンが16未満
```bash
# バージョン確認
npm list next

# Next.js 16にアップグレード
npm install next@latest react@latest react-dom@latest
```

### エラー: Failed to connect to MCP endpoint

**症状**: `Failed to connect to MCP endpoint at /_next/mcp`

**原因**: ポートが異なる、またはネットワーク設定の問題

**解決策**:
1. 開発サーバーが正常に起動しているか確認
2. ブラウザで`http://localhost:3000/_next/mcp`にアクセスして、エンドポイントが応答するか確認
3. ファイアウォール設定を確認

### パフォーマンスへの影響

**質問**: MCPサーバーは開発サーバーのパフォーマンスに影響しますか？

**回答**: MCPサーバーは、AIアシスタントがリクエストしたときのみ情報を提供するため、通常の開発体験には影響しません。

## ベストプラクティス

### 1. セッション開始時にinitツールを実行
MCPサーバーを使用する前に、必ず`init`ツールを実行して、AIアシスタントが最新のNext.jsドキュメントを参照できるようにします。

### 2. 具体的な質問をする
「エラーが発生した」よりも「ビルドエラーの原因と解決策を教えて」のように具体的に質問することで、MCPサーバーがより適切な情報を提供できます。

### 3. 開発サーバーを常に起動
MCPサーバーは開発サーバーが起動している間のみ機能します。開発中は常に`npm run dev`を実行しておきましょう。

## セキュリティ

### ローカル環境のみで動作
MCPサーバーは、ローカルの開発サーバーとのみ通信します。本番環境では無効化されます。

### 機密情報の取り扱い
MCPサーバーは、環境変数やAPIキーなどの機密情報を外部に送信しません。すべての診断情報はローカルで処理されます。

## 関連ドキュメント

- [Next.js 16リリースノート](https://nextjs.org/blog/next-16)
- [Next.js MCP公式ガイド](https://nextjs.org/docs/app/guides/mcp)
- [MCP公式サイト](https://modelcontextprotocol.io/)
- [Getting Started](../../development/getting-started.md)
- [Common Issues](../../troubleshooting/common-issues.md)

## 参考リンク

- [GitHub: vercel/next-devtools-mcp](https://github.com/vercel/next-devtools-mcp)
- [npm: next-devtools-mcp](https://www.npmjs.com/package/next-devtools-mcp)
