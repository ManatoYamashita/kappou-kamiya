'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  
  // Router の変更をリッスンして、トランジションのタイミングを制御
  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (isAnimatingRef.current || !overlayRef.current) return;
      isAnimatingRef.current = true;
      
      // HTML要素にクラスを追加
      document.documentElement.classList.add('is-changing');
      
      // 進入アニメーション
      gsap.to(overlayRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power3.inOut'
      });
    };
    
    const handleRouteChangeComplete = () => {
      if (!overlayRef.current) return;
      
      // わずかな遅延を入れて、新しいページの内容が読み込まれたことを確認
      setTimeout(() => {
        // 退出アニメーション
        gsap.to(overlayRef.current, {
          y: '-100%',
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => {
            isAnimatingRef.current = false;
            // スクロール禁止を解除するためのクラス削除を確実に行う
            document.documentElement.classList.remove('is-changing');
          }
        });
      }, 200);
    };
    
    // カスタムイベントをリッスン
    window.addEventListener('routeChangeStart', handleRouteChangeStart);
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete);
    
    // ページロード時の初期アニメーション
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { y: '-100%' });
    }
    
    // 確実にスクロール禁止が解除されるためのセーフティネット
    const ensureScrollingEnabled = () => {
      if (document.documentElement.classList.contains('is-changing')) {
        document.documentElement.classList.remove('is-changing');
      }
    };
    
    // 5秒後に強制的にスクロール禁止を解除するセーフティタイマー
    const safetyTimer = setTimeout(ensureScrollingEnabled, 5000);
    
    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChangeStart);
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
      clearTimeout(safetyTimer);
      // コンポーネントがアンマウントされる時にも確実にスクロール禁止を解除
      document.documentElement.classList.remove('is-changing');
    };
  }, []);
  
  // パスの変更を検知してアニメーションをトリガー
  useEffect(() => {
    if (!isAnimatingRef.current) {
      // パス変更完了イベントをディスパッチ
      window.dispatchEvent(new Event('routeChangeComplete'));
    }
  }, [pathname]);
  
  // ページ遷移のためのクリックイベントを捕捉
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (
        anchor && 
        anchor.href && 
        anchor.href.startsWith(window.location.origin) && 
        !anchor.hasAttribute('target') && 
        !anchor.hasAttribute('download') && 
        !(e.metaKey || e.ctrlKey)
      ) {
        // 外部リンクでないかつ 新しいタブで開くリンクでない場合
        e.preventDefault();
        
        // トランジション開始イベントをディスパッチ
        window.dispatchEvent(new Event('routeChangeStart'));
        
        // 遅延してからナビゲーション
        setTimeout(() => {
          router.push(anchor.href);
        }, 600); // アニメーションの時間と同期
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [router]);
  
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-paper transform -translate-y-full pointer-events-none"
      aria-hidden="true"
    />
  );
} 