import Image from 'next/image';
import type { WineryEntry } from '@/data/my-landing/wineries';

export default function WineryHero({ winery }: { winery: WineryEntry }) {
  const heroBody = winery.heroBody?.length ? winery.heroBody : [winery.descriptor];
  const heroImagePosition = winery.heroImagePosition ?? '58% center';

  return (
    <section className="border-b border-[rgba(31,27,22,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.56),rgba(255,255,255,0.08))]">
      <div className="px-3 py-3 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="relative min-h-[80vh] overflow-hidden border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.12)] sm:min-h-[86vh] lg:min-h-[90vh]">
          <Image
            src={winery.heroImage}
            alt={winery.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: heroImagePosition }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,14,12,0.02),rgba(17,14,12,0.12)_44%,rgba(17,14,12,0.34))]" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(180deg,rgba(17,14,12,0),rgba(17,14,12,0.3))] sm:h-60 lg:h-72" />
          <div className="absolute bottom-0 right-0 h-[42%] w-[min(60vw,780px)] bg-[radial-gradient(circle_at_78%_86%,rgba(245,236,224,0.24),rgba(245,236,224,0.08)_38%,rgba(245,236,224,0)_74%)]" />

          <div className="relative z-[1] flex min-h-[80vh] items-end sm:min-h-[86vh] lg:min-h-[90vh]">
            <div className="mx-auto flex w-full max-w-[1760px] items-end px-4 pb-4 sm:px-7 sm:pb-7 lg:px-10 lg:pb-10">
              <div className="max-w-[580px] border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(180deg,rgba(251,246,239,0.74),rgba(244,236,225,0.54))] px-6 py-5 shadow-[0_30px_68px_rgba(19,16,13,0.12)] backdrop-blur-[24px] sm:px-8 sm:py-7 lg:ml-auto lg:mr-5 lg:max-w-[540px] lg:px-9 lg:py-7 xl:mr-10">
                <div className="space-y-2">
                  <p className="m-0 text-[13px] leading-[1.75] tracking-[0.01em] text-[rgba(31,27,22,0.68)]">{winery.japaneseLabel}</p>
                  <h1 className="hero-title m-0 max-w-[9.2ch] text-[clamp(2.62rem,3.7vw,3.82rem)] leading-[1.02] tracking-[0.005em] text-[var(--ink)]">
                    {winery.name}
                  </h1>
                  <p className="m-0 pt-1.5 text-[12px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.5)]">{winery.region}</p>
                </div>
                <div className="mt-4 border-t border-[rgba(31,27,22,0.1)] pt-4">
                  <div className="max-w-[33ch] space-y-4 text-[15px] leading-[1.82] text-[rgba(31,27,22,0.82)]">
                    {heroBody.map((paragraph) => (
                      <p key={paragraph} className="m-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {winery.heroCaption ? <p className="m-0 px-1 pt-2 text-left text-[11px] leading-[1.6] text-[rgba(31,27,22,0.46)] sm:px-2">{winery.heroCaption}</p> : null}
      </div>
    </section>
  );
}
