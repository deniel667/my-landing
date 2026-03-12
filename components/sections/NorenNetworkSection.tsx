'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import NorenBlobs from '@/components/NorenBlobs';
import CornerWash from '@/components/ui/CornerWash';
import SideNavIndicator from '../SideNavIndicator';

const tiers = [
  {
    id: 'network-1',
    axis: '① 取扱店',
    summary: 'FINDESTワインを扱ってくださる場。既に流儀をお持ちの店舗。',
    condition: '格あるお客様と、格ある生産者をこの場に繋げる',
    form: '',
  },
  {
    id: 'network-2',
    axis: '② 共創パートナー',
    summary: 'ワインを卸すだけでなく、',
    condition: '「店や組織などの場の自分軸を可視化する」ことをサポート',
    form: '',
  },
  {
    id: 'network-3',
    axis: '③ 場の創造パートナー',
    summary: 'FINDESTは、既に独自のテーマやコミュニティを持つ方々と協働します。',
    condition: '具体的には、イベント主催者、IR関係者、コミュニティオーナー、酒販店、問屋、等',
    form: '',
  },
  {
    id: 'network-4',
    axis: '④公認パートナー（暖簾システム）',
    summary:
      '理念と世界観を理解し、「四つの軸」や「ワインMK作法」などを実践。表現の為の場を自ら持ち、地域やカテゴリーや分野、社会の文化的姿勢の再設計を共にしていただける方。表現を支えるためにFINDESTの構造が使えます。',
    condition: '理念と構造を「型」として共有し、「FINDESTセレクトのワインを体験できる店・場」として紹介される暖簾を授け、共に体現する。',
    form: '自分らしさ、その場らしさの再発見サポート',
  },
] as const;

function PartnerTierCopy({ id }: { id: (typeof tiers)[number]['id'] }) {
  if (id === 'network-1') {
    return (
      <div className="network-lines">
        <p className="network-line">FINDESTワインを扱ってくださる場。既に流儀をお持ちの店舗。</p>
        <p className="network-line">既存の流儀の中にワインを重ね、型を壊さずに寄り添う関係です。</p>

        <p className="network-line network-line-follow">格あるお客様と、格ある生産者をこの場に繋げる</p>
        <p className="network-line">店舗様固有の名称のワインパッケージを設計させていただき、お客様を繋ぐ。</p>
      </div>
    );
  }

  if (id === 'network-2') {
    return (
      <div className="network-lines">
        <p className="network-line">ワインを卸すだけでなく、</p>
        <p className="network-line">「店や組織などの場の自分軸を可視化する」ことをサポート</p>
        <p className="network-line">それにより、その場の目標達成や「自分らしい成功」が実現化されます。</p>
      </div>
    );
  }

  if (id === 'network-3') {
    return (
      <div className="network-lines">
        <p className="network-line">FINDESTは、既に独自のテーマやコミュニティを持つ方々と協働します。</p>
        <p className="network-line">具体的には、イベント主催者、IR関係者、コミュニティオーナー、酒販店、問屋、等</p>
        <ul className="network-case-intro-list">
          <li>・既に自分の場を持っている</li>
          <li>・自分の世界観がある</li>
          <li>・審美眼がある</li>
          <li>・選ぶ責任を引き受けている</li>
          <li>・テーマを扱える</li>
          <li>・人を集められる</li>
          <li>・思想を伝播できる　等</li>
        </ul>

        <p className="network-line network-line-follow">FINDESTは本質を保ったまま、素材提供と共に、</p>
        <p className="network-line">設計側の意図を、より響く形に調律します。</p>
        <p className="network-line">この創造パートナーが伝えたいことを、ワインという別のアングルからのアプローチを加えることで、膨らみを持たせ魅力的にします。</p>
      </div>
    );
  }

  return null;
}

const FALLBACK_CASE_IMAGE = '/story/story-trip-collage.jpg';
const CASE1_IMAGES = [
  { src: '/story/rpng1.jpg', alt: '六本木参考画像 1' },
  { src: '/story/rpng2.jpg', alt: '六本木参考画像 2' },
  { src: '/story/rpng3.jpg', alt: '六本木参考画像 3' },
  { src: '/story/rpng4.jpg', alt: '六本木参考画像 4' },
  { src: '/story/rpng5.jpg', alt: '六本木参考画像 5' },
  { src: '/story/rpng6.jpg', alt: '六本木参考画像 6' },
] as const;

