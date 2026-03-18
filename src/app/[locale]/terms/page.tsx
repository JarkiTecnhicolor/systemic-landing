import { setRequestLocale } from 'next-intl/server';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import LegalPage from '../../../components/legal/LegalPage';
import { BreadcrumbJsonLd } from '../../../components/seo/JsonLd';
import { SITE_URL } from '../../../lib/constants';
import type { Metadata } from 'next';

const termsMeta: Record<string, { title: string; description: string }> = {
  uk: { title: 'Умови використання — Systemic CRM', description: 'Умови використання сервісу Systemic CRM. Тарифні плани, права та обовʼязки користувачів.' },
  en: { title: 'Terms of Service — Systemic CRM', description: 'Systemic CRM Terms of Service. Pricing plans, user rights and obligations.' },
  es: { title: 'Términos de servicio — Systemic CRM', description: 'Términos de servicio de Systemic CRM. Planes de precios, derechos y obligaciones.' },
  fr: { title: 'Conditions d\'utilisation — Systemic CRM', description: 'Conditions d\'utilisation de Systemic CRM. Tarifs, droits et obligations des utilisateurs.' },
  it: { title: 'Termini di servizio — Systemic CRM', description: 'Termini di servizio di Systemic CRM. Piani tariffari, diritti e obblighi degli utenti.' },
  pl: { title: 'Regulamin — Systemic CRM', description: 'Regulamin serwisu Systemic CRM. Plany cenowe, prawa i obowiązki użytkowników.' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = termsMeta[locale] ?? termsMeta.en;
  return { title: meta.title, description: meta.description };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeLabel: Record<string, string> = { uk: 'Головна', en: 'Home', es: 'Inicio', fr: 'Accueil', it: 'Home', pl: 'Strona główna' };
  const termsLabel: Record<string, string> = { uk: 'Умови використання', en: 'Terms of Service', es: 'Términos de servicio', fr: "Conditions d'utilisation", it: 'Termini di servizio', pl: 'Regulamin' };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel[locale] ?? 'Home', url: `${SITE_URL}/${locale}` },
          { name: termsLabel[locale] ?? 'Terms of Service', url: `${SITE_URL}/${locale}/terms` },
        ]}
      />
      <Header />
      <main className="pt-16">
        <LegalPage contentKey="terms" />
      </main>
      <Footer />
    </>
  );
}
