import { client } from '../../../libs/microcms';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import ArticleContent from './ArticleContent';

// ブログ記事の型定義
export type Props = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  publishedAt: string;
  category: { name: string };
  thumbnail?: { 
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

// microCMSから特定の記事を取得
async function getBlogPost(id: string): Promise<Props | null> {
  try {
    const data = await client.get({
      endpoint: `news/${id}`,
    });
    return data;
  } catch (error) {
    console.error('microCMS APIエラー:', error);
    return null; // エラーの場合はnullを返す
  }
}

// 記事詳細ページの生成 (サーバーコンポーネント)
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // IDを取得
  const post = await getBlogPost(id);

  // 記事が見つからない場合は404ページを表示
  if (!post) {
    notFound();
  }

  // dayjsを使ってpublishedAtをYY.MM.DD形式に変換
  const formattedDate = dayjs(post.publishedAt).format('YYYY年MM月DD日');

  return <ArticleContent post={post} formattedDate={formattedDate} />;
}

// 静的パスを生成
export async function generateStaticParams() {
  try {
    const contentIds = await client.getAllContentIds({ endpoint: 'news' });
    return contentIds.map((contentId) => ({
      id: contentId, // 各記事のIDをパラメータとして返す
    }));
  } catch (error) {
    console.error('microCMS APIエラー (静的パス生成):', error);
    return []; // エラーの場合は空の配列を返す
  }
}
