import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '割烹 神谷',
    short_name: '割烹神谷',
    description: '埼玉県川口市の老舗割烹料理店。三代続く伝統と技術で作る本格的な日本料理をご堪能ください。',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f4ed',
    theme_color: '#8b4513',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    categories: ['food', 'lifestyle', 'business'],
    lang: 'ja',
    dir: 'ltr',
  };
}
