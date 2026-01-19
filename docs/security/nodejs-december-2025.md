# Node.js December 2025 セキュリティリリース対応

## 概要

**対応日**: 2026-01-19

Node.js December 2025セキュリティリリースで公開された**3件の高度脆弱性**に対応するため、プロジェクト全体のNode.jsバージョンを**22.22.0以上**に更新しました。

## 脆弱性の詳細

### CVE-2025-55131 (CVSS 8.1) - High

**タイトル**: Buffer/Uint8Arrayのメモリ漏洩

**影響範囲**:
- Node.js 20系: 20.20.0未満
- Node.js 22系: 22.22.0未満
- Node.js 24系: 24.13.0未満
- Node.js 25系: 25.3.0未満

**詳細**:
Buffer/Uint8Arrayを使用する際、メモリが適切にクリアされず、以前のデータが漏洩する可能性があります。これにより、トークン、パスワード、APIキーなどの機密情報が攻撃者に漏洩するリスクがあります。

**攻撃シナリオ**:
1. アプリケーションがBufferを使用してトークンを処理
2. Buffer再利用時に以前のデータが残留
3. 攻撃者が漏洩したメモリ領域を読み取り
4. 機密情報を取得

**影響度**: **High** - 認証情報の漏洩により、アカウント乗っ取りやデータ侵害が発生

---

### CVE-2025-55130 (CVSS 7.7) - High

**タイトル**: シンボリックリンク経由のファイルシステム権限バイパス

**影響範囲**: CVE-2025-55131と同様

**詳細**:
シンボリックリンクを使用することで、ファイルシステムのアクセス制限をバイパスし、本来アクセスできないファイル（例: `/etc/passwd`, `/etc/shadow`, `.env`）を読み取ることが可能です。

**攻撃シナリオ**:
1. 攻撃者がアップロード機能を悪用
2. 悪意のあるシンボリックリンクをアップロード
3. アプリケーションがシンボリックリンクを辿る
4. 権限外のファイルにアクセス

**影響度**: **High** - システムファイルや環境変数の読み取りにより、権限昇格やクレデンシャル漏洩が発生

---

### CVE-2025-59465 (CVSS 7.5) - High

**タイトル**: HTTP/2不正HEADERSフレームによるサーバークラッシュ

**影響範囲**: CVE-2025-55131と同様

**詳細**:
不正な形式のHTTP/2 HEADERSフレームを送信することで、Node.jsサーバー全体をクラッシュさせることが可能です。これにより、DoS（Denial of Service）攻撃が容易に実行できます。

**攻撃シナリオ**:
1. 攻撃者がHTTP/2接続を確立
2. 不正なHEADERSフレームを送信
3. サーバープロセスがクラッシュ
4. サービス全体が停止

**影響度**: **High** - サービス全体の停止により、ビジネスへの重大な影響が発生

---

## 修正バージョン

| Node.jsバージョン | 修正バージョン | ステータス |
|---|---|---|
| Node.js 20系 | 20.20.0以上 | ✅ 修正済み |
| Node.js 22系 | **22.22.0以上** | ✅ 修正済み（推奨） |
| Node.js 24系 | 24.13.0以上 | ✅ 修正済み |
| Node.js 25系 | 25.3.0以上 | ✅ 修正済み |

---

## 本プロジェクトの対応内容

### 選定バージョン: Node.js 22.22.0

**選定理由**:
1. ローカル環境が既にv22系を使用しており、移行コストが最小
2. Node.js 22は2024年10月からLTS（Long-Term Support）に移行済み
3. Next.js 16 + React 19は最新Node.js機能で最適化されている
4. 20系より新しい機能とパフォーマンスを享受できる

---

### 変更ファイル一覧

#### 新規作成（2ファイル）

1. **`.nvmrc`**
   - **目的**: ローカル開発環境とVercelデプロイでのバージョン統一
   - **内容**: `22.22.0`
   - **効果**: `nvm use`で自動的に正しいバージョンを使用

2. **`docs/security/nodejs-december-2025.md`**（本ドキュメント）
   - **目的**: セキュリティ対応の記録と知見共有
   - **内容**: 脆弱性詳細、対応手順、検証方法

#### 更新（6ファイル）

1. **`package.json`**
   - **変更内容**: `engines`フィールドを追加
   ```json
   "engines": {
     "node": ">=22.22.0",
     "npm": ">=10.0.0"
   }
   ```
   - **効果**: 古いNode.jsでの`npm install`/`npm ci`を拒否

2. **`.github/workflows/feature-ci.yml`**
   - **変更箇所**: 24行目
   - **Before**: `node-version: 20`
   - **After**: `node-version: 22.22.0`
   - **効果**: CI環境でセキュリティパッチ適用済みバージョンを使用

