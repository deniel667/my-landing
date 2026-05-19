import { docWineData } from '@/data/my-landing/docWineData';
import { getExactBottleImageSrc } from '@/data/my-landing/wineBottleImages';
import { type WineListItem, wineList } from '@/data/my-landing/wineList';
import type { WineryDetailTemplateKey, WinerySectionRole } from '@/data/my-landing/wineryDetailTemplate';

export type WineryFact = {
  label: string;
  value: string;
};

export type WineryMedia = {
  src: string;
  alt: string;
  ratio?: 'portrait' | 'landscape' | 'wide' | 'square';
  caption?: string;
  position?: string;
};

export type WineryTextSection = {
  id: string;
  role?: WinerySectionRole;
  eyebrow: string;
  title: string;
  body: string[];
  facts?: WineryFact[];
  media?: WineryMedia;
  layout?: 'imageLeft' | 'imageRight';
  tone?: 'default' | 'tinted' | 'essay' | 'fact' | 'spotlight' | 'intro';
};

export type WineryVideoSection = {
  eyebrow: string;
  title: string;
  body: string[];
  poster: WineryMedia;
  ctaLabel?: string;
  ctaHref?: string;
};

export type WineryInquiry = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type WineryGalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type WineryPreviewWine = WineListItem & {
  displayName: string;
  image: string;
};

export type WineryEntry = {
  id: string;
  slug: string;
  templateKey?: WineryDetailTemplateKey;
  hiddenSectionIds?: string[];
  name: string;
  japaneseLabel: string;
  region: string;
  descriptor: string;
  heroBody?: string[];
  cardImage: string;
  heroImage: string;
  heroImagePosition?: string;
  heroCaption: string;
  heroFacts?: WineryFact[];
  listBlurb: string;
  intro: WineryTextSection;
  sections: WineryTextSection[];
  awards?: WineryTextSection;
  video?: WineryVideoSection;
  gallery?: {
    eyebrow: string;
    title: string;
    intro: string;
    images: WineryGalleryImage[];
  };
  winesIntro?: string[];
  wines: WineryPreviewWine[];
  inquiry?: WineryInquiry;
};

const wineriesBase = [
  {
    id: 'dautel',
    slug: 'dautel',
    name: 'Weingut Dautel',
    japaneseLabel: 'ダウテル',
    region: 'Württemberg / Bönnigheim',
    descriptor: 'Keuper の地質と精密な醸造で、密度と均整を両立させる Württemberg の生産者。',
    cardImage: '/wineries/dautel-new-rev.jpg',
    heroImage: '/story/dau-main-1.jpg',
    heroCaption: '',
    listBlurb: 'FINDEST が重視するのは、密度だけでなく、輪郭の収まり方まで美しいこと。Dautel はその条件を静かに満たします。',
  },
  {
    id: 'horst',
    slug: 'horst-sauer',
    name: 'Weingut Horst Sauer',
    japaneseLabel: 'ホルスト・ザウアー',
    region: 'Franken',
    descriptor: 'Muschelkalk 由来の緊張感と静かな塩味を備えた、Franken を代表する生産者。',
    cardImage: '/wineries/horst-sauer-new-rev.jpg',
    heroImage: '/wineries/horst-sauer-new-rev.jpg',
    heroCaption: 'Franken の石灰質土壌を、緊張感ある辛口へと翻訳する FINDEST selection。',
    listBlurb: '硬質さだけでは終わらない余韻の気品が、この生産者の魅力です。',
  },
  {
    id: 'salwey',
    slug: 'salwey',
    name: 'Weingut Salwey',
    japaneseLabel: 'サルヴァイ',
    region: 'Baden / Kaiserstuhl',
    descriptor: '火山性土壌の芯と loess の丸みを併せ持つ、Kaiserstuhl の Pinot 使い。',
    cardImage: '/wineries/salwey-new-rev.jpg',
    heroImage: '/wineries/salwey-new-rev.jpg',
    heroCaption: '火山性土壌のピュアさと静かな緊張感を、Baden らしい輪郭で見せる造り手。',
    listBlurb: '厚みよりも線の美しさで印象を残す、洗練された Baden の一角です。',
  },
  {
    id: 'hamm',
    slug: 'hamm',
    name: 'Weingut Hamm',
    japaneseLabel: 'ハム',
    region: 'Rheingau',
    descriptor: '山と川の地形を背負った Riesling を、上品な張りと流れで見せる Rheingau の生産者。',
    cardImage: '/wineries/hamm-new-rev.jpg',
    heroImage: '/wineries/hamm-new-rev.jpg',
    heroCaption: '石英岩とライン河の文脈を、まっすぐな酸と品位ある余韻へつなげる selection。',
    listBlurb: '地域の大きさではなく、区画ごとの輪郭がきちんと飲み手に届く生産者です。',
  },
  {
    id: 'buerklinwolf',
    slug: 'buerklin-wolf',
    name: 'Weingut Dr. Bürklin-Wolf',
    japaneseLabel: 'ビュルクリン・ヴォルフ',
    region: 'Pfalz',
    descriptor: '多層の地質と biodynamics を背景に、精度の高い dry Riesling を組み立てる名門。',
    cardImage: '/wineries/dr-burkl-wolf-new-rev.jpg',
    heroImage: '/wineries/dr-burkl-wolf-new-rev.jpg',
    heroCaption: 'Pfalz の複層的な terroir を、体系立った precision とともに見せる造り手。',
    listBlurb: '構造化された美しさを求める現場に対して、強い説得力を持つ selection です。',
  },
  {
    id: 'stodden',
    slug: 'stodden',
    name: 'Jean Stodden das Rotweingut',
    japaneseLabel: 'ジャン・シュトッデン',
    region: 'Ahr',
    descriptor: 'Ahr の斜面由来の tension を、Pinot Noir の精緻さへと結晶させる赤の造り手。',
    cardImage: '/wineries/jean-stodden-new-rev.jpg',
    heroImage: '/wineries/jean-stodden-new-rev.jpg',
    heroCaption: 'Slate の張りと繊細な果実を、まっすぐな線で残す Ahr の生産者。',
    listBlurb: '強さよりも線の精度で惹きつける、FINDEST の赤ワイン selection の重要な柱です。',
  },
  {
    id: 'ludwig',
    slug: 'ludwig',
    name: 'Weingut Ludwig',
    japaneseLabel: 'ルートヴィヒ',
    region: 'Mosel',
    descriptor: '柔らかな Devonian slate のニュアンスを、軽やかさと抜けの高さで表現する Mosel の生産者。',
    cardImage: '/wineries/ludwig-new-rev.jpg',
    heroImage: '/wineries/ludwig-new-rev.jpg',
    heroCaption: 'Mosel の静かな lift を、過剰な演出なく見せる curated selection。',
    listBlurb: '軽さではなく、抜けの質で記憶に残るワインを探すなら外せません。',
  },
  {
    id: 'ress',
    slug: 'ress',
    name: 'Weingut Balthasar Ress',
    japaneseLabel: 'バルタザール・レス',
    region: 'Rheingau',
    descriptor: '歴史ある区画の安定感を、塩味と長い酸のバランスで見せる Rheingau の造り手。',
    cardImage: '/wineries/ress-new-rev.jpg',
    heroImage: '/wineries/ress-new-rev.jpg',
    heroCaption: 'Rheingau の信頼感を、静かな説得力として届ける winery selection。',
    listBlurb: '説明しやすさと、実際に飲んだときの伸びのよさを両立する存在です。',
  },
  {
    id: 'bus',
    slug: 'bus',
    name: 'Weingut Bus',
    japaneseLabel: 'ブス',
    region: 'Pfalz',
    descriptor: '赤砂岩由来の明快さを、ピュアで反応の良い果実へつなげる若い躍動のある生産者。',
    cardImage: '/wineries/bus-new-rev.jpg',
    heroImage: '/wineries/bus-new-rev.jpg',
    heroCaption: 'Sandstone の輪郭を、分かりやすくも安っぽくないバランスで示す selection。',
    listBlurb: '即時性のある果実と、後味の整理されたドライさが魅力です。',
  },
  {
    id: 'landerer',
    slug: 'landerer',
    name: 'Weingut Landerer',
    japaneseLabel: 'ランデラー',
    region: 'Baden',
    descriptor: '火山風化土壌の直線的なドライブを、透明感のある Pinot 表現へとつなげる生産者。',
    cardImage: '/wineries/landerer-new-rev.jpg',
    heroImage: '/wineries/landerer-new-rev.jpg',
    heroCaption: 'Volcanic soils の推進力を、未来感のある clean な表現へまとめる Baden の造り手。',
    listBlurb: 'Baden の中でも、透明感と推進力の両立が際立つ selection です。',
  },
] as const;

