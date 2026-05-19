'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import NorenBlobs from '@/components/NorenBlobs';
import WineDetailModal from '@/components/wines/WineDetailModal';
import { getExactBottleImageSrc, normalizeWineNameForMatch } from '@/data/my-landing/wineBottleImages';
import { wineList } from '@/data/my-landing/wineList';
import { wineShowcaseById } from '@/data/my-landing/wineShowcase';

const previewSelections = [
  { wineryId: 'bus', exactWineName: '2019 CabernetSauvignontrocken' },
  { wineryId: 'horst', exactWineName: '2023 SilvanerbrutSektb.A.' },
  { wineryId: 'salwey', exactWineName: '2022 KaiserstuhlSpatburgunder' },
  { wineryId: 'buerklinwolf', exactWineName: '2022 Rieslingtrocken' },
] as const;

const typeMeta = {
  white: {
    label: 'White',
    badgeClassName:
      'border-[rgba(198,188,166,0.52)] bg-[linear-gradient(180deg,rgba(255,255,252,0.98)_0%,rgba(247,243,236,0.96)_100%)] text-[rgba(78,68,48,0.96)]',
  },
  red: {
    label: 'Red',
    badgeClassName:
      'border-[rgba(122,72,78,0.38)] bg-[linear-gradient(180deg,rgba(236,220,223,0.94)_0%,rgba(223,201,205,0.92)_100%)] text-[rgba(90,36,45,0.98)]',
  },
  sparkling: {
    label: 'Sparkling',
    badgeClassName:
      'border-[rgba(181,154,102,0.48)] bg-[linear-gradient(180deg,rgba(250,244,224,0.98)_0%,rgba(238,228,190,0.95)_100%)] text-[rgba(104,81,28,0.98)]',
  },
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

export default function WinePreviewSection() {
  const [activeWineId, setActiveWineId] = useState<string | null>(null);
  const compactPreviewItems = useMemo(
    () =>
      previewSelections
        .map((target) => {
          const source = wineList.find(
            (item) =>
              item.wineryId === target.wineryId &&
              normalizeWineNameForMatch(item.name) === normalizeWineNameForMatch(target.exactWineName)
          );
          if (!source) return null;

          const showcase = wineShowcaseById.get(source.id);
          if (!showcase) return null;

          return {
            source,
            showcase,
            imageSrc: getExactBottleImageSrc(source.wineryId, source.name),
          };
        })
        .filter(
          (
            item
          ): item is {
            source: (typeof wineList)[number];
            showcase: NonNullable<ReturnType<typeof wineShowcaseById.get>>;
            imageSrc: string | null;
          } => Boolean(item)
        ),
    []
  );

  return (
    <>
      <section className="relative pt-10 pb-12 lg:pt-12 lg:pb-14">
        <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <div
            aria-hidden="true"
            className="mx-auto mb-7 h-px max-w-[1120px] bg-[linear-gradient(90deg,rgba(31,27,22,0)_0%,rgba(31,27,22,0.14)_16%,rgba(31,27,22,0.14)_84%,rgba(31,27,22,0)_100%)]"
          />

          <div className="relative isolate overflow-hidden rounded-[36px] border border-[rgba(31,27,22,0.14)] bg-[linear-gradient(180deg,rgba(255,252,248,0.98)_0%,rgba(248,241,233,0.86)_62%,rgba(246,238,229,0.78)_100%)] px-6 py-8 shadow-[0_1px_0_rgba(255,255,255,0.68)_inset,0_16px_36px_rgba(18,16,14,0.045)] sm:px-7 lg:px-8 lg:py-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[46%] overflow-hidden">
              <NorenBlobs variant="philosophy" layout="D" className="noren-blobs--ultrasoft opacity-90" />
              <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(205,186,150,0.14),rgba(205,186,150,0.05)_42%,rgba(205,186,150,0)_74%)] blur-3xl" />
              <div className="absolute right-0 top-2 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(188,164,135,0.12),rgba(188,164,135,0.04)_44%,rgba(188,164,135,0)_76%)] blur-3xl" />
            </div>

            <header className="relative grid gap-4 border-b border-[rgba(31,27,22,0.12)] pb-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
              <div>
                <p className="m-0 text-[11px] uppercase tracking-[0.28em] text-[rgba(31,27,22,0.62)]">WINE LIST</p>
                <h2 className="mt-2.5 font-[var(--font-noto-serif-jp)] text-[clamp(2.15rem,3.4vw,3.15rem)] leading-[1.14] text-[rgba(18,16,14,0.99)]">
                  取扱ワイン
                </h2>
                <p className="mt-3 max-w-[56ch] text-[14px] leading-[1.84] text-[rgba(31,27,22,0.8)]">
                  FINDESTが現在ご提案している取扱ワインの一部です。全体の一覧は専用ページからご覧いただけます。
                </p>
              </div>

              <div className="self-start pt-1 lg:justify-self-end lg:self-end">
                <Link
                  href="/wines"
                  className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(31,27,22,0.28)] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,246,240,0.96)_100%)] px-5 py-3 text-[12px] font-semibold tracking-[0.08em] text-[rgba(22,20,17,0.96)] shadow-[0_1px_0_rgba(255,255,255,0.62)_inset,0_10px_18px_rgba(18,16,14,0.05)] transition-colors hover:bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(252,249,244,0.98)_100%)]"
                >
                  <span>ワイン一覧を見る</span>
                  <span aria-hidden="true" className="text-[13px]">
                    →
                  </span>
                </Link>
              </div>
            </header>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {compactPreviewItems.map(({ source, showcase, imageSrc }) => {
                const meta = typeMeta[source.type];

                return (
                  <article
                    key={source.id}
                    className="group flex h-full flex-col rounded-[20px] border border-[rgba(31,27,22,0.13)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(250,246,240,0.84)_100%)] p-4 shadow-[0_10px_22px_rgba(18,16,14,0.04)]"
                  >
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
                            sizes="(min-width: 1280px) 18vw, (min-width: 768px) 28vw, 42vw"
                          />
                        </div>
                      ) : (
                        <BottlePlaceholder />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveWineId(source.id)}
                      className="mt-3 flex flex-1 flex-col text-left focus:outline-none"
                      aria-label={`${showcase.displayTitle} の詳細を見る`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="m-0 pr-2 text-[9.5px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.52)]">
                          {showcase.wineryName}
                        </p>
                        <span
                          className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] shadow-[0_1px_0_rgba(255,255,255,0.35)_inset] ${meta.badgeClassName}`}
                        >
                          {meta.label}
                        </span>
                      </div>

                      <h3 className="mt-2.5 font-[var(--font-noto-serif-jp)] text-[17px] leading-[1.34] text-[rgba(14,13,11,0.99)] [text-wrap:balance]">
                        {showcase.displayTitle}
                      </h3>

                      <div className="mt-3 space-y-1.5 text-[11.5px] leading-[1.65] text-[rgba(31,27,22,0.72)]">
                        <p>{showcase.regionVillage}</p>
                        <p>{showcase.vintage}</p>
                        <p>{showcase.typeGrapeLine}</p>
                      </div>

                      <p className="mt-3 min-h-[4.9em] text-[11.5px] leading-[1.66] text-[rgba(31,27,22,0.82)]">
                        {showcase.shortLine}
                      </p>

                      <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(31,27,22,0.11)] bg-[rgba(255,255,255,0.72)] px-3 py-1.5 text-[10px] tracking-[0.18em] text-[rgba(31,27,22,0.58)]">
                        詳細を見る
                      </span>
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <WineDetailModal wineId={activeWineId} onClose={() => setActiveWineId(null)} />
    </>
  );
}
