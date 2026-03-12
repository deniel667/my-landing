import CatalogueSection from '@/components/sections/CatalogueSection';
import FooterSection from '@/components/sections/FooterSection';
import Section from '@/components/Section';

export default function WineriesPage() {
  return (
    <main className="site-main pt-20 sm:pt-24">
      <Section id="catalogue" variant="full">
        <CatalogueSection />
      </Section>
      <FooterSection />
    </main>
  );
}
