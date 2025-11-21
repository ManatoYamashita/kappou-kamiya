# スタイル/コーディング規約
- TypeScript + React Server Components をデフォルト、クライアント機能のみ `'use client'`。
- インデント2スペース、コンポーネントはPascalCase、フック/ユーティリティはcamelCase。
- Tailwind v4 クラスはレイアウト→色→アニメーション順で並べる。カスタム色: paper(#f7f4ed)/ink(#333)/accent(#8b4513)。
- 型は interface 優先、enum非推奨。命名: イベントハンドラ`handle*`, 真偽値`is/has`。
- ルーティング: `app/` にページ、共通UIは `app/components/`、データは `app/data/`、外部連携は `libs/` に集約。
- Commit メッセージ形式: `FEATURE: ...` や `FIX: ...` 等（タイプ: 文頭大文字）。
- Docs/ルール未更新でのマージは禁止。変更時は docs への反映を検討。