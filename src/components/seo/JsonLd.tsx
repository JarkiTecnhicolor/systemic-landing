import { SITE_URL, APP_URL, CONTACT_EMAIL } from '../../lib/constants';

type JsonLdProps = {
  locale: string;
  faqItems?: { question: string; answer: string }[];
};

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Systemic',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    email: CONTACT_EMAIL,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      contactType: 'sales',
      availableLanguage: ['Ukrainian', 'English'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SoftwareApplicationJsonLd({ locale }: { locale: string }) {
  const isUk = locale === 'uk';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Systemic CRM',
    url: APP_URL,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '499',
      priceCurrency: 'UAH',
      offerCount: 3,
    },
    description: isUk
      ? 'CRM-система для малого та середнього бізнесу. Клієнти, записи, продажі, склад, фінанси та комунікації — все в одній системі.'
      : 'CRM for small and medium business. Clients, appointments, sales, inventory, finances & communications — all in one system.',
    screenshot: `${SITE_URL}/images/hero-dashboard.jpg`,
    featureList: isUk
      ? 'Клієнтська база, Календар записів, Продажі, Склад, Фінанси, Telegram-бот, Зарплати, Фіскалізація'
      : 'Client Database, Appointment Calendar, Sales, Inventory, Finances, Telegram Bot, Payroll, Fiscal Receipts',
    inLanguage: [isUk ? 'uk' : 'en'],
    author: {
      '@type': 'Organization',
      name: 'Systemic',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Systemic',
    url: SITE_URL,
    inLanguage: ['uk', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'Systemic',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQPageJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
