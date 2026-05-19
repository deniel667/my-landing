type ShowcaseField = {
  label: string;
  value: string;
};

export type WineShowcaseOverride = {
  wineryName?: string;
  displayTitle?: string;
  vintage?: string;
  regionVillage?: string;
  typeLabel?: string;
  grapeLabel?: string;
  typeGrapeLine?: string;
  shortLine?: string;
  about?: string;
  tasteTags?: string[];
  recommend?: string;
  proposal?: string;
  basicInfo?: ShowcaseField[];
};

export function makeWinePdfOverrideKey(wineryId: string, name: string) {
  return `${wineryId}::${name
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^\p{L}\p{N}]+/gu, '')}`;
}

function tags(value: string) {
  return value
    .split(/[、,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function info(fields: Array<[string, string | undefined]>) {
  return fields
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => ({ label, value: value as string }));
}

function buildCard(options: {
  wineryName: string;
  displayTitle: string;
  vintage: string;
  regionVillage: string;
  typeGrapeLine: string;
  shortLine: string;
  about: string;
  tasteTags: string[];
  recommend: string;
  proposal: string;
  basicInfo: ShowcaseField[];
}): WineShowcaseOverride {
  return options;
}

const ludwigRiesling2022 = buildCard({
  wineryName: 'Weingut Ludwig',
  displayTitle: '2022 Riesling trocken',
  vintage: '2022',
  regionVillage: 'Mosel / Thörnich',
  typeGrapeLine: '白・辛口 / Riesling',
  shortLine: 'モーゼル辛口の入口でありながら、飲むと少し肩の力が抜けるリースリング。',
  about:
    'Weingut Ludwigが手がける、2022年のRiesling trocken。モーゼルらしい柑橘、りんご、白い花、きれいな酸を持ちながら、硬くなりすぎずやわらかく開いていく印象があります。',
  tasteTags: tags('柑橘、青りんご、黄系果実、白い花、ハーブ、軽いミネラル'),
  recommend: '魚介、出汁、塩味を使う料理、白身魚、帆立、海老、天ぷらの導入に。',
  proposal:
    'ステンレスタンクで透明感を保ちながら、果実味、酸、ミネラルをすっきり整えた、Ludwigの入口として紹介しやすい一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Ludwig'],
    ['地域', 'Mosel / Thörnich'],
    ['品種', 'Riesling'],
    ['ヴィンテージ', '2022'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '12.0% vol.'],
    ['クラス', 'VDP .Gutswein'],
    ['土壌', '旧河床由来の氷河性砂利堆積'],
    ['評価', 'wein.plus 86 WP'],
    ['技術', 'ステンレスタンク発酵 / 熟成'],
    ['適温', '8〜12℃'],
  ]),
});

const ludwigThornichBase = {
  wineryName: 'Weingut Ludwig',
  regionVillage: 'Mosel / Thörnich',
  typeGrapeLine: '白・辛口 / Riesling',
  shortLine: '香りはふわりと上がり、余韻はスレートで締まる村名リースリング。',
  about:
    'Weingut Ludwigが手がける、Thörnicher Riesling trocken。Thörnich村の個性を表す村名クラスの辛口リースリングで、急斜面の日照とデボン紀スレート由来のミネラルが細い酸と塩味の輪郭を与えます。',
  tasteTags: tags('柑橘、白桃、青りんご、黄系果実、白い花、ハーブ'),
  recommend: '刺身、寿司、白身魚、帆立、天ぷら、柑橘を添えた魚介に。',
  proposal:
    'Thörnicher Ritsch周辺のスレートの緊張感を、ステンレスタンクで透明感を保ちながらやわらかく整えた、食中向きのモーゼル白です。',
} as const;

const ludwigSauvignon2023 = buildCard({
  wineryName: 'Weingut Ludwig',
  displayTitle: '2023 Sauvignon Blanc trocken',
  vintage: '2023',
  regionVillage: 'Mosel / Thörnich',
  typeGrapeLine: '白・辛口 / Sauvignon Blanc',
  shortLine: '香りは明るく、後味はきれい。モーゼルらしい抜け感を持つソーヴィニヨンです。',
  about:
    'Weingut Ludwigが手がける、2023年のSauvignon Blanc trocken。砂利質土壌を背景に、柑橘、青りんご、ハーブの明るさを持ちながら、重くなりすぎない軽快な辛口白に仕上がっています。',
  tasteTags: tags('柑橘、青りんご、白い花、ハーブ、ミネラル、透明感'),
  recommend: '魚介、野菜、蒸し鶏、ハーブや柑橘を使う前菜に。',
  proposal:
    '砂利質土壌由来の抜けの良さを活かし、香りの明るさと後味の軽さで料理へつなげやすい一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Ludwig'],
    ['地域', 'Mosel / Thörnich'],
    ['品種', 'Sauvignon Blanc'],
    ['ヴィンテージ', '2023'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '12.0% vol.'],
    ['クラス', 'Qualitätswein'],
    ['土壌', 'Kiesboden（砂利質土壌）'],
    ['畑', 'Thörnicher Ritsch周辺'],
    ['技術', 'ステンレスタンク発酵 / 熟成'],
    ['適温', '8〜10℃'],
  ]),
});

const ludwigSektNv = buildCard({
  wineryName: 'Weingut Ludwig',
  displayTitle: 'NV Riesling Sekt Brut',
  vintage: 'NV',
  regionVillage: 'Mosel / Thörnich',
  typeGrapeLine: 'スパークリング / Riesling',
  shortLine: '細やかな泡とリースリングの酸で、乾杯から前菜へ自然につなげる一本です。',
  about:
    'Weingut Ludwigが手がける、Riesling Sekt brut。瓶内二次発酵と12か月以上の澱熟成により、柑橘、白い花、ミネラル、きめ細かな泡を備えたモーゼルの食中スパークリングです。',
  tasteTags: tags('きめ細かな泡、柑橘、白い花、ミネラル、爽やかな酸、食前酒'),
  recommend: '乾杯、前菜、魚介の軽い一皿、天ぷらや塩で仕上げる料理に。',
  proposal:
    'スレート由来の酸とミネラルを、瓶内二次発酵の落ち着いた質感で整えた、グラスでもコースでも使いやすい一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Ludwig'],
    ['地域', 'Mosel / Thörnich'],
    ['品種', 'Riesling'],
    ['ヴィンテージ', 'NV'],
    ['タイプ', 'スパークリング / Brut'],
    ['アルコール', '12.5% vol.'],
    ['クラス', 'Sekt'],
    ['土壌', 'スレート土壌'],
    ['畑', 'Thörnicher Ritsch周辺'],
    ['評価', 'wein.plus 85 WP'],
    ['技術', '瓶内二次発酵 / 12か月以上澱熟成'],
    ['適温', '7〜10℃'],
  ]),
});

const horstJustSilvaner2022 = buildCard({
  wineryName: 'Weingut Horst Sauer',
  displayTitle: '2022 JUST Silvaner trocken',
  vintage: '2022',
  regionVillage: 'Franken / Escherndorf',
  typeGrapeLine: '白・辛口 / Silvaner',
  shortLine: 'シルヴァーナーの塩味を、軽く素直な明快さにした辛口白。',
  about:
    'Weingut Horst Sauerが手がける、2022年のJUST Silvaner trocken。Escherndorf周辺のMuschelkalkを背景に、シルヴァーナーの食中性を分かりやすく端正に表現した辛口白です。',
  tasteTags: tags('柑橘、黄系果実、ハーブ、ミネラル、塩味、食中向き'),
  recommend: '筍、山菜、白身魚の塩焼き、野菜の天ぷら、出汁を使う料理に。',
  proposal:
    '入口のレンジでありながら、Sauerらしい精度と輪郭を感じさせる、前菜から魚料理までつなげやすい一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Horst Sauer'],
    ['地域', 'Franken / Escherndorf'],
    ['品種', 'Silvaner'],
    ['ヴィンテージ', '2022'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '12.0% vol.'],
    ['クラス', 'VDP .Gutswein'],
    ['土壌', '貝殻石灰岩'],
    ['畑', 'Escherndorf周辺'],
    ['技術', 'ステンレスタンク発酵'],
    ['適温', '8〜10℃'],
  ]),
});

