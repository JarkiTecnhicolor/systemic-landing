import { setRequestLocale } from 'next-intl/server';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import LegalPage from '../../../components/legal/LegalPage';
import { BreadcrumbJsonLd } from '../../../components/seo/JsonLd';
import { SITE_URL } from '../../../lib/constants';
import type { Metadata } from 'next';

const refundMeta: Record<string, { title: string; description: string }> = {
  uk: { title: 'Умови повернення та обміну — Systemic CRM', description: 'Умови повернення коштів та обміну послуг Systemic CRM. Політика підписок та відмови від послуг.' },
  en: { title: 'Refund & Exchange Policy — Systemic CRM', description: 'Systemic CRM Refund and Exchange Policy. Subscription terms and cancellation conditions.' },
  es: { title: 'Política de devoluciones — Systemic CRM', description: 'Política de devoluciones y cambios de Systemic CRM. Condiciones de suscripción y cancelación.' },
  fr: { title: 'Politique de remboursement — Systemic CRM', description: 'Politique de remboursement et d\'échange de Systemic CRM. Conditions d\'abonnement et d\'annulation.' },
  it: { title: 'Politica di rimborso — Systemic CRM', description: 'Politica di rimborso e cambio di Systemic CRM. Condizioni di abbonamento e cancellazione.' },
  pl: { title: 'Polityka zwrotów — Systemic CRM', description: 'Polityka zwrotów i wymian Systemic CRM. Warunki subskrypcji i rezygnacji.' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = refundMeta[locale] ?? refundMeta.en;
  return { title: meta.title, description: meta.description };
}

export default async function RefundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeLabel: Record<string, string> = { uk: 'Головна', en: 'Home', es: 'Inicio', fr: 'Accueil', it: 'Home', pl: 'Strona główna' };
  const refundLabel: Record<string, string> = { uk: 'Повернення та обмін', en: 'Refund & Exchange', es: 'Devoluciones', fr: 'Remboursement', it: 'Rimborso', pl: 'Zwroty' };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel[locale] ?? 'Home', url: `${SITE_URL}/${locale}` },
          { name: refundLabel[locale] ?? 'Refund & Exchange', url: `${SITE_URL}/${locale}/refund` },
        ]}
      />
      <Header />
      <main className="pt-16">
        <LegalPage contentKey="refund" />
      </main>
      <Footer />
    </>
  );
}
