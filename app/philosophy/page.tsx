import PhilosophySection from '@/components/sections/PhilosophySection';
import FooterSection from '@/components/sections/FooterSection';
import Section from '@/components/Section';

export default function PhilosophyPage() {
  return (
    <main className="site-main pt-20 sm:pt-24">
      <section className="section-shell">
        <div className="section-inner">
          <h1 className="section-title-mincho">Findestの思想</h1>
        </div>
      </section>
      <Section id="philosophy" variant="full">
        <PhilosophySection />
      </Section>
      <FooterSection />
    </main>
  );
}
