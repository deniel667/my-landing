'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CornerWash from '@/components/ui/CornerWash';

const definitions = [
  ['想い', '何を大切にしているか、誰に届けたいか'],
  ['空間', '光・音・温度・距離感'],
  ['料理や人　その他ワインと共にあるもの', '味の輪郭、余韻、ペアリングや相性、統一感'],
  ['接客の形', '提供者の言葉や所作\n情報の届け方の多様性\n（リストや提供者だけが閲覧できる詳細ページやエンドユーザーも閲覧できるページの共創。）\n\nその場での伝わり方の探求）'],
] as const;

const results = ['導入の意図がメニュー上で伝わる', 'スタッフが無理なく説明でき、現場で回る', 'ゲストに違いが伝わり、注文につながる'] as const;

const options = [
  {
    title: 'スタッフ向けミニトレーニング（15-30分）',
    body: '無理なく伝わる“一言”と所作に落とし込みます。',
  },
  {
    title: 'テイスティング設計（テーマ型 / 比較型）',
    body: '「違いが伝わる順番」と“場の温度”を設計します。',
  },
  {
    title: 'メニュー表現・導入文の整備',
    body: '導入の意図がメニュー上で伝わる言葉へ。',
  },
  {
    title: '生産者ストーリーの共有（短文/QR）',
    body: '熱量を落とさず、短く現場に渡します。',
  },
  {
    title: 'ペアリング相談（料理の輪郭→逆算）',
    body: '余韻と狙いに合わせて提案を整えます。',
  },
] as const;

export default function ServiceSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section ref={rootRef} className={`service-layout panel-section section-reveal-root ${isVisible ? 'is-visible' : ''}`}>
      <div className="grid12 service-grid">
        <div className="service-main-stack service-signature-panel service-reveal service-delay-0">
          <CornerWash corner="tr" size={520} mobileSize={400} opacity={0.2} mobileOpacity={0.16} offset={112} />
          <div className="relative z-10 min-w-0">
            <header className="service-head section-cap service-reveal service-delay-0">
              <p className="section-kicker">
                <span className="tracking-[0.35em]">SERVICE</span>
                <span className="mx-2 tracking-[0.08em]">/</span>
                <span className="tracking-[0.08em]">提案</span>
              </p>
              <h2 className="section-title-mincho service-title break-keep hyphens-none [text-wrap:balance]">
                <span className="service-title-line">あなたの場のために、</span>
                <span className="service-title-line">オーダーメイドで</span>
                <span className="service-title-line">セレクトします</span>
              </h2>
              <p className="service-lead">私たちが最初に見るのは、ワインではなく、貴方の店の「世界観」です。</p>
            </header>

            <div className="service-main service-reveal service-delay-1">
              <div className="prose service-intro">
                <p>想い… 空間… 料理… 人…</p>
              </div>

              <div className="service-inputs-shell p-8 lg:p-10">
                <span className="service-inputs-blot" aria-hidden="true" />
                <p className="service-spec-kicker">設計の観点</p>
                <dl className="service-def-list">
                  {definitions.map(([term, desc]) => (
                    <div key={term} className="service-def-row">
                      <dt>
                        <span className="service-def-line" aria-hidden="true" />
                        {term}
                      </dt>
                      <dd>{desc}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="service-result-block service-result-left service-reveal service-delay-2">
              <p className="section-kicker service-result-kicker">
                <span className="tracking-[0.35em]">RESULT</span>
                <span className="mx-2 tracking-[0.08em]">/</span>
                <span className="tracking-[0.08em]">期待できること</span>
              </p>
              <ul className="service-result-list">
                {results.map((line, index) => (
                  <li key={line}>
                    <span className="service-result-index">{String(index + 1).padStart(2, '0')}</span>
                    <p className="service-result-text">{line}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-after-result service-reveal service-delay-2">
              <div className="prose service-closing">
                <p>生産者が子どものように大切に育て、人生を託してきたワインです。</p>
                <p>この店のための一本を、一緒に設計しませんか。</p>
                <p>各パートナーの「注文」を集めて次の発注をかけていきます。そのため、徐々に発注スパンを短くしつつあります。そうやってFINDESTだけの「世界に一つ」のアイテムも実現しました。</p>
                <p>私たちはその背景や想い、秘話を知っているからこそ、ワインの“熱量”ごと、次の表現者へつなぐ役割を担っています。</p>
              </div>

              <div className="service-cta-strip">
                <div className="service-cta-row">
                  <a href="#contact" className="cta-button cta-button-ink service-cta-primary">
                    <span>導入相談</span>
                    <span className="service-cta-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="#contact" className="cta-button service-cta-secondary">
                    <span>資料請求（PDF）</span>
                    <span className="service-cta-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
                <p className="service-helper-note">※ 原則1営業日以内に返信いたします</p>
              </div>
            </div>
          </div>
        </div>

        <div className="service-media-stack service-reveal service-delay-2">
          <figure className="service-photo-figure">
            <div className="service-photo-meta" aria-hidden="true">
              <span className="service-photo-meta-line" />
              <span className="service-photo-stamp">CURATION / ON SITE</span>
            </div>
            <div className="service-photo-wrap">
              <Image
                src="/story/shelf-custom.jpg.jpg"
                alt="ワインボトルの棚"
                fill
                className="object-cover object-[50%_18%] service-photo-image"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
            <figcaption className="service-photo-caption">
              <span className="service-caption-rule" aria-hidden="true" />
              生産者が子どものように大切に育て、人生を託してきたワインです。
            </figcaption>
          </figure>

          <section
            className="service-options"
            aria-label="追加サービス / Options"
            style={{
              marginTop: '18px',
              marginBottom: 0,
              paddingTop: '4px',
              display: 'grid',
              gap: '12px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '10.5px',
                letterSpacing: '0.16em',
                color: 'rgba(31, 27, 22, 0.66)',
              }}
            >
              追加サービス / Options
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '12.5px',
                lineHeight: 1.86,
                color: 'rgba(31, 27, 22, 0.82)',
              }}
            >
              必要に応じて、導入後の「現場で回る」までを支えます。
            </p>

            <div className="service-options-list" style={{ display: 'grid', gap: '16px', marginTop: '4px' }}>
              {options.map((item, index) => (
                <div key={item.title} className="service-options-row grid grid-cols-1 md:grid-cols-[34px_minmax(0,1fr)] gap-y-1 md:gap-x-3">
                  <p
                    className="service-options-no"
                    style={{
                      margin: 0,
                      fontSize: '11px',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      color: 'rgba(31, 27, 22, 0.56)',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <div style={{ display: 'grid', gap: '2px' }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '13px',
                        lineHeight: 1.82,
                        color: 'rgba(31, 27, 22, 0.9)',
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '12px',
                        lineHeight: 1.82,
                        color: 'rgba(31, 27, 22, 0.76)',
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p
              style={{
                margin: '2px 0 0',
                fontSize: '12px',
                lineHeight: 1.8,
                color: 'rgba(31, 27, 22, 0.66)',
              }}
            >
              ※必要なものだけ選べます（すべて必須ではありません）。
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
