type Tier = {
  title: string;
  bullets: string[];
  note?: string;
  tierClass: string;
};

const tiers: Tier[] = [
  {
    title: '体感を起点に選ぶ',
    bullets: ['まず大切なのは、場でどう体感されるか。味わい・余韻・料理との響き方を起点に選定します。'],
    tierClass: 'trust-tier-top',
  },
  {
    title: '評価は後からついてくる',
    bullets: [
      '星付きや外部評価は重要な参考情報ですが、出発点ではありません。',
      '体感に根ざした選定の結果として、評価が後から伴うと考えています。',
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
        <p className="section-kicker">
          <span className="tracking-[0.35em]">TRUST</span>
          <span className="mx-2 tracking-[0.08em]">/</span>
          <span className="tracking-[0.08em]">世界基準</span>
        </p>
        <h2 className="section-title-mincho break-keep hyphens-none [text-wrap:balance]">
          <span className="trust-title-line">評価の前に、体感覚がある。</span>
        </h2>
        <p className="trust-intro">はじめに「体感」ありき。星付きや評価は後からついてくる。FINDESTはこの順序を大切にしています。</p>
      </header>

      <div className="grid12 trust-grid trust-grid--single">
        <div className="trust-left">
          <div className="trust-pyramid section-reveal reveal-delay-1">
            {tiers.map((tier) => (
              <TrustTier key={tier.title} {...tier} />
            ))}
          </div>

          <div className="trust-cta-row section-reveal reveal-delay-2">
            <div className="trust-cta-actions">
              <a href="#contact" className="cta-button cta-button-ink">資料請求（PDF）</a>
              <a href="#contact" className="cta-button trust-cta-secondary">導入相談</a>
            </div>
            <p className="trust-helper">※ 原則1営業日以内に返信いたします</p>
          </div>
        </div>
      </div>
    </section>
  );
}
