'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // ページ読み込み完了時のアニメーション用
    setIsLoaded(true);
  }, []);
  
  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      {/* ヘッダーナビゲーション */}
      <header className="absolute top-0 left-0 w-full z-10 p-6">
        <div className="flex justify-between items-center">
          {/* 左側のロゴ/ブランド名 */}
          <Link href="/" className="text-black font-medium">
            hero—kit
          </Link>
          
          {/* 中央のナビゲーション */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link href="/about" className="text-black hover:opacity-70 transition-opacity">
                  about
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-black hover:opacity-70 transition-opacity">
                  services
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-black hover:opacity-70 transition-opacity">
                  work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black hover:opacity-70 transition-opacity">
                  contact
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* 右側のソーシャルリンク */}
          <div className="hidden md:flex space-x-4">
            <Link href="https://instagram.com" className="text-black hover:opacity-70 transition-opacity">
              ig
            </Link>
            <Link href="https://twitter.com" className="text-black hover:opacity-70 transition-opacity">
              tw
            </Link>
            <Link href="https://facebook.com" className="text-black hover:opacity-70 transition-opacity">
              fb
            </Link>
            <Link href="https://youtube.com" className="text-black hover:opacity-70 transition-opacity">
              yt
            </Link>
          </div>
          
          {/* モバイルメニューボタン */}
          <button className="md:hidden text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      
      {/* メインヒーローコンテンツ */}
      <div className="w-full h-full flex flex-col">
        {/* 上部の白背景エリア - ロゴ表示用 */}
        <div className="flex-1 flex items-center justify-center">
          <h1 
            className={`text-black text-[12rem] md:text-[16rem] lg:text-[20rem] font-black tracking-tighter transition-all duration-1000 transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Hero
          </h1>
        </div>
        
        {/* 下部のオレンジ背景エリア - イメージ表示用 */}
        <div className="h-[40vh] bg-[#FF6142] relative overflow-hidden">
          <div 
            className={`absolute inset-0 transition-transform duration-1000 ${
              isLoaded ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* 右側に寄せた人物のシルエット画像 */}
            <div className="absolute top-0 right-0 w-2/3 h-full">
              <Image
                src="/images/silhouette.webp"
                alt="Silhouette of a person with bright background"
                fill
                className="object-contain object-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
