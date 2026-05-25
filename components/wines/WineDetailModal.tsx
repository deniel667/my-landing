'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { getExactBottleImageSrc } from '@/data/my-landing/wineBottleImages';
import { wineList } from '@/data/my-landing/wineList';
import { wineShowcaseById } from '@/data/my-landing/wineShowcase';

function BottlePlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-[16px] border border-[rgba(31,27,22,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(244,237,226,0.98)_100%)] px-5 py-3">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_50%_18%,rgba(196,170,120,0.16),rgba(255,255,255,0)_56%)]"
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

export default function WineDetailModal({
  wineId,
  onClose,
  inquiryButtonLabel,
  onInquiry,
}: {
  wineId: string | null;
  onClose: () => void;
  inquiryButtonLabel?: string;
  onInquiry?: () => void;
}) {
  const wine = wineId ? wineShowcaseById.get(wineId) : null;
  const sourceWine = wineId ? wineList.find((item) => item.id === wineId) : null;
  const portalTarget = typeof document === 'undefined' ? null : document.body;

  useEffect(() => {
    if (!wineId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, wineId]);

  if (!portalTarget || !wine || !sourceWine) {
    return null;
  }

  const imageSrc = getExactBottleImageSrc(sourceWine.wineryId, sourceWine.name);

  return createPortal(
    <div className="fixed inset-0 z-[170]" role="dialog" aria-modal="true" aria-label={wine.displayTitle}>
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-[rgba(19,16,13,0.54)] backdrop-blur-[5px]"
        aria-label="閉じる"
      />

      <div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
        <div
          className="relative mx-auto w-full max-w-[980px] rounded-[30px] border border-[rgba(105,84,58,0.12)] bg-[linear-gradient(180deg,rgba(255,252,248,0.995)_0%,rgba(247,241,232,0.985)_100%)] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.22)] sm:p-6 lg:p-7"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(31,27,22,0.1)] bg-[rgba(255,255,255,0.88)] text-[rgba(31,27,22,0.82)] transition-colors duration-200 hover:bg-[rgba(248,242,234,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(140,112,78,0.28)]"
            aria-label="閉じる"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-[14px] w-[14px] shrink-0" fill="none">
              <path
                d="M4 4l8 8M12 4 4 12"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="rounded-[22px] border border-[rgba(105,84,58,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,245,238,0.98)_100%)] px-4 py-5">
              <div className="relative mx-auto h-[320px] max-w-[190px]">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={wine.displayTitle}
                    fill
                    className="object-contain object-center"
                    sizes="240px"
                    priority
                  />
                ) : (
                  <BottlePlaceholder />
                )}
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(31,27,22,0.5)]">DETAIL</p>
              <h3 className="mt-3 font-[var(--font-noto-serif-jp)] text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.22] text-[rgba(16,14,12,0.98)]">
                {wine.displayTitle}
              </h3>
              <p className="mt-2 text-[13px] tracking-[0.06em] text-[rgba(31,27,22,0.68)]">{wine.wineryName}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-[rgba(31,27,22,0.1)] bg-[rgba(255,255,255,0.76)] px-3 py-1 text-[10px] tracking-[0.16em] text-[rgba(31,27,22,0.72)]">
                  {wine.regionVillage}
                </span>
                <span className="rounded-full border border-[rgba(31,27,22,0.1)] bg-[rgba(255,255,255,0.76)] px-3 py-1 text-[10px] tracking-[0.16em] text-[rgba(31,27,22,0.72)]">
                  {wine.typeGrapeLine}
                </span>
              </div>

              {onInquiry ? (
                <button
                  type="button"
                  onClick={onInquiry}
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full border border-[rgba(66,48,31,0.18)] bg-[rgba(65,49,34,0.97)] px-5 py-2.5 text-[12px] font-medium tracking-[0.1em] text-[rgba(255,251,245,0.98)] shadow-[0_10px_22px_rgba(40,28,18,0.14)] transition-colors hover:bg-[rgba(78,58,39,0.98)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(140,112,78,0.36)]"
                >
                  {inquiryButtonLabel ?? 'このワインを問い合わせる'}
                </button>
              ) : null}

              <div className="mt-6 space-y-4">
                <section className="rounded-[18px] border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.58)] px-4 py-4">
                  <p className="text-[11px] tracking-[0.14em] text-[rgba(31,27,22,0.48)]">このワインについて</p>
                  <p className="mt-2 text-[14px] leading-[1.9] text-[rgba(31,27,22,0.82)]">{wine.about}</p>
                </section>

                <section className="rounded-[18px] border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.58)] px-4 py-4">
                  <p className="text-[11px] tracking-[0.14em] text-[rgba(31,27,22,0.48)]">味わい</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {wine.tasteTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[rgba(31,27,22,0.08)] bg-[rgba(249,245,239,0.94)] px-3 py-1.5 text-[11px] tracking-[0.04em] text-[rgba(31,27,22,0.78)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="rounded-[18px] border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.58)] px-4 py-4">
                  <p className="text-[11px] tracking-[0.14em] text-[rgba(31,27,22,0.48)]">おすすめ</p>
                  <p className="mt-2 text-[14px] leading-[1.85] text-[rgba(31,27,22,0.8)]">{wine.recommend}</p>
                </section>

                <section className="rounded-[18px] border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.58)] px-4 py-4">
                  <p className="text-[11px] tracking-[0.14em] text-[rgba(31,27,22,0.48)]">FINDESTからの提案</p>
                  <p className="mt-2 text-[14px] leading-[1.85] text-[rgba(31,27,22,0.8)]">{wine.proposal}</p>
                </section>

                <section className="rounded-[18px] border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.58)] px-4 py-4">
                  <p className="text-[11px] tracking-[0.14em] text-[rgba(31,27,22,0.48)]">基本情報</p>
                  <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                    {wine.basicInfo.map((field) => (
                      <div key={field.label} className="rounded-[14px] border border-[rgba(31,27,22,0.06)] bg-[rgba(255,255,255,0.62)] px-3 py-3">
                        <dt className="text-[10px] tracking-[0.12em] text-[rgba(31,27,22,0.5)]">{field.label}</dt>
                        <dd className="mt-1 text-[13px] leading-[1.6] text-[rgba(31,27,22,0.82)]">{field.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    portalTarget
  );
}
