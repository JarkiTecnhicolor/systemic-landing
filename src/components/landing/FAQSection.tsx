import { useTranslations } from 'next-intl';
import Accordion from '../ui/Accordion';
import AnimateOnScroll from '../ui/AnimateOnScroll';

export default function FAQSection() {
  const t = useTranslations('faq');

  const items = [0, 1, 2, 3, 4, 5].map((i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  return (
    <section id="faq" className="py-24 bg-bg-alt">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-16">{t('title')}</h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <Accordion items={items} />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
