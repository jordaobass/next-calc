import { siteConfig } from '@/lib/config/site';

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Predefined structured data generators
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  description: siteConfig.description,
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    email: siteConfig.author.email,
    contactType: 'Customer Service',
    availableLanguage: 'Portuguese',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR',
    addressLocality: 'Brasil',
  },
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.github,
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: 'pt-BR',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/calculadoras?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const calculatorSchema = (
  name: string,
  description: string,
  url: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  description,
  url,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
  },
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Brazilian Workers',
  },
  inLanguage: 'pt-BR',
  isAccessibleForFree: true,
});

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const articleSchema = (
  headline: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified?: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description,
  url,
  datePublished,
  dateModified: dateModified || datePublished,
  author: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/logo.png`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url,
  },
});