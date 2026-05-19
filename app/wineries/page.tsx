import SiteHeader from '@/components/SiteHeader';
import FooterSection from '@/components/sections/FooterSection';
import WineryCard from '@/components/wineries/WineryCard';
import WineriesIndexHero from '@/components/wineries/WineriesIndexHero';
import WineriesTopLink from '@/components/wineries/WineriesTopLink';
import { wineries } from '@/data/my-landing/wineries';

export default function WineriesPage() {
  return (
    <>
      <SiteHeader />
      <main className="site-main pt-20 sm:pt-24">
        <div className="mx-auto max-w-[1120px] px-6 pt-6 sm:px-8 sm:pt-8 lg:px-12">
          <WineriesTopLink />
        </div>
        <WineriesIndexHero />

        <section className="py-13 sm:py-17 lg:py-20">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-12">
            <div id="wineries-grid" className="grid gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-7 xl:gap-y-10">
              {wineries.map((winery, index) => {
                const isCenteredLastCard = wineries.length % 3 === 1 && index === wineries.length - 1;

                return (
                  <div key={winery.slug} className={isCenteredLastCard ? 'xl:col-start-2' : ''}>
                    <WineryCard winery={winery} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