3. **`CLAUDE.md`**
   - **変更箇所**: 15-16行目付近
   - **Before**: `Node.js 20.9+`
   - **After**: `Node.js 22.22.0+`（または20.20.0+）
   - **追加**: セキュリティ警告文

4. **`README.md`**
   - **変更箇所**: 24-25行目付近
   - **Before**: `前提: Node.js 18+, npm 9+`
   - **After**: `前提: Node.js 22.22.0+, npm 10+`

5. **`docs/development/getting-started.md`**
   - **変更1**: 前提条件テーブル（10-14行目付近）
     - Node.js: 18以上 → 22.22.0以上
     - npm: 9以上 → 10以上
   - **変更2**: 新規セクション「### Node.jsバージョン管理」を追加
     - nvmのインストール方法
     - `.nvmrc`の使用方法
     - セキュリティ注意事項

6. **`docs/index.md`**
   - **変更1**: 新規セクション「### 🔒 Security」を追加
   - **変更2**: ドキュメント統計テーブルを更新（20→21）
   - **変更3**: 最終更新セクションを更新

---

## 検証方法

### ローカル環境での検証

#### 1. Node.jsバージョン更新

**nvmを使用する場合（推奨）**:
```bash
# プロジェクトディレクトリに移動
cd kappou-kamiya

# .nvmrcから自動読み込み
nvm use

# バージョン確認
node --version
# 出力: v22.22.0
```

**nvmがインストールされていない場合**:
```bash
# nvmのインストール
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# シェル再起動
source ~/.bashrc  # または source ~/.zshrc

# Node.js 22.22.0のインストール
nvm install 22.22.0
nvm use 22.22.0
```

