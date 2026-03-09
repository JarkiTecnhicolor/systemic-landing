import { useTranslations } from 'next-intl';
import Button from '../ui/Button';
import { APP_URL } from '../../lib/constants';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-dark via-primary to-primary/90 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-[128px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button href={APP_URL} size="lg">
              {t('cta')}
            </Button>
            <Button href="#features" variant="outline" size="lg">
              {t('ctaSecondary')}
            </Button>
          </div>
          <p className="text-sm text-white/50">{t('trustLine')}</p>
        </div>

        {/* Hero screenshot placeholder */}
        <div className="mt-16 lg:mt-0 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%]">
          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 shadow-2xl">
            <div className="rounded-xl bg-gradient-to-br from-white/5 to-white/10 aspect-[16/10] flex items-center justify-center">
              <div className="text-center text-white/40">
                <svg className="mx-auto h-16 w-16 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
                <p className="text-sm">Dashboard Screenshot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
