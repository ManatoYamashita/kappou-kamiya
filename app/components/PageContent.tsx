'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // ルートパスかどうかを確認
  const isRootPath = pathname === '/';
  
  // ページコンテンツのアニメーション
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // アニメーション完了時に確実にスクロールを有効にする
    const enableScroll = () => {
      document.documentElement.classList.remove('is-changing');
    };

    // ルートパスの場合は即座に表示（is-loaded は isRootPath から決まる）
    if (isRootPath) {
      gsap.set(content, {
        opacity: 1,
        scale: 1,
        y: 0
      });
      enableScroll();
      return;
    }

    // 完了の記録。isLoaded を依存に入れると、完了で effect が再実行されてアニメーションが 2 回走るため、
    // このページ表示の中だけで持つ。
    let completed = false;
    const complete = () => {
      completed = true;
      setIsLoaded(true);
      enableScroll();
    };

    // 初期状態
    gsap.set(content, {
      opacity: 0.01,
      scale: 1.1,
      y: 50
    });

    // フェードインアニメーション
    gsap.to(content, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      delay: 1, // ページトランジションが終わった後にフェードイン
      ease: 'power2.out',
      onComplete: complete
    });

    // セーフティタイマー - アニメーションが何らかの理由で完了しなかった場合のバックアップ
    const enableScrollTimer = setTimeout(() => {
      if (!completed) {
        complete();
      }
    }, 2000);

    return () => {
      clearTimeout(enableScrollTimer);
    };
  }, [pathname, isRootPath]);
  
  return (
    <div 
      ref={contentRef} 
      className={`min-h-screen page-content ${isLoaded || isRootPath ? 'is-loaded' : ''}`}
      id="main-content"
      aria-label="メインコンテンツ"
    >
      {children}
    </div>
  );
} 