const horstJustSeccoRose2018 = buildCard({
  wineryName: 'Weingut Horst Sauer',
  displayTitle: '2018 JUST Secco Rosé',
  vintage: '2018',
  regionVillage: 'Franken / Escherndorf',
  typeGrapeLine: 'ロゼ・発泡・やや辛口 / Schwarzriesling・Spätburgunder',
  shortLine: '軽いのに雑ではない、会話を上手に始めてくれるロゼ泡。',
  about:
    'Weingut Horst Sauerが手がける、2018年のJUST Secco Rosé。SchwarzrieslingとSpätburgunderをもとにしたロゼ・ゼッコで、feinherbのやわらかさと軽やかな泡が乾杯から前菜まで自然につながります。',
  tasteTags: tags('赤すぐり、ラズベリー、柑橘、白い花、ほのかな蜂蜜、軽やかな泡'),
  recommend: '牡蠣、天ぷら、焼き鳥の塩、魚介の前菜、前菜盛り合わせに。',
  proposal:
    '短時間のスキンコンタクトと低温発酵で、明るさの中にも品のあるバランスを整えた、場の立ち上がりに使いやすい一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Horst Sauer'],
    ['地域', 'Franken / Escherndorf'],
    ['品種', 'Schwarzriesling / Spätburgunder'],
    ['ヴィンテージ', '2018'],
    ['タイプ', 'ロゼ・発泡・feinherb（やや辛口）'],
    ['アルコール', '11.5% vol.'],
    ['クラス', 'Deutscher Perlwein / Secco'],
    ['土壌', 'Muschelkalk中心、Lösslehm、Lettenkeuper'],
    ['技術', '短時間果皮接触・低温発酵 / ステンレスタンク中心'],
    ['適温', '6〜8℃'],
  ]),
});

const horstEscherndorferSilvaner2022 = buildCard({
  wineryName: 'Weingut Horst Sauer',
  displayTitle: '2022 Escherndorfer Silvaner trocken',
  vintage: '2022',
  regionVillage: 'Franken / Escherndorf',
  typeGrapeLine: '白・辛口 / Silvaner',
  shortLine: '果実で押さず、骨格と塩味で料理に入るエッシャーンドルフのシルヴァーナー。',
  about:
    'Weingut Horst Sauerが手がける、2022年のEscherndorfer Silvaner trocken。VDP .ORTSWEINとして、Muschelkalk由来の乾いたミネラル感、塩味、引き締まった骨格を村名ワインの深さで表現しています。',
  tasteTags: tags('柑橘、白桃、ハーブ、白い花、ミネラル、塩味'),
  recommend: '筍、山菜、白身魚の塩焼き、野菜の天ぷら、出汁を使う料理に。',
  proposal:
    'ステンレスタンク主体に一部木樽を重ね、透明感と奥行きを両立した、骨格で料理に入るシルヴァーナーです。',
  basicInfo: info([
    ['生産者', 'Weingut Horst Sauer'],
    ['地域', 'Franken / Escherndorf'],
    ['品種', 'Silvaner'],
    ['ヴィンテージ', '2022'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '12.0% vol.'],
    ['クラス', 'VDP .ORTSWEIN'],
    ['土壌', '貝殻石灰岩'],
    ['畑', 'Escherndorf周辺'],
    ['評価', 'Falstaff 89点'],
    ['技術', 'ステンレスタンク発酵 / 熟成'],
    ['適温', '8〜10℃'],
  ]),
});

const horstMullerThurgau2017 = buildCard({
  wineryName: 'Weingut Horst Sauer',
  displayTitle: '2017 Escherndorfer Fürstenberg Müller-Thurgau trocken',
  vintage: '2017',
  regionVillage: 'Franken / Escherndorf / Fürstenberg',
  typeGrapeLine: '白・辛口 / Müller-Thurgau',
  shortLine: '軽いけれど、ぼやけない。石灰が支えるミュラー・トゥルガウ。',
  about:
    'Weingut Horst Sauerが手がける、2017年のEscherndorfer Fürstenberg Müller-Thurgau trocken。FürstenbergのMuschelkalkが、やわらかな果実味に細いミネラル感と透明な輪郭を与える辛口白です。',
  tasteTags: tags('青りんご、洋梨、白い花、ハーブ、ミネラル、穏やかな酸'),
  recommend: '魚介、野菜、鶏肉、出汁を使う料理、塩で仕上げる前菜に。',
  proposal:
    '低温発酵で繊細な香りと透明感を保ち、軽いけれど安っぽくない白として提案しやすい一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Horst Sauer'],
    ['地域', 'Franken / Escherndorf / Fürstenberg'],
    ['品種', 'Müller-Thurgau'],
    ['ヴィンテージ', '2017'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '12.0% vol.'],
    ['クラス', 'VDP .ORTSWEIN'],
    ['土壌', '貝殻石灰岩'],
    ['畑', 'Escherndorfer Fürstenberg'],
    ['技術', 'ステンレスタンク低温発酵'],
    ['適温', '8〜10℃'],
  ]),
});

const horstBacchus2017 = buildCard({
  wineryName: 'Weingut Horst Sauer',
  displayTitle: '2017 Escherndorfer Bacchus Spätlese',
  vintage: '2017',
  regionVillage: 'Franken / Escherndorf',
  typeGrapeLine: '白・Spätlese / Bacchus',
  shortLine: '甘いではなく、香りが広がり、酸で支える白です。',
  about:
    'Weingut Horst Sauerが手がける、2017年のEscherndorfer Bacchus Spätlese。Bacchusらしい白桃、洋梨、柑橘の華やかさとやさしい甘みを持ちながら、酸とミネラルで重たくならない香り高い白です。',
  tasteTags: tags('白桃、洋梨、柑橘、ハーブ、やさしい甘み、ミネラル'),
  recommend: '魚介、野菜、蒸し鶏、軽い和食、やさしい甘みを持つソースの料理に。',
  proposal:
    '天然酵母発酵と澱熟成により、甘みを砂糖感でなく香りの広がりとやわらかな余韻へ整えた一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Horst Sauer'],
    ['地域', 'Franken / Escherndorf'],
    ['品種', 'Bacchus'],
    ['ヴィンテージ', '2017'],
    ['タイプ', '白 / Spätlese（やや甘口〜甘口）'],
    ['アルコール', '12.0% vol.'],
    ['クラス', 'VDP .Ortswein / Spätlese'],
    ['土壌', 'Muschelkalk、Lettenkeuperを含む区画'],
    ['畑', 'Escherndorfer Fürstenberg / Lump周辺区画'],
    ['技術', 'ステンレスタンク低温発酵'],
    ['適温', '10〜12℃'],
  ]),
});

const horstDomina2016 = buildCard({
  wineryName: 'Weingut Horst Sauer',
  displayTitle: '2016 Escherndorfer Domina trocken',
  vintage: '2016',
  regionVillage: 'Franken / Escherndorf',
  typeGrapeLine: '赤・辛口 / Domina',
  shortLine: '黒果実はありますが、料理に寄り添う節度のある赤です。',
  about:
    'Weingut Horst Sauerが手がける、2016年のEscherndorfer Domina trocken。黒系果実、プラム、チェリー、紅茶、スパイスを持ちながら、重さで押さず酸とミネラル、穏やかな熟成感で食中に寄り添うフランケン赤です。',
  tasteTags: tags('ブラックチェリー、プラム、黒系果実、紅茶、スパイス、やわらかなタンニン'),
  recommend: '肉料理、きのこ、醤油や味噌を使う料理、鴨や豚肉の主菜に。',
  proposal:
    'ステンレスタンクと一部木樽で発酵させ、大樽主体で熟成することで、重すぎない旨味対応力のある赤に整えています。',
  basicInfo: info([
    ['生産者', 'Weingut Horst Sauer'],
    ['地域', 'Franken / Escherndorf'],
    ['品種', 'Domina'],
    ['ヴィンテージ', '2016'],
    ['タイプ', '赤 / 辛口'],
    ['アルコール', '13.0% vol.'],
    ['クラス', 'VDP .Gutswein'],
    ['土壌', 'Muschelkalk中心、Löss / Keuperを含む土壌'],
    ['畑', 'Escherndorf周辺'],
    ['技術', 'ステンレスタンク低温発酵'],
    ['適温', '15〜17℃'],
  ]),
});

