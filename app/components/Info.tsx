'use client';

import { useRef, useEffect, useState } from 'react';

export default function Info() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
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

  // Google Maps の遅延読み込み用
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !mapLoaded) {
            setMapLoaded(true);
            mapObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px 0px' } // 表示される200px手前で読み込み開始
    );
    
    mapObserver.observe(mapContainerRef.current);
    
    return () => {
      if (mapContainerRef.current) {
        mapObserver.unobserve(mapContainerRef.current);
      }
    };
  }, [mapLoaded]);
  
  return (
    <>
      <section ref={sectionRef} id="info" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="font-mincho text-3xl md:text-4xl text-center mb-16 animate-on-scroll opacity-0">
            <span className="inline-block border-b border-accent pb-2">店舗情報</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div ref={mapContainerRef} className="aspect-[16/9] w-full mb-12 bg-gray-100 flex items-center justify-center">
              {mapLoaded ? (
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.4022222362703!2d139.7133671768275!3d35.80212491691642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c11c7ebc3e99%3A0x5de19cbdcb1a7d9b!2z5pel5pys44CB44CSMzMyLTAwMTcg5Z-8546J55yM5bed5Y-j5biC5qCE55S677yS5LiB55uu77yR4oiS77yS77yW!5e0!3m2!1sja!2sjp!4v1718530124!5m2!1sja!2sjp" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="割烹 神谷 地図"
                  aria-label="割烹 神谷の所在地を示すGoogleマップ"
                ></iframe>
              ) : (
                <div className="text-center p-8">
                  <div className="animate-pulse h-6 w-32 bg-gray-200 rounded mx-auto mb-4"></div>
                  <p className="text-gray-400">地図を読み込み中...</p>
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-3">電車でお越しの方</h3>
                <ul className="space-y-4 text-paper/80">
                  <li>JR京浜東北線 川口駅 徒歩5分</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-3">お車でお越しの方</h3>
                <ul className="space-y-4 text-paper/80">
                  <li>専用無料駐車場6台あり（駅前のため限りあり）</li>
                  <li>駐車場のご利用をご希望の方は予約時にお伝えください</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="access" className="py-24 md:py-32 bg-ink text-paper">
        <div className="container mx-auto px-4">
          <h2 className="font-mincho text-3xl md:text-4xl text-center mb-16">
            <span className="inline-block border-b border-accent pb-2">アクセス</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[16/9] w-full mb-12">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.4022222362703!2d139.7133671768275!3d35.80212491691642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c11c7ebc3e99%3A0x5de19cbdcb1a7d9b!2z5pel5pys44CB44CSMzMyLTAwMTcg5Z-8546J55yM5bed5Y-j5biC5qCE55S677yS5LiB55uu77yR4oiS77yS77yW!5e0!3m2!1sja!2sjp!4v1718530124!5m2!1sja!2sjp" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="割烹 神谷 地図"
                aria-label="割烹 神谷の所在地を示すGoogleマップ"
              ></iframe>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-3">電車でお越しの方</h3>
                <ul className="space-y-4 text-paper/80">
                  <li>JR京浜東北線 川口駅 徒歩5分</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-3">お車でお越しの方</h3>
                <ul className="space-y-4 text-paper/80">
                  <li>専用無料駐車場6台あり（駅前のため限りあり）</li>
                  <li>駐車場のご利用をご希望の方は予約時にお伝えください</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 