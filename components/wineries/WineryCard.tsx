import Image from 'next/image';
import Link from 'next/link';
import type { WineryEntry } from '@/data/my-landing/wineries';

const cardImagePositionBySlug: Partial<Record<WineryEntry['slug'], string>> = {
  dautel: '50% 28%',
  'horst-sauer': '50% 22%',
  salwey: '50% 24%',
  hamm: '50% 22%',
  'buerklin-wolf': '50% 24%',
  stodden: '50% 20%',
  ludwig: '50% 18%',
  ress: '50% 20%',
  bus: '50% 22%',
  landerer: '50% 22%',
};

export default function WineryCard({ winery }: { winery: WineryEntry }) {
  const imagePosition = cardImagePositionBySlug[winery.slug] ?? '50% center';

  return (
    <Link
      href={`/wineries/${winery.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[rgba(31,27,22,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.66),rgba(248,242,235,0.68))] no-underline shadow-[0_18px_34px_rgba(19,16,13,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_rgba(19,16,13,0.055)]"
    >
      <div className="relative aspect-[4/4.55] overflow-hidden border-b border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.26)]">
        <Image
          src={winery.cardImage}
          alt={winery.name}
          fill
          sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.028]"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,14,12,0.01),rgba(16,14,12,0.18))]" />
      </div>

      <div className="flex flex-1 flex-col gap-5 px-5 py-5 sm:px-6 sm:py-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <p className="m-0 text-[10.5px] uppercase tracking-[0.22em] text-[rgba(31,27,22,0.5)]">{winery.region}</p>
            <h2 className="m-0 font-[var(--font-noto-serif-jp)] text-[clamp(1.46rem,1.95vw,1.72rem)] leading-[1.28] tracking-[0.01em] text-[var(--ink)]">
              {winery.name}
            </h2>
            <p className="m-0 text-[12.8px] leading-[1.72] text-[rgba(31,27,22,0.62)]">{winery.japaneseLabel}</p>
          </div>

          <p className="m-0 overflow-hidden text-[13.9px] leading-[1.86] text-[rgba(31,27,22,0.84)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {winery.descriptor}
          </p>
        </div>

        <div className="mt-auto space-y-4.5 border-t border-[rgba(31,27,22,0.08)] pt-4.5">
          <p className="m-0 overflow-hidden text-[12.9px] leading-[1.82] text-[rgba(31,27,22,0.66)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {winery.listBlurb}
          </p>

          <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.13em] text-[rgba(31,27,22,0.82)]">
            <span className="relative">
              詳しく見る
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[rgba(31,27,22,0.65)] transition-transform duration-250 group-hover:scale-x-100" />
            </span>
            <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
