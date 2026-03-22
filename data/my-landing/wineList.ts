import { docWineData, type DocWine } from '@/data/my-landing/docWineData';

export type WineListItem = {
  id: string;
  wineryId: string;
  wineryName: string;
  name: string;
  type: 'white' | 'red' | 'sparkling';
  summary: string;
  analysis: string;
  tasting: string;
  vinification: string;
  soil: string;
  serving: string;
};

type WineryId = keyof typeof wineryNames;

type ExcelWineRow = {
  row: number;
  code: string | null;
  excelName: string;
  wineryId: WineryId;
};

const wineryNames = {
  buerklinwolf: 'Weingut Dr. Burklin Wolf',
  bus: 'Weingut Bus',
  dautel: 'Weingut Dautel',
  hamm: 'Weingut Hamm',
  horst: 'Weingut Horst Sauer',
  landerer: 'Weingut Landerer',
  ludwig: 'Weingut Ludwig',
  ress: 'Weingut Balthasar Ress',
  salwey: 'Weingut Salwey',
  stodden: 'Jean Stodden das Rotweingut',
} as const;

// Exact positions extracted from `C:\Users\denie\Downloads\PROWINE 2026 .xlsx` (Sheet1, rows with wine names).
const prowein2026ExcelRows: ExcelWineRow[] = [
  { row: 2, code: 'TWGR-LAN-R01-23', excelName: '2023 Kaiserstuhl Spatburgunder 750ml×12', wineryId: 'landerer' },
  { row: 3, code: 'TWGR-LAN-W01-23', excelName: '2023 Leiselheim Chardonnay Schwarze Erde 750ml×12', wineryId: 'landerer' },
  { row: 5, code: 'TWGR-HBS-R01-16', excelName: 'BUS 2016 Dornfelder Trocken', wineryId: 'bus' },
  { row: 6, code: 'TWGR-HBS-R02-19', excelName: 'BUS 2019 Cabernet Sauvignon trocken', wineryId: 'bus' },
  { row: 7, code: null, excelName: 'BUS 2023 Merlot Blanc de Noir dry 750ml×12', wineryId: 'bus' },
  { row: 8, code: null, excelName: 'BUS 2019 Merlot trocken  750ml×12', wineryId: 'bus' },
  { row: 10, code: 'GUTSWEINE', excelName: 'Salwey 2022 Kaiserstuhl Spätburgunder', wineryId: 'salwey' },
  { row: 11, code: 'GUTSWEINE', excelName: 'Salwey 2023 Weissburgunder Gutswein', wineryId: 'salwey' },
  { row: 12, code: 'GUTSWEINE', excelName: 'Salwey 2023 Grauburgunder Gutswein', wineryId: 'salwey' },
  { row: 14, code: 'TWGR-DAU-R01-22', excelName: 'DAUTEL 2022 Lemberger VDP.Gutswein 750X6', wineryId: 'dautel' },
  { row: 15, code: 'TWGR-DAU-R02-23', excelName: 'DAUTEL 2023 Spatburgunder VDP.Gutswein 750X6', wineryId: 'dautel' },
  { row: 16, code: 'TWGR-DAU-R08-24', excelName: 'DAUTEL 2024 Jakob D.750X6', wineryId: 'dautel' },
  { row: 18, code: 'TWGR-HOR-W05-24', excelName: 'HOR 2024 Escherndorfer Silvaner tro VDP orts (BB) 750X', wineryId: 'horst' },
  { row: 19, code: 'TWGR-HOR-W10-6-23', excelName: 'HOR 2023 Escherndorf Riesling trocken 750ml×6', wineryId: 'horst' },
  { row: 20, code: 'TWGR-HOR-WS02-23', excelName: 'HOR 2023 Frankensekt Silvaner brut b.A.750x6', wineryId: 'horst' },
  { row: 22, code: 'TWGR-GEB-W01-24', excelName: 'LUDWIG 2024 Thornicher Riesling trocken 750ml×12', wineryId: 'ludwig' },
  { row: 23, code: 'TWGR-GEB-W02-23', excelName: 'LUDWIG 2023 Sauvignon blanc trocken 750ml×12', wineryId: 'ludwig' },
  { row: 24, code: 'TWGR-GEB-WS01-NV', excelName: 'LUDWIG NV Riesling brut Sekt 750X12', wineryId: 'ludwig' },
  { row: 26, code: 'TWGR-JST-R02-23', excelName: 'JST 2023 Spaetburgunder 750X6', wineryId: 'stodden' },
  { row: 27, code: 'TWGR-JST-R01-14', excelName: 'JST 2014 Recher Herrenberg Spaetburgunder', wineryId: 'stodden' },
  { row: 28, code: 'TWGR-JST-W02-21-Y', excelName: 'JST 2022 JST Blanc Noir', wineryId: 'stodden' },
  { row: 30, code: 'TWGR-HAM-W08-17-6', excelName: 'HAMM  2017 Rheingau Riesling feinherb', wineryId: 'hamm' },
  { row: 33, code: 'TWGR-BUR-W01-21-Y', excelName: 'BUR 2022 BUR Riesling Trocken', wineryId: 'buerklinwolf' },
  { row: 34, code: 'TWGR-BUR-W27-17', excelName: 'BUR FASS68 Ruppertsberger Riesling 2017', wineryId: 'buerklinwolf' },
];

