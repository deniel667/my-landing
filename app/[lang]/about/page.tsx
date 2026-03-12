import AboutSection from '@/components/AboutSection';
import FooterSection from '@/components/sections/FooterSection';
import Section from '@/components/Section';

export default function AboutPage() {
  return (
    <main className="site-main pt-20 sm:pt-24">
      <Section id="about" variant="full">
        <AboutSection />
      </Section>
      <FooterSection />
    </main>
  );
}
