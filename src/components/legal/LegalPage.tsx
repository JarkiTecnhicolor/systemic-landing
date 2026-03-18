'use client';

import { useTranslations } from 'next-intl';

type Props = {
  contentKey: 'terms' | 'privacy';
};

export default function LegalPage({ contentKey }: Props) {
  const t = useTranslations('legal');
  const sections: string[] = t.raw(`${contentKey}.sections`);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-2">
          {t(`${contentKey}.title`)}
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          {t(`${contentKey}.effectiveDate`)}
        </p>

        <div className="legal-content">
          {sections.map((html, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: html }} className="mb-8" />
          ))}
        </div>
      </div>
    </section>
  );
}
