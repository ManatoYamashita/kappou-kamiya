'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Heroセクションのチェックはトップページの場合のみ行う
      if (isHomePage) {
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
          const rect = heroSection.getBoundingClientRect();
          // Heroセクションが画面から出たときにヘッダーを表示
          setIsHeroVisible(rect.bottom > 100);
        }
      } else {
        // トップページ以外では常に非表示とする（= ヘッダーを表示する）
        setIsHeroVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // 初期状態を設定
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <header className={`fixed left-0 right-0 z-50 transition-all duration-500 
      ${isScrolled ? 'bg-paper/90 backdrop-blur-sm py-3' : 'bg-transparent py-5'} 
      ${isHomePage && isHeroVisible ? '-top-24 opacity-0' : 'top-0 opacity-100'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="relative z-50" aria-label="割烹 神谷 ホームページ">
          <div className="flex flex-col items-center h-24 w-24">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/images/kamiya-logo.webp"
              className="w-full h-full object-contain"
            >
              <source src="/images/kamiya-logo.webm" type="video/webm" />
              {/* フォールバック画像（videoがサポートされていない場合） */}
              <Image
                src="/images/kamiya-logo.webp"
                alt="割烹 神谷 ロゴ"
                width={128}
                height={128}
                className="w-full h-full object-contain"
                priority
              />
            </video>
          </div>
        </Link>

        {/* モバイルメニューボタン */}
        <button
          type="button"
          className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          <span 
            className={`block w-6 h-0.5 bg-current shadow-[0_0_1px_1px_rgba(255,255,255,0.7)] transition-all duration-500 transform ${
              isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'
            }`}
          ></span>
          <span 
            className={`block w-6 h-0.5 bg-current shadow-[0_0_1px_1px_rgba(255,255,255,0.7)] transition-all duration-300 ${
              isMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
            }`}
          ></span>
          <span 
            className={`block w-6 h-0.5 bg-current shadow-[0_0_1px_1px_rgba(255,255,255,0.7)] transition-all duration-500 transform ${
              isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'
            }`}
          ></span>
        </button>

        {/* デスクトップナビゲーション */}
        <nav className={`hidden md:block transition-colors duration-300 ${
          isScrolled ? 'text-ink' : 'text-paper'
        }`}>
          <ul className="flex space-x-10 font-mincho tracking-[0.15em] text-sm">
            {[
              { href: '/#menu', label: 'お品書き' },
              { href: '/news', label: 'お知らせ' },
              { href: '/#info', label: '店舗情報' },
              { href: 'tel:050-5487-4317', label: 'ご予約' },
              { href: '/#osechi', label: 'おせちの購入' },
            ].map((item, index) => (
              <li key={index} className="relative group">
                <Link 
                  href={item.href} 
                  className="py-2 block hover:text-accent transition-colors duration-300"
                  aria-label={item.label}
                  tabIndex={0}
                >
                  {item.label}
                </Link>
                {/* ホバー時の下線装飾 */}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </nav>

        {/* モバイルメニュー */}
        <div className={`fixed inset-0 bg-paper z-40 transform transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-95'
        } md:hidden`}>
          {/* 和紙テクスチャの背景 */}
          <div className="absolute inset-0 paper-texture"></div>
          
          {/* 装飾パターン */}
          <div className="absolute top-0 right-0 w-32 h-32 japanese-pattern opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 japanese-pattern opacity-10"></div>
          
          <div className="h-screen flex flex-col justify-center items-center relative bg-white">
            <nav>
              <ul className="flex flex-col space-y-8 font-mincho text-lg text-center">
                {[
                  { href: '/#menu', label: 'お品書き' },
                  { href: '/news', label: 'お知らせ' },
                  { href: '/#info', label: '店舗情報' },
                  { href: 'tel:050-5487-4317', label: 'ご予約' },
                  { href: '/#osechi', label: 'おせちの購入' },
                ].map((item, index) => (
                  <li key={index} className="relative">
                    <Link 
                      href={item.href} 
                      onClick={() => setIsMenuOpen(false)} 
                      className="py-2 px-4 block transition-colors duration-300 hover:text-accent"
                      aria-label={item.label}
                      tabIndex={0}
                    >
                      {item.label}
                    </Link>
                    {/* 装飾線 */}
                    <div className="w-8 h-px bg-accent/30 mx-auto mt-2"></div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