// Explicit mapping from Excel naming to docWineData naming.
const excelToDocNameMap: Partial<Record<number, string>> = {
  2: '2023 KaiserstuhlSpätburgundertrocken',
  3: '2023 Leiselheim Chardonnay trocken -SchwarzeErde-',
  5: '2016 Dornfeldertrocken “In derHölle”',
  6: '2019 CabernetSauvignontrocken',
  7: '2023 MerlotBlancdeNoirtrocken',
  8: '2019 Merlot trocken',
  11: '2023 Weissburgunder Gutswein',
  12: '2023 Grauburgunder Gutswein',
  14: '2022 Lemberger VDP.Gutswein',
  10: '2022 KaiserstuhlSpätburgunder',
  15: '2023 Spätburgundertrocken',
  16: '2024 Jakob D.',
  18: '2024 EscherndorfSilvanertrocken',
  19: '2023 Escherndorf Riesling trocken',
  20: '2023 SilvanerbrutSektb.A.',
  22: '2024 Thörnicher Riesling trocken',
  23: '2023 Sauvignon Blanc trocken',
  24: 'NV RieslingSektBrut',
  26: '2023 Spätburgundertrocken',
  27: '2014 RecherHerrenbergSpätburgundertrocken',
  28: '2022 Spätburgunder Blanc de Noir trocken',
  30: '2017 RheingauRieslingfeinherb',
  33: '2022 Rieslingtrocken',
  34: '2017 FASS 68 Ruppertsberger Riesling',
};

function buildWineId(wineryId: string, wine: DocWine, index: number) {
  const slug = wine.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${wineryId}-${slug || `wine-${index + 1}`}-${index + 1}`;
}

function normalizeName(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[”“„‟"']/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ß/g, 'ss')
    .trim();
}

const docWineLookup = new Map<string, { wine: DocWine; index: number }>();

Object.entries(docWineData).forEach(([wineryId, wines]) => {
  wines.forEach((wine, index) => {
    docWineLookup.set(`${wineryId}::${normalizeName(wine.name)}`, { wine, index });
  });
});

type MatchReportItem = {
  row: number;
  code: string | null;
  wineryId: WineryId;
  excelName: string;
  mappedDocName: string | null;
  reason: 'missing_mapping' | 'missing_doc_match';
};

const matchedSelections: Array<{ row: ExcelWineRow; wine: DocWine; index: number }> = [];
const unmatchedSelections: MatchReportItem[] = [];

prowein2026ExcelRows.forEach((row) => {
  const mappedDocName = excelToDocNameMap[row.row] ?? null;

  if (!mappedDocName) {
    unmatchedSelections.push({
      row: row.row,
      code: row.code,
      wineryId: row.wineryId,
      excelName: row.excelName,
      mappedDocName: null,
      reason: 'missing_mapping',
    });
    return;
  }

  const match = docWineLookup.get(`${row.wineryId}::${normalizeName(mappedDocName)}`);
  if (!match) {
    unmatchedSelections.push({
      row: row.row,
      code: row.code,
      wineryId: row.wineryId,
      excelName: row.excelName,
      mappedDocName,
      reason: 'missing_doc_match',
    });
    return;
  }

  matchedSelections.push({
    row,
    wine: match.wine,
    index: match.index,
  });
});

if (unmatchedSelections.length > 0) {
  console.warn(
    `[wineList] PROWINE 2026 Excel mismatches (${unmatchedSelections.length}): ${unmatchedSelections
      .map((item) => `row ${item.row} ${item.excelName} [${item.reason}]`)
      .join(', ')}`
  );
}

export const wineList: WineListItem[] = matchedSelections.map(({ row, wine, index }) => ({
  id: buildWineId(row.wineryId, wine, index),
  wineryId: row.wineryId,
  wineryName: wineryNames[row.wineryId],
  name: wine.name,
  type: wine.type,
  summary: wine.summary,
  analysis: wine.analysis,
  tasting: wine.tasting,
  vinification: wine.vinification,
  soil: wine.soil,
  serving: wine.serving,
}));

export const prowein2026MatchReport = {
  excelPositions: prowein2026ExcelRows.map((item) => ({
    row: item.row,
    code: item.code,
    wineryId: item.wineryId,
    excelName: item.excelName,
  })),
  requested: prowein2026ExcelRows.length,
  matched: matchedSelections.length,
  unmatched: unmatchedSelections,
};
