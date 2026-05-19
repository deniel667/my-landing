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

type ManualWineAdditionConfig = {
  wineryId: WineryId;
  name: string;
  sourceName?: string;
  source?: DocWine;
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

const prowein2026ExcelRows: ExcelWineRow[] = [
  { row: 2, code: 'TWGR-LAN-R01-23', excelName: '2023 Kaiserstuhl Spatburgunder 750ml×12', wineryId: 'landerer' },
  { row: 3, code: 'TWGR-LAN-W01-23', excelName: '2023 Leiselheim Chardonnay Schwarze Erde 750ml×12', wineryId: 'landerer' },
  { row: 6, code: 'TWGR-HBS-R02-19', excelName: 'BUS 2019 Cabernet Sauvignon trocken', wineryId: 'bus' },
  { row: 7, code: null, excelName: 'BUS 2023 Merlot Blanc de Noir dry 750ml×12', wineryId: 'bus' },
  { row: 8, code: null, excelName: 'BUS 2019 Merlot trocken 750ml×12', wineryId: 'bus' },
  { row: 10, code: 'GUTSWEINE', excelName: 'Salwey 2022 Kaiserstuhl Spätburgunder', wineryId: 'salwey' },
  { row: 11, code: 'GUTSWEINE', excelName: 'Salwey 2023 Weissburgunder Gutswein', wineryId: 'salwey' },
  { row: 12, code: 'GUTSWEINE', excelName: 'Salwey 2023 Grauburgunder Gutswein', wineryId: 'salwey' },
  { row: 14, code: 'TWGR-DAU-R01-22', excelName: 'DAUTEL 2022 Lemberger VDP.Gutswein 750X6', wineryId: 'dautel' },
  { row: 15, code: 'TWGR-DAU-R02-23', excelName: 'DAUTEL 2023 Spatburgunder VDP.Gutswein 750X6', wineryId: 'dautel' },
  { row: 16, code: 'TWGR-DAU-R08-24', excelName: 'DAUTEL 2024 Jakob D. 750X6', wineryId: 'dautel' },
  { row: 18, code: 'TWGR-HOR-W05-24', excelName: 'HOR 2024 Escherndorfer Silvaner tro VDP orts (BB) 750X', wineryId: 'horst' },
  { row: 19, code: 'TWGR-HOR-W10-6-23', excelName: 'HOR 2023 Escherndorf Riesling trocken 750ml×6', wineryId: 'horst' },
  { row: 20, code: 'TWGR-HOR-WS02-23', excelName: 'HOR 2023 Frankensekt Silvaner brut b.A. 750x6', wineryId: 'horst' },
  { row: 22, code: 'TWGR-GEB-W01-24', excelName: 'LUDWIG 2024 Thornicher Riesling trocken 750ml×12', wineryId: 'ludwig' },
  { row: 23, code: 'TWGR-GEB-W02-23', excelName: 'LUDWIG 2023 Sauvignon blanc trocken 750ml×12', wineryId: 'ludwig' },
  { row: 24, code: 'TWGR-GEB-WS01-NV', excelName: 'LUDWIG NV Riesling brut Sekt 750X12', wineryId: 'ludwig' },
  { row: 26, code: 'TWGR-JST-R02-23', excelName: 'JST 2023 Spaetburgunder 750X6', wineryId: 'stodden' },
  { row: 27, code: 'TWGR-JST-R01-14', excelName: 'JST 2014 Recher Herrenberg Spaetburgunder', wineryId: 'stodden' },
  { row: 28, code: 'TWGR-JST-W02-21-Y', excelName: 'JST 2022 JST Blanc Noir', wineryId: 'stodden' },
  { row: 30, code: 'TWGR-HAM-W08-17-6', excelName: 'HAMM 2017 Rheingau Riesling feinherb', wineryId: 'hamm' },
  { row: 33, code: 'TWGR-BUR-W01-21-Y', excelName: 'BUR 2022 BUR Riesling Trocken', wineryId: 'buerklinwolf' },
  { row: 34, code: 'TWGR-BUR-W27-17', excelName: 'BUR FASS68 Ruppertsberger Riesling 2017', wineryId: 'buerklinwolf' },
];

const excelToDocNameMap: Partial<Record<number, string>> = {
  2: '2023 KaiserstuhlSpätburgundertrocken',
  3: '2023 Leiselheim Chardonnay trocken -SchwarzeErde-',
  6: '2019 CabernetSauvignontrocken',
  7: '2023 MerlotBlancdeNoirtrocken',
  8: '2019 Merlot trocken',
  10: '2022 KaiserstuhlSpätburgunder',
  11: '2023 Weissburgunder Gutswein',
  12: '2023 Grauburgunder Gutswein',
  14: '2022 Lemberger VDP.Gutswein',
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
  const slug = wine.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
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

function cleanPublicName(value: string) {
  return value
    .replace(/CabernetSauvignon/g, 'Cabernet Sauvignon')
    .replace(/SauvignonBlanc/g, 'Sauvignon Blanc')
    .replace(/BlancdeNoir/g, 'Blanc de Noir')
    .replace(/GrauburgunderGutswein/g, 'Grauburgunder Gutswein')
    .replace(/WeissburgunderGutswein/g, 'Weissburgunder Gutswein')
    .replace(/ThörnicherRitsch/g, 'Thörnicher Ritsch')
    .replace(/ThörnicherRiesling/g, 'Thörnicher Riesling')
    .replace(/RüdesheimBergRottland/g, 'Rüdesheimer Berg Rottland')
    .replace(/BergRottland/g, 'Berg Rottland')
    .replace(/RüdesheimBergSchlossberg/g, 'Rüdesheim Berg Schlossberg')
    .replace(/Spätburgundertrocken/g, 'Spätburgunder trocken')
    .replace(/Rieslingtrocken/g, 'Riesling trocken')
    .replace(/Silvanertrocken/g, 'Silvaner trocken')
    .replace(/Rieslingdry/g, 'Riesling dry')
    .replace(/RieslingSektBrut/g, 'Riesling Sekt Brut')
    .replace(/EscherndorfSilvaner/g, 'Escherndorf Silvaner')
    .replace(/RecherHerrenbergSpätburgunder/g, 'Recher Herrenberg Spätburgunder')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanPublicText(value: string) {
  return cleanPublicName(value)
    .replace(/説明するのが最も安全/g, '端正にまとまっています')
    .replace(/断定しない/g, '前面に出しません')
    .replace(/未確認のため/g, '')
    .replace(/未確認/g, '')
    .replace(/想定/g, '')
    .replace(/文脈で捉える/g, '表現する')
    .replace(/説明が通る/g, '表現できます')
    .replace(/普通に強い/g, '安定感のある')
    .replace(/という整理/g, '')
    .replace(/としてまとめる/g, 'として表現する')
    .replace(/寄せるのが安全/g, '表現しています')
    .replace(/Insheim拠点のPfalzレンジとして、温暖・日照の一般文脈までに留める。単一畑名・土壌タイプ・標高などは。/g, 'プファルツの温暖な気候と日照条件が、果実の熟度とやわらかな口当たりを支えています。')
    .replace(/Insheim拠点のPfalzレンジとして、温暖で日照に恵まれた産地文脈までに留める（単一畑・土壌タイプは）。/g, 'プファルツの温暖な気候と日照条件が、果実の熟度とやわらかな口当たりを支えています。')
    .replace(/Devonianslate/g, 'Devonian slate')
    .replace(/\s+/g, ' ')
    .replace(/\s+([。、）])/g, '$1')
    .replace(/（\s+/g, '（')
    .trim();
}

function createWineListItemFromDoc(
  wineryId: WineryId,
  wineryName: string,
  name: string,
  wine: DocWine,
  id: string
): WineListItem {
  return {
    id,
    wineryId,
    wineryName,
    name: cleanPublicName(name),
    type: wine.type,
    summary: cleanPublicText(wine.summary),
    analysis: cleanPublicText(wine.analysis),
    tasting: cleanPublicText(wine.tasting),
    vinification: cleanPublicText(wine.vinification),
    soil: cleanPublicText(wine.soil),
    serving: cleanPublicText(wine.serving),
  };
}

const docWineLookup = new Map<string, { wine: DocWine; index: number }>();

Object.entries(docWineData).forEach(([wineryId, wines]) => {
  wines.forEach((wine, index) => {
    docWineLookup.set(`${wineryId}::${normalizeName(wine.name)}`, { wine, index });
  });
});

function getDocWineOrThrow(wineryId: WineryId, docName: string) {
  const match = docWineLookup.get(`${wineryId}::${normalizeName(docName)}`);
  if (!match) {
    throw new Error(`[wineList] Missing doc wine match for ${wineryId}: ${docName}`);
  }
  return match;
}

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

  matchedSelections.push({ row, wine: match.wine, index: match.index });
});

if (unmatchedSelections.length > 0) {
  console.warn(
    `[wineList] PROWINE 2026 Excel mismatches (${unmatchedSelections.length}): ${unmatchedSelections
      .map((item) => `row ${item.row} ${item.excelName} [${item.reason}]`)
      .join(', ')}`
  );
}

const generatedWineList: WineListItem[] = matchedSelections.map(({ row, wine, index }) =>
  createWineListItemFromDoc(
    row.wineryId,
    wineryNames[row.wineryId],
    wine.name,
    wine,
    buildWineId(row.wineryId, wine, index)
  )
);

function createManualDocWine(wine: DocWine) {
  return wine;
}

const manualWineAdditionsConfig: ManualWineAdditionConfig[] = [
  { wineryId: 'ress', name: '2009 Rüdesheimer Berg Rottland Riesling Erstes Gewächs', sourceName: '2009 RüdesheimBergRottlandRiesling EG trocken' },
  {
    wineryId: 'ress',
    name: '2006 Rüdesheim Berg Schlossberg Riesling Auslese',
    source: createManualDocWine({
      name: '2006 Rüdesheim Berg Schlossberg Riesling Auslese',
      type: 'white',
      summary:
        'リューデスハイムの急斜面区画 Berg Schlossberg から造られる熟成 Riesling Auslese です。黄桃、アプリコット、蜂蜜、柑橘ピールを思わせる果実味に、酸とミネラルが重なります。コース終盤に印象を残しやすい一本です。',
      analysis: 'Alc：12.5% vol 残糖（RS）：— 総酸（A）：— 内容量：0.75L',
      tasting:
        '熟した黄桃、アプリコット、蜂蜜、ドライフルーツ、オレンジピール、紅茶のニュアンス。甘みの厚みがありながら、酸が全体を整え、余韻は長く続きます。',
      vinification:
        '低温発酵を主体に、果実の純度と熟成感の均衡を大切にした仕立てです。',
      soil:
        'Berg Schlossberg の急斜面に広がる石の多い土壌が、凝縮感とミネラルの輪郭を支えています。',
      serving:
        '提供温度：8–10℃ おすすめ：フォアグラ、ブルーチーズ、果実を使ったデザート、軽いスパイス料理',
    }),
  },
  { wineryId: 'hamm', name: '2017 Rheingau Riesling trocken', sourceName: '2017 RheingauRieslingtrocken' },
  { wineryId: 'hamm', name: '2017 Winkel Riesling Alte Reben feinherb', sourceName: '2017 WinkelRieslingAlteRebenfeinherb' },
  { wineryId: 'bus', name: '2022 Chardonnay dry', sourceName: '2022 Chardonnaytrocken' },
  { wineryId: 'bus', name: '2018 Goldmuskateller feinherb Q.B.A.', sourceName: '2018 Goldmuskatellerfeinherb Q.B.A' },
  { wineryId: 'bus', name: '2016 Dornfelder trocken', sourceName: '2016 Dornfeldertrocken “In derHölle”' },
  { wineryId: 'bus', name: '2018 Dornfelder trocken', sourceName: '2018 Dornfeldertrocken' },
  {
    wineryId: 'salwey',
    name: '2022 Grauburgunder Gutswein',
    source: createManualDocWine({
      name: '2022 Grauburgunder Gutswein',
      type: 'white',
      summary:
        'グラウブルグンダーらしい果実の厚みを備えながら、辛口の輪郭を明快に保った Gutswein。前菜から白身肉までつなげやすい食中向きの一本です。',
      analysis: 'Alc：— 残糖（RS）：— 総酸（A）：— 内容量：0.75L',
      tasting:
        '洋梨や黄系果実のふくらみがあり、後半は重くならずにドライに収束します。',
      vinification:
        '果実の厚みを保ちながら、輪郭をきれいに整えるスタイルです。',
      soil: 'カイザーシュトゥールの火山性土壌が、果実味に締まりを与えています。',
      serving: '提供温度：8–10℃ おすすめ：魚介、白身魚、鶏肉、きのこ、軽いバターソース',
    }),
  },
  { wineryId: 'salwey', name: '2024 Weissburgunder Gutswein', sourceName: '2024 WeissburgunderGutsweintrocken' },
  { wineryId: 'salwey', name: '2024 Grauburgunder Gutswein', sourceName: '2024 GrauburgunderGutsweintrocken' },
  {
    wineryId: 'salwey',
    name: '2016 Henkenberg Grauburgunder GG',
    source: createManualDocWine({
      name: '2016 Henkenberg Grauburgunder GG',
      type: 'white',
      summary:
        '火山性土壌由来のミネラル感と、グラウブルグンダーらしい果実の厚みをあわせ持つ上級辛口白です。白身肉やきのこ、軽いバターソースに寄り添いやすい一本です。',
      analysis: 'Alc：12.5% vol 残糖（RS）：2.0 g/L 総酸（A）：8.0 g/L 内容量：0.75L',
      tasting:
        '熟した黄系果実、洋梨、ナッツ、ハーブのニュアンスに、塩味を帯びたミネラル感が重なります。',
      vinification: '大樽で発酵・熟成し、果実の厚みと骨格を整えています。',
      soil: 'Henkenberg の火山性土壌が、果実の厚みと引き締まった余韻を支えます。',
      serving: '提供温度：10–12℃ おすすめ：帆立、甘鯛、鶏肉、きのこ、根菜',
    }),
  },
  {
    wineryId: 'salwey',
    name: '2017 Eichberg Grauburgunder GG',
    source: createManualDocWine({
      name: '2017 Eichberg Grauburgunder GG',
      type: 'white',
      summary:
        'Eichberg の硬質なミネラル感と引き締まった酸を備えた上級グラウブルグンダー。魚介、甲殻類、白身肉に合わせやすく、コース中盤で使いやすい一本です。',
      analysis: 'Alc：13.0% vol 残糖（RS）：0.0 g/L 総酸（A）：7.5 g/L 内容量：0.75L',
      tasting:
        '黄系果実、りんご、洋梨、ハーブに、スモーキーなミネラルのニュアンス。厚みがありながら、余韻は引き締まります。',
      vinification: '大樽で発酵・熟成し、ミネラル感と骨格を活かしたスタイルです。',
      soil: 'Eichberg の火山性土壌が、硬質なミネラル感と長い余韻につながります。',
      serving: '提供温度：10–12℃ おすすめ：焼き帆立、白身魚、甲殻類、鶏むね肉、きのこ',
    }),
  },
  { wineryId: 'salwey', name: '2016 Oberrotweil Spätburgunder RS', sourceName: '2016 OberrotweilSpätburgunder RS' },
  { wineryId: 'horst', name: '2022 Just Silvaner trocken Gutswein', sourceName: '2022 JUST Silvanertrocken VDP.GUTSWEIN' },
  { wineryId: 'horst', name: '2022 Escherndorfer Silvaner trocken', sourceName: '2022 EscherndorfSilvanertrocken' },
  {
    wineryId: 'horst',
    name: '2017 Escherndorfer Fürstenberg Müller-Thurgau trocken',
    source: createManualDocWine({
      name: '2017 Escherndorfer Fürstenberg Müller-Thurgau trocken',
      type: 'white',
      summary:
        '青りんご、洋梨、白い花、ハーブのニュアンスを穏やかにまとめた辛口白。和食や魚介に寄り添いやすい、落ち着いた食中酒です。',
      analysis: 'Alc：12.0% vol 残糖（RS）：3.2 g/L 総酸（A）：5.8 g/L 内容量：0.75L',
      tasting:
        '青りんご、洋梨、白い花、ハーブを中心に、果実味と酸のバランスが整っています。',
      vinification: '低温発酵で清潔感を保ち、やわらかな口当たりに仕上げています。',
      soil: 'フランケンの貝殻石灰岩土壌が、果実味にほどよい締まりを与えます。',
      serving: '提供温度：8–10℃ おすすめ：魚介、野菜、鶏肉、出汁を使う料理',
    }),
  },
  {
    wineryId: 'horst',
    name: '2017 Escherndorfer Bacchus Spätlese',
    source: createManualDocWine({
      name: '2017 Escherndorfer Bacchus Spätlese',
      type: 'white',
      summary:
        'やさしい甘みとミネラル感を備えた Bacchus の Spätlese。和食や魚介、軽いスパイス料理まで提案しやすい一本です。',
      analysis: 'Alc：12.0% vol 残糖（RS）：16.3 g/L 総酸（A）：6.4 g/L 内容量：0.75L',
      tasting:
        '柑橘、洋梨、白桃の果実に、やわらかな甘みときれいな酸が重なります。',
      vinification: '天然酵母で発酵し、4〜5か月の澱熟成で口当たりを整えています。',
      soil: 'フランケンの石灰質土壌が、果実のやわらかさに落ち着いた輪郭を与えています。',
      serving: '提供温度：8–10℃ おすすめ：魚介、野菜、鶏肉、出汁を使う料理',
    }),
  },
  {
    wineryId: 'horst',
    name: '2016 Escherndorfer Domina trocken (BB)',
    source: createManualDocWine({
      name: '2016 Escherndorfer Domina trocken (BB)',
      type: 'red',
      summary:
        '黒系果実、プラム、チェリー、紅茶、スパイスの要素をバランスよくまとめた食中向きの赤です。豚肉や鴨、きのこ料理に合わせやすいスタイルです。',
      analysis: 'Alc：13.0% vol 残糖（RS）：2.1 g/L 総酸（A）：5.3 g/L 内容量：0.75L',
      tasting:
        '黒系果実とスパイスのニュアンスがあり、後半はドライに整います。',
      vinification: 'ステンレスタンクと木樽を併用し、大樽主体で落ち着いた構成にまとめています。',
      soil: 'フランケンの石灰質土壌が、果実の厚みに対して後味の締まりを支えます。',
      serving: '提供温度：15–17℃ おすすめ：肉料理、きのこ、醤油や味噌を使う料理',
    }),
  },
  {
    wineryId: 'horst',
    name: '2018 JUST Secco Rosé',
    source: createManualDocWine({
      name: '2018 JUST Secco Rosé',
      type: 'sparkling',
      summary:
        '明るい果実感ときめ細かな泡を備えるロゼ・ゼッコ。乾杯から前菜までつなげやすい、軽快な一本です。',
      analysis: 'Alc：11.5% vol 残糖（RS）：11.9 g/L 総酸（A）：5.8 g/L 内容量：0.75L',
      tasting:
        '柑橘、白い花、きめ細かな泡、ほのかな蜂蜜のニュアンス。軽快でバランスのよい味わいです。',
      vinification: '淡いロゼ色の果汁を低温で発酵し、フレッシュな果実味を活かしています。',
      soil: 'フランケンの石灰質土壌が、明るい果実感と後味の締まりを支えます。',
      serving: '提供温度：6–8℃ おすすめ：牡蠣、天ぷら、焼き鳥の塩、前菜盛り合わせ',
    }),
  },
  { wineryId: 'buerklinwolf', name: '2018 Riesling trocken', sourceName: '2018 Rieslingtrocken' },
  {
    wineryId: 'buerklinwolf',
    name: '2017 Villa Bürklin Weißwein trocken',
    source: createManualDocWine({
      name: '2017 Villa Bürklin Weißwein trocken',
      type: 'white',
      summary:
        '柑橘、青りんご、白い花、ハーブを軸にまとめた、レストランで使いやすい辛口白です。',
      analysis: 'Alc：12.0% vol 残糖（RS）：4.1 g/L 総酸（A）：8.1 g/L 内容量：0.75L',
      tasting:
        '柑橘、青りんご、白い花、ハーブに、蜂蜜香やナッツのニュアンス。酸とミネラルが輪郭を保ちます。',
      vinification: '自然酵母発酵。ステンレスタンクと使用済み木樽を併用し、落ち着いた質感に仕上げています。',
      soil: 'プファルツの温暖な気候と日照条件が、果実の熟度とやわらかな口当たりを支えています。',
      serving: '提供温度：8–10℃ おすすめ：刺身、寿司、白身魚、天ぷら、魚介',
    }),
  },
  {
    wineryId: 'buerklinwolf',
    name: '2018 Villa Bürklin Weißwein trocken',
    source: createManualDocWine({
      name: '2018 Villa Bürklin Weißwein trocken',
      type: 'white',
      summary:
        '柑橘、青りんご、白い花、ハーブに、熟成由来の落ち着きを重ねた辛口白。魚介や和食前菜と合わせやすい一本です。',
      analysis: 'Alc：12.0% vol 残糖（RS）：4.1 g/L 総酸（A）：8.1 g/L 内容量：0.75L',
      tasting:
        '柑橘、青りんご、白い花、ハーブに、蜂蜜香とナッツのニュアンス。果実味と酸のバランスが整っています。',
      vinification: '自然酵母発酵。ステンレスタンクと使用済み木樽を併用し、穏やかな奥行きを持たせています。',
      soil: 'プファルツの温暖な気候と日照条件が、果実の熟度とやわらかな口当たりを支えています。',
      serving: '提供温度：8–10℃ おすすめ：刺身、寿司、白身魚、天ぷら、魚介',
    }),
  },
  {
    wineryId: 'buerklinwolf',
    name: '2018 Villa Bürklin Rotwein trocken',
    source: createManualDocWine({
      name: '2018 Villa Bürklin Rotwein trocken',
      type: 'red',
      summary:
        '赤系果実、ラズベリー、チェリー、紅茶、穏やかなスパイス感を備えた食中向きの赤です。軽い肉料理から鶏肉、きのこ料理まで提案しやすい一本です。',
      analysis: 'Alc：12.5% vol 残糖（RS）：2.8 g/L 総酸（A）：5.6 g/L 内容量：0.75L',
      tasting:
        '赤果実、チェリー、紅茶、やわらかなスパイスのニュアンスが重なり、後半は穏やかにドライへ収束します。',
      vinification: 'ステンレスタンク発酵。一部大樽を併用し、果実味と落ち着いた輪郭のバランスを整えています。',
      soil: 'プファルツの温暖な気候と日照条件が、果実の熟度とやわらかな口当たりを支えています。',
      serving: '提供温度：15–17℃ おすすめ：鴨、地鶏、きのこ、鮪の炙り、豚肉',
    }),
  },
  {
    wineryId: 'buerklinwolf',
    name: '2017 Villa Bürklin Rotwein trocken',
    source: createManualDocWine({
      name: '2017 Villa Bürklin Rotwein trocken',
      type: 'red',
      summary:
        '赤系果実、ラズベリー、チェリー、紅茶、スパイスを穏やかに重ねた食中向きの赤です。',
      analysis: 'Alc：12.5% vol 残糖（RS）：2.8 g/L 総酸（A）：5.6 g/L 内容量：0.75L',
      tasting:
        '赤果実と紅茶、穏やかなスパイスのニュアンスがあり、後半はドライに整います。',
      vinification: 'ステンレスタンク発酵。一部大樽を使い、果実味と落ち着いた輪郭を両立させています。',
      soil: 'プファルツの温暖な気候と日照条件が、果実の熟度とやわらかな口当たりを支えています。',
      serving: '提供温度：15–17℃ おすすめ：鴨、地鶏、きのこ、鮪の炙り、豚肉',
    }),
  },
  {
    wineryId: 'dautel',
    name: '2015 Spätburgunder trocken',
    source: createManualDocWine({
      name: '2015 Spätburgunder trocken',
      type: 'red',
      summary:
        '赤系果実とやわらかなタンニンを持つ辛口シュペートブルグンダー。2015年らしい落ち着きがあり、鴨、地鶏、豚肉、きのこ料理に合わせやすい一本です。',
      analysis: 'Alc：13.0% vol 残糖（RS）：1.5 g/L 総酸（A）：5.2 g/L 内容量：0.75L',
      tasting:
        'ラズベリー、赤いチェリー、すみれ、軽いスパイスのニュアンス。やわらかな果実と穏やかなタンニンが広がります。',
      vinification: '木樽熟成で果実味とやわらかなタンニンを整えています。',
      soil: 'ヴュルテンベルクの温暖な気候が、果実の熟度と落ち着いた質感を支えています。',
      serving: '提供温度：14–16℃ おすすめ：鴨、地鶏、豚肩ロース、仔牛、きのこ',
    }),
  },
  {
    wineryId: 'dautel',
    name: '2016 Spätburgunder trocken',
    source: createManualDocWine({
      name: '2016 Spätburgunder trocken',
      type: 'red',
      summary:
        '赤系果実、ラズベリー、チェリー、紅茶、スパイス、穏やかな樽香を備えた食中向きのシュペートブルグンダーです。',
      analysis: 'Alc：13.0% vol 残糖（RS）：2.2 g/L 総酸（A）：5.5 g/L 内容量：0.75L',
      tasting:
        '赤果実に紅茶やスパイスが重なり、余韻はエレガントにまとまります。',
      vinification: 'ステンレスタンクと木樽を併用し、バランスよく熟成させています。',
      soil: 'ヴュルテンベルクの温暖な気候が、果実の熟度としなやかな口当たりを支えています。',
      serving: '提供温度：15–16℃ おすすめ：鴨、地鶏、きのこ、鮪の炙り、豚肉',
    }),
  },
  { wineryId: 'dautel', name: '2022 Spätburgunder trocken', sourceName: '2022 Spätburgundertrocken' },
  {
    wineryId: 'dautel',
    name: '2018 Chardonnay -S- trocken',
    source: createManualDocWine({
      name: '2018 Chardonnay -S- trocken',
      type: 'white',
      summary:
        '果実の厚みと落ち着いた樽のニュアンスを備えた辛口シャルドネ。魚介から白身肉までつなげやすい一本です。',
      analysis: 'Alc：12.5% vol 残糖（RS）：1.2 g/L 総酸（A）：— 内容量：0.75L',
      tasting:
        '黄系果実、洋梨、穏やかな樽香、ナッツ、ハーブのニュアンス。後半はすっきりと整います。',
      vinification: '木樽発酵・熟成で、果実味と質感のバランスを整えています。',
      soil: 'ヴュルテンベルクの温暖な気候と日照条件が、果実の熟度と厚みを支えています。',
      serving: '提供温度：10–12℃ おすすめ：帆立、白身魚、鶏肉、軽いバターソース',
    }),
  },
  {
    wineryId: 'dautel',
    name: '2022 Trollinger',
    source: createManualDocWine({
      name: '2022 Trollinger',
      type: 'red',
      summary:
        '赤系果実、ラズベリー、チェリーを軽やかにまとめた、食中で扱いやすい辛口赤です。',
      analysis: 'Alc：12.0% vol 残糖（RS）：2.7 g/L 総酸（A）：5.0 g/L 内容量：0.75L',
      tasting:
        '赤系果実と軽いスパイスのニュアンス。やわらかなタンニンで、後味はすっきりと整います。',
      vinification: '果皮とともに発酵し、フレッシュな果実味を活かしています。',
      soil: 'ヴュルテンベルクの温暖な気候が、明るい果実味と軽やかな飲み心地を支えています。',
      serving: '提供温度：12–14℃ おすすめ：豚肉、きのこ、味噌や醤油を使う料理',
    }),
  },
  {
    wineryId: 'stodden',
    name: '2016 Alte Reben Spätburgunder',
    source: createManualDocWine({
      name: '2016 Alte Reben Spätburgunder',
      type: 'red',
      summary:
        'Ahr・Rech の古木 Spätburgunder から生まれる、赤いベリー系と紅茶、ブラックティー、スレート由来のスパイス感を備えた上質な赤です。鴨、仔牛、きのこを使った料理に合わせやすい一本です。',
      analysis: 'Alc：— 残糖（RS）：— 総酸（A）：— 内容量：0.75L',
      tasting:
        'ラズベリー、サワーチェリー、紅茶、ハーブ、バニラ、モカのニュアンスが重なり、繊細なタンニンと引き締まった余韻が続きます。',
      vinification:
        '開放式発酵槽を使い、果皮とともに発酵。バリック熟成により、果実味と構成のバランスを整えています。',
      soil:
        'Ahr の冷涼な気候と急斜面、スレート主体の土壌が、赤果実の純度と引き締まったミネラル感を支えています。',
      serving: '提供温度：15–17℃ おすすめ：鴨、仔牛、地鶏、きのこ、グリル料理',
    }),
  },
  { wineryId: 'stodden', name: '2022 Spätburgunder trocken', sourceName: '2022 Spätburgundertrocken' },
  { wineryId: 'ludwig', name: '2022 Riesling dry Guts', sourceName: '2022 Rieslingdry' },
  { wineryId: 'ludwig', name: '2020 Thörnicher Riesling trocken', sourceName: '2020 Thörnicher Riesling dry（trocken）' },
];

const manualWineAdditions: WineListItem[] = manualWineAdditionsConfig.map((item, index) => {
  const wine = item.source ?? (item.sourceName ? getDocWineOrThrow(item.wineryId, item.sourceName).wine : null);
  if (!wine) {
    throw new Error(`[wineList] Missing manual wine source for ${item.wineryId}: ${item.name}`);
  }

  return createWineListItemFromDoc(
    item.wineryId,
    wineryNames[item.wineryId],
    item.name,
    wine,
    `${item.wineryId}-manual-${index + 1}`
  );
});

export const wineList: WineListItem[] = [...generatedWineList, ...manualWineAdditions];

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
