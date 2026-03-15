import { useTranslations } from 'next-intl';
import Button from '../ui/Button';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import { APP_URL } from '../../lib/constants';

export default function PricingPreview() {
  const t = useTranslations('pricing');

  const tiers = [0, 1, 2];
  const popular = 1;

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-24 bg-bg-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">{t('title')}</h2>
            <p className="text-lg text-text-secondary">{t('subtitle')}</p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((i) => (
            <AnimateOnScroll key={i}>
              <div className={`relative rounded-2xl p-8 flex flex-col h-full ${
                i === popular
                  ? 'bg-primary-dark text-white border-2 border-accent shadow-2xl scale-105'
                  : 'bg-white border border-border'
              }`}>
                {i === popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-4 py-1 rounded-full">
                    {t('popular')}
                  </div>
                )}

                <h3 className={`text-xl font-bold mb-2 ${i === popular ? 'text-white' : 'text-text-primary'}`}>
                  {t(`tiers.${i}.name`)}
                </h3>
                <div className="mb-1">
                  <span className={`text-3xl font-bold ${i === popular ? 'text-white' : 'text-text-primary'}`}>
                    {t(`tiers.${i}.price`)}
                  </span>
                  <span className={`text-sm ml-1 ${i === popular ? 'text-white/60' : 'text-text-secondary'}`}>/ {t('monthly')}</span>
                </div>
                <p className={`text-sm mb-6 ${i === popular ? 'text-white/70' : 'text-text-secondary'}`}>
                  {t(`tiers.${i}.description`)}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {[0, 1, 2, 3].map((j) => {
                    let text: string;
                    try { text = t(`tiers.${i}.features.${j}`); } catch { return null; }
                    return (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <svg className={`h-5 w-5 shrink-0 ${i === popular ? 'text-accent' : 'text-accent'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className={i === popular ? 'text-white/90' : ''}>{text}</span>
                      </li>
                    );
                  })}
                </ul>

                <Button
                  href={APP_URL}
                  variant={i === popular ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {t(`tiers.${i}.cta`)}
                </Button>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
            <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
              <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
              </svg>
              {t('trial')}
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
              <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('allModules')}
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
              <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              {t('yearlyDiscount')}
            </span>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
