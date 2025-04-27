'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type Props } from './page';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';

// 型を拡張してthumbnailCaptionを含める（オプショナル）
type ArticleProps = Props & {
  thumbnailCaption?: string;
  updatedAt?: string;
};

// 見出しと画像スタイルの強化
const contentStyles = `
  .article-content h1 {
    font-size: 1.875rem;
    line-height: 1.3;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    color: #44403c;
    border-bottom: 1px solid #d6d3d1;
    padding-bottom: 0.75rem;
    letter-spacing: 0.05em;
  }
  
  .article-content h2 {
    font-size: 1.5rem;
    line-height: 1.3;
    margin-top: 2rem;
    margin-bottom: 1.25rem;
    font-weight: 600;
    color: #44403c;
    border-bottom: 1px dashed #d6d3d1;
    padding-bottom: 0.5rem;
    letter-spacing: 0.05em;
  }
  
  .article-content h3 {
    font-size: 1.25rem;
    line-height: 1.3;
    margin-top: 1.75rem;
    margin-bottom: 1rem;
    font-weight: 500;
    color: #44403c;
    letter-spacing: 0.05em;
    position: relative;
    padding-left: 1rem;
  }
  
  .article-content h4, .article-content h5, .article-content h6 {
    font-size: 1.125rem;
    line-height: 1.3;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-weight: 500;
    color: #44403c;
    letter-spacing: 0.05em;
  }
  
  .article-content p {
    margin-bottom: 1.5rem;
    line-height: 2;
    color: #57534e;
    letter-spacing: 0.025em;
  }
  
  .article-content ul, .article-content ol {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    padding-left: 1.75rem;
  }
  
  .article-content li {
    margin-bottom: 0.5rem;
    line-height: 1.8;
    color: #57534e;
  }
  
  /* 画像関連のスタイル強化 */
  .article-content .image-wrapper {
    max-width: 100%;
    margin: 2rem auto;
    position: relative;
  }
  
  .article-content figure {
    margin: 2.5rem auto;
    text-align: center;
  }
  
  .article-content figcaption {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    color: #78716c;
    font-style: italic;
    text-align: center;
  }
  
  /* 引用スタイルを和風に */
  .article-content blockquote {
    background-color: #f5f5f4;
    border-left: 3px solid #d6d3d1;
    padding: 1.25rem 1.5rem;
    margin: 1.5rem 0;
    color: #57534e;
    font-style: italic;
    position: relative;
  }
  
  .article-content blockquote::before {
    content: '"';
    position: absolute;
    top: 0;
    left: 0.5rem;
    font-size: 2rem;
    color: #d6d3d1;
    font-family: serif;
    line-height: 1;
  }
`;

// 記事コンテンツを表示するクライアントコンポーネント
export default function ArticleContent({ 
  post, 
  formattedDate 
}: { 
  post: ArticleProps;
  formattedDate: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  // microCMSのリッチエディタから挿入された画像を処理
  useEffect(() => {
    if (contentRef.current) {
      // コンテンツ内の画像を探す
      const images = contentRef.current.querySelectorAll('img');
      
      images.forEach((img) => {
        // 親要素を取得
        const parent = img.parentNode;
        
        // 画像ソース、代替テキスト、サイズを取得
        const src = img.getAttribute('src') || '';
        const alt = img.getAttribute('alt') || '';
        
        // width/heightが両方指定されていても、fillを使わないようにする
        if (src && parent) {
          // 既存の画像を削除
          img.remove();
          
          // 新しいdiv要素を作成して画像をラップ
          const wrapper = document.createElement('div');
          wrapper.className = 'image-wrapper aspect-video relative';
          wrapper.style.width = '100%';
          
          // 元の親要素に挿入
          parent.appendChild(wrapper);
          
          // Next.js Imageコンポーネントの代わりにimg要素を使用
          const newImg = document.createElement('img');
          newImg.src = src;
          newImg.alt = alt;
          newImg.className = 'w-full h-auto';
          newImg.setAttribute('loading', 'lazy');
          newImg.setAttribute('decoding', 'async');
          
          // 新しいラッパーに画像を追加
          wrapper.appendChild(newImg);
        }
      });
    }
  }, [post.content]);

  return (
    <main className="mx-auto px-0 sm:px-8 py-16 sm:py-20">
      <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
      
      {/* パンくずリスト */}
      <nav className="mb-12" aria-label="パンくずリスト">
        <ol className="flex flex-wrap items-center text-sm text-stone-600">
          <li className="flex items-center">
            <Link href="/" className="text-amber-800/70 hover:text-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors">
              ホーム
            </Link>
            <svg className="mx-2 h-4 w-4 text-stone-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="flex items-center">
            <Link href="/news" className="text-amber-800/70 hover:text-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors">
              お知らせ
            </Link>
            <svg className="mx-2 h-4 w-4 text-stone-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="text-stone-500 max-w-xs truncate" aria-current="page">
            {post.title}
          </li>
        </ol>
      </nav>

      <article className="max-w-4xl mx-auto overflow-hidden" role="article" aria-labelledby="article-title">
        <header className="px-0 md:px-8 pt-8 pb-6 border-b border-stone-100 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/30 opacity-20 rounded-bl-3xl"></div>
          <div className="flex flex-wrap items-center gap-4 mb-6 relative z-10">
            <time dateTime={post.publishedAt} className="inline-flex items-center text-stone-500 text-sm">
              <svg className="mr-1.5 h-4 w-4 text-amber-700/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </time>
            {post.category && (
              <span className="inline-flex items-center bg-amber-50/60 text-amber-800 px-3 py-1 text-xs font-medium border-l-2 border-amber-200/70 tracking-wider">
                <svg className="mr-1.5 h-3 w-3 text-amber-700/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {post.category.name}
              </span>
            )}
          </div>
          <h1 id="article-title" className="text-2xl sm:text-3xl font-medium text-stone-800 leading-tight tracking-wide relative z-10">{post.title}</h1>
          {post.description && (
            <p className="mt-4 text-stone-600 text-sm leading-relaxed tracking-wide relative z-10">{post.description}</p>
          )}
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-50/30 opacity-20 rounded-tr-3xl"></div>
        </header>
        
        {/* サムネイル画像がある場合は表示 */}
        {post.thumbnail && (
          <div className="relative">
            <div className="max-h-[500px] overflow-hidden">
              <Image
                src={post.thumbnail.url}
                alt={post.thumbnail.alt || ""}
                width={1200}
                height={675}
                className="w-full object-cover"
                priority
              />
            </div>
            {post.thumbnailCaption && (
              <div className="px-4 py-2 text-center bg-stone-50 text-sm text-stone-600 italic">
                {post.thumbnailCaption}
              </div>
            )}
          </div>
        )}

        <div className="p-0 sm:p-10">
          <div id="content" className="prose prose-stone max-w-none mx-auto" tabIndex={-1}>
            <div 
              className="article-content"
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: typeof post.content === 'string' ? post.content : '' }} 
            />
          </div>
        </div>
        
        {/* 記事フッター */}
        <footer className="px-8 py-6 bg-stone-50/50 border-t border-stone-100">
          <div className="text-right">
            <p className="text-xs text-stone-500">最終更新日: {dayjs(post.updatedAt || post.publishedAt).format('YYYY年MM月DD日')}</p>
          </div>
        </footer>
      </article>

      <div className="mt-12 pt-6 border-t border-stone-200 max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          <Link 
            href="/news" 
            className="inline-flex items-center text-amber-800/80 hover:text-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
          >
            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            お知らせ一覧に戻る
          </Link>
          
        </div>
      </div>
    </main>
  );
} 