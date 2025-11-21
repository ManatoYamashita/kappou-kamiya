# タスク完了時のチェック
- Lint: `npm run lint` を実行し警告/エラーゼロを確認。
- TypeCheck: `npx tsc --noEmit` で型エラーがないか確認。
- ビルド確認: `npm run build`（必要に応じ `npm run start` で動作確認）。
- 変更に伴う環境変数・設定があれば `.env.example` と README を更新。
- ドキュメント/ルール更新: 必要な知見を `docs/` または `AGENTS.md` 等へ反映。
- PR 作成時: 背景と解決策、確認済みテスト（lint/build等）、関連Issue/スクショを記載。スクショは `public/pr/` に配置。