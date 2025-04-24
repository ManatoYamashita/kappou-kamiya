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
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2">お知らせ</h1>
        <p className="text-stone-600">割烹 神谷からの最新情報</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-8">
          {posts.map((post) => {
            const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');
            
            return (
              <Link 
                href={`/news/${post.id}`}
                key={post.id}
                className="group flex flex-col md:flex-row gap-6 items-start bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {post.thumbnail ? (
                  <div className="w-full md:w-48 h-32 relative rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={post.thumbnail.url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 192px"
                    />
                  </div>
                ) : (
                  <div className="w-full md:w-48 h-32 bg-stone-200 rounded-md flex-shrink-0 flex items-center justify-center">
                    <span className="text-stone-400">No Image</span>
                  </div>
                )}
                
                <div className="flex-1">
                  <time className="text-sm text-stone-500 block mb-2">{formattedDate}</time>
                  <h2 className="text-xl font-medium mb-2 group-hover:text-stone-700 transition-colors duration-200">{post.title}</h2>
                  <div className="flex">
                    <span className="text-stone-600 group-hover:text-stone-800 transition-colors duration-200">
                      詳細を見る →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-stone-600 mb-4">現在お知らせはありません</p>
          <Link href="/" className="text-stone-600 underline hover:text-stone-800">
            トップページに戻る
          </Link>
        </div>
      )}
    </main>
  );
} 