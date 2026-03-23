'use client';

import { docWineData, type DocWine } from '@/data/my-landing/docWineData';
import Image from 'next/image';
import { type WineryDrawerWinery, type WineryWine } from '../winery/WineryDrawer';

type WineryCard = WineryDrawerWinery & {
  style: string;
  count: string;
  blurb1: string;
  blurb2: string;
  rising: string;
  keywords?: string;
  cardTitle?: string;
  cardCaption?: string[];
  photo: string;
  imageClass: string;
  ideelogosUrl?: string;
};

const buildWines = (base: {
  wineryId: string;
  producer: string;
  region: string;
  image: string;
  first: Omit<WineryWine, 'id' | 'producer' | 'region' | 'volume' | 'image'>;
  second: Omit<WineryWine, 'id' | 'producer' | 'region' | 'volume' | 'image'>;
}): WineryWine[] => {
  return [
    {
      id: `${base.wineryId}-01`,
      producer: base.producer,
      region: base.region,
      volume: '0.75L',
      image: base.image,
      ...base.first,
    },
    {
      id: `${base.wineryId}-02`,
      producer: base.producer,
      region: base.region,
      volume: '0.75L',
      image: base.image,
      ...base.second,
    },
  ];
};

const docTypeMap: Record<DocWine['type'], WineryWine['type']> = {
  white: '白',
  red: '赤',
  sparkling: '泡',
};

const metricsByType: Record<WineryWine['type'], WineryWine['metrics']> = {
  白: { dryness: 4, acid: 4, bubbles: 3 },
  赤: { dryness: 4, acid: 3, bubbles: 4 },
  泡: { dryness: 4, acid: 4, bubbles: 5 },
};

function normalizeDocText(value: string): string {
  return value.replace(/[─]{5,}/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeWineName(value: string): string {
  const base = normalizeDocText(value);
  const replacements: Array<[RegExp, string]> = [
    [/CabernetSauvignon/g, 'Cabernet Sauvignon'],
    [/SpätburgunderLangeGoldkapsel/g, 'Spätburgunder Lange Goldkapsel'],
    [/Spätburgundertrocken/g, 'Spätburgunder trocken'],
    [/Dornfeldertrocken/g, 'Dornfelder trocken'],
    [/Rieslingtrocken/g, 'Riesling trocken'],
    [/Silvanertrocken/g, 'Silvaner trocken'],
    [/Chardonnaytrocken/g, 'Chardonnay trocken'],
    [/Rieslingdry/g, 'Riesling dry'],
    [/SauvignonBlanc/g, 'Sauvignon Blanc'],
    [/Sauvignonblanc/g, 'Sauvignon Blanc'],
    [/Blanctrocken/g, 'Blanc trocken'],
    [/blanctrocken/g, 'Blanc trocken'],
    [/BlancdeNoir/g, 'Blanc de Noir'],
    [/Goldmuskatellerfeinherb/g, 'Goldmuskateller feinherb'],
    [/GrauburgunderGutsweintrocken/g, 'Grauburgunder Gutswein trocken'],
    [/WeissburgunderGutsweintrocken/g, 'Weissburgunder Gutswein trocken'],
    [/SilvanerbrutSektb\.A\./g, 'Silvaner brut Sekt b.A.'],
    [/RieslingSektBrut/g, 'Riesling Sekt Brut'],
    [/EscherndorfSilvanertrocken/g, 'Escherndorf Silvaner trocken'],
    [/EscherndorfSilvaner/g, 'Escherndorf Silvaner'],
    [/ThörnicherRiesling/g, 'Thörnicher Riesling'],
    [/ThörnicherRitschRiesling/g, 'Thörnicher Ritsch Riesling'],
    [/WinkelDachsbergRiesling/g, 'Winkel Dachsberg Riesling'],
    [/RheingauRieslingtrocken/g, 'Rheingau Riesling trocken'],
    [/RheingauRieslingfeinherb/g, 'Rheingau Riesling feinherb'],
    [/WinkelRieslingAlteRebenfeinherb/g, 'Winkel Riesling Alte Reben feinherb'],
    [/WinkelDachsbergRieslingtrocken/g, 'Winkel Dachsberg Riesling trocken'],
    [/WinkelRieslingAlteReben/g, 'Winkel Riesling Alte Reben'],
    [/RheingauRiesling/g, 'Rheingau Riesling'],
    [/HattenheimerNussbrunnenRiesling/g, 'Hattenheimer Nussbrunnen Riesling'],
    [/RüdesheimBergRottlandRiesling/g, 'Rüdesheim Berg Rottland Riesling'],
    [/MayschosserMönchbergSpätburgunder/g, 'Mayschosser Mönchberg Spätburgunder'],
    [/RecherHerrenbergSpätburgunder/g, 'Recher Herrenberg Spätburgunder'],
    [/DernauerHardtbergSpätburgunder/g, 'Dernauer Hardtberg Spätburgunder'],
    [/NeuenahrerSonnenbergSpätburgunder/g, 'Neuenahrer Sonnenberg Spätburgunder'],
    [/AhrweilerRosenthalSpätburgunder/g, 'Ahrweiler Rosenthal Spätburgunder'],
    [/BönnigheimChardonnay/g, 'Bönnigheim Chardonnay'],
    [/KaiserstuhlSpätburgunder/g, 'Kaiserstuhl Spätburgunder'],
    [/WachenheimerRiesling/g, 'Wachenheimer Riesling'],
    [/RuppertsbergerRiesling/g, 'Ruppertsberger Riesling'],
    [/ForsterRiesling/g, 'Forster Riesling'],
    [/DeidesheimerRiesling/g, 'Deidesheimer Riesling'],
    [/DeidesheimRiesling/g, 'Deidesheim Riesling'],
    [/Leiselheim Chardonnay trocken -SchwarzeErde-/g, 'Leiselheim Chardonnay trocken - Schwarze Erde -'],
    [/In derHölle/g, 'In der Hölle'],
    [/Sektb\.A\./g, 'Sekt b.A.'],
    [/QbAtrocken/g, 'QbA trocken'],
  ];

  let name = base;
  replacements.forEach(([pattern, next]) => {
    name = name.replace(pattern, next);
  });

  name = name
    .replace(/([A-Za-zÄÖÜäöüß])trocken\b/g, '$1 trocken')
    .replace(/([A-Za-zÄÖÜäöüß])feinherb\b/g, '$1 feinherb')
    .replace(/([A-Za-zÄÖÜäöüß])brut\b/g, '$1 brut')
    .replace(/([a-zäöüß])([A-ZÄÖÜ])/g, '$1 $2')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([）\)])/, '$1')
    .replace(/([（\(])\s+/g, '$1')
    .trim();

  return name;
}

function mapDocWine(card: WineryCard, wine: DocWine, index: number): WineryWine {
  const type = docTypeMap[wine.type];
  const summary = normalizeDocText(wine.summary);
  const tasting = normalizeDocText(wine.tasting);
  const analysis = normalizeDocText(wine.analysis);
  const vinification = normalizeDocText(wine.vinification);
  const soil = normalizeDocText(wine.soil);
  const serving = normalizeDocText(wine.serving);
  const oneLine = summary || tasting || '資料参照';
  const servingText = serving || '資料参照';

  return {
    id: `${card.id}-${String(index + 1).padStart(2, '0')}`,
    name: normalizeWineName(wine.name),
    type,
    subline: `${type}`,
    producer: card.name,
    region: card.region,
    volume: '0.75L',
    image: card.photo,
    quickSpecs: [type, card.region],
    oneLine,
    recommend: servingText,
    pairing: servingText,
    tastingNote: tasting || oneLine,
    analysis: analysis || '資料参照',
    vinification: vinification || '資料参照',
    soil: soil || '資料参照',
    metrics: metricsByType[type],
  };
}

type WineryCardTextBlock =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'quote'; lines: string[] };

