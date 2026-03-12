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
            <span>æ¬¡ã«ã€ä¸‹ã®ãƒ•ã‚©ãƒ¼ãƒ ã§çŠ¶æ³ã‚’ãŠèžã‹ã›ãã ã•ã„ã€‚</span>
          </div>
        </div>
        <ContactSection />
      </Section>
      <FooterSection />
    </main>
  );
}
