import { setRequestLocale, getTranslations } from 'next-intl/server';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import HeroSection from '../../components/landing/HeroSection';
import PainPointsSection from '../../components/landing/PainPointsSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import FeatureShowcase from '../../components/landing/FeatureShowcase';
import HowItWorksSection from '../../components/landing/HowItWorksSection';
import PricingPreview from '../../components/landing/PricingPreview';
import TestimonialsSection from '../../components/landing/TestimonialsSection';
import FAQSection from '../../components/landing/FAQSection';
import CTASection from '../../components/landing/CTASection';
import {
  OrganizationJsonLd,
  SoftwareApplicationJsonLd,
  WebSiteJsonLd,
  FAQPageJsonLd,
} from '../../components/seo/JsonLd';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });
  const faqItems = [0, 1, 2, 3, 4, 5].map((i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <SoftwareApplicationJsonLd locale={locale} />
      <FAQPageJsonLd items={faqItems} />
      <Header />
      <main>
        <HeroSection />
        <PainPointsSection />
        <FeaturesSection />
        <FeatureShowcase />
        <HowItWorksSection />
        <PricingPreview />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
