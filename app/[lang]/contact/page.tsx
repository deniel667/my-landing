import NextStepSection from '@/components/sections/NextStepSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';
import Section from '@/components/Section';

export default function ContactPage() {
  return (
    <main className="site-main pt-20 sm:pt-24">
      <Section id="contact" variant="full">
        <NextStepSection />
        <div className="bridgeWrap" aria-hidden="true">
          <div className="bridgeCard bridgeCard--noBtn">
            <span className="bridgeDot" />
            <span>次に、下のフォームで状況をお聞かせください。</span>
          </div>
        </div>
        <ContactSection />
      </Section>
      <FooterSection />
    </main>
  );
}
