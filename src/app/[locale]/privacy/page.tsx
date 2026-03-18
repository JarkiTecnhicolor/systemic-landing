import { setRequestLocale } from 'next-intl/server';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import LegalPage from '../../../components/legal/LegalPage';
import { BreadcrumbJsonLd } from '../../../components/seo/JsonLd';
import { SITE_URL } from '../../../lib/constants';
import type { Metadata } from 'next';

const privacyMeta: Record<string, { title: string; description: string }> = {
  uk: { title: 'Політика конфіденційності — Systemic CRM', description: 'Політика конфіденційності Systemic CRM. Які дані ми збираємо, як зберігаємо та захищаємо.' },
  en: { title: 'Privacy Policy — Systemic CRM', description: 'Systemic CRM Privacy Policy. What data we collect, how we store and protect it.' },
  es: { title: 'Política de privacidad — Systemic CRM', description: 'Política de privacidad de Systemic CRM. Qué datos recopilamos y cómo los protegemos.' },
  fr: { title: 'Politique de confidentialité — Systemic CRM', description: 'Politique de confidentialité de Systemic CRM. Quelles données nous collectons et comment nous les protégeons.' },
  it: { title: 'Informativa sulla privacy — Systemic CRM', description: 'Informativa sulla privacy di Systemic CRM. Quali dati raccogliamo e come li proteggiamo.' },
  pl: { title: 'Polityka prywatności — Systemic CRM', description: 'Polityka prywatności Systemic CRM. Jakie dane zbieramy i jak je chronimy.' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = privacyMeta[locale] ?? privacyMeta.en;
  return { title: meta.title, description: meta.description };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeLabel: Record<string, string> = { uk: 'Головна', en: 'Home', es: 'Inicio', fr: 'Accueil', it: 'Home', pl: 'Strona główna' };
  const privacyLabel: Record<string, string> = { uk: 'Політика конфіденційності', en: 'Privacy Policy', es: 'Política de privacidad', fr: 'Politique de confidentialité', it: 'Informativa sulla privacy', pl: 'Polityka prywatności' };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel[locale] ?? 'Home', url: `${SITE_URL}/${locale}` },
          { name: privacyLabel[locale] ?? 'Privacy Policy', url: `${SITE_URL}/${locale}/privacy` },
        ]}
      />
      <Header />
      <main className="pt-16">
        <LegalPage contentKey="privacy" />
      </main>
      <Footer />
    </>
  );
}
