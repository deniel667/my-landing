'use client';

import Image from 'next/image';
import { useState } from 'react';
import WineryDrawer, { type WineryDrawerWinery, type WineryWine } from '../winery/WineryDrawer';

type WineryCard = WineryDrawerWinery & {
  style: string;
  count: string;
  keywords?: string;
  cardTitle?: string;
  cardCaption?: string[];
  photo: string;
  imageClass: string;
  href: string;
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

const wineries: WineryCard[] = [
  {
    id: 'dautel',
    name: 'Weingut Dautel',
    region: 'Wurttemberg',
    style: 'Lembergerを軸にした、芯のある辛口。',
    count: '取扱 2種',
    photo: '/wineries/dautel-new-rev.jpg',
    imageClass: 'object-cover',
    href: '#contact',
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
    count: '取扱 2種',
    photo: '/wineries/horst-sauer-new-rev.jpg',
    imageClass: 'object-cover',
    href: '#contact',
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
    count: '取扱 2種',
    photo: '/wineries/landerer-new-rev.jpg',
    imageClass: 'object-cover',
    href: '#contact',
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
    count: '取扱 2種',
    photo: '/wineries/ludwig-new-rev.jpg',
    imageClass: 'object-cover',
    href: '#contact',
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
    count: '取扱 2種',
    photo: '/wineries/hamm-new-rev.jpg',
    imageClass: 'object-cover object-[45%_30%]',
    href: '#contact',
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
    count: '取扱 2種',
    photo: '/wineries/bus-new-rev.jpg',
    imageClass: 'object-cover',
    href: '#contact',
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
    count: '取扱 2種',
    photo: '/wineries/ress-new-rev.jpg',
    imageClass: 'object-cover',
    href: '#contact',
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
    count: '取扱 2種',
    photo: '/wineries/salwey-new-rev.jpg',
    imageClass: 'object-cover object-[50%_38%]',
    href: '#contact',
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
    name: 'Weingut Dr. Bürklin-Wolf',
    region: 'Pfalz',
    style: 'Biodynamic × Grip & Clarity',
    keywords: 'Village / Riesling / Dry / Grip',
    count: '取扱 2種',
    photo: '/wineries/dr-burkl-wolf-new-rev.jpg',
    imageClass: 'object-cover object-[50%_42%]',
    href: '#contact',
    wines: buildWines({
      wineryId: 'buerklinwolf',
      producer: 'Dr. Bürklin-Wolf',
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
    name: 'Weingut Jean Stodden',
    region: 'Ahr',
    style: 'Spatburgunderの精緻な表現。',
    count: '取扱 2種',
    photo: '/wineries/jean-stodden-new-rev.jpg',
    imageClass: 'object-cover object-[50%_42%]',
    href: '#contact',
    wines: buildWines({
      wineryId: 'stodden',
      producer: 'Weingut Jean Stodden',
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
    title: '① Jean Stodden｜Ahr',
    caption: ['Ahr｜Slate × Tension', '急斜面スレートが生む、精緻な酸と緊張感ある骨格。', '立ち上がるもの：静かな集中。'],
  },
  ludwig: {
    title: '② Weingut Ludwig｜Mosel',
    caption: ['Mosel｜Slate × Lift', 'スレート由来の軽やかさと透明感。', '立ち上がるもの：対話の流れ。'],
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
    title: '⑤ Dr. Bürklin-Wolf｜Pfalz',
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
  'stodden',
  'ludwig',
  'dautel',
  'salwey',
  'horst',
  'landerer',
  'bus',
  'hamm',
  'ress',
  'buerklinwolf',
];

const wineryNumberGlyphs = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'] as const;

export default function CatalogueSection() {
  const [activeWinery, setActiveWinery] = useState<WineryCard | null>(null);
  const orderedWineries = wineryDisplayOrder
    .map((id) => wineries.find((winery) => winery.id === id))
    .filter((winery): winery is WineryCard => Boolean(winery));

  return (
    <section className="wineries-layout">
      <header className="wineries-head">
        <p className="section-kicker">W I N E R I E S / 取 り 扱 い</p>
        <h2 className="section-title-mincho wineries-title">
          <span className="wineries-title-line">取り扱いワイン</span>
          <br />
          <span className="wineries-title-line">全11ワイナリー</span>
        </h2>
        <div className="wineries-copy">
          <p className="wineries-lead">FINDESTは、ドイツの希少なワインを、市場の都合ではなく、造り手の“線”と品質の再現性で選びます。</p>
          <p className="wineries-lead">ただ銘柄を並べるのではなく、店の“場”で成立する体験として設計できるものだけ。食・客層・温度・言葉まで含めて、現場で伝わる形に落とし込みます。</p>
        </div>
      </header>

      <div className="wineries-grid">
        {orderedWineries.map((winery, index) => (
          <article
            key={winery.id}
            className="winery-card"
            role="button"
            tabIndex={0}
            onClick={() => setActiveWinery(winery)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveWinery(winery);
              }
            }}
          >
            <div className="winery-card-image">
              <Image
                src={winery.photo}
                alt={winery.name}
                fill
                className={`${winery.imageClass} winery-card-photo`}
                sizes="(min-width: 1024px) 31vw, (min-width: 680px) 47vw, 100vw"
              />
            </div>

            <div className="winery-card-body">
              <h3>
                {`${wineryNumberGlyphs[index] ?? `${index + 1}.`} ${
                  (wineryEditorialCopy[winery.id]?.title ?? `${winery.name}｜${winery.region}`).replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/, '')
                }`}
              </h3>
              <p className="winery-card-caption">
                {(wineryEditorialCopy[winery.id]?.caption ?? [winery.style, winery.keywords ?? '', ''])
                  .filter(Boolean)
                  .slice(0, 3)
                  .map((line) => (
                    <span key={`${winery.id}-${line}`} className="winery-card-caption-line">
                      {line}
                    </span>
                  ))}
              </p>
            </div>

            <div className="winery-card-footer">
              <p className="winery-card-count">{winery.count}</p>
              <button
                type="button"
                className="winery-more-link"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveWinery(winery);
                }}
              >
                ラインナップを見る →
              </button>
            </div>
          </article>
        ))}
      </div>

      {activeWinery ? <WineryDrawer key={activeWinery.id} winery={activeWinery} onClose={() => setActiveWinery(null)} /> : null}
    </section>
  );
}





