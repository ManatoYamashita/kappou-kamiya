# Menu Component

## 概要

`app/components/Menu.tsx`は、レストランのメニューを表示するセクションコンポーネントです。カテゴリーフィルタリング、水平スクロール、レスポンシブデザインに対応した高度なUI機能を提供します。

## ファイル情報

- **パス**: `app/components/Menu.tsx`
- **行数**: 252行
- **コンポーネントタイプ**: Client Component (`'use client'`)

## 主要機能

### 1. カテゴリーフィルタリング
6つのカテゴリーでメニューをフィルタリングします。

**カテゴリー一覧**:
1. 懐石コース（4件）
2. お祝い・法事コース（6件）
3. 牛しゃぶ・ふぐ（3件）
4. 逸品料理（6件）
5. ランチ（5件）
6. テイクアウト（10件）

**実装**:
```typescript
const [activeCategory, setActiveCategory] = useState<MenuCategory>('懐石コース');

const handleCategoryChange = (category: MenuCategory) => {
  setIsChanging(true); // トランジション開始
  setTimeout(() => {
    setActiveCategory(category);
    setIsChanging(false); // トランジション終了
    menuListRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, 300);
};
```

**フィルタリングロジック**:
```typescript
const filteredMenus = allMenuItems.filter(item => item.category === activeCategory);
```

### 2. 水平スクロール表示
メニューカードを水平方向にスクロール可能なレイアウトで表示します。

**スタイル**:
```typescript
<div
  ref={menuListRef}
  className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
  onScroll={handleScroll}
>
  {filteredMenus.map((item) => (
    <div className="snap-start">{/* メニューカード */}</div>
  ))}
</div>
```

**スクロール検知**:
```typescript
const handleScroll = () => {
  if (menuListRef.current) {
    const { scrollLeft, scrollWidth, clientWidth } = menuListRef.current;
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }
};
```

### 3. スクロールインジケーター
右端にスクロール可能であることを示す矢印を表示します。

```typescript
{canScrollRight && (
  <div className="absolute right-0 top-1/2 -translate-y-1/2
    bg-gradient-to-l from-paper via-paper to-transparent
    pl-16 pr-4 py-4 pointer-events-none">
    <svg className="w-8 h-8 text-accent animate-pulse">
      {/* 右矢印アイコン */}
    </svg>
  </div>
)}
```

### 4. レスポンシブボタンレイアウト
画面幅に応じてカテゴリーボタンのレイアウトを変更します。

**ブレークポイント判定**:
```typescript
useEffect(() => {
  const handleResize = () => {
    setUseCompactButtons(window.innerWidth < 768);
  };

  handleResize(); // 初期化
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**条件付きスタイル**:
```typescript
<div className={`grid gap-3 ${
  useCompactButtons
    ? 'grid-cols-3'  // モバイル: 3列
    : 'grid-cols-6'  // デスクトップ: 6列
}`}>
```

### 5. トランジションエフェクト
カテゴリー変更時にフェードアニメーションを適用します。

```typescript
<div
  className={`transition-opacity duration-300 ${
    isChanging ? 'opacity-0' : 'opacity-100'
  }`}
>
  {/* メニューカードリスト */}
</div>
```

## 状態管理

```typescript
const [activeCategory, setActiveCategory] = useState<MenuCategory>('懐石コース');
const [isChanging, setIsChanging] = useState(false);
const [canScrollRight, setCanScrollRight] = useState(false);
const [useCompactButtons, setUseCompactButtons] = useState(false);
const menuListRef = useRef<HTMLDivElement>(null);
```

## データソース

### インポート
```typescript
import { allMenuItems, menuCategories, type MenuCategory } from '../data/menu';
```

### メニューデータ構造
```typescript
interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: MenuCategory;
}
```

### 使用例
```typescript
{
  id: 1,
  title: '板長おまかせコース',
  description: '選りすぐった旬の素材を使用した本格懐石コース（全9品）',
  price: '11,000円',
  image: '/images/menu-omakase.webp',
  category: '懐石コース',
}
```

## メニューカード表示

```typescript
<div className="min-w-[280px] max-w-[320px] snap-start">
  <div className="bg-white rounded-lg shadow-lg overflow-hidden
    hover:shadow-xl transition-shadow duration-300">
    {/* 画像 */}
    <div className="relative h-48 w-full">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="320px"
        className="object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>

    {/* コンテンツ */}
    <div className="p-4">
      <h3 className="text-xl font-mincho font-bold mb-2">{item.title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
      <p className="text-2xl font-bold text-accent">{item.price}</p>
    </div>
  </div>
</div>
```

## カテゴリーボタン

```typescript
<button
  onClick={() => handleCategoryChange(category)}
  className={`px-4 py-2 rounded-full font-medium transition-all duration-300
    ${activeCategory === category
      ? 'bg-accent text-white shadow-md'
      : 'bg-white text-ink hover:bg-accent/10'
    }`}
  aria-pressed={activeCategory === category}
>
  {category}
</button>
```

## レスポンシブデザイン

| 画面幅 | ボタンレイアウト | カードサイズ | スクロール |
|---|---|---|---|
| `< 768px` | 3列 | 280px | 水平 |
| `>= 768px` | 6列 | 320px | 水平 |

## パフォーマンス最適化

### 1. 画像遅延読み込み
```typescript
<Image
  loading="lazy"
  decoding="async"
/>
```

### 2. スクロールイベントの最適化
```typescript
useEffect(() => {
  handleScroll(); // 初期チェック
}, [activeCategory]);
```

### 3. リサイズイベントのクリーンアップ
```typescript
return () => window.removeEventListener('resize', handleResize);
```

## アクセシビリティ

### ARIA属性
```typescript
<button aria-pressed={activeCategory === category}>
  {category}
</button>
```

### セマンティックHTML
```html
<section id="menu">
  <h2>お品書き</h2>
  <nav>{/* カテゴリーボタン */}</nav>
  <div role="list">{/* メニューカード */}</div>
</section>
```

## 使用例

### トップページでの使用
```typescript
// app/page.tsx
import Menu from './components/Menu';

export default function Home() {
  return (
    <main>
      {/* 他のセクション */}
      <Menu />
      {/* 他のセクション */}
    </main>
  );
}
```

## トラブルシューティング

### 問題: スクロールインジケーターが表示されない
**原因**: `canScrollRight`の計算が正しくない

**解決策**:
```typescript
// スクロール可能性を再計算
useEffect(() => {
  handleScroll();
}, [filteredMenus]);
```

### 問題: カテゴリー変更時にスクロール位置が戻らない
**原因**: `scrollTo`が実行されていない

**解決策**:
```typescript
setTimeout(() => {
  menuListRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
}, 300);
```

### 問題: モバイルでボタンが3列にならない
**原因**: リサイズイベントが実行されていない

**デバッグ**:
```typescript
console.log('useCompactButtons:', useCompactButtons);
console.log('window.innerWidth:', window.innerWidth);
```

## カスタマイズ

### カテゴリーの追加
1. `app/data/menu.ts`に新しいカテゴリーを追加
2. `MenuCategory`型に追加
3. `menuCategories`配列に追加
4. メニューアイテムを追加

### カードデザインの変更
`Menu.tsx`内のカードスタイルを修正:
```typescript
<div className="bg-white rounded-lg shadow-lg">
  {/* カスタムスタイル */}
</div>
```

## 関連ドキュメント

- [Menu Data](../../architecture/data-flow.md#静的データ管理)
- [Image Optimization](../../performance/image-optimization.md)
- [Responsive Design](../../styling/responsive-design.md)
- [Type Definitions](../../api-reference/type-definitions.md)
