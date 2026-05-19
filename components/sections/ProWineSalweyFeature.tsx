'use client';

import { useEffect, useRef, useState } from 'react';

const SALWEY_VIDEO_SRC = '/story/Salwey%20Winery%20Intro%20JP.mp4';

export default function ProWineSalweyFeature() {
  const [isOpen, setIsOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !modalVideoRef.current) return;
    const video = modalVideoRef.current;
    void video.play().catch(() => {});
  }, [isOpen]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleEnterFullscreen = async () => {
    const video = modalVideoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
      return;
    }

    await video.requestFullscreen?.().catch(() => {});
  };

  return (
    <>
      <section
        id="prowine-salwey-feature"
        className="relative pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14"
        aria-label="ProWine feature"
      >
        <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <div className="grid items-start gap-6 rounded-[28px] border border-[rgba(161,140,99,0.18)] bg-[rgba(250,247,240,0.64)] p-4 shadow-[0_24px_60px_rgba(31,24,18,0.07)] backdrop-blur-[6px] sm:p-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.88fr)] lg:gap-10 lg:p-7">
            <div className="order-1 flex flex-col justify-center gap-4 self-stretch py-1 lg:pr-2">
              <div className="space-y-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[rgba(72,57,36,0.6)]">
                  ProWine Feature
                </p>
                <h2 className="font-serif text-[clamp(1.7rem,2.5vw,2.7rem)] leading-[1.18] tracking-[-0.02em] text-[var(--ink)]">
                  Salwey より、
                  <br className="hidden sm:block" />
                  ワイナリー紹介映像
                </h2>
              </div>
              <div className="max-w-[44ch] space-y-3 text-[0.97rem] leading-7 text-[rgba(33,29,25,0.82)]">
                <p>Salwey から届いた紹介動画を掲載しています。</p>
                <p>畑や造りの空気感を、短い映像でご覧いただけます。</p>
              </div>
            </div>

            <div className="order-2">
              <button
                type="button"
                onClick={openModal}
                className="group relative block w-full overflow-hidden rounded-[24px] border border-[rgba(161,140,99,0.18)] bg-[#0f0f10] text-left shadow-[0_20px_44px_rgba(20,16,12,0.18)] transition-transform duration-300 ease-out hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(164,126,63,0.45)]"
                aria-label="Salwey Winery Intro JP を拡大再生"
              >
                <video
                  className="block aspect-[16/10] h-auto w-full bg-[#0f0f10] object-contain"
                  src={SALWEY_VIDEO_SRC}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.02)_0%,rgba(10,10,10,0.24)_100%)]" />

                <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                  <div className="rounded-full border border-[rgba(255,255,255,0.24)] bg-[rgba(12,12,12,0.4)] px-3 py-1.5 text-[0.7rem] font-medium tracking-[0.14em] text-white/86 backdrop-blur-sm">
                    EXPAND VIDEO
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.24)] bg-[rgba(12,12,12,0.42)] text-white shadow-[0_12px_28px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M8 6.7v10.6c0 .55.6.89 1.08.62l8.2-5.3a.72.72 0 0 0 0-1.2l-8.2-5.3A.72.72 0 0 0 8 6.7Z" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[220] bg-[rgba(10,10,10,0.78)] px-4 py-6 backdrop-blur-[3px] sm:px-6 sm:py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Salwey Winery Intro JP"
          onClick={closeModal}
        >
          <div className="mx-auto flex h-full max-w-[1160px] items-center justify-center">
            <div
              className="relative w-full overflow-hidden rounded-[28px] border border-[rgba(214,196,162,0.24)] bg-[rgba(12,12,12,0.96)] shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 border-b border-[rgba(214,196,162,0.14)] px-4 py-3 sm:px-5">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/48">Salwey</p>
                  <h3 className="mt-1 font-serif text-[1rem] text-white/92 sm:text-[1.08rem]">
                    ワイナリー紹介映像
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleEnterFullscreen}
                    className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-[0.73rem] font-medium tracking-[0.08em] text-white/82 transition-colors hover:bg-[rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,255,255,0.28)]"
                  >
                    FULLSCREEN
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.04)] text-white/86 transition-colors hover:bg-[rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,255,255,0.28)]"
                    aria-label="閉じる"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.8">
                      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="bg-[#090909] p-3 sm:p-4">
                <video
                  ref={modalVideoRef}
                  className="block aspect-video h-auto max-h-[76vh] w-full rounded-[18px] bg-black object-contain"
                  src={SALWEY_VIDEO_SRC}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="Salwey Winery Intro JP"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
