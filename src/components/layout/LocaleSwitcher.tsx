'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../../i18n/navigation';

const locales = [
  { code: 'uk', label: 'UA' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
  { code: 'pl', label: 'PL' },
] as const;

export default function LocaleSwitcher({ scrolled = false }: { scrolled?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = locales.find(l => l.code === locale) ?? locales[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`text-sm font-medium px-2 py-1 rounded transition-colors cursor-pointer ${
          scrolled
            ? 'text-text-secondary hover:text-primary hover:bg-primary-light'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
      >
        {current.label}
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[48px] z-50">
          {locales.map(l => (
            <button
              key={l.code}
              onClick={() => {
                router.replace(pathname, { locale: l.code });
                setOpen(false);
              }}
              className={`block w-full text-left px-3 py-1.5 text-sm transition-colors cursor-pointer ${
                l.code === locale
                  ? 'text-primary font-semibold bg-primary-light'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
