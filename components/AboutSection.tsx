'use client';

import React from 'react';
import NorenBlobs from './NorenBlobs';
import CornerWash from './ui/CornerWash';

export default function AboutSection() {
  return (
    <section id="about" className="section about hasBlobs pb-20 lg:pb-24">
      <NorenBlobs variant="philosophy" layout="C" className="noren-blobs--ultrasoft" />
      <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12 aboutContent">
        <div className="aboutRule" aria-hidden="true" />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(520px,600px)]">
          <div className="aboutLead min-w-0 max-w-[62ch]">
            <div className="kicker">ABOUT / 私たちについて</div>
            <h2 className="section-title-mincho !text-3xl !leading-tight !tracking-[0.02em] !text-neutral-900 break-keep hyphens-none [text-wrap:balance] md:!text-4xl">
              <span className="whitespace-normal break-keep hyphens-none [text-wrap:balance]">
                ワインを、<wbr />
                表現に変える<wbr />
                パートナーとして。
              </span>
            </h2>

            <div className="mt-5 max-w-[62ch] space-y-4 whitespace-normal break-keep hyphens-none [text-wrap:pretty] text-[13px] leading-[2.0] text-neutral-700">
              <p>
                FINDESTは約30年来、<wbr />
                ドイツワイン13生産地域のうち<wbr />
                7エリア・10ワイナリーを<wbr />
                直輸入しています。
              </p>
              <p>
                長年にわたるワイン生産者の選定は、<wbr />
                FINDEST「四つの軸」<wbr />
                （品質軸・生命軸・自分軸・芸術軸）に基づき、<wbr />
                重ねてきました。
              </p>
              <p>
                月日を経た今、皆、<wbr />
                世界基準の星付きトップワイナリーとして<wbr />
                評されています。
              </p>
            </div>
          </div>

          <div className="w-full min-w-0 lg:min-w-[480px] lg:max-w-[600px]">
            <div className="aboutAxesPanel rounded-3xl border border-black/5 bg-white/18 p-6 lg:mt-2 lg:p-8">
              <CornerWash corner="tl" size={520} mobileSize={400} opacity={0.2} mobileOpacity={0.16} offset={112} />
              <div className="aboutAxesPanelInner relative z-10 min-w-0">
                <div className="mb-4 text-[11px] tracking-[0.18em] text-neutral-500">私たちの【四つの軸】</div>

                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <article className="w-full min-w-0 rounded-2xl border border-black/5 bg-white/22 p-6 shadow-none">
                    <h3 className="jp-serif-heading text-[14px] font-semibold tracking-[0.08em] text-neutral-900 break-keep hyphens-none [text-wrap:balance] md:text-[15px]">品質軸</h3>
                    <div className="mt-3 space-y-3 text-[13px] leading-[1.95] text-neutral-700 max-w-[30ch]">
                      <p>先入観や固定概念に影響されない視点で、体感覚を重んじる。</p>
                      <p>結果として、再現性と完成度を備え、時間を経ても揺るがない構造を持つワインが選ばれている。</p>
                    </div>
                  </article>

                  <article className="w-full min-w-0 rounded-2xl border border-black/5 bg-white/22 p-6 shadow-none">
                    <h3 className="jp-serif-heading text-[14px] font-semibold tracking-[0.08em] text-neutral-900 break-keep hyphens-none [text-wrap:balance] md:text-[15px]">生命軸</h3>
                    <div className="mt-3 space-y-3 text-[13px] leading-[1.95] text-neutral-700 max-w-[30ch]">
                      <p>微細なミクロから宇宙的なマクロまで、生命の関係性を観察/体感しながら関り続ける姿勢。</p>
                      <p>効率の対象として扱うワインではなく、微生物から宇宙と地球の関係や影響を、思想や理念を取り入れる生産者も、経験と体感によって感得する生産者も含む。いずれの場合も、ブドウの樹だけでなく生命を包括的に循環の中の一部と捉え、統合的な洞察によって判断や決断を導く生産者に育てられたワインを選定。</p>
                    </div>
                  </article>

                  <article className="w-full min-w-0 rounded-2xl border border-black/5 bg-white/22 p-6 shadow-none">
                    <h3 className="jp-serif-heading text-[14px] font-semibold tracking-[0.08em] text-neutral-900 break-keep hyphens-none [text-wrap:balance] md:text-[15px]">自分軸</h3>
                    <div className="mt-3 space-y-3 text-[13px] leading-[1.95] text-neutral-700 max-w-[30ch]">
                      <p>FINDESTとしては、</p>
                      <p>水平と垂直と今ここの意思選択の３つの視点で自分軸を考える。</p>
                      <p>ワインにおいても地域・家系・当主の意思選択が現れているものを秀逸とみなす。</p>
                    </div>
                  </article>

                  <article className="w-full min-w-0 rounded-2xl border border-black/5 bg-white/22 p-6 shadow-none">
                    <h3 className="jp-serif-heading text-[14px] font-semibold tracking-[0.08em] text-neutral-900 break-keep hyphens-none [text-wrap:balance] md:text-[15px]">芸術軸</h3>
                    <div className="mt-3 space-y-3 text-[13px] leading-[1.95] text-neutral-700 max-w-[30ch]">
                      <p>多くの人が「これは！」と感じる構造を持ちながら、受け取り手ごとに異なる意味を立ち上げられる余白を備えている状態を芸術軸とする。</p>
                      <p>自分らしさを引き受けた覚悟が、独特の調和を生み、美として自然に立ち上がるもの。</p>
                      <p>FINDESTが扱うワインは、記憶に残り、像が立ち上がり、物語として続き、受け取り手ごとに異なる意味を生む作品性を持つ。</p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
