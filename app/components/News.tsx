import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { client } from '../../libs/microcms';

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
};

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<Props[]> {
  try {
    const data = await client.get({
      endpoint: 'news', // 'blog'はmicroCMSのエンドポイント名
      queries: {
        fields: 'id,title,publishedAt,thumbnail',  // 必要なフィールドを取得
        limit: 5,  // 最新の5件を取得
      },
    });
    return data.contents;
  } catch (error) {
    console.error('microCMS APIエラー:', error);
    return []; // エラーの場合は空の配列を返す
  }
}

export default async function News() {
  const posts = await getBlogPosts();

  return (
    <section className='bg-stone-50 py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='text-center text-3xl font-bold mb-10'>お知らせ</h2>
        
        {posts.length > 0 ? (
          <div className='max-w-4xl mx-auto grid gap-8'>
            {posts.map((post) => {
              const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');
              
              return (
                <Link 
                  href={`/news/${post.id}`}
                  key={post.id}
                  className='group flex flex-col md:flex-row gap-4 items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'
                >
                  {post.thumbnail ? (
                    <div className='w-full md:w-32 h-24 relative rounded-md overflow-hidden flex-shrink-0'>
                      <Image
                        src={post.thumbnail.url}
                        alt={post.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                        sizes="(max-width: 768px) 100vw, 128px"
                      />
                    </div>
                  ) : (
                    <div className='w-full md:w-32 h-24 bg-stone-200 rounded-md flex-shrink-0 flex items-center justify-center'>
                      <span className='text-stone-400'>No Image</span>
                    </div>
                  )}
                  
                  <div className='flex-1'>
                    <time className='text-sm text-stone-500 block mb-1'>{formattedDate}</time>
                    <h3 className='font-medium group-hover:text-stone-700 transition-colors duration-200'>{post.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className='max-w-4xl mx-auto text-center py-8'>
            <p className='text-stone-600'>現在お知らせはありません</p>
          </div>
        )}
        
        <div className='text-center mt-8'>
          <Link href='/news' className='inline-block border border-stone-300 px-6 py-2 rounded-md text-stone-700 hover:bg-stone-100 transition-colors duration-200'>
            すべてのお知らせを見る
          </Link>
        </div>
      </div>
    </section>
  );
}
