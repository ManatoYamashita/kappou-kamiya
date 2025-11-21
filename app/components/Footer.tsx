'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // 動画の自動再生設定（iOS対応）
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Footer logo video autoplay failed:', error);
      });
    }
  }, []);
  
  return (
    <footer className="bg-ink text-paper py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <div className="w-24 h-24 relative">
                {isMounted ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    poster="/images/kamiya-logo.webp"
                    className="w-full h-full object-contain"
                    suppressHydrationWarning
                  >
                    <source src="/images/kamiya-logo.webm" type="video/webm" />
                    {/* フォールバック画像（videoがサポートされていない場合） */}
                    <Image
                      src="/images/kamiya-logo.webp"
                      alt="割烹 神谷 ロゴ"
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </video>
                ) : (
                  <Image
                    src="/images/kamiya-logo.webp"
                    alt="割烹 神谷 ロゴ"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
            <address className="not-italic leading-relaxed text-paper/80">
              〒332-0017<br />
              埼玉県川口市栄町2-1-26<br />
              神谷ビル1･2F<br />
              TEL: <Link href="tel:050-5487-4317" className="hover:text-accent transition-colors" aria-label="電話番号を呼び出す">050-5487-4317</Link>
            </address>
          </div>
          
          <div>
            <h3 className="font-mincho text-xl font-bold mb-4">営業時間</h3>
            <p className="text-paper/80 leading-relaxed">
              ランチ: 水～日・祝前日・祝日 11:30～14:30<br />
              ディナー: 火～日・祝前日・祝日 16:00～22:00<br />
              定休日: 月曜日
            </p>
          </div>
          
          <div>
            <h3 className="font-mincho text-xl font-bold mb-4">リンク</h3>
            <ul className="space-y-2 text-paper/80">
              <li>
                <Link href="/#concept" className="hover:text-accent transition-colors" aria-label="店舗理念へ移動">店舗理念</Link>
              </li>
              <li>
                <Link href="/#menu" className="hover:text-accent transition-colors" aria-label="お品書きへ移動">お品書き</Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-accent transition-colors" aria-label="ニュースへ移動">お知らせ</Link>
              </li>
              <li>
                <Link href="/#osechi" className="hover:text-accent transition-colors" aria-label="おせちの購入へ移動">おせちの購入</Link>
              </li>
              <li>
                <Link href="/#info" className="hover:text-accent transition-colors" aria-label="店舗情報へ移動">店舗情報</Link>
              </li>
              <li>
                <Link href="/#access" className="hover:text-accent transition-colors" aria-label="アクセスへ移動">アクセス</Link>
              </li>
              {/* <li>
                <Link href="tel:050-5487-4317" className="hover:text-accent transition-colors">ご予約</Link>
              </li> */}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-paper/20 text-center text-paper/60 text-sm">
          <p>© {currentYear} 割烹 神谷 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
