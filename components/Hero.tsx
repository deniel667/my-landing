import { site } from "@/data/my-landing/site";

export default function Hero() {
  const { hero } = site;
  const [line1, line2] = hero.title.split("\n");

  return (
    <header className="hero-gradient relative min-h-screen pt-24 pb-16 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      <div className="absolute right-8 top-32 hidden lg:block text-xs text-text-secondary tracking-[0.3em] writing-vertical h-96 border-l border-line pl-4 opacity-40">
        ドイツ辛口ワイン専門インポーター
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-cue">
        <span className="text-[10px] tracking-[0.3em] text-text-secondary uppercase">{hero.scroll}</span>
        <div className="w-px h-12 bg-line" />
      </div>

      <div className="col-span-1 md:col-span-10 md:col-start-2 flex flex-col justify-center h-full">
        <div className="mb-8 fade-in">
          <span className="text-accent text-sm tracking-widest mb-4 block">{hero.eyebrow}</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
            {line1}
            <br />
            <span className="italic font-light">Technical</span> {line2?.replace("Technical ", "")}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 fade-in delay-100">
          <div>
            <h2 className="font-serif text-xl leading-relaxed mb-6 text-text">
              {hero.lead[0]}
              <br />
              {hero.lead[1]}
              <br />
              {hero.lead[2]}
            </h2>
          </div>

          <div className="flex flex-col justify-between">
            <p className="text-text-secondary text-sm leading-7 mb-8">{hero.sub}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {hero.ctas.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  className="premium-btn inline-flex items-center justify-center px-10 py-4 border border-text text-text text-xs tracking-[0.2em] uppercase"
                >
                  {cta.label.replace("→", "")}
                  <span className="arrow-motion ml-2">→</span>
                </a>
              ))}
            </div>
            <p className="mt-4 text-[10px] text-text-secondary">{hero.note}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
