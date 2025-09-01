import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { BenefitsSection } from '@/components/sections/home/BenefitsSection';
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection';
import { FAQSection } from '@/components/sections/home/FAQSection';
import { StatsSection } from '@/components/sections/home/StatsSection';
import { CTASection } from '@/components/sections/home/CTASection';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { ResponsiveAd } from '@/components/shared/AdPlaceholder';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <div className="flex flex-col">
        <HeroSection />
        
        {/* Ad After Hero */}
        <ResponsiveAd className="my-12" minHeight={100} />
        
        <BenefitsSection />
        <StatsSection />
        
        {/* Ad Between Stats and Testimonials */}
        <ResponsiveAd className="my-12" minHeight={120} />
        
        <TestimonialsSection />
        <CTASection />
        
        {/* Ad Before FAQ */}
        <ResponsiveAd className="my-12" minHeight={100} />
        
        <FAQSection />
      </div>
    </>
  );
}
