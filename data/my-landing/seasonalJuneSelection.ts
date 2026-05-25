import { getExactBottleImageSrc } from '@/data/my-landing/wineBottleImages';
import { wineList, type WineListItem } from '@/data/my-landing/wineList';

export type SeasonalJuneWine = {
  key: string;
  canonicalWineId: string | null;
  producer: string;
  name: string;
  vintage: string;
  style: string;
  price: string;
  seasonalComment: string;
  wine: WineListItem | null;
  imageSrc: string | null;
};

type WineConfig = {
  key: string;
  wineryId: string;
  lookupName: string;
  producer: string;
  name: string;
  vintage: string;
  style: string;
  price: string;
  seasonalComment: string;
};

export const seasonalJuneSelection = {
  route: '/seasonal/june-summer-findest-2026-qr8m7',
  eyebrow: 'PRIVATE JUNE SELECTION',
  title: '初夏のワインセレクション',
  intro:
    '初夏に向けて、軽やかさ・飲み心地・食中での使いやすさを意識した季節限定のセレクションです。重すぎず、暑さのある時期にも提案しやすいワインを中心にまとめました。',
  subIntro:
    'レストラン、ワインバー、ガストロノミーの現場で、季節感を自然に添えられるラインナップです。',
  privateNote: 'QRコードをご案内したお客様限定のセレクションです。',
  notes: [
    'ヴィンテージは変更となる場合がございます。',
    '表示価格は税抜価格です。',
    '表示価格はOPEN市場向け希望小売価格です。',
  ],
  editorial:
    '白、ロゼ、軽やかな赤を中心に、冷涼感と食中での扱いやすさを重視しました。前菜、魚介、白身肉、軽い火入れの料理まで、六月のテーブルに静かに寄り添う構成です。',
  ctaLabel: 'このセレクションを問い合わせる',
  supportEmail: 'support@zato-trd.co.jp',
};

const configs: WineConfig[] = [
  {
    key: 'horst-just-silvaner-2022',
    wineryId: 'horst',
    lookupName: '2022 Just Silvaner trocken Gutswein',
    producer: 'Weingut Horst Sauer',
    name: 'JUST Silvaner trocken Gutswein',
    vintage: '2022',
    style: 'White / Silvaner',
    price: '4,950円',
    seasonalComment: '清潔感のある軽やかな辛口。前菜から魚介まで、初夏の食中に自然に寄り添います。',
  },
  {
    key: 'horst-just-secco-rose-2018',
    wineryId: 'horst',
    lookupName: '2018 JUST Secco Rosé',
    producer: 'Weingut Horst Sauer',
    name: 'JUST Secco Rosé',
    vintage: '2018-2022',
    style: 'Sparkling Rosé',
    price: '5,200円',
    seasonalComment: '明るく軽快なロゼ・セッコ。アペリティフや季節の入口に提案しやすい一本です。',
  },
  {
    key: 'ludwig-riesling-trocken-2022',
    wineryId: 'ludwig',
    lookupName: '2022 Riesling dry Guts',
    producer: 'Weingut Ludwig',
    name: 'Riesling trocken',
    vintage: '2022',
    style: 'White / Riesling',
    price: '4,800円',
    seasonalComment: '伸びのある酸と軽快な飲み心地。暑さのある時期にも食卓をすっきり整えます。',
  },
  {
    key: 'buerklin-villa-weiss-2017-2018',
    wineryId: 'buerklinwolf',
    lookupName: '2017 Villa Bürklin Weißwein trocken',
    producer: 'Weingut Dr. Bürklin-Wolf',
    name: 'Villa Bürklin Weißwein trocken',
    vintage: '2017-2018',
    style: 'White / Pfalz',
    price: '4,200円',
    seasonalComment: 'やわらかく親しみやすい白。和食や軽い前菜にも合わせやすい落ち着いた選択肢です。',
  },
  {
    key: 'buerklin-villa-rot-2017',
    wineryId: 'buerklinwolf',
    lookupName: '2017 Villa Bürklin Rotwein trocken',
    producer: 'Weingut Dr. Bürklin-Wolf',
    name: 'Villa Bürklin Cuvée Rot',
    vintage: '2017',
    style: 'Red / Pfalz',
    price: '4,200円',
    seasonalComment: '重すぎない赤の選択肢。少し涼しめに整えると、初夏の肉料理にも使いやすい一本です。',
  },
  {
    key: 'landerer-kaiserstuhl-spatburgunder-2023',
    wineryId: 'landerer',
    lookupName: '2023 Kaiserstuhl Spätburgunder trocken',
    producer: 'Weingut Landerer',
    name: 'Kaiserstuhl Spätburgunder trocken',
    vintage: '2023',
    style: 'Red / Spätburgunder',
    price: '5,800円',
    seasonalComment: '赤系果実の明るさと細い輪郭。季節の赤として、軽やかさと品を両立します。',
  },
  {
    key: 'dautel-trollinger-2022',
    wineryId: 'dautel',
    lookupName: '2022 Trollinger',
    producer: 'Weingut Dautel',
    name: 'Trollinger',
    vintage: '2022',
    style: 'Red / Trollinger',
    price: '5,600円',
    seasonalComment: '赤でありながら軽快。温かい季節のグラスワインにも組み込みやすいスタイルです。',
  },
  {
    key: 'bus-merlot-2019',
    wineryId: 'bus',
    lookupName: '2019 Merlot trocken',
    producer: 'Weingut Bus',
    name: 'Merlot trocken',
    vintage: '2019',
    style: 'Red / Merlot',
    price: '5,800円',
    seasonalComment: '丸みのある果実感とやわらかな口当たり。軽めの赤として幅広い料理に合わせやすい一本です。',
  },
  {
    key: 'bus-merlot-blanc-2023',
    wineryId: 'bus',
    lookupName: '2023 Merlot Blanc de Noir trocken',
    producer: 'Weingut Bus',
    name: 'Merlot Blanc de Noir trocken',
    vintage: '2023',
    style: 'Blanc de Noir',
    price: '4,900円',
    seasonalComment: '赤品種由来のやわらかさを白の軽快さで。初夏の提案に使いやすいブラン・ド・ノワールです。',
  },
  {
    key: 'horst-domina-2016-2017',
    wineryId: 'horst',
    lookupName: '2016 Escherndorfer Domina trocken (BB)',
    producer: 'Weingut Horst Sauer',
    name: 'Escherndorfer Domina trocken',
    vintage: '2016-2017',
    style: 'Red / Domina',
    price: '5,800円',
    seasonalComment: 'ほどよい構成を持つ赤。軽やかなラインナップの中で、料理に深みを添える役割です。',
  },
];

function findWine(config: WineConfig) {
  return (
    wineList.find((wine) => wine.wineryId === config.wineryId && wine.name === config.lookupName) ??
    wineList.find((wine) => wine.wineryId === config.wineryId && wine.name.includes(config.name.split(' ')[0])) ??
    null
  );
}

export const seasonalJuneWines: SeasonalJuneWine[] = configs.map((config) => {
  const wine = findWine(config);

  return {
    key: config.key,
    canonicalWineId: wine?.id ?? null,
    producer: config.producer,
    name: config.name,
    vintage: config.vintage,
    style: config.style,
    price: config.price,
    seasonalComment: config.seasonalComment,
    wine,
    imageSrc: wine ? getExactBottleImageSrc(wine.wineryId, wine.name) : null,
  };
});
