import Image from 'next/image';
import type { WineryVideoSection as WineryVideoSectionData } from '@/data/my-landing/wineries';

export default function WineryVideoSection({ section }: { section: WineryVideoSectionData }) {
  const videoHref = section.ctaHref ?? 'https://www.youtube.com/watch?v=D16nw-bn3ko&ab_channel=GermanWine';

  return (
    <section className="relative overflow-hidden border-t border-[rgba(31,27,22,0.1)] bg-[linear-gradient(180deg,rgba(24,20,18,0.992),rgba(12,10,9,0.998))] py-16 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[-14%] w-[48rem] bg-[radial-gradient(circle,rgba(120,102,82,0.24),rgba(120,102,82,0.08)_36%,rgba(120,102,82,0)_74%)] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[-14%] w-[48rem] bg-[radial-gradient(circle,rgba(92,78,63,0.22),rgba(92,78,63,0.06)_36%,rgba(92,78,63,0)_74%)] blur-3xl" />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12">
        <div className="mb-10 border-b border-white/10 pb-5">
          <p className="m-0 text-[11px] uppercase tracking-[0.24em] text-white/54">{section.eyebrow}</p>
        </div>

        <a
          href={videoHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${section.title} を YouTube で開く`}
          className="group relative block overflow-hidden border border-white/10 bg-white/4 shadow-[0_36px_100px_rgba(0,0,0,0.34)] no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <div className="relative aspect-[16/9] min-h-[320px] sm:min-h-[560px] lg:min-h-[680px]">
            <Image
              src={section.poster.src}
              alt={section.poster.alt}
              fill
              sizes="(min-width: 1280px) 88vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,15,13,0.14),rgba(18,15,13,0.7))]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-white/38 bg-white/14 text-white backdrop-blur-sm transition-colors duration-200 group-hover:border-white/50 group-hover:bg-white/22 group-focus-visible:border-white/50 group-focus-visible:bg-white/22 sm:h-24 sm:w-24">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-current sm:h-9 sm:w-9">
                  <path d="M8 6.75v10.5c0 .6.65.98 1.18.68l8.2-5.25a.78.78 0 0 0 0-1.36l-8.2-5.25A.78.78 0 0 0 8 6.75Z" />
                </svg>
              </div>
            </div>

            <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
              <p className="m-0 text-[10px] uppercase tracking-[0.2em] text-white/62">映像</p>
            </div>

            <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
              <p className="m-0 text-[10px] uppercase tracking-[0.2em] text-white/52">YouTube</p>
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(17,14,12,0),rgba(17,14,12,0.82))] px-5 pb-6 pt-16 sm:px-8 sm:pb-9">
              <h2 className="section-title-mincho break-keep hyphens-none m-0 max-w-[12ch] [text-wrap:balance] text-[clamp(1.95rem,2.7vw,2.55rem)] leading-[1.28] tracking-[0.01em] text-white">{section.title}</h2>
            </div>
          </div>

          {section.poster.caption ? <p className="m-0 border-t border-white/10 px-5 py-4 text-[12px] leading-[1.75] text-white/48 sm:px-8">{section.poster.caption}</p> : null}
        </a>
      </div>
    </section>
  );
}
