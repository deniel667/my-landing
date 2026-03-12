import ServiceSection from '@/components/sections/ServiceSection';
import FooterSection from '@/components/sections/FooterSection';
import Section from '@/components/Section';

export default function ServicePage() {
  return (
    <main className="site-main pt-20 sm:pt-24">
      <Section id="service" variant="editorial">
        <ServiceSection />
      </Section>
      <FooterSection />
    </main>
  );
}
