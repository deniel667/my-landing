import { compactPreviewCopy, compactSentence, formatDisplayTitle } from '@/data/my-landing/wineCopyResolver';
import { makeWinePdfOverrideKey, winePdfOverrides } from '@/data/my-landing/winePdfOverrides';
import { wineList, type WineListItem } from '@/data/my-landing/wineList';

type ShowcaseField = {
  label: string;
  value: string;
};

export type WineShowcaseItem = {
  id: string;
  wineryId: string;
  wineryName: string;
  name: string;
  displayTitle: string;
  vintage: string;
  regionVillage: string;
  typeLabel: string;
  grapeLabel: string;
  typeGrapeLine: string;
  shortLine: string;
  about: string;
  tasteTags: string[];
  recommend: string;
  proposal: string;
  basicInfo: ShowcaseField[];
};

const vintageThreshold = 2022;

const wineryRegionMap: Record<string, string> = {
  buerklinwolf: 'Pfalz',
  bus: 'Pfalz',
  dautel: 'Württemberg',
  hamm: 'Rheingau',
  horst: 'Franken',
  landerer: 'Baden / Kaiserstuhl',
  ludwig: 'Mosel',
  ress: 'Rheingau',
  salwey: 'Baden / Kaiserstuhl',
  stodden: 'Ahr',
};

const wineryVillageFallbackMap: Partial<Record<string, string>> = {
  bus: 'Insheim',
  hamm: 'Oestrich-Winkel',
  horst: 'Escherndorf',
  ludwig: 'Thörnich',
};

const grapePatterns: Array<[RegExp, string]> = [
  [/Cabernet Sauvignon/i, 'Cabernet Sauvignon'],
  [/Sauvignon Blanc/i, 'Sauvignon Blanc'],
  [/Goldmuskateller/i, 'Goldmuskateller'],
  [/Grauburgunder/i, 'Grauburgunder'],
  [/Weissburgunder|Weißburgunder/i, 'Weissburgunder'],
  [/Spätburgunder|Spaetburgunder|Pinot Noir/i, 'Spätburgunder'],
  [/Müller-Thurgau|Mueller-Thurgau/i, 'Müller-Thurgau'],
  [/Riesling/i, 'Riesling'],
  [/Silvaner/i, 'Silvaner'],
  [/Chardonnay/i, 'Chardonnay'],
  [/Lemberger/i, 'Lemberger'],
  [/Dornfelder/i, 'Dornfelder'],
  [/Trollinger/i, 'Trollinger'],
  [/Merlot/i, 'Merlot'],
  [/Bacchus/i, 'Bacchus'],
  [/Domina/i, 'Domina'],
  [/Rosé|Rose/i, 'Rosé'],
];

const regionVillagePatterns: Array<[RegExp, string]> = [
  [/Ruppertsberg/i, 'Ruppertsberg'],
  [/Wachenheim/i, 'Wachenheim'],
  [/Forst/i, 'Forst'],
  [/Deidesheim/i, 'Deidesheim'],
  [/Escherndorf/i, 'Escherndorf'],
  [/Thörnich|Thornich/i, 'Thörnich'],
  [/Rüdesheim|Rudesheim/i, 'Rüdesheim'],
  [/Winkel/i, 'Winkel'],
  [/Oberrotweil/i, 'Oberrotweil'],
  [/Leiselheim/i, 'Leiselheim'],
  [/Kaiserstuhl/i, 'Kaiserstuhl'],
  [/Recher|Rech/i, 'Rech'],
];