const burklinVillaWeissBase = {
  wineryName: 'Weingut Dr. Bürklin-Wolf',
  regionVillage: 'Pfalz',
  typeGrapeLine: '白・辛口 / Riesling・Sauvignon Blanc・Scheurebe',
  shortLine: '雅びな香り、明るい入口、奥にビュルクリンの秩序があります。',
  about:
    'Weingut Dr. Bürklin-Wolfが手がける、Villa Bürklin Weißwein trocken。Riesling、Sauvignon Blanc、Scheurebeを組み合わせた、プファルツの辛口白キュヴェです。',
  tasteTags: tags('柑橘、青りんご、白い花、ハーブ、ほのかな蜂蜜香、ナッツ'),
  recommend: '刺身、寿司、白身魚、天ぷら、魚介の前菜、柑橘を使う料理に。',
  proposal:
    '複数品種と複数土壌の組み合わせで、明るさの奥にBürklin-Wolfらしい透明感と秩序を感じられる入口の一本です。',
} as const;

const burklinVillaRotBase = {
  wineryName: 'Weingut Dr. Bürklin-Wolf',
  regionVillage: 'Pfalz',
  typeGrapeLine: '赤・辛口 / Spätburgunder',
  shortLine: '様々なシチュエーション、ペアリングに。対応力高いビオディナミの赤です。',
  about:
    'Weingut Dr. Bürklin-Wolfが手がける、Villa Bürklin Cuvée Rot。Spätburgunder主体で、赤系果実、紅茶、スパイスを穏やかなタンニンと酸でまとめた、食中向きの辛口赤です。',
  tasteTags: tags('ラズベリー、チェリー、赤系果実、紅茶、スパイス、穏やかな樽香'),
  recommend: '鴨、地鶏、きのこ、鮪の炙り、醤油や軽い赤ワインソースの料理に。',
  proposal:
    'ステンレスタンク発酵と一部大樽熟成で、果実とタンニンを過度に主張させず、Bürklin-Wolfの食中性を伝えやすい赤に整えています。',
} as const;

const burklinRieslingBase = {
  wineryName: 'Weingut Dr. Bürklin-Wolf',
  regionVillage: 'Pfalz / Mittelhaardt',
  typeGrapeLine: '白・辛口 / Riesling',
  shortLine:
    'ただの入口ではなく、4つの村（Forst / Deidesheim / Ruppertsberg / Wachenheim）の地層モザイク。',
  about:
    'Weingut Dr. Bürklin-Wolfが手がける、Riesling trocken。Mittelhaardtの複数村の個性を、Bürklin-Wolfらしい秩序でまとめたVDP .Gutsweinの辛口リースリングです。',
  tasteTags: tags('柑橘、青りんご、白桃、白い花、ハーブ、ミネラル'),
  recommend: '刺身、寿司、白身魚、天ぷら、柑橘を添えた魚介に。',
  proposal:
    'Wachenheim、Ruppertsberg、Deidesheim、Forstの要素を組み合わせ、上質なドイツ辛口リースリングの基準として提案しやすい一本です。',
} as const;

const burklinFass68 = buildCard({
  wineryName: 'Weingut Dr. Bürklin-Wolf',
  displayTitle: '2017 Ruppertsberger Riesling FASS 68',
  vintage: '2017',
  regionVillage: 'Pfalz / Ruppertsberg',
  typeGrapeLine: '白・辛口 / Riesling',
  shortLine: '世界で1樽の物語を持つ、熟成で開くビュルクリンの辛口です。',
  about:
    'Weingut Dr. Bürklin-Wolfが手がける、2017年のFASS 68 Ruppertsberger Riesling。日本 / FINDEST向けに特別注文された、約3,000本のみの限定キュヴェです。',
  tasteTags: tags('柑橘、黄系果実、白い花、熟成由来の蜂蜜香、ミネラル、果実の丸み'),
  recommend: '刺身、寿司、白身魚、天ぷら、帆立、海老、軽いソース料理に。',
  proposal:
    'GeisböhlとP.C. Hoheburgの要素を背景に、ステンレスの透明感と大樽の丸みを重ね、今飲む理由を説明しやすい熟成辛口へ開いています。',
  basicInfo: info([
    ['生産者', 'Weingut Dr. Bürklin-Wolf'],
    ['地域', 'Pfalz / Ruppertsberg'],
    ['品種', 'Riesling'],
    ['ヴィンテージ', '2017'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '12.0% vol.'],
    ['クラス', '特級畑・一級畑由来の限定キュヴェ'],
    ['土壌', 'ローム層'],
    ['畑', 'Ruppertsberg内のGeisböhl畑およびP.C. Hoheburg畑'],
    ['技術', 'ステンレスタンク50% / 2400Lオーク樽50%'],
    ['適温', '8〜10℃'],
  ]),
});

const hammFeinherb2017 = buildCard({
  wineryName: 'Weingut Hamm',
  displayTitle: '2017 Rheingau Riesling feinherb',
  vintage: '2017',
  regionVillage: 'Rheingau / Oestrich-Winkel',
  typeGrapeLine: '白・feinherb（やや甘口） / Riesling',
  shortLine: '甘い入口ですが、ラインガウの酸が生きている白です。',
  about:
    'Weingut Hammが手がける、2017年のRheingau Riesling feinherb。やさしい甘みを持ちながら、ラインガウらしい酸とミネラルで食事に合わせやすいリースリングです。',
  tasteTags: tags('柑橘、りんご、白桃、黄系果実、マスカット、塩味'),
  recommend: '刺身、寿司、白身魚、天ぷら、帆立、海老、軽いスパイスを使う前菜に。',
  proposal:
    '複数自社畑の個性をまとめたVDP .Gutsweinとして、やわらかな甘みとラインガウの酸を両立した一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Hamm'],
    ['地域', 'Rheingau / Oestrich-Winkel'],
    ['品種', 'Riesling'],
    ['ヴィンテージ', '2017'],
    ['タイプ', '白 / feinherb（やや甘口）'],
    ['アルコール', '11.5% vol.'],
    ['クラス', 'VDP .Gutswein'],
    ['土壌', '赤色粘板岩、黄土、沖積土'],
    ['畑', 'Hasensprung / Dachsberg / Jesuitengarten / Schönhell'],
    ['技術', 'ステンレスタンク50% / 2400Lオーク樽50%'],
    ['適温', '8〜10℃'],
  ]),
});

const busChardonnay2022 = buildCard({
  wineryName: 'Weingut Bus',
  displayTitle: '2022 Chardonnay trocken',
  vintage: '2022',
  regionVillage: 'Pfalz / Insheim',
  typeGrapeLine: '白・辛口 / Chardonnay',
  shortLine: 'よくあるシャルドネでなく、明るいオレンジ感が料理の幅を広げます。',
  about:
    'Weingut Busが手がける、2022年のChardonnay trocken。温暖なプファルツらしい洋梨、白桃、黄系果実の丸みを持ちながら、樽の重さで押さない辛口白です。',
  tasteTags: tags('柑橘、洋梨、白桃、黄系果実、ナッツ、ミネラル'),
  recommend: '帆立、白身魚、鶏肉のクリーム煮、軽いバターソース、柑橘を添えた前菜に。',
  proposal:
    '日照の多い2022年の熟した果実味を、ステンレスタンクで明るく整え、白身魚から軽い白身肉までつなげやすい一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Bus'],
    ['地域', 'Pfalz / Insheim'],
    ['品種', 'Chardonnay'],
    ['ヴィンテージ', '2022'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '13.0% vol.'],
    ['クラス', 'Qualitätswein'],
    ['土壌', '砂質ローム / レーム・レス'],
    ['技術', 'ステンレスタンク発酵・熟成'],
    ['適温', '9〜11℃'],
  ]),
});

const busMerlotBlanc2023 = buildCard({
  wineryName: 'Weingut Bus',
  displayTitle: '2023 Merlot Blanc de Noir trocken',
  vintage: '2023',
  regionVillage: 'Pfalz / Insheim',
  typeGrapeLine: '白・Blanc de Noir・辛口 / Merlot',
  shortLine: '白ワインの軽さに、メルロ由来の深みが入った一本です。',
  about:
    'Weingut Busが手がける、2023年のMerlot Blanc de Noir trocken。Merlotを白ワインのように仕立て、軽やかさの中に赤ぶどう由来のやわらかな奥行きを残した珍しい辛口白です。',
  tasteTags: tags('柑橘、りんご、洋梨、白桃、ほのかな蜂蜜、ミネラル'),
  recommend: '魚介、野菜、鶏肉、出汁を使う料理、淡い前菜から魚介料理に。',
  proposal:
    '短い果皮接触で色調を抑えつつ、赤ぶどうの深みをやわらかな質感として残した、説明しやすく印象に残る一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Bus'],
    ['地域', 'Pfalz / Insheim'],
    ['品種', 'Merlot'],
    ['ヴィンテージ', '2023'],
    ['タイプ', '白 / Blanc de Noir / 辛口'],
    ['アルコール', '12.5% vol.'],
    ['クラス', 'Qualitätswein'],
    ['土壌', '砂質ロームおよびローム・レス'],
    ['評価', 'AWC Vienna 2024 SILVER'],
    ['技術', '短い果皮接触で白仕立て / フレッシュな果実味を重視'],
    ['適温', '6〜8℃'],
  ]),
});

