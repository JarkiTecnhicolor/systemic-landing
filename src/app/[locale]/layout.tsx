import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../../i18n/routing';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isUk = locale === 'uk';
  return {
    title: isUk ? 'Systemic — CRM для малого та середнього бізнесу' : 'Systemic — CRM for Small & Medium Business',
    description: isUk
      ? 'Клієнти, записи, продажі, склад, фінанси та комунікації — все в одній системі.'
      : 'Clients, appointments, sales, inventory, finances & communications — all in one system.',
    openGraph: {
      title: 'Systemic CRM',
      description: isUk
        ? 'CRM-система для малого та середнього бізнесу'
        : 'CRM for Small & Medium Business',
      locale: isUk ? 'uk_UA' : 'en_US',
      type: 'website',
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
      <body className="bg-white antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
