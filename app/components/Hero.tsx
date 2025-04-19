'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative h-screen">
      {/* ヒーロー画像 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ja-placeholder.webp"
          alt="季節の料理"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>
      
      {/* オーバーレイコンテンツ */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-paper">
        <div className={`text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="font-mincho mb-6">
            <h2 className="text-lg md:text-xl tracking-widest mb-2">割烹</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-wider">神谷</h1>
          </div>
          
          <div className="mt-8 px-4">
            <p className="text-lg md:text-xl font-mincho tracking-wider leading-relaxed">
              移り変わる四季を<br className="md:hidden" />
              食材と酒で味わう
            </p>
          </div>
        </div>
        
        {/* スクロールダウン表示 */}
        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center">
            <span className="text-xs tracking-widest mb-2">SCROLL</span>
            <div className="w-0.5 h-10 bg-paper/60 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 