const busGoldmuskateller2018 = buildCard({
  wineryName: 'Weingut Bus',
  displayTitle: '2018 Goldmuskateller feinherb',
  vintage: '2018',
  regionVillage: 'Pfalz / Insheim',
  typeGrapeLine: '白・feinherb（やや甘口） / Goldmuskateller',
  shortLine: '香りで一瞬にして記憶に残る、Busの武器です。',
  about:
    'Weingut Busが手がける、2018年のGoldmuskateller feinherb。マスカット、白桃、白い花、メロン、金柑を思わせる華やかな香りを、酸で重く見せないやや甘口白です。',
  tasteTags: tags('マスカット、白桃、白い花、メロン、金柑、軽いミネラル'),
  recommend: '食前酒、香りのある前菜、軽いスパイス料理、アジア料理に。',
  proposal:
    '温暖な2018年の豊かなアロマをステンレスタンクで素直に保ち、展示会やワイン会でも記憶に残りやすい一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Bus'],
    ['地域', 'Pfalz / Insheim'],
    ['品種', 'Goldmuskateller'],
    ['ヴィンテージ', '2018'],
    ['タイプ', '白 / feinherb（やや甘口）'],
    ['アルコール', '13.0% vol.'],
    ['クラス', 'Qualitätswein'],
    ['土壌', '石灰質を含むローム'],
    ['評価', 'AWC Vienna Gold'],
    ['技術', 'ステンレスタンク発酵・熟成'],
    ['適温', '8〜10℃'],
  ]),
});

const busMerlot2019 = buildCard({
  wineryName: 'Weingut Bus',
  displayTitle: '2019 Merlot trocken',
  vintage: '2019',
  regionVillage: 'Pfalz / Insheim',
  typeGrapeLine: '赤・辛口 / Merlot',
  shortLine: '丸いメルロに、Busらしい明るい果実のひねりがあります。',
  about:
    'Weingut Busが手がける、2019年のMerlot trocken。プファルツの温暖な果実味と砂質ローム由来のやわらかさを持ち、樽の重さではなく丸みと明るい後味で楽しめる辛口赤です。',
  tasteTags: tags('黒系果実、プラム、チェリー、やわらかな果実味、穏やかなタンニン、明るい後味'),
  recommend: '肉料理、きのこ、醤油や味噌を使う料理、豚肉や鴨の主菜に。',
  proposal:
    '2019年の熟度と酸のバランスを活かし、ステンレスタンクでMerlotの果実味と親しみやすさを素直に見せた一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Bus'],
    ['地域', 'Pfalz / Insheim'],
    ['品種', 'Merlot'],
    ['ヴィンテージ', '2019'],
    ['タイプ', '赤 / 辛口'],
    ['アルコール', '14.0% vol.'],
    ['クラス', 'Qualitätswein'],
    ['土壌', '砂質ロームおよびレスを含む土壌'],
    ['評価', 'Gault&Millau Weinguide 2024 | 1 Traube'],
    ['技術', 'ステンレスタンク発酵・熟成'],
    ['適温', '6〜8℃'],
  ]),
});

const busDornfelderBase = {
  wineryName: 'Weingut Bus',
  regionVillage: 'Pfalz / Insheim',
  typeGrapeLine: '赤・辛口 / Dornfelder',
  shortLine: '濃い色と黒系果実はありながら、重すぎず料理と楽しめるドイツ赤です。',
  about:
    'Weingut Busが手がける、Dornfelder trocken。深い色調と黒系果実を持ちながら、重厚さで押さず、やわらかな果実味とドライな後味で料理に寄り添う辛口赤です。',
  tasteTags: tags('黒系果実、プラム、チェリー、スパイス、赤い花、やわらかな口当たり'),
  recommend: '豚肉、鴨、赤身肉、ハンバーグ、ソーセージ、軽い煮込み料理に。',
  proposal:
    'Pfalzの温暖さとInsheim周辺の砂質ロームが、深い色調と親しみやすい果実味を支え、肉料理に合わせやすい食中赤へ整えています。',
} as const;

const landererKaiserstuhlSpat2023 = buildCard({
  wineryName: 'Weingut Landerer',
  displayTitle: '2023 Kaiserstuhl Spätburgunder trocken',
  vintage: '2023',
  regionVillage: 'Baden / Kaiserstuhl',
  typeGrapeLine: '赤・辛口 / Spätburgunder',
  shortLine: '火山の熱を、重さでなく直線的なエレガンスにしたピノです。',
  about:
    'Weingut Landererが手がける、2023年のKaiserstuhl Spätburgunder trocken。温暖なKaiserstuhlの火山性土壌を背景にしながら、重さではなく赤系果実、酸、ミネラルの線で見せる有機栽培認証の辛口ピノです。',
  tasteTags: tags('赤系果実、ラズベリー、チェリー、スパイス、軽いスモーク、やわらかなタンニン'),
  recommend: '鴨、地鶏、きのこ、鮪の炙り、醤油や軽い赤ワインソースの料理に。',
  proposal:
    '温度管理発酵と大樽熟成で、火山性土壌の温かさを重厚さではなく端正なエレガンスへ変換した一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Landerer'],
    ['地域', 'Baden / Kaiserstuhl'],
    ['品種', 'Spätburgunder（Pinot Noir）'],
    ['ヴィンテージ', '2023'],
    ['タイプ', '赤 / 辛口'],
    ['アルコール', '13.0% vol.'],
    ['クラス', 'Gutswein（Estate）'],
    ['土壌', '火山性土壌を基盤に、石灰質を含む土壌構成'],
    ['畑', 'Kaiserstuhl'],
    ['技術', '温度管理ステンレス発酵 / 大樽で約1年澱熟成'],
    ['適温', '14〜16℃'],
  ]),
});

const landererLeiselheimChardonnay2023 = buildCard({
  wineryName: 'Weingut Landerer',
  displayTitle: '2023 Leiselheim Chardonnay “Schwarze Erde” trocken',
  vintage: '2023',
  regionVillage: 'Baden / Kaiserstuhl',
  typeGrapeLine: '白・辛口 / Chardonnay',
  shortLine: '黒い土の密度を、重さではなくスタイリッシュな質感にした白です。',
  about:
    'Weingut Landererが手がける、2023年のLeiselheim Chardonnay “Schwarze Erde” trocken。火山性土壌と石灰質の要素を背景に、厚み、酸、ミネラルを端正にまとめたLagenweinの辛口シャルドネです。',
  tasteTags: tags('黄系果実、洋梨、白い花、ナッツ、ミネラル、ほのかな樽の質感'),
  recommend: '帆立、白身魚、海老、鶏肉、軽いクリームソースやバターソースに。',
  proposal:
    '黒い火山性土壌の密度を、大樽熟成と澱の質感で現代的に整えた、Landererのセンスが分かりやすい一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Landerer'],
    ['地域', 'Baden / Kaiserstuhl'],
    ['品種', 'Chardonnay'],
    ['ヴィンテージ', '2023'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '12.5% vol.'],
    ['クラス', 'Lagenwein'],
    ['土壌', '火山性土壌と石灰質の要素'],
    ['畑', 'Leiselheim / Schwarze Erde'],
    ['評価', 'Falstaff Chardonnay Trophy DE 2025 | 93+点'],
    ['技術', '丁寧な発酵 / 大樽熟成'],
    ['適温', '10〜12℃'],
  ]),
});

