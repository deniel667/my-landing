import Link from 'next/link';
import NorenBlobs from '@/components/NorenBlobs';
import WineBottleLightbox from '@/components/sections/WineBottleLightbox';
import {
  compactSentence,
  formatDisplayTitle,
  getWineCardCopy,
  getWineSoilCopy,
} from '@/data/my-landing/wineCopyResolver';
import { getExactBottleImageSrc } from '@/data/my-landing/wineBottleImages';
import { wineList } from '@/data/my-landing/wineList';

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

function formatWineDescription(summary: string) {
  return compactSentence(summary, Number.MAX_SAFE_INTEGER);
}

function formatSoilNote(soil: string) {
  return compactSentence(soil, Number.MAX_SAFE_INTEGER);
}

const groupedWineList = Array.from(
  wineList.reduce((map, wine) => {
    const existing = map.get(wine.wineryName);
    if (existing) {
      existing.push(wine);
      return map;
    }

    map.set(wine.wineryName, [wine]);
    return map;
  }, new Map<string, typeof wineList>())
);

export default function WineListSection() {
  return (
    <section className="mx-auto w-full max-w-[1120px] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
      <header className="relative isolate overflow-hidden rounded-[30px] border border-[rgba(31,27,22,0.08)] bg-[linear-gradient(180deg,rgba(255,252,246,0.99)_0%,rgba(247,239,228,0.92)_58%,rgba(244,235,225,0.76)_100%)] px-6 pb-8 pt-7 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset] sm:px-7 lg:px-8">
        <NorenBlobs variant="philosophy" layout="B" className="noren-blobs--soft opacity-100" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[4%] top-0 h-[92%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.74),rgba(255,255,255,0.2)_50%,rgba(255,255,255,0)_80%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(206,187,151,0.26),rgba(206,187,151,0.1)_42%,rgba(206,187,151,0)_76%)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(185,160,133,0.22),rgba(185,160,133,0.09)_44%,rgba(185,160,133,0)_78%)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[18%] top-[10%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(198,173,158,0.16),rgba(198,173,158,0.07)_40%,rgba(198,173,158,0)_76%)] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(245,238,230,0)_0%,rgba(243,235,226,0.38)_100%)]"
        />
        <div className="relative border-b border-[rgba(31,27,22,0.1)] pb-1">
          <p className="m-0 text-[11px] uppercase tracking-[0.22em] text-[rgba(31,27,22,0.58)]">WINE LIST</p>
          <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <h1 className="m-0 max-w-[12ch] font-[var(--font-noto-serif-jp)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.28] text-[rgba(24,22,19,0.96)]">
                取扱ワイン
              </h1>
              <p className="mt-4 max-w-[64ch] text-[14px] leading-[1.95] text-[rgba(31,27,22,0.76)]">
                FINDESTが現在ご提案しているワイン一覧です。店の世界観、料理、価格帯、提供方法に応じて、導入しやすい形でご提案しています。
              </p>
            </div>
            <div className="rounded-[20px] border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.52)] px-5 py-4 backdrop-blur-[2px]">
              <p className="m-0 text-[11px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.52)]">Selection</p>
              <p className="mt-2 text-[12.5px] leading-[1.85] text-[rgba(31,27,22,0.72)]">
                ワインは固定的に並べるのではなく、導入先の意図や現場の運用に合わせて、適した形でご紹介しています。
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-12 space-y-16">
        {groupedWineList.map(([wineryName, wines], groupIndex) => (
          <section key={wineryName} className="relative">
            {groupIndex > 0 ? (
              <div
                aria-hidden="true"
                className="mb-10 h-px w-full bg-[linear-gradient(90deg,rgba(31,27,22,0)_0%,rgba(31,27,22,0.18)_14%,rgba(31,27,22,0.18)_86%,rgba(31,27,22,0)_100%)]"
              />
            ) : null}

            <div className="rounded-[24px] border border-[rgba(31,27,22,0.11)] bg-[linear-gradient(180deg,rgba(255,255,255,0.68)_0%,rgba(247,241,233,0.54)_100%)] px-4 py-5 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset] sm:px-5 lg:px-6 lg:py-6">
              <header className="mb-7 border-b border-[rgba(31,27,22,0.11)] pb-4">
                <p className="m-0 text-[10px] uppercase tracking-[0.24em] text-[rgba(31,27,22,0.5)]">Producer</p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <h2 className="font-[var(--font-noto-serif-jp)] text-[clamp(1.72rem,2.8vw,2.16rem)] leading-[1.2] text-[rgba(15,13,11,0.99)]">
                    {wineryName}
                  </h2>
                  <span className="inline-flex w-fit items-center rounded-full border border-[rgba(31,27,22,0.11)] bg-[rgba(255,255,255,0.72)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.58)]">
                    {wines.length} wines
                  </span>
                </div>
              </header>

              <div className="grid max-w-[960px] gap-4 md:grid-cols-2 xl:grid-cols-3">
                {wines.map((wine) => {
                  const meta = typeMeta[wine.type];
                  const displayTitle = formatDisplayTitle(wine.name);
                  const imageSrc = getExactBottleImageSrc(wine.wineryId, wine.name);
                  const fallbackWineDescription = formatWineDescription(wine.summary);
                  const fallbackSoilDescription = formatSoilNote(wine.soil);
                  const cardCopy = getWineCardCopy(
                    wine.wineryId,
                    displayTitle,
                    fallbackWineDescription,
                    fallbackSoilDescription
                  );
                  const soilCopy = getWineSoilCopy(
                    wine.wineryId,
                    displayTitle,
                    cardCopy.soilDescription
                  );

                  return (
                    <article
                      key={wine.id}
                      className="group flex h-full flex-col rounded-[20px] border border-[rgba(31,27,22,0.13)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(250,246,240,0.84)_100%)] p-4.5 shadow-[0_10px_22px_rgba(18,16,14,0.045)] transition-transform duration-200 hover:-translate-y-[1px]"
                    >
                      <WineBottleLightbox imageSrc={imageSrc} alt={displayTitle} />

                      <div className="mt-3.5">
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

                        <h3 className="mt-2.5 font-[var(--font-noto-serif-jp)] text-[20px] leading-[1.34] text-[rgba(14,13,11,0.99)] [text-wrap:balance]">
                          {displayTitle}
                        </h3>
                      </div>

                      <div className="mt-3.5 flex-1 space-y-3">
                        <p className="m-0 min-h-[5.8em] text-[12.5px] leading-[1.72] text-[rgba(31,27,22,0.84)]">
                          {cardCopy.wineDescription}
                        </p>

                        <div className="rounded-[14px] border border-[rgba(31,27,22,0.07)] bg-[rgba(255,255,255,0.54)] px-3 py-3">
                          <p className="m-0 text-[9.5px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.5)]">Soil</p>
                          <p className="mt-1 m-0 text-[11.5px] leading-[1.66] text-[rgba(31,27,22,0.72)]">
                            {soilCopy}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 pb-8 sm:pb-10">
        <div className="relative isolate overflow-hidden rounded-[28px] border border-[rgba(128,104,74,0.16)] bg-[linear-gradient(180deg,rgba(252,247,239,0.98)_0%,rgba(246,239,229,0.95)_58%,rgba(241,232,220,0.9)_100%)] px-6 py-8 shadow-[0_1px_0_rgba(255,255,255,0.76)_inset,0_16px_34px_rgba(18,16,14,0.045)] sm:px-7 sm:py-9 lg:px-8 lg:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[1px] rounded-[27px] border border-[rgba(255,255,255,0.24)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[82%] bg-[radial-gradient(circle_at_18%_0%,rgba(214,192,160,0.18),rgba(214,192,160,0.06)_34%,rgba(214,192,160,0)_74%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-[18%] h-44 w-44 translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(201,182,154,0.14),rgba(201,182,154,0.06)_42%,rgba(201,182,154,0)_78%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[12%] top-[30%] h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(246,240,230,0.58),rgba(246,240,230,0.16)_44%,rgba(246,240,230,0)_78%)] blur-2xl"
          />

          <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(210px,0.72fr)] lg:items-center">
            <div className="max-w-[56ch]">
              <p className="m-0 text-[10px] font-medium uppercase tracking-[0.28em] text-[rgba(31,27,22,0.5)]">NEXT STEP</p>
              <h2 className="mt-3 max-w-[18ch] font-[var(--font-noto-serif-jp)] text-[clamp(1.9rem,3vw,2.5rem)] leading-[1.2] text-[rgba(18,16,14,0.98)]">
                <span className="block whitespace-nowrap">導入のご相談・ご提案を</span>
                <span className="block">ご希望の方へ</span>
              </h2>
              <p className="mt-4 max-w-[54ch] text-[14px] leading-[1.95] text-[rgba(31,27,22,0.74)]">
                店の世界観、価格帯、料理構成に合わせて、導入しやすいラインアップをご提案します。まずはご希望の方向性をお聞かせください。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 lg:justify-self-start lg:self-center lg:pl-6">
              <Link
                href="/#contact-final"
                scroll={false}
                className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-[rgba(79,59,38,0.18)] bg-[linear-gradient(180deg,rgba(92,71,48,0.98)_0%,rgba(69,52,35,0.98)_100%)] px-5.5 py-2.5 text-[11.5px] font-semibold tracking-[0.08em] text-[rgba(255,251,245,0.98)] shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_18px_rgba(48,34,21,0.14)] transition-colors hover:bg-[linear-gradient(180deg,rgba(100,77,52,1)_0%,rgba(75,56,37,1)_100%)]"
              >
                導入相談
              </Link>
              <Link
                href="/#contact-final"
                className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-[rgba(31,27,22,0.18)] bg-[rgba(255,255,255,0.68)] px-5 py-2.5 text-[11.5px] font-semibold tracking-[0.08em] text-[rgba(31,27,22,0.88)] shadow-[0_1px_0_rgba(255,255,255,0.3)_inset] transition-colors hover:bg-[rgba(255,255,255,0.82)]"
              >
                資料請求
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
