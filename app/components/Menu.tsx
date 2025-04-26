'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

// 外部ファイルからメニューデータをインポート
import { 
  allMenuItems, 
  menuCategories, 
  type MenuCategory 
} from '@/app/data/menu';

export default function Menu() {
  // スクロールアニメーション用のref
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // 現在選択されているカテゴリーの状態
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('懐石コース');
  
  // 表示するメニューアイテムを抽出
  const filteredMenuItems = allMenuItems.filter(item => item.category === activeCategory);
  
  // 画面幅に応じてボタンの表示方法を変更する状態 - 初期値は常にfalseに設定
  const [useCompactButtons, setUseCompactButtons] = useState<boolean>(false);
  
  // カテゴリー変更時のトランジション効果のための状態
  const [isChanging, setIsChanging] = useState<boolean>(false);
  
  // スクロール可能かどうかの状態
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
  
  // コンポーネントマウント時に一度だけ実行するクライアントサイド初期化
  useEffect(() => {
    // クライアントサイドでのみ実行
    setUseCompactButtons(window.innerWidth < 768);
  }, []);
  
  // 画面幅の監視
  useEffect(() => {
    // リサイズイベントのハンドラー
    const handleResize = () => {
      const isCompact = window.innerWidth < 768;
      // 現在の値と同じなら更新しない（無限ループ防止）
      if (useCompactButtons !== isCompact) {
        setUseCompactButtons(isCompact);
      }
    };
    
    // リサイズイベントのリスナーを追加
    window.addEventListener('resize', handleResize);
    
    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [useCompactButtons]);
  
  // ページ表示時のアニメーション用
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  // カテゴリー変更時の処理 - アニメーションを追加
  useEffect(() => {
    // カテゴリー変更時のトランジション効果
    setIsChanging(true);
    const timer = setTimeout(() => setIsChanging(false), 300);
    
    // カテゴリー変更時にスクロール位置をリセット
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
    
    return () => clearTimeout(timer);
  }, [activeCategory]);
  
  // スクロール可能性の確認
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollRight(scrollWidth > clientWidth);
      }
    };
    
    // カテゴリ変更時やウィンドウサイズ変更時にスクロール可能性をチェック
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    
    // スクロール位置の監視
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      }
    };
    
    scrollContainerRef.current?.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkScrollable);
      scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [filteredMenuItems]);
  
  // カテゴリー変更ハンドラー
  const handleCategoryChange = (category: MenuCategory) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  };
  
  // スクロールヒントボタンのクリックハンドラー
  const handleScrollToEnd = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        left: scrollWidth - clientWidth,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section 
      ref={sectionRef} 
      id="menu" 
      className="h-screen py-6 md:py-8 bg-paper text-ink flex flex-col overflow-hidden"
    >
      <div className="container mx-auto px-4 flex flex-col h-full">
        <h2 className="font-mincho text-2xl md:text-3xl text-center mb-4 animate-on-scroll opacity-0">
          <span className="inline-block border-b border-accent pb-2">お品書き</span>
        </h2>
        
        {/* メインコンテンツ */}
        <div className="max-w-6xl mx-auto w-full flex flex-col flex-grow overflow-hidden">
          {/* メニューカード表示エリア - スクロール可能 */}
          <div className="relative flex-grow">
            <div 
              ref={scrollContainerRef}
              className="flex-grow overflow-x-auto pb-4 mb-4 flex items-center h-full scrollbar-hide"
            >
              <div className={`
                flex space-x-4 px-2 min-w-max transition-opacity duration-300 ease-in-out
                ${isChanging ? 'opacity-0' : 'opacity-100'}
              `}>
                {filteredMenuItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="bg-paper border border-accent/20 rounded-sm overflow-hidden hover:shadow-md flex-shrink-0 transition-all duration-500"
                    style={{ 
                      width: '240px',
                      transform: `translateY(${isChanging ? '20px' : '0'})`,
                      opacity: isChanging ? 0 : 1,
                      transitionDelay: `${isChanging ? 0 : index * 100}ms`
                    }}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="240px"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-mincho text-base mb-1">{item.title}</h3>
                      <p className="text-ink/80 mb-2 text-xs">{item.description}</p>
                      <p className="font-mincho text-right text-accent text-sm">{item.price}<span className="text-xs ml-1">{item.price !== '要相談' ? '/1名様' : ''}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* スクロールインジケーター */}
            {canScrollRight && (
              <div 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-l-full p-2 shadow-md hover:bg-opacity-80 cursor-pointer transition-all duration-300"
                onClick={handleScrollToEnd}
                aria-label="右端までスクロール"
                role="button"
                tabIndex={0}
              >
                <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
          
          {/* カテゴリータブ */}
          <div className="animate-on-scroll opacity-0 mt-auto">
            <div className={`
              grid gap-2 mb-4
              ${useCompactButtons ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-6'}
            `}>
              {menuCategories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`
                    border transition-all duration-300 py-2 px-1 text-center font-mincho cursor-pointer
                    whitespace-nowrap text-xs md:text-sm overflow-hidden text-ellipsis
                    ${activeCategory === category 
                      ? 'bg-zinc-800 text-white border-zinc-500 font-bold shadow-md' 
                      : 'border-black text-black-700 hover:bg-zinc-100 hover:border-zinc-400 hover:text-zinc-900'}
                  `}
                  aria-pressed={activeCategory === category}
                  aria-label={category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* 注釈 */}
          <div className="text-center animate-on-scroll opacity-0 text-xs md:text-sm text-ink/60">
            <p>※ 仕入れ状況により変更あり・料金は税込・サービス料10%別</p>
            <p className="font-mincho">ご予約: 050-5487-4317</p>
          </div>
        </div>
      </div>
    </section>
  );
}
