'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ルート変更開始時にローディングを表示
    setLoading(true);

    // 少し遅延させてからローディングを非表示（ページ読み込み完了）
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <>
      {/* トップローディングバー */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[9999] animate-loading-bar"
        role="progressbar"
        aria-label="ページ読み込み中"
      />

      {/* 全画面オーバーレイ（オプション） */}
      <div
        className="fixed inset-0 bg-white/30 backdrop-blur-[2px] z-[9998] pointer-events-none animate-fade-in"
        aria-hidden="true"
      />

      {/* 中央スピナー */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none">
        <div className="relative">
          {/* 外側の円 */}
          <div className="w-16 h-16 border-4 border-accent/20 rounded-full"></div>
          {/* 回転する円 */}
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-accent rounded-full animate-spin"></div>
        </div>
      </div>
    </>
  );
}
