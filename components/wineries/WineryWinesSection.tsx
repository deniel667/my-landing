'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import WineDetailModal from '@/components/wines/WineDetailModal';
import { getExactBottleImageSrc } from '@/data/my-landing/wineBottleImages';
import { getSortedWinesForWinery } from '@/data/my-landing/wineCatalog';
import { wineList } from '@/data/my-landing/wineList';
import { wineShowcaseById } from '@/data/my-landing/wineShowcase';

const typeLabel = {
  white: '白',
  red: '赤',
  sparkling: 'スパークリング',
} as const;

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

export default function WineryWinesSection({
  title,
  intro,
  wineryId,
}: {
  title: string;
  intro?: string[];
  wineryId: string;
}) {
  const [activeWineId, setActiveWineId] = useState<string | null>(null);
  const wines = useMemo(
    () =>
      getSortedWinesForWinery(wineryId as (typeof wineList)[number]['wineryId'])
        .map((wine) => ({
          source: wine,
          showcase: wineShowcaseById.get(wine.id),
          imageSrc: getExactBottleImageSrc(wine.wineryId, wine.name),
        }))
        .filter(
          (
            wine
          ): wine is {
            source: (typeof wineList)[number];
            showcase: NonNullable<ReturnType<typeof wineShowcaseById.get>>;
            imageSrc: string | null;
          } => Boolean(wine.showcase)
        ),
    [wineryId]
  );

  return (
    <>
      <section className="border-t border-[rgba(31,27,22,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(255,255,255,0.08))] py-17 sm:py-22">
        <div className="rounded-[24px] border border-[rgba(31,27,22,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.36),rgba(247,241,232,0.22))] px-6 py-8 shadow-[0_18px_30px_rgba(19,16,13,0.035)] sm:px-8 sm:py-9">
          <div className="grid gap-5 border-b border-[rgba(31,27,22,0.08)] pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
            <div className="space-y-3.5">
              <p className="m-0 text-[11px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.52)]">取扱ワイン</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <h2 className="section-title-mincho break-keep hyphens-none m-0 max-w-[11ch] [text-wrap:balance] text-[clamp(2.05rem,2.7vw,2.6rem)] leading-[1.26] tracking-[0.01em] text-[var(--ink)]">
                  {title}
                </h2>
                <span className="inline-flex w-fit items-center rounded-full border border-[rgba(31,27,22,0.1)] bg-[rgba(255,255,255,0.6)] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[rgba(31,27,22,0.56)]">
                  {wines.length} wines
                </span>
              </div>
              {intro?.length ? (
                <div className="max-w-[34ch] space-y-2.5 text-[14.6px] leading-[1.86] text-[rgba(31,27,22,0.72)]">
                  {intro.map((paragraph) => (
                    <p key={paragraph} className="m-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>

            <Link
              href="/wines"
              className="text-[12px] tracking-[0.12em] text-[rgba(31,27,22,0.72)] no-underline transition-colors hover:text-[rgba(31,27,22,0.94)]"
            >
              取扱ワインを見る &rarr;
            </Link>
          </div>

          <div className="mt-9 grid gap-7 lg:grid-cols-3">
            {wines.map(({ source, showcase, imageSrc }) => (
              <article
                key={source.id}
                className="flex h-full min-h-[324px] flex-col gap-5 border border-[rgba(31,27,22,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.64),rgba(249,243,236,0.48))] p-5 shadow-[0_22px_42px_rgba(19,16,13,0.05)] sm:flex-row sm:items-start sm:p-6"
              >
                <div className="mx-auto flex w-28 shrink-0 items-start justify-center sm:mx-0 sm:w-[7.5rem]">
                  <button
                    type="button"
                    onClick={() => setActiveWineId(source.id)}
                    className="relative block w-full overflow-hidden rounded-[16px] border border-[rgba(31,27,22,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(244,237,226,0.98)_100%)] px-5 py-3 text-left transition-shadow duration-200 hover:shadow-[0_10px_20px_rgba(31,27,22,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(140,112,78,0.36)]"
                    aria-label={`${showcase.displayTitle} の詳細を見る`}
                  >
                    {imageSrc ? (
                      <div className="relative min-h-[126px]">
                        <Image
                          src={imageSrc}
                          alt={showcase.displayTitle}
                          fill
                          className="object-contain object-center"
                          sizes="(min-width: 1280px) 16vw, (min-width: 640px) 22vw, 36vw"
                        />
                      </div>
                    ) : (
                      <BottlePlaceholder />
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveWineId(source.id)}
                  className="flex min-w-0 flex-1 flex-col gap-4 self-stretch text-left focus:outline-none"
                  aria-label={`${showcase.displayTitle} の詳細を見る`}
                >
                  <div className="min-h-[84px] space-y-2">
                    <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-[rgba(31,27,22,0.5)]">
                      {typeLabel[source.type]} / {showcase.wineryName}
                    </p>
                    <h3 className="m-0 font-[var(--font-heading)] text-[1.18rem] leading-[1.42] text-[var(--ink)]">
                      {showcase.displayTitle}
                    </h3>
                    <div className="space-y-1 text-[12px] leading-[1.7] text-[rgba(31,27,22,0.68)]">
                      <p className="m-0">{showcase.regionVillage}</p>
                      <p className="m-0">{showcase.vintage}</p>
                      <p className="m-0">{showcase.typeGrapeLine}</p>
                    </div>
                  </div>
                  <p
                    className="m-0 overflow-hidden text-[14px] leading-[1.88] text-[rgba(31,27,22,0.78)]"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {showcase.shortLine}
                  </p>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(31,27,22,0.11)] bg-[rgba(255,255,255,0.72)] px-3 py-1.5 text-[10px] tracking-[0.18em] text-[rgba(31,27,22,0.58)]">
                    詳細を見る
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WineDetailModal wineId={activeWineId} onClose={() => setActiveWineId(null)} />
    </>
  );
}
