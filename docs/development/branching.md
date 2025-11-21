# ブランチ運用ルール

本プロジェクトでは `main` を唯一のデプロイ基盤とし、直接 push を禁止します。すべての変更は `feature/**` ブランチで行い、プルリクエスト（PR）を通じて `main` に反映します。

## ポリシー
- `main` への直接 push 禁止（必ず PR 経由）。
- 作業ブランチ: `feature/<作業内容>` 形式で作成する。
  - 例: `feature/add-news-carousel`, `feature/fix-hero-spacing`
- 1 PR = 1 目的（混在禁止）。小さく早いマージを推奨。

## 運用フロー
1. 作業開始: `git checkout -b feature/<作業内容>`
2. 実装・修正: コミットは `FEATURE:` `FIX:` など規約に従う。
3. ローカル確認: `npm run lint` / `npm run typecheck` / `npm run build:turbopack`
4. push: `git push origin feature/<作業内容>`
5. PR 作成: ベースは必ず `main`
   - GitHub Actions が feature/** push 時に lint/typecheck/Turbopack build を実行し、成功時は `main` 向け PR を自動生成します。既存 PR がある場合はそれを継続利用してください。
6. レビュー・マージ: CI Green を確認し、レビュー通過後に `main` へマージ。

## PR チェックリスト
- テスト/ビルド: `npm run lint`, `npm run typecheck`, `npm run build:turbopack` を実施し、結果をPRに記載。
- 変更概要と背景を簡潔に記述。関連 Issue があればリンクする。
- スクリーンショットが必要なUI変更は `public/pr/` 配下に保存して添付。

## 禁止事項
- `main` への直接 push
- 目的の異なる変更を 1 PR に混在させること
- CI 失敗状態でのマージ依頼