const tagLexicon: Array<[RegExp, string]> = [
  [/柑橘|レモン|ライム|オレンジ|グレープフルーツ/u, '柑橘'],
  [/白桃|黄桃|桃/u, '白桃'],
  [/洋梨/u, '洋梨'],
  [/青リンゴ|黄リンゴ|りんご/u, '青リンゴ'],
  [/白い花|フローラル|花/u, '白い花'],
  [/ハーブ|草花/u, 'ハーブ'],
  [/ミネラル|スレート|濡れ石|石灰/u, 'ミネラル'],
  [/スパイス|胡椒|ペッパー/u, 'スパイス'],
  [/熟成|落ち着き/u, '熟成感'],
  [/赤いベリー|ラズベリー|チェリー/u, '赤い果実'],
  [/黒系果実|カシス|ブラックベリー/u, '黒系果実'],
  [/タンニン/u, 'なめらかなタンニン'],
  [/酸/u, '伸びやかな酸'],
  [/泡|Sekt|Secco|brut/i, 'きめ細かな泡'],
  [/透明感/u, '透明感'],
  [/余韻/u, 'きれいな余韻'],
];

function sanitizeText(value: string) {
  return value
    .replace(/\s+/g, ' ')
    .replace(/“|”/g, '"')
    .replace(/「最も安全」|最も安全|断定しない|未確認のため|未確認|想定|文脈で捉える|説明が通る|普通に強い|という整理|としてまとめる/gu, '')
    .replace(/AI[- ]?like/gi, '')
    .replace(/\s+([。、）])/gu, '$1')
    .replace(/([（])\s+/gu, '$1')
    .trim();
}

function parseVintage(name: string) {
  const match = name.match(/^(NV|\d{4})/i);
  return match ? match[1].toUpperCase() : '';
}

function parseMetrics(analysis: string) {
  const normalized = sanitizeText(analysis).replace(/–/g, '-');
  const alcohol = normalized.match(/Alc[:：]?\s*([0-9.]+\s*%?\s*vol|[0-9.]+\s*%)/i)?.[1]?.replace(/\s+/g, '');
  const residualSugar = normalized.match(/RS[^0-9]*([0-9.]+\s*g\/L)/i)?.[1]?.replace(/\s+/g, '');
  const acidity = normalized.match(/(?:総酸|A)[^0-9]*([0-9.]+\s*g\/L)/i)?.[1]?.replace(/\s+/g, '');

  return {
    alcohol: alcohol && !alcohol.includes('—') ? alcohol.replace(/vol/i, '%').replace('%%', '%') : '',
    residualSugar: residualSugar && !residualSugar.includes('—') ? residualSugar : '',
    acidity: acidity && !acidity.includes('—') ? acidity : '',
  };
}

function parseServing(serving: string) {
  const normalized = sanitizeText(serving).replace(/–/g, '〜');
  const temperature =
    normalized.match(/(?:提供温度|適温)[:：]?\s*([0-9〜\-]+℃(?:[^おすすめ相性提案]*)?)/u)?.[1]?.trim() ?? '';
  const recommendRaw =
    normalized.match(/(?:おすすめ(?:の場)?|相性(?:（例）)?|提案)[:：]?\s*([^。]+(?:。|$))/u)?.[1]?.trim() ?? '';

  return {
    temperature: temperature.replace(/\s+/g, ''),
    recommend: recommendRaw.replace(/[()（）]/g, '').replace(/目安/g, '').trim(),
  };
}

function inferGrape(name: string) {
  for (const [pattern, label] of grapePatterns) {
    if (pattern.test(name)) {
      return label;
    }
  }

  return '';
}

function inferRegionVillage(wine: WineListItem, displayTitle: string) {
  const region = wineryRegionMap[wine.wineryId] ?? '';
  const matchedVillage = regionVillagePatterns.find(([pattern]) => pattern.test(displayTitle))?.[1] ?? '';

  if (matchedVillage && region.includes(matchedVillage)) {
    return region;
  }

  if (matchedVillage) {
    return `${region} / ${matchedVillage}`;
  }

  const fallbackVillage = wineryVillageFallbackMap[wine.wineryId];
  if (fallbackVillage) {
    return `${region} / ${fallbackVillage}`;
  }

  return region;
}

