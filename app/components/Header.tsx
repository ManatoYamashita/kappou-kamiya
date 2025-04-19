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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-paper/90 backdrop-blur-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="relative z-50">
          <div className="flex flex-col items-center">
            <h1 className="font-mincho text-xl md:text-2xl tracking-wider">
              <span className="text-sm tracking-widest block text-center mb-1">割烹</span>
              神谷
            </h1>
          </div>
        </Link>

        {/* モバイルメニューボタン */}
        <button
          className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
        </button>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 font-mincho tracking-wider text-sm">
            <li><Link href="/#concept" className="hover:text-accent transition-colors duration-300">店舗理念</Link></li>
            <li><Link href="/#menu" className="hover:text-accent transition-colors duration-300">お品書き</Link></li>
            <li><Link href="/#info" className="hover:text-accent transition-colors duration-300">店舗情報</Link></li>
            <li><Link href="/#access" className="hover:text-accent transition-colors duration-300">アクセス</Link></li>
            <li><Link href="tel:03-1234-5678" className="hover:text-accent transition-colors duration-300">ご予約</Link></li>
          </ul>
        </nav>

        {/* モバイルメニュー */}
        <div className={`fixed inset-0 bg-paper z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <div className="h-full flex flex-col justify-center items-center">
            <nav>
              <ul className="flex flex-col space-y-8 font-mincho text-lg text-center">
                <li><Link href="/#concept" onClick={() => setIsMenuOpen(false)} className="block py-2">店舗理念</Link></li>
                <li><Link href="/#menu" onClick={() => setIsMenuOpen(false)} className="block py-2">お品書き</Link></li>
                <li><Link href="/#info" onClick={() => setIsMenuOpen(false)} className="block py-2">店舗情報</Link></li>
                <li><Link href="/#access" onClick={() => setIsMenuOpen(false)} className="block py-2">アクセス</Link></li>
                <li><Link href="tel:03-1234-5678" onClick={() => setIsMenuOpen(false)} className="block py-2">ご予約</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
} 