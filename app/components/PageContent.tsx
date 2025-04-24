'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // ページコンテンツのアニメーション
  useEffect(() => {
    if (!contentRef.current) return;
    
    // 初期状態
    gsap.set(contentRef.current, { 
      opacity: 0,
      scale: 1.1,
      y: 50
    });
    
    // フェードインアニメーション
    gsap.to(contentRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      delay: 1, // ページトランジションが終わった後にフェードイン
      ease: 'power2.out',
      onComplete: () => {
        setIsLoaded(true);
        // アニメーション完了時に確実にスクロールを有効にする
        document.documentElement.classList.remove('is-changing');
      }
    });
    
    // セーフティタイマー - アニメーションが何らかの理由で完了しなかった場合のバックアップ
    const enableScrollTimer = setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
        document.documentElement.classList.remove('is-changing');
      }
    }, 2000);
    
    return () => {
      clearTimeout(enableScrollTimer);
    };
  }, [pathname, isLoaded]);
  
  return (
    <div 
      ref={contentRef} 
      className={`min-h-screen page-content ${isLoaded ? 'is-loaded' : ''}`}
    >
      {children}
    </div>
  );
} 