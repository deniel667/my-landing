import { wineList, type WineListItem } from '@/data/my-landing/wineList';

function normalizeWineNameForSort(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '');
}

export const preferredWineOrderByWineryId: Partial<Record<WineListItem['wineryId'], string[]>> = {
  horst: [
    '2023 Silvaner brut Sekt b.A.',
    '2018 JUST Secco Rosé',
    '2022 Just Silvaner trocken Gutswein',
    '2024 Escherndorf Silvaner trocken',
    '2022 Escherndorfer Silvaner trocken',
    '2023 Escherndorf Riesling trocken',
    '2017 Escherndorfer Fürstenberg Müller-Thurgau trocken',
    '2017 Escherndorfer Bacchus Spätlese',
    '2016 Escherndorfer Domina trocken (BB)',
  ],
  salwey: [
    '2024 Weissburgunder Gutswein',
    '2023 Weissburgunder Gutswein',
    '2024 Grauburgunder Gutswein',
    '2023 Grauburgunder Gutswein',
    '2022 Grauburgunder Gutswein',
    '2016 Henkenberg Grauburgunder GG',
    '2017 Eichberg Grauburgunder GG',
    '2022 Kaiserstuhl Spätburgunder',
    '2016 Oberrotweil Spätburgunder RS',
  ],
  dautel: [
    '2018 Chardonnay -S- trocken',
    '2022 Lemberger VDP.Gutswein',
    '2023 Spätburgunder trocken',
    '2022 Spätburgunder trocken',
    '2016 Spätburgunder trocken',
    '2015 Spätburgunder trocken',
    '2022 Trollinger',
    '2024 Jakob D.',
  ],
  ludwig: [
    'NV Riesling Sekt Brut',
    '2024 Thörnicher Riesling trocken',
    '2023 Sauvignon Blanc trocken',
    '2022 Riesling dry Guts',
    '2020 Thörnicher Riesling trocken',
  ],
  bus: [
    '2023 Merlot Blanc de Noir trocken',
    '2022 Chardonnay dry',
    '2018 Goldmuskateller feinherb Q.B.A.',
    '2019 Cabernet Sauvignon trocken',
    '2019 Merlot trocken',
    '2018 Dornfelder trocken',
    '2016 Dornfelder trocken',
  ],
  buerklinwolf: [
    '2022 Riesling trocken',
    '2018 Riesling trocken',
    '2017 FASS 68 Ruppertsberger Riesling',
    '2017 Villa Bürklin Weißwein trocken',
    '2018 Villa Bürklin Weißwein trocken',
    '2018 Villa Bürklin Cuvée Rot',
    '2017 Villa Bürklin Cuvée Rot',
    '2018 Villa Bürklin Rotwein trocken',
    '2017 Villa Bürklin Rotwein trocken',
  ],
  stodden: [
    '2022 Spätburgunder Blanc de Noir trocken',
    '2023 Spätburgunder trocken',
    '2022 Spätburgunder trocken',
    '2016 Alte Reben Spätburgunder',
    '2014 Recher Herrenberg Spätburgunder trocken',
  ],
  hamm: [
    '2017 Rheingau Riesling trocken',
    '2017 Rheingau Riesling feinherb',
    '2017 Winkel Riesling Alte Reben feinherb',
  ],
  ress: [
    '2009 Rüdesheimer Berg Rottland Riesling Erstes Gewächs',
    '2006 Rüdesheim Berg Schlossberg Riesling Auslese',
  ],
};

const fallbackTypeRank = {
  sparkling: 0,
  white: 1,
  red: 3,
} as const;

export function compareWinesForProducer(left: WineListItem, right: WineListItem) {
  const preferredOrder = preferredWineOrderByWineryId[left.wineryId];
  if (preferredOrder && left.wineryId === right.wineryId) {
    const orderMap = new Map(
      preferredOrder.map((name, index) => [normalizeWineNameForSort(name), index] as const)
    );
    const leftIndex = orderMap.get(normalizeWineNameForSort(left.name));
    const rightIndex = orderMap.get(normalizeWineNameForSort(right.name));

    if (leftIndex !== undefined || rightIndex !== undefined) {
      if (leftIndex === undefined) return 1;
      if (rightIndex === undefined) return -1;
      if (leftIndex !== rightIndex) return leftIndex - rightIndex;
    }
  }

  const typeDiff = fallbackTypeRank[left.type] - fallbackTypeRank[right.type];
  if (typeDiff !== 0) {
    return typeDiff;
  }

  return left.name.localeCompare(right.name, 'ja');
}

export const groupedWineList = Array.from(
  wineList.reduce((map, wine) => {
    const existing = map.get(wine.wineryName);
    if (existing) {
      existing.push(wine);
      return map;
    }

    map.set(wine.wineryName, [wine]);
    return map;
  }, new Map<string, WineListItem[]>())
).map(([wineryName, wines]) => [wineryName, [...wines].sort(compareWinesForProducer)] as const);

export function getSortedWinesForWinery(wineryId: WineListItem['wineryId']) {
  return wineList.filter((wine) => wine.wineryId === wineryId).sort(compareWinesForProducer);
}
