'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

const menuItems = [
  {
    id: 1,
    title: 'おまかせコース',
    description: '四季折々の厳選素材を使用した当店の真髄を味わうコース',
    price: '15,000円〜',
    image: '/images/ja-placeholder.svg',
  },
  {
    id: 2,
    title: '季節の懐石',
    description: '伝統的な懐石料理の流れに沿った季節感あふれる献立',
    price: '12,000円〜',
    image: '/images/ja-placeholder.svg',
  },
  {
    id: 3,
    title: '昼の特選膳',
    description: '厳選した食材で作る日替わりの特選ランチ',
    price: '5,000円〜',
    image: '/images/ja-placeholder.svg',
  },
  {
    id: 4,
    title: '日本酒ペアリング',
    description: 'お料理に合わせた厳選日本酒のペアリング',
    price: '6,000円',
    image: '/images/ja-placeholder.svg',
  },
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
                <p className="font-mincho text-right text-accent">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
          <p className="text-paper/80 mb-4">
            ※ 仕入れ状況により、内容が変更になる場合がございます。<br />
            ※ 料金は全て税込・サービス料10%別途頂戴いたします。
          </p>
          <p className="font-mincho text-lg">ご予約・お問い合わせ: 03-1234-5678</p>
        </div>
      </div>
    </section>
  );
} 