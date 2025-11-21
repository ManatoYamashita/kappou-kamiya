'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Btn from './Btn';
export default function Concept() {
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
    <section ref={sectionRef} id="concept" className="relative py-24 md:py-32 text-stone-800 bg-stone-50 relative py-24 md:py-32 text-white">
      {/* 背景画像 */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/kamiya-sake.webp"
          alt="背景画像"
          fill
          className="object-cover"
          priority
        />
        {/* オーバーレイ - 右側のみブラック */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/90"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* <p className="uppercase text-stone-400 font-light tracking-widest text-center mb-2 animate-on-scroll opacity-0">CONCEPT</p> */}
          
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* 左側の画像 - 大きく表示 */}
            <div className="md:col-span-7 relative scale-110 top-[-50px] left-[-50px] animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src="/images/kamiya-sake.webp"
                  alt="三代続く川口の老舗日本料理店"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
            </div>
            
            {/* 右側のテキストコンテンツ */}
            <div className="md:col-span-5 animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="pl-0 md:pl-6">
                <h2 className="font-mincho text-4xl md:text-3xl mb-6 tracking-wide leading-relaxed">
                  <span className="text-xl block mb-1">一期一会の</span>
                  おもてなし
                </h2>
                
                <p className="mb-4 text-sm leading-relaxed text-stone-200">
                  三代続く川口の老舗日本料理店として、四季折々の食材が織り成す逸品を和の空間でお楽しみいただけます。
                  一期一会の気持ちで接する誠心誠意のおもてなしを大切にしています。
                </p>
                
                <p className="mb-6 text-sm leading-relaxed text-stone-200">
                  ご接待・結納・法事・歓送迎会など、様々な機会に最適な空間と料理をご用意しております。
                  特別な時間を割烹 神谷でお過ごしください。
                </p>
                
                <div className="mt-8">
                  <Btn text="詳しく読む" href="#" variant="primary-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h3 className="font-mincho font-bold text-2xl md:text-3xl text-center mb-16 animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
              <span className="inline-block border-b border-accent pb-2">こだわり</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 mt-16">
              <div className="animate-on-scroll opacity-0 p-6 bg-black/50 backdrop-blur-sm rounded-sm" style={{ animationDelay: '0.8s' }}>
                <h4 className="font-mincho text-xl md:text-2xl mb-5 border-l-4 border-accent pl-4">四季を彩る会席コース</h4>
                <p className="leading-relaxed">
                  料理長が用意した特別コースでは、旬の素材を使った前菜から水菓子まで職人の技を感じられる料理を提供。
                  伊勢海老や赤飯など、めでたい席を盛り上げる祝いコースも用意しております。
                </p>
              </div>
              
              <div className="animate-on-scroll opacity-0 p-6 bg-black/50 backdrop-blur-sm rounded-sm" style={{ animationDelay: '1.0s' }}>
                <h4 className="font-mincho text-xl md:text-2xl mb-5 border-l-4 border-accent pl-4">風情漂う和空間の完全個室</h4>
                <p className="leading-relaxed">
                  2階には大小の個室を完備し、少人数での記念日から大人数の集まりまでさまざまな用途に対応。
                  テーブル席・座敷どちらも利用可能で、快適な空間でお食事をお楽しみいただけます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
