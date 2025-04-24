'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

  // アニメーション設定
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const imageReveal = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  return (
    <section id="hero-section" className="flex flex-col md:flex-row min-h-screen bg-paper">
      {/* モバイル表示用レイアウト */}
      <motion.div 
        className="md:hidden flex flex-col items-center w-full"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* ロゴ */}
        <motion.div className="w-32 h-32 relative mt-16" variants={fadeIn}>
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
        </motion.div>

        {/* メッセージ */}
        <motion.div className="w-full px-8 text-center mt-8" variants={fadeIn}>
          <p className="font-mincho text-xl mb-2 tracking-wider leading-relaxed">
            三代続く川口の老舗
          </p>
          <p className="font-mincho text-xl tracking-wider leading-relaxed">
            一期一会のおもてなし
          </p>
        </motion.div>
        
        {/* 画像 */}
        <motion.div className="w-full px-4 mt-8 h-48" variants={imageReveal}>
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src="/images/kamiya-cover.webp"
              alt="割烹 神谷"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* ナビゲーション */}
        <motion.nav className="w-full text-center mt-8" variants={fadeIn}>
          <ul className="flex justify-center space-x-8 font-mincho text-xs tracking-wide">
            <li><Link href="/#about" className="hover:text-accent transition-colors">お知らせ</Link></li>
            <li><Link href="/#menu" className="hover:text-accent transition-colors">お料理</Link></li>
            <li><Link href="/#info" className="hover:text-accent transition-colors">店舗情報</Link></li>
          </ul>
        </motion.nav>

        {/* 予約ボタン */}
        <motion.div 
          className="mt-8 mb-16" 
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href="#reserve" 
            className="inline-flex items-center justify-center bg-ink text-paper px-12 py-3 rounded-full font-mincho hover:bg-ink/80 transition-colors"
          >
            <span className="mr-2">•</span> ご予約 Reserve
          </a>
        </motion.div>
      </motion.div>

      {/* デスクトップ表示用レイアウト */}
      <div className="hidden md:flex md:flex-row w-full min-h-screen">
        {/* 左側 - 詩的テキスト、タイトル、ナビゲーション */}
        <motion.div 
          className="w-1/2 flex flex-col justify-center items-center px-20 py-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="w-full flex flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* 店名ロゴ - 上部中央に配置 */}
            <motion.div className="mb-16 w-32 h-32 relative" variants={fadeIn}>
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
            </motion.div>

            {/* 詩的なテキスト - 中央揃え */}
            <motion.div className="mb-16 text-center" variants={fadeIn}>
              <p className="font-mincho text-2xl mb-2 tracking-wider leading-relaxed">
                三代続く川口の老舗
              </p>
              <p className="font-mincho text-2xl mb-12 tracking-wider leading-relaxed">
                一期一会のおもてなし
              </p>
            </motion.div>
            
            {/* ナビゲーションリンク - 中央揃え */}
            <motion.nav className="mb-16 text-center" variants={fadeIn}>
              <ul className="flex space-x-8 font-mincho text-xs tracking-wide">
                <li><Link href="/#about" className="hover:text-accent transition-colors">お知らせ</Link></li>
                <li><Link href="/#menu" className="hover:text-accent transition-colors">お料理</Link></li>
                <li><Link href="/#info" className="hover:text-accent transition-colors">店舗情報</Link></li>
              </ul>
            </motion.nav>

            {/* 予約ボタン - 中央揃え */}
            <motion.div 
              className="mt-8" 
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="#reserve" 
                className="inline-flex items-center justify-center bg-ink text-paper px-12 py-3 rounded-full font-mincho hover:bg-ink/80 transition-colors"
              >
                <span className="mr-2">•</span> ご予約 Reserve
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* 右側 - 画像と和テキスト */}
        <motion.div 
          className="w-1/2 relative h-screen"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          {/* 背景画像 */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Image
                src="/images/kamiya-cover.webp"
                alt="割烹 神谷"
                fill
                className="object-cover p-2 rounded-2xl"
                priority
              />
            </motion.div>
          </div>

          {/* 右側の重ねるテキストとロゴ */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-paper z-10">
            {/* 灯篭アイコン */}
            <motion.div 
              className="absolute bottom-16 right-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-paper/20 rounded-full backdrop-blur-sm">
                <span className="text-paper text-2xl">灯</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
