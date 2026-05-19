import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import FooterSection from '@/components/sections/FooterSection';
import WineryBackLink from '@/components/wineries/WineryBackLink';
import WineryBreadcrumb from '@/components/wineries/WineryBreadcrumb';
import WineryGallery from '@/components/wineries/WineryGallery';
import WineryHero from '@/components/wineries/WineryHero';
import WineryPager from '@/components/wineries/WineryPager';
import WineryRichSection from '@/components/wineries/WineryRichSection';
import WineryVideoSection from '@/components/wineries/WineryVideoSection';
import WineryWinesSection from '@/components/wineries/WineryWinesSection';
import { getWineryBySlug, wineries } from '@/data/my-landing/wineries';
import { getRotatedWineries, getVisibleWinerySections } from '@/data/my-landing/wineryDetailTemplate';

export function generateStaticParams() {
  return wineries.map((winery) => ({ slug: winery.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const winery = getWineryBySlug(slug);

  if (!winery) {
    return {
      title: 'Winery | FINDEST',
    };
  }

  return {
    title: `${winery.name} | FINDEST`,
    description: winery.descriptor,
  };
}

export default async function WineryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const winery = getWineryBySlug(slug);
  if (!winery) notFound();
  const visibleSections = getVisibleWinerySections(winery.sections, winery.hiddenSectionIds);
  const relatedWineries = getRotatedWineries(wineries, winery.slug);

  return (
    <>
      <SiteHeader />
      <main className="site-main bg-[var(--bg)] pt-20 sm:pt-24">
        <div className="mx-auto max-w-[1480px] px-4 pt-6 sm:px-8 sm:pt-8 lg:px-12">
          <WineryBreadcrumb current={winery.name} />
        </div>
        <WineryHero winery={winery} />

        <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-8 sm:py-9 lg:px-12">
          <WineryBackLink />
        </div>

        <div className="mx-auto max-w-[1480px] px-4 pb-23 sm:px-8 sm:pb-27 lg:px-12">
          <WineryRichSection section={winery.intro} />
          {visibleSections.map((section) => (
            <WineryRichSection key={section.id} section={section} />
          ))}
          {winery.awards ? <WineryRichSection section={winery.awards} /> : null}
          {winery.gallery ? <WineryGallery eyebrow={winery.gallery.eyebrow} title={winery.gallery.title} intro={winery.gallery.intro} images={winery.gallery.images} /> : null}
        </div>

        {winery.video ? <WineryVideoSection section={winery.video} /> : null}

        <div className="mx-auto max-w-[1480px] px-4 pb-26 sm:px-8 sm:pb-36 lg:px-12">
          <WineryWinesSection title={`${winery.name} のワイン`} intro={winery.winesIntro} wineryId={winery.id} />

          {winery.inquiry ? (
            <section className="border-t border-[rgba(31,27,22,0.1)] py-16 sm:py-22">
              <div className="grid gap-7 border border-[rgba(31,27,22,0.12)] bg-[linear-gradient(180deg,rgba(255,252,246,0.99),rgba(244,236,225,0.92))] p-8 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_22px_46px_rgba(19,16,13,0.06)] sm:grid-cols-[minmax(0,1.12fr)_auto] sm:items-center sm:gap-10 sm:p-11 lg:px-13 lg:py-11">
                <div className="space-y-3.5">
                  <p className="m-0 text-[11px] uppercase tracking-[0.22em] text-[rgba(31,27,22,0.52)]">導入相談</p>
                  <h2 className="section-title-mincho break-keep hyphens-none m-0 max-w-[9ch] [text-wrap:balance] text-[clamp(2.28rem,2.95vw,3rem)] leading-[1.18] tracking-[0.008em] text-[var(--ink)]">{winery.inquiry.title}</h2>
                  <p className="m-0 max-w-[56ch] text-[15.75px] leading-[1.9] text-[rgba(31,27,22,0.84)]">{winery.inquiry.body}</p>
                  <p className="m-0 max-w-[48ch] text-[13.2px] leading-[1.82] text-[rgba(31,27,22,0.62)]">
                    レストラン、バー、ホテル案件、バイヤーチーム向けに、導入位置づけ、提供温度、ペアリング提案まで含めて相談できる次の一歩として設計しています。
                  </p>
                </div>
                <a
                  href={winery.inquiry.ctaHref}
                  className="inline-flex items-center justify-center gap-2 self-start border border-[rgba(17,14,12,0.88)] bg-[rgba(17,14,12,0.94)] px-9 py-4 text-[12px] tracking-[0.14em] text-[rgba(255,252,246,0.96)] no-underline shadow-[0_18px_32px_rgba(19,16,13,0.08)] transition-colors duration-200 hover:bg-[rgba(24,20,17,0.96)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(31,27,22,0.18)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(250,245,238,1)] sm:min-w-[220px] sm:self-center"
                >
                  <span>{winery.inquiry.ctaLabel}</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </section>
          ) : null}

          <WineryPager items={relatedWineries} />
        </div>

        <FooterSection />
      </main>
    </>
  );
}
