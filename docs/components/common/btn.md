# Btn Component

## 概要
`app/components/Btn.tsx` は共通ボタン。`href`有無で`Link` / `button`を自動切替し、3バリアントとスライド型ホバー演出を提供します。

## Props
```typescript
type BtnVariant = 'default' | 'primary' | 'primary-white';

interface BtnProps {
  text: string;
  href?: string;
  onClick?: () => void;
  loading?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  className?: string;
  variant?: BtnVariant; // デフォルト: 'default'
}
```

## バリアント
- `default`: 枠線付きの透過背景。ホバーでダークグレー面(#151515)がスライドし、文字色が明るく変化。
- `primary`: 黒系の主CTA (#111111 → #262626)。文字色は #f5f5f5、ホバー時は #fafafa。
- `primary-white`: 暗い背景上のCTA (#f1ecdf → #d8cfbf)。文字色は #1a1a1a、ホバー時は #0f0f0f。

> 純黒(#000)・純白(#fff)は使用せず、わずかにトーンを外した色で統一。

## スタイルとアニメーション
- ベース: `px-6 py-3.5`, `text-base`, `rounded-none`, `transition-all duration-300`, `overflow-hidden`.
- ホバー: 背景のラインアニメーション（background-position 0 → 100%）とテキスト色変化、わずかな浮き (`-translate-y-0.5` + shadow)。
- ローディング: `border-current`を用いた円形スピナーを先頭に表示し、操作を無効化。

## 使用例
```tsx
// CTA（明るい背景）
<Btn text="おせちを購入する" href={OSECHI_URL} variant="primary" />

// 暗い背景でのCTA
<Btn text="詳しく読む" href="#concept" variant="primary-white" />

// シンプルリンク
<Btn text="すべてのお知らせを見る" href="/news" variant="default" />
```

## 現在の主な適用箇所
- Hero: 主CTA「おせちの購入」＝ `primary`、補助「ご予約」＝ `default`
- Osechiセクション: CTA＝ `primary`
- Conceptセクション: テキストリンク風CTA＝ `primary-white`
- News: 一覧導線＝ `default`

## 注意点
- `href`がある場合のみ`Link`を利用。`loading`時はクリック無効化＋スピナー表示。
- バリアント追加時は背景グラデーションとhover位置指定（`bg-[length]`/`bg-[position]`）を揃えること。