type WineryCardText = {
  title: string;
  blocks: WineryCardTextBlock[];
  risingLine: string;
};

const wineryCardTextById: Record<string, WineryCardText> = {
  horst: {
    title: 'Weingut Horst Sauer | Franken',
    blocks: [
      { kind: 'ul', items: ['・Muschelkalk × Structure & Reflection'] },
      { kind: 'p', text: 'ムッシュカルク（貝殻石灰質）由来の骨格と反射' },
    ],
    risingLine: '立ち上がるもの：毅然とした明快さ',
  },
  ludwig: {
    title: 'Weingut Ludwig | Mosel',
    blocks: [
      {
        kind: 'quote',
        lines: [
          '・Soft Devonian Slate × Ethereal Lift',
          '（柔らかいデボン紀のスレート × “ethereal” 幽玄でハーバルな立ち上がり）',
          '輪郭は柔らかく、抜けは高く、心がほどける。',
        ],
      },
    ],
    risingLine: '立ち上がるもの：心がほどける開放感',
  },
  stodden: {
    title: 'Jean Stodden das Rotweingut | Ahr',
    blocks: [
      {
        kind: 'quote',
        lines: ['・Slate × tension & finesse', '（スレート × 張りのある精妙な繊細さ）'],
      },
      { kind: 'p', text: '緊張感と、真っ直ぐに伸びる余韻。' },
    ],
    risingLine: '立ち上がるもの：凛線（りんせん）',
  },
  dautel: {
    title: 'Weingut Dautel | Württemberg',
    blocks: [
      {
        kind: 'ul',
        items: ['• Gipskeuper Keuper × Concentration＆Precision', '• Schilfsandstein × Proportion'],
      },
      { kind: 'p', text: 'ギプスコイパー（石膏質）由来の密度や精度' },
      { kind: 'p', text: 'シルフザントシュタイン 由来のエレガントな均整' },
    ],
    risingLine: '立ち上がるもの：大局の構成力（Grand Composition）懐の深いエレガンス',
  },
  salwey: {
    title: 'Weingut Salwey | Baden',
    blocks: [
      { kind: 'ul', items: ['・Volcanic × Core', '・Loess × Roundness'] },
      { kind: 'p', text: '火山が“芯”を作り、 loess（レス）が“丸み”を与える。' },
    ],
    risingLine: '立ち上がるもの： “purism”　多面に光を当てる洞察力',
  },
  landerer: {
    title: 'Weingut Landerer | Baden',
    blocks: [
      { kind: 'ul', items: ['・Volcanic × Linear Drive'] },
      { kind: 'p', text: '火山風化土壌の直線的な推進力' },
      { kind: 'p', text: 'マグネシウムと鉄分（玄武岩）由来の輪郭・ミネラル・スパイス感' },
    ],
    risingLine: '立ち上がるもの：端正でスリリング',
  },
  buerklinwolf: {
    title: 'Weingut Dr. Bürklin Wolf | Pfalz',
    blocks: [
      {
        kind: 'ul',
        items: [
          '・Cru × Biodynamics × Dry Riesling',
          '・Wachenheim：sandstone 赤砂岩×ハーバル',
          '・Deidesheim：Kalkriff （玄武岩＋砂岩）×エレガンス×芯',
          '・Ruppertsberg：Buntsandstein ×陽だまり×厚み',
          '・Forst：Volcanic basalt ×玄武岩×推進力',
        ],
      },
      { kind: 'p', text: '（格付けレアものバックヴィンテージ）' },
    ],
    risingLine: '立ち上がるもの：容易には全貌を見せない',
  },
  bus: {
    title: 'Weingut Bus | Pfalz',
    blocks: [
      { kind: 'ul', items: ['・Sandstone × Clear response'] },
      { kind: 'p', text: '（赤砂岩の由来の明瞭な反応）' },
      { kind: 'p', text: '赤砂岩の鉄分などにより果実の輪郭をはっきりと描き出し、瞬時に整う。' },
    ],
    risingLine: '立ち上がるもの：的確な即対応',
  },
  hamm: {
    title: 'Weingut Hamm | Rheingau',
    blocks: [
      { kind: 'ul', items: ['・Mountain & River'] },
      {
        kind: 'ul',
        items: [
          '• Dachsberg：red slate × quartzite（透明感・張り・輪郭・スパイス）',
          '• Jesuitengarten：Rhine alluvium×löss（長い成熟・気品・調和・丸み）',
          '• Hasensprung：loess loam（推進力・緊張感・構造的）',
        ],
      },
    ],
    risingLine: '立ち上がるもの：畑ごとの個性が“rassig”活き活きとありのままに',
  },
  ress: {
    title: 'Weingut Balthasar Ress | Rheingau',
    blocks: [
      {
        kind: 'ul',
        items: [
          '• West side: Slate × quartzite （ミネラル印象、緊張感）',
          '• East side: Sandstone × rhyolite （表現力、将来性のある酸）',
        ],
      },
      { kind: 'p', text: '（格付けレアものバックヴィンテージ）' },
    ],
    risingLine: '立ち上がるもの：GROSSE LAGE中心・信頼と歴史のラインガウ',
  },
};

