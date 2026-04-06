'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Props = {
  articleKey: string;
};

export default function HelpArticle({ articleKey }: Props) {
  const t = useTranslations('help');
  const sections: string[] = t.raw(`articles.${articleKey}.sections`);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/help"
          className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          {t('backToHelp')}
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-10">
          {t(`articles.${articleKey}.title`)}
        </h1>

        <div className="legal-content">
          {sections.map((html, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: html }} className="mb-8" />
          ))}
        </div>
      </div>
    </section>
  );
}