function inferSweetness(displayTitle: string, wineType: WineListItem['type']) {
  if (/Spätlese|Auslese/i.test(displayTitle)) return 'やや甘口';
  if (/feinherb/i.test(displayTitle)) return 'やや辛口';
  if (/brut/i.test(displayTitle)) return 'ブリュット';
  if (wineType === 'white') return '辛口';
  return '';
}

function inferTypeLabel(displayTitle: string, wineType: WineListItem['type']) {
  if (wineType === 'sparkling') {
    return /Rosé|Rose/i.test(displayTitle) ? 'スパークリング・ロゼ' : 'スパークリング';
  }
  if (wineType === 'white') return '白';
  return '赤';
}

function buildTypeGrapeLine(displayTitle: string, wineType: WineListItem['type'], grape: string) {
  const typeLabel = inferTypeLabel(displayTitle, wineType);
  const sweetness = inferSweetness(displayTitle, wineType);
  const left = sweetness ? `${typeLabel}・${sweetness}` : typeLabel;
  return grape ? `${left} / ${grape}` : left;
}

function buildShortLine(summary: string) {
  return sanitizeText(compactPreviewCopy(summary, 54));
}

function buildAbout(wine: WineListItem, displayTitle: string, regionVillage: string) {
  const lead = buildShortLine(wine.summary);
  const text = sanitizeText(compactSentence(wine.summary, 110));
  if (text && text !== lead) {
    return text;
  }

  const typeLabel = inferTypeLabel(displayTitle, wine.type);
  return `${regionVillage}の${typeLabel}ワイン。${lead}`;
}

function buildTasteTags(wine: WineListItem, displayTitle: string, grape: string) {
  const source = `${wine.summary} ${wine.tasting} ${wine.soil} ${displayTitle}`;
  const tags: string[] = [];

  for (const [pattern, tag] of tagLexicon) {
    if (pattern.test(source) && !tags.includes(tag)) {
      tags.push(tag);
    }
    if (tags.length >= 6) break;
  }

  if (tags.length >= 4) {
    return tags;
  }

  if (wine.type === 'sparkling') {
    return ['きめ細かな泡', '柑橘', '爽やかな酸', '食前酒', '前菜に合う'];
  }
  if (wine.type === 'red' && grape === 'Spätburgunder') {
    return ['赤い果実', '繊細な酸', 'ミネラル', '上品な余韻'];
  }
  if (wine.type === 'red') {
    return ['黒系果実', 'スパイス', 'なめらかなタンニン', '食中向き'];
  }
  if (grape === 'Silvaner') {
    return ['白い果実', 'ミネラル', '伸びやかな酸', '出汁に合う'];
  }

  return ['柑橘', 'ミネラル', '伸びやかな酸', '食中向き'];
}

function buildRecommend(wine: WineListItem) {
  const extracted = parseServing(wine.serving).recommend;
  if (extracted) {
    return extracted.replace(/^食中/u, '食中').replace(/\s+/g, ' ');
  }

  if (wine.type === 'sparkling') {
    return '乾杯、前菜、魚介の軽い一皿に。';
  }
  if (wine.type === 'red') {
    return '鴨、仔牛、豚肉、きのこ料理、軽めのソース料理に。';
  }
  return 'コース中盤の魚介料理、出汁、甲殻類、軽いソース料理に。';
}

