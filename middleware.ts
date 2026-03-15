import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// Map country codes to our supported locales
const COUNTRY_TO_LOCALE: Record<string, string> = {
  UA: 'uk',
  PL: 'pl',
  ES: 'es',
  FR: 'fr',
  IT: 'it',
  // English-speaking countries
  US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en',
  // Latin America → Spanish
  MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
  // French-speaking
  BE: 'fr', CH: 'fr', LU: 'fr',
};

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // Only apply geo-detection when visiting root without an existing locale cookie
  const hasLocaleCookie = req.cookies.has('NEXT_LOCALE');
  const pathname = req.nextUrl.pathname;
  const isRoot = pathname === '/';

  if (isRoot && !hasLocaleCookie) {
    const country = req.headers.get('x-vercel-ip-country') || '';
    const geoLocale = COUNTRY_TO_LOCALE[country];

    if (geoLocale && geoLocale !== routing.defaultLocale) {
      // Rewrite the Accept-Language header so next-intl picks up our geo locale
      const headers = new Headers(req.headers);
      headers.set('Accept-Language', `${geoLocale};q=1.0`);
      const modifiedReq = new NextRequest(req.url, {
        headers,
        method: req.method,
      });
      // Copy cookies from original request
      req.cookies.getAll().forEach(c => modifiedReq.cookies.set(c.name, c.value));
      return intlMiddleware(modifiedReq);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(uk|en|es|fr|it|pl)/:path*'],
};
