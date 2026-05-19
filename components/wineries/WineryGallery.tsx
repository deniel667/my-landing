'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import type { WineryGalleryImage } from '@/data/my-landing/wineries';

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.8">
      {direction === 'left' ? <path d="M15 18 9 12l6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.8">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function WineryGallery({
  eyebrow,
  title,
  intro,
  images,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  images: WineryGalleryImage[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const portalTarget = typeof document === 'undefined' ? null : document.body;
  const currentIndex = activeIndex ?? 0;

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
      if (event.key === 'ArrowLeft') setActiveIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, images.length]);

  const current = activeIndex === null ? null : images[activeIndex];
  const supportingImages = images.slice(1);

  return (
    <section className="border-t border-[rgba(31,27,22,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(248,243,235,0.2))] py-17 sm:py-23">
      <div className="space-y-7">
        <div className="rounded-[18px] border border-[rgba(31,27,22,0.07)] bg-[rgba(255,255,255,0.46)] px-6 py-4.5 shadow-[0_12px_22px_rgba(19,16,13,0.025)] sm:px-8 sm:py-5.5">
          <div className="grid gap-3 lg:grid-cols-[minmax(360px,0.78fr)_minmax(0,1fr)] lg:items-end lg:gap-14 xl:grid-cols-[minmax(390px,0.76fr)_minmax(0,1fr)] xl:gap-20">
            <div className="space-y-2">
              <p className="m-0 text-[11px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.52)]">{eyebrow}</p>
              <h2 className="section-title-mincho break-keep hyphens-none m-0 max-w-[8.5ch] [text-wrap:balance] text-[clamp(2.18rem,2.8vw,2.72rem)] leading-[1.08] tracking-[0.006em] text-[var(--ink)]">
                {title}
              </h2>
            </div>

            <div className="space-y-2 lg:max-w-[46ch] lg:justify-self-end lg:pl-6 lg:pb-1 xl:max-w-[44ch] xl:pl-8">
              <p className="m-0 max-w-[46ch] text-[15px] leading-[1.78] text-[rgba(31,27,22,0.76)]">{intro}</p>
              <p className="m-0 text-[11px] tracking-[0.04em] text-[rgba(31,27,22,0.52)]">画像をクリックすると拡大表示できます</p>
            </div>
          </div>
        </div>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,2.2fr)_minmax(440px,1fr)] lg:gap-8">
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="group relative overflow-hidden border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.22)] text-left shadow-[0_30px_64px_rgba(19,16,13,0.11)]"
          >
            <div className="relative aspect-[16/10] min-h-[380px] sm:min-h-[560px] lg:min-h-[680px]">
              <Image src={images[0].src} alt={images[0].alt} fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(17,14,12,0),rgba(17,14,12,0.6))] p-5 text-white sm:p-6">
                <p className="m-0 text-[11px] uppercase tracking-[0.18em] text-white/74">風景</p>
                {images[0].caption ? <p className="m-0 mt-1 max-w-[46ch] text-[13.5px] leading-[1.74] text-white/88">{images[0].caption}</p> : null}
              </div>
            </div>
          </button>

          <div className="grid gap-4 lg:pt-6 sm:grid-cols-2">
            {supportingImages.map((image, index) => {
              const isLast = index === supportingImages.length - 1;
              const label =
                index === 0 ? 'ボトル / ディテール' : index === 1 ? 'セラー / インテリア' : index === 2 ? '造り手' : index === 3 ? '風景' : '畑の仕事';

              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index + 1)}
                  className={`group relative overflow-hidden border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.24)] text-left ${isLast ? 'sm:col-span-2' : ''}`}
                >
                  <div className={`relative ${isLast ? 'aspect-[16/9] lg:aspect-[16/8.7]' : 'aspect-[4/3] lg:aspect-[5/4]'}`}>
                    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 22vw, 38vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(17,14,12,0),rgba(17,14,12,0.44))] p-3">
                      <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-white/78">{label}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {portalTarget && current
        ? createPortal(
            <div className="fixed inset-0 z-[180]" role="dialog" aria-modal="true" aria-label={current.alt}>
              <button type="button" className="absolute inset-0 h-full w-full bg-[rgba(19,16,13,0.74)] backdrop-blur-[4px]" onClick={() => setActiveIndex(null)} aria-label="ギャラリーを閉じる" />
              <div className="fixed inset-0 flex items-center justify-center px-4 py-6 sm:px-8">
                <div className="relative w-full max-w-[1240px] border border-[rgba(255,255,255,0.16)] bg-[rgba(28,24,20,0.92)] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:p-6" onClick={(event) => event.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/8 text-white transition-colors hover:bg-white/14"
                    aria-label="画像を閉じる"
                  >
                    <CloseIcon />
                  </button>

                  <div className="grid gap-4 lg:grid-cols-[56px_minmax(0,1fr)_56px] lg:items-center">
                    <button
                      type="button"
                      onClick={() => setActiveIndex((currentIndex - 1 + images.length) % images.length)}
                      className="order-2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white transition-colors hover:bg-white/14 lg:order-1"
                      aria-label="前の画像"
                    >
                      <ArrowIcon direction="left" />
                    </button>

                    <div className="order-1 space-y-4 lg:order-2">
                      <div className="relative mx-auto h-[min(72vh,800px)] w-full">
                        <Image src={current.src} alt={current.alt} fill sizes="(min-width: 1024px) 1040px, 92vw" className="object-contain" priority />
                      </div>
                      <div className="flex flex-col gap-2 border-t border-white/10 pt-3 text-white/78 sm:flex-row sm:items-center sm:justify-between">
                        {current.caption ? <p className="m-0 text-[13px] leading-[1.8]">{current.caption}</p> : <div />}
                        <p className="m-0 text-[11px] uppercase tracking-[0.18em] text-white/48">
                          {currentIndex + 1} / {images.length}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveIndex((currentIndex + 1) % images.length)}
                      className="order-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white transition-colors hover:bg-white/14"
                      aria-label="次の画像"
                    >
                      <ArrowIcon direction="right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            portalTarget
          )
        : null}
    </section>
  );
}
