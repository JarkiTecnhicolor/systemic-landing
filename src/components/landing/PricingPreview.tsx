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
                  {i === 1 && <span className={`text-sm ml-1 ${i === popular ? 'text-white/60' : 'text-text-secondary'}`}>/ {t('monthly')}</span>}
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
                  href={i === 2 ? `mailto:hello@systemic.ua` : APP_URL}
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
          <p className="text-center text-sm text-text-secondary mt-8">{t('note')}</p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
