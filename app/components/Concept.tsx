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
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="concept" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mincho text-3xl md:text-4xl text-center mb-12 animate-on-scroll opacity-0">
            <span className="inline-block border-b border-accent pb-2">店舗理念</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/ja-placeholder.webp"
                  alt="三代続く川口の老舗日本料理店"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
              <h3 className="font-mincho text-2xl mb-6 tracking-wider">三代続く川口の老舗<br />一期一会のおもてなし</h3>
              
              <p className="mb-6 leading-relaxed">
                三代続く川口の老舗日本料理店として、四季折々の食材が織り成す逸品を和の空間でお楽しみいただけます。
                一期一会の気持ちで接する誠心誠意のおもてなしを大切にしています。
              </p>
              
              <p className="leading-relaxed">
                ご接待・結納・法事・歓送迎会など、様々な機会に最適な空間と料理をご用意しております。
                特別な時間を割烹 神谷でお過ごしください。
              </p>
            </div>
          </div>

          <div className="mt-24">
            <h3 className="font-mincho text-2xl text-center mb-12 animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
              <span className="inline-block border-b border-accent pb-2">こだわり</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.8s' }}>
                <h4 className="font-mincho text-xl mb-4 border-l-4 border-accent pl-3">四季を彩る会席コース</h4>
                <p className="leading-relaxed">
                  料理長が用意した特別コースでは、旬の素材を使った前菜から水菓子まで職人の技を感じられる料理を提供。
                  伊勢海老や赤飯など、めでたい席を盛り上げる祝いコースも用意しております。
                </p>
              </div>
              
              <div className="animate-on-scroll opacity-0" style={{ animationDelay: '1.0s' }}>
                <h4 className="font-mincho text-xl mb-4 border-l-4 border-accent pl-3">風情漂う和空間の完全個室</h4>
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