# よく使うコマンド
- 開発サーバー: `npm run dev`（Turbopack, http://localhost:3000）。
- Lint: `npm run lint`（eslint . --ext .js,.jsx,.ts,.tsx）。
- TypeCheck: `npx tsc --noEmit`（スクリプト未定義時の手動実行）。
- ビルド: `npm run build`（Next build）。
- 本番起動: `npm run start`（`npm run build` 後）。
- テストは現状未導入。追加時は React Testing Library/Playwright を想定。