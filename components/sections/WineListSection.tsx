import NorenBlobs from '@/components/NorenBlobs';
import WineBottleLightbox from '@/components/sections/WineBottleLightbox';
import { getExactBottleImageSrc } from '@/data/my-landing/wineBottleImages';
import { wineCardCopy } from '@/data/my-landing/wineCardCopy';
import { wineSoilCopy } from '@/data/my-landing/wineSoilCopy';
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

function normalizeCopy(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function compactSentence(value: string, maxLength: number) {
  const normalized = normalizeCopy(value);
  if (!normalized) return '';
  if (normalized.length <= maxLength) return normalized;

  const sentences = normalized
    .split(/(?<=[。.!?！？])/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (sentences.length > 0) {
    const firstSentence = sentences[0];
    if (firstSentence.length <= maxLength + 12) {
      return firstSentence;
    }
  }

  return normalized.slice(0, maxLength).trimEnd();
}

function formatWineDescription(summary: string) {
  return compactSentence(summary, Number.MAX_SAFE_INTEGER);
}

function formatSoilNote(soil: string) {
  return compactSentence(soil, Number.MAX_SAFE_INTEGER);
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

function normalizeCopyKey(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[–—-]/g, '-')
    .replace(/[”“„‟"']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const wineryCopyKeyMap = {
  landerer: 'landerer',
  bus: 'bus',
  salwey: 'salwey',
  dautel: 'dautel',
  horst: 'horstSauer',
  ludwig: 'ludwig',
  stodden: 'jeanStodden',
  hamm: 'hamm',
  buerklinwolf: 'burklinWolf',
} as const;

const wineTitleAliases: Partial<Record<string, string[]>> = {
  'landerer::2023 Leiselheim Chardonnay trocken - Schwarze Erde -': [
    '2023 Leiselheim Chardonnay trocken – Schwarze Erde –',
  ],
  'bus::2016 Dornfelder trocken In der Holle': ['2016 Dornfelder trocken "In der Hölle"'],
  'dautel::2023 Spätburgunder trocken': ['2023 Spätburgunder VDP.Gutswein'],
  'horst::2024 Escherndorf Silvaner trocken': ['2024 Escherndorfer Silvaner trocken VDP.Ortswein'],
  'ludwig::NV Riesling Sekt Brut': ['NV Riesling brut Sekt'],
  'stodden::2014 Recher Herrenberg Spätburgunder trocken': ['2014 Recher Herrenberg Spätburgunder'],
  'stodden::2022 Spätburgunder Blanc de Noir trocken': ['2022 Blanc de Noir'],
};

function getWineCardCopy(
  wineryId: keyof typeof wineryCopyKeyMap | string,
  displayTitle: string,
  fallbackWineDescription: string,
  fallbackSoilDescription: string
) {
  const copyGroupKey = wineryCopyKeyMap[wineryId as keyof typeof wineryCopyKeyMap];
  if (!copyGroupKey) {
    return {
      wineDescription: fallbackWineDescription,
      soilDescription: fallbackSoilDescription,
    };
  }

  const group = wineCardCopy[copyGroupKey];
  const aliasKey = `${wineryId}::${displayTitle}`;
  const candidateTitles = [displayTitle, ...(wineTitleAliases[aliasKey] ?? [])];

  for (const candidateTitle of candidateTitles) {
    const normalizedCandidate = normalizeCopyKey(candidateTitle);
    const match = Object.entries(group).find(
      ([title]) => normalizeCopyKey(title) === normalizedCandidate
    );

    if (match) {
      const [, copy] = match;
      return copy;
    }
  }

  return {
    wineDescription: fallbackWineDescription,
    soilDescription: fallbackSoilDescription,
  };
}

function getWineSoilCopy(
  wineryId: keyof typeof wineryCopyKeyMap | string,
  displayTitle: string,
  fallbackSoilDescription: string
) {
  const copyGroupKey = wineryCopyKeyMap[wineryId as keyof typeof wineryCopyKeyMap];
  if (!copyGroupKey) {
    return fallbackSoilDescription;
  }

  const group = wineSoilCopy[copyGroupKey];
  const aliasKey = `${wineryId}::${displayTitle}`;
  const candidateTitles = [displayTitle, ...(wineTitleAliases[aliasKey] ?? [])];

  for (const candidateTitle of candidateTitles) {
    const normalizedCandidate = normalizeCopyKey(candidateTitle);
    const match = Object.entries(group).find(
      ([title]) => normalizeCopyKey(title) === normalizedCandidate
    );

    if (match) {
      return match[1];
    }
  }

  return fallbackSoilDescription;
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
    </section>
  );
}
