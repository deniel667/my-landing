import TrustSection from '@/components/sections/TrustSection';
import FooterSection from '@/components/sections/FooterSection';
import Section from '@/components/Section';

export default function TrustPage() {
  return (
    <main className="site-main pt-20 sm:pt-24">
      <Section id="rare" variant="full">
        <TrustSection />
      </Section>
      <FooterSection />
    </main>
  );
}
