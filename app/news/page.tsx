import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { client } from '../../libs/microcms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お知らせ一覧 | 割烹 神谷',
  description: '割烹 神谷からのお知らせ、ブログ、コラムのご案内などをご覧いただけます。',
};

// ブログ記事の型定義
type Post = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  category?: { name: string };
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
};

// microCMSからブログ記事を取得（すべて）
async function getAllBlogPosts(): Promise<Post[]> {
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: {
        fields: 'id,title,publishedAt,thumbnail,description,category',
        limit: 100,  // 最大数を取得（必要に応じて調整）
      },
    });
    return data.contents;
  } catch (error) {
    console.error('microCMS APIエラー:', error);
    return []; // エラーの場合は空の配列を返す
  }
}

export default async function NewsListPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="mx-auto mt-36 px-6 md:px-16 py-20 bg-stone-50/80">
      <div className="mb-20">
        <p className="text-amber-800/60 text-sm mb-2">news</p>
        <h1 className="text-4xl font-medium text-stone-800">お知らせ</h1>
      </div>

      <div className="flex md:px-24 px-4">

        <div className="flex-1">
          {posts.length > 0 ? (
            <div className="space-y-24">
              {posts.map((post, index) => {
                const formattedDate = dayjs(post.publishedAt).format('YYYY.MM.DD');
                
                return (
                  <div key={post.id} className="border-t border-stone-200 pt-12 relative">
                    <div className="vertical-text absolute -left-10 top-12 text-xs font-light text-stone-400 hidden md:block">
                      {formattedDate}
                    </div>
                    
                    <Link 
                      href={`/news/${post.id}`}
                      className="group block"
                      aria-label={`${post.title}の記事へ移動`}
                    >
                      <div className="grid md:grid-cols-[1fr,2fr] gap-12">
                        {post.thumbnail ? (
                          <div className="relative aspect-[3/2.5] w-full max-w-[280px] overflow-hidden">
                            <Image
                              src={post.thumbnail.url}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 280px"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[3/2.5] w-full max-w-[280px] bg-stone-200 flex items-center justify-center">
                            <span className="text-stone-400">No Image</span>
                          </div>
                        )}
                        
                        <div className="flex flex-col">
                          <div>
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                              <time className="text-stone-500 text-sm block md:hidden">{formattedDate}</time>
                              {post.category && (
                                <span className="inline-flex items-center bg-amber-50/60 text-amber-800 px-3 py-1 text-xs font-medium border-l-2 border-amber-200/70 tracking-wider">
                                  <svg className="mr-1.5 h-3 w-3 text-amber-700/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                  </svg>
                                  {post.category.name}
                                </span>
                              )}
                            </div>
                            <h2 className="text-xl font-bold text-stone-800 mb-4 group-hover:text-stone-600 transition-colors">{post.title}</h2>
                            <p className="text-stone-600 mb-4 text-sm">{post.description}</p>
                          </div>
                          
                          <div className="text-sm text-amber-700/70 mt-auto pt-4">
                            {index === 2 ? 'information' : ''}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-stone-600 mb-6">現在お知らせはありません</p>
              <Link href="/" className="text-stone-600 underline hover:text-stone-800" aria-label="トップページに戻る">
                トップページに戻る
              </Link>
            </div>
          )}
          
          <div className="mt-32 pt-8 flex justify-center">
            <div className="w-2 h-2 rounded-full bg-amber-800/80 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-stone-300 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-stone-300 mx-1"></div>
          </div>
        </div>
      </div>
    </main>
  );
} 