'use client';

import { useRef, useEffect } from 'react';

export default function Info() {
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
    <>
      <section ref={sectionRef} id="info" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="font-mincho text-3xl md:text-4xl text-center mb-16 animate-on-scroll opacity-0">
            <span className="inline-block border-b border-accent pb-2">店舗情報</span>
          </h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-3">基本情報</h3>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top w-1/3">店舗名</th>
                    <td className="py-4">割烹 神谷</td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">住所</th>
                    <td className="py-4">
                      〒100-0001<br />
                      東京都千代田区丸の内1-1-1<br />
                      丸の内センタービル 8F
                    </td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">電話番号</th>
                    <td className="py-4">03-1234-5678</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
              <h3 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-3">営業時間</h3>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top w-1/3">ランチ</th>
                    <td className="py-4">
                      11:30〜14:00 (L.O.13:30)<br />
                      ※土日祝のみ
                    </td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">ディナー</th>
                    <td className="py-4">17:30〜22:00 (L.O.21:00)</td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">定休日</th>
                    <td className="py-4">月曜日（祝日の場合は翌日）</td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">予約方法</th>
                    <td className="py-4">
                      お電話またはオンライン予約<br />
                      ※ディナーは3日前までのご予約をお願いしております
                    </td>
                  </tr>
                </tbody>
              </table>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.9483209823213!2d139.76431797571106!3d35.68080037259424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2z5p2x5Lqs6aeF!5e0!3m2!1sja!2sjp!4v1718530124!5m2!1sja!2sjp" 
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
                  <li>東京メトロ丸ノ内線「東京駅」より徒歩3分</li>
                  <li>JR「東京駅」丸の内北口より徒歩5分</li>
                  <li>東京メトロ千代田線「二重橋前駅」より徒歩7分</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-3">お車でお越しの方</h3>
                <ul className="space-y-4 text-paper/80">
                  <li>丸の内パーキングをご利用ください（有料）</li>
                  <li>当店ご利用のお客様には、駐車場サービス券を発行しております</li>
                  <li>詳細はスタッフにお尋ねください</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 