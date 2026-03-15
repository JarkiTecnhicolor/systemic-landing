import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../../i18n/routing';
import { Inter } from 'next/font/google';
import { SITE_URL } from '../../lib/constants';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const metaByLocale: Record<string, { title: string; description: string; ogDesc: string; twDesc: string; keywords: string[]; ogLocale: string }> = {
    uk: {
      title: 'Systemic CRM — система управління бізнесом',
      description: 'CRM-система для малого та середнього бізнесу. Клієнти, записи, продажі, склад, фінанси та комунікації — все в одній системі.',
      ogDesc: 'CRM-система для малого та середнього бізнесу — клієнти, записи, продажі, склад, фінанси.',
      twDesc: 'Клієнти, записи, продажі, склад, фінанси — все в одній CRM-системі.',
      keywords: ['CRM', 'CRM Україна', 'CRM для салону краси', 'CRM для малого бізнесу', 'управління записами', 'облік клієнтів', 'Telegram CRM', 'Systemic', 'CRM система', 'автоматизація бізнесу', 'онлайн запис', 'управління складом', 'фіскалізація Checkbox'],
      ogLocale: 'uk_UA',
    },
    en: {
      title: 'Systemic CRM — Business Management System',
      description: 'CRM for small and medium business. Clients, appointments, sales, inventory, finances & communications — all in one system.',
      ogDesc: 'CRM for Small & Medium Business — clients, appointments, sales, inventory, finances.',
      twDesc: 'Clients, appointments, sales, inventory, finances — all in one CRM.',
      keywords: ['CRM', 'CRM Ukraine', 'beauty salon CRM', 'small business CRM', 'appointment management', 'client management', 'Telegram CRM', 'Systemic', 'CRM system', 'business automation', 'online booking', 'inventory management'],
      ogLocale: 'en_US',
    },
    es: {
      title: 'Systemic CRM — Sistema de gestión empresarial',
      description: 'CRM para pequeñas y medianas empresas. Clientes, citas, ventas, inventario, finanzas y comunicaciones — todo en un sistema.',
      ogDesc: 'CRM para pequeñas y medianas empresas — clientes, citas, ventas, inventario, finanzas.',
      twDesc: 'Clientes, citas, ventas, inventario, finanzas — todo en un CRM.',
      keywords: ['CRM', 'CRM para negocios', 'CRM salón de belleza', 'gestión de citas', 'gestión de clientes', 'Telegram CRM', 'Systemic', 'automatización empresarial'],
      ogLocale: 'es_ES',
    },
    fr: {
      title: 'Systemic CRM — Système de gestion d\'entreprise',
      description: 'CRM pour petites et moyennes entreprises. Clients, rendez-vous, ventes, inventaire, finances et communications — tout en un.',
      ogDesc: 'CRM pour PME — clients, rendez-vous, ventes, inventaire, finances.',
      twDesc: 'Clients, rendez-vous, ventes, inventaire, finances — tout dans un CRM.',
      keywords: ['CRM', 'CRM entreprise', 'CRM salon de beauté', 'gestion de rendez-vous', 'gestion de clients', 'Telegram CRM', 'Systemic', 'automatisation entreprise'],
      ogLocale: 'fr_FR',
    },
    it: {
      title: 'Systemic CRM — Sistema di gestione aziendale',
      description: 'CRM per piccole e medie imprese. Clienti, appuntamenti, vendite, magazzino, finanze e comunicazioni — tutto in un sistema.',
      ogDesc: 'CRM per PMI — clienti, appuntamenti, vendite, magazzino, finanze.',
      twDesc: 'Clienti, appuntamenti, vendite, magazzino, finanze — tutto in un CRM.',
      keywords: ['CRM', 'CRM aziendale', 'CRM salone di bellezza', 'gestione appuntamenti', 'gestione clienti', 'Telegram CRM', 'Systemic', 'automazione aziendale'],
      ogLocale: 'it_IT',
    },
    pl: {
      title: 'Systemic CRM — System zarządzania firmą',
      description: 'CRM dla małych i średnich firm. Klienci, wizyty, sprzedaż, magazyn, finanse i komunikacja — wszystko w jednym systemie.',
      ogDesc: 'CRM dla MŚP — klienci, wizyty, sprzedaż, magazyn, finanse.',
      twDesc: 'Klienci, wizyty, sprzedaż, magazyn, finanse — wszystko w jednym CRM.',
      keywords: ['CRM', 'CRM dla firm', 'CRM salon kosmetyczny', 'zarządzanie wizytami', 'zarządzanie klientami', 'Telegram CRM', 'Systemic', 'automatyzacja biznesu'],
      ogLocale: 'pl_PL',
    },
  };

  const meta = metaByLocale[locale] ?? metaByLocale.en;
  const alternateLanguages: Record<string, string> = { 'x-default': '/uk' };
  routing.locales.forEach(l => { alternateLanguages[l] = `/${l}`; });

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: meta.title,
      description: meta.ogDesc,
      locale: meta.ogLocale,
      type: 'website',
      siteName: 'Systemic CRM',
      url: `${SITE_URL}/${locale}`,
      images: [
        {
          url: '/images/hero-dashboard.jpg',
          width: 1920,
          height: 1080,
          alt: 'Systemic CRM Dashboard',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.twDesc,
      images: ['/images/hero-dashboard.jpg'],
    },
    keywords: meta.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'theme-color': '#1D546D',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <head>
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-white antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
