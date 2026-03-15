import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['uk', 'en', 'es', 'fr', 'it', 'pl'];
  const pages = ['', '/pricing'];

  return pages.map((page) => ({
    url: `${SITE_URL}/uk${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, `${SITE_URL}/${locale}${page}`])
      ),
    },
  }));
}
