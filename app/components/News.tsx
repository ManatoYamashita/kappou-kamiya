import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { client } from '../../libs/microcms';
import Btn from './Btn';
import { notFound } from 'next/navigation';

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

// APIからのレスポンス型定義
type ApiResponse = {
  contents: Props[];
  totalCount: number;
  limit: number;
  offset: number;
};

// APIエラーの型定義
type ApiError = {
  message: string;
  status: number;
};

// microCMSのエラー型を定義
interface MicroCMSError extends Error {
  status?: number;
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<{posts: Props[]; error: ApiError | null}> {
  try {
    const data: ApiResponse = await client.get({
      endpoint: 'news', // 'blog'はmicroCMSのエンドポイント名
      queries: {
        fields: 'id,title,publishedAt,thumbnail', // 必要なフィールドを取得
        limit: 5, // 最新の5件を取得
      },
    });
    
    return { posts: data.contents, error: null };
    
  } catch (error) {
    console.error('microCMS APIエラー:', error);
    
    // エラーオブジェクトを整形
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : '不明なエラーが発生しました',
      status: getErrorStatus(error) || 500
    };
    
    return { posts: [], error: apiError }; // エラーと空の配列を返す
  }
}

// エラーステータスコードを取得するヘルパー関数
function getErrorStatus(error: unknown): number | undefined {
  if (error instanceof Error) {
    const microCMSError = error as MicroCMSError;
    
    // microCMSのエラーオブジェクトの構造に合わせて取得を試みる
    if (microCMSError.status) {
      return microCMSError.status;
    }
    
    if (microCMSError.response?.status) {
      return microCMSError.response.status;
    }
  }
  
  return undefined;
}

export default async function News() {
  // 記事データとエラー情報を取得
  const { posts, error } = await getBlogPosts();

  // API接続が完全に失敗した場合（サーバー停止や認証エラーなど）
  if (error && error.status >= 500) {
    // サーバーエラーの場合は専用コンポーネントを表示
    return (
      <section className='bg-stone-50 py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-center text-3xl font-bold mb-10'>お知らせ</h2>
          <div className='max-w-4xl mx-auto text-center py-8'>
            <p className='text-stone-600 mb-4'>現在、システムメンテナンス中です</p>
            <p className='text-sm text-stone-500'>しばらく経ってからお試しください</p>
          </div>
        </div>
      </section>
    );
  }

  // 404エラーなど特定のエラーの場合
  if (error && error.status === 404) {
    return notFound(); // Next.jsのnotFoundを使用
  }

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
                  aria-label={`${post.title}の記事へ移動`}
                >
                  {post.thumbnail ? (
                    <div className='w-full md:w-32 h-24 relative rounded-md overflow-hidden flex-shrink-0'>
                      <Image
                        src={post.thumbnail.url}
                        alt={post.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                        sizes="(max-width: 768px) 100vw, 128px"
                        loading="lazy"
                        decoding="async"
                        quality={75}
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
            {/* エラーがあれば表示 */}
            {error && error.status < 500 && (
              <p className='text-sm text-stone-500 mt-2'>
                {error.message === 'Contents Not Found'
                  ? 'コンテンツが見つかりませんでした'
                  : 'データの取得中にエラーが発生しました'}
              </p>
            )}
          </div>
        )}

        <div className='my-10 flex justify-end'>
          <Btn text="すべてのお知らせを見る" href="/news" aria-label="すべてのお知らせを見る" />
        </div>
      </div>
    </section>
  );
}
