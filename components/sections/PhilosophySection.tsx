'use client';

import SideNavIndicator from '../SideNavIndicator';
import NorenBlobs from '@/components/NorenBlobs';

type PhilosophyBlock = {
  id: string;
  number: string;
  nav: string;
  heading: string;
  paragraphs: string[];
  emphasis?: string;
};

const blocks: PhilosophyBlock[] = [
  {
    id: 'philosophy-1',
    number: '①',
    nav: '① 理念',
    heading: '理念',
    paragraphs: [
      'FINDESTと関わるすべての場には、\n共通する理念があります。',
      'それは、',
      '品位と丁寧さを守ること。\nそして、自分軸を尊重すること。',
      'その理念を、\n私たちは二つの言葉で表しています。',
    ],
    emphasis: 'Sustainable Integrity（品位と丁寧さを守る）× Honoring Identity（自分軸を尊重）',
  },
  {
    id: 'philosophy-2',
    number: '②',
    nav: '② 目的',
    heading: '目的',
    paragraphs: [
      'FINDESTは、関わる場や人々において',
      '・近視眼的な消費や他人軸の評価に影響されていることに気付く\n・本質と向き合う姿勢を取り戻す\n・自分の感覚で受け取る',
      'このようなステイタスを作り出し\nワインを通した文化的姿勢の再設計を目指しています。',
    ],
  },
  {
    id: 'philosophy-3',
    number: '③',
    nav: '③ 共鳴',
    heading: '共鳴',
    paragraphs: [
      'FINDESTは、共鳴します。',
      '志を持つ人、\n自分軸を大切にする姿勢。',
      'そこに共鳴したとき、\n私たちはワインを重ねます。',
    ],
  },
  {
    id: 'philosophy-4',
    number: '④',
    nav: '④ 構造',
    heading: '構造',
    paragraphs: [
      '品位と丁寧さを守り\n自分軸を尊重するために\n私たちは構造ある適応を選びます。\n→ Structured Adaptation',
      'それは、無秩序な拡大ではなく、\n関係性に応じて深度を整えていくものです。',
    ],
  },
  {
    id: 'philosophy-5',
    number: '⑤',
    nav: '⑤ 暖簾',
    heading: '暖簾という発想～深度が深まった関係性～',
    paragraphs: [
      '日本文化の【暖簾 ～Noren～】に着想を得て、\n私たちは近視眼的ではなく、\n品位と軸を保ちながら展開するスタイルを取り入れました。',
      '暖簾分けとは本来、\n本家の信用（屋号）を預けられる相手にだけ、\n営業の権利と責任を分ける日本の商慣行です。',
      'FINDESTがここから学ぶのは、\n“数を増やす”ことだけではなく、\n浅い理解で価値を崩さないための「型（約束事）」を共有することです。',
      'この暖簾システムは、後述の【公認パートナー】に適用されます。',
    ],
  },
];

export default function PhilosophySection() {
  return (
    <section className="editorial-section philosophy-layout panel-section section-reveal-root" aria-label="PHILOSOPHY / 理念">
      <NorenBlobs variant="philosophy" layout="B" />
      <div className="grid12 editorial-grid">
        <aside className="editorial-side-flow editorial-side-sticky section-cap">
          <p className="section-kicker">P H I L O S O P H Y / 理 念</p>
          <h2 className="section-title-mincho">理念</h2>
          <SideNavIndicator
            items={blocks.map((block) => ({
              id: block.id,
              label: block.nav,
            }))}
            className="side-nav"
          />
        </aside>

        <div className="editorial-main philosophy-main-list">
          {blocks.map((block) => (
            <article key={block.id} id={block.id} className="editorial-panel philosophy-panel philosophy-item-row section-reveal">
              <div className="philosophy-item-no">{block.number}</div>
              <div className="philosophy-item-body">
                <h3 className="editorial-panel-title philosophy-item-title">{block.heading}</h3>
                {block.paragraphs.map((paragraph, index) => (
                  <p key={`${block.id}-${index}`} className="philosophy-preline">
                    {paragraph}
                  </p>
                ))}
                {block.emphasis ? <p className="philosophy-emphasis">{block.emphasis}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