function buildProposal(wine: WineListItem, displayTitle: string, grape: string, vintage: string) {
  const numericVintage = Number(vintage);
  const isBackVintage = Number.isFinite(numericVintage) && numericVintage < vintageThreshold;

  if (wine.type === 'sparkling') {
    if (/Rosé|Rose/i.test(displayTitle)) {
      return '乾杯から前菜までの流れにやわらかな華やかさを添えたい場面で提案しやすい一本です。';
    }
    return '乾杯や前菜の立ち上がりに使いやすく、グラス提案でも印象を整えやすい一本です。';
  }

  if (isBackVintage && wine.type === 'white') {
    return '飲み頃を意識して提案したいヴィンテージとして、料理との相性を見ながら食中に組み込みやすい一本です。';
  }

  if (isBackVintage && wine.type === 'red') {
    return '熟成による落ち着きを活かし、コース後半の肉料理に寄り添わせたい一本です。';
  }

  if (grape === 'Riesling' || grape === 'Silvaner') {
    return '酸とミネラルの輪郭を活かし、和食や魚介のペアリング提案に向く一本です。';
  }

  if (grape === 'Spätburgunder') {
    return '繊細な果実味と食中での使いやすさを活かし、重すぎない赤として提案したい一本です。';
  }

  if (wine.type === 'red') {
    return '果実の厚みと収まりの良さを活かし、肉料理に合わせる食中赤として提案しやすい一本です。';
  }

  return '料理に寄り添うバランスを活かし、グラスでもコースでも組み込みやすい一本です。';
}

function buildBasicInfo(wine: WineListItem, displayTitle: string, regionVillage: string, grape: string, vintage: string) {
  const metrics = parseMetrics(wine.analysis);
  const serving = parseServing(wine.serving);
  const fields: ShowcaseField[] = [
    { label: '生産者', value: wine.wineryName },
    { label: '地域', value: regionVillage },
    ...(grape ? [{ label: '品種', value: grape }] : []),
    ...(vintage ? [{ label: 'ヴィンテージ', value: vintage }] : []),
    { label: 'タイプ', value: inferTypeLabel(displayTitle, wine.type) },
    ...(inferSweetness(displayTitle, wine.type) ? [{ label: '味わい', value: inferSweetness(displayTitle, wine.type) }] : []),
    ...(metrics.alcohol ? [{ label: 'アルコール', value: metrics.alcohol }] : []),
    ...(serving.temperature ? [{ label: '適温', value: serving.temperature }] : []),
    ...(metrics.residualSugar ? [{ label: '残糖', value: metrics.residualSugar }] : []),
    ...(metrics.acidity ? [{ label: '総酸', value: metrics.acidity }] : []),
  ];

  return fields;
}

function buildShowcaseItem(wine: WineListItem): WineShowcaseItem {
  const displayTitle = formatDisplayTitle(wine.name);
  const vintage = parseVintage(displayTitle);
  const grapeLabel = inferGrape(displayTitle);
  const regionVillage = inferRegionVillage(wine, displayTitle);
  const typeLabel = inferTypeLabel(displayTitle, wine.type);
  const baseItem: WineShowcaseItem = {
    id: wine.id,
    wineryId: wine.wineryId,
    wineryName: wine.wineryName,
    name: wine.name,
    displayTitle,
    vintage,
    regionVillage,
    typeLabel,
    grapeLabel,
    typeGrapeLine: buildTypeGrapeLine(displayTitle, wine.type, grapeLabel),
    shortLine: buildShortLine(wine.summary),
    about: buildAbout(wine, displayTitle, regionVillage),
    tasteTags: buildTasteTags(wine, displayTitle, grapeLabel),
    recommend: buildRecommend(wine),
    proposal: buildProposal(wine, displayTitle, grapeLabel, vintage),
    basicInfo: buildBasicInfo(wine, displayTitle, regionVillage, grapeLabel, vintage),
  };

  const override = winePdfOverrides[makeWinePdfOverrideKey(wine.wineryId, wine.name)];
  if (!override) {
    return baseItem;
  }

  return {
    ...baseItem,
    ...override,
    tasteTags: override.tasteTags ?? baseItem.tasteTags,
    basicInfo: override.basicInfo ?? baseItem.basicInfo,
  };
}

export const wineShowcaseList = wineList.map(buildShowcaseItem);

export const wineShowcaseById = new Map(wineShowcaseList.map((wine) => [wine.id, wine] as const));
