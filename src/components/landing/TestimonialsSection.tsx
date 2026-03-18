import { useTranslations } from 'next-intl';
import AnimateOnScroll from '../ui/AnimateOnScroll';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-16">{t('title')}</h2>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <AnimateOnScroll key={i}>
              <div className="rounded-2xl border border-border p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent/20 to-primary-light flex items-center justify-center text-lg font-bold text-primary">
                    {t(`items.${i}.name`).charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{t(`items.${i}.name`)}</div>
                    <div className="text-sm text-text-secondary">{t(`items.${i}.role`)}</div>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed italic">&ldquo;{t(`items.${i}.text`)}&rdquo;</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
