'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

const ARTICLES = [
  { key: 'locations', icon: '📍' },
];

export default function HelpHub() {
  const t = useTranslations('help');
  const locale = useLocale();

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-4">
          {t('title')}
        </h1>
        <p className="text-text-secondary mb-12">
          {t('subtitle')}
        </p>

        <div className="grid gap-4">
          {ARTICLES.map(({ key, icon }) => (
            <Link
              key={key}
              href={`/${locale}/help/${key}`}
              className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:border-accent/40 hover:shadow-md transition-all group"
            >
              <span className="text-2xl">{icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-primary-dark group-hover:text-accent transition-colors">
                  {t(`articles.${key}.title`)}
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  {t(`articles.${key}.description`)}
                </p>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-accent ml-auto mt-1 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
