import { setRequestLocale } from 'next-intl/server';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import HelpArticle from '../../../../components/help/HelpArticle';
import { BreadcrumbJsonLd } from '../../../../components/seo/JsonLd';
import { SITE_URL } from '../../../../lib/constants';
import type { Metadata } from 'next';

const meta: Record<string, { title: string; description: string }> = {
  uk: { title: 'Локації в Systemic CRM — повний гід', description: 'Як працюють локації в Systemic CRM: мультилокації, каса, склади, співробітники, звіти.' },
  en: { title: 'Locations in Systemic CRM — Complete Guide', description: 'How locations work in Systemic CRM: multi-location, checkout, warehouses, staff, reports.' },
  es: { title: 'Ubicaciones en Systemic CRM — Guía completa', description: 'Cómo funcionan las ubicaciones en Systemic CRM.' },
  fr: { title: 'Localisations dans Systemic CRM — Guide complet', description: 'Comment fonctionnent les localisations dans Systemic CRM.' },
  it: { title: 'Sedi in Systemic CRM — Guida completa', description: 'Come funzionano le sedi in Systemic CRM.' },
  pl: { title: 'Lokalizacje w Systemic CRM — Kompletny przewodnik', description: 'Jak działają lokalizacje w Systemic CRM.' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale] ?? meta.en;
  return { title: m.title, description: m.description };
}

export default async function LocationsGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeLabel: Record<string, string> = { uk: 'Головна', en: 'Home', es: 'Inicio', fr: 'Accueil', it: 'Home', pl: 'Strona główna' };
  const helpLabel: Record<string, string> = { uk: 'Довідка', en: 'Help Center', es: 'Ayuda', fr: 'Aide', it: 'Assistenza', pl: 'Pomoc' };
  const locLabel: Record<string, string> = { uk: 'Локації', en: 'Locations', es: 'Ubicaciones', fr: 'Localisations', it: 'Sedi', pl: 'Lokalizacje' };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel[locale] ?? 'Home', url: `${SITE_URL}/${locale}` },
          { name: helpLabel[locale] ?? 'Help Center', url: `${SITE_URL}/${locale}/help` },
          { name: locLabel[locale] ?? 'Locations', url: `${SITE_URL}/${locale}/help/locations` },
        ]}
      />
      <Header />
      <main className="pt-16">
        <HelpArticle articleKey="locations" />
      </main>
      <Footer />
    </>
  );
}
