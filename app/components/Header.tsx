'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-paper/95 backdrop-blur-md py-3 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* ロゴ */}
        <Link href="/" className="relative z-50 group">
          <div className="flex flex-col items-center relative">
            {/* 装飾線（ホバー時に表示） */}
            <div className="absolute -inset-3 border border-accent/0 group-hover:border-accent/20 transition-all duration-500"></div>
            
            <h1 className="font-mincho text-xl md:text-2xl tracking-wider">
              <span className="text-sm tracking-[0.3em] block text-center mb-1 opacity-80">割烹</span>
              神谷
            </h1>
          </div>
        </Link>

        {/* モバイルメニューボタン */}
        <button
          className={`md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center overflow-hidden transition-colors duration-300 ${
            isMenuOpen ? 'text-ink' : isScrolled ? 'text-ink' : 'text-paper'
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          <span 
            className={`block w-6 h-0.5 bg-current transition-all duration-500 transform ${
              isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'
            }`}
          ></span>
          <span 
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
            }`}
          ></span>
          <span 
            className={`block w-6 h-0.5 bg-current transition-all duration-500 transform ${
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
              { href: '/#concept', label: '店舗理念' },
              { href: '/#menu', label: 'お品書き' },
              { href: '/#info', label: '店舗情報' },
              { href: '/#access', label: 'アクセス' },
              { href: 'tel:050-5487-4317', label: 'ご予約' }
            ].map((item, index) => (
              <li key={index} className="relative group">
                <Link 
                  href={item.href} 
                  className="py-2 block hover:text-accent transition-colors duration-300"
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
          
          <div className="h-full flex flex-col justify-center items-center relative">
            <nav>
              <ul className="flex flex-col space-y-8 font-mincho text-lg text-center">
                {[
                  { href: '/#concept', label: '店舗理念' },
                  { href: '/#menu', label: 'お品書き' },
                  { href: '/#info', label: '店舗情報' },
                  { href: '/#access', label: 'アクセス' },
                  { href: 'tel:050-5487-4317', label: 'ご予約' }
                ].map((item, index) => (
                  <li key={index} className="relative">
                    <Link 
                      href={item.href} 
                      onClick={() => setIsMenuOpen(false)} 
                      className="py-2 px-4 block transition-colors duration-300 hover:text-accent"
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
