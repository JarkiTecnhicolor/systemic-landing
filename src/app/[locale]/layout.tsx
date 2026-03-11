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
  const isUk = locale === 'uk';
  const altLocale = isUk ? 'en' : 'uk';

  return {
    title: isUk ? 'Systemic CRM — система управління бізнесом' : 'Systemic CRM — Business Management System',
    description: isUk
      ? 'CRM-система для малого та середнього бізнесу. Клієнти, записи, продажі, склад, фінанси та комунікації — все в одній системі.'
      : 'CRM for small and medium business. Clients, appointments, sales, inventory, finances & communications — all in one system.',
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        [locale]: `/${locale}`,
        [altLocale]: `/${altLocale}`,
        'x-default': '/uk',
      },
    },
    openGraph: {
      title: isUk ? 'Systemic CRM — система управління бізнесом' : 'Systemic CRM — Business Management System',
      description: isUk
        ? 'CRM-система для малого та середнього бізнесу — клієнти, записи, продажі, склад, фінанси.'
        : 'CRM for Small & Medium Business — clients, appointments, sales, inventory, finances.',
      locale: isUk ? 'uk_UA' : 'en_US',
      alternateLocale: isUk ? 'en_US' : 'uk_UA',
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
      title: isUk ? 'Systemic CRM — система управління бізнесом' : 'Systemic CRM — Business Management System',
      description: isUk
        ? 'Клієнти, записи, продажі, склад, фінанси — все в одній CRM-системі.'
        : 'Clients, appointments, sales, inventory, finances — all in one CRM.',
      images: ['/images/hero-dashboard.jpg'],
    },
    keywords: isUk
      ? ['CRM', 'CRM Україна', 'CRM для салону краси', 'CRM для малого бізнесу', 'управління записами', 'облік клієнтів', 'Telegram CRM', 'Systemic', 'CRM система', 'автоматизація бізнесу', 'онлайн запис', 'управління складом', 'фіскалізація Checkbox']
      : ['CRM', 'CRM Ukraine', 'beauty salon CRM', 'small business CRM', 'appointment management', 'client management', 'Telegram CRM', 'Systemic', 'CRM system', 'business automation', 'online booking', 'inventory management'],
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
  if (!routing.locales.includes(locale as 'uk' | 'en')) notFound();
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
