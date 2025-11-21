import { client } from '../../libs/microcms';
import { NextResponse } from 'next/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kappou-kamiya.vercel.app';

type NewsPost = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
};

async function generateRSS() {
  try {
    // MicroCMSからニュース記事を取得
    const data = await client.get({
      endpoint: 'news',
      queries: {
        fields: 'id,title,description,publishedAt,updatedAt',
        limit: 50,
        orders: '-publishedAt',
      },
    });

    const posts = data.contents as NewsPost[];

    // RSS 2.0 フィード生成
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>割烹 神谷 - お知らせ</title>
    <link>${siteUrl}</link>
    <description>三代続く川口の老舗割烹料理店「割烹 神谷」からのお知らせ</description>
    <language>ja</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/news/${post.id}</link>
      <guid isPermaLink="true">${siteUrl}/news/${post.id}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`;

    return rss;
  } catch (error) {
    console.error('RSS生成エラー:', error);
    // エラー時は空のRSSフィードを返す
    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>割烹 神谷 - お知らせ</title>
    <link>${siteUrl}</link>
    <description>三代続く川口の老舗割烹料理店「割烹 神谷」からのお知らせ</description>
  </channel>
</rss>`;
  }
}

// XMLエスケープ関数
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const rss = await generateRSS();

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
