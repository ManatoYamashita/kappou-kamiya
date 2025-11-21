# Footer Component

## 概要
`app/components/Footer.tsx` は全ページ共通のフッター。ロゴ（非ループ動画）、店舗情報、営業時間、サイト内リンク、コピーライトを表示します。

## 主要仕様
- **ロゴ**: WebMをマウント後に自動再生するが `loop` はしない。`poster`にWebPを指定し、フォールバックとして画像を用意。
- **見出し**: セクションタイトルはすべて太字。
- **リンク**: 店舗理念 / お品書き / お知らせ / おせちの購入 / 店舗情報 / アクセス を掲載。TELは `tel:` で発信可能に。
- **営業時間**: テキストでランチ・ディナー・定休日を表示。
- **レイアウト**: 3カラム（店舗情報/営業時間/リンク）＋下部のコピーライト。

## スニペット
```tsx
// ロゴ（1回再生）
{isMounted ? (
  <video ref={videoRef} autoPlay muted playsInline poster="/images/kamiya-logo.webp">
    <source src="/images/kamiya-logo.webm" type="video/webm" />
  </video>
) : (
  <Image src="/images/kamiya-logo.webp" alt="割烹 神谷 ロゴ" width={96} height={96} />
)}

// リンク
<ul>
  <li><Link href="/#concept">店舗理念</Link></li>
  <li><Link href="/#menu">お品書き</Link></li>
  <li><Link href="/news">お知らせ</Link></li>
  <li><Link href="/#osechi">おせちの購入</Link></li>
  <li><Link href="/#info">店舗情報</Link></li>
  <li><Link href="/#access">アクセス</Link></li>
</ul>
```

## レスポンシブ
- モバイル: 1カラム縦並び。
- デスクトップ: 3カラム並列。

## 注意点
- ループ動画は禁止（背景透過されない動画は使用しない）。`poster`は必ず設定。
- 見出しは `font-bold` を維持し、リンク構成を変更する場合はHeaderと整合を取る。***
