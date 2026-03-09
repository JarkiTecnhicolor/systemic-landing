import { setRequestLocale } from 'next-intl/server';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PricingPreview from '../../../components/landing/PricingPreview';
import FAQSection from '../../../components/landing/FAQSection';
import CTASection from '../../../components/landing/CTASection';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'uk' ? 'Тарифи — Systemic CRM' : 'Pricing — Systemic CRM',
    description: locale === 'uk'
      ? 'Прозорі тарифи. Почніть безкоштовно, оберіть план під ваш бізнес.'
      : 'Transparent pricing. Start for free, choose a plan for your business.',
  };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
