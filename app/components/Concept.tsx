'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

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
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="concept" className="py-24 md:py-36 relative overflow-hidden paper-texture">
      {/* 和風の背景パターン */}
      <div className="absolute inset-0 japanese-pattern opacity-5 mix-blend-soft-light"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* セクションタイトル */}
          <div className="relative mb-20">
            <h2 className="font-mincho text-3xl md:text-4xl text-center animate-on-scroll opacity-0">
              <span className="inline-block border-b border-accent pb-2 tracking-wider">店舗理念</span>
            </h2>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-accent to-transparent opacity-50 mt-4"></div>
          </div>
          
          {/* メインコンテンツ - 2カラムレイアウト */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* 左カラム - 画像 */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="relative aspect-square overflow-hidden">
                {/* 和風の装飾枠 */}
                <div className="absolute inset-4 border border-accent/20 z-10"></div>
                <div className="absolute inset-1 border border-accent/10 z-10"></div>
                
                <Image
                  src="/images/ja-placeholder.webp"
                  alt="三代続く川口の老舗日本料理店"
                  fill
                  className="object-cover transition-all duration-1000 hover:scale-105 hover:filter hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* 画像オーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* 装飾的なキャプション */}
                <div className="absolute bottom-6 right-6 z-10">
                  <p className="font-mincho text-paper/90 text-sm tracking-wider bg-ink/40 px-4 py-2 backdrop-blur-sm">
                    伝統と革新
                  </p>
                </div>
              </div>
            </div>
            
            {/* 右カラム - テキスト */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
              {/* タイトル */}
              <h3 className="font-mincho text-2xl mb-8 tracking-wider text-accent relative">
                <span className="relative z-10">
                  三代続く川口の老舗<br />一期一会のおもてなし
                </span>
                <span className="absolute top-0 left-0 -z-10 opacity-5 text-6xl font-mincho">匠</span>
              </h3>
              
              {/* 本文 */}
              <div className="space-y-6">
                <p className="leading-relaxed">
                  三代続く川口の老舗日本料理店として、四季折々の食材が織り成す逸品を和の空間でお楽しみいただけます。
                  一期一会の気持ちで接する誠心誠意のおもてなしを大切にしています。
                </p>
                
                <p className="leading-relaxed">
                  ご接待・結納・法事・歓送迎会など、様々な機会に最適な空間と料理をご用意しております。
                  特別な時間を割烹 神谷でお過ごしください。
                </p>
              </div>
              
              {/* 装飾ライン */}
              <div className="w-16 h-px bg-accent mt-8 opacity-50"></div>
            </div>
          </div>

          {/* こだわりセクション */}
          <div className="mt-32">
            {/* サブセクションタイトル */}
            <div className="relative mb-16">
              <h3 className="font-mincho text-2xl text-center animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
                <span className="inline-block border-b border-accent pb-2 tracking-wider">こだわり</span>
              </h3>
            </div>
            
            {/* こだわりカード - 2カラム */}
            <div className="grid md:grid-cols-2 gap-12 mt-16">
              {/* カード 1 */}
              <div className="animate-on-scroll opacity-0 japanese-border group transition-all duration-500 hover:bg-beige/10" style={{ animationDelay: '0.8s' }}>
                <div className="p-8 relative overflow-hidden">
                  {/* 和風の装飾 */}
                  <div className="absolute top-0 right-0 w-24 h-24 japanese-pattern opacity-10 transition-opacity duration-500 group-hover:opacity-20"></div>
                  
                  {/* タイトル */}
                  <h4 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-4 tracking-wider transition-all duration-500 group-hover:pl-6">
                    四季を彩る会席コース
                  </h4>
                  
                  {/* 本文 */}
                  <p className="leading-relaxed">
                    料理長が用意した特別コースでは、旬の素材を使った前菜から水菓子まで職人の技を感じられる料理を提供。
                    伊勢海老や赤飯など、めでたい席を盛り上げる祝いコースも用意しております。
                  </p>
                  
                  {/* 装飾的アイコン */}
                  <div className="absolute bottom-4 right-4 opacity-10 transition-opacity duration-500 group-hover:opacity-30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* カード 2 */}
              <div className="animate-on-scroll opacity-0 japanese-border group transition-all duration-500 hover:bg-beige/10" style={{ animationDelay: '1.0s' }}>
                <div className="p-8 relative overflow-hidden">
                  {/* 和風の装飾 */}
                  <div className="absolute top-0 right-0 w-24 h-24 japanese-pattern opacity-10 transition-opacity duration-500 group-hover:opacity-20"></div>
                  
                  {/* タイトル */}
                  <h4 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-4 tracking-wider transition-all duration-500 group-hover:pl-6">
                    風情漂う和空間の完全個室
                  </h4>
                  
                  {/* 本文 */}
                  <p className="leading-relaxed">
                    2階には大小の個室を完備し、少人数での記念日から大人数の集まりまでさまざまな用途に対応。
                    テーブル席・座敷どちらも利用可能で、快適な空間でお食事をお楽しみいただけます。
                  </p>
                  
                  {/* 装飾的アイコン */}
                  <div className="absolute bottom-4 right-4 opacity-10 transition-opacity duration-500 group-hover:opacity-30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
