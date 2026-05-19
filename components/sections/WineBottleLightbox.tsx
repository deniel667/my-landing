'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

function BottlePlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-[16px] border border-[rgba(31,27,22,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(244,237,226,0.98)_100%)] px-5 py-3">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_50%_18%,rgba(196,170,120,0.16),rgba(255,255,255,0)_56%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-3 h-px bg-[linear-gradient(90deg,rgba(31,27,22,0)_0%,rgba(31,27,22,0.12)_20%,rgba(31,27,22,0.12)_80%,rgba(31,27,22,0)_100%)]"
      />
      <div className="relative flex min-h-[126px] items-end justify-center">
        <svg viewBox="0 0 72 160" aria-hidden="true" className="h-[100px] w-[46px] text-[rgba(88,74,56,0.48)]">
          <path
            d="M29 7h14v20l7 11v98c0 10-6 17-14 17s-14-7-14-17V38l7-11V7Z"
            fill="rgba(255,255,255,0.58)"
            stroke="currentColor"
            strokeWidth="1.45"
          />
          <path
            d="M31 45h10c4 0 7 3 7 7v70c0 9-5 15-12 15s-12-6-12-15V52c0-4 3-7 7-7Z"
            fill="rgba(123,93,74,0.13)"
          />
          <path d="M29 18h14" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
}

export default function WineBottleLightbox({
  imageSrc,
  alt,
}: {
  imageSrc: string | null;
  alt: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const portalTarget = typeof document === 'undefined' ? null : document.body;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'contain';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  if (!imageSrc) {
    return <BottlePlaceholder />;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative block w-full overflow-hidden rounded-[16px] border border-[rgba(31,27,22,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(244,237,226,0.98)_100%)] px-5 py-3 text-left transition-shadow duration-200 hover:shadow-[0_10px_20px_rgba(31,27,22,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(140,112,78,0.36)]"
        aria-label={`${alt} の画像`}
      >
        <div className="relative min-h-[126px]">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-contain object-center"
            sizes="(min-width: 1280px) 18vw, (min-width: 768px) 28vw, 42vw"
          />
        </div>
      </button>

      {portalTarget && isOpen
        ? createPortal(
            <div className="fixed inset-0 z-[160]" role="dialog" aria-modal="true" aria-label={alt}>
              <button
                type="button"
                className="absolute inset-0 h-full w-full cursor-default bg-[rgba(19,16,13,0.66)] backdrop-blur-[4px]"
                onClick={() => setIsOpen(false)}
                aria-label="画像を閉じる"
              />

              <div className="fixed inset-0 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
                <div
                  className="relative w-full max-w-[760px] rounded-[30px] border border-[rgba(105,84,58,0.12)] bg-[linear-gradient(180deg,rgba(255,252,248,0.995)_0%,rgba(247,241,232,0.985)_100%)] px-4 pb-4 pt-14 shadow-[0_28px_80px_rgba(0,0,0,0.22)] sm:px-6 sm:pb-6 sm:pt-16"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(31,27,22,0.1)] bg-[rgba(255,255,255,0.88)] text-[rgba(31,27,22,0.82)] transition-colors duration-200 hover:bg-[rgba(248,242,234,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(140,112,78,0.28)]"
                    aria-label="画像を閉じる"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="h-[14px] w-[14px] shrink-0"
                      fill="none"
                    >
                      <path
                        d="M4 4l8 8M12 4 4 12"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>

                  <div className="rounded-[22px] border border-[rgba(105,84,58,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,245,238,0.98)_100%)] px-4 py-4 sm:px-6 sm:py-6">
                    <div className="relative mx-auto h-[min(70vh,720px)] min-h-[320px] w-full max-w-[640px]">
                      <Image
                        src={imageSrc}
                        alt={alt}
                        fill
                        className="object-contain object-center"
                        sizes="(min-width: 768px) 640px, 92vw"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            portalTarget
          )
        : null}
    </>
  );
}
