import { client } from '../../../libs/microcms';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import ArticleContent from './ArticleContent';
import { Metadata } from 'next';

// ブログ記事の型定義
export type Props = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  category?: { name: string };
  thumbnail: { 
    url: string;
    width: number;
    height: number;
    alt?: string;
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

// 動的なメタデータの生成
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPost(id);
  
  if (!post) {
    return {
      title: 'お知らせ - 記事が見つかりません | 割烹 神谷',
      description: '指定された記事は見つかりませんでした。',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kappou-kamiya.vercel.app';
  
  return {
    title: `${post.title} | 割烹 神谷`,
    description: post.description || '割烹 神谷からのお知らせです。',
    keywords: `${post.title}, ${post.category?.name || 'お知らせ'}, 割烹神谷, 川口, 和食, ${post.category?.name ? post.category.name + ',' : ''} 季節の料理`,
    alternates: {
      canonical: `${siteUrl}/news/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/news/${post.id}`,
      images: post.thumbnail ? [{ url: post.thumbnail.url }] : undefined,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kappou-kamiya.vercel.app';

  // BreadcrumbList 構造化データ
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'お知らせ',
        item: `${siteUrl}/news`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteUrl}/news/${post.id}`,
      },
    ],
  };

  // Article 構造化データ
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.thumbnail ? post.thumbnail.url : `${siteUrl}/images/kamiya-logo.webp`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: '割烹 神谷',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: '割烹 神谷',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/kamiya-logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/news/${post.id}`,
    },
    ...(post.category && { articleSection: post.category.name }),
  };

  return (
    <>
      {/* BreadcrumbList 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Article 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="mx-auto mt-36 px-6 md:px-16 bg-stone-50/80">
        <ArticleContent post={post} formattedDate={formattedDate} />
      </main>
    </>
  );
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
