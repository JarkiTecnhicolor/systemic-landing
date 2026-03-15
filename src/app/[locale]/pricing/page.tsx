import { setRequestLocale, getTranslations } from 'next-intl/server';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PricingPreview from '../../../components/landing/PricingPreview';
import FAQSection from '../../../components/landing/FAQSection';
import CTASection from '../../../components/landing/CTASection';
import { FAQPageJsonLd, BreadcrumbJsonLd } from '../../../components/seo/JsonLd';
import { SITE_URL } from '../../../lib/constants';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'uk' ? 'Тарифи — Systemic CRM' : 'Pricing — Systemic CRM',
    description: locale === 'uk'
      ? 'Прозорі тарифи Systemic CRM. Start від 199 грн/міс, Business 499 грн, Pro 999 грн. Всі модулі включено.'
      : 'Transparent Systemic CRM pricing. Start from 199 UAH/mo, Business 499, Pro 999. All modules included.',
  };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });
  const faqItems = [0, 1, 2, 3, 4, 5].map((i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  const isUk = locale === 'uk';

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isUk ? 'Головна' : 'Home', url: `${SITE_URL}/${locale}` },
          { name: isUk ? 'Тарифи' : 'Pricing', url: `${SITE_URL}/${locale}/pricing` },
        ]}
      />
      <FAQPageJsonLd items={faqItems} />
      <Header />
      <main className="pt-16">
        <PricingPreview />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
