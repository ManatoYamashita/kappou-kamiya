'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// メニューデータ
const menuItems = [
  {
    id: 1,
    title: '季節の懐石 花コース',
    description: '四季折々の旬の食材を使用した本格懐石コース（全8品）',
    price: '8,800円',
    image: '/images/ja-placeholder.webp',
    season: '春夏秋冬',
  },
  {
    id: 2,
    title: '季節の懐石 月コース',
    description: '伝統的な懐石料理の流れに沿った季節感あふれる献立（全8品）',
    price: '7,150円',
    image: '/images/ja-placeholder.webp',
    season: '春夏秋冬',
  },
  {
    id: 3,
    title: '牛しゃぶしゃぶ・橘コース',
    description: '厳選した牛肉を使用した贅沢なしゃぶしゃぶコース',
    price: '7,700円',
    image: '/images/ja-placeholder.webp',
    season: '秋冬',
  },
  {
    id: 4,
    title: 'お祝い・法事用特別コース',
    description: '伊勢海老や赤飯など、特別な席に相応しい祝いの品々',
    price: '要相談',
    image: '/images/ja-placeholder.webp',
    season: '通年',
  },
];

// その他メニュー
const otherMenus = [
  { id: 1, name: '懐石コース' },
  { id: 2, name: 'お祝い・ご法事' },
  { id: 3, name: '牛しゃぶ・ふぐ' },
  { id: 4, name: '逸品料理' },
  { id: 5, name: '昼ごはん/ランチ' },
  { id: 6, name: 'テイクアウト出前' },
];

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null);
  
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
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="menu" className="py-24 md:py-36 luxury-bg text-paper overflow-hidden">
      {/* 背景の水墨風模様 */}
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light">
        <div className="h-full w-full paper-texture"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* セクションタイトル */}
        <div className="relative mb-20">
          <h2 className="font-mincho text-3xl md:text-4xl text-center animate-on-scroll opacity-0">
            <span className="inline-block border-b border-accent pb-2 tracking-wider">お品書き</span>
          </h2>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-accent to-transparent opacity-50 mt-4"></div>
        </div>
        
        {/* メインコース */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {menuItems.map((item, index) => (
            <div 
              key={item.id} 
              className="animate-on-scroll opacity-0 menu-card overflow-hidden"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* 季節表示 */}
              <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-accent/80 text-xs tracking-wider font-medium rounded-sm">
                {item.season}
              </div>
              
              {/* 画像 */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              {/* コース情報 */}
              <div className="p-6 relative">
                <div className="absolute top-0 right-0 w-24 h-24 japanese-pattern opacity-10"></div>
                <h3 className="font-mincho text-xl mb-2 text-accent tracking-wider">{item.title}</h3>
                <p className="text-paper/80 mb-4 text-sm leading-relaxed">{item.description}</p>
                <div className="flex justify-between items-end">
                  <div className="w-12 h-px bg-accent/30"></div>
                  <p className="font-mincho text-accent text-lg">
                    {item.price}
                    <span className="text-sm ml-1 text-paper/60">/1名様</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* その他のメニュー */}
        <div className="max-w-5xl mx-auto mt-20 animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
          <div className="relative mb-10">
            <h3 className="font-mincho text-2xl text-center">
              <span className="inline-block border-b border-accent/70 pb-2 tracking-wider">その他メニュー</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {otherMenus.map((menu) => (
              <div 
                key={menu.id} 
                className="japanese-border p-5 text-center hover:bg-accent/10 transition-all duration-500 group cursor-pointer"
              >
                <p className="font-mincho tracking-wider relative inline-block">
                  {menu.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* 注意書きと予約案内 */}
        <div className="text-center mt-16 animate-on-scroll opacity-0" style={{ animationDelay: '0.8s' }}>
          <p className="text-paper/70 mb-6 text-sm">
            ※ 仕入れ状況により、内容が変更になる場合がございます。<br />
            ※ 料金は全て税込・サービス料10%別途頂戴いたします。
          </p>
          
          {/* 予約ボタン */}
          <div className="mt-10">
            <p className="font-mincho text-lg mb-4 tracking-wider">
              ご予約・お問い合わせ
            </p>
            <a 
              href="tel:050-5487-4317" 
              className="btn-japanese inline-flex items-center tracking-wider"
            >
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              050-5487-4317
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