const CASE2_IMAGES = [
  { src: '/story/crsm2.jpg', alt: 'クリスマスマーケット参考画像 2' },
  { src: '/story/crsm1.jpg', alt: 'クリスマスマーケット参考画像 1' },
  { src: '/story/crsm3.jpg', alt: 'クリスマスマーケット参考画像 3' },
  { src: '/story/crsm4.jpg', alt: 'クリスマスマーケット参考画像 4' },
  { src: '/story/crsm5.jpg', alt: 'クリスマスマーケット参考画像 5' },
  { src: '/story/crsm6.jpg', alt: 'クリスマスマーケット参考画像 6' },
  { src: '/story/crsm7.jpg', alt: 'クリスマスマーケット参考画像 7' },
] as const;

function CaseImage({
  src,
  alt,
  width,
  height,
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
}) {
  const [safeSrc, setSafeSrc] = useState(src);

  useEffect(() => {
    setSafeSrc(src);
  }, [src]);

  return (
    <Image
      src={safeSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      quality={72}
      sizes={sizes}
      onError={() => {
        if (safeSrc !== FALLBACK_CASE_IMAGE) setSafeSrc(FALLBACK_CASE_IMAGE);
      }}
    />
  );
}

export default function NorenNetworkSection() {
  const [isCasesOpen, setIsCasesOpen] = useState(false);
  const portalTarget = typeof document === 'undefined' ? null : document.body;

  useEffect(() => {
    if (!isCasesOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsCasesOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCasesOpen]);

  return (
    <section className="editorial-section network-layout panel-section section-reveal-root !pt-4 !pb-10 lg:!pt-6 lg:!pb-12">
      <NorenBlobs variant="relations" layout="A" />
      <div className="grid12 editorial-grid min-w-0">
        <aside className="editorial-side-flow editorial-side-sticky w-full min-w-0 relative overflow-hidden rounded-2xl border border-black/5 bg-white/0">
          <CornerWash corner="tl" size={520} mobileSize={400} opacity={0.2} mobileOpacity={0.16} offset={112} />
          <div className="relative z-10 min-w-0 p-7 text-left lg:p-8">
            <p className="section-kicker">
              <span className="tracking-[0.35em]">NOREN NETWORK</span>
              <span className="mx-2 tracking-[0.08em]">/</span>
              <span className="tracking-[0.08em]">関係性</span>
            </p>
            <h2 className="section-title-mincho break-keep hyphens-none leading-tight [text-wrap:balance]">
              FINDESTの
              <br />
              四つの関係性
            </h2>
            <SideNavIndicator
              items={tiers.map((tier) => ({
                id: tier.id,
                label: tier.axis,
              }))}
              className="side-nav network-side-nav min-w-0"
            />
          </div>
        </aside>

        <div className="editorial-main min-w-0">
          {tiers.map((tier) => (
            <article key={tier.id} id={tier.id} className="editorial-panel network-panel section-reveal">
              <h3 className="editorial-panel-title break-keep hyphens-none [text-wrap:balance]">{tier.axis}</h3>
              {tier.id === 'network-1' || tier.id === 'network-2' || tier.id === 'network-3' ? (
                <PartnerTierCopy id={tier.id} />
              ) : (
                <>
                  <p className="network-summary">{tier.summary}</p>

                  <div className="network-lines">
                    <p className="network-line">{tier.condition}</p>
                    {tier.form ? <p className="network-line network-line-follow">{tier.form}</p> : null}
                  </div>
                </>
              )}

            </article>
          ))}
        </div>
      </div>

      {portalTarget && isCasesOpen
        ? createPortal(
        <div className="network-case-overlay" role="dialog" aria-modal="true" aria-label="参考事例" onClick={() => setIsCasesOpen(false)}>
          <div className="network-case-modal" onClick={(event) => event.stopPropagation()}>
            <div className="network-case-header">
              <h3 className="network-case-title break-keep hyphens-none [text-wrap:balance]">過去の事例</h3>
              <button type="button" className="network-case-close" aria-label="閉じる" onClick={() => setIsCasesOpen(false)}>
                ×
              </button>
            </div>
            <div className="network-case-body">
              <div className="network-case-intro">
                <p>FINDESTは、ワインを提供するだけでなく</p>
                <p>テーマを具体化し、</p>
                <p>場を変え、</p>
                <p>集客と体験を同時に設計してきました。</p>
                <p>文化を翻訳し、空間を再設計し、集客を増幅。</p>
                <ul className="network-case-intro-list">
                  <li>• コンセプトを構造化</li>
                  <li>• 体験を増幅</li>
                </ul>
              </div>
              <div className="network-case-grid">
                <section className="network-case-group">
                  <p className="network-case-label">Case 1</p>
                  <h4 className="network-case-group-title">六本木ヒルズ ドイツレストラン</h4>
                  <p className="network-case-evidence">EVIDENCE</p>
                  <div className="network-case-subgrid network-case-subgrid--triple">
                    {CASE1_IMAGES.map((image) => (
                      <CaseImage key={image.src} src={image.src} alt={image.alt} width={900} height={675} sizes="(max-width: 767px) 50vw, 220px" />
                    ))}
                  </div>
                  <div className="network-case-copy">
                    <p className="network-case-copy-label">Case 1</p>
                    <h5 className="network-case-copy-title">六本木ヒルズ ドイツレストラン</h5>
                    <ul className="network-case-checklist">
                      <li>
                        <p>✔ 共有テラスの使用交渉</p>
                        <p>ヨーロッパの開放的な街並みを再現。</p>
                        <p>共有テラスを交渉し、「街とつながる」場に変えた。</p>
                        <ul className="network-case-subpoints">
                          <li>●空間の再定義</li>
                          <li>●文化翻訳</li>
                        </ul>
                        <p>ヨーロッパの開放的空気を</p>
                        <p>東京の都市空間に移植。</p>
                      </li>
                      <li>
                        <p>✔ 壁画・天井画の特注制作</p>
                        <p>ドイツ文化を象徴するビジュアル演出。</p>
                        <p>店を単なる飲食店から“文化空間”へ（物語の増幅）</p>
                        <ul className="network-case-subpoints">
                          <li>●滞在時間の延長</li>
                          <li>● 記憶への定着</li>
                        </ul>
                      </li>
                      <li>
                        <p>✔ 外壁をガラス化し、外から見える暖炉を設置</p>
                        <p>冬でも温もりが伝わる視覚設計。（心理的ハードルを下げる）</p>
                        <ul className="network-case-subpoints">
                          <li>●“寒いドイツ”ではなく、“温もりあるドイツ”を見せる。</li>
                        </ul>
                      </li>
                      <li>
                        <p>✔ 2メートルの特注ビアグラスオブジェ</p>
                        <p>看板商品を象徴化し、話題化。</p>
                        <p>商品を「飲み物」から「文化の象徴」に昇華。</p>
                        <ul className="network-case-subpoints">
                          <li>●アイコン設計</li>
                        </ul>
                      </li>
                    </ul>
                    <p className="network-case-result">結果：</p>
                    <p>その区画の歴代テナントの7倍の売上を達成。</p>
                  </div>
                </section>
                <section className="network-case-group network-case-group--christmas">
                  <p className="network-case-label">Case 2</p>
                  <h4 className="network-case-group-title">ドイツ・クリスマスマルクト（屋外イベント）</h4>
                  <p className="network-case-evidence">EVIDENCE</p>
                  <div className="network-case-subgrid">
                    {CASE2_IMAGES.map((image) => (
                      <CaseImage key={image.src} src={image.src} alt={image.alt} width={1200} height={900} sizes="(max-width: 767px) 50vw, 280px" />
                    ))}
                  </div>
                  <div className="network-case-copy">
                    <p className="network-case-copy-label">Case 2</p>
                    <h5 className="network-case-copy-title">ドイツ・クリスマスマルクト（屋外イベント）</h5>
                    <p>ドイツ文化を象徴する冬のイベント。</p>
                    <p>私たちは</p>
                    <p>単なる模倣ではなく</p>
                    <p>“翻訳”を行いました。</p>
                    <ul className="network-case-checklist">
                      <li>
                        <p>✔ シュトゥットガルト式の飾り屋根を採用</p>
                      </li>
                      <li>
                        <p>✔ 宗教的配慮を踏まえ、</p>
                        <p>マリア像ではなくグリム童話のキャラクターを</p>
                        <p>ドイツ職人チームに特注制作</p>
                      </li>
                    </ul>
                    <p>文化的意味を理解し、</p>
                    <p>日本社会に適した形に再構築。</p>
                    <p className="network-case-result">結果：</p>
                    <p>10万人超の動員。</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
          , portalTarget)
        : null}
    </section>
  );
}

