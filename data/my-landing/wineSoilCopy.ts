export const wineSoilCopy = {
  landerer: {
    '2023 Kaiserstuhl Spätburgunder trocken':
      '火山性土壌とレス、石灰質の要素が重なるカイザーシュトゥールらしい土壌が、赤果実の明るさにやわらかな厚みと軽いミネラル感を添える。',

    '2023 Leiselheim Chardonnay trocken – Schwarze Erde –':
      '黒土由来のしっとりした厚みと、カイザーシュトゥールの温かい火山性土壌の輪郭が、果実のふくらみとテクスチャーのなめらかさを支える。',
  },

  bus: {
    '2016 Dornfelder trocken "In der Hölle"':
      '畑の詳細な土壌情報は前面に出さず、温暖なファルツの環境が果実の熟度とやわらかな口当たりを支え、重さに寄りすぎない飲み心地に整えている。',

    '2019 Cabernet Sauvignon trocken':
      '温暖なファルツの畑条件が黒系果実の熟度を支えつつ、全体は硬く閉じず、ほどよい張りと飲みやすさに着地する。',

    '2023 Merlot Blanc de Noir trocken':
      '土壌を細かく限定するよりも、温暖なファルツらしい果実の出やすさと軽い丸みが、白仕立てのやわらかな質感を支えている。',

    '2019 Merlot trocken':
      '温暖なファルツの畑条件が果実の熟度とまろやかさを支え、角を立てすぎない柔らかな構成につなげている。',
  },

  salwey: {
    '2022 Kaiserstuhl Spätburgunder':
      'カイザーシュトゥールの火山性土壌とレス由来の輪郭が、果実の明るさに引き締まった芯と軽いスモーキーな奥行きを添える。',

    '2023 Weissburgunder Gutswein':
      'カイザーシュトゥール由来の温かさと土壌の輪郭が、白い果実のやわらかさに程よい芯とミネラル感を与える。',

    '2023 Grauburgunder Gutswein':
      'あたたかい火山性土壌とレスの環境が、Grauburgunderらしい丸みを育てながら、後半に軽い張りを残す。',
  },

  dautel: {
    '2022 Lemberger VDP.Gutswein':
      'ヴュルテンベルクらしい keuper 系の骨格感を下敷きに、果実とスパイスの輪郭を保ちながら、過度に重くならないバランスへ導いている。',

    '2023 Spätburgunder VDP.Gutswein':
      '土壌の個性は前に出しすぎず、Dautelらしい石灰質と keuper 由来の張りが、果実の純度と飲み心地の整い方を支える。',

    '2024 Jakob D.':
      'Gipskeuper と石灰質を含む複雑な土壌由来の骨格が、濃さだけに流れない張りと奥行きをワインに与える。',
  },

  horstSauer: {
    '2024 Escherndorfer Silvaner trocken VDP.Ortswein':
      'フランケンの石灰質土壌由来の引き締まった芯が、Silvaner の落ち着いた果実感に塩気と緊張感を添える。',

    '2023 Escherndorf Riesling trocken':
      'エッシェンドルフ周辺の石灰質土壌が、果実の明るさを支えつつ、後半にチョーキーな緊張感を残す。',

    '2023 Silvaner brut Sekt b.A.':
      'フランケンらしい石灰質の引き締まりが、泡の輪郭を整え、後味に軽い塩気と清潔感を残す。',
  },

  ludwig: {
    '2024 Thörnicher Riesling trocken':
      'Thörnich のスレート土壌由来の石のような張りが、果実のやわらかさに直線的なミネラル感を通している。',

    '2023 Sauvignon Blanc trocken':
      '土壌の個性を過剰に主張させず、フレッシュな香りと酸の張りを素直に見せるスタイルで、後味に軽いミネラル感を残す。',

    'NV Riesling brut Sekt':
      'モーゼルのスレート由来の輪郭が、泡のきめを整え、後味に清潔なミネラル感を残す。',
  },

  jeanStodden: {
    '2023 Spätburgunder trocken':
      'Ahr らしい急斜面の土壌由来の引き締まりが、果実の明るさに緊張感と軽いスモーキーな奥行きを添える。',

    '2014 Recher Herrenberg Spätburgunder':
      'Recher Herrenberg の急斜面に広がる風化スレートと greywacke が、果実の厚みを支えつつ、ワインに力強い骨格と緊張感を与える。',

    '2022 Blanc de Noir':
      'Ahr の冷涼な畑由来の張りが、果実のやわらかさを支え、白仕立てでも芯のあるミネラル感として表れている。',
  },

  hamm: {
    '2017 Rheingau Riesling feinherb':
      'ラインガウの冷涼さと川沿いの穏やかな成熟環境が、果実のやわらかさに軽い張りを添え、甘みを重く見せずに整えている。',
  },

  burklinWolf: {
    '2022 Riesling trocken':
      'ファルツの石灰質と砂・粘土を含む土壌由来の張りが、果実の明るさに骨格と塩気のある余韻を与える。',

    '2017 FASS 68 Ruppertsberger Riesling':
      'Ruppertsberg 由来の石っぽいミネラル感が、果実の熟度に流されない芯を与え、後味をきれいに引き締める。',
  },
} as const;

export type WineSoilCopy = typeof wineSoilCopy;
