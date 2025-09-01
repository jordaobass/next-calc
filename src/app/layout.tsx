import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdProvider } from '@/components/ads/AdProvider';
import { siteConfig } from '@/lib/config/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  ],
  creator: siteConfig.author.name,
  publisher: siteConfig.organization.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'pt-BR': siteConfig.url,
    },
  },
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
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.shortName} - Calculadoras Trabalhistas Gratuitas`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.shortDescription,
    images: [siteConfig.ogImage],
    creator: '@nextcalc',
    site: '@nextcalc',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/logo.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.json',
  category: siteConfig.category,
  classification: 'Calculadoras Trabalhistas',
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
    'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    'google-adsense-account': 'ca-pub-3660869229459383',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="pt-BR">
      <head>
        {/* Google AdSense Account Verification */}
        <meta name="google-adsense-account" content="ca-pub-3660869229459383" />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5PWBRQVR');`}
        </Script>
        
        {/* Google Analytics - Updated to match your code */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q43HL57L8N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q43HL57L8N');
          `}
        </Script>
        
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3660869229459383"
          crossOrigin="anonymous"
        />
        
        {/* Fallback AdSense (se variável de ambiente estiver definida) */}
        {ADSENSE_ID && ADSENSE_ID !== 'ca-pub-3660869229459383' && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        
        {/* Vercel Analytics */}
        <Script
          src="https://va.vercel-scripts.com/v1/script.js"
          strategy="afterInteractive"
        />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5PWBRQVR"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        
        <AdProvider>
          <a href="#main-content" className="skip-link">
            Pular para o conteúdo principal
          </a>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
        </AdProvider>
      </body>
    </html>
  );
}
