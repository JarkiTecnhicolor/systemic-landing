import { setRequestLocale, getTranslations } from 'next-intl/server';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PricingPreview from '../../../components/landing/PricingPreview';
import FAQSection from '../../../components/landing/FAQSection';
import CTASection from '../../../components/landing/CTASection';
import { FAQPageJsonLd, BreadcrumbJsonLd } from '../../../components/seo/JsonLd';
import { SITE_URL } from '../../../lib/constants';
import type { Metadata } from 'next';

const pricingMeta: Record<string, { title: string; description: string }> = {
  uk: { title: 'Тарифи — Systemic CRM', description: 'Прозорі тарифи Systemic CRM. Start від 199 грн/міс, Business 499 грн, Pro 999 грн. Всі модулі включено.' },
  en: { title: 'Pricing — Systemic CRM', description: 'Transparent Systemic CRM pricing. Start from 199 UAH/mo, Business 499, Pro 999. All modules included.' },
  es: { title: 'Precios — Systemic CRM', description: 'Precios transparentes de Systemic CRM. Start desde 199 UAH/mes, Business 499, Pro 999. Todos los módulos incluidos.' },
  fr: { title: 'Tarifs — Systemic CRM', description: 'Tarifs transparents Systemic CRM. Start à partir de 199 UAH/mois, Business 499, Pro 999. Tous les modules inclus.' },
  it: { title: 'Prezzi — Systemic CRM', description: 'Prezzi trasparenti Systemic CRM. Start da 199 UAH/mese, Business 499, Pro 999. Tutti i moduli inclusi.' },
  pl: { title: 'Cennik — Systemic CRM', description: 'Przejrzyste ceny Systemic CRM. Start od 199 UAH/mies., Business 499, Pro 999. Wszystkie moduły w cenie.' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = pricingMeta[locale] ?? pricingMeta.en;
  return { title: meta.title, description: meta.description };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });
  const faqItems = [0, 1, 2, 3, 4, 5].map((i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  const homeLabel: Record<string, string> = { uk: 'Головна', en: 'Home', es: 'Inicio', fr: 'Accueil', it: 'Home', pl: 'Strona główna' };
  const pricingLabel: Record<string, string> = { uk: 'Тарифи', en: 'Pricing', es: 'Precios', fr: 'Tarifs', it: 'Prezzi', pl: 'Cennik' };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel[locale] ?? 'Home', url: `${SITE_URL}/${locale}` },
          { name: pricingLabel[locale] ?? 'Pricing', url: `${SITE_URL}/${locale}/pricing` },
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
