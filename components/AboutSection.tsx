'use client';

import React from 'react';
import NorenBlobs from './NorenBlobs';

export default function AboutSection() {
  return (
    <section id="about" className="section about hasBlobs">
      <NorenBlobs variant="philosophy" layout="C" className="noren-blobs--ultrasoft" />
      <div className="container aboutContent">
        <div className="aboutRule" aria-hidden="true" />

        <div className="aboutGrid">
          <div className="aboutLead">
            <div className="kicker">ABOUT / 私たちについて</div>
            <h2 className="h2">
              <span className="aboutTitleLine">ワインを、表現に変える。</span>
              <span className="aboutTitleLine">パートナーとして。</span>
            </h2>

            <p className="p">
              FINDESTは、ワインをただ届けるのではなく、店の“場”に合わせた提案と、導入・運用までを一貫して伴走します。
              <br />
              造り手の思想と品質を、現場で伝わる表現に整えることが私たちの役割です。
            </p>
          </div>

          <div className="aboutAxes">
            <div className="axesTitle">私たちの4つの軸</div>

            <div className="axesPanel">
              <div className="axisRow">
                <div className="axisName">自分軸</div>
                <div className="axisDesc">造り手が流行ではなく、自らの意思で造っているか</div>
              </div>
              <div className="axisRow">
                <div className="axisName">芸術性</div>
                <div className="axisDesc">味わいが人の感性を動かす表現になっているか</div>
              </div>
              <div className="axisRow">
                <div className="axisName">高品質</div>
                <div className="axisDesc">再現性、完成度、世界基準の評価を備えているか</div>
              </div>
              <div className="axisRow">
                <div className="axisName">生命軸</div>
                <div className="axisDesc">自然と人が共に生きる循環の中で生まれているか</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