function normalizeInlineText(value: string) {
  return value
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
    .replace(/GrauburgunderGutswein/g, 'Grauburgunder Gutswein')
    .replace(/GutsweinWeissburgunder/g, 'Gutswein Weissburgunder')
    .replace(/ThörnicherRitsch/g, 'Thörnicher Ritsch')
    .replace(/Devonianslate/g, 'Devonian slate')
    .replace(/BergRottland/g, 'Berg Rottland')
    .replace(/RüdesheimBergRottland/g, 'Rüdesheimer Berg Rottland')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatWineName(value: string) {
  return normalizeInlineText(value)
    .replace(/SpГ¤t/g, 'Spät')
    .replace(/ThГ¶/g, 'Thö')
    .replace(/BГ¶/g, 'Bö')
    .replace(/Bü/g, 'Bü')
    .replace(/вЂњ/g, '“')
    .replace(/вЂќ/g, '”')
    .replace(/CabernetSauvignon/g, 'Cabernet Sauvignon')
    .replace(/SauvignonBlanc/g, 'Sauvignon Blanc')
    .replace(/Sauvignonblanc/g, 'Sauvignon Blanc')
    .replace(/BlancdeNoir/g, 'Blanc de Noir')
    .replace(/GrauburgunderGutswein/g, 'Grauburgunder Gutswein')
    .replace(/WeissburgunderGutswein/g, 'Weissburgunder Gutswein')
    .replace(/SilvanerbrutSektb\.A\./g, 'Silvaner brut Sekt b.A.')
    .replace(/RieslingSektBrut/g, 'Riesling Sekt Brut')
    .replace(/EscherndorfSilvaner/g, 'Escherndorf Silvaner')
    .replace(/EscherndorfRiesling/g, 'Escherndorf Riesling')
    .replace(/BönnigheimChardonnay/g, 'Bönnigheim Chardonnay')
    .replace(/Spätburgundertrocken/g, 'Spätburgunder trocken')
    .replace(/Rieslingtrocken/g, 'Riesling trocken')
    .replace(/Silvanertrocken/g, 'Silvaner trocken')
    .replace(/Chardonnaytrocken/g, 'Chardonnay trocken')
    .replace(/QbAtrocken/g, 'QbA trocken')
    .replace(/([a-zäöüß])([A-ZÄÖÜ])/g, '$1 $2')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function wineryWines(wineryId: string, fallbackImage: string) {
  return wineList
    .filter((wine) => wine.wineryId === wineryId)
    .slice(0, 4)
    .map((wine) => ({
      ...wine,
      displayName: formatWineName(wine.name),
      image: getExactBottleImageSrc(wine.wineryId, wine.name) ?? fallbackImage,
    }));
}

function selectedWineryWines(wineryId: string, names: string[], fallbackImage: string) {
  return names
    .map((name) => wineList.find((wine) => wine.wineryId === wineryId && wine.name === name))
    .filter((wine): wine is WineListItem => Boolean(wine))
    .map((wine) => ({
      ...wine,
      displayName: formatWineName(wine.name),
      image: getExactBottleImageSrc(wine.wineryId, wine.name) ?? fallbackImage,
    }));
}

function docPreviewWines(
  wineryId: string,
  selections: Array<{ name: string; image: string }>
): WineryPreviewWine[] {
  const wines = docWineData[wineryId] ?? [];

  return selections
    .map((selection, index) => {
      const wine = wines.find((item) => item.name === selection.name);
      if (!wine) return null;

      return {
        id: `${wineryId}-${index + 1}`,
        wineryId,
        wineryName: wineriesBase.find((base) => base.id === wineryId)?.name ?? wineryId,
        name: wine.name,
        displayName: formatWineName(wine.name),
        type: wine.type,
        summary: normalizeInlineText(wine.summary),
        analysis: normalizeInlineText(wine.analysis),
        tasting: normalizeInlineText(wine.tasting),
        vinification: normalizeInlineText(wine.vinification),
        soil: normalizeInlineText(wine.soil),
        serving: normalizeInlineText(wine.serving),
        image: selection.image,
      };
    })
    .filter((wine): wine is WineryPreviewWine => Boolean(wine));
}

function docSummary(
  wineryId: string,
  index: number,
  key: 'summary' | 'soil' | 'vinification' | 'tasting' | 'serving'
) {
  return docWineData[wineryId]?.[index]?.[key] ? normalizeInlineText(docWineData[wineryId][index][key]) : '';
}

const estatePhotoAssetByWineryId: Partial<Record<(typeof wineriesBase)[number]['id'], string>> = {
  dautel: '/story/dau-main-6.jpg',
  horst: '/story/hor-13.jpg',
  salwey: '/story/sal-6.jpg',
  hamm: '/wineries/hamm-new-rev.jpg',
  stodden: '/wineries/jean-stodden-new-rev.jpg',
  ludwig: '/wineries/ludwig-new-rev.jpg',
  ress: '/wineries/ress-new-rev.jpg',
  bus: '/wineries/bus-new-rev.jpg',
};

function buildEstateFeatureSection(base: (typeof wineriesBase)[number]): WineryTextSection | null {
  const src = estatePhotoAssetByWineryId[base.id];
  if (!src) return null;

  return {
    id: 'estate',
    role: 'illustration',
    eyebrow: 'エステート',
    title: `${base.japaneseLabel} の風景`,
    body: [
      `${base.name} を紹介するうえで、まず押さえたいのは、この蔵がどのような景観と空気のなかでワインを形づくっているかです。`,
      `${base.region} の文脈を、ボトルだけでなく人と場所の表情まで含めて受け取れるようにするための editorial slot として置いています。`,
    ],
    media: {
      src,
      alt: `${base.name} estate photograph`,
      ratio: 'landscape',
    },
    layout: 'imageLeft',
    tone: 'tinted',
  };
}

function buildGenericEntry(base: (typeof wineriesBase)[number]): WineryEntry {
  const firstWine = docWineData[base.id]?.[0];
  const secondWine = docWineData[base.id]?.[1];
  const estateSection = buildEstateFeatureSection(base);

  return {
    ...base,
    intro: {
      id: 'overview',
      eyebrow: 'Overview',
      title: `${base.name} を FINDEST が扱う理由`,
      body: [
        base.listBlurb,
        firstWine ? normalizeInlineText(firstWine.summary) : base.descriptor,
      ],
      facts: [
        { label: 'Region', value: base.region },
        { label: 'Selection', value: base.descriptor },
      ],
    },
    sections: [
      ...(estateSection ? [estateSection] : []),
      {
        id: 'place',
        eyebrow: 'Terroir / Place',
        title: '土地の文脈',
        body: [
          docSummary(base.id, 0, 'soil') || `${base.region} の土地文脈を、料理との相性まで含めて伝えられることを重視しています。`,
          docSummary(base.id, 0, 'vinification') || '詳細情報は今後拡充予定です。',
        ],
        media: {
          src: base.cardImage,
          alt: `${base.name} vineyard placeholder`,
          ratio: 'landscape',
          caption: 'Image placeholder. 実画像への差し替えを想定した reusable media slot.',
        },
        layout: 'imageRight',
      },
      {
        id: 'style',
        eyebrow: 'Style / Expression',
        title: 'ワインの表情',
        body: [
          docSummary(base.id, 0, 'tasting') || base.descriptor,
          docSummary(base.id, 0, 'serving') || (secondWine ? normalizeInlineText(secondWine.summary) : '代表ワイン情報は今後追加予定です。'),
        ],
        tone: 'tinted',
      },
    ],
    wines: wineryWines(base.id, base.cardImage),
    inquiry: {
      title: '導入相談',
      body: 'レストランやショップの文脈に合わせた提案資料、導入相談、試飲導線の設計についてご案内できます。',
      ctaLabel: 'お問い合わせ',
      ctaHref: '/#contact',
    },
  };
}

const dautelBase = wineriesBase[0];
const horstBase = wineriesBase[1];
const salweyBase = wineriesBase[2];
const hammBase = wineriesBase[3];
const buerklinBase = wineriesBase[4];
const stoddenBase = wineriesBase[5];
const ludwigBase = wineriesBase[6];
const ressBase = wineriesBase[7];
const busBase = wineriesBase[8];
const landererBase = wineriesBase[9];
const dautelEntry: WineryEntry = {
  ...dautelBase,
  templateKey: 'editorial-reference',
  hiddenSectionIds: ['story'],
  descriptor: 'Württemberg / Bönnigheim に根ざし、濃さよりも均整と収束で読ませる辛口を組み立てる family estate。',
  heroCaption: '',
  heroFacts: [],
  intro: {
    id: 'overview',
    role: 'overview',
    eyebrow: '概要',
    title: 'FINDEST が Dautel を基準点として扱う理由',
    body: [
      'Weingut Dautel は、Württemberg の Bönnigheim を拠点とする家族経営のワイナリーです。記録は 1510 年まで遡ります。',
      '1970 年代に Ernst Dautel が estate bottling を再始動して以降、家系の系譜を守りながらも、更新の意志を持ち続けてきた造り手として位置づけられます。',
      '現当主 Christian Dautel は、Geisenheim と Bordeaux で研鑽を積み、父の世代が築いた集中感のあるワイン像に、より洗練された均整とエレガンスを重ねています。重要なのは、単に多くの品種を手がけていることではなく、レンジ全体に一貫した精度が通っている点です。',
      'FINDEST では、単なる密度の高さではなく、果実の素直さと口中の収まりが両立しているかを重視しています。Dautel はその条件を上位レンジだけでなく、Gutswein の段階から静かに満たしており、Württemberg を紹介する際の基準点として扱いやすい生産者です。',
    ],
    facts: [
      { label: '系譜', value: '1510 年から続く家族経営\n1970 年代に新たな輪郭を確立' },
      { label: 'FINDEST の視点', value: 'Gutswein の段階から\n輪郭と収まりが崩れないこと' },
      { label: '醸造の姿勢', value: '凝縮を重さにせず、\n線と均整へ整えていくこと' },
    ],
    tone: 'intro',
  },
  sections: [
    {
      id: 'illustration',
      role: 'heritage-renewal',
      eyebrow: '継承と更新',
      title: '受け継がれる挑戦と更新',
      body: [
        'Dautel を語るうえで重要なのは、長い家系の歴史そのものよりも、その歴史を“守る”だけで終わらせていないことです。',
        '家の系譜を受け継ぎながら、各世代が自分たちの時代に合った輪郭を与えてきた点に、このワイナリーの強さがあります。',
        '前当主 Ernst Dautel は、挑戦者でありパイオニアとして知られ、その姿勢は現在の造りにも通底しています。現当主 Christian Dautel は、ブルゴーニュをはじめ複数の土地での経験を生かし、家の持つ凝縮感に、より整った線とエレガンスを加えています。',
        'Dautel の魅力は、単なる伝統の重みではなく、更新の意思がいまも造りに反映されていることにあります。長く続く家でありながら、ワインが過去の反復ではなく、現在形で語られている点が、この生産者を特別にしています。',
      ],
      media: {
        src: '/story/dau-main-6.jpg',
        alt: 'Weingut Dautel cellar portrait',
        ratio: 'landscape',
      },
      layout: 'imageLeft',
      tone: 'tinted',
    },
    {
      id: 'jakob-d',
      role: 'wine-focus',
      eyebrow: 'ワインフォーカス',
      title: 'Lemberger と Jakob D が示す\nDautel の輪郭',
      body: [
        'Dautel を理解するうえで欠かせないのが、Württemberg を代表する品種である Lemberger です。',
        '力強さに寄りすぎず、果実の芯と構成の美しさを保ちながら、この土地らしい充実感を静かに表現できる品種として、このワイナリーの輪郭を知る手がかりになります。',
        'なかでも「Lemberger」と「Jakob D」は、Dautel の方向性を比較的わかりやすく映し出すワインです。単に濃さや重さを押し出すのではなく、家の系譜の中で受け継がれてきた挑戦の姿勢と、現当主 Christian Dautel による均整とエレガンスへの意識が、一本の中で静かに重なります。',
        'FINDEST にとっても、この二つのワインは Dautel という生産者を紹介する際の重要な鍵になります。土地の個性、造り手の意志、そして家としての覚悟が、過度な説明なしに伝わるワインとして位置づけられます。',
      ],
      media: {
        src: '/story/dau-jak.jpg',
        alt: 'Jakob D bottle studio photograph',
        ratio: 'portrait',
      },
      layout: 'imageLeft',
      tone: 'spotlight',
    },
    {
      id: 'story',
      role: 'essay',
      eyebrow: 'Editorial Reflection',
      title: '果実の厚みだけで終わらせない設計',
      body: [
        'Jakob D. は、深いルビー色。黒系果実（カシス、ブラックベリー）と、森床・きのこ系のニュアンスに、クローヴや土っぽさ、ビーツのような要素が重なる複層的な赤。口当たりは柔らかく、途中にほろ苦さの緊張感が入り、余韻は長くドライ。',
        '2020 DAU Merlot -S- は、甘やかな黒系果実（プラム、ホルンダーベリー、ツヴェッチュゲ）を核に、トンカ豆、マジパン、チョコ、スミレ、バニラの柔らかい層が重なる。口当たりは丸く、後半にスパイスとハーブが出て、長くドライにまとまる。',
        '2017 KREATION rot -S- は、黒系果実の密度とスパイス、細かなタンニン骨格で押し切るセレクション・キュヴェ。温度を上げすぎず、肉料理と合わせて完成するタイプの辛口赤として理解すると Dautel の構成力が見えやすい。',
      ],
      tone: 'essay',
    },
    {
      id: 'recognition',
      role: 'recognition',
      eyebrow: '評価と実績',
      title: '継続して積み上がった評価',
      body: [
        'Dautel は、単発の高評価ではなく、異なる評価軸を持つガイドから長期にわたって安定した認知を受けてきた造り手です。',
        'Gault&Millau、Eichelmann、Jancis Robinson など、見る角度の異なる評価が並ぶことで、ワイナリー全体の完成度が継続的に見られてきたことが伝わります。',
        '1999 年に VDP に加盟していることも、Württemberg の中で早い段階から質的な信頼を得ていた生産者であることを示す一つの指標です。単一の受賞歴としてではなく、時間をかけて積み上がった評価の厚みとして読むのが自然です。',
        'また、Stuttgart の Porsche Museum で 15 年以上オンリストされてきたことも、ラグジュアリーな現場で継続的に選ばれてきた事実として示しやすい要素です。FINDEST のセレクションにおいても、この「継続して選ばれる強さ」は重要な判断材料になります。',
      ],
      facts: [
        { label: 'Gault&Millau', value: '5 房' },
        { label: 'Eichelmann', value: '5つ星' },
        { label: 'Jancis Robinson', value: '18 / 20' },
        { label: 'VDP', value: '1999 年加盟' },
      ],
      tone: 'fact',
    },
  ],
  awards: {
    id: 'falstaff',
    role: 'award',
    eyebrow: 'Falstaff 受賞',
    title: 'ダウテルの受賞（Falstaff）',
    body: [
      'Falstaff Wein-Trophy Deutschland 2023 にて、Weingut Dautel の Christian Dautel が「Winzer des Jahres（生産者・オブ・ザ・イヤー）」に選出されました。',
      'Falstaff 公式では、この選出が約150名の審査員による匿名投票によって決定されたと明記されています。',
      '写真出典：falstaff.com',
    ],
    facts: [
      { label: '受賞名', value: 'Winzer des Jahres 2023' },
      { label: '発表', value: 'Falstaff Wein-Trophy Deutschland 2023' },
      { label: '選考方法', value: '約150名の審査員による匿名投票' },
    ],
    media: {
      src: '/story/daut-win.jpg',
      alt: 'Weingut Dautel Falstaff award supporting visual',
      ratio: 'landscape',
    },
    layout: 'imageLeft',
    tone: 'spotlight',
  },
  gallery: {
    eyebrow: '風景と空気',
    title: '風景、セラー、ワインの気配',
    intro:
      'ここでは説明の言葉から少し離れ、畑、セラー、ボトル、造り手の温度感を視覚で受け取れるようにしています。人、空間、土地の表情を通して、Dautel のワインが生まれる背景を静かに感じられる構成です。',
      images: [
        {
          src: '/story/dau-main-5.jpg',
          alt: 'Weingut Dautel main gallery image',
        },
        {
          src: '/story/dau-main-3.jpg',
          alt: 'Dautel supporting gallery image 1',
        },
        {
          src: '/story/dau-main-4.jpg',
          alt: 'Dautel supporting gallery image 2',
        },
        {
          src: '/story/dau-20.jpg',
          alt: 'Dautel supporting gallery image 3',
        },
        {
          src: '/story/dau-main-7.jpg',
          alt: 'Dautel supporting gallery image 4',
        },
        {
          src: '/story/dau-main-2.jpg',
          alt: 'Dautel supporting gallery image 5',
        },
      ],
    },
  video: {
    eyebrow: 'Moving Image',
    title: '映像で伝える Dautel の輪郭',
    body: [
      '現行の Dautel 構成にあった video block を、埋め込み前提ではなく上質なプレースホルダーとして再構成。最終動画が未確定でも、ページ全体のリズムを崩さず差し替えられるようにしている。',
      '2017 Spätburgunder Forstberg GG では、厳しい収量制限と完熟判断に基づく選果・選摘、木製槽での長い醸し発酵、自生酵母、自然なマロラクティック発酵、小樽約 12 か月＋大樽約 10 か月熟成という構成が示される。Dautel の映像素材も、こうした precision を伝える役割を持たせたい。',
    ],
    poster: {
      src: '/story/daut-vid.png',
      alt: 'Dautel video placeholder',
      ratio: 'wide',
    },
    ctaHref: 'https://www.youtube.com/watch?v=D16nw-bn3ko&ab_channel=GermanWine',
  },
  wines: wineryWines('dautel', '/story/daut-win.jpg'),
  inquiry: {
    title: '導入相談',
    body: 'Dautel のラインナップをレストランやショップにどう組み込むか、温度帯やペアリングまで含めてご相談いただけます。',
    ctaLabel: '資料請求',
    ctaHref: '/#contact',
  },
};

const horstEntry: WineryEntry = {
  ...horstBase,
  templateKey: 'editorial-reference',
  region: 'Franken｜Escherndorf',
  descriptor: 'シルヴァーナーを軸に、エッシャーンドルフの土地の輪郭を、端正にワインへ映す造り手。',
  heroBody: [
    'シルヴァーナーを軸に、エッシャーンドルフの土地の輪郭を、端正にワインへ映す造り手。',
    'フランケンのなかでも、とりわけ印象的な産地として知られるエッシャーンドルファー・ルンプ。Horst Sauer は、この土地の個性を静かに見極めながら、長く記憶に残る辛口ワインへと結びつけてきた生産者です。',
  ],
  heroImage: '/story/hor-12.jpg',
  heroCaption: '写真提供：Weingut Horst Sauer',
  heroFacts: [],
  intro: {
    id: 'overview',
    role: 'overview',
    eyebrow: '概要',
      title: 'FINDEST が\nHorst Sauer を\n大切に扱う理由',
      body: [
        'ホルスト・ザウアーは、フランケンという土地の個性を、地元品種シルヴァーナーを通して明快に示してきた造り手です。',
        'この蔵の魅力は、力強さを誇張することではなく、畑の条件と品種の個性を丁寧に読み取り、それを味わいへ無理なくつなげている点にあります。',
        'とくにエッシャーンドルフ周辺の畑は、急斜面と石灰質土壌に支えられ、ワインに輪郭、奥行き、そして持続する緊張感を与えます。',
        'FINDEST がこの蔵を大切に扱うのは、評価の高さだけではありません。',
        '土地の個性を守りながら、その味わいがきちんとワインに表れるよう造る姿勢に、明確な説得力があるからです。',
      ],
      facts: [
        { label: '位置づけ', value: 'フランケンを代表する造り手' },
        { label: '産地', value: 'エッシャーンドルフを体現する蔵' },
        { label: '品種', value: 'シルヴァーナーで示される土地の個性' },
        { label: '辛口', value: '畑の味わいを重視する辛口' },
      ],
    tone: 'intro',
  },
  sections: [
    {
      id: 'philosophy',
      role: 'heritage-renewal',
      eyebrow: '造りの姿勢',
      title: '夢・忍耐・自己批判\nその言葉が支える造り',
      body: [
        'ホルスト・ザウアーの造りを支えているのは、強い意志だけではありません。季節の移り変わりに従い、ぶどうの成長、熟度、収穫、そしてセラーでの判断を、ひとつずつ丁寧に積み重ねていく姿勢です。',
        '彼らが大切にしているのは、注意深さ、経験、そして直感です。自然をよく観察し、その年にとって必要な選択を見極めること。そうして健全で香り高いぶどうを収穫し、最終的に「味わいが畑から生まれる」ワインへとつなげていきます。',
        '派手な主張ではなく、長く磨かれてきた判断の精度。その静かな積み重ねが、Horst Sauer の輪郭になっています。',
      ],
      media: {
        src: '/story/hor-19.jpg',
        alt: 'Weingut Horst Sauer vineyard landscape',
        ratio: 'landscape',
        caption: '写真提供：Weingut Horst Sauer',
      },
      layout: 'imageLeft',
      tone: 'tinted',
    },
    {
      id: 'terroir',
      eyebrow: '土地の文脈',
      title: '急斜面と石灰質土壌が\nワインに骨格を与える',
      body: [
        'ホルスト・ザウアーの畑があるフランケン、そしてエッシャーンドルフ周辺の景観は、この蔵にとって単なる背景ではありません。守り受け継ぐべき風景であり、ワインの個性そのものを支える基盤でもあります。',
        'この地のワインを支えているのは、急斜面の畑と、Muschelkalk、Lettenkeuper、Lösslehm から成る土壌です。そうした条件が、ワインに厚み、石灰質由来のミネラル感、そして余韻にかけて広がる奥行きを与えます。',
        'Horst Sauer のワインには、フランケンらしい骨格の強さがあります。その一方で、ただ硬質なだけではなく、飲み心地の良さと表現の明快さを失わないところに、この蔵らしさがあります。',
      ],
      media: {
        src: '/story/hor-8.jpg',
        alt: 'Weingut Horst Sauer estate image',
        ratio: 'landscape',
      },
      layout: 'imageRight',
      tone: 'tinted',
    },
    {
      id: 'wine-focus',
      role: 'wine-focus',
      eyebrow: 'ワインフォーカス',
      title: 'シルヴァーナーに表れる\nHorst Sauer の輪郭',
      body: [
        'この蔵の個性をもっとも素直に映し出す品種が、シルヴァーナーです。',
        '入り口としては JUST Silvaner が親しみやすく、より土地の個性に近づくなら Escherndorfer Lump のシルヴァーナーへ進む。Horst Sauer では、その段階の違いまで含めて、品種と土地の関係が明快に示されています。',
        '果実のふくらみ、土壌由来のミネラル感、そして辛口としての引き締まり。地元品種を、その土地ならではの説得力へと高めているのが、この蔵の強さです。',
        ],
        media: {
          src: '/story/hor-15.jpg',
          alt: 'Horst Sauer Silvaner bottle photograph',
          ratio: 'portrait',
          caption: '写真提供：Weingut Horst Sauer',
        },
        layout: 'imageLeft',
      tone: 'spotlight',
    },
      {
        id: 'recognition',
        role: 'recognition',
        eyebrow: '評価と実績',
        title: '継続して積み上がった評価',
        body: [
          'Horst Sauer は、単発の話題や一度きりの高評価ではなく、長い時間をかけて信頼を積み上げてきた生産者です。',
          'ガイド評価、個別ワイン評価、そして VDP 加盟といった複数の指標から見ても、この蔵が継続して高く認識されてきたことが伝わります。',
          '個別の受賞歴として並べるよりも、畑・品種・造りの一貫性が長く評価されてきたことの表れとして読むのが自然です。',
        ],
        facts: [
          { label: 'Gault&Millau', value: '5黒房' },
          { label: 'Eichelmann', value: '5つ星' },
          { label: 'Falstaff', value: '93+ 点' },
          { label: 'VDP', value: '2001年加盟' },
        ],
        tone: 'fact',
      },
  ],
    gallery: {
      eyebrow: '風景と空気',
      title: 'エッシャーンドルフの風景と、\nそこに続く畑仕事',
      intro:
        'ここでは説明を少し離れ、畑の空気、ボトルの佇まい、そしてフランケンらしい輪郭を視覚から受け取れるようにしています。土地、人、品種の気配を静かにつなぐためのギャラリーです。',
      images: [
        {
          src: '/story/hor-6.jpg',
          alt: 'Weingut Horst Sauer main gallery image',
        },
        {
          src: '/story/hor-4.jpg',
          alt: 'Horst Sauer supporting gallery image 1',
        },
        {
          src: '/story/hor-5.jpg',
          alt: 'Horst Sauer supporting gallery image 2',
        },
        {
          src: '/story/hor-9.jpg',
          alt: 'Horst Sauer supporting gallery image 3',
        },
        {
          src: '/story/hor-10.png',
          alt: 'Horst Sauer supporting gallery image 4',
        },
      ],
  },
    video: {
      eyebrow: '映像',
      title: '映像で知る\nHorst Sauer の土地と造り',
      body: [
          '土地の個性と、ワインが畑から生まれるまでの考え方を、映像で静かにたどる。',
        ],
        poster: {
          src: '/story/hor-16.png',
          alt: 'Horst Sauer video placeholder',
          ratio: 'wide',
          caption: '写真提供：Weingut Horst Sauer',
        },
      ctaHref: 'https://www.youtube.com/results?search_query=Weingut+Horst+Sauer',
    },
  winesIntro: [
    '地元品種シルヴァーナーを軸に、',
    'フランケンの個性が端正に表れたセレクション。',
  ],
  wines: selectedWineryWines(
    'horst',
    [
      '2022 Just Silvaner trocken Gutswein',
      '2024 EscherndorfSilvanertrocken',
      '2023 Escherndorf Riesling trocken',
      '2023 SilvanerbrutSektb.A.',
    ],
    '/story/Hor-Esch-Silv-24.png'
  ),
  inquiry: {
    title: '導入相談',
    body: '飲食店・小売店・業務用でのご提案、試飲、資料共有をご希望の方は、こちらからお問い合わせください。',
    ctaLabel: '資料請求',
    ctaHref: '/#contact',
  },
};

const salweyEntry: WineryEntry = {
  ...salweyBase,
  templateKey: 'editorial-reference',
  region: 'Baden｜Kaiserstuhl',
  descriptor: 'ブルゴーニュ品種に軸を置き、辛口を一貫して貫く造り手。',
  heroBody: [
    'ブルゴーニュ品種に軸を置き、辛口を一貫して貫く造り手。',
    '静かな精度と奥行きを備えたワインが、Salweyの輪郭を形づくります。',
  ],
  heroImage: '/story/sal-12.jpg',
  heroCaption: '',
  heroFacts: [],
  intro: {
    id: 'overview',
    role: 'overview',
    eyebrow: '概要',
    title: 'FINDESTが\nSalweyを扱う理由',
    body: [
      'Salwey は、土地と品種の輪郭を過不足なくワインへつなげるワイナリーです。',
      '派手さに頼らず、料理に品位を添えながら印象を残せること。説明しやすさと実飲での納得感が両立していることが、FINDEST がこの蔵を扱う理由です。',
    ],
    facts: [
      { label: '産地', value: 'Kaiserstuhl を軸に据える' },
      { label: '専門性', value: 'Burgunder に集中し、常に dry' },
      { label: '畑', value: '火山性土壌と手仕事の積み重ね' },
      { label: '印象', value: '静かな精度と、抑制された奥行き' },
    ],
    tone: 'intro',
  },
  sections: [
    {
      id: 'philosophy',
      role: 'heritage-renewal',
      eyebrow: '造りの姿勢',
      title: '受け継がれる哲学と、\nいまの造り',
      body: [
        'Salwey で受け継がれているのは、家の物語よりも、造りを整えるための考え方です。',
        'Burgunder に集中すること、常に dry であること、そしてセラーで時間を急がないこと。その方向性は現在の造りにも静かに引き継がれています。',
        'この蔵では、伝統は飾りではありません。土地と品種をまっすぐに表すための、抑制の効いた方法として生きています。',
      ],
      media: {
        src: '/story/sal-21.jpg',
        alt: 'Weingut Salwey reflective portrait',
        ratio: 'landscape',
      },
      layout: 'imageLeft',
      tone: 'tinted',
    },
    {
      id: 'wine-focus',
      role: 'wine-focus',
      eyebrow: 'ワインフォーカス',
      title: 'Spätburgunderが示す\nSalweyの奥行き',
      body: [
        'Salwey を理解するうえで、Spätburgunder はもっとも有効な入口のひとつです。',
        'この蔵の Spätburgunder は、濃さや樽の派手さで引っ張るのではなく、果実の純度、酸の流れ、そして土壌由来の緊張感を静かな構造として見せます。',
        '畑ごとの差と、時間によって整えられた深さが、ここでは特に明快です。密度を節度のなかに収めるところに、Salwey の美意識があります。',
      ],
      media: {
        src: '/story/sal-6.jpg',
        alt: 'Weingut Salwey reflective winery image',
        ratio: 'landscape',
      },
      layout: 'imageLeft',
      tone: 'spotlight',
    },
    {
      id: 'recognition',
      role: 'recognition',
      eyebrow: '評価と実績',
      title: '積み重ねられてきた信頼',
      body: [
        'Salwey の価値は、単発の話題性ではなく、整った輪郭を長く保ち続けてきたことにあります。',
        'その継続性が、導入時の説明のしやすさと、実際に飲んだときの印象の安定感につながります。',
      ],
      facts: [
        { label: '位置づけ', value: 'Kaiserstuhlを代表する\nBurgunderの造り手' },
        { label: '評価', value: 'Eichelmann 5つ星\nGault&Millau 5葡萄の評価実績' },
        { label: '一貫性', value: '白でも赤でも\ndryな輪郭と精度を維持' },
        { label: '導入視点', value: '説明しやすく\n実飲でも印象がぶれにくい' },
      ],
      tone: 'fact',
    },
  ],
  awards: {
    id: 'kaiserstuhl',
    role: 'award',
    eyebrow: '産地の文脈',
    title: 'Kaiserstuhlが\nSalweyを形づくる',
    body: [
      'Salwey のワインを理解するうえで欠かせないのが、Baden のなかでも個性の明確な Kaiserstuhl という産地です。',
      'この地域は日照に恵まれ、火山由来の岩盤や loess を含む複雑な土壌条件を持っています。そうした環境が、Burgunder に厚みと張り、明快な輪郭を与えます。',
      'Salwey では、手摘みと丁寧な選果を基本に、山のセラーで落ち着いた環境のなか時間をかけてワインを整えています。',
      '産地の力をそのまま誇張するのではなく、忍耐と抑制を通して端正なかたちへまとめていくことが、この蔵の仕事です。',
    ],
    facts: [
      { label: '産地', value: 'Baden / Kaiserstuhl' },
      { label: '主軸品種', value: 'Spätburgunder / Grauburgunder / Weissburgunder' },
      { label: '畑仕事', value: '手摘みと丁寧な選果を重視' },
      { label: '方針', value: 'Immer Burgunder. Immer trocken.' },
    ],
    media: {
      src: '/story/sal-10.jpg',
      alt: 'Kaiserstuhl terroir visual for Weingut Salwey',
      ratio: 'landscape',
    },
    layout: 'imageLeft',
    tone: 'spotlight',
  },
  gallery: {
    eyebrow: '風景と空気',
    title: '霧、山の気配、\nそしてセラーの静けさ',
    intro:
      '斜面の空気と、セラーの静けさを視覚から受け取るためのギャラリーです。',
    images: [
      {
        src: '/story/sal-15.jpg',
        alt: 'Weingut Salwey main gallery image',
      },
      {
        src: '/story/sal-6.jpg',
        alt: 'Salwey supporting gallery image 1',
      },
      {
        src: '/story/sal-3.jpg',
        alt: 'Salwey supporting gallery image 2',
      },
      {
        src: '/story/sal-11.jpg',
        alt: 'Salwey supporting gallery image 3',
      },
      {
        src: '/story/sal-14.jpg',
        alt: 'Salwey supporting gallery image 4',
      },
    ],
  },
  video: {
    eyebrow: '映像',
    title: '映像でたどる\nSalweyの風土と仕事',
    body: [],
    poster: {
      src: '/story/sal-17.png',
      alt: 'Salwey video placeholder',
      ratio: 'wide',
    },
    ctaHref: 'https://www.youtube.com/results?search_query=Weingut+Salwey',
  },
  winesIntro: ['Burgunder を軸に、土地の輪郭が静かに表れたセレクション。'],
  wines: selectedWineryWines(
    'salwey',
    [
      '2024 Weissburgunder Gutswein',
      '2024 Grauburgunder Gutswein',
      '2016 Oberrotweil Spätburgunder RS',
      '2022 KaiserstuhlSpätburgunder',
    ],
    '/story/Sal-grauburg-23.png'
  ),
  inquiry: {
    title: '導入相談',
    body: 'Salwey のラインナップを飲食店・小売店・業務用の文脈でどうご提案するか、資料共有や試飲のご相談を含めてご案内できます。',
    ctaLabel: '資料請求',
    ctaHref: '/#contact',
  },
};

const hammEntry: WineryEntry = {
  ...hammBase,
  templateKey: 'editorial-reference',
  region: 'Rheingau｜Winkel',
  descriptor: 'ラインガウの伝統を土台に、BIOと新しい世代の感性で輪郭を磨き続ける造り手。',
  heroBody: [
    'ラインガウの伝統を土台に、BIOと新しい世代の感性で輪郭を磨き続ける造り手。',
    'Hamm は、ラインガウの中心で長く家族経営を続けてきたワイナリーです。1990年から有機認証を受け、現在は Aurelia Hamm の世代が加わることで、伝統を土台にしながら新しい表現へと静かに歩みを進めています。',
  ],
  heroImage: '/story/hamm.jpg',
  heroCaption: '',
  heroFacts: [],
  intro: {
    id: 'overview',
    role: 'overview',
    eyebrow: '概要',
    title: 'FINDEST が\nWeingut Hamm を\n大切に扱う理由',
    body: [
      'Hamm の魅力は、ラインガウらしい端正なリースリングを軸にしながら、有機栽培への早い取り組みと、世代交代による新しい輪郭の両方を備えている点にあります。',
      '1990年から有機認証を受けてきたこの蔵では、流行としてではなく、土地と向き合う姿勢としてBIOが根づいてきました。そこに現在は、Aurelia Hamm の世代が加わり、伝統を土台にしながらも、自身の感覚を反映した造りへと更新が進んでいます。',
      'FINDEST が Hamm を大切に扱うのは、単に歴史があるからではありません。ラインガウの品格を保ちながら、次の世代の言葉でそれを磨き直している点に、明確な魅力があるからです。',
    ],
    facts: [
      { label: '経営', value: 'ラインガウの家族経営' },
      { label: '栽培', value: '1990年からの有機認証' },
      { label: '品種', value: '90%を占めるリースリング' },
      { label: '現在地', value: '次世代による更新' },
    ],
    tone: 'intro',
  },
  sections: [
    {
      id: 'philosophy',
      role: 'heritage-renewal',
      eyebrow: '造りの姿勢',
      title: '伝統を受け継ぎながら、\n自分の輪郭を磨く造り',
      body: [
        'Hamm は4代にわたり家族で受け継がれてきたワイナリーです。現在は Aurelia Hamm が新しい世代として加わり、歴史ある蔵に静かな更新をもたらしています。',
        '彼女自身の言葉でも、大切なのは「伝統を守ること」と「自分の手で自分の輪郭をつくること」の両立です。それは過去を否定することではなく、受け継いだ土台のうえで、自分の時代の表現を育てていくことでもあります。',
      ],
      media: {
        src: '/story/hamm (7).jpg',
        alt: 'Weingut Hamm Aurelia portrait photograph',
        ratio: 'landscape',
      },
      layout: 'imageLeft',
      tone: 'tinted',
    },
    {
      id: 'terroir',
      eyebrow: '土地の文脈',
      title: 'ライン川とタウヌス山地に守られた\nラインガウの骨格',
      body: [
        'ラインガウでは、南向きの畑が十分な日照を受け、さらにライン川の反射光と蓄熱の働きがぶどう栽培を支えています。北側ではタウヌス山地が冷たい風や強い雨を和らげ、この地域ならではの穏やかな環境を形づくっています。',
        '土壌は一様ではなく、場所によってレス、ローム、砂質土壌、スレート、珪岩などが現れます。Hamm のワインは、そうしたラインガウの多層的な条件を背景に、明るい果実味と輪郭のある酸、そして端正な余韻へとつながっています。',
      ],
      media: {
        src: '/story/hamm (122).png',
        alt: 'Weingut Hamm Rheingau landscape',
        ratio: 'landscape',
      },
      layout: 'imageRight',
      tone: 'tinted',
    },
    {
      id: 'wine-focus',
      role: 'wine-focus',
      eyebrow: 'ワインフォーカス',
      title: 'リースリングに表れる\nWeingut Hamm の輪郭',
      body: [
        'Hamm の中心にあるのは、やはりリースリングです。',
        '軽やかな果実味を前に出した Gutswein、部分的に木樽発酵を取り入れた Alte Reben、そしてスレート土壌の個性を映す Dachsberg。同じ品種のなかでも、醸造と畑の違いによって表情を描き分けているのが、この蔵の面白さです。',
        '果実の明るさを保ちながら、産地の輪郭へときちんと着地させること。そのバランス感覚に、Weingut Hamm の現在地があります。',
      ],
      media: {
        src: '/story/hamm (16).jpg',
        alt: 'Weingut Hamm Riesling bottle photograph',
        ratio: 'portrait',
      },
      layout: 'imageLeft',
      tone: 'spotlight',
    },
    {
      id: 'recognition',
      role: 'recognition',
      eyebrow: '評価と実績',
      title: '継続して積み重なった信頼',
      body: [
        'Hamm の価値は、単発の話題性ではなく、長く積み上げてきた姿勢の一貫性にあります。',
        '4代続く家族経営、1990年からの有機認証、そして現在の世代による更新。ラインガウの土地と向き合いながら、日常のワインから上位レンジまで丁寧に表現を積み重ねてきたことが、この蔵の信頼につながっています。',
        '派手な実績の羅列よりも、継続して守られてきた質の感覚として読むのが自然です。',
      ],
      facts: [
        { label: 'Gault&Millau', value: '3房' },
        { label: '家族経営', value: '4代続く家族経営' },
        { label: 'BIO', value: '1990年から有機認証' },
        { label: '世代交代', value: '2015 / 2016 世代交代' },
      ],
      tone: 'fact',
    },
  ],
  awards: {
    id: 'japan-connection',
    role: 'award',
    eyebrow: '歴史の接点',
    title: '日本との静かな接点',
    body: [
      'Hamm の歴史を語るうえで、日本との接点も見過ごせません。',
      'Heinrich Hamm は、日本の初期ワイン造りに関わる技術指導の文脈で言及される存在です。サントリー登美の丘ワイナリーの沿革でも、近代的なワイン造りの先駆けとして、ドイツから招かれた醸造技師ハインリッヒ・ハムの名が記されています。',
      'このページでは、それを大きな神話として強調するのではなく、ドイツと日本のワイン文化のあいだに実際に存在した接点として、静かに位置づけるのがふさわしいでしょう。FINDEST にとってもこの背景は、単なる逸話ではなく、日本でこのワインを紹介する意味に自然な奥行きを与える要素です。',
    ],
    facts: [
      { label: '歴史', value: '日本初期の醸造技術指導の文脈で言及' },
      { label: '位置づけ', value: '神話化せず、実在した接点として扱う' },
    ],
    media: {
      src: '/story/49. HAMM_２世代前ハインリッヒハム氏1913年大正時代ドイツから日本で最初のリースリングを誕生.jpg',
      alt: 'Weingut Hamm cellar atmosphere photograph',
      ratio: 'landscape',
    },
    layout: 'imageLeft',
    tone: 'spotlight',
  },
  gallery: {
    eyebrow: '風景と空気',
    title: 'ラインガウの風景と、\nそこに続く家族の仕事',
    intro:
      'ここでは説明を少し離れ、畑の空気、家族の気配、そしてラインガウらしい輪郭を視覚から受け取れるようにしています。土地、人、品種のつながりを静かに感じてもらうためのギャラリーです。',
    images: [
      {
        src: '/story/hamm (9).jpg',
        alt: 'Weingut Hamm main gallery image',
      },
      {
        src: '/story/hamm (13).jpg',
        alt: 'Weingut Hamm supporting gallery image 1',
      },
      {
        src: '/story/hamm (17).jpg',
        alt: 'Weingut Hamm supporting gallery image 2',
      },
      {
        src: '/story/hamm (16).jpg',
        alt: 'Weingut Hamm supporting gallery image 3',
      },
      {
        src: '/story/hamm (1).jpg',
        alt: 'Weingut Hamm supporting gallery image 4',
      },
    ],
  },
  video: {
    eyebrow: '映像',
    title: '映像で知る\nWeingut Hamm の土地と造り',
    body: [
      'ラインガウの空気と、世代を超えて受け継がれる造りの姿勢を、映像で静かにたどる。',
    ],
    poster: {
      src: '/story/dww.png',
      alt: 'Weingut Hamm video placeholder',
      ratio: 'wide',
    },
    ctaHref: 'https://www.youtube.com/results?search_query=Weingut+Hamm+Rheingau',
  },
  winesIntro: [
    'リースリングを軸に、',
    'ラインガウらしい明るさと輪郭を備えたセレクション。',
  ],
  wines: selectedWineryWines(
    'hamm',
    [
      '2017 Rheingau Riesling trocken',
      '2017 RheingauRieslingfeinherb',
      '2017 Winkel Riesling Alte Reben feinherb',
      '2020 WinkelDachsbergRieslingtrocken',
    ],
    '/story/hamm-rhein-riesl-17.png'
  ),
  inquiry: {
    title: '導入相談',
    body: '飲食店・小売店・業務用でのご提案、試飲、資料共有をご希望の方は、こちらからお問い合わせください。',
    ctaLabel: '資料請求',
    ctaHref: '/#contact',
  },
};

const buerklinEntry: WineryEntry = {
  ...buerklinBase,
  templateKey: 'editorial-reference',
  region: 'Pfalz｜Mittelhaardt',
  descriptor: '歴史ある名門の格と先見的な転換を、辛口リースリングの現在形へと結びつけるファルツの生産者。',
  heroBody: [
    '1597年創業。\n受け継がれてきた名門\nDr. Bürklin-Wolf。',
    'その価値は、長い歴史そのものではなく、\n現在の品質へと接続された\n格ある辛口リースリングにあります。',
  ],
  heroImage: '/story/wolf-1 (20).jpg',
  heroImagePosition: '58% 36%',
  heroCaption: '',
  heroFacts: [],
  intro: {
    id: 'overview',
    role: 'overview',
    eyebrow: '概要',
    title: 'FINDESTが\nBürklin-Wolfを扱う理由',
    body: [
      'Bürklin-Wolfを大切にしているのは、単に名門だからではありません。',
      '歴史、畑、栽培、熟成。そのすべてが、一貫した品質思想として結びついているからです。',
      'ファルツのトップサイトから生まれる辛口リースリングは、華やかさだけでなく、構造、伸び、熟成の余地によって格を示します。',
      '導入時には説明しやすく、実際に飲めばさらに説得力がある。それが、FINDESTにとっての Bürklin-Wolfの強さです。',
    ],
    facts: [
      { label: '創業', value: '1597年' },
      { label: '転換', value: '1990年以降 Bettina 体制で更新' },
      { label: '栽培', value: '2005年より\n全面ビオディナミ' },
      { label: '位置づけ', value: 'ファルツを代表する\n辛口リースリングの名門' },
    ],
    tone: 'intro',
  },
  sections: [
    {
      id: 'leadership',
      role: 'heritage-renewal',
      eyebrow: '造りの思想',
      title: '受け継がれた名門を、\n未来へ接続する視点',
      body: [
        'Bettina Bürklin-von Guradzeの役割は、名門を受け継ぐことだけではありません。',
        '受け継がれた遺産を、いまの品質へどう接続するか。その視点こそが、現在の Bürklin-Wolfを形づくっています。',
        'ビオディナミへの全面転換も、畑の階層を読み直す姿勢も、過去を飾るためではなく、未来に耐える精度をつくるための選択でした。',
        '“祖先の遺産の管理人”という言葉には、この蔵の品格と責任の両方が静かに表れています。',
      ],
      media: {
        src: '/story/wolf-1 (31).jpg',
        alt: 'Weingut Dr. Bürklin-Wolf estate photograph',
        ratio: 'landscape',
      },
      layout: 'imageLeft',
      tone: 'tinted',
    },
    {
      id: 'wine-focus',
      role: 'wine-focus',
      eyebrow: 'ワインフォーカス',
      title: 'Rieslingで見える\nBürklin-Wolfの格',
      body: [
        'Bürklin-Wolfを理解するうえで、最も明快な入口はRieslingです。',
        'この蔵のリースリングは、果実の印象だけで終わりません。畑ごとの差異、緊張感のある構造、そして熟成によって広がる奥行きまでを、ひとつの輪郭として示します。',
        '強さを誇張せず、それでいて格がある。その抑制と威厳の両立に、Bürklin-Wolfらしさが表れています。',
      ],
      media: {
        src: '/story/bur-riesl-22.png',
        alt: 'Dr. Bürklin-Wolf Riesling bottle photograph',
        ratio: 'portrait',
      },
      layout: 'imageLeft',
      tone: 'spotlight',
    },
    {
      id: 'recognition',
      role: 'recognition',
      eyebrow: '評価と実績',
      title: '積み重ねられてきた\n評価と信頼',
      body: [
        'Bürklin-Wolfは、単発の高評価で語られる蔵ではありません。',
        '長い時間をかけて、世界水準の辛口リースリングを積み上げてきたこと。その継続性こそが、このワイナリーの信頼を支えています。',
      ],
      facts: [
        { label: '位置づけ', value: 'ドイツを代表する\n辛口リースリングの名門' },
        { label: '評価', value: 'Eichelmann 5つ星\nGault&Millau 5葡萄の評価実績' },
        { label: '規模と格', value: '400年以上にわたり続く\n歴史ある大規模エステート' },
        { label: '導入視点', value: '説明しやすく、\n熟成価値まで伝えやすい' },
      ],
      tone: 'fact',
    },
    {
      id: 'classification',
      eyebrow: '土地の文脈',
      title: 'テロワールを\n階層で読むという思想',
      body: [
        'Bürklin-Wolfの特徴は、テロワールを言葉だけで終わらせないことです。',
        'この蔵では、歴史的な畑評価とブルゴーニュ的な発想を参照しながら、所有畑を階層として読み直してきました。',
        'G.C.、P.C.、Village、Estate。それは単なる格付けではなく、土地の違いをどう伝えるかという思想です。',
        'また、ビオディナミはその表現を支える実践でもあります。土壌の生命力を高め、畑ごとの個性をより明瞭に映すための方法として位置づけられています。',
      ],
      media: {
        src: '/story/wolf-1 (42).jpg',
        alt: 'Dr. Bürklin-Wolf estate Riesling bottle photograph',
        ratio: 'portrait',
      },
      layout: 'imageRight',
      tone: 'tinted',
    },
  ],
  gallery: {
    eyebrow: '風景と空気',
    title: '古樽、庭園、\nそして受け継がれる景観',
    intro:
      'Bürklin-Wolfの魅力は、畑だけでは完結しません。\n\n古樽、庭園、建物、そして長く守られてきた景観。時間の蓄積そのものが、この蔵の格を静かに形づくっています。',
    images: [
      {
        src: '/story/wolf-1 (58).jpg',
        alt: 'Dr. Bürklin-Wolf main gallery image',
      },
      {
        src: '/story/wolf-1 (57).jpg',
        alt: 'Dr. Bürklin-Wolf supporting gallery image 1',
      },
      {
        src: '/story/wolf-1 (21).jpg',
        alt: 'Dr. Bürklin-Wolf supporting gallery image 2',
      },
      {
        src: '/story/wolf-1 (19).jpg',
        alt: 'Dr. Bürklin-Wolf supporting gallery image 3',
      },
      {
        src: '/story/wolf-1 (50).jpg',
        alt: 'Dr. Bürklin-Wolf supporting gallery image 4',
      },
    ],
  },
  video: {
    eyebrow: '映像',
    title: '映像でたどる\nBürklin-Wolfの風土と仕事',
    body: [],
    poster: {
      src: '/story/wolf-1 (32).jpg',
      alt: 'Dr. Bürklin-Wolf video placeholder',
      ratio: 'wide',
    },
    ctaHref: 'https://www.youtube.com/results?search_query=Dr.+B%C3%BCrklin-Wolf',
  },
  winesIntro: [
    'VillageからG.C.まで、',
    '土地ごとの差と階層の思想を\n明確に映し出すラインナップ。',
    '導入向けの一本から、',
    '格と熟成を備えた上位キュヴェまで、\nBürklin-Wolfの哲学が\n一貫して流れています。',
  ],
  wines: wineryWines('buerklinwolf', '/story/bur-riesl-22.png').map((wine) => ({
    ...wine,
    image: wine.name === '2017 FASS 68 Ruppertsberger Riesling' ? '/story/bur-fass68-17.png' : '/story/bur-riesl-22.png',
  })),
  inquiry: {
    title: '導入相談',
    body: '飲食店・小売店・業務用でのご提案、試飲、資料共有をご希望の方は、こちらからお問い合わせください。',
    ctaLabel: '資料請求',
    ctaHref: '/#contact',
  },
};

const stoddenEntry: WineryEntry = {
  ...stoddenBase,
  templateKey: 'editorial-reference',
  name: 'Jean Stodden',
  region: 'Rech an der Ahr',
  descriptor: 'アールの冷涼地が磨く、静かな強度のシュペートブルグンダー。',
  heroBody: [
    'アールの冷涼地が磨く、\n静かな強度のシュペートブルグンダー',
    '1578年から続く家族の系譜。急斜面の畑、スレート主体の土壌、そして長期熟成を見据えた造り。Jean Stodden は、アールという土地がもつ緊張感を、端正で伸びのある赤ワインへと結びます。',
    'Spätburgunder を核とする赤ワイン生産者',
  ],
  heroImage: '/story/Journal_Auf-ein-Glas-mit_Alexander_Stodden-5420-0.jpg',
  heroImagePosition: '30% 22%',
  heroCaption: '',
  heroFacts: [],
  intro: {
    id: 'overview',
    role: 'overview',
    eyebrow: '概要',
    title: 'FINDEST が\nJean Stodden を扱う理由',
    body: [
      'Jean Stodden の魅力は、単に評価の高さにあるわけではありません。アールという冷涼な産地で、シュペートブルグンダーを長い時間軸で捉え、畑の張りや土壌の輪郭を、静かに積み上げている点にあります。',
      '果実の豊かさだけに頼るのではなく、酸、ミネラル、タンニン、そして熟成の余白まで含めて全体を整えている。そのため、飲んだ瞬間の華やかさよりも、時間とともに奥行きが見えてくるワインとして印象に残ります。',
      'FINDEST では、こうした“土地の緊張感を品格へと変えていける造り手”として、Jean Stodden を大切な生産者のひとつと位置づけています。',
    ],
    facts: [
      { label: '系譜', value: '1578年から続くアールの家族経営' },
      { label: '主軸', value: 'Spätburgunder 中心の造り' },
      { label: '骨格', value: '急斜面とスレートが支える骨格' },
    ],
    tone: 'intro',
  },
  sections: [
    {
      id: 'heritage',
      role: 'heritage-renewal',
      eyebrow: '造りの姿勢',
      title: '受け継がれる赤の思想と、\n磨き続ける造り',
      body: [
        'Jean Stodden は、1578年からアールに根を張る家族経営のワイナリーです。長い年月のなかで、赤ワイン生産者としての輪郭を少しずつ磨き上げ、現在に至るまでこの地のシュペートブルグンダーを軸に歩んできました。',
        'この造り手の核にあるのは、伝統を“守ること”で終わらせない姿勢です。自然と向き合いながら、毎年の積み重ねによって完成度を高めていく。大きな変化を語るのではなく、畑とワインの精度を静かに磨いていくところに、この家の強さがあります。',
        'また、Jean Stodden のワインには、古木や急斜面の畑に支えられた集中感と、時間に耐える構成の美しさが通っています。派手さではなく、輪郭の確かさによって印象を残す生産者です。',
      ],
      media: {
        src: '/story/stodd1 (34).jpg',
        alt: 'Jean Stodden cellar portrait photograph',
        ratio: 'landscape',
      },
      layout: 'imageLeft',
      tone: 'tinted',
    },
    {
      id: 'wine-focus',
      role: 'wine-focus',
      eyebrow: 'ワインフォーカス',
      title: 'Spätburgunder が語る、\nJean Stodden の輪郭',
      body: [
        'Jean Stodden を知る入口として、もっとも自然なのはやはり Spätburgunder です。このワイナリーでは、急斜面の畑、スレート由来の張り、そして丁寧な熟成設計によって、品種の表情を細く長く引き出していきます。',
        '目指しているのは、単なる濃さではありません。若いうちから楽しめる開き方を持ちながらも、その奥にはきちんと熟成に耐える骨格を残すこと。そのため Jean Stodden の赤は、果実味だけで終わらず、余韻の中で土壌感と緊張感が静かに立ち上がります。',
      ],
      media: {
        src: '/story/stodd1 (28).jpg',
        alt: 'Jean Stodden editorial wine still life',
        ratio: 'portrait',
      },
      layout: 'imageLeft',
      tone: 'spotlight',
    },
    {
      id: 'recognition',
      role: 'recognition',
      eyebrow: '評価と実績',
      title: '継続して高く評価される造り手',
      body: [
        'Jean Stodden は、単年の話題性ではなく、ドイツ国内の主要評価誌において継続的に高く評価されている生産者です。とくに 2025 年は、ワイナリー全体の完成度を示す評価が際立っています。',
        '外部評価の高さは、Jean Stodden のワインが単発的な出来ではなく、継続的な完成度として認識されていることを示しています。とくに 2025 年の評価は、そのことを端的に裏づける内容です。',
      ],
      facts: [
        { label: 'Eichelmann 2025', value: '5つ星・Weltklasse\nWeingut des Jahres 2025\nKollektion des Jahres 2025' },
        { label: 'Gault & Millau Weinguide 2025', value: '5房・Weltspitze' },
        { label: 'Falstaff Weinguide 2025', value: '5つ星' },
        { label: '参考実績', value: '2024年 Gault & Millau にて初の 5房\nFalstaff 2024 では全ワイン 90点超' },
      ],
      tone: 'fact',
    },
    {
      id: 'ahr',
      eyebrow: '土地の文脈',
      title: 'アールという土地が、\nこの赤の緊張感をつくる',
      body: [
        'アールは、ドイツでもっとも北に位置するワイン産地のひとつでありながら、赤ワインの個性で強く記憶される特異な地域です。総面積は小さく、川沿いには急斜面の畑が連なり、地域全体でも赤品種の比率が高いことで知られています。',
        'この土地では、日中に熱を蓄え、夜にそれをゆっくり返す石質土壌やスレート、そして谷が生むミクロクリマが、冷涼な産地でありながら赤ワインに十分な成熟をもたらします。一方で、その冷たさが失われないため、アールのシュペートブルグンダーには独特の張りと伸びが宿ります。',
        'Jean Stodden のワインを支えているのは、品種そのものだけではありません。この土地の斜面、土壌、光、そして冷涼さが一体となって、あの緊張感ある輪郭をかたちづくっています。',
      ],
      media: {
        src: '/story/stodd1 (7).jpg',
        alt: 'Ahr steep slope landscape for Jean Stodden',
        ratio: 'landscape',
      },
      layout: 'imageRight',
      tone: 'tinted',
    },
  ],
  gallery: {
    eyebrow: '風景と空気',
    title: 'アールの斜面と光',
    intro:
      '急斜面、石質土壌、冷涼な光。\nJean Stodden の赤を支える背景には、アールならではの引き締まった風景があります。',
    images: [
      {
        src: '/story/stodd1 (47).jpg',
        alt: 'Jean Stodden main gallery image',
      },
      {
        src: '/story/stodd1 (10).jpg',
        alt: 'Jean Stodden supporting gallery image 1',
      },
      {
        src: '/story/stodd1 (16).jpg',
        alt: 'Jean Stodden supporting gallery image 2',
      },
      {
        src: '/story/stodd1 (13).jpg',
        alt: 'Jean Stodden supporting gallery image 3',
      },
      {
        src: '/story/stodd1 (31).jpg',
        alt: 'Jean Stodden supporting gallery image 4',
      },
    ],
  },
  video: {
    eyebrow: '映像',
    title: '映像で知る\nJean Stodden の輪郭',
    body: ['土地、造り手、そしてアールの赤がもつ緊張感を、映像から。'],
    poster: {
      src: '/story/stodden-slide-1.jpg',
      alt: 'Jean Stodden video placeholder',
      ratio: 'wide',
    },
    ctaHref: 'https://www.youtube.com/results?search_query=Jean+Stodden',
  },
  winesIntro: [
    'Spätburgunder を軸に、',
    'アールの冷涼さと土壌の輪郭を感じられるセレクションです。',
  ],
  wines: wineryWines('stodden', '/story/stdn-spat-23.png'),
  inquiry: {
    title: '導入・ご相談',
    body: 'Jean Stodden のお取り扱い、リスト提案、導入相談は、こちらからお問い合わせください。レストラン、ワインバー、小売店など、それぞれの文脈に合わせてご案内します。',
    ctaLabel: '資料請求',
    ctaHref: '/#contact',
  },
};

const ludwigEntry: WineryEntry = {
  ...ludwigBase,
  templateKey: 'editorial-reference',
  region: 'Mosel｜Thörnich',
  descriptor: 'モーゼルの斜面が磨く、透明感と張りを備えた Ludwig の辛口ワイン。',
  heroBody: [
    'モーゼルの斜面が磨く、\nLudwig の透明感',
    '1628年から続く家族経営のワイナリー。\nThörnicher Ritsch の急斜面とシーファー土壌に根ざし、\n自然と呼吸を合わせながら、\n張りのあるミネラルと伸びやかな香りを備えた\nモーゼルの辛口ワインを生み出しています。',
  ],
  heroImage: '/story/ludwig1 (20).jpg',
  heroImagePosition: '34% 38%',
  heroCaption: '',
  heroFacts: [],
  intro: {
    id: 'overview',
    role: 'overview',
    eyebrow: '概要',
    title: 'FINDEST が\nLudwig を\n扱う理由',
    body: [
      'Ludwig の魅力は、派手さではなく、土地の純度がそのままワインに表れていることです。\nモーゼルらしい軽やかさを保ちながら、輪郭は曖昧にならず、香りは高く、余韻にはシーファー由来の張りが静かに残る。そこに、この生産者ならではの品のよさがあります。',
      'また、長い歴史をもつ家族経営でありながら、表現は古さに寄りかからず、いまの食卓や現場に自然に届くことも大きな理由です。\nFINDEST は Ludwig を、モーゼルの魅力を「軽さ」ではなく「精度」として伝えられる造り手だと考えています。',
    ],
    facts: [
      { label: '系譜', value: '1628年に遡る家族の歴史' },
      { label: '畑', value: 'Thörnicher Ritsch を核にした畑' },
      { label: '姿勢', value: '自然に配慮した栽培と丁寧な醸造' },
    ],
    tone: 'intro',
  },
  sections: [
    {
      id: 'heritage',
      role: 'heritage-renewal',
      eyebrow: '歴史と現在の造り',
      title: '受け継がれた時間を、\nいまの精度でつなぐ',
      body: [
        'Ludwig の起点は、1628年に Thörnicher Ritsch の土地を受け継いだことにあります。\nその後も家族の手で畑と造りがつながれ、現在は Thomas Ludwig と Meike Ludwig がワイナリーを担っています。',
        '彼らの姿勢は一貫していて、品質はまず畑にある、という考え方です。\n急斜面のシーファー土壌がもつ力を引き出しながら、過度な演出ではなく、香り・酸・ミネラルの均衡が整ったワインへと仕上げていく。\nその静かな精度に、Ludwig の現在がよく表れています。',
      ],
      media: {
        src: '/story/ludwig1 (47).jpg',
        alt: 'Thomas and Meike Ludwig sitting on slate slope',
        ratio: 'landscape',
      },
      layout: 'imageLeft',
      tone: 'tinted',
    },
    {
      id: 'wine-focus',
      role: 'wine-focus',
      eyebrow: 'ワインフォーカス',
      title: 'Riesling が語る、\nLudwig の輪郭',
      body: [
        'Ludwig を理解する入口として最もふさわしいのは、やはり Riesling です。\nとくに Thörnicher Ritsch を背景にもつワインには、この土地ならではの緊張感がよく表れます。',
        'やわらかなデヴォン紀のシーファー土壌から生まれるのは、密度がありながら重くなりすぎない、張りのある Riesling。\n果実の明るさ、まっすぐな酸、塩味を帯びたミネラルが重なり、余韻には静かな奥行きが残ります。',
        'Ludwig の Riesling は、モーゼルらしい透明感を保ちながら、ただ軽いだけでは終わりません。\n土地の個性を誇張せず、誠実に伝える一本です。',
      ],
      media: {
        src: '/story/ludwig1 (23).jpg',
        alt: 'Weingut Ludwig Riesling bottle photograph',
        ratio: 'portrait',
      },
      layout: 'imageLeft',
      tone: 'spotlight',
    },
  ],
  awards: {
    id: 'recognition',
    role: 'award',
    eyebrow: '評価と実績',
    title: 'Ludwig を裏づける、\n外部からの評価',
    body: [
      'Ludwig の価値は、土地の個性や家族の継承だけでなく、外部評価の面でも着実に裏づけられています。',
      'ここでは、その信頼を端的に示す評価を整理しています。',
    ],
    facts: [
      {
        label: 'Gault&Millau',
        value: '現行のワインガイドで 3.5房。\nモーゼルの個性を、精度の高い造りで伝える生産者として評価されています。',
      },
      {
        label: 'Eichelmann',
        value: '3つ星評価。\n土地の個性と安定した仕上がりの両立が、継続的な評価につながっています。',
      },
      {
        label: 'wein.plus',
        value: '333 の評価。\n地域内でも安定して高い水準を保つワイナリーとして位置づけられています。',
      },
      {
        label: '継続性',
        value: '一時的な話題性ではなく、\n畑・造り・ワインの完成度が、\nLudwig の信頼を支えています。',
      },
    ],
    tone: 'fact',
  },
  gallery: {
    eyebrow: '風景と空気',
    title: 'シーファーの斜面、\n風、光、そして畑の静けさ',
    intro:
      'Ludwig のワインを形づくっているのは、華やかな演出ではなく、急斜面の地形そのものです。\n乾いた石の表情、深く根を伸ばす樹、風の通り道、そしてモーゼル特有の光。\nそれらが重なり合い、香りの高さと、細く長いミネラルの線を生み出しています。',
    images: [
      {
        src: '/story/ludwig1 (19).jpg',
        alt: 'Ludwig main gallery Mosel landscape',
      },
      {
        src: '/story/ludwig1 (41).jpg',
        alt: 'Ludwig supporting gallery grape detail',
      },
      {
        src: '/story/ludwig1 (42).jpg',
        alt: 'Ludwig supporting gallery slate detail',
      },
      {
        src: '/story/ludwig1 (6).jpg',
        alt: 'Ludwig supporting gallery vineyard work',
      },
      {
        src: '/story/ludwig1 (31).jpg',
        alt: 'Ludwig supporting gallery natural atmosphere',
      },
    ],
  },
  video: {
    eyebrow: '映像',
    title: '映像でたどる\nLudwig の空気感',
    body: ['畑、斜面、造り手の所作。\n言葉だけでは伝えきれない、モーゼルの輪郭を映像で。'],
    poster: {
      src: '/story/ludwig1 (39).jpg',
      alt: 'Weingut Ludwig video placeholder',
      ratio: 'wide',
    },
    ctaHref: 'https://www.youtube.com/results?search_query=Weingut+Ludwig+Mosel',
  },
  winesIntro: [
    'FINDEST がご紹介する Ludwig のセレクション。',
    '土地の個性と、食卓での使いやすさの両方を備えたラインアップです。',
  ],
  wines: selectedWineryWines(
    'ludwig',
    [
      '2022 Riesling dry Guts',
      '2020 Thörnicher Riesling trocken',
      '2024 Thörnicher Riesling trocken',
      '2023 Sauvignon Blanc trocken',
    ],
    '/story/lud-thorn-riesl-24.png'
  ),
  inquiry: {
    title: '導入のご相談',
    body: 'レストラン、ショップ、企画用途に合わせて、Ludwig の中から適したワインをご提案します。\nお取引やご試飲のご相談は、こちらからお問い合わせください。',
    ctaLabel: '資料請求',
    ctaHref: '/#contact',
  },
};

const ressEntry: WineryEntry = {
  ...ressBase,
  templateKey: 'editorial-reference',
  region: 'ラインガウ地方',
  descriptor: '1870年創業。ラインガウを深く知り、土地・時間・人のつながりを未来へつなぐ家。',
  heroBody: [
    '1870年創業。\nラインガウに深く根を下ろしながら、\n土地・家・時間の蓄積を、\n今の基準で静かに磨き続けてきた家。',
    'Balthasar Ress は、\nワインそのものの品質はもちろん、\nその背景にある畑、地域性、もてなしまで含めて、\n一貫した信頼を築いている造り手です。',
  ],
  heroImage: '/story/ress1 (49).jpg',
  heroImagePosition: '34% center',
  heroCaption: '',
  heroFacts: [],
  intro: {
    id: 'overview',
    role: 'overview',
    eyebrow: '概要',
    title: 'FINDEST が\nRess を扱う理由',
    body: [
      'Balthasar Ress の魅力は、単に歴史ある家族経営のワイナリーであることにとどまりません。ラインガウという土地を深く理解し、その価値をワイン、畑、体験、そして場づくりまで含めて一貫して形にしていることにあります。',
      '1870年の創業以来、家としての蓄積を重ねながら、現在は有機栽培への転換や、上質な体験設計にも力を注ぎ、伝統を固定されたものではなく、未来へ受け渡す資産として扱っています。',
      'FINDEST が Ress に惹かれるのは、ワインの品質だけでなく、その背景にある組織力、継続性、そして地域への視野の広さです。一本のワインの奥に、ラインガウという産地の厚みまで感じさせる。Ress は、そうした信頼を備えた造り手です。',
    ],
    facts: [
      { label: '創業', value: '1870年創業の家族経営' },
      { label: '転換', value: '2016年より有機栽培へ転換' },
      { label: '規模', value: '2019年以降 Hessen 最大の有機ワイナリー' },
      { label: '畑', value: '畑の約70％が VDP.ERSTE LAGE / VDP.GROSSE LAGE' },
    ],
    tone: 'intro',
  },
  sections: [
    {
      id: 'heritage',
      role: 'heritage-renewal',
      eyebrow: '歴史と現在の造り',
      title: '受け継いだ土地を、\n次の時代へ整えていく',
      body: [
        'Balthasar Ress は、ラインガウの Hattenheim に根を下ろす家族経営のワイナリーです。1870年、創業者 Balthasar Ress が宿とともに礎を築いて以来、この家は「もてなし」と「よいワインを生み出すこと」をひとつの流れとして受け継いできました。',
        'このワイナリーの特徴は、歴史を守ることだけを目的にしないことです。畑を次世代へ残すために 2016年から有機栽培への転換を進め、現在はラインガウを代表する有機ワイナリーのひとつとして、土地との向き合い方をより長期的な視点で整えています。',
        '家としての継続性、地域への理解、そして未来に向けた実務的な判断。Ress の個性は、その三つが静かに揃っているところにあります。',
      ],
      media: {
        src: '/story/ress1 (12).jpg',
        alt: 'Historic Balthasar Ress estate photograph',
        ratio: 'landscape',
      },
      layout: 'imageLeft',
      tone: 'tinted',
    },
    {
      id: 'wine-focus',
      role: 'wine-focus',
      eyebrow: 'ワインフォーカス',
      title: 'Riesling に表れる\nRess の基準',
      body: [
        'Balthasar Ress を知る入口として最もふさわしいのは、やはり Riesling です。この家にとって Riesling は単なる代表品種ではなく、ラインガウという土地の輪郭をもっとも素直に映し出す軸でもあります。',
        '「Von Unserm Riesling trocken」は、家の基準を端的に伝える存在です。誇張ではなく、土地と家の輪郭をまっすぐに伝えること。そこに Ress の考え方がよく表れています。',
        '精密さ、ミネラル感、そして産地らしい輪郭。Ress の Riesling には、大きな声ではなく、整った説得力があります。',
      ],
      media: {
        src: '/story/ress1 (2)22.jfif',
        alt: 'Balthasar Ress Riesling grape cluster',
        ratio: 'portrait',
        position: '42% center',
      },
      layout: 'imageLeft',
      tone: 'spotlight',
    },
    {
      id: 'ress-recognition',
      role: 'recognition',
      eyebrow: '評価と実績',
      title: '積み上げられてきた\n外部評価',
      body: [
        'Balthasar Ress は、長い歴史だけで語られるワイナリーではありません。\n近年も外部評価において継続して存在感を示しており、2023年には Gault&Millau で 4房へ昇格。さらに Eichelmann 2025 では、複数のワインが 91〜94点を獲得しています。',
        '畑の質、造りの精度、そして家としての継続性。\nその積み重ねが、現在進行形の評価として表れています。',
      ],
      facts: [
        { label: 'Gault&Millau', value: '4房' },
        { label: 'Eichelmann 2025', value: 'で 91〜94点' },
        { label: 'wein.plus', value: '5つ星' },
        { label: 'VDP', value: '加盟 / 上位格付け畑を広く保有' },
      ],
      tone: 'fact',
    },
  ],
  gallery: {
    eyebrow: '風景と空気',
    title: 'ライン川、畑、\nそして家の空気',
    intro:
      'ラインガウの光、斜面、\nそして長く受け継がれてきた家の落ち着き。\nRess の風景には、\n土地と時間の重なりが静かに表れています。',
    images: [
      { src: '/story/ress1 (46).jpg', alt: 'Balthasar Ress main gallery landscape' },
      { src: '/story/ress1 (31).jpg', alt: 'Balthasar Ress cellar atmosphere' },
      { src: '/story/ress1 (44).jpg', alt: 'Balthasar Ress barrels' },
      { src: '/story/ress1 (21).jpg', alt: 'Balthasar Ress vineyard biodiversity detail' },
      { src: '/story/ress1 (57).jpg', alt: 'Balthasar Ress human presence in vineyard' },
    ],
  },
  video: {
    eyebrow: '映像',
    title: '映像で伝える\nRess の輪郭',
    body: ['土地との関係、\n家としての佇まい、\nそしてワインに流れる基準を、\n映像を通して静かに伝えます。'],
    poster: {
      src: '/story/ress1 (38).jpg',
      alt: 'Balthasar Ress Rheingau landscape video poster',
      ratio: 'wide',
    },
    ctaHref: 'https://www.youtube.com/results?search_query=Balthasar+Ress',
  },
  winesIntro: [
    'FINDEST がご紹介する Ress のセレクション。',
    '土地の個性と、食卓での使いやすさの両方を備えたラインアップです。',
  ],
  wines: selectedWineryWines(
    'ress',
    [
      '2009 Rüdesheim Berg Rottland Riesling Erstes Gewächs',
      '2011 HattenheimerNussbrunnenRiesling EG trocken',
    ],
    '/wineries/ress-new-rev.jpg'
  ),
  inquiry: {
    title: '導入相談',
    body: 'レストラン、ショップ、企画用途に合わせて、Ress の中から最適なワインをご提案します。お取引やご試飲のご相談は、こちらからお問い合わせください。',
    ctaLabel: '資料請求',
    ctaHref: '/#contact',
  },
};

const busEntry: WineryEntry = {
  ...busBase,
  templateKey: 'editorial-reference',
  japaneseLabel: 'バス',
  region: 'ファルツ地方',
  descriptor: '16世紀末から続く家族経営を土台に、品種の広がりと新しい表現に意欲的に取り組む造り手。',
  heroBody: [
    '16世紀末から続く家族経営を土台に、\n品種の広がりと新しい表現に意欲的に取り組む造り手。',
    '親しみやすさの中に、香りや味わいの輪郭があり、\nBUS のワインはファルツの多面性を現代的に映し出します。',
  ],
  heroImage: '/story/bus1 (27).jpg',
  heroCaption: '',
  heroFacts: [],
  intro: {
    id: 'overview',
    role: 'overview',
    eyebrow: '概要',
    title: 'FINDEST が\nBus を扱う理由',
    body: [
      'BUS の魅力は、長く受け継がれてきた家族経営の基盤の上に、今の感覚で品種と表現の幅を着実に広げていることです。安定感と前向きな動きが、無理なくひとつになっています。',
      'ファルツらしいあたたかさと開かれた空気を備えながら、ワインはただ親しみやすいだけでは終わりません。品種ごとの個性が素直に引き出され、香り、果実感、質感の違いまで、自然な輪郭をもって伝わってきます。',
      '定番品種を丁寧に仕立てる一方で、Goldmuskateller のような個性の立つ品種にも前向きに取り組む。その柔軟さと行動力が、BUS を今の市場にも自然に響く生産者にしています。',
    ],
    facts: [
      { label: '系譜', value: '16世紀末から続く家族経営' },
      { label: '世代', value: '7代目 Carsten Bus' },
      { label: '表現', value: '品種の幅と表現の多様さ' },
      { label: '現在地', value: '伝統と更新が自然に同居する造り手' },
    ],
    tone: 'intro',
  },
  sections: [
    {
      id: 'house-character',
      role: 'heritage-renewal',
      eyebrow: '造りの姿勢',
      title: '受け継いだ土台に、\n新しい表現を重ねる',
      body: [
        'Weingut Bus は、ファルツ地方インスハイムに根を下ろす\n家族経営のワイナリーです。\nその歴史は16世紀末にさかのぼり、現在は Carsten Bus が\n7代目としてこの家の仕事を受け継いでいます。',
        'このワイナリーの特徴は、歴史をただ守ることにとどまらず、\n今の時代に合った形で更新していることにあります。\n土地に根ざした感覚を大切にしながら、\n品種や表現の広がりにも目を向ける。\nその姿勢が、BUS のワインにのびやかさを与えています。',
        '家の蓄積を土台としながら、\n次の表現へ静かに進んでいく。\nBUS の個性は、そうした継承と前進の重なりの中にあります。',
      ],
      media: {
        src: '/story/bus1 (31).jpg',
        alt: 'Weingut Bus family portrait in vineyard',
        ratio: 'landscape',
      },
      layout: 'imageLeft',
      tone: 'tinted',
    },
    {
      id: 'wine-focus',
      role: 'wine-focus',
      eyebrow: 'ワインフォーカス',
      title: 'Goldmuskateller が映す\nBUS のひらかれた個性',
      body: [
        'Goldmuskateller は、BUS の開かれた姿勢を映す一本です。\n定番品種を丁寧に仕立てるだけでなく、\n香りの個性が際立つ品種にも前向きに取り組む。\nその柔軟さが、BUS の表現に明るさと広がりを与えています。',
        '華やかな香りを持ちながらも、\n単なる派手さで終わらせず、\nワインとしての輪郭にきちんとまとめていく。\nそのバランス感覚に、BUS らしさがあります。',
        'ファルツの親しみやすさを備えながら、\n味わいは一様ではない。\nBUS のワインには、飲み手の興味を自然に前へ進めるような、\n軽やかな推進力があります。',
      ],
      media: {
        src: '/story/bus1 (63).jpg',
        alt: 'Weingut Bus light grape close-up photograph',
        ratio: 'portrait',
      },
      layout: 'imageLeft',
      tone: 'spotlight',
    },
    {
      id: 'recognition',
      role: 'recognition',
      eyebrow: '評価と実績',
      title: '継続して積み上がる\n外部評価',
      body: [
        'BUS は、家族経営の造り手でありながら、\n専門誌やコンクールにおいても継続して評価を得ています。\n個性のあるワインを生み出すだけでなく、\n品質を安定して形にしていることが、\n外部からの評価にも表れています。',
      ],
      facts: [
        { label: 'Gault&Millau', value: '2房' },
        { label: 'AWC Vienna', value: 'で多数受賞' },
        { label: '評価の流れ', value: '継続的な外部評価' },
        { label: '印象', value: '個性と安定感を備えた生産者' },
      ],
      tone: 'fact',
    },
  ],
  gallery: {
    eyebrow: '風景と空気',
    title: '畑と蔵、\nそして表現の余白',
    intro:
      'ファルツのあたたかさと、\nBUS の軽やかな行動力。\nその両方が、このワイナリーの風景には\n静かに表れています。',
    images: [
      {
        src: '/story/bus1 (32).jpg',
        alt: 'Weingut Bus main gallery image',
      },
      {
        src: '/story/bus1 (58).jpg',
        alt: 'Weingut Bus supporting gallery image 1',
      },
      {
        src: '/story/bus1 (22).jpg',
        alt: 'Weingut Bus supporting gallery image 2',
      },
      {
        src: '/story/bus1 (63).jpg',
        alt: 'Weingut Bus supporting gallery image 3',
      },
      {
        src: '/story/bus1 (41).jpg',
        alt: 'Weingut Bus supporting gallery image 4',
      },
    ],
  },
  video: {
    eyebrow: '映像',
    title: '映像で伝える\nBUS の輪郭',
    body: ['風景、仕事、そしてワインに流れる空気感を、\n映像を通して静かに伝えます。'],
    poster: {
      src: '/story/bus1 (24).jpg',
      alt: 'Weingut Bus video placeholder',
      ratio: 'wide',
    },
    ctaHref: 'https://www.youtube.com/results?search_query=Weingut+Bus+Insheim',
  },
  winesIntro: [
    '多様な品種と表現の広がりを、',
    'BUS のラインナップからご覧いただけます。',
  ],
  wines: selectedWineryWines(
    'bus',
    [
      '2022 Chardonnay dry',
      '2018 Goldmuskateller feinherb Q.B.A.',
      '2023 MerlotBlancdeNoirtrocken',
      '2019 CabernetSauvignontrocken',
    ],
    '/story/Bus-gold-18.png'
  ),
  inquiry: {
    title: '導入相談',
    body: 'レストラン・小売店での導入やご提案については、こちらからお問い合わせください。業態やご希望に応じて、適したご案内をいたします。',
    ctaLabel: '資料請求',
    ctaHref: '/#contact',
  },
};

const landererEntry: WineryEntry = {
  ...landererBase,
  templateKey: 'editorial-reference',
  region: 'Baden / Kaiserstuhl',
  descriptor: '火山土と光の輪郭を、過不足なくワインに映す Kaiserstuhl の Burgunder estate。',
  heroBody: [
    '火山土 × 光 × 輪郭',
    'カイザーシュトゥールは、火山が残した土壌と、石灰を含むレス土壌が重なり合う土地です。\n畑の向きや風の抜け方、土壌の違いが、そのままワインの輪郭として表れやすい。\nWeingut Landerer は、その差を曖昧にせず、区画ごとの個性として丁寧に引き出していく造り手です。',
  ],
  heroImage: '/story/lander1 (1).jpg',
  heroImagePosition: '30% 42%',
  heroCaption: '',
  heroFacts: [],
  intro: {
    id: 'overview',
    role: 'overview',
    eyebrow: '概要',
    title: 'FINDEST が\nLanderer を扱う理由',
    body: [
      'FINDEST JAPAN が Landerer を大切に扱う理由は、カイザーシュトゥールという土地の違いが、無理なくワインの表情として伝わってくるからです。\n火山性風化土壌と石灰質レス土壌というこの地域ならではの背景を持ちながら、Landerer はブルグンダー系を軸に、区画ごとのニュアンスを明快に描き分けています。果実の力だけで押し切らず、ミネラル、質感、輪郭の精度で語れる。その静かな説得力が、この造り手の大きな魅力です。',
      'Johannes Landerer は 17 歳の頃から栽培の実験を始め、早くから自分の感覚で畑と品種の関係を探ってきました。\n2016年に父 Thomas の急逝を受けて栽培と醸造の責任を引き継いで以降、その姿勢はさらに明確になっています。家の歩みを受け継ぎながら、畑ごとの差異やヴィンテージの輪郭を、より精度高くワインへ落とし込む方向へ進んでいます。',
    ],
    facts: [
      { label: '土壌', value: 'カイザーシュトゥールの火山性風化土壌と石灰質レス土壌' },
      { label: '構成', value: 'ブルグンダー系を中核に据えた構成' },
      { label: '体制', value: '2016年以降、Johannes Landerer が栽培・醸造を統括' },
      { label: '現在地', value: '2024年にオーガニック認証を取得' },
    ],
    tone: 'intro',
  },
  sections: [
    {
      id: 'heritage',
      role: 'heritage-renewal',
      eyebrow: '歴史と現在の造り',
      title: '受け継がれる挑戦と更新',
      body: [
        'Landerer を語るうえで重要なのは、伝統を守ることだけで終わらせない姿勢です。\nJohannes Landerer は若い頃から畑で試行錯誤を重ね、17歳の時点ですでに自ら実験的な取り組みを始めていました。その早い出発は、現在の Landerer の輪郭にもはっきりつながっています。',
        '2016年に家業を引き継いでからは、歴史に寄りかかるのではなく、区画差や土壌の違いをより明瞭に感じ取れる造りへと磨きをかけてきました。\nLanderer の魅力は、勢いだけの新しさではありません。考え抜かれた更新と、畑ごとの差を曖昧にしない精度にあります。',
      ],
      media: {
        src: '/story/lander1 (8).jpg',
        alt: 'Johannes Landerer working in vineyard',
        ratio: 'landscape',
        position: '50% center',
      },
      layout: 'imageLeft',
      tone: 'tinted',
    },
    {
      id: 'wine-focus',
      role: 'wine-focus',
      eyebrow: 'ワインフォーカス',
      title: '区画ごとに立ち上がる\nKaiserstuhl の輪郭',
      body: [
        'Landerer の核にあるのは、カイザーシュトゥールの区画差を、ブルグンダー系を中心とした品種で明瞭に見せることです。\nOberrotweiler Eichberg、Kirchberg、Henkenberg、Leiselheimer Gestühl など、それぞれの畑は異なる表情を持ち、選び抜かれたブドウは丁寧に仕込まれ、深みと複雑さ、そしてフィネスのあるワインへとつながっていきます。',
        'ここで大切なのは、単に濃さや華やかさを競うことではありません。\n果実、ミネラル、フェノール、質感の締まり方が、区画ごとに異なる輪郭として見えてくること。Landerer はその差を均さず、畑の言葉として残そうとする造り手です。',
      ],
      facts: [
        { label: '火山性風化土壌', value: 'がもたらす緊張感' },
        { label: '石灰質レス土壌', value: 'が与える厚み' },
        { label: '区画差', value: 'を味わいの輪郭として残す' },
      ],
      media: {
        src: '/story/lander1 (5).jpg',
        alt: 'Kaiserstuhl vineyard landscape',
        ratio: 'portrait',
        position: '50% center',
      },
      layout: 'imageLeft',
      tone: 'spotlight',
    },
    {
      id: 'recognition',
      role: 'recognition',
      eyebrow: '評価と実績',
      title: '継続して積み上がる評価',
      body: [
        'Landerer は近年、ドイツの主要ワインガイドやテイスティングで継続的に高い評価を得ています。',
        '単発の話題性ではなく、白・赤の両方で精度の高い造りが繰り返し認められている点に、このワイナリーの現在地があります。',
      ],
      facts: [
        { label: 'HENRIS WEINGUIDE 2026\nGault&Millau', value: '4 ROTE TRAUBEN\n2023 Henkenberg Spätburgunder：5 SCHWARZE TRAUBEN' },
        { label: 'Falstaff Wine Guide Germany 2026', value: '4つ星評価\n型破りでありながら、よく考え抜かれたスタイル' },
        { label: 'Organic', value: '2024年にオーガニック認証取得' },
      ],
      tone: 'fact',
    },
  ],
  gallery: {
    eyebrow: '風景と空気',
    title: '畑と光、\n土地に触れる感覚',
    intro:
      'Landerer の魅力は、ワイン単体だけでは完結しません。\n火山に由来する土、乾いた光、斜面の向き、作業の手つき。そうした背景が静かに積み重なって、グラスの中の輪郭になります。',
    images: [
      { src: '/story/lander1 (20).jpg', alt: 'Landerer main gallery vineyard landscape' },
      { src: '/story/lander1 (23).jpg', alt: 'Landerer supporting vineyard rows' },
      { src: '/story/lander1 (12).JPG', alt: 'Landerer supporting soil detail' },
      { src: '/story/lander1 (8).jpg', alt: 'Landerer supporting vineyard work' },
      { src: '/story/lander1 (10).jpg', alt: 'Landerer supporting cellar detail' },
    ],
  },
  video: {
    eyebrow: '映像',
    title: '映像で伝える\nLanderer の空気',
    body: ['言葉だけでは届ききらない、畑と造りのテンポ。\nLanderer は、その静かな精度まで含めて見せたい造り手です。'],
    poster: {
      src: '/story/lander1 (11).jpg',
      alt: 'Weingut Landerer video poster',
      ratio: 'wide',
    },
    ctaHref: 'https://www.youtube.com/results?search_query=Weingut+Landerer',
  },
  winesIntro: ['土地ごとの輪郭と、造りの精度が見えてくるセレクションです。'],
  wines: wineryWines('landerer', '/story/lan-kaiser-spat-23.png'),
  inquiry: {
    title: '導入相談',
    body: 'レストラン・小売店での導入やご提案については、こちらからお問い合わせください。業態やご希望に応じて、適したご案内をいたします。',
    ctaLabel: '資料請求',
    ctaHref: '/#contact',
  },
};

const genericEntries = wineriesBase.slice(6).filter((base) => !['ludwig', 'ress', 'bus', 'landerer'].includes(base.id)).map(buildGenericEntry);
export const wineries: WineryEntry[] = [dautelEntry, horstEntry, salweyEntry, hammEntry, buerklinEntry, stoddenEntry, ludwigEntry, ressEntry, busEntry, landererEntry, ...genericEntries];

export function getWineryBySlug(slug: string) {
  return wineries.find((winery) => winery.slug === slug) ?? null;
}
