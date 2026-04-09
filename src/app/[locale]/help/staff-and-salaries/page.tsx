import { setRequestLocale } from 'next-intl/server';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import HelpArticle from '../../../../components/help/HelpArticle';
import { BreadcrumbJsonLd } from '../../../../components/seo/JsonLd';
import { SITE_URL } from '../../../../lib/constants';
import type { Metadata } from 'next';

const meta: Record<string, { title: string; description: string }> = {
  uk: { title: 'Співробітники, зарплати та доступ — Systemic CRM', description: 'Як працюють ролі, видимість даних, графіки роботи та схеми мотивації в Systemic CRM.' },
  en: { title: 'Staff, Salaries & Access — Systemic CRM', description: 'How roles, data visibility, work schedules and motivation schemes work in Systemic CRM.' },
  es: { title: 'Personal, Salarios y Acceso — Systemic CRM', description: 'Cómo funcionan los roles, visibilidad de datos y esquemas de motivación.' },
  fr: { title: 'Personnel, Salaires et Accès — Systemic CRM', description: 'Comment fonctionnent les rôles, la visibilité des données et les schémas de motivation.' },
  it: { title: 'Personale, Stipendi e Accesso — Systemic CRM', description: 'Come funzionano ruoli, visibilità dati e schemi di motivazione.' },
  pl: { title: 'Pracownicy, Wynagrodzenia i Dostęp — Systemic CRM', description: 'Jak działają role, widoczność danych i schematy motywacji.' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale] ?? meta.en;
  return { title: m.title, description: m.description };
}

export default async function StaffSalariesGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeLabel: Record<string, string> = { uk: 'Головна', en: 'Home', es: 'Inicio', fr: 'Accueil', it: 'Home', pl: 'Strona główna' };
  const helpLabel: Record<string, string> = { uk: 'Довідка', en: 'Help Center', es: 'Ayuda', fr: 'Aide', it: 'Assistenza', pl: 'Pomoc' };
  const pageLabel: Record<string, string> = { uk: 'Співробітники та зарплати', en: 'Staff & Salaries', es: 'Personal y Salarios', fr: 'Personnel et Salaires', it: 'Personale e Stipendi', pl: 'Pracownicy i Wynagrodzenia' };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel[locale] ?? 'Home', url: `${SITE_URL}/${locale}` },
          { name: helpLabel[locale] ?? 'Help Center', url: `${SITE_URL}/${locale}/help` },
          { name: pageLabel[locale] ?? 'Staff & Salaries', url: `${SITE_URL}/${locale}/help/staff-and-salaries` },
        ]}
      />
      <Header />
      <main className="pt-16">
        <HelpArticle articleKey="staff-and-salaries" />
      </main>
      <Footer />
    </>
  );
}
