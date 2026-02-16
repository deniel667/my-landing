'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function StorySection() {
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
        threshold: 0.18,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section ref={rootRef} className={`story-layout ${isVisible ? 'is-visible' : ''}`}>
      <span className="story-top-rule" aria-hidden="true" />

      <header className="story-head">
        <p className="story-eyebrow">S T O R Y / 生 産 者 の 覚 悟</p>
        <h2 className="story-title">
          <span className="story-title-line">「売り方」ではなく、</span>
          <span className="story-title-line">人生をかけて</span>
          <span className="story-title-line">造られた一本を</span>
        </h2>
      </header>

      <div className="grid12 story-grid">
        <div className="story-main prose story-reveal story-delay-0">
          <p className="story-lead">それぞれのワイナリーには、長い歴史があります。成功だけでなく、失敗や葛藤、自然の厳しさと向き合いながら、命を削るようにして造られてきたワインがあります。</p>
          <p>FINDESTが選ぶ基準は、市場の都合や流行ではありません。造り手が自らの哲学で積み上げてきた品質と、そのワインが宿す背景です。</p>
          <p>FINDESTは、生産者の背景や想い、秘話を知っているからこそ、<span className="story-ink-underline">その「熱量」ごと、次の表現者へつなぐ</span>役割を担っています。</p>
          <p className="story-role">役割：生産者の熱量を、現場で伝わる体験へ橋渡しすること。</p>
        </div>

        <aside className="story-side story-reveal story-delay-1">
          <figure className="story-photo-card">
            <div className="story-photo-frame">
              <Image
                src="/story/story-vineyard-vine-v2.jpg"
                alt="葡萄畑の風景"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 34vw, 100vw"
              />
            </div>
            <figcaption className="story-caption">
              <p className="story-caption-kicker">VINEYARD / 畑の思想</p>
              <p className="story-caption-text">土地と向き合い、哲学を磨く。</p>
            </figcaption>
          </figure>
        </aside>

        <div className="story-bottom-block story-reveal story-delay-2">
          <figure className="story-bottom-figure">
            <div className="story-bottom-media">
              <Image
                src="/story/story-cellar-barrels-v2.jpg"
                alt="ワインボトルの棚"
                fill
                className="story-bottom-image object-cover"
                sizes="(min-width: 1024px) 100vw, 100vw"
              />
            </div>
            <figcaption className="story-caption story-caption-wide">
              <p className="story-caption-kicker">CELLAR / 時間</p>
              <p className="story-caption-text">静かな熟成が、表現の輪郭をつくる。</p>
              <p className="story-caption-sub">熟成という時間が、ワインの線を静かに磨いていく。</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
