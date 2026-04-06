import { setRequestLocale } from 'next-intl/server';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import HelpHub from '../../../components/help/HelpHub';
import { BreadcrumbJsonLd } from '../../../components/seo/JsonLd';
import { SITE_URL } from '../../../lib/constants';
import type { Metadata } from 'next';

const meta: Record<string, { title: string; description: string }> = {
  uk: { title: 'Довідка — Systemic CRM', description: 'Гіди та інструкції для роботи з Systemic CRM. Локації, каса, програми лояльності та інше.' },
  en: { title: 'Help Center — Systemic CRM', description: 'Guides and instructions for Systemic CRM. Locations, checkout, loyalty programs and more.' },
  es: { title: 'Centro de Ayuda — Systemic CRM', description: 'Guías e instrucciones para Systemic CRM.' },
  fr: { title: 'Centre d\'aide — Systemic CRM', description: 'Guides et instructions pour Systemic CRM.' },
  it: { title: 'Centro Assistenza — Systemic CRM', description: 'Guide e istruzioni per Systemic CRM.' },
  pl: { title: 'Pomoc — Systemic CRM', description: 'Przewodniki i instrukcje dla Systemic CRM.' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale] ?? meta.en;
  return { title: m.title, description: m.description };
}

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeLabel: Record<string, string> = { uk: 'Головна', en: 'Home', es: 'Inicio', fr: 'Accueil', it: 'Home', pl: 'Strona główna' };
  const helpLabel: Record<string, string> = { uk: 'Довідка', en: 'Help Center', es: 'Ayuda', fr: 'Aide', it: 'Assistenza', pl: 'Pomoc' };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel[locale] ?? 'Home', url: `${SITE_URL}/${locale}` },
          { name: helpLabel[locale] ?? 'Help Center', url: `${SITE_URL}/${locale}/help` },
        ]}
      />
      <Header />
      <main className="pt-16">
        <HelpHub />
      </main>
      <Footer />
    </>
  );
}
