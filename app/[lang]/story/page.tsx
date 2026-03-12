import StorySection from '@/components/sections/StorySection';
import FooterSection from '@/components/sections/FooterSection';
import Section from '@/components/Section';

export default function StoryPage() {
  return (
    <main className="site-main pt-20 sm:pt-24">
      <Section id="story" variant="full">
        <StorySection />
      </Section>
      <FooterSection />
    </main>
  );
}
