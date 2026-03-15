import { useTranslations } from 'next-intl';
import Button from '../ui/Button';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import { REGISTER_URL, CONTACT_EMAIL } from '../../lib/constants';

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="py-24 bg-gradient-to-br from-primary-dark via-primary to-primary/90 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-accent rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnScroll>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-lg text-white/70 mb-10">{t('subtitle')}</p>
          <Button href={REGISTER_URL} size="lg">
            {t('button')}
          </Button>
          <p className="mt-6 text-sm text-white/50">
            {t('contact')}{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-white/80">{CONTACT_EMAIL}</a>
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
