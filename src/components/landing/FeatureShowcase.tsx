import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Badge from '../ui/Badge';
import AnimateOnScroll from '../ui/AnimateOnScroll';

export default function FeatureShowcase() {
  const t = useTranslations();

  const showcases = [0, 1, 2];

  return (
    <section className="py-24 bg-bg-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        {showcases.map((i) => (
          <AnimateOnScroll key={i}>
            <div className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
              <div className="flex-1">
                <Badge className="mb-4">{t(`showcases.${i}.badge`)}</Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                  {t(`showcases.${i}.title`)}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {t(`showcases.${i}.description`)}
                </p>
                <ul className="space-y-2">
                  {[0, 1, 2].map((j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-text-primary">
                      <svg className="h-5 w-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {t(`showcases.${i}.bullets.${j}`)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Screenshot */}
              <div className="flex-1 w-full">
                <div className="rounded-2xl bg-white border border-border p-4 shadow-lg">
                  <Image
                    src={`/images/showcase-${i}.jpg`}
                    alt={t(`showcases.${i}.title`)}
                    width={1920}
                    height={1080}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
