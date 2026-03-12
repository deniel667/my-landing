import NorenNetworkSection from '@/components/sections/NorenNetworkSection';
import FooterSection from '@/components/sections/FooterSection';
import Section from '@/components/Section';

export default function NetworkPage() {
  return (
    <main className="site-main pt-20 sm:pt-24">
      <Section id="noren-network" variant="full">
        <NorenNetworkSection />
      </Section>
      <FooterSection />
    </main>
  );
}
