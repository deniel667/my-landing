import Image from 'next/image';
import Link from 'next/link';
import NorenBlobs from '@/components/NorenBlobs';
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
      'border-[rgba(198,188,166,0.48)] bg-[linear-gradient(180deg,rgba(255,255,252,0.96)_0%,rgba(247,243,236,0.94)_100%)] text-[rgba(78,68,48,0.94)]',
  },
  red: {
    label: 'Red',
    badgeClassName:
      'border-[rgba(122,72,78,0.34)] bg-[linear-gradient(180deg,rgba(236,220,223,0.92)_0%,rgba(223,201,205,0.9)_100%)] text-[rgba(90,36,45,0.96)]',
  },
  sparkling: {
    label: 'Sparkling',
    badgeClassName:
      'border-[rgba(181,154,102,0.42)] bg-[linear-gradient(180deg,rgba(250,244,224,0.96)_0%,rgba(238,228,190,0.93)_100%)] text-[rgba(104,81,28,0.96)]',
  },
} as const;

function formatPreviewCopy(text: string) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return '';

  const firstSentence = normalized.match(/^.+?[。！？.!?](?=\s|$|[「『（(])/u)?.[0]?.trim();
  if (firstSentence) return firstSentence;

  const clause = normalized
    .split(/[、,，；;:]/u)
    .map((part) => part.trim())
    .find(Boolean);

  if (!clause) return normalized;

  const softened = clause
    .replace(/[でにをがとはもや、と]\s*$/u, '')
    .replace(/\s+$/u, '');

  return `${softened}。`;
}

function formatDisplayTitle(value: string) {
  const replacements: Array<[RegExp, string]> = [
    [/CabernetSauvignon/g, 'Cabernet Sauvignon'],
    [/BlancdeNoir/g, 'Blanc de Noir'],
    [/SauvignonBlanc/g, 'Sauvignon Blanc'],
    [/Sauvignonblanc/g, 'Sauvignon Blanc'],
    [/Spätburgundertrocken/g, 'Spätburgunder trocken'],
    [/Spatburgundertrocken/g, 'Spätburgunder trocken'],
    [/KaiserstuhlSpätburgundertrocken/g, 'Kaiserstuhl Spätburgunder trocken'],
    [/KaiserstuhlSpatburgundertrocken/g, 'Kaiserstuhl Spätburgunder trocken'],
    [/KaiserstuhlSpätburgunder/g, 'Kaiserstuhl Spätburgunder'],
    [/KaiserstuhlSpatburgunder/g, 'Kaiserstuhl Spätburgunder'],
    [/GrauburgunderGutsweintrocken/g, 'Grauburgunder Gutswein trocken'],
    [/WeissburgunderGutsweintrocken/g, 'Weissburgunder Gutswein trocken'],
    [/Silvanertrocken/g, 'Silvaner trocken'],
    [/SilvanerbrutSektb\.A\./g, 'Silvaner brut Sekt b.A.'],
    [/RieslingSektBrut/g, 'Riesling Sekt Brut'],
    [/Rieslingtrocken/g, 'Riesling trocken'],
    [/Rieslingdry/g, 'Riesling dry'],
    [/ThörnicherRiesling/g, 'Thörnicher Riesling'],
    [/ThornicherRiesling/g, 'Thörnicher Riesling'],
    [/ThörnicherRitschRiesling/g, 'Thörnicher Ritsch Riesling'],
    [/RuppertsbergerRiesling/g, 'Ruppertsberger Riesling'],
    [/DeidesheimerRiesling/g, 'Deidesheimer Riesling'],
    [/DeidesheimRiesling/g, 'Deidesheim Riesling'],
    [/WachenheimerRiesling/g, 'Wachenheimer Riesling'],
    [/RecherHerrenbergSpätburgunder/g, 'Recher Herrenberg Spätburgunder'],
    [/RecherHerrenbergSpatburgunder/g, 'Recher Herrenberg Spätburgunder'],
    [/Leiselheim Chardonnay trocken -SchwarzeErde-/g, 'Leiselheim Chardonnay trocken - Schwarze Erde -'],
    [/EscherndorferAmLumpen/g, 'Escherndorfer Am Lumpen'],
    [/EscherndorfSilvaner/g, 'Escherndorf Silvaner'],
  ];

  let next = value.normalize('NFC');
  replacements.forEach(([pattern, replacement]) => {
    next = next.replace(pattern, replacement);
  });

  return next
    .replace(/([a-zäöüß])([A-ZÄÖÜ])/g, '$1 $2')
    .replace(/([A-Za-zÄÖÜäöüß])trocken\b/g, '$1 trocken')
    .replace(/([A-Za-zÄÖÜäöüß])brut\b/g, '$1 brut')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([）\)])/g, '$1')
    .replace(/([（\(])\s+/g, '$1')
    .trim();
}

function BottlePreview({ imageSrc, alt }: { imageSrc: string | null; alt: string }) {
  if (imageSrc) {
    return (
      <div className="relative overflow-hidden rounded-[14px] border border-[rgba(31,27,22,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(246,240,231,0.88)_100%)] px-4 py-3">
        <div className="relative min-h-[118px]">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-contain object-center"
            sizes="(min-width: 1280px) 16vw, (min-width: 768px) 22vw, 42vw"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[14px] border border-[rgba(31,27,22,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(246,240,231,0.88)_100%)] px-4 py-3">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_50%_18%,rgba(196,170,120,0.14),rgba(255,255,255,0)_58%)]"
      />
      <div className="relative flex min-h-[118px] items-end justify-center">
        <svg viewBox="0 0 72 160" aria-hidden="true" className="h-[94px] w-[44px] text-[rgba(88,74,56,0.4)]">
          <path
            d="M29 7h14v20l7 11v98c0 10-6 17-14 17s-14-7-14-17V38l7-11V7Z"
            fill="rgba(255,255,255,0.56)"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M31 45h10c4 0 7 3 7 7v70c0 9-5 15-12 15s-12-6-12-15V52c0-4 3-7 7-7Z"
            fill="rgba(123,93,74,0.12)"
          />
          <path d="M29 18h14" stroke="currentColor" strokeWidth="1.15" />
        </svg>
      </div>
    </div>
  );
}

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

              return (
                <article
                  key={wine.id}
                  className="rounded-[18px] border border-[rgba(31,27,22,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(250,246,240,0.88)_100%)] px-4 py-3 shadow-[0_3px_10px_rgba(18,16,14,0.02)]"
                >
                  <BottlePreview imageSrc={imageSrc} alt={displayTitle} />

                  <div className="mt-3 flex items-start justify-between gap-3">
                    <p className="m-0 pr-2 text-[10px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.5)]">
                      {wine.wineryName}
                    </p>
                    <span
                      className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] ${meta.badgeClassName}`}
                    >
                      {meta.label}
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-[var(--font-noto-serif-jp)] text-[15.5px] leading-[1.28] text-[rgba(18,16,14,0.98)] [text-wrap:balance]">
                    {displayTitle}
                  </h3>

                  <p className="mt-1.5 text-[10.5px] leading-[1.52] text-[rgba(31,27,22,0.74)]">
                    {formatPreviewCopy(wine.summary)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
