# Hero Component

## 概要
`app/components/Hero.tsx` はトップページのファーストビュー。ロゴ動画（非ループ）、背景画像、簡素なナビ、主CTA（おせち購入）と補助CTA（ご予約）で構成します。

## 主要仕様
- **ロゴ動画**: WebMをマウント後に自動再生。`loop`しない。`poster`にWebPを指定し、マウント前は画像フォールバック。
- **ナビ**: お知らせ / お料理 / 店舗情報へのリンクのみ。
- **CTA**: `Btn`で「おせちの購入」を `variant="primary"`、補助「ご予約」を `variant="default"`。
- **背景画像**: `/images/kamiya-cover.webp` をLCP優先で読み込み（`priority`, `loading='eager'`）。
- **レスポンシブ**: モバイルでは画像を中央、デスクトップでは左右2カラム（左コンテンツ+右ビジュアル）。

## スニペット
```tsx
// ロゴ（非ループ）
{isMounted ? (
  <video ref={videoRef} autoPlay muted playsInline poster="/images/kamiya-logo.webp">
    <source src="/images/kamiya-logo.webm" type="video/webm" />
  </video>
) : (
  <Image src="/images/kamiya-logo.webp" alt="割烹 神谷 ロゴ" width={128} height={128} />
)}

// CTA
<Btn text="おせちの購入" href={OSECHI_URL} variant="primary" />
<Btn text="ご予約" href="#reserve" variant="default" />
```

## Header連動
`id="hero-section"`を基準に、Headerはスクロール位置を監視して表示/非表示を切り替えます（Intersection Observerではなくスクロールイベント+位置計算）。

## 注意点
- ループ再生を避け、背景透過を確実にするため`poster`もWebPで用意。
- CTAは日本語のみで統一し、主CTAは常におせち購入を指す。補助CTAは予約導線に限定。