**直接インストールする場合**:
1. [Node.js公式サイト](https://nodejs.org/)から22.22.0以上をダウンロード
2. インストーラーを実行
3. バージョン確認: `node --version`

#### 2. クリーンインストール

```bash
# 既存のnode_modulesとロックファイルを削除
rm -rf node_modules package-lock.json

# 依存関係を再インストール
npm install
```

**期待される結果**:
- `npm install`が正常に完了
- エラーが発生しない
- `package-lock.json`が再生成される

#### 3. リンター実行

```bash
npm run lint
```

**期待される結果**:
```
✔ No ESLint warnings or errors
```

#### 4. 型チェック

```bash
npm run typecheck
```

**期待される結果**:
```
No TypeScript errors found
```

#### 5. ビルド

```bash
npm run build:turbopack
```

**期待される結果**:
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

#### 6. ローカルサーバー起動

```bash
npm run dev
```

**期待される結果**:
- サーバーが起動
- http://localhost:3000 にアクセス可能
- ページが正常に表示される
- コンソールにエラーが表示されない

---

### CI環境での検証

featureブランチにpushすると、GitHub Actionsが自動実行されます。

#### 確認項目

1. **Lint**: success
2. **TypeCheck**: success
3. **Build (Turbopack)**: success
4. **Node.jsバージョン**: 22.22.0が使用されている

#### GitHub Actionsログの確認方法

1. GitHubリポジトリのActionsタブにアクセス
2. 最新のワークフロー実行を選択
3. "Setup Node.js"ステップを展開
4. 以下の出力を確認:
```
Setup Node.js
Node version: 22.22.0
```

---

### Vercel環境での検証（PRマージ後）

#### デプロイ手順

1. PRをmainブランチにマージ
2. Vercelが自動デプロイ

#### 確認項目

1. **デプロイログの確認**:
   - Vercelダッシュボードにアクセス
   - 最新のデプロイを選択
   - ビルドログを確認
   - Node.js 22.22.0以上が使用されていることを確認

   **期待されるログ**:
   ```
   Installing dependencies...
   Node.js version: 22.22.0
   npm version: 10.x.x
   ```

2. **ビルド成功**:
   - ビルドが正常に完了
   - エラーが発生しない

3. **本番環境での動作確認**:
   - デプロイされたURLにアクセス
   - すべてのページが正常に表示される
   - ブラウザコンソールにエラーが表示されない

---

## トラブルシューティング

### 問題1: `npm install`が失敗する

**エラーメッセージ例**:
```
error The engine "node" is incompatible with this module. Expected version ">=22.22.0". Got "20.9.0"
```

**原因**: Node.jsバージョンが22.22.0未満

**解決策**:
```bash
# nvmを使用する場合
nvm install 22.22.0
nvm use 22.22.0

# または直接インストール
# https://nodejs.org/ から22.22.0以上をダウンロード
```

---

### 問題2: Vercelデプロイで古いNode.jsが使用される

**症状**: Vercelビルドログで`Node.js version: 20.x.x`と表示される

**原因**: `.nvmrc`がVercelにpushされていない、またはVercel設定が優先されている

**解決策**:

1. **`.nvmrc`の存在確認**:
```bash
git ls-files .nvmrc
# 出力があればOK
```

2. **Vercel設定の確認**:
   - Vercelダッシュボード → Project Settings → General
   - "Node.js Version"セクションを確認
   - "Auto"または"22.x"に設定されているか確認

3. **強制再デプロイ**:
   - Vercelダッシュボード → Deployments
   - 最新デプロイの"..."メニュー → "Redeploy"

---

### 問題3: GitHub Actionsで`node-version: 22.22.0`が反映されない

**症状**: CI実行時に`Node.js 20.x`が使用される

**原因**: ワークフローファイルの変更がpushされていない

**解決策**:

1. **ファイル変更の確認**:
```bash
git diff .github/workflows/feature-ci.yml
```

2. **変更がない場合**:
```bash
# ファイルを編集
# 24行目: node-version: 22.22.0

git add .github/workflows/feature-ci.yml
git commit -m "SECURITY: GitHub ActionsのNode.jsバージョンを22.22.0に固定"
git push
```

---

### 問題4: ローカルで`nvm use`が`.nvmrc`を認識しない

**症状**: `nvm use`実行時にエラーが発生

**エラーメッセージ例**:
```
.nvmrc: No such file or directory
```

**原因**: プロジェクトルートディレクトリにいない

**解決策**:
```bash
# プロジェクトルートに移動
cd /path/to/kappou-kamiya

# 確認
ls -la .nvmrc

# nvmを使用
nvm use
```

---

### 問題5: `npm run build`でメモリエラーが発生

**エラーメッセージ例**:
```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

**原因**: Node.js 22系でのデフォルトヒープサイズ

**解決策**:
```bash
# ヒープサイズを増やしてビルド
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

**恒久対策**: `package.json`のスクリプトを更新
```json
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' next build",
  "build:turbopack": "NODE_OPTIONS='--max-old-space-size=4096' next build --turbopack"
}
```

---

## セキュリティベストプラクティス

### 1. 定期的なNode.jsバージョン更新

**推奨頻度**: 月1回

**チェック項目**:
- [Node.js Security Releases](https://nodejs.org/en/blog/vulnerability/)
- [GitHub Security Advisories](https://github.com/advisories)

### 2. 依存関係の脆弱性スキャン

**ツール**:
- `npm audit`（組み込み）
- Dependabot（GitHub）
- Snyk
- Socket Security

**実行方法**:
```bash
# 脆弱性スキャン
npm audit

# 自動修正（可能な場合）
npm audit fix

# 強制修正（破壊的変更を含む）
npm audit fix --force
```

### 3. 環境変数の適切な管理

**禁止事項**:
- `.env.local`をgitにコミットしない
- 環境変数をログに出力しない
- クライアントサイドで機密情報を使用しない

**推奨事項**:
- `.env.example`をテンプレートとして用意
- `NEXT_PUBLIC_`プレフィックスは公開情報のみに使用
- Vercelの環境変数機能を使用

### 4. セキュリティヘッダーの設定

`next.config.ts`で設定済み:
```typescript
headers: async () => [
  {
    source: '/:path*',
    headers: [
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
    ],
  },
],
```

---

## 参考リンク

### 公式情報

- [Node.js Official Security Release](https://nodejs.org/en/blog/vulnerability/december-2025-security-releases)
- [Node.js Release Schedule](https://nodejs.org/en/about/previous-releases)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

### 脆弱性詳細

- [Endor Labs: Multiple Vulnerabilities Fixed in Node.js](https://www.endorlabs.com/learn/eight-for-one-multiple-vulnerabilities-fixed-in-the-node-js-runtime)
- [GBHackers: Node.js Security Release](https://gbhackers.com/node-js-security-release-fixes-7-vulnerabilities/)

### ツール

- [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm)
- [Vercel Node.js Version](https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-version)

---

## 次回のアクション

### 短期（PRマージ後）

- [ ] チーム全体にNode.js 22.22.0以上への更新を周知
- [ ] Vercelデプロイログでバージョン確認
- [ ] 本番環境の動作確認

### 中期（1週間以内）

- [ ] ステージング環境、テスト環境のNode.jsバージョン確認
- [ ] Node.jsセキュリティアドバイザリの定期確認プロセス策定
- [ ] 新規メンバーオンボーディング資料にセキュリティ要件を追加

### 長期（1ヶ月以内）

- [ ] RenovateBotまたはDependabotの導入検討
- [ ] `docs/security/security-policy.md`の作成
- [ ] セキュリティインシデント対応フローの策定

---

**最終更新**: 2026-01-19
**対応者**: Claude Sonnet 4.5
**承認者**: @ManatoYamashita
