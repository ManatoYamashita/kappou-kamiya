# Common Issues

## 概要

割烹神谷プロジェクトでよく発生する問題と解決策をまとめています。

## ビルド・起動エラー

### エラー: MICROCMS_SERVICE_DOMAIN is required

**症状**:
```
Error: MICROCMS_SERVICE_DOMAIN is required
```

**原因**: 環境変数が設定されていない

**解決策**:
1. `.env.local`ファイルを作成
2. 環境変数を設定:
   ```bash
   MICROCMS_SERVICE_DOMAIN=your-service-id
   MICROCMS_API_KEY=your-api-key
   ```
3. サーバーを再起動: `npm run dev`

---

### エラー: Port 3000 is already in use

**症状**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**原因**: ポート3000が既に使用中

**解決策1**: 別のポートを使用
```bash
PORT=3001 npm run dev
```

**解決策2**: プロセスを終了
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### エラー: Module not found

**症状**:
```
Module not found: Can't resolve '@/components/Header'
```

**原因**: パスエイリアスまたはファイルが存在しない

**解決策**:
1. ファイルが存在するか確認
2. `tsconfig.json`のパスエイリアス確認:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```
3. `npm install`を再実行

---

## 画像関連の問題

### 画像が表示されない

**症状**: `<Image>`コンポーネントで画像が表示されない

**原因1**: 相対パス指定
```typescript
// 間違い
<Image src="images/logo.webp" ... />

// 正しい
<Image src="/images/logo.webp" ... />
```

**原因2**: リモートパターン未設定（MicroCMS画像）
```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.microcms-assets.io',
      pathname: '/assets/**',
    },
  ],
}
```

**原因3**: サイズ指定不足（`fill`使用時）
```typescript
// 親要素にrelativeとサイズ指定が必要
<div className="relative h-48 w-full">
  <Image src="/images/logo.webp" fill ... />
</div>
```

---

## ページ遷移の問題

### スクロール禁止が解除されない

**症状**: ページ遷移後もスクロールできない

**原因**: `is-changing`クラスが残っている

**解決策**:
1. ブラウザの開発者ツールで確認:
   ```javascript
   document.documentElement.classList.contains('is-changing')
   ```

2. 手動で解除:
   ```javascript
   document.documentElement.classList.remove('is-changing')
   ```

3. `PageTransition.tsx`のセーフティタイマー（5秒）を待つ

**根本的な解決**:
- `layout.tsx`のスクリプトが正しく実行されているか確認
- GSAPアニメーションの`onComplete`が呼ばれているか確認

---

### ページ遷移が遅い

**症状**: リンククリック後、ページ遷移に時間がかかる

**原因**: PageTransitionのアニメーション時間

**解決策**: アニメーション時間を短縮
```typescript
// PageTransition.tsx
gsap.to(overlayRef.current, {
  y: '0%',
  duration: 0.3, // 0.5 → 0.3に変更
  ease: 'power3.inOut'
});

setTimeout(() => {
  router.push(path);
}, 300); // 600 → 300に変更
```

---

## MicroCMS API エラー

### 401 Unauthorized

**症状**:
```
MicroCMS APIエラー [401]: Unauthorized
```

**原因**: APIキーが間違っている

**解決策**:
1. `.env.local`のAPIキーを確認
2. MicroCMSダッシュボードで正しいAPIキーを取得
3. サーバーを再起動

---

### 404 Not Found

**症状**:
```
MicroCMS APIエラー [404]: Not Found
```

**原因**: エンドポイント名が間違っている

**解決策**:
1. MicroCMSダッシュボードでエンドポイント名を確認
2. `client.get({ endpoint: 'news' })`の`news`が正しいか確認

---

### ニュースが表示されない

**症状**: トップページのニュースセクションが空

**原因**: MicroCMSにコンテンツがない

**解決策**:
1. MicroCMSダッシュボードで記事を作成
2. 記事を「公開」状態にする
3. ブラウザをリロード

---

## Hydration エラー

### Text content does not match

**症状**:
```
Warning: Text content did not match. Server: "..." Client: "..."
```

**原因**: サーバーとクライアントで異なるコンテンツ

**よくある例**:
```typescript
// 間違い: サーバーとクライアントで異なる
<div>{new Date().toString()}</div>

