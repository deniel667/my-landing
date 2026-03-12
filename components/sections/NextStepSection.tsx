import CornerWash from '@/components/ui/CornerWash';

export default function NextStepSection() {
  return (
    <section className="next-step-layout" aria-label="NEXT STEP / お問い合わせ">
      <span className="next-step-top-line" aria-hidden="true" />
      <div className="next-step-grid">
        <header className="next-step-left">
          <p className="next-step-eyebrow">NEXT STEP / お問い合わせ</p>
          <h2 className="next-step-title break-keep hyphens-none [text-wrap:balance]">
            <span className="next-step-title-line">ワインを、表現に変える。</span>
            <span className="next-step-title-line">パートナーとして。</span>
          </h2>
          <p className="next-step-support">
            厳選したワインを、店の“場”に合わせて提案し、
            <br />
            導入まで一貫して伴走します。
          </p>
        </header>

        <aside className="next-step-right relative overflow-hidden rounded-2xl border border-black/5 p-8 lg:p-10">
          <CornerWash corner="tr" size={520} mobileSize={400} opacity={0.2} mobileOpacity={0.16} offset={112} />
          <div className="relative z-10 min-w-0">
            <p className="next-step-mini">提供内容</p>
            <ul className="next-step-list">
              <li>店の“場”に合わせたセレクト</li>
              <li>体験として成立する提供設計</li>
              <li>現場で伝わる説明サポート（スタッフが使える一言コメント）</li>
            </ul>
            <p className="next-step-prompt jp-serif-heading">まずは、状況をお聞かせください</p>

            <div className="next-step-cta-row">
              <a href="#contact-final" className="cta-button cta-button-ink next-step-cta">フォームへ進む →</a>
              <a href="#contact-final" className="cta-button next-step-cta next-step-cta-outline">資料請求</a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
