'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

  // アニメーション設定 - 共通で使用するバリアント
  const animations = {
    fadeIn: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8 }
      }
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.3
        }
      }
    },
    imageReveal: {
      hidden: { opacity: 0, scale: 1.05 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 1.2, ease: "easeOut" }
      }
    }
  };

  return (
    <section id="hero-section" className="flex flex-col md:flex-row min-h-screen bg-paper">
      {/* コンテンツコンテナ - モバイルとデスクトップで共通の要素を含む */}
      <motion.div 
        className="w-full flex flex-col items-center md:w-1/2 md:px-20 md:py-12 md:justify-center"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="flex flex-col items-center w-full"
          initial="hidden"
          animate="visible"
          variants={animations.staggerContainer}
        >
          {/* ロゴ */}
          <motion.div className="w-32 h-32 relative mt-16 md:mt-0 md:mb-16" variants={animations.fadeIn}>
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
                loading='eager'
              />
            )}
          </motion.div>

          {/* メッセージ */}
          <motion.div className="font-mincho font-bold w-full px-8 text-center mt-8 md:mb-16 md:px-0" variants={animations.fadeIn}>
            <p className="text-xl md:text-2xl mb-2 tracking-wider leading-relaxed">
              三代続く川口の老舗
            </p>
            <p className="text-xl md:text-2xl tracking-wider leading-relaxed md:mb-12">
              一期一会のおもてなし
            </p>
          </motion.div>
          
          {/* モバイル専用の画像 */}
          <motion.div className="w-full px-4 mt-8 h-48 md:hidden" variants={animations.imageReveal}>
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/images/kamiya-cover.webp"
                alt="割烹 神谷"
                fill
                className="object-cover"
                priority
                loading='eager'
              />
            </div>
          </motion.div>

          {/* ナビゲーション */}
          <motion.nav className="w-full text-center mt-8 md:mb-16" variants={animations.fadeIn}>
            <ul className="flex justify-center space-x-8 font-mincho tracking-wide md:text-sm">
              <li><Link href="/#about" className="hover:text-accent transition-colors">お知らせ</Link></li>
              <li><Link href="/#menu" className="hover:text-accent transition-colors">お料理</Link></li>
              <li><Link href="/#info" className="hover:text-accent transition-colors">店舗情報</Link></li>
            </ul>
          </motion.nav>

          {/* 予約ボタン */}
          <motion.div 
            className="mt-8 mb-16" 
            variants={animations.fadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Btn text="ご予約 Reserve" href="#reserve" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* デスクトップ専用の右側セクション（画像） */}
      <motion.div 
        className="hidden md:block w-1/2 relative h-screen"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        {/* 背景画像 */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/kamiya-cover.webp"
            alt="割烹 神谷"
            fill
            className="object-cover p-2 rounded-2xl"
            priority
            loading='eager'
          />
        </motion.div>

        {/* 灯篭アイコン */}
        <motion.div 
          className="absolute bottom-16 right-16 w-16 h-16 flex items-center justify-center bg-paper/20 rounded-full backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="text-paper text-2xl">灯</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
