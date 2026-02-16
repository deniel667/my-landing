import NorenBlobs from '@/components/NorenBlobs';
import SideNavIndicator from '../SideNavIndicator';

const tiers = [
  {
    id: 'network-1',
    axis: '① 取扱店',
    summary: 'FINDESTワインを扱ってくださる場。既存の流儀の中にワインを重ね、型を壊さずに寄り添う関係です。',
    condition: '何を大切にしているか、誰に届けたいか',
    form: '導入の意図がメニュー上で伝わる',
  },
  {
    id: 'network-2',
    axis: '② 共鳴店',
    summary: '志と自分軸を持ち、場を丁寧に育てようとしている店。共鳴はすべての起点です。',
    condition: '光・音・温度・距離感',
    form: 'スタッフが無理なく説明でき、現場で回る',
  },
  {
    id: 'network-3',
    axis: '③ 協働パートナー',
    summary: '酒販店・問屋・イベントなど分野を越えて、審美眼とテーマ性を共有し、ワインの可能性を広げる関係です。',
    condition: '味の輪郭、余韻、ペアリングの狙い',
    form: 'ゲストに違いが伝わり、注文につながる',
  },
  {
    id: 'network-4',
    axis: '④ 公認パートナー',
    summary: '理念と世界観を理解し、四つの軸とワイン作法を実践する段階。表現を支える構造を共に運用します。',
    condition: '提供者の言葉と所作（無理なく伝わる形）',
    form: 'この店のための一本を、一緒に設計しませんか。',
  },
] as const;

export default function NorenNetworkSection() {
  return (
    <section className="editorial-section network-layout panel-section section-reveal-root">
      <NorenBlobs variant="relations" layout="A" />
      <div className="grid12 editorial-grid">
        <aside className="editorial-side-flow editorial-side-sticky section-cap">
          <p className="section-kicker">N O R E N&nbsp;&nbsp;N E T W O R K / 関 係 性</p>
          <h2 className="section-title-mincho">
            FINDESTの
            <br />
            四つの関係性
          </h2>
          <SideNavIndicator
            items={tiers.map((tier) => ({
              id: tier.id,
              label: tier.axis,
            }))}
            className="side-nav"
          />
        </aside>

        <div className="editorial-main">
          {tiers.map((tier) => (
            <article key={tier.id} id={tier.id} className="editorial-panel network-panel section-reveal">
              <h3 className="editorial-panel-title">{tier.axis}</h3>
              <p className="network-summary">{tier.summary}</p>

              <div className="network-two-col">
                <div className="network-cell">
                  <p className="mini-kicker">責任 / 条件</p>
                  <p>{tier.condition}</p>
                </div>
                <div className="network-cell">
                  <p className="mini-kicker">型（やり方）</p>
                  <p>{tier.form}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

