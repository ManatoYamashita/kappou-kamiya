import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { client } from '../../libs/microcms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お知らせ一覧 | 割烹 神谷',
  description: '割烹 神谷からのお知らせ、イベント情報、営業日のご案内などをご覧いただけます。',
};

// ブログ記事の型定義
type Post = {
  id: string;
  title: string;
  publishedAt: string;
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
        fields: 'id,title,publishedAt,thumbnail',
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
    <main className="max-w-5xl mx-auto px-6 md:px-16 py-20 bg-stone-50/80">
      <div className="mb-20">
        <p className="text-amber-800/60 text-sm mb-2">・ news</p>
        <h1 className="text-4xl font-medium text-stone-800">お知らせ</h1>
      </div>

      <div className="flex">
        <div className="hidden md:block w-16 mr-12">
          <h2 className="vertical-text text-stone-700/80 text-sm font-light">お知らせ一覧</h2>
        </div>

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
                            <time className="text-stone-500 text-sm block mb-4 md:hidden">{formattedDate}</time>
                            <h2 className="text-xl font-normal text-stone-800 mb-4 group-hover:text-stone-600 transition-colors">{post.title}</h2>
                            
                            {index === 0 && (
                              <p className="text-stone-600 mb-4 text-sm">3/5（水）は臨時休業とさせていただきます。ご了承ください。</p>
                            )}
                            
                            {index === 1 && (
                              <p className="text-stone-600 mb-4 text-sm">12/29〜1/5まで年末年始休業とさせていただきます。新年は1/6より営業いたします。</p>
                            )}
                            
                            {index === 2 && (
                              <p className="text-stone-600 mb-4 text-sm">11/4（月）は貸切営業とさせていただきます。ご了承ください。</p>
                            )}
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
              <Link href="/" className="text-stone-600 underline hover:text-stone-800">
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