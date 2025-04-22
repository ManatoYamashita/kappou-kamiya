'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // キャプチャする変数を作成
    const leftSide = leftSideRef.current;
    const rightSide = rightSideRef.current;
    
    if (leftSide) {
      observer.observe(leftSide);
    }
    
    if (rightSide) {
      observer.observe(rightSide);
    }

    // 動画の自動再生設定
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('自動再生できませんでした:', error);
      });
    }
    
    return () => {
      // クリーンアップ関数
      if (leftSide) {
        observer.unobserve(leftSide);
      }
      if (rightSide) {
        observer.unobserve(rightSide);
      }
    };
  }, []);

  return (
    <section id="hero-section" className="flex flex-col md:flex-row min-h-screen bg-paper">
      {/* モバイル表示用レイアウト */}
      <div className="md:hidden flex flex-col items-center w-full">
        {/* ロゴ */}
        <div className="w-32 h-32 relative mt-16">
          {isMounted ? (
            <video
              ref={videoRef}
              poster="/images/kamiya-logo.webp"
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
              suppressHydrationWarning
            >
              <source src="/images/kamiya-logo.webm" type="video/webm" />
            </video>
          ) : (
            <Image
              src="/images/kamiya-logo.webp"
              alt="割烹 神谷 ロゴ"
              width={128}
              height={128}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* メッセージ */}
        <div className="w-full px-8 text-center mt-8">
          <p className="font-mincho text-xl mb-2 tracking-wider leading-relaxed">
            三代続く川口の老舗
          </p>
          <p className="font-mincho text-xl tracking-wider leading-relaxed">
            一期一会のおもてなし
          </p>
        </div>
        
        {/* 画像 */}
        <div className="w-full px-4 mt-8 h-48">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src="/images/kamiya-cover.webp"
              alt="割烹 神谷"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* ナビゲーション */}
        <nav className="w-full text-center mt-8">
          <ul className="flex justify-center space-x-8 font-mincho text-xs tracking-wide">
            <li><Link href="/#about" className="hover:text-accent transition-colors">お知らせ</Link></li>
            <li><Link href="/#menu" className="hover:text-accent transition-colors">お料理</Link></li>
            <li><Link href="/#info" className="hover:text-accent transition-colors">店舗情報</Link></li>
          </ul>
        </nav>

        {/* 予約ボタン */}
        <div className="mt-8 mb-16">
          <a 
            href="#reserve" 
            className="inline-flex items-center justify-center bg-ink text-paper px-12 py-3 rounded-full font-mincho hover:bg-ink/80 transition-colors"
          >
            <span className="mr-2">•</span> ご予約 Reserve
          </a>
        </div>
      </div>

      {/* デスクトップ表示用レイアウト */}
      <div className="hidden md:flex md:flex-row w-full min-h-screen">
        {/* 左側 - 詩的テキスト、タイトル、ナビゲーション */}
        <div 
          ref={leftSideRef}
          className="w-1/2 flex flex-col justify-center items-center px-20 py-12 opacity-0 transition-opacity duration-1000"
        >
          <div className="w-full flex flex-col items-center">
            {/* 店名ロゴ - 上部中央に配置 */}
            <div className="mb-16 w-32 h-32 relative">
              {isMounted ? (
                <video
                  poster="/images/kamiya-logo.webp"
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                  suppressHydrationWarning
                >
                  <source src="/images/kamiya-logo.webm" type="video/webm" />
                </video>
              ) : (
                <Image
                  src="/images/kamiya-logo.webp"
                  alt="割烹 神谷 ロゴ"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* 詩的なテキスト - 中央揃え */}
            <div className="mb-16 text-center">
              <p className="font-mincho text-2xl mb-2 tracking-wider leading-relaxed">
                三代続く川口の老舗
              </p>
              <p className="font-mincho text-2xl mb-12 tracking-wider leading-relaxed">
                一期一会のおもてなし
              </p>
            </div>
            
            {/* ナビゲーションリンク - 中央揃え */}
            <nav className="mb-16 text-center">
              <ul className="flex space-x-8 font-mincho text-xs tracking-wide">
                <li><Link href="/#about" className="hover:text-accent transition-colors">お知らせ</Link></li>
                <li><Link href="/#menu" className="hover:text-accent transition-colors">お料理</Link></li>
                <li><Link href="/#info" className="hover:text-accent transition-colors">店舗情報</Link></li>
              </ul>
            </nav>

            {/* 予約ボタン - 中央揃え */}
            <div className="mt-8">
              <a 
                href="#reserve" 
                className="inline-flex items-center justify-center bg-ink text-paper px-12 py-3 rounded-full font-mincho hover:bg-ink/80 transition-colors"
              >
                <span className="mr-2">•</span> ご予約 Reserve
              </a>
            </div>
          </div>
        </div>
        
        {/* 右側 - 画像と和テキスト */}
        <div 
          ref={rightSideRef}
          className="w-1/2 relative h-screen opacity-0 transition-opacity duration-1000 delay-300"
        >
          {/* 背景画像 */}
          <div className="absolute inset-0">
            <Image
              src="/images/kamiya-cover.webp"
              alt="割烹 神谷"
              fill
              className="object-cover p-2 rounded-2xl"
              priority
            />
          </div>

          {/* 右側の重ねるテキストとロゴ */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-paper z-10">
            {/* 灯篭アイコン */}
            <div className="absolute bottom-16 right-16">
              <div className="w-16 h-16 flex items-center justify-center bg-paper/20 rounded-full backdrop-blur-sm">
                <span className="text-paper text-2xl">灯</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