function renderWineryCardCopy(cardId: string) {
  const copy = wineryCardTextById[cardId];
  if (!copy) return null;
  const risingLabel = '立ち上がるもの：';
  const hasRisingLabel = copy.risingLine.startsWith(risingLabel);
  const risingValue = hasRisingLabel ? copy.risingLine.slice(risingLabel.length) : copy.risingLine;

  const paragraphClassName = (text: string) =>
    text.startsWith('（') || text.startsWith('(')
      ? 'm-0 text-[12px] leading-[1.85] text-neutral-600'
      : 'm-0 text-[13px] leading-[1.9] text-neutral-700';

  return (
    <>
      <h3 className="text-[15px] font-semibold tracking-[0.02em] text-neutral-900 break-keep hyphens-none [text-wrap:balance] min-w-0">
        {copy.title.includes(' | ') ? (
          <>
            <span>{copy.title.split(' | ')[0]}</span>
            <wbr />
            <span className="mx-2 text-neutral-400">|</span>
            <span>{copy.title.split(' | ')[1]}</span>
          </>
        ) : (
          copy.title
        )}
      </h3>
      <div className="mt-4 min-w-0 text-[13px] leading-[1.9] text-neutral-700 max-w-[36ch] whitespace-normal break-words">
        <div className="space-y-3">
          {copy.blocks.map((block, index) => {
            if (block.kind === 'p') {
              return (
                <p key={`${cardId}-p-${index}`} className={paragraphClassName(block.text)}>
                  {block.text}
                </p>
              );
            }

            if (block.kind === 'quote') {
              return (
                <blockquote key={`${cardId}-q-${index}`} className="m-0 space-y-2.5">
                  {block.lines.map((line, lineIndex) => (
                    <p key={`${cardId}-q-${index}-${lineIndex}`} className={paragraphClassName(line)}>
                      {line}
                    </p>
                  ))}
                </blockquote>
              );
            }

            return (
              <ul key={`${cardId}-ul-${index}`} className="m-0 list-none p-0 space-y-1">
                {block.items.map((item, itemIndex) => (
                  <li key={`${cardId}-ul-${index}-${itemIndex}`} className="leading-[1.75]">
                    {item}
                  </li>
                ))}
              </ul>
            );
          })}
          <div className="mt-4 pt-3 border-t border-black/5">
            <p className="m-0 text-[12.5px] leading-[1.8] text-neutral-800">
              {hasRisingLabel ? (
                <>
                  <span className="font-semibold">{risingLabel}</span>
                  <span className="font-normal">{risingValue}</span>
                </>
              ) : (
                <span className="font-normal">{copy.risingLine}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const wineries: WineryCard[] = [
  {
    id: 'dautel',
    name: 'Weingut Dautel',
    region: 'Wurttemberg',
    style: 'Lembergerを軸にした、芯のある辛口。',
    blurb1: '',
    blurb2:
      '**Gipskeuper** **Keuper** × Precision / **Schilfsandstein** × Proportion\nギプスコイパー（石膏質）由来の密度や精度、シルフザントシュタイン由来のエレガントな均整。\n立ち上がるもの：揺るがない構築力。',
    rising: '',
    count: '取扱 2種',
    photo: '/wineries/dautel-new-rev.jpg',
    imageClass: 'object-cover',
    wines: buildWines({
      wineryId: 'dautel',
      producer: 'Weingut Dautel',
      region: 'Wurttemberg',
      image: '/wineries/dautel-new-rev.jpg',
      first: {
        name: 'Estate Lemberger Trocken',
        type: '赤',
        subline: 'Trocken｜Lemberger｜Estate',
        quickSpecs: ['赤', 'Lemberger', '辛口', 'Estate'],
        oneLine: '黒果実の密度と、きめ細かなタンニン。',
        recommend: '肉料理の主皿や、旨味の強いソースに。',
        pairing: '鴨、ローストビーフ、茸のソテー。',
        tastingNote: 'ブラックチェリー、胡椒、ほのかなスモーク。',
        analysis: 'Alc. 13.0% / 残糖 2.4g/L / 総酸 5.5g/L',
        vinification: 'ステンレス発酵後、旧樽で熟成。',
        soil: '石灰質・粘土質土壌。',
        metrics: { dryness: 4, acid: 3, bubbles: 1 },
      },
      second: {
        name: 'Riesling Gutswein',
        type: '白',
        subline: 'Trocken｜Riesling｜Gutswein',
        quickSpecs: ['白', 'Riesling', '辛口', 'Gutswein'],
        oneLine: '直線的な酸と透明な果実感。',
        recommend: '前菜から魚料理まで幅広く対応。',
        pairing: '白身魚、シーフード、ハーブ料理。',
        tastingNote: '青リンゴ、柑橘、石灰のニュアンス。',
        analysis: 'Alc. 12.0% / 残糖 3.1g/L / 総酸 7.0g/L',
        vinification: '低温発酵、澱とともに短期熟成。',
        soil: '石灰質ローム。',
        metrics: { dryness: 4, acid: 4, bubbles: 1 },
      },
    }),
  },
  {
    id: 'horst',
    name: 'Weingut Horst Sauer',
    region: 'Franken',
    style: 'Silvanerを軸にした端正な辛口。',
    blurb1: '',
    blurb2: '**Muschelkalk** × Structure & Reflection\nチョークの締まりと塩味の余韻。透明感で終わらない芯。\n立ち上がるもの：毅然とした明快さ（Resolute clarity）。',
    rising: '',
    count: '取扱 2種',
    photo: '/wineries/horst-sauer-new-rev.jpg',
    imageClass: 'object-cover',
    wines: buildWines({
      wineryId: 'horst',
      producer: 'Weingut Horst Sauer',
      region: 'Franken',
      image: '/wineries/horst-sauer-new-rev.jpg',
      first: {
        name: 'Silvaner Brut',
        type: '泡',
        subline: 'Brut｜Silvaner｜Sekt b.A.',
        quickSpecs: ['泡', 'Silvaner', '辛口', 'Sekt b.A.'],
        oneLine: 'Silvanerの輪郭を活かした、端正で伸びる泡。',
        recommend: '乾杯から前菜まで一貫して使える一本。',
        pairing: 'カルパッチョ、天ぷら、山菜料理。',
        tastingNote: '白い花、柑橘、ミネラル。余韻はドライ。',
        analysis: 'Alc. 12.0% / 残糖 6.0g/L / 総酸 7.2g/L',
        vinification: '瓶内二次発酵、澱熟成18ヶ月。',
        soil: 'Muschelkalk主体。',
        metrics: { dryness: 4, acid: 4, bubbles: 5 },
      },
      second: {
        name: 'Silvaner Trocken',
        type: '白',
        subline: 'Trocken｜Silvaner｜VDP.Ortswein',
        quickSpecs: ['白', 'Silvaner', '辛口', 'VDP.Ortswein'],
        oneLine: '静かな厚みと精密な酸。',
        recommend: '和食の繊細な旨味と相性が高い。',
        pairing: '白身魚、豆腐料理、出汁系。',
        tastingNote: '洋梨、ハーブ、塩味を伴う余韻。',
        analysis: 'Alc. 12.5% / 残糖 2.6g/L / 総酸 6.5g/L',
        vinification: 'ステンレス発酵、一部大樽熟成。',
        soil: '石灰質土壌。',
        metrics: { dryness: 4, acid: 4, bubbles: 1 },
      },
    }),
  },
  {
    id: 'landerer',
    name: 'Weingut Landerer',
    region: 'Baden',
    style: 'Pinot系を軸に、透明感ある辛口。',
    blurb1: '',
    blurb2:
      '**Volcanic** × Linear Drive\n火山風化土壌の直線的な推進力。マグネシウムと鉄分（玄武岩）由来の輪郭・ミネラル・スパイス感。\n立ち上がるもの：未来感。',
    rising: '',
    count: '取扱 2種',
    photo: '/wineries/landerer-new-rev.jpg',
    imageClass: 'object-cover',
    wines: buildWines({
      wineryId: 'landerer',
      producer: 'Weingut Landerer',
      region: 'Baden',
      image: '/wineries/landerer-new-rev.jpg',
      first: {
        name: 'Weissburgunder Trocken',
        type: '白',
        subline: 'Trocken｜Weissburgunder｜Estate',
        quickSpecs: ['白', 'Weissburgunder', '辛口', 'Estate'],
        oneLine: 'やわらかな果実と、清潔感のある後味。',
        recommend: '軽い魚介や前菜に。',
        pairing: 'ホタテ、白身魚、サラダ。',
        tastingNote: '白桃、花、ナッツのタッチ。',
        analysis: 'Alc. 12.5% / 残糖 3.0g/L / 総酸 6.2g/L',
        vinification: '低温発酵、澱とともに熟成。',
        soil: '黄土・石灰混成。',
        metrics: { dryness: 4, acid: 3, bubbles: 1 },
      },
      second: {
        name: 'Spatburgunder Trocken',
        type: '赤',
        subline: 'Trocken｜Spatburgunder｜Estate',
        quickSpecs: ['赤', 'Spatburgunder', '辛口', 'Estate'],
        oneLine: '果実の純度と、しなやかな骨格。',
        recommend: '赤身魚や鶏のローストにも。',
        pairing: '鴨、鶏、きのこ。',
        tastingNote: 'ラズベリー、スミレ、軽いスパイス。',
        analysis: 'Alc. 13.0% / 残糖 1.8g/L / 総酸 5.7g/L',
        vinification: '自然酵母、一部樽熟成。',
        soil: '石灰岩質。',
        metrics: { dryness: 4, acid: 3, bubbles: 1 },
      },
    }),
  },
  {
    id: 'ludwig',
    name: 'Weingut Ludwig',
    region: 'Mosel',
    style: 'Rieslingの緊張感と余韻。',
    blurb1: '',
    blurb2:
      'soft Devonian **Slate** × Ethereal Lift（柔らかいデボン紀のスレート × “ethereal” 霊妙でハーバルな立ち上がり）\n輪郭は柔らかく、抜けは高く、心がほどける。\n立ち上がるもの：心がほどける開放感。',
    rising: '',
    count: '取扱 2種',
    photo: '/wineries/ludwig-new-rev.jpg',
    imageClass: 'object-cover',
    wines: buildWines({
      wineryId: 'ludwig',
      producer: 'Weingut Ludwig',
      region: 'Mosel',
      image: '/wineries/ludwig-new-rev.jpg',
      first: {
        name: 'Riesling Kabinett Trocken',
        type: '白',
        subline: 'Trocken｜Riesling｜Kabinett',
        quickSpecs: ['白', 'Riesling', '辛口', 'Kabinett'],
        oneLine: 'スレート由来の引き締まった輪郭。',
        recommend: '魚介・甲殻類に合わせやすい。',
        pairing: '牡蠣、エビ、白身魚。',
        tastingNote: 'ライム、白桃、濡れ石のニュアンス。',
        analysis: 'Alc. 11.5% / 残糖 4.5g/L / 総酸 7.8g/L',
        vinification: '低温発酵、ステンレス熟成。',
        soil: '青色粘板岩。',
        metrics: { dryness: 4, acid: 5, bubbles: 1 },
      },
      second: {
        name: 'Riesling Sekt Brut',
        type: '泡',
        subline: 'Brut｜Riesling｜Sekt',
        quickSpecs: ['泡', 'Riesling', '辛口', 'Sekt'],
        oneLine: '細かい泡と緊張感のある酸。',
        recommend: 'アペリティフから通しで運用可能。',
        pairing: 'フリット、前菜、白身魚。',
        tastingNote: '青リンゴ、柑橘、白花。',
        analysis: 'Alc. 12.0% / 残糖 7.0g/L / 総酸 7.5g/L',
        vinification: '瓶内二次発酵。',
        soil: '粘板岩。',
        metrics: { dryness: 4, acid: 4, bubbles: 5 },
      },
    }),
  },
  {
    id: 'hamm',
    name: 'Weingut Hamm',
    region: 'Rheingau',
    style: 'Rieslingを軸にした、上品な辛口。',
    blurb1: '',
    blurb2:
      'Mountain & River\n• Dachsberg：**red slate** × **quartzite**（張り・輪郭・スパイス）\n• Jesuitengarten：**Rhine alluvium**（温暖・長い成熟・厚み）\n• Hasensprung：**loess loam**（柔らかさと物語の畑）\n赤スレートと石英岩が描く、澄んだ輪郭と流れ。\n立ち上がるもの：循環の物語',
    rising: '',
    count: '取扱 2種',
    photo: '/wineries/hamm-new-rev.jpg',
    imageClass: 'object-cover object-[45%_30%]',
    wines: buildWines({
      wineryId: 'hamm',
      producer: 'Weingut Hamm',
      region: 'Rheingau',
      image: '/wineries/hamm-new-rev.jpg',
      first: {
        name: 'Riesling Ortswein',
        type: '白',
        subline: 'Trocken｜Riesling｜Ortswein',
        quickSpecs: ['白', 'Riesling', '辛口', 'Ortswein'],
        oneLine: '果実と酸のバランスに優れた一本。',
        recommend: '現場で説明しやすく、汎用性が高い。',
        pairing: '白魚、鶏、和の前菜。',
        tastingNote: '柑橘、洋梨、白い花。',
        analysis: 'Alc. 12.0% / 残糖 3.2g/L / 総酸 6.8g/L',
        vinification: 'ステンレス熟成。',
        soil: '黄土・砂質土壌。',
        metrics: { dryness: 4, acid: 4, bubbles: 1 },
      },
      second: {
        name: 'Spatburgunder',
        type: '赤',
        subline: 'Trocken｜Spatburgunder｜Estate',
        quickSpecs: ['赤', 'Spatburgunder', '辛口', 'Estate'],
        oneLine: '軽やかさと深みを両立した赤。',
        recommend: '和洋問わず赤を1本置くなら。',
        pairing: 'ローストポーク、鴨、茸。',
        tastingNote: '赤果実、ハーブ、穏やかな樽香。',
        analysis: 'Alc. 13.0% / 残糖 2.0g/L / 総酸 5.4g/L',
        vinification: '一部樽熟成。',
        soil: 'レス土壌。',
        metrics: { dryness: 4, acid: 3, bubbles: 1 },
      },
    }),
  },
  {
    id: 'bus',
    name: 'Weingut Bus',
    region: 'Pfalz',
    style: '果実とミネラルの均衡が美しい辛口。',
    blurb1: '',
    blurb2:
      '**Sandstone** × Clear response\n赤砂岩由来の明瞭な反応。赤砂岩の鉄分などにより果実の輪郭をはっきりと描き出し、瞬時に整う。\n立ち上がるもの：的確な即対応',
    rising: '',
    count: '取扱 2種',
    photo: '/wineries/bus-new-rev.jpg',
    imageClass: 'object-cover',
    wines: buildWines({
      wineryId: 'bus',
      producer: 'Weingut Bus',
      region: 'Pfalz',
      image: '/wineries/bus-new-rev.jpg',
      first: {
        name: 'Grauburgunder Trocken',
        type: '白',
        subline: 'Trocken｜Grauburgunder｜Estate',
        quickSpecs: ['白', 'Grauburgunder', '辛口', 'Estate'],
        oneLine: '厚みがありつつ、クリーンな余韻。',
        recommend: 'ボリュームある料理と合わせやすい。',
        pairing: 'グリル野菜、鶏、白身肉。',
        tastingNote: '熟した洋梨、ナッツ、ハーブ。',
        analysis: 'Alc. 13.0% / 残糖 3.8g/L / 総酸 5.9g/L',
        vinification: 'ステンレス主体。',
        soil: '石灰・砂質土壌。',
        metrics: { dryness: 4, acid: 3, bubbles: 1 },
      },
      second: {
        name: 'Rose Brut',
        type: '泡',
        subline: 'Brut｜Pinot Noir｜Sekt',
        quickSpecs: ['泡', 'Pinot Noir', '辛口', 'Sekt'],
        oneLine: '華やかさとドライさの両立。',
        recommend: '乾杯・ペアリング提案に使いやすい。',
        pairing: '前菜、甲殻類、軽い肉料理。',
        tastingNote: '赤果実、シトラス、繊細な泡。',
        analysis: 'Alc. 12.0% / 残糖 7.5g/L / 総酸 7.1g/L',
        vinification: '瓶内二次発酵。',
        soil: '砂質土壌。',
        metrics: { dryness: 4, acid: 4, bubbles: 5 },
      },
    }),
  },
  {
    id: 'ress',
    name: 'Weingut Ress',
    region: 'Rheingau',
    style: '伸びやかな酸と塩味のある辛口。',
    blurb1: '',
    blurb2:
      '**Loess** & **Quartzite** × Balance\n土壌の水分保持が熟度を支え、石灰岩・マール由来のミネラル要素＋酸が長期熟成性を形作る。\n立ち上がるもの：信頼と展開',
    rising: '',
    count: '取扱 2種',
    photo: '/wineries/ress-new-rev.jpg',
    imageClass: 'object-cover',
    wines: buildWines({
      wineryId: 'ress',
      producer: 'Weingut Ress',
      region: 'Rheingau',
      image: '/wineries/ress-new-rev.jpg',
      first: {
        name: 'Riesling Trocken',
        type: '白',
        subline: 'Trocken｜Riesling｜Estate',
        quickSpecs: ['白', 'Riesling', '辛口', 'Estate'],
        oneLine: 'ミネラル感のあるストレートな辛口。',
        recommend: 'コース中盤の白として安定。',
        pairing: '貝類、白身魚、ハーブ。',
        tastingNote: '柑橘、青リンゴ、塩味。',
        analysis: 'Alc. 12.0% / 残糖 3.0g/L / 総酸 7.1g/L',
        vinification: 'ステンレス熟成。',
        soil: 'スレート・黄土。',
        metrics: { dryness: 4, acid: 4, bubbles: 1 },
      },
      second: {
        name: 'Pinot Noir',
        type: '赤',
        subline: 'Trocken｜Pinot Noir｜Estate',
        quickSpecs: ['赤', 'Pinot Noir', '辛口', 'Estate'],
        oneLine: '赤果実主体で、しなやかな赤。',
        recommend: '重すぎない赤として導入しやすい。',
        pairing: '鴨、豚、きのこ。',
        tastingNote: 'チェリー、ハーブ、軽い樽香。',
        analysis: 'Alc. 13.0% / 残糖 1.9g/L / 総酸 5.6g/L',
        vinification: '一部古樽熟成。',
        soil: 'ローム・石灰質。',
        metrics: { dryness: 4, acid: 3, bubbles: 1 },
      },
    }),
  },
  {
    id: 'salwey',
    name: 'Weingut Salwey',
    region: 'Baden',
    style: 'Pinot系の骨格と静かな奥行き。',
    blurb1: '',
    blurb2:
      '**Volcanic** × Core / **Loess** × Roundness\n火山が“芯”を作り、loess（レス）が“丸み”を与える。\n立ち上がるもの：“purism” 多面に光を当てる洞察力',
    rising: '',
    count: '取扱 2種',
    photo: '/wineries/salwey-new-rev.jpg',
    imageClass: 'object-cover object-[50%_38%]',
    wines: buildWines({
      wineryId: 'salwey',
      producer: 'Weingut Salwey',
      region: 'Baden',
      image: '/wineries/salwey-new-rev.jpg',
      first: {
        name: 'Grauburgunder',
        type: '白',
        subline: 'Trocken｜Grauburgunder｜VDP.Ortswein',
        quickSpecs: ['白', 'Grauburgunder', '辛口', 'VDP.Ortswein'],
        oneLine: '濃密さとミネラルを兼ねる辛口。',
        recommend: '前菜から主菜手前までカバー。',
        pairing: '白身肉、魚介、クリーム系。',
        tastingNote: '洋梨、黄桃、石灰。',
        analysis: 'Alc. 13.0% / 残糖 3.4g/L / 総酸 6.0g/L',
        vinification: '大樽とステンレス併用。',
        soil: '火山性・石灰質。',
        metrics: { dryness: 4, acid: 3, bubbles: 1 },
      },
      second: {
        name: 'Spatburgunder',
        type: '赤',
        subline: 'Trocken｜Spatburgunder｜VDP.Ortswein',
        quickSpecs: ['赤', 'Spatburgunder', '辛口', 'VDP.Ortswein'],
        oneLine: '緻密なタンニンと長い余韻。',
        recommend: '料理の格を上げる赤として。',
        pairing: 'ジビエ、赤身肉、熟成チーズ。',
        tastingNote: 'ベリー、スパイス、土のニュアンス。',
        analysis: 'Alc. 13.5% / 残糖 1.6g/L / 総酸 5.3g/L',
        vinification: '樽熟成12ヶ月。',
        soil: '石灰岩・火山性土壌。',
        metrics: { dryness: 4, acid: 3, bubbles: 1 },
      },
    }),
  },
  {
    id: 'buerklinwolf',
    name: 'Weingut Dr. Bürklin Wolf',
    region: 'Pfalz',
    style: 'Biodynamic × Grip & Clarity',
    blurb1: '',
    blurb2:
      'Geology Mosaic × Precision\nForst：**Volcanic basalt** × Grip（solidity）堅さ\nDeidesheim：**Kalkriff** × Depth 深み\nRuppertsberg：**Buntsandstein** × Volume ボリューム\nWachenheim：**sandstone** × Brightness 明るさ + **Riverine strata** × Core 緊張\n玄武岩、赤黄砂岩、石灰リーフ、段丘砂利──4つの村と多層の地質を、バイオダイナミックと大樽発酵で“緊張の輪郭”へ束ねる。【スイス時計の様な精密さ】\n立ち上がるもの：体系化と精密な時間設計',
    rising: '',
    keywords: 'Village / Riesling / Dry / Grip',
    count: '取扱 2種',
    photo: '/wineries/dr-burkl-wolf-new-rev.jpg',
    imageClass: 'object-cover object-[50%_42%]',
    wines: buildWines({
      wineryId: 'buerklinwolf',
      producer: 'Weingut Dr. Bürklin Wolf',
      region: 'Pfalz（Deidesheim / Ruppertsberg）',
      image: '/wineries/dr-burkl-wolf-new-rev.jpg',
      first: {
        name: '2019 Deidesheimer Riesling trocken',
        type: '白',
        subline: 'Village｜Riesling｜VDP.Ortswein',
        quickSpecs: ['白', 'Riesling', 'trocken', 'Village'],
        oneLine: '黄果実とハーブ、酸の張り。ドライで端正な輪郭。',
        recommend: '繊細な魚介や出汁感のある料理に。',
        pairing: '白身魚、甲殻類、ハーブ料理。',
        tastingNote: '黄果実、ハーブ、ミネラル。硬質でドライ。',
        analysis: 'Alc. 12.0% / trocken',
        vinification: '低温発酵、澱とともに短期熟成。',
        soil: '石灰質・砂岩主体。',
        metrics: { dryness: 4, acid: 4, bubbles: 1 },
      },
      second: {
        name: '2019 Ruppertsberger Riesling trocken',
        type: '白',
        subline: 'Village｜Riesling｜VDP.Ortswein',
        quickSpecs: ['白', 'Riesling', 'trocken', 'Village'],
        oneLine: 'シトラスから黄果実、張りのあるミネラル感。',
        recommend: '前菜から魚料理まで幅広く対応。',
        pairing: '魚介、鶏、野菜料理。',
        tastingNote: 'シトラス、黄果実、硬質なミネラル。ドライ。',
        analysis: 'Alc. 12.0% / trocken',
        vinification: 'ステンレス主体でクリーンに醸造。',
        soil: '砂岩・石灰質土壌。',
        metrics: { dryness: 4, acid: 4, bubbles: 1 },
      },
    }),
  },
  {
    id: 'stodden',
    name: 'Jean Stodden das Rotweingut',
    region: 'Ahr',
    style: 'Spatburgunderの精緻な表現。',
    blurb1: '',
    blurb2: '**slate** × tension & finesse（スレート × 張りのある精妙な繊細さ）\n緊張感と、真っ直ぐに伸びる余韻。\n立ち上がるもの：凛線（りんせん）。',
    rising: '',
    count: '取扱 2種',
    photo: '/wineries/jean-stodden-new-rev.jpg',
    imageClass: 'object-cover object-[50%_42%]',
    wines: buildWines({
      wineryId: 'stodden',
      producer: 'Jean Stodden das Rotweingut',
      region: 'Ahr',
      image: '/wineries/jean-stodden-new-rev.jpg',
      first: {
        name: 'Spatburgunder JS',
        type: '赤',
        subline: 'Trocken｜Spatburgunder｜Estate',
        quickSpecs: ['赤', 'Spatburgunder', '辛口', 'Estate'],
        oneLine: 'Ahrらしい凝縮とエレガンス。',
        recommend: '看板赤として提案しやすい。',
        pairing: '牛、鹿、熟成料理。',
        tastingNote: 'カシス、チェリー、ミネラル。',
        analysis: 'Alc. 13.5% / 残糖 1.4g/L / 総酸 5.4g/L',
        vinification: '長期マセラシオン後、樽熟成。',
        soil: 'スレート・火山性土壌。',
        metrics: { dryness: 4, acid: 3, bubbles: 1 },
      },
      second: {
        name: 'Rose Sekt Brut',
        type: '泡',
        subline: 'Brut｜Spatburgunder｜Sekt',
        quickSpecs: ['泡', 'Spatburgunder', '辛口', 'Sekt'],
        oneLine: '赤果実の香りを持つ繊細な泡。',
        recommend: '乾杯やコース切替の一杯に。',
        pairing: '前菜、シャルキュトリー、魚介。',
        tastingNote: 'イチゴ、柑橘、白い花。',
        analysis: 'Alc. 12.0% / 残糖 7.2g/L / 総酸 6.9g/L',
        vinification: '瓶内二次発酵、澱熟成。',
        soil: 'スレート。',
        metrics: { dryness: 4, acid: 4, bubbles: 5 },
      },
    }),
  },
];

const wineryEditorialCopy: Record<string, { title: string; caption: [string, string, string] }> = {
  stodden: {
    title: '① Jean Stodden das Rotweingut｜Ahr',
    caption: [
      'slate × tension & finesse（スレート × 張りのある精妙な繊細さ）',
      '立ち上がる言葉：凛線（りんせん）。',
      '緊張感と真っ直ぐに伸びる余韻。',
    ],
  },
  ludwig: {
    title: '② Weingut Ludwig｜Mosel',
    caption: [
      'soft Devonian Slate × Ethereal Lift（柔らかいデボン紀のスレート × “ethereal” 霊妙でハーバルな立ち上がり）',
      '立ち上がる言葉：心がほどける開放感',
      '',
    ],
  },
  hamm: {
    title: '③ Weingut Hamm｜Rheingau',
    caption: ['Rheingau｜Quartzite × Clarity', '石英岩土壌の直線的な酸と、澄んだ輪郭。', '立ち上がるもの：格と品位。'],
  },
  ress: {
    title: '④ Balthasar RESS｜Rheingau',
    caption: ['Rheingau｜Loess & Quartzite × Balance', '歴史的区画の安定感と、伸びのあるバランス。', '立ち上がるもの：信頼。'],
  },
  buerklinwolf: {
    title: '⑤ Weingut Dr. Bürklin Wolf｜Pfalz',
    caption: ['Pfalz｜Limestone × Depth', '石灰岩の奥行きと、思想のあるクリアな緊張。', '立ち上がるもの：思想。'],
  },
  bus: {
    title: '⑥ Weingut Bus｜Pfalz',
    caption: ['Pfalz｜Sandstone × Precision', '赤砂岩が生むピュアさと、直線的な精度。', '立ち上がるもの：若い躍動。'],
  },
  horst: {
    title: '⑦ Horst Sauer｜Franken',
    caption: ['Franken｜Muschelkalk × Finesse', '貝殻石灰土壌の透明な酸と、繊細な持続。', '立ち上がるもの：調和。'],
  },
  dautel: {
    title: '⑧ Dautel｜Württemberg',
    caption: ['Württemberg｜Keuper × Structure', 'コイパー由来の密度と緊張。構造が立つ味わい。', '立ち上がるもの：覚悟。'],
  },
  salwey: {
    title: '⑨ Salwey｜Baden (Kaiserstuhl)',
    caption: ['Baden｜Volcanic × Line', '火山由来の純度と芯。静かに強いライン。', '立ち上がるもの：強さと優雅。'],
  },
  landerer: {
    title: '⑩ Landerer｜Baden',
    caption: ['Baden｜Volcanic & Loess × Energy', '火山表現の透明感と推進力。未来へ伸びる印象。', '立ち上がるもの：未来感。'],
  },
};

const wineryDisplayOrder: WineryCard['id'][] = [
  'dautel',
  'horst',
  'salwey',
  'hamm',
  'buerklinwolf',
  'stodden',
  'ludwig',
  'ress',
  'bus',
  'landerer',
];

const wineryIdeelogosUrlById: Record<string, string> = {
  dautel: 'https://ideelogos.com/pages/dautel',
  horst: 'https://ideelogos.com/pages/horst-sauer',
  landerer: 'https://ideelogos.com/pages/landerer',
  ludwig: 'https://ideelogos.com/pages/gebruder-ludwig',
  hamm: 'https://ideelogos.com/pages/hamm',
  bus: 'https://ideelogos.com/pages/bus',
  ress: 'https://ideelogos.com/pages/balthasar-ress',
  salwey: 'https://ideelogos.com/pages/salwey',
  buerklinwolf: 'https://ideelogos.com/pages/dr-burklin-wolf',
  stodden: 'https://ideelogos.com/pages/jean-stodden',
};

export default function CatalogueSection() {
  const wineriesWithDocData: WineryCard[] = wineries.map((card) => {
    const docs = docWineData[card.id] ?? [];
    const ideelogosUrl = wineryIdeelogosUrlById[card.id];

    if (!docs.length) {
      return {
        ...card,
        ideelogosUrl,
      };
    }

    const mappedWines = docs.map((wine, index) => mapDocWine(card, wine, index));
    return {
      ...card,
      ideelogosUrl,
      wines: mappedWines,
      count: `取扱 ${mappedWines.length}種`,
    };
  });

  const orderedWineries = wineryDisplayOrder
    .map((id) => wineriesWithDocData.find((winery) => winery.id === id))
    .filter((winery): winery is WineryCard => Boolean(winery));

  return (
    <section className="wineries-layout">
      <header className="wineries-head">
        <p className="section-kicker">
          <span className="tracking-[0.35em]">WINERIES</span>
          <span className="mx-2 tracking-[0.08em]">/</span>
          <span className="tracking-[0.08em]">取り扱い</span>
        </p>
        <h2 className="section-title-mincho wineries-title break-keep hyphens-none [text-wrap:balance]">
          <span className="wineries-title-line">取り扱いワイン</span>
          <br />
          <span className="wineries-title-line">全10ワイナリー</span>
        </h2>
        <div className="wineries-copy">
          <p className="wineries-lead">FINDESTは、ドイツの希少なワインを、市場の都合ではなく、造り手の“線”と品質の再現性で選びます。</p>
          <p className="wineries-lead">ただ銘柄を並べるのではなく、店の“場”で成立する体験として設計できるものだけ。食・客層・温度・言葉まで含めて、現場で伝わる形に落とし込みます。</p>
          <div className="mt-5">
            <a
              href="/wines"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(31,27,22,0.14)] bg-[rgba(255,255,255,0.42)] px-4 py-2 text-[12px] tracking-[0.08em] text-[rgba(31,27,22,0.84)] transition-colors hover:bg-[rgba(255,255,255,0.68)]"
            >
              <span>取扱ワインを見る</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      <div className="wineries-grid">
        {orderedWineries.map((winery) => {
          return (
          <article key={winery.id} className="winery-card min-w-0">
            <div className="winery-card-image">
              <Image
                src={winery.photo}
                alt={winery.name}
                fill
                className={`${winery.imageClass} winery-card-photo`}
                sizes="(min-width: 1024px) 31vw, (min-width: 680px) 47vw, 100vw"
              />
            </div>

            <div className="winery-card-body winery-card__body min-w-0 rounded-2xl bg-white/18 border border-black/5 p-6">
              {renderWineryCardCopy(winery.id)}
            </div>

          </article>
        )})}
      </div>
    </section>
  );
}

