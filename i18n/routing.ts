import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['uk', 'en', 'es', 'fr', 'it', 'pl'],
  defaultLocale: 'uk',
});
