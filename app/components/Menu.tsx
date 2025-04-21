'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

const menuItems = [
  {
    id: 1,
    title: '季節の懐石 花コース',
    description: '四季折々の旬の食材を使用した本格懐石コース（全8品）',
    price: '8,800円',
    image: '/images/kamiya-cource1.webp',
  },
  {
    id: 2,
    title: '季節の懐石 月コース',
    description: '伝統的な懐石料理の流れに沿った季節感あふれる献立（全8品）',
    price: '7,150円',
    image: '/images/kamiya-cource2.webp',
  },
  {
    id: 3,
    title: '牛しゃぶしゃぶ・橘コース',
    description: '厳選した牛肉を使用した贅沢なしゃぶしゃぶコース',
    price: '7,700円',
    image: '/images/kamiya-cource3.webp',
  },
  {
    id: 4,
    title: 'お祝い・法事用特別コース',
    description: '伊勢海老や赤飯など、特別な席に相応しい祝いの品々',
    price: '要相談',
    image: '/images/kamiya-cource1.webp',
  },
];

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
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="menu" className="py-24 md:py-32 bg-ink text-paper">
      <div className="container mx-auto px-4">
        <h2 className="font-mincho text-3xl md:text-4xl text-center mb-16 animate-on-scroll opacity-0">
          <span className="inline-block border-b border-accent pb-2">お品書き</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {menuItems.map((item, index) => (
            <div 
              key={item.id} 
              className="animate-on-scroll opacity-0 bg-ink border border-accent/30"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-mincho text-xl mb-2">{item.title}</h3>
                <p className="text-paper/80 mb-4 text-sm">{item.description}</p>
                <p className="font-mincho text-right text-accent">{item.price}<span className="text-sm ml-1">/1名様</span></p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto mt-16 animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
          <h3 className="font-mincho text-2xl text-center mb-8">
            <span className="inline-block border-b border-accent pb-2">その他メニュー</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {otherMenus.map((menu) => (
              <div key={menu.id} className="border border-accent/30 p-4 text-center">
                <p className="font-mincho">{menu.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16 animate-on-scroll opacity-0" style={{ animationDelay: '0.8s' }}>
          <p className="text-paper/80 mb-4">
            ※ 仕入れ状況により、内容が変更になる場合がございます。<br />
            ※ 料金は全て税込・サービス料10%別途頂戴いたします。
          </p>
          <p className="font-mincho text-lg">ご予約・お問い合わせ: 050-5487-4317</p>
        </div>
      </div>
    </section>
  );
} 