// 正しい: isMountedフラグ使用
const [isMounted, setIsMounted] = useState(false);
useEffect(() => { setIsMounted(true); }, []);
return isMounted ? <ClientContent /> : <ServerContent />;
```

**ロゴ動画の対策**（Header.tsx）:
```typescript
{isMounted ? (
  <video src="/images/kamiya-logo.webm" />
) : (
  <Image src="/images/kamiya-logo.webp" />
)}
```

---

## TypeScript エラー

### Type error: Property does not exist

**症状**:
```
Property 'contents' does not exist on type 'unknown'
```

**原因**: 型定義が不足

**解決策**: 型を明示的に指定
```typescript
interface NewsResponse {
  contents: Post[];
  totalCount: number;
}

const data = await client.get({ endpoint: 'news' }) as NewsResponse;
```

---

## スタイル・レイアウトの問題

### TailwindCSSクラスが適用されない

**症状**: Tailwindクラスを追加しても反映されない

**原因1**: `globals.css`のインポート順序
```typescript
// layout.tsx
import './globals.css'; // 最初にインポート
```

**原因2**: キャッシュの問題
```bash
rm -rf .next
npm run dev
```

**原因3**: カスタムクラス未定義
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'custom-color': '#123456',
    },
  },
}
```

---

### レスポンシブレイアウトが崩れる

**症状**: モバイルでレイアウトが崩れる

**原因**: ブレークポイント指定不足

**解決策**: モバイルファースト
```typescript
// 間違い
<div className="md:flex">

// 正しい
<div className="flex flex-col md:flex-row">
```

---

## パフォーマンスの問題

### ページ読み込みが遅い

**原因**: 画像の最適化不足

**解決策**:
1. Next.js Image Componentを使用
2. `priority`属性を追加（LCP画像）
3. `loading="lazy"`を追加（その他の画像）

**チェックリスト**:
- [ ] すべての画像がWebP形式
- [ ] ファーストビュー画像に`priority`
- [ ] 画像サイズが適切（< 500KB）

---

## デプロイ・本番環境の問題

### Vercelデプロイエラー

**症状**: ビルドが失敗する

**原因**: 環境変数未設定

**解決策**:
1. Vercel → Settings → Environment Variables
2. 以下を追加:
   - `MICROCMS_SERVICE_DOMAIN`
   - `MICROCMS_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`
3. 「Redeploy」をクリック

---

### 本番環境でニュースが表示されない

**原因**: 環境変数が反映されていない

**確認方法**:
1. Vercelダッシュボードで環境変数を確認
2. 環境変数変更後は再デプロイ必須

---

## その他の問題

### npm installが失敗する

**症状**:
```
npm ERR! code EINTEGRITY
```

**解決策**:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Gitが遅い

**原因**: `.next`ディレクトリがコミットされている

**解決策**:
```bash
# .gitignoreに追加
.next/
node_modules/
.env.local
```

```bash
# 既にコミットされている場合
git rm -r --cached .next
git commit -m "Remove .next from Git"
```

---

## サポート

問題が解決しない場合:

1. **ドキュメントを確認**: `/docs`ディレクトリ
2. **GitHub Issues**: バグ報告・機能リクエスト
3. **開発チームに連絡**: 技術的な問題の相談

## 関連ドキュメント

- [Page Transition Issues](./page-transition-issues.md)
- [Hydration Errors](./hydration-errors.md)
- [Getting Started](../development/getting-started.md)
- [MicroCMS Error Handling](../integrations/microcms/error-handling.md)
