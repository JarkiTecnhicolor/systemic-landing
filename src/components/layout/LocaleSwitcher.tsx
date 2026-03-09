'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../../i18n/navigation';

export default function LocaleSwitcher({ scrolled = false }: { scrolled?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = locale === 'uk' ? 'en' : 'uk';

  return (
    <button
      onClick={() => router.replace(pathname, { locale: switchTo })}
      className={`text-sm font-medium px-2 py-1 rounded transition-colors cursor-pointer ${
        scrolled
          ? 'text-text-secondary hover:text-primary hover:bg-primary-light'
          : 'text-white/80 hover:text-white hover:bg-white/10'
      }`}
    >
      {locale === 'uk' ? 'EN' : 'UA'}
    </button>
  );
}
