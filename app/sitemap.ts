import { MetadataRoute } from 'next';
import { client } from '../libs/microcms';

// siteUrl constant
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kappou-kamiya.vercel.app';

// microCMSから記事IDを取得
async function getAllPostIds() {
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: {
        fields: 'id,publishedAt,updatedAt',
        limit: 100,
      },
    });
    return data.contents;
  } catch (error) {
    console.error('microCMS APIエラー:', error);
    return [];
  }
}

// 記事の型定義
type Post = {
  id: string;
  publishedAt: string;
  updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 静的ページの設定
  const staticRoutes = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // 動的なニュース記事のルート
  const posts = await getAllPostIds();
  const dynamicRoutes = posts.map((post: Post) => {
    return {
      url: `${siteUrl}/news/${post.id}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...dynamicRoutes];
} 