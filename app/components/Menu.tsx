'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

// メニューデータを整理し、カテゴリーごとにグループ化
// カテゴリー名の定義
type MenuCategory = '懐石コース' | 'お祝い・法事コース' | '牛しゃぶ・ふぐ' | '逸品料理' | 'ランチ' | 'テイクアウト';

// メニューアイテムの型定義
interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: MenuCategory;
}

// カテゴリー一覧
const menuCategories: MenuCategory[] = [
  '懐石コース',
  'お祝い・法事コース',
  '牛しゃぶ・ふぐ',
  '逸品料理',
  'ランチ',
  'テイクアウト'
];

// メニューデータ
const allMenuItems: MenuItem[] = [
  {
    id: 1,
    title: '季節の懐石 花コース',
    description: '四季折々の旬の食材を使用した本格懐石コース（全8品）',
    price: '8,800円',
    image: '/images/kamiya-cource1.webp',
    category: '懐石コース',
  },
  {
    id: 2,
    title: '季節の懐石 月コース',
    description: '伝統的な懐石料理の流れに沿った季節感あふれる献立（全8品）',
    price: '7,150円',
    image: '/images/kamiya-cource2.webp',
    category: '懐石コース',
  },
  {
    id: 3,
    title: '牛しゃぶしゃぶ・橘コース',
    description: '厳選した牛肉を使用した贅沢なしゃぶしゃぶコース',
    price: '7,700円',
    image: '/images/kamiya-cource3.webp',
    category: '牛しゃぶ・ふぐ',
  },
  {
    id: 4,
    title: 'お祝い・法事用特別コース',
    description: '伊勢海老や赤飯など、特別な席に相応しい祝いの品々',
    price: '要相談',
    image: '/images/kamiya-cource1.webp',
    category: 'お祝い・法事コース',
  },
  // 他のカテゴリー用のダミーデータを追加
  {
    id: 5,
    title: '旬の焼き魚',
    description: '季節の魚を炭火で香ばしく焼き上げました',
    price: '1,980円',
    image: '/images/kamiya-cource2.webp',
    category: '逸品料理',
  },
  {
    id: 6,
    title: '季節のランチ弁当',
    description: '季節の食材を使用した彩り豊かな弁当',
    price: '2,200円',
    image: '/images/kamiya-cource3.webp',
    category: 'ランチ',
  },
  {
    id: 7,
    title: 'テイクアウト懐石',
    description: '自宅でもお楽しみいただける特製懐石料理',
    price: '5,500円',
    image: '/images/kamiya-cource1.webp',
    category: 'テイクアウト',
  },
  // 横スクロールテスト用にダミーデータを追加
  {
    id: 8,
    title: '季節の懐石 竹コース',
    description: '四季折々の旬の食材を使用した特製懐石コース（全10品）',
    price: '10,800円',
    image: '/images/kamiya-cource3.webp',
    category: '懐石コース',
  },
  {
    id: 9,
    title: '季節の懐石 梅コース',
    description: '伝統的な懐石料理の流れに沿った季節感あふれる献立（全6品）',
    price: '5,500円',
    image: '/images/kamiya-cource2.webp',
    category: '懐石コース',
  },
];

export default function Menu() {
  // スクロールアニメーション用のref
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // 現在選択されているカテゴリーの状態
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('懐石コース');
  
  // 表示するメニューアイテムを抽出
  const filteredMenuItems = allMenuItems.filter(item => item.category === activeCategory);
  
  // スクロールアニメーションの設定
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  // カテゴリー変更時に再アニメーションするための処理
  useEffect(() => {
    // アニメーション用の要素を取得して再アニメーション
    const menuCards = sectionRef.current?.querySelectorAll('.menu-item-card');
    menuCards?.forEach((card, index) => {
      // 一度リセットしてから新しいアニメーションをトリガー
      card.classList.remove('fade-in');
      card.classList.add('opacity-0');
      
      // 少し遅延をつけて順番にフェードイン
      setTimeout(() => {
        card.classList.add('fade-in');
      }, 100 + index * 100);
    });

    // カテゴリー変更時にスクロール位置をリセット
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeCategory]);
  
  return (
    <section 
      ref={sectionRef} 
      id="menu" 
      className="h-screen py-6 md:py-8 bg-paper text-ink flex flex-col overflow-hidden"
    >
      <div className="container mx-auto px-4 flex flex-col h-full">
        <h2 className="font-mincho text-2xl md:text-3xl text-center mb-4 animate-on-scroll opacity-0">
          <span className="inline-block border-b border-accent pb-2">お品書き</span>
        </h2>
        
        {/* メインコンテンツ - フレックスで縦に伸縮させる */}
        <div className="max-w-6xl mx-auto w-full flex flex-col flex-grow overflow-hidden">
          {/* メニューカード表示エリア - 横スクロール対応 */}
          <div 
            ref={scrollContainerRef}
            className="flex-grow overflow-x-auto pb-4 mb-4 hide-scrollbar flex items-center"
          >
            <div className="flex space-x-4 px-2 min-w-max">
              {filteredMenuItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="menu-item-card animate-on-scroll opacity-0 bg-paper border border-accent/20 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-md flex-shrink-0"
                  style={{ 
                    animationDelay: `${0.2 + index * 0.1}s`,
                    width: '240px'  // カードの幅を固定
                  }}
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="240px"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-mincho text-base mb-1">{item.title}</h3>
                    <p className="text-ink/80 mb-2 text-xs">{item.description}</p>
                    <p className="font-mincho text-right text-accent text-sm">{item.price}<span className="text-xs ml-1">{item.price !== '要相談' ? '/1名様' : ''}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* カテゴリータブ - 下部に固定 */}
          <div className="animate-on-scroll opacity-0 mt-auto">
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
              {menuCategories.map((category) => (
                <button
                  type='button'
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    border transition-all duration-300 py-2 px-1 text-center font-mincho text-sm cursor-pointer
                    ${activeCategory === category 
                      ? 'bg-zinc-800 text-white border-zinc-500 font-bold shadow-md' 
                      : 'border-black text-black-700 hover:bg-zinc-100 hover:border-zinc-400 hover:text-zinc-900'}
                  `}
                  aria-pressed={activeCategory === category ? 'true' : 'false'}
                  aria-label={category}
                >
                  <span className='text-xs'>{category}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* 注釈 - さらに縮小 */}
          <div className="text-center animate-on-scroll opacity-0 text-xs md:text-sm text-ink/60">
            <p>※ 仕入れ状況により変更あり・料金は税込・サービス料10%別</p>
            <p className="font-mincho">ご予約: 050-5487-4317</p>
          </div>
        </div>
      </div>
    </section>
  );
}
