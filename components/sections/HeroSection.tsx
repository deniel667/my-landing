import type { HeroData } from '@/data/my-landing/site';
import NorenBlobs from '@/components/NorenBlobs';

type Props = { data: HeroData };

export default function HeroSection({ data }: Props) {
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
          <div className="hero-content-block">
            <div className="hero-micro-haze">
              <div className="hero-headline-stack">
                <p className="hero-kicker-small">Dark Noren / Entrance</p>
                <p className="hero-kicker">{data.eyebrow}</p>
                <h1 className="hero-title">
                  <span className="hero-title-line">{data.lead[0]}</span>
                  <br />
                  <span className="hero-title-line">{data.lead[1]}</span>
                  <br />
                  <span className="hero-title-line">{data.lead[2]}</span>
                </h1>
              </div>
              <div className="hero-lower-content">
                <p className="hero-subcopy">{data.sub}</p>
                <div className="hero-actions">
                  <a href={data.ctas[0].href} className="cta-button cta-button-paper hero-action-button hero-action-primary">
                    {data.ctas[0].label}
                  </a>
                  <a href={data.ctas[1].href} className="cta-button cta-button-ghost hero-action-button hero-action-secondary">
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
