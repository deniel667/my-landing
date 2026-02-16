export type HeroData = {
  eyebrow: string;
  title: string;
  lead: [string, string, string];
  sub: string;
  ctas: Array<{ label: string; href: string }>;
  note: string;
  scroll: string;
};

export type SiteData = {
  hero: HeroData;
};

export const site: SiteData = {
  hero: {
    eyebrow: '「表現者から表現者へ」',
    title: 'Pure Terroir.\nTechnical Precision.',
    lead: [
      'ワインで、場の品格を整える',
      '「どのワインを置くか」ではなく、',
      '「何を表現するか、どう表現するか」まで。',
    ],
    sub: '業務用導入：条件（料理・客層・価格帯・本数）を伺い、最短で提案します。',
    ctas: [
      { label: '導入相談→', href: '#contact' },
      { label: '資料請求（PDF）→', href: '#contact' },
    ],
    note: '※ 原則1営業日以内に返信いたします',
    scroll: 'SCROLL',
  },
};

export default site;
