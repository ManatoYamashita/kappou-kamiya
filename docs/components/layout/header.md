# Header Component

## 概要
`app/components/Header.tsx` はグローバルヘッダー。スクロール位置とHero可視領域に応じて表示を切り替え、PC/モバイル両方のナビを提供します。ロゴはWebP固定（動画は使用しない）。

## 主要仕様
- **表示制御**: スクロール50px超で背景を半透明化。トップページではHeroが画面内にある間ヘッダーを隠す。
- **ナビ項目**: お品書き / おせちの購入 / 店舗情報 / ご予約（TEL）。デスクトップは横並び、モバイルはスライドインメニュー。
- **ロゴ**: 常に`/images/kamiya-logo.webp`（固定画像）。自動再生動画は使用しない。
- **ハンバーガー**: 3本線の開閉アニメーション、`aria-label`で開閉状態を明示。

## スニペット
```tsx
const isHomePage = pathname === '/';
useEffect(() => {
  const handleScroll = () => { /* スクロール量とHero位置で制御 */ };
  window.addEventListener('scroll', handleScroll);
  handleScroll();
  return () => window.removeEventListener('scroll', handleScroll);
}, [isHomePage]);

const navItems = [
  { href: '/#menu', label: 'お品書き' },
  { href: '/#osechi', label: 'おせちの購入' },
  { href: '/#info', label: '店舗情報' },
  { href: 'tel:050-5487-4317', label: 'ご予約' }
];
```

## レスポンシブ
- `< 768px`: ハンバーガー + 全画面スライドインメニュー。
- `>= 768px`: 横並びメニュー。スクロール時に背景にブラーと透過を付与。

## 注意点
- ロゴは動画に戻さない。背景透過されないアセットの利用は禁止。
- ナビ項目は上記4件を基本とし、変更時はHeader/Footer双方のリンク整合を確認。