const salweyGrauburgunder2022 = buildCard({
  wineryName: 'Weingut Salwey',
  displayTitle: '2022 Grauburgunder Gutswein trocken',
  vintage: '2022',
  regionVillage: 'Baden / Oberrotweil',
  typeGrapeLine: '白・辛口 / Grauburgunder',
  shortLine: '丸いのにだれない、火山性ピノ・グリの食中白です。',
  about:
    'Weingut Salweyが手がける、2022年のGrauburgunder Gutswein trocken。Oberrotweil周辺の火山性土壌を背景に、Grauburgunderのやわらかな丸みを“Always dry”の設計で食中白へ整えた一本です。',
  tasteTags: tags('洋梨、白桃、黄系果実、白い花、ナッツ、ミネラル'),
  recommend: '鯛、帆立、湯葉、白身魚の酒蒸し、季節野菜、軽い白身肉料理に。',
  proposal:
    '温暖なKaiserstuhlの果実の厚みを、ステンレスタンクと短時間スキンコンタクトで過熟や重さに寄せず辛口へ整えています。',
  basicInfo: info([
    ['生産者', 'Weingut Salwey'],
    ['地域', 'Baden / Oberrotweil'],
    ['品種', 'Grauburgunder（Pinot Gris）'],
    ['ヴィンテージ', '2022'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '13.0% vol.'],
    ['クラス', 'VDP .Gutswein'],
    ['土壌', '火山性土壌'],
    ['技術', 'ステンレスタンク発酵・熟成'],
    ['適温', '9〜11℃'],
  ]),
});

const salweyKaiserstuhlSpat2022 = buildCard({
  wineryName: 'Weingut Salwey',
  displayTitle: '2022 Kaiserstuhl Spätburgunder trocken',
  vintage: '2022',
  regionVillage: 'Baden / Kaiserstuhl',
  typeGrapeLine: '赤・辛口 / Spätburgunder',
  shortLine: 'カイザーシュトゥールの果実を、過熟でなく端正な食中ピノにした一本です。',
  about:
    'Weingut Salweyが手がける、2022年のKaiserstuhl Spätburgunder trocken。火山性土壌と温暖な気候を背景にしながら、果実のふくらみを過熟感へ寄せず、なめらかなタンニンと酸で料理へ入る辛口ピノです。',
  tasteTags: tags('赤系果実、ラズベリー、チェリー、穏やかな樽香、ミネラル、なめらかなタンニン'),
  recommend: '鴨、地鶏、きのこ、鮪の炙り、軽い赤ワインソースや醤油を使う料理に。',
  proposal:
    'ステンレスタンク発酵と生物学的酸発酵で、Salweyらしい辛口の端正さとベルベットのような質感を両立した一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Salwey'],
    ['地域', 'Baden / Kaiserstuhl'],
    ['品種', 'Spätburgunder（Pinot Noir）'],
    ['ヴィンテージ', '2022'],
    ['タイプ', '赤 / 辛口'],
    ['アルコール', '13.0% vol.'],
    ['クラス', 'VDP .Gutswein'],
    ['土壌', '火山性土壌'],
    ['畑', 'Kaiserstuhl内のレス土壌区画'],
    ['評価', 'Falstaff 93点'],
    ['技術', 'ステンレスタンク発酵・熟成 / 生物学的酸発酵'],
    ['適温', '9〜11℃'],
  ]),
});

const salweyOberrotweilRs2016 = buildCard({
  wineryName: 'Weingut Salwey',
  displayTitle: '2016 Oberrotweil Spätburgunder RS',
  vintage: '2016',
  regionVillage: 'Baden / Kaiserstuhl / Oberrotweil',
  typeGrapeLine: '赤・辛口 / Spätburgunder',
  shortLine: '声は大きくないが、静かに強い熟成ピノです。',
  about:
    'Weingut Salweyが手がける、2016年のOberrotweil Spätburgunder RS。通常の村名ワインより一段深いRSのレンジで、火山性土壌の輪郭と熟成による落ち着きを静かな余韻で見せる辛口ピノです。',
  tasteTags: tags('赤系果実、ラズベリー、黒系果実、紅茶、赤い花、スパイス'),
  recommend: '鴨、地鶏、きのこ、鮪の炙り、軽い赤ワインソースや醤油を使う料理に。',
  proposal:
    'バリックと伝統的大樽熟成で、果実、酸、タンニンを穏やかに整え、余韻で格を見せる熟成ピノとして提案しやすい一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Salwey'],
    ['地域', 'Baden / Kaiserstuhl / Oberrotweil'],
    ['品種', 'Spätburgunder（Pinot Noir）'],
    ['ヴィンテージ', '2016'],
    ['タイプ', '赤 / 辛口'],
    ['アルコール', '13.0% vol.'],
    ['クラス', 'VDP .Ortswein / RS'],
    ['土壌', '火山性土壌'],
    ['畑', 'Oberrotweil周辺'],
    ['評価', 'wein.plus 89点'],
    ['技術', '自然酵母発酵 / バリック・伝統的大樽熟成'],
    ['適温', '9〜11℃'],
  ]),
});

const salweyHenkenberg2016 = buildCard({
  wineryName: 'Weingut Salwey',
  displayTitle: '2016 Henkenberg Grauburgunder GG',
  vintage: '2016',
  regionVillage: 'Baden / Kaiserstuhl / Oberrotweil / Henkenberg',
  typeGrapeLine: '白・辛口 / Grauburgunder',
  shortLine: '厚みがあるのに、塩味と酸でだれない上級白です。',
  about:
    'Weingut Salweyが手がける、2016年のHenkenberg Grauburgunder GG。温暖な果実の厚みを持ちながら、粗い火山性土壌由来の塩味、酸、骨格で引き締める上級グラウブルグンダーです。',
  tasteTags: tags('熟した黄系果実、りんご、洋梨、ハーブ、ナッツ、スモーク'),
  recommend: '帆立のバターソテー、甘鯛の松笠焼き、白身魚の西京焼き、鶏肉や仔牛の軽いソース料理に。',
  proposal:
    '大樽発酵・熟成で果実の厚みを保ちながら、樽香を前に出しすぎず、上級白としての旨味と落ち着きを整えたGGです。',
  basicInfo: info([
    ['生産者', 'Weingut Salwey'],
    ['地域', 'Baden / Kaiserstuhl / Oberrotweil / Henkenberg'],
    ['品種', 'Grauburgunder（Pinot Gris）'],
    ['ヴィンテージ', '2016'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '12.5% vol.'],
    ['クラス', 'VDP .GROSSES GEWÄCHS'],
    ['土壌', '粗い火山性土壌'],
    ['畑', 'Oberrotweiler Henkenberg'],
    ['評価', 'Falstaff 92点 / Eichelmann 92点'],
    ['技術', '大樽発酵・大樽熟成'],
    ['適温', '10〜12℃'],
  ]),
});

const salweyEichberg2017 = buildCard({
  wineryName: 'Weingut Salwey',
  displayTitle: '2017 Eichberg Grauburgunder GG',
  vintage: '2017',
  regionVillage: 'Baden / Kaiserstuhl / Oberrotweil / Eichberg',
  typeGrapeLine: '白・辛口 / Grauburgunder',
  shortLine: '厚い白ではなく、火山性の緊張を持つ上級白です。',
  about:
    'Weingut Salweyが手がける、2017年のEichberg Grauburgunder GG。黒い火山灰と暗色の多孔質凝灰岩を含むEichberg由来の、硬質なミネラルと完全なドライ感を備えた上級白です。',
  tasteTags: tags('黄系果実、りんご、洋梨、ハーブ、酵母、スモーキーなミネラル'),
  recommend: '焼き帆立、白身魚の塩焼き、甲殻類の軽いソース、鶏むね肉、きのこの炭火焼きに。',
  proposal:
    '大樽発酵・熟成で果実の厚みを保ちながら、Eichberg由来の硬質なミネラル感と長い余韻を整えたGGです。',
  basicInfo: info([
    ['生産者', 'Weingut Salwey'],
    ['地域', 'Baden / Kaiserstuhl / Oberrotweil / Eichberg'],
    ['品種', 'Grauburgunder（Pinot Gris）'],
    ['ヴィンテージ', '2017'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '13.0% vol.'],
    ['クラス', 'VDP .GROSSES GEWÄCHS'],
    ['土壌', '黒い火山灰、暗色の多孔質凝灰岩を含む火山性土壌'],
    ['畑', 'Oberrotweiler Eichberg'],
    ['評価', 'Falstaff 94点'],
    ['技術', '大樽発酵・大樽熟成'],
    ['適温', '10〜12℃'],
  ]),
});

