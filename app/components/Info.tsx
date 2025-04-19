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
                      〒332-0017<br />
                      埼玉県川口市栄町2-1-26<br />
                      神谷ビル1･2F
                    </td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">電話番号</th>
                    <td className="py-4">050-5487-4317</td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">座席数</th>
                    <td className="py-4">
                      総席数120席<br />
                      宴会最大人数 着席時64名
                    </td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">個室</th>
                    <td className="py-4">
                      座敷個室・テーブル個室・掘りごたつ個室あり<br />
                      （2名～64名様用）
                    </td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">決済方法</th>
                    <td className="py-4">
                      クレジットカード：VISA、MasterCard、JCB<br />
                      電子マネー：楽天ペイ、PayPay
                    </td>
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
                      水～日・祝前日・祝日<br />
                      11:30～14:30 (L.O.14:00)<br />
                      ※13:50までに入店
                    </td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">ディナー</th>
                    <td className="py-4">
                      火～日・祝前日・祝日<br />
                      16:00～22:00 (L.O.20:30、ドリンクL.O.21:30)
                    </td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">定休日</th>
                    <td className="py-4">月曜日</td>
                  </tr>
                  <tr className="border-b border-ink/10">
                    <th className="py-4 pr-4 align-top">予約方法</th>
                    <td className="py-4">
                      お電話またはオンライン予約<br />
                      050-5487-4317<br />
                      空席確認・ネット予約あり
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