'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Btn from './Btn';

const OSECHI_URL = 'https://kamiya.base.ec/categories/4774666';
const OSECHI_IMAGES = [
  { src: '/images/osechi/osechi-1.webp', alt: '割烹神谷 特製おせち 二段重' },
  { src: '/images/osechi/osechi-2.webp', alt: '割烹神谷 特製おせち 盛り付け' }
];

export default function Osechi() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OSECHI_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // タッチイベントハンドラー（スマホのフリック操作用）
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50; // 最小スワイプ距離（50px）

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      // 左にスワイプ → 次の画像
      setCurrentIndex((prev) => (prev + 1) % OSECHI_IMAGES.length);
    } else {
      // 右にスワイプ → 前の画像
      setCurrentIndex((prev) => (prev - 1 + OSECHI_IMAGES.length) % OSECHI_IMAGES.length);
    }

    // リセット
    setTouchStartX(0);
    setTouchEndX(0);
  };

  return (
    <section id="osechi" className="bg-ink text-paper py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-10 md:flex-row md:items-center">
          <div className="md:w-1/2 space-y-6">
            <p className="font-mincho text-3xl md:text-4xl">
              <span className="border-b border-accent pb-2">特製おせちのご案内</span>
            </p>
            <p className="leading-relaxed text-sm md:text-base">
              三代続く割烹の技で仕上げる手作りおせちを、数量限定でご用意しております。食材の下ごしらえから盛り付けまで職人が丁寧に仕立て、華やかな新年を彩ります。
            </p>
            <div className="grid gap-3 text-xs md:text-sm">
              <div className="bg-white/10 border border-white/20 rounded-sm p-4">
                <p className="font-mincho text-lg mb-1">店頭受取・配送対応</p>
                <p className="text-paper/80">受取日時や配送希望は購入ページのフォームでお知らせください。</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-sm p-4">
                <p className="font-mincho text-lg mb-1">数量限定</p>
                <p className="text-paper/80">予定数に達し次第終了となります。お早めのご注文をおすすめします。</p>
              </div>
            </div>
            <div>
              <Btn
                text="おせちを購入する"
                href={OSECHI_URL}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="おせちを購入する"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 flex h-full w-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {OSECHI_IMAGES.map((image) => (
                  <div key={image.src} className="relative w-full flex-shrink-0 h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>

              {/* ナビゲーションボタン */}
              <button
                type="button"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-ink rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => setCurrentIndex((prev) => (prev - 1 + OSECHI_IMAGES.length) % OSECHI_IMAGES.length)}
                aria-label="前の画像"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-ink rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % OSECHI_IMAGES.length)}
                aria-label="次の画像"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* ドットインジケーター */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {OSECHI_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`h-1.5 w-1.5 rounded-full ${
                      index === currentIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`画像${index + 1}に切り替え`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
