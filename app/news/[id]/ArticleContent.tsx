'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type Props } from './page';

// 印刷用のスタイル
const printStyles = `
  @media print {
    nav, .no-print {
      display: none !important;
    }
    main {
      padding: 0 !important;
      max-width: 100% !important;
    }
    article {
      box-shadow: none !important;
      border-radius: 0 !important;
    }
    .article-content {
      font-size: 12pt !important;
      line-height: 1.5 !important;
    }
    a {
      text-decoration: none !important;
      color: #000 !important;
    }
    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid;
    }
    img {
      max-width: 100% !important;
      page-break-inside: avoid;
    }
  }
`;

// 見出しのスタイルを強化するCSS
const headingStyles = `
  .article-content h1 {
    font-size: 2rem;
    line-height: 1.3;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    color: #1a202c;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.5rem;
  }
  
  .article-content h2 {
    font-size: 1.75rem;
    line-height: 1.3;
    margin-top: 1.75rem;
    margin-bottom: 1.25rem;
    font-weight: 700;
    color: #1a202c;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 0.375rem;
  }
  
  .article-content h3 {
    font-size: 1.5rem;
    line-height: 1.3;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #1a202c;
  }
  
  .article-content h4 {
    font-size: 1.25rem;
    line-height: 1.3;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
    color: #1a202c;
  }
  
  .article-content h5, .article-content h6 {
    font-size: 1.125rem;
    line-height: 1.3;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #1a202c;
  }
  
  .article-content p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
  }
  
  .article-content ul, .article-content ol {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }
  
  .article-content li {
    margin-bottom: 0.5rem;
  }
`;

// フォントサイズ変更関数
// const changeFontSize = (size: string) => {
//   const articleContent = document.querySelector('.article-content') as HTMLElement | null;
//   if (articleContent) {
//     articleContent.style.fontSize = size;
//   }
// };

// 記事コンテンツを表示するクライアントコンポーネント
export default function ArticleContent({ 
  post, 
  formattedDate 
}: { 
  post: Props;
  formattedDate: string;
}) {
  return (
    <main className="max-w-4xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* 印刷用スタイル */}
      <style dangerouslySetInnerHTML={{ __html: printStyles + headingStyles }} />
      
      {/* スキップリンク */}
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-blue-600 focus:text-white focus:z-50">
        本文へスキップ
      </a>
      
      {/* パンくずリスト */}
      <nav className="mb-10" aria-label="パンくずリスト">
        <ol className="flex flex-wrap items-center text-sm">
          <li className="flex items-center">
            <Link href="/" className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500">
              ホーム
            </Link>
            <svg className="mx-2 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="flex items-center">
            <Link href="/news" className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500">
              お知らせ
            </Link>
            <svg className="mx-2 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="text-gray-600 max-w-xs truncate" aria-current="page">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* フォントサイズ調整コントロール */}
      {/* <div className="mb-6 flex justify-end">
        <div className="bg-white shadow rounded-md p-2 inline-flex items-center">
          <span className="text-sm text-gray-700 mr-2">文字サイズ:</span>
          <button
            onClick={() => changeFontSize('0.875rem')}
            className="px-2 py-1 text-sm bg-gray-100 rounded-l-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="小さい文字サイズ"
          >
            小
          </button>
          <button
            onClick={() => changeFontSize('1rem')}
            className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="標準文字サイズ"
          >
            中
          </button>
          <button
            onClick={() => changeFontSize('1.125rem')}
            className="px-2 py-1 text-sm bg-gray-100 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="大きい文字サイズ"
          >
            大
          </button>
        </div>
      </div> */}

      <article className="bg-white shadow-sm rounded-lg overflow-hidden" role="article" aria-labelledby="article-title">
        <header className="px-8 pt-8 pb-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <time dateTime={post.publishedAt} className="inline-flex items-center text-gray-600 text-sm">
              <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </time>
            {post.category && (
              <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-0.5 text-sm font-medium rounded-full">
                {post.category.name}
              </span>
            )}
          </div>
          <h1 id="article-title" className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
        </header>
        
        {/* サムネイル画像がある場合は表示 */}
        {post.thumbnail && (
          <div className="relative w-full aspect-video">
            <Image
              src={post.thumbnail.url}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        )}

        <div className="p-8">
          <div id="content" className="prose prose-blue max-w-none mx-auto" tabIndex={-1}>
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: typeof post.content === 'string' ? post.content : '' }} 
              style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#1F2937',
                letterSpacing: '0.01em'
              }}
            />
          </div>
        </div>
      </article>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between">
          <Link 
            href="/news" 
            className="inline-flex items-center text-blue-700 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            お知らせ一覧に戻る
          </Link>
          
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.print();
              }
            }}
            className="no-print inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            印刷する
          </button>
        </div>
      </div>
    </main>
  );
} 