const dautelLemberger2022 = buildCard({
  wineryName: 'Weingut Dautel',
  displayTitle: '2022 Lemberger',
  vintage: '2022',
  regionVillage: 'Württemberg / Bönnigheim',
  typeGrapeLine: '赤・辛口 / Lemberger',
  shortLine: '地方品種の素朴さではなく、世界基準のレンベルガーです。',
  about:
    'Weingut Dautelが手がける、2022年のLemberger。ヴュルテンベルクを代表する品種を、地元性は残しながら低重心で緻密な食中赤へ磨き上げた一本です。',
  tasteTags: tags('赤系果実、ラズベリー、黒系果実、プラム、チェリー、スパイス'),
  recommend: '牛赤身、ラム、鹿肉、きのこ、味噌や黒酢を使う肉料理に。',
  proposal:
    'Kaltmazerationと古典的な醪発酵で果実の明快さときめ細かなタンニンを引き出し、地元品種を国際的な精度で見せた一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Dautel'],
    ['地域', 'Württemberg / Bönnigheim'],
    ['品種', 'Lemberger'],
    ['ヴィンテージ', '2022'],
    ['タイプ', '赤 / 辛口'],
    ['アルコール', '12.5% vol.'],
    ['クラス', 'VDP .Gutswein'],
    ['土壌', '石膏質キューパー土壌'],
    ['評価', 'Falstaff 92+点'],
    ['技術', 'Kaltmazeration後、2〜3週間発酵 / ステンレスタンク・大樽熟成'],
    ['適温', '14〜16℃'],
  ]),
});

const dautelSpatBase = {
  wineryName: 'Weingut Dautel',
  regionVillage: 'Württemberg / Bönnigheim',
  typeGrapeLine: '赤・辛口 / Spätburgunder',
  shortLine: '土壌の芯はありながら、抽出ではなく品格で見せるピノです。',
  about:
    'Weingut Dautelが手がける、Spätburgunder trocken。Bönnigheim周辺のGipskeuperを背景に、赤系果実、細い酸、軽いスモーク、細かなタンニンで料理に寄り添う辛口ピノです。',
  tasteTags: tags('赤系果実、ラズベリー、チェリー、スパイス、軽いスモーク、細やかなタンニン'),
  recommend: '鴨、地鶏、きのこ、鮪の炙り、醤油や軽い赤ワインソースの料理に。',
  proposal:
    'Dautelらしいフィネスとエレガンスを軸に、石膏質キューパー土壌の骨格を重さではなく端正さへ整えたピノです。',
} as const;

const dautelChardonnayS2018 = buildCard({
  wineryName: 'Weingut Dautel',
  displayTitle: '2018 Chardonnay -S- trocken',
  vintage: '2018',
  regionVillage: 'Württemberg / Bönnigheim',
  typeGrapeLine: '白・辛口 / Chardonnay',
  shortLine: '畑名だけでなく、造り手の構成力で格を上げたシャルドネ。',
  about:
    'Weingut Dautelが手がける、2018年のChardonnay -S- trocken。果実の選抜、木樽発酵、熟成、樽の使い方まで含めて、Dautel独自の精度を感じさせるSelection wineです。',
  tasteTags: tags('黄系果実、洋梨、白桃、ナッツ、火打石、スモーク'),
  recommend: '帆立、白身魚、海老、鶏肉、軽いバターソースやクリームソースに。',
  proposal:
    '樽の強さではなく、密度、酸、ミネラル、質感で見せる上質な辛口白として、魚介から白身肉までつなげやすい一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Dautel'],
    ['地域', 'Württemberg / Bönnigheim'],
    ['品種', 'Chardonnay'],
    ['ヴィンテージ', '2018'],
    ['タイプ', '白 / 辛口'],
    ['アルコール', '12.5% vol.'],
    ['クラス', 'VDP .Gutswein / Selection wine'],
    ['土壌', '石膏質キューパー土壌'],
    ['評価', 'Falstaff 92'],
    ['技術', '木樽発酵 / 熟成'],
    ['適温', '10〜12℃'],
  ]),
});

const dautelTrollinger2022 = buildCard({
  wineryName: 'Weingut Dautel',
  displayTitle: '2022 Trollinger',
  vintage: '2022',
  regionVillage: 'Württemberg / Bönnigheim',
  typeGrapeLine: '赤・辛口 / Trollinger',
  shortLine: '軽いのに薄くない、冷やして使える品のある地元赤です。',
  about:
    'Weingut Dautelが手がける、2022年のTrollinger。地元品種の親しみやすさを残しながら、収量制限と選果で果実の質を高め、軽やかで品のある食中赤へ整えた一本です。',
  tasteTags: tags('赤系果実、ラズベリー、チェリー、軽いスパイス、穏やかなタンニン、軽快な飲み心地'),
  recommend: '鶏肉、豚肉、焼き鳥、ソーセージ、きのこ、醤油だれや味噌を使う軽めの肉料理に。',
  proposal:
    '少し冷やしても使いやすく、前菜後半から軽いメインまで流れを壊さない、Dautelらしい精度のある地元赤です。',
  basicInfo: info([
    ['生産者', 'Weingut Dautel'],
    ['地域', 'Württemberg / Bönnigheim'],
    ['品種', 'Trollinger'],
    ['ヴィンテージ', '2022'],
    ['タイプ', '赤 / 辛口'],
    ['アルコール', '12.5% vol.'],
    ['クラス', 'VDP .Gutswein'],
    ['土壌', '石膏質キューパー土壌'],
    ['技術', '果皮発酵 / 軽やかな赤系果実を引き出す抽出'],
    ['適温', '14〜16℃'],
  ]),
});

const stoddenSpat2022 = buildCard({
  wineryName: 'Weingut Jean Stodden',
  displayTitle: '2022 Spätburgunder',
  vintage: '2022',
  regionVillage: 'Ahr / Rech',
  typeGrapeLine: '赤・辛口 / Spätburgunder',
  shortLine: '赤果実の明るさに、アールの細い線が入るピノです。',
  about:
    'Weingut Jean Stoddenが手がける、2022年のSpätburgunder。Ahr / Rech周辺を背景に、赤系果実の明るさにスレート由来の細い酸とミネラル感が重なる辛口ピノです。',
  tasteTags: tags('赤系果実、ラズベリー、黒系果実、プラム、チェリー、ミネラル'),
  recommend: '鴨、地鶏、きのこ、鮪の炙り、軽い赤ワインソースや醤油を使う料理に。',
  proposal:
    '抽出や樽で力を誇示せず、Ahrの冷涼感とスレートの緊張感を細い線として見せる、Stoddenの入口レンジです。',
  basicInfo: info([
    ['生産者', 'Weingut Jean Stodden'],
    ['地域', 'Ahr / Rech'],
    ['品種', 'Spätburgunder（Pinot Noir）'],
    ['ヴィンテージ', '2022'],
    ['タイプ', '赤 / 辛口'],
    ['アルコール', '13.0% vol.'],
    ['クラス', 'VDP .Gutswein'],
    ['土壌', 'スレート主体'],
    ['技術', '果皮発酵 / バリック熟成'],
    ['適温', '14〜16℃'],
  ]),
});

const stoddenRecher2014 = buildCard({
  wineryName: 'Weingut Jean Stodden',
  displayTitle: '2014 Recher Herrenberg Spätburgunder GG',
  vintage: '2014',
  regionVillage: 'Ahr / Rech',
  typeGrapeLine: '赤・辛口 / Spätburgunder',
  shortLine: '熟成しても線が崩れない、アールの影を持つピノです。',
  about:
    'Weingut Jean Stoddenが手がける、2014年のRecher Herrenberg Spätburgunder GG。Recher Herrenbergの急斜面とスレート風化土壌を背景に、熟成の陰影と引き締まった余韻を備えた上級ピノです。',
  tasteTags: tags('黒系果実、プラム、紅茶、スパイス、スモーク、熟成感'),
  recommend: '鴨、仔牛、地鶏、きのこ、鮪の炙り、旨味のあるソース料理に。',
  proposal:
    '21日間の醪発酵と100%新樽バリック19か月熟成を経て、力強さよりも陰影と緊張感で見せる熟成アール・ピノとして提案できます。',
  basicInfo: info([
    ['生産者', 'Weingut Jean Stodden'],
    ['地域', 'Ahr / Rech'],
    ['品種', 'Spätburgunder（Pinot Noir）'],
    ['ヴィンテージ', '2014'],
    ['タイプ', '赤 / 辛口'],
    ['アルコール', '13.5% vol.'],
    ['クラス', 'VDP .GROSSES GEWÄCHS'],
    ['土壌', 'スレート主体'],
    ['畑', 'Recher Herrenberg'],
    ['評価', 'Falstaff 94点'],
    ['技術', '21日間醪発酵 / 100%新樽バリック19か月熟成'],
    ['適温', '14〜16℃'],
  ]),
});

