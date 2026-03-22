import SiteHeader from '@/components/SiteHeader';
import FooterSection from '@/components/sections/FooterSection';
import WineListSection from '@/components/sections/WineListSection';

export default function WinesPage() {
  return (
    <>
      <SiteHeader />
      <main className="site-main pt-20 sm:pt-24">
        <WineListSection />
        <FooterSection />
      </main>
    </>
  );
}
