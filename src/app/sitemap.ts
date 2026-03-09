import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['uk', 'en'];
  const pages = ['', '/pricing'];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );
}