const stoddenAlteReben2016 = buildCard({
  wineryName: 'Weingut Jean Stodden',
  displayTitle: '2016 Alte Reben Spätburgunder',
  vintage: '2016',
  regionVillage: 'Ahr / Rech',
  typeGrapeLine: '赤・辛口 / Spätburgunder',
  shortLine: '古樹の深さを、重くせず静かな余韻で見せるピノです。',
  about:
    'Weingut Jean Stoddenが手がける、2016年のAlte Reben Spätburgunder。Rech周辺の古樹区画から生まれ、古樹由来の凝縮感と深さを重さではなく静かな余韻として表現した辛口ピノです。',
  tasteTags: tags('サワーチェリー、赤ベリー、紅茶、ハーブ、ヴァニラ、スレートスパイス'),
  recommend: '鴨、地鶏、きのこ、鮪の炙り、軽い赤ワインソースや醤油を使う料理に。',
  proposal:
    '1940年代以前を含む古樹区画の果実をバリック熟成で整え、古樹の深さを静かな余韻として見せる一本です。',
  basicInfo: info([
    ['生産者', 'Weingut Jean Stodden'],
    ['地域', 'Ahr / Rech'],
    ['品種', 'Spätburgunder（Pinot Noir）'],
    ['ヴィンテージ', '2016'],
    ['タイプ', '赤 / 辛口'],
    ['アルコール', '13.0% vol.'],
    ['クラス', 'Alte Reben / 古樹'],
    ['土壌', 'スレート主体'],
    ['畑', 'Rech周辺の古樹区画'],
    ['評価', 'Falstaff 93点'],
    ['技術', '果皮発酵 / バリック熟成'],
    ['適温', '14〜16℃'],
  ]),
});

const ressSchlossberg2006 = buildCard({
  wineryName: 'Balthasar Ress',
  displayTitle: '2006 Rüdesheimer Berg Schlossberg Riesling Auslese',
  vintage: '2006',
  regionVillage: 'Rheingau / Rüdesheim',
  typeGrapeLine: '白・Auslese・甘口 / Riesling',
  shortLine: 'これは甘口というより、ラインガウの時間が熟成した一本です。',
  about:
    'Balthasar Ressが手がける、2006年のRüdesheimer Berg Schlossberg Riesling Auslese。急斜面、スレートや珪岩系土壌、ライン川の反射光を背景に、長い熟成に耐える骨格を備えた熟成リースリングです。',
  tasteTags: tags('熟成した黄系果実、蜂蜜、カリン、ドライフルーツ、ミネラル、長い余韻'),
  recommend: 'ブルーチーズ、フォアグラ、鴨、スパイス料理、甘辛い和食、食後の一杯に。',
  proposal:
    'バックヴィンテージとしてではなく、時間を経て初めて見えてくる香り、酸、甘み、ミネラルの一体感を楽しむ一本として提案できます。',
  basicInfo: info([
    ['生産者', 'Balthasar Ress'],
    ['地域', 'Rheingau / Rüdesheim'],
    ['品種', 'Riesling'],
    ['ヴィンテージ', '2006'],
    ['タイプ', '白 / Auslese / 甘口'],
    ['クラス', 'Auslese'],
    ['土壌', 'スレート / 珪岩系土壌'],
    ['畑', 'Rüdesheimer Berg Schlossberg'],
    ['適温', '8〜10℃'],
  ]),
});

const key = makeWinePdfOverrideKey;

