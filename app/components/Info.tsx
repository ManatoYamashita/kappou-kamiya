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
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <>
      {/* 店舗情報セクション */}
      <section ref={sectionRef} id="info" className="py-24 md:py-36 relative overflow-hidden">
        {/* 和風の背景パターン */}
        <div className="absolute inset-0 paper-texture"></div>
        
        <div className="container mx-auto px-4 relative">
          {/* セクションタイトル */}
          <div className="relative mb-20">
            <h2 className="font-mincho text-3xl md:text-4xl text-center animate-on-scroll opacity-0">
              <span className="inline-block border-b border-accent pb-2 tracking-wider">店舗情報</span>
            </h2>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-accent to-transparent opacity-50 mt-4"></div>
          </div>
          
          {/* 情報テーブル - 2カラム */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            {/* 基本情報 */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="relative mb-8">
                <h3 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-4 tracking-wider">基本情報</h3>
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-12 h-12 japanese-pattern opacity-5"></div>
              </div>
              
              <table className="w-full text-left japanese-table">
                <tbody>
                  <tr className="border-b border-ink/5 hover:bg-beige/20 transition-colors duration-300">
                    <th className="py-4 pr-4 align-top w-1/3 font-mincho">店舗名</th>
                    <td className="py-4">割烹 神谷</td>
                  </tr>
                  <tr className="border-b border-ink/5 hover:bg-beige/20 transition-colors duration-300">
                    <th className="py-4 pr-4 align-top font-mincho">住所</th>
                    <td className="py-4">
                      <span className="text-accent">〒332-0017</span><br />
                      埼玉県川口市栄町2-1-26<br />
                      神谷ビル1･2F
                    </td>
                  </tr>
                  <tr className="border-b border-ink/5 hover:bg-beige/20 transition-colors duration-300">
                    <th className="py-4 pr-4 align-top font-mincho">電話番号</th>
                    <td className="py-4 font-medium text-accent">050-5487-4317</td>
                  </tr>
                  <tr className="border-b border-ink/5 hover:bg-beige/20 transition-colors duration-300">
                    <th className="py-4 pr-4 align-top font-mincho">座席数</th>
                    <td className="py-4">
                      総席数120席<br />
                      宴会最大人数 着席時64名
                    </td>
                  </tr>
                  <tr className="border-b border-ink/5 hover:bg-beige/20 transition-colors duration-300">
                    <th className="py-4 pr-4 align-top font-mincho">個室</th>
                    <td className="py-4">
                      座敷個室・テーブル個室・掘りごたつ個室あり<br />
                      （2名～64名様用）
                    </td>
                  </tr>
                  <tr className="border-b border-ink/5 hover:bg-beige/20 transition-colors duration-300">
                    <th className="py-4 pr-4 align-top font-mincho">決済方法</th>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="mr-2">クレジットカード：</span>
                        <span className="px-2 py-1 bg-accent/10 text-xs">VISA</span>
                        <span className="px-2 py-1 bg-accent/10 text-xs">MasterCard</span>
                        <span className="px-2 py-1 bg-accent/10 text-xs">JCB</span>
                        <span className="mr-2 ml-4">電子マネー：</span>
                        <span className="px-2 py-1 bg-accent/10 text-xs">楽天ペイ</span>
                        <span className="px-2 py-1 bg-accent/10 text-xs">PayPay</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* 営業時間 */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="relative mb-8">
                <h3 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-4 tracking-wider">営業時間</h3>
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-12 h-12 japanese-pattern opacity-5"></div>
              </div>
              
              <table className="w-full text-left japanese-table">
                <tbody>
                  <tr className="border-b border-ink/5 hover:bg-beige/20 transition-colors duration-300">
                    <th className="py-4 pr-4 align-top w-1/3 font-mincho">ランチ</th>
                    <td className="py-4">
                      <span className="text-accent font-medium">水～日・祝前日・祝日</span><br />
                      11:30～14:30 (L.O.14:00)<br />
                      <span className="text-sm opacity-80">※13:50までに入店</span>
                    </td>
                  </tr>
                  <tr className="border-b border-ink/5 hover:bg-beige/20 transition-colors duration-300">
                    <th className="py-4 pr-4 align-top font-mincho">ディナー</th>
                    <td className="py-4">
                      <span className="text-accent font-medium">火～日・祝前日・祝日</span><br />
                      16:00～22:00 (L.O.20:30、ドリンクL.O.21:30)
                    </td>
                  </tr>
                  <tr className="border-b border-ink/5 hover:bg-beige/20 transition-colors duration-300">
                    <th className="py-4 pr-4 align-top font-mincho">定休日</th>
                    <td className="py-4 font-medium">月曜日</td>
                  </tr>
                  <tr className="border-b border-ink/5 hover:bg-beige/20 transition-colors duration-300">
                    <th className="py-4 pr-4 align-top font-mincho">予約方法</th>
                    <td className="py-4">
                      お電話またはオンライン予約<br />
                      <a href="tel:050-5487-4317" className="text-accent hover:text-accent-dark transition-colors font-medium">
                        050-5487-4317
                      </a><br />
                      <span className="inline-block mt-1 text-sm bg-accent/10 px-2 py-1">空席確認・ネット予約あり</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      
      {/* アクセスセクション */}
      <section id="access" className="py-24 md:py-36 bg-navy text-paper relative overflow-hidden">
        {/* 背景パターン */}
        <div className="absolute inset-0 mix-blend-soft-light opacity-10">
          <div className="h-full w-full paper-texture"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          {/* セクションタイトル */}
          <div className="relative mb-20">
            <h2 className="font-mincho text-3xl md:text-4xl text-center animate-on-scroll opacity-0">
              <span className="inline-block border-b border-accent pb-2 tracking-wider">アクセス</span>
            </h2>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-accent to-transparent opacity-50 mt-4"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* マップ */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-[16/9] w-full mb-16 overflow-hidden relative japanese-border">
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
            </div>
            
            {/* アクセス情報 */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* 電車でお越しの方 */}
              <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
                <div className="relative mb-6">
                  <h3 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-4 tracking-wider">電車でお越しの方</h3>
                </div>
                <ul className="space-y-4 text-paper/80">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <span>JR京浜東北線 川口駅 徒歩5分</span>
                  </li>
                </ul>
              </div>
              
              {/* お車でお越しの方 */}
              <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
                <div className="relative mb-6">
                  <h3 className="font-mincho text-xl mb-6 border-l-4 border-accent pl-4 tracking-wider">お車でお越しの方</h3>
                </div>
                <ul className="space-y-4 text-paper/80">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <span>専用無料駐車場6台あり（駅前のため限りあり）</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <span>駐車場のご利用をご希望の方は予約時にお伝えください</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
