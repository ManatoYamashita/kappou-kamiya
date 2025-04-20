import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy text-paper py-16 relative overflow-hidden">
      {/* 背景パターン */}
      <div className="absolute inset-0 mix-blend-soft-light opacity-5">
        <div className="h-full w-full paper-texture"></div>
      </div>
      
      {/* 装飾パターン */}
      <div className="absolute bottom-0 left-0 w-48 h-48 japanese-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-48 h-48 japanese-pattern opacity-10"></div>
      
      {/* トップ装飾 */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <div className="w-24 h-px bg-accent/50"></div>
        </div>
        
        {/* メインコンテンツ - 3カラム */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* 店舗情報 */}
          <div>
            <h3 className="font-mincho text-xl mb-6 tracking-wider relative inline-block">
              <span>割烹 神谷</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-accent/30"></span>
            </h3>
            <address className="not-italic leading-relaxed text-paper/80">
              〒332-0017<br />
              埼玉県川口市栄町2-1-26<br />
              神谷ビル1･2F<br />
              <a href="tel:050-5487-4317" className="hover:text-accent transition-colors mt-2 inline-block group">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="group-hover:text-accent transition-colors">050-5487-4317</span>
                </span>
              </a>
            </address>
          </div>
          
          {/* 営業時間 */}
          <div>
            <h3 className="font-mincho text-xl mb-6 tracking-wider relative inline-block">
              <span>営業時間</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-accent/30"></span>
            </h3>
            <div className="text-paper/80 leading-relaxed">
              <p className="mb-3">
                <span className="text-accent/90">ランチ</span><br />
                水～日・祝前日・祝日<br />
                11:30～14:30
              </p>
              <p className="mb-3">
                <span className="text-accent/90">ディナー</span><br />
                火～日・祝前日・祝日<br />
                16:00～22:00
              </p>
              <p>
                <span className="text-accent/90">定休日</span><br />
                月曜日
              </p>
            </div>
          </div>
          
          {/* リンク */}
          <div>
            <h3 className="font-mincho text-xl mb-6 tracking-wider relative inline-block">
              <span>リンク</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-accent/30"></span>
            </h3>
            <ul className="space-y-3 text-paper/80">
              {[
                { href: '/#concept', label: '店舗理念' },
                { href: '/#menu', label: 'お品書き' },
                { href: '/#info', label: '店舗情報' },
                { href: '/#access', label: 'アクセス' },
                { href: 'tel:050-5487-4317', label: 'ご予約' }
              ].map((item, index) => (
                <li key={index} className="group">
                  <Link 
                    href={item.href} 
                    className="inline-block hover:text-accent transition-colors duration-300"
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-accent/60 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* フッター下部 */}
        <div className="mt-16 pt-8 border-t border-paper/10 text-center text-paper/50 text-sm">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
            {/* 和風装飾 */}
            <div className="flex items-center">
              <div className="w-8 h-px bg-accent/20"></div>
              <div className="mx-4">
                <div className="w-2 h-2 border border-accent/30 rotate-45"></div>
              </div>
              <div className="w-8 h-px bg-accent/20"></div>
            </div>
            
            {/* 店舗ロゴ */}
            <div className="font-mincho text-base tracking-wider">
              <span className="text-xs tracking-[0.2em] block text-center mb-1 opacity-60">割烹</span>
              神谷
            </div>
            
            {/* 和風装飾 */}
            <div className="flex items-center">
              <div className="w-8 h-px bg-accent/20"></div>
              <div className="mx-4">
                <div className="w-2 h-2 border border-accent/30 rotate-45"></div>
              </div>
              <div className="w-8 h-px bg-accent/20"></div>
            </div>
          </div>
          
          {/* コピーライト */}
          <p>© {currentYear} 割烹 神谷 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
