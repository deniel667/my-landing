'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { WineryEntry } from '@/data/my-landing/wineries';

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.8">
      {direction === 'left' ? <path d="M15 18 9 12l6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

export default function WineryPager({ items }: { items: WineryEntry[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { featured, previews, previous, next } = useMemo(() => {
    if (items.length === 0) {
      return { featured: null, previews: [] as WineryEntry[], previous: null as WineryEntry | null, next: null as WineryEntry | null };
    }

    const featured = items[activeIndex % items.length];
    const previews = Array.from({ length: Math.min(2, Math.max(0, items.length - 1)) }, (_, offset) => items[(activeIndex + 1 + offset) % items.length]);
    const previous = items[(activeIndex - 1 + items.length) % items.length];
    const next = items[(activeIndex + 1) % items.length];

    return { featured, previews, previous, next };
  }, [activeIndex, items]);

  if (!featured) return null;

  return (
    <nav className="border-t border-[rgba(31,27,22,0.1)] py-18 sm:py-22" aria-label="他のワイナリー">
      <div className="space-y-8 sm:space-y-10">
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-2">
            <p className="m-0 text-[11px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.5)]">他のワイナリーを見る</p>
            <p className="m-0 max-w-[36ch] text-[14px] leading-[1.8] text-[rgba(31,27,22,0.66)]">FINDEST のセレクションを続けて読むための、静かなナビゲーションです。</p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <ArrowButton direction="left" label={`前へ: ${previous.name}`} onClick={() => setActiveIndex((current) => (current - 1 + items.length) % items.length)} />
            <ArrowButton direction="right" label={`次へ: ${next.name}`} onClick={() => setActiveIndex((current) => (current + 1) % items.length)} />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)] lg:items-stretch">
          <FeaturedLink winery={featured} />

          <div className="grid gap-4">
            {previews.map((winery) => (
              <PreviewLink key={winery.slug} winery={winery} />
            ))}

            <div className="flex items-center gap-3 sm:hidden">
              <ArrowButton direction="left" label={`前へ: ${previous.name}`} onClick={() => setActiveIndex((current) => (current - 1 + items.length) % items.length)} />
              <ArrowButton direction="right" label={`次へ: ${next.name}`} onClick={() => setActiveIndex((current) => (current + 1) % items.length)} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function ArrowButton({ direction, label, onClick }: { direction: 'left' | 'right'; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(31,27,22,0.14)] bg-[rgba(255,255,255,0.82)] text-[rgba(31,27,22,0.84)] shadow-[0_10px_22px_rgba(19,16,13,0.045)] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.94)]"
      aria-label={label}
    >
      <ArrowIcon direction={direction} />
    </button>
  );
}

function FeaturedLink({ winery }: { winery: WineryEntry }) {
  return (
    <Link
      href={`/wineries/${winery.slug}`}
      className="flex min-h-[328px] flex-col justify-between rounded-[30px] border border-[rgba(31,27,22,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(248,242,234,0.8))] p-8 no-underline shadow-[0_30px_58px_rgba(19,16,13,0.065)] transition-[background-color,transform] duration-200 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(248,242,234,0.84))] sm:p-10"
    >
      <div className="space-y-4">
        <p className="m-0 text-[11px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.5)]">次に読むワイナリー</p>
        <div className="space-y-2.5">
          <p className="section-title-mincho m-0 max-w-[12ch] text-[clamp(2rem,2.8vw,2.56rem)] leading-[1.16] tracking-[0.008em] text-[var(--ink)]">{winery.name}</p>
          <p className="m-0 text-[13px] leading-[1.8] text-[rgba(31,27,22,0.62)]">{winery.region}</p>
        </div>
      </div>

      <div className="space-y-5">
        <p className="m-0 max-w-[44ch] text-[14.4px] leading-[1.86] text-[rgba(31,27,22,0.72)]">{winery.descriptor}</p>
        <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] text-[rgba(31,27,22,0.82)]">
          <span>詳しく見る</span>
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

function PreviewLink({ winery }: { winery: WineryEntry }) {
  return (
    <Link
      href={`/wineries/${winery.slug}`}
      className="flex min-h-[152px] flex-col justify-between rounded-[22px] border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.62)] p-6 no-underline shadow-[0_18px_34px_rgba(19,16,13,0.04)] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.74)]"
    >
      <div className="space-y-2">
        <p className="m-0 text-[11px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.48)]">{winery.region}</p>
        <p className="m-0 font-[var(--font-heading)] text-[1.16rem] leading-[1.42] text-[var(--ink)]">{winery.name}</p>
      </div>
      <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] text-[rgba(31,27,22,0.74)]">
        <span>詳しく見る</span>
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
