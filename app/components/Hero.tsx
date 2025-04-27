'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Btn from './Btn';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // 動画の自動再生設定
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('自動再生できませんでした:', error);
      });
    }
  }, []);

  return (
    <section id="hero-section" className="flex flex-col md:flex-row min-h-screen bg-paper">
      {/* コンテンツコンテナ - モバイルとデスクトップで共通の要素を含む */}
      <div className="w-full flex flex-col items-center md:w-1/2 md:px-20 md:py-12 md:justify-center">
        <div className="flex flex-col items-center w-full">
          {/* ロゴ */}
          <div className="w-32 h-32 relative mt-16 md:mt-0 md:mb-16">
            {isMounted ? (
              <video
                ref={videoRef}
                poster="/images/kamiya-logo.webp"
                muted
                autoPlay
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
                loading='eager'
              />
            )}
          </div>

          {/* メッセージ */}
          <div className="font-mincho font-bold w-full px-8 text-center mt-8 md:mb-16 md:px-0">
            <p className="text-xl md:text-2xl mb-2 tracking-wider leading-relaxed">
              三代続く川口の老舗
            </p>
            <p className="text-xl md:text-2xl tracking-wider leading-relaxed md:mb-12">
              一期一会のおもてなし
            </p>
          </div>
          
          {/* モバイル専用の画像 */}
          <div className="w-full px-4 mt-8 h-48 md:hidden">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/images/kamiya-cover.webp"
                alt="割烹 神谷"
                fill
                sizes="100vw"
                className="object-cover object-top"
                priority
                loading='eager'
              />
            </div>
          </div>

          {/* ナビゲーション */}
          <nav className="w-full text-center mt-8 md:mb-16">
            <ul className="flex justify-center space-x-8 font-mincho tracking-wide md:text-sm">
              <li><Link href="/news" className="hover:text-accent transition-colors">お知らせ</Link></li>
              <li><Link href="#menu" scroll={true} className="hover:text-accent transition-colors">お料理</Link></li>
              <li><Link href="#info" scroll={true} className="hover:text-accent transition-colors">店舗情報</Link></li>
            </ul>
          </nav>

          {/* 予約ボタン */}
          <div className="mt-8 mb-16">
            <Btn text="ご予約 Reserve" href="#reserve" />
          </div>
        </div>
      </div>

      {/* デスクトップ専用の右側セクション（画像） */}
      <div className="hidden md:block w-1/2 relative h-screen">
        {/* 背景画像 */}
        <div className="absolute inset-0">
          <Image
            src="/images/kamiya-cover.webp"
            alt="割烹 神谷"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover p-2 rounded-2xl"
            priority
            loading='eager'
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
