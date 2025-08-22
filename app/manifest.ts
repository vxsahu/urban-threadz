import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'UrbanThread - Premium Clothing & Fashion',
    short_name: 'UrbanThread',
    description: 'Discover premium clothing and fashion items at UrbanThread. Shop the latest trends in men\'s, women\'s, and unisex clothing.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['fashion', 'shopping', 'lifestyle'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait',
    scope: '/',
    prefer_related_applications: false,
  };
}
