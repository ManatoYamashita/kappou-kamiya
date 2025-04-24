'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  
  // パスがルート（"/"）かどうかを確認する関数
  const isRootPath = (path: string) => path === '/';
  
  // Router の変更をリッスンして、トランジションのタイミングを制御
  useEffect(() => {
    const handleRouteChangeStart = (path?: string) => {
      // ルートパスへの遷移の場合はアニメーションをスキップ
      if (path && isRootPath(path)) {
        return;
      }
      
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
    
    const handleRouteChangeComplete = (path?: string) => {
      // ルートパスへの遷移の場合はアニメーションをスキップ
      if (path && isRootPath(path)) {
        isAnimatingRef.current = false;
        document.documentElement.classList.remove('is-changing');
        return;
      }
      
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
    const onRouteChangeStart = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      handleRouteChangeStart(customEvent.detail);
    };
    
    const onRouteChangeComplete = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      handleRouteChangeComplete(customEvent.detail);
    };
    
    window.addEventListener('routeChangeStart', onRouteChangeStart);
    window.addEventListener('routeChangeComplete', onRouteChangeComplete);
    
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
      window.removeEventListener('routeChangeStart', onRouteChangeStart);
      window.removeEventListener('routeChangeComplete', onRouteChangeComplete);
      clearTimeout(safetyTimer);
      // コンポーネントがアンマウントされる時にも確実にスクロール禁止を解除
      document.documentElement.classList.remove('is-changing');
    };
  }, []);
  
  // パスの変更を検知してアニメーションをトリガー
  useEffect(() => {
    if (!isAnimatingRef.current) {
      // パス変更完了イベントをディスパッチ（現在のパスを渡す）
      window.dispatchEvent(new CustomEvent('routeChangeComplete', { detail: pathname }));
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
        // アンカーからパスを取得
        const path = new URL(anchor.href).pathname;
        
        // ルートパスへの遷移の場合は通常のナビゲーションを使用
        if (isRootPath(path)) {
          // データを渡してカスタムイベントをディスパッチ
          window.dispatchEvent(new CustomEvent('routeChangeStart', { detail: path }));
          router.push(path);
          return;
        }
        
        // 外部リンクでないかつ 新しいタブで開くリンクでない場合
        e.preventDefault();
        
        // トランジション開始イベントをディスパッチ（パスを渡す）
        window.dispatchEvent(new CustomEvent('routeChangeStart', { detail: path }));
        
        // 遅延してからナビゲーション
        setTimeout(() => {
          router.push(path);
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