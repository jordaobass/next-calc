import { HeroSection } from '@/components/sections/hero/HeroSection';
import { BenefitsSection } from '@/components/sections/home/BenefitsSection';
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection';
import { FAQSection } from '@/components/sections/home/FAQSection';
import { StatsSection } from '@/components/sections/home/StatsSection';
import { CTASection } from '@/components/sections/home/CTASection';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/seo/JsonLd';

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <div className="flex flex-col">
        <HeroSection />
        <BenefitsSection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
        <FAQSection />
      </div>
    </>
  );
}
