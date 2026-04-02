import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
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

// UA pricing region — everything else gets EU pricing
const UA_COUNTRIES = new Set(['UA']);

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const hasLocaleCookie = req.cookies.has('NEXT_LOCALE');
  const pathname = req.nextUrl.pathname;
  const isRoot = pathname === '/';
  const country = req.headers.get('x-vercel-ip-country') || '';

  let response: NextResponse;

  if (isRoot && !hasLocaleCookie) {
    const geoLocale = COUNTRY_TO_LOCALE[country];

    if (geoLocale) {
      const headers = new Headers(req.headers);
      headers.set('Accept-Language', `${geoLocale};q=1.0`);
      const modifiedReq = new NextRequest(req.url, {
        headers,
        method: req.method,
      });
      req.cookies.getAll().forEach(c => modifiedReq.cookies.set(c.name, c.value));
      response = intlMiddleware(modifiedReq) as NextResponse;
    } else {
      response = intlMiddleware(req) as NextResponse;
    }
  } else {
    response = intlMiddleware(req) as NextResponse;
  }

  // Set pricing region cookie (ua or eu) based on IP country
  if (!req.cookies.has('region')) {
    const region = UA_COUNTRIES.has(country) ? 'ua' : 'eu';
    response.cookies.set('region', region, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/', '/(uk|en|es|fr|it|pl)/:path*'],
};
