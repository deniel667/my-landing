'use client';

import { useEffect, useState } from 'react';
import type { HeroData } from '@/data/my-landing/site';
import NorenBlobs from '@/components/NorenBlobs';

type Props = { data: HeroData };

export default function HeroSection({ data }: Props) {
  const IG_WEB = 'https://www.instagram.com/findest_japan/';
  const [igHref, setIgHref] = useState(IG_WEB);
  const leadText = data.lead.filter(Boolean).join(' ');
  const isInstagramCta = (href: string, label: string) => `${href} ${label}`.toLowerCase().includes('instagram');
  const cta0IsInstagram = isInstagramCta(data.ctas[0]?.href ?? '', data.ctas[0]?.label ?? '');
  const cta1IsInstagram = isInstagramCta(data.ctas[1]?.href ?? '', data.ctas[1]?.label ?? '');

  useEffect(() => {
    const ua = navigator.userAgent ?? '';
    if (/iPhone|iPad|iPod/i.test(ua)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIgHref('instagram://user?username=findest_japan');
      return;
    }
    if (/Android/i.test(ua)) {
      setIgHref('intent://instagram.com/_u/findest_japan/#Intent;package=com.instagram.android;scheme=https;end');
      return;
    }
    setIgHref(IG_WEB);
  }, []);

  return (
    <header id="hero" className="hero-noren">
      <div className="hero-noren-bg" aria-hidden="true">
        <span className="hero-layer hero-base" />
        <span className="hero-layer hero-folds" />
        <span className="hero-layer hero-grain" />
        <span className="hero-layer hero-vignette" />
      </div>
      <NorenBlobs variant="heroDark" layout="A" />
      <span
        className="hero-barrel-layer"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 'auto',
          width: '58%',
          display: 'block',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.14,
          backgroundImage: "url('/story/barrel-new-copy.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundSize: 'cover',
          filter: 'grayscale(100%) sepia(32%) saturate(58%) blur(1.3px) contrast(1.2) brightness(0.76)',
          WebkitMaskImage:
            'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 24%, rgba(0,0,0,0.78) 58%, rgba(0,0,0,1) 100%)',
          maskImage:
            'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 24%, rgba(0,0,0,0.78) 58%, rgba(0,0,0,1) 100%)',
        }}
      />
      <span
        aria-hidden="true"
        className="hero-barrel-fade-layer"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 'auto',
          width: '58%',
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.2) 58%, rgba(0,0,0,0.06) 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.16) 26%, rgba(0,0,0,0.82) 58%, rgba(0,0,0,1) 100%)',
          maskImage:
            'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.16) 26%, rgba(0,0,0,0.82) 58%, rgba(0,0,0,1) 100%)',
        }}
      />

      <div className="container hero-grid-wrap">
        <div className="grid12 hero-grid">
          <div className="hero-content-block min-w-0">
            <div className="hero-micro-haze">
              <div className="hero-headline-stack">
                <p className="hero-kicker-small">Dark Noren / Entrance</p>
                <p className="hero-kicker">{data.eyebrow}</p>
                <div id="hero-wrap-text-only-29" className="hero-headline-wrap w-full min-w-0">
                  <h1 className="hero-title inline-block max-w-[34ch] md:max-w-[32ch] lg:max-w-[30ch] xl:max-w-[28ch] [text-wrap:balance] break-keep hyphens-none whitespace-normal [word-break:keep-all] [writing-mode:horizontal-tb]">
                    {leadText}
                  </h1>
                </div>
              </div>
              <div className="hero-lower-content">
                <p className="hero-subcopy">{data.sub}</p>
                <div className="hero-actions">
                  <a
                    href={cta0IsInstagram ? igHref : data.ctas[0].href}
                    target={cta0IsInstagram ? '_blank' : undefined}
                    rel={cta0IsInstagram ? 'noreferrer' : undefined}
                    aria-label={cta0IsInstagram ? 'Instagram (opens in app if available)' : undefined}
                    className="cta-button cta-button-paper hero-action-button hero-action-primary"
                  >
                    {data.ctas[0].label}
                  </a>
                  <a
                    href={cta1IsInstagram ? igHref : data.ctas[1].href}
                    target={cta1IsInstagram ? '_blank' : undefined}
                    rel={cta1IsInstagram ? 'noreferrer' : undefined}
                    aria-label={cta1IsInstagram ? 'Instagram (opens in app if available)' : undefined}
                    className="cta-button cta-button-ghost hero-action-button hero-action-secondary"
                  >
                    {data.ctas[1].label}
                  </a>
                </div>
                <p className="hero-note">{data.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
