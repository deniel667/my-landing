import { wineCardCopy } from '@/data/my-landing/wineCardCopy';
import { wineSoilCopy } from '@/data/my-landing/wineSoilCopy';

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
} as const;

function normalizeCopy(value: string) {
  return value.replace(/\s+/g, ' ').trim();
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

export function compactSentence(value: string, maxLength: number) {
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

export function compactPreviewCopy(value: string, maxLength: number) {
  const normalized = normalizeCopy(value);
  if (!normalized) return '';
  if (normalized.length <= maxLength) return normalized;

  const firstSentence = normalized.match(/^.+?[。！？.!?](?=\s|$|[「『（(])/u)?.[0]?.trim();
  if (firstSentence && firstSentence.length <= maxLength + 8) {
    return firstSentence;
  }

  return compactSentence(normalized, maxLength);
}

export function formatDisplayTitle(value: string) {
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
    .replace(/\s+([）)])/g, '$1')
    .replace(/([（(])\s+/g, '$1')
    .trim();
}

export function getWineCardCopy(
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

export function getWineSoilCopy(
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
