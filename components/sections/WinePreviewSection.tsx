import Link from 'next/link';
import NorenBlobs from '@/components/NorenBlobs';
import WineBottleLightbox from '@/components/sections/WineBottleLightbox';
import {
  compactPreviewCopy,
  compactSentence,
  formatDisplayTitle,
  getWineCardCopy,
  getWineSoilCopy,
} from '@/data/my-landing/wineCopyResolver';
import { getExactBottleImageSrc, normalizeWineNameForMatch } from '@/data/my-landing/wineBottleImages';
import { wineList } from '@/data/my-landing/wineList';

const previewSelections = [
  { wineryId: 'bus', exactWineName: '2019 CabernetSauvignontrocken' },
  { wineryId: 'horst', exactWineName: '2023 SilvanerbrutSektb.A.' },
  { wineryId: 'salwey', exactWineName: '2022 KaiserstuhlSpatburgunder' },
  { wineryId: 'buerklinwolf', exactWineName: '2022 Rieslingtrocken' },
] as const;

const compactPreviewItems = previewSelections
  .map((target) => {
    const wine = wineList.find(
      (item) =>
        item.wineryId === target.wineryId &&
        normalizeWineNameForMatch(item.name) === normalizeWineNameForMatch(target.exactWineName)
    );

    return wine ?? null;
  })
  .filter((item): item is (typeof wineList)[number] => item !== null);

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

export default function WinePreviewSection() {
  return (
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
            {compactPreviewItems.map((wine) => {
              const meta = typeMeta[wine.type];
              const displayTitle = formatDisplayTitle(wine.name);
              const imageSrc = getExactBottleImageSrc(wine.wineryId, wine.name);
              const cardCopy = getWineCardCopy(wine.wineryId, displayTitle, wine.summary, wine.soil);
              const soilCopy = getWineSoilCopy(
                wine.wineryId,
                displayTitle,
                cardCopy.soilDescription
              );
              const wineDescription = compactPreviewCopy(cardCopy.wineDescription, 78);
              const soilDescription = compactSentence(soilCopy, 70);

              return (
                <article
                  key={wine.id}
                  className="group flex h-full flex-col rounded-[20px] border border-[rgba(31,27,22,0.13)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(250,246,240,0.84)_100%)] p-4 shadow-[0_10px_22px_rgba(18,16,14,0.04)]"
                >
                  <WineBottleLightbox imageSrc={imageSrc} alt={displayTitle} />

                  <div className="mt-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="m-0 pr-2 text-[9.5px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.52)]">
                        {wine.wineryName}
                      </p>
                      <span
                        className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] shadow-[0_1px_0_rgba(255,255,255,0.35)_inset] ${meta.badgeClassName}`}
                      >
                        {meta.label}
                      </span>
                    </div>

                    <h3 className="mt-2.5 font-[var(--font-noto-serif-jp)] text-[17px] leading-[1.34] text-[rgba(14,13,11,0.99)] [text-wrap:balance]">
                      {displayTitle}
                    </h3>
                  </div>

                  <div className="mt-3 flex-1 space-y-2.5">
                    <p className="m-0 min-h-[4.9em] text-[11.5px] leading-[1.66] text-[rgba(31,27,22,0.82)]">
                      {wineDescription}
                    </p>

                    <div className="rounded-[14px] border border-[rgba(31,27,22,0.07)] bg-[rgba(255,255,255,0.54)] px-3 py-2.5">
                      <p className="m-0 text-[9px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.5)]">Soil</p>
                      <p className="mt-1 m-0 text-[10.5px] leading-[1.58] text-[rgba(31,27,22,0.72)]">
                        {soilDescription}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