export const winePdfOverrides: Record<string, WineShowcaseOverride> = {
  [key('ludwig', '2022 Riesling dry Guts')]: ludwigRiesling2022,
  [key('ludwig', '2020 Thörnicher Riesling trocken')]: {
    ...ludwigThornichBase,
    displayTitle: '2020 Thörnicher Riesling trocken',
    vintage: '2020',
    basicInfo: info([
      ['生産者', 'Weingut Ludwig'],
      ['地域', 'Mosel / Thörnich'],
      ['品種', 'Riesling'],
      ['ヴィンテージ', '2020'],
      ['タイプ', '白 / 辛口'],
      ['アルコール', '12.0% vol.'],
      ['クラス', 'Qualitätswein'],
      ['土壌', 'デボン紀スレート'],
      ['畑', 'Thörnicher Ritsch周辺'],
      ['技術', 'ステンレスタンク発酵 / 熟成'],
      ['適温', '8〜12℃'],
    ]),
  },
  [key('ludwig', '2024 Thörnicher Riesling trocken')]: {
    ...ludwigThornichBase,
    displayTitle: '2024 Thörnicher Riesling trocken',
    vintage: '2024',
    basicInfo: info([
      ['生産者', 'Weingut Ludwig'],
      ['地域', 'Mosel / Thörnich'],
      ['品種', 'Riesling'],
      ['ヴィンテージ', '2024'],
      ['タイプ', '白 / 辛口'],
      ['アルコール', '12.0% vol.'],
      ['クラス', 'Qualitätswein'],
      ['土壌', 'デボン紀スレート'],
      ['畑', 'Thörnicher Ritsch周辺'],
      ['技術', 'ステンレスタンク発酵 / 熟成'],
      ['適温', '8〜12℃'],
    ]),
  },
  [key('ludwig', '2023 Sauvignon Blanc trocken')]: ludwigSauvignon2023,
  [key('ludwig', 'NV Riesling Sekt Brut')]: ludwigSektNv,
  [key('horst', '2022 Just Silvaner trocken Gutswein')]: horstJustSilvaner2022,
  [key('horst', '2018 JUST Secco Rosé')]: horstJustSeccoRose2018,
  [key('horst', '2022 Escherndorfer Silvaner trocken')]: horstEscherndorferSilvaner2022,
  [key('horst', '2017 Escherndorfer Fürstenberg Müller-Thurgau trocken')]: horstMullerThurgau2017,
  [key('horst', '2017 Escherndorfer Bacchus Spätlese')]: horstBacchus2017,
  [key('horst', '2016 Escherndorfer Domina trocken (BB)')]: horstDomina2016,
  [key('buerklinwolf', '2017 Villa Bürklin Weißwein trocken')]: {
    ...burklinVillaWeissBase,
    displayTitle: '2017 Villa Bürklin Weißwein trocken',
    vintage: '2017',
    basicInfo: info([
      ['生産者', 'Weingut Dr. Bürklin-Wolf'],
      ['地域', 'Pfalz'],
      ['品種', 'Riesling / Sauvignon Blanc / Scheurebe'],
      ['ヴィンテージ', '2017'],
      ['タイプ', '白 / 辛口'],
      ['アルコール', '12.0% vol.'],
      ['クラス', 'VDP .Gutswein'],
      ['土壌', '石灰質土壌 / 砂岩 / ロームを含む多様な土壌'],
      ['評価', 'Weine plus 84点'],
      ['技術', '自然酵母発酵 / ステンレスタンク・使用済み木樽で発酵・熟成'],
      ['適温', '8〜10℃'],
    ]),
  },
  [key('buerklinwolf', '2018 Villa Bürklin Weißwein trocken')]: {
    ...burklinVillaWeissBase,
    displayTitle: '2018 Villa Bürklin Weißwein trocken',
    vintage: '2018',
    basicInfo: info([
      ['生産者', 'Weingut Dr. Bürklin-Wolf'],
      ['地域', 'Pfalz'],
      ['品種', 'Riesling / Sauvignon Blanc / Scheurebe'],
      ['ヴィンテージ', '2018'],
      ['タイプ', '白 / 辛口'],
      ['アルコール', '12.0% vol.'],
      ['クラス', 'VDP .Gutswein'],
      ['土壌', '石灰質土壌 / 砂岩 / ロームを含む多様な土壌'],
      ['評価', 'Weine plus 84点'],
      ['技術', '自然酵母発酵 / ステンレスタンク・使用済み木樽で発酵・熟成'],
      ['適温', '8〜10℃'],
    ]),
  },
  [key('buerklinwolf', '2017 Villa Bürklin Rotwein trocken')]: {
    ...burklinVillaRotBase,
    displayTitle: '2017 Villa Bürklin Cuvée Rot',
    vintage: '2017',
    basicInfo: info([
      ['生産者', 'Weingut Dr. Bürklin-Wolf'],
      ['地域', 'Pfalz'],
      ['品種', 'Spätburgunder'],
      ['ヴィンテージ', '2017'],
      ['タイプ', '赤 / 辛口'],
      ['アルコール', '12.5% vol.'],
      ['クラス', 'VDP .Gutswein'],
      ['土壌', '石灰質主体（ローム混じり）'],
      ['技術', 'ステンレスタンク発酵 / 一部大樽熟成'],
      ['適温', '14〜16℃'],
    ]),
  },
  [key('buerklinwolf', '2018 Villa Bürklin Rotwein trocken')]: {
    ...burklinVillaRotBase,
    displayTitle: '2018 Villa Bürklin Cuvée Rot',
    vintage: '2018',
    basicInfo: info([
      ['生産者', 'Weingut Dr. Bürklin-Wolf'],
      ['地域', 'Pfalz'],
      ['品種', 'Spätburgunder'],
      ['ヴィンテージ', '2018'],
      ['タイプ', '赤 / 辛口'],
      ['アルコール', '12.5% vol.'],
      ['クラス', 'VDP .Gutswein'],
      ['土壌', '石灰質主体（ローム混じり）'],
      ['技術', 'ステンレスタンク発酵 / 一部大樽熟成'],
      ['適温', '14〜16℃'],
    ]),
  },
  [key('buerklinwolf', '2018 Riesling trocken')]: {
    ...burklinRieslingBase,
    displayTitle: '2018 Riesling trocken',
    vintage: '2018',
    basicInfo: info([
      ['生産者', 'Weingut Dr. Bürklin-Wolf'],
      ['地域', 'Pfalz / Mittelhaardt'],
      ['品種', 'Riesling'],
      ['ヴィンテージ', '2018'],
      ['タイプ', '白 / 辛口'],
      ['アルコール', '12.0% vol.'],
      ['クラス', 'VDP .Gutswein'],
      ['土壌', '砂岩を軸に、石灰質・粘土質を含む土壌構成'],
      ['技術', 'ステンレスタンク主体 / 一部大樽古樽併用'],
      ['適温', '8〜10℃'],
    ]),
  },
  [key('buerklinwolf', '2022 Riesling trocken')]: {
    ...burklinRieslingBase,
    displayTitle: '2022 Riesling trocken',
    vintage: '2022',
    basicInfo: info([
      ['生産者', 'Weingut Dr. Bürklin-Wolf'],
      ['地域', 'Pfalz / Mittelhaardt'],
      ['品種', 'Riesling'],
      ['ヴィンテージ', '2022'],
      ['タイプ', '白 / 辛口'],
      ['アルコール', '12.0% vol.'],
      ['クラス', 'VDP .Gutswein'],
      ['土壌', '砂岩を軸に、石灰質・粘土質を含む土壌構成'],
      ['技術', 'ステンレスタンク主体 / 一部大樽古樽併用'],
      ['適温', '8〜10℃'],
    ]),
  },
  [key('buerklinwolf', '2017 FASS 68 Ruppertsberger Riesling')]: burklinFass68,
  [key('hamm', '2017 Rheingau Riesling feinherb')]: hammFeinherb2017,
  [key('bus', '2022 Chardonnay dry')]: busChardonnay2022,
  [key('bus', '2023 Merlot Blanc de Noir trocken')]: busMerlotBlanc2023,
  [key('bus', '2018 Goldmuskateller feinherb Q.B.A.')]: busGoldmuskateller2018,
  [key('bus', '2019 Merlot trocken')]: busMerlot2019,
  [key('bus', '2016 Dornfelder trocken')]: {
    ...busDornfelderBase,
    displayTitle: '2016 Dornfelder trocken',
    vintage: '2016',
    basicInfo: info([
      ['生産者', 'Weingut Bus'],
      ['地域', 'Pfalz / Insheim'],
      ['品種', 'Dornfelder'],
      ['ヴィンテージ', '2016'],
      ['タイプ', '赤 / 辛口'],
      ['アルコール', '13.5% vol.'],
      ['クラス', 'Qualitätswein'],
      ['土壌', '砂質ロームおよびローム・レス'],
      ['技術', 'ステンレスタンク発酵・熟成'],
      ['適温', '14〜16℃'],
    ]),
  },
  [key('bus', '2018 Dornfelder trocken')]: {
    ...busDornfelderBase,
    displayTitle: '2018 Dornfelder trocken',
    vintage: '2018',
    basicInfo: info([
      ['生産者', 'Weingut Bus'],
      ['地域', 'Pfalz / Insheim'],
      ['品種', 'Dornfelder'],
      ['ヴィンテージ', '2018'],
      ['タイプ', '赤 / 辛口'],
      ['アルコール', '13.5% vol.'],
      ['クラス', 'Qualitätswein'],
      ['土壌', '砂質ロームおよびローム・レス'],
      ['技術', 'ステンレスタンク発酵・熟成'],
      ['適温', '14〜16℃'],
    ]),
  },
  [key('landerer', '2023 Kaiserstuhl Spätburgunder trocken')]: landererKaiserstuhlSpat2023,
  [key('landerer', '2023 Leiselheim Chardonnay trocken - Schwarze Erde -')]: landererLeiselheimChardonnay2023,
  [key('salwey', '2022 Grauburgunder Gutswein')]: salweyGrauburgunder2022,
  [key('salwey', '2022 Kaiserstuhl Spätburgunder')]: salweyKaiserstuhlSpat2022,
  [key('salwey', '2016 Oberrotweil Spätburgunder RS')]: salweyOberrotweilRs2016,
  [key('salwey', '2016 Henkenberg Grauburgunder GG')]: salweyHenkenberg2016,
  [key('salwey', '2017 Eichberg Grauburgunder GG')]: salweyEichberg2017,
  [key('dautel', '2022 Lemberger VDP.Gutswein')]: dautelLemberger2022,
  [key('dautel', '2015 Spätburgunder trocken')]: {
    ...dautelSpatBase,
    displayTitle: '2015 Spätburgunder trocken',
    vintage: '2015',
    basicInfo: info([
      ['生産者', 'Weingut Dautel'],
      ['地域', 'Württemberg / Bönnigheim'],
      ['品種', 'Spätburgunder（Pinot Noir）'],
      ['ヴィンテージ', '2015'],
      ['タイプ', '赤 / 辛口'],
      ['アルコール', '12.5% vol.'],
      ['クラス', 'VDP .Gutswein'],
      ['土壌', '石膏質キューパー土壌'],
      ['技術', '果皮発酵 / 使用済み木樽熟成'],
      ['適温', '14〜16℃'],
    ]),
  },
  [key('dautel', '2016 Spätburgunder trocken')]: {
    ...dautelSpatBase,
    displayTitle: '2016 Spätburgunder trocken',
    vintage: '2016',
    basicInfo: info([
      ['生産者', 'Weingut Dautel'],
      ['地域', 'Württemberg / Bönnigheim'],
      ['品種', 'Spätburgunder（Pinot Noir）'],
      ['ヴィンテージ', '2016'],
      ['タイプ', '赤 / 辛口'],
      ['アルコール', '12.5% vol.'],
      ['クラス', 'VDP .Gutswein'],
      ['土壌', '石膏質キューパー土壌'],
      ['技術', '果皮発酵 / 使用済み木樽熟成'],
      ['適温', '14〜16℃'],
    ]),
  },
  [key('dautel', '2022 Spätburgunder trocken')]: {
    ...dautelSpatBase,
    displayTitle: '2022 Spätburgunder trocken',
    vintage: '2022',
    basicInfo: info([
      ['生産者', 'Weingut Dautel'],
      ['地域', 'Württemberg / Bönnigheim'],
      ['品種', 'Spätburgunder（Pinot Noir）'],
      ['ヴィンテージ', '2022'],
      ['タイプ', '赤 / 辛口'],
      ['アルコール', '12.5% vol.'],
      ['クラス', 'VDP .Gutswein'],
      ['土壌', '石膏質キューパー土壌'],
      ['技術', '果皮発酵 / 使用済み木樽熟成'],
      ['適温', '14〜16℃'],
    ]),
  },
  [key('dautel', '2018 Chardonnay -S- trocken')]: dautelChardonnayS2018,
  [key('dautel', '2022 Trollinger')]: dautelTrollinger2022,
  [key('stodden', '2022 Spätburgunder trocken')]: stoddenSpat2022,
  [key('stodden', '2014 Recher Herrenberg Spätburgunder trocken')]: stoddenRecher2014,
  [key('stodden', '2016 Alte Reben Spätburgunder')]: stoddenAlteReben2016,
  [key('ress', '2006 Rüdesheim Berg Schlossberg Riesling Auslese')]: ressSchlossberg2006,
};
