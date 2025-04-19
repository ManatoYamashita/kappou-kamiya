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
                  src="/images/ja-placeholder.svg"
                  alt="一期一会のおもてなし"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
              <h3 className="font-mincho text-2xl mb-6 tracking-wider">移り変わる四季を、<br />食材と酒で味わう</h3>
              
              <p className="mb-6 leading-relaxed">
                旬の食材を活かし、その日が最高のおもてなしになるよう心がけています。
                素材の持ち味、旬の風味、料理の色彩、季節の移ろいを皿の上で表現し、
                お酒との調和を大切にしています。
              </p>
              
              <p className="leading-relaxed">
                一期一会の精神を持って、お客様をお迎えします。
                目の前で繰り広げられる伝統の技と、丁寧に仕上げた料理で、
                特別なひとときをご堪能ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 