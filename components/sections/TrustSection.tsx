type Tier = {
  title: string;
  bullets: string[];
  note?: string;
  tierClass: string;
};

const tiers: Tier[] = [
  {
    title: '0.2% / 最高評価クラス',
    bullets: ['ドイツの中でも、約0.2%の最高評価クラス'],
    note: '※五つ星評価：Eichelmann『Deutschlands Weine』（該当年度版）を参照。',
    tierClass: 'trust-tier-top',
  },
  {
    title: 'VDP / 厳格な基準',
    bullets: [
      '取り扱い生産者の多くは、ドイツ高品質辛口ワイン協会VDP（Verband Deutscher Prädikatsweingüter）に所属。',
      'VDPは、畑・収穫量・醸造・品質基準において厳格な基準を設ける組織です。',
    ],
    tierClass: 'trust-tier-upper',
  },
  {
    title: 'Selection / 選定の思想',
    bullets: ['「流通の都合」ではなく、畑・収穫・醸造の哲学と品質基準で選び抜いています。'],
    tierClass: 'trust-tier-middle',
  },
  {
    title: 'Operation / 現場で回る',
    bullets: [
      '品質の一貫性と、導入後に“現場で回る”ことまで見据えて選定しています。',
      'FINDESTの基準は、流行ではなく“品質の再現性”と“導入後に回ること”。',
      '料理・客層・価格帯などの条件に合わせてご提案します。',
    ],
    tierClass: 'trust-tier-base',
  },
];

function TrustTier({ title, bullets, note, tierClass, showProofBadge = false }: Tier & { showProofBadge?: boolean }) {
  return (
    <article className={`trust-tier leftCard ${tierClass}`}>
      <header className="trust-tier-head">
        <h3>{title}</h3>
        {showProofBadge ? <p className="trust-proof-badge">0.2% TOP CLASS</p> : null}
      </header>
      <ul className="trust-tier-list">
        {bullets.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {note ? <p className="trust-tier-note">{note}</p> : null}
    </article>
  );
}

export default function TrustSection() {
  return (
    <section className="trust-layout panel-section section-reveal-root">
      <header className="trust-head section-cap section-reveal reveal-delay-0">
        <p className="section-kicker">T R U S T / 世 界 基 準</p>
        <h2 className="section-title-mincho">
          <span className="trust-title-line">世界基準で評価される、</span>
          <span className="trust-title-line">ドイツ高品質ワイン</span>
        </h2>
        <p className="trust-intro">FINDESTが扱うのは、世界的に評価の高いドイツの造り手による高品質ワインです。</p>
      </header>

      <div className="grid12 trust-grid">
        <div className="trust-left">
          <div className="trust-pyramid section-reveal reveal-delay-1">
            {tiers.map((tier, index) => (
              <TrustTier key={tier.title} {...tier} showProofBadge={index === 0} />
            ))}
          </div>

          <div className="trust-cta-row section-reveal reveal-delay-2">
            <a href="#contact" className="cta-button cta-button-ink">資料請求（PDF）</a>
            <a href="#contact" className="cta-button trust-cta-secondary">導入相談</a>
            <p className="trust-helper">※ 原則1営業日以内に返信いたします</p>
          </div>
        </div>

        <aside className="trust-vdp-module trust-vdp-dark-band vdpPanel section-reveal reveal-delay-2">
          <p className="trust-vdp-kicker title">
            VDP / 原産地階層
            <span className="trust-vdp-seal dot" aria-hidden="true" />
          </p>
          <p className="trust-vdp-caption sub">上に行くほど区画が厳選されます。</p>

          <div className="trust-vdp-pyramid steps" aria-label="VDP Classification">
            <span className="trust-vdp-spine" aria-hidden="true" />

            <div className="trust-vdp-row trust-vdp-row-gg">
              <p className="trust-vdp-spine-no idx idxPill" aria-hidden="true">01</p>
              <section className="trust-vdp-tier stepCard isTop trust-vdp-tier-gg">
                <div className="trust-vdp-copy">
                  <p className="trust-vdp-ja">グローセ・ラーゲ（畑の格付）/ GG（辛口）</p>
                  <p className="trust-vdp-en">TOP TIER (GRAND CRU SITE / DRY DESIGNATION)</p>
                  <p className="trust-vdp-desc">最上位の区画。GGはその区画の辛口ワイン。</p>
                </div>
              </section>
            </div>

            <div className="trust-vdp-row trust-vdp-row-1">
              <p className="trust-vdp-spine-no idx idxPill" aria-hidden="true">02</p>
              <section className="trust-vdp-tier stepCard trust-vdp-tier-1">
                <div className="trust-vdp-copy">
                  <p className="trust-vdp-ja">エアステ・ラーゲ</p>
                  <p className="trust-vdp-en">PREMIER CRU</p>
                  <p className="trust-vdp-desc">上位区画。地域の核となる畑。</p>
                </div>
              </section>
            </div>

            <div className="trust-vdp-row trust-vdp-row-2">
              <p className="trust-vdp-spine-no idx idxPill" aria-hidden="true">03</p>
              <section className="trust-vdp-tier stepCard trust-vdp-tier-2">
                <div className="trust-vdp-copy">
                  <p className="trust-vdp-ja">オルツヴァイン</p>
                  <p className="trust-vdp-en">VILLAGE</p>
                  <p className="trust-vdp-desc">村名の個性が出るワイン。</p>
                </div>
              </section>
            </div>

            <div className="trust-vdp-row trust-vdp-row-3">
              <p className="trust-vdp-spine-no idx idxPill" aria-hidden="true">04</p>
              <section className="trust-vdp-tier stepCard trust-vdp-tier-3">
                <div className="trust-vdp-copy">
                  <p className="trust-vdp-ja">グーツヴァイン</p>
                  <p className="trust-vdp-en">ESTATE</p>
                  <p className="trust-vdp-desc">生産者の基本となるスタイル。</p>
                </div>
              </section>
            </div>
          </div>
          <p className="trust-vdp-note caption">Grosse Lage = 畑の格付 / GG = その畑の辛口（dry）</p>
        </aside>
      </div>
    </section>
  );
}
