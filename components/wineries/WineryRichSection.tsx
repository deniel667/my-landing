import Image from 'next/image';
import type { WineryTextSection } from '@/data/my-landing/wineries';

const ratioClass = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
  square: 'aspect-square',
};

export default function WineryRichSection({ section }: { section: WineryTextSection }) {
  if (section.tone === 'intro') return <IntroSection section={section} />;
  if (section.tone === 'fact') return <FactSection section={section} />;
  if (section.tone === 'spotlight') return <SpotlightSection section={section} />;

  const mediaFirst = section.media && section.layout === 'imageLeft';
  const toneClass =
    section.tone === 'tinted'
      ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(242,233,222,0.4))]'
      : section.tone === 'essay'
        ? 'bg-[linear-gradient(180deg,rgba(246,240,231,0.82),rgba(255,255,255,0.16))]'
        : 'bg-transparent';
  const wrapperClass =
    section.tone === 'essay'
      ? 'max-w-[980px] space-y-4 rounded-[24px] border border-[rgba(31,27,22,0.08)] bg-[linear-gradient(180deg,rgba(255,252,247,0.62),rgba(247,240,231,0.74))] px-6 py-7 shadow-[0_18px_34px_rgba(19,16,13,0.04)] sm:px-8 sm:py-8'
      : 'space-y-5';
  const headerClass = section.tone === 'essay' ? 'space-y-2.5 border-b border-[rgba(31,27,22,0.08)] pb-4' : 'space-y-2.5';
  const bodyClass =
    section.tone === 'essay'
      ? 'max-w-[62ch] space-y-5 sm:space-y-5.5 text-[15.15px] leading-[1.9] text-[rgba(31,27,22,0.82)]'
      : 'max-w-[70ch] space-y-5 sm:space-y-5.5 text-[15.35px] leading-[1.94] text-[rgba(31,27,22,0.8)]';
  const gridClass = section.media ? 'lg:grid-cols-[minmax(380px,0.96fr)_minmax(0,1.08fr)] lg:items-start' : '';
  const isHorstPhilosophy = section.id === 'philosophy' && section.title.includes('夢・忍耐・自己批判');
  const kickerClass = isHorstPhilosophy ? 'm-0 text-[11px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.6)]' : 'm-0 text-[11px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.52)]';
  const headingToneClass = isHorstPhilosophy ? '!text-[rgba(31,27,22,0.96)]' : 'text-[var(--ink)]';

  return (
    <section id={section.id} className={`border-t border-[rgba(31,27,22,0.1)] py-13 sm:py-17 ${toneClass}`}>
      <div className={`grid gap-9 lg:gap-14 ${gridClass}`}>
        {section.media && mediaFirst ? <SectionMedia section={section} /> : null}

        <div className={wrapperClass}>
          <div className={headerClass}>
            <p className={section.id === 'philosophy' ? 'm-0 text-[11px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.6)]' : kickerClass}>{section.eyebrow}</p>
            <h2
              className={`section-title-mincho break-keep hyphens-none m-0 [text-wrap:balance] ${section.id === 'philosophy' ? '!text-[rgba(31,27,22,0.96)]' : headingToneClass} ${
                section.tone === 'essay' ? 'max-w-[9ch] text-[clamp(1.95rem,2.55vw,2.45rem)] leading-[1.26] tracking-[0.01em]' : 'max-w-[16ch] text-[clamp(1.75rem,2.35vw,2.16rem)] leading-[1.34] tracking-[0.01em]'
              }`}
            >
              {section.title}
            </h2>
          </div>

          <div className={bodyClass}>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="m-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {section.media && !mediaFirst ? <SectionMedia section={section} /> : null}
      </div>
    </section>
  );
}

function IntroSection({ section }: { section: WineryTextSection }) {
  const factsGridClass = section.facts?.length === 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : 'sm:grid-cols-3';

  return (
    <section id={section.id} className="border-t border-[rgba(31,27,22,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.54),rgba(255,255,255,0.12))] py-14 sm:py-18">
      <div className="grid gap-8 rounded-[34px] border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.46)] px-6 py-8 shadow-[0_20px_42px_rgba(19,16,13,0.04)] sm:px-8 sm:py-9 lg:grid-cols-[minmax(520px,0.68fr)_minmax(0,1fr)] lg:gap-12 lg:px-11 lg:py-11">
        <div className="space-y-4 lg:pr-2">
          <p className="m-0 text-[11px] uppercase tracking-[0.22em] text-[rgba(31,27,22,0.52)]">{section.eyebrow}</p>
          <h2 className="section-title-mincho hyphens-none m-0 max-w-[16ch] [text-wrap:balance] text-[clamp(1.28rem,1.42vw,1.56rem)] leading-[1.42] tracking-[0.005em] text-[var(--ink)]">{section.title}</h2>
        </div>

        <div className="space-y-5.5">
      <div className="max-w-[74ch] space-y-5.5 sm:space-y-6 text-[15.8px] leading-[1.98] text-[rgba(31,27,22,0.82)]">
            {section.body.map((paragraph) => (
              <p key={paragraph} className="m-0">
                {paragraph}
              </p>
            ))}
          </div>

          {section.facts?.length ? (
            <dl className={`grid gap-3 border-t border-[rgba(31,27,22,0.08)] pt-5 ${factsGridClass}`}>
              {section.facts.map((fact) => (
                <div key={fact.label} className="border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.72)] p-4 shadow-[0_10px_22px_rgba(19,16,13,0.03)]">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.5)]">{fact.label}</dt>
                  <dd className="m-0 mt-2 whitespace-pre-line text-[14px] leading-[1.8] text-[rgba(31,27,22,0.8)]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FactSection({ section }: { section: WineryTextSection }) {
  const bodyCards = section.body.filter(Boolean);
  const renderBodyAsParagraphs = section.id === 'ress-recognition';

  return (
    <section id={section.id} className="border-t border-[rgba(31,27,22,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(249,243,236,0.3))] py-13 sm:py-17">
      <div className="rounded-[28px] border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.72)] px-7 py-7 shadow-[0_16px_30px_rgba(19,16,13,0.04)] sm:px-9 sm:py-8">
        <div className="space-y-3 border-b border-[rgba(31,27,22,0.08)] pb-5">
          <p className="m-0 text-[11px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.52)]">{section.eyebrow}</p>
          <h2 className="section-title-mincho break-keep hyphens-none m-0 max-w-[13ch] [text-wrap:balance] text-[clamp(1.86rem,2.35vw,2.18rem)] leading-[1.26] tracking-[0.01em] text-[var(--ink)]">{section.title}</h2>
        </div>

        <div className="mt-5 space-y-4">
          {section.facts?.length ? (
            <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {section.facts.map((fact) => (
                <div key={fact.label} className="border border-[rgba(31,27,22,0.08)] bg-[rgba(255,255,255,0.92)] px-4 py-[1.05rem] shadow-[0_10px_20px_rgba(19,16,13,0.03)]">
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.46)]">{fact.label}</dt>
                  <dd className="m-0 mt-2.5 space-y-2">
                    {fact.value.split('\n').map((line, index) => (
                      <div
                        key={`${fact.label}-${line}`}
                        className={
                          index === 0
                            ? 'text-[15.25px] leading-[1.48] text-[rgba(31,27,22,0.94)]'
                            : 'text-[13.2px] leading-[1.72] text-[rgba(31,27,22,0.72)]'
                        }
                      >
                        {line}
                      </div>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {bodyCards.length ? (
            renderBodyAsParagraphs ? (
              <div className="space-y-3 border-t border-[rgba(31,27,22,0.08)] pt-5">
                {bodyCards.map((paragraph) => (
                  <div key={paragraph} className="max-w-[72ch] text-[14.1px] leading-[1.78] text-[rgba(31,27,22,0.78)]">
                    <p className="m-0 whitespace-pre-line">{paragraph}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid gap-3 border-t border-[rgba(31,27,22,0.08)] pt-4 ${bodyCards.length >= 3 ? 'lg:grid-cols-3' : bodyCards.length === 2 ? 'lg:grid-cols-2' : ''}`}>
                {bodyCards.map((paragraph) => (
                  <div key={paragraph} className="rounded-[16px] bg-[rgba(250,245,238,0.68)] px-4 py-3.5">
                    <div className="text-[14.1px] leading-[1.72] text-[rgba(31,27,22,0.78)]">
                      <p className="m-0">{paragraph}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SpotlightSection({ section }: { section: WineryTextSection }) {
  const hasMedia = Boolean(section.media);

  return (
    <section id={section.id} className="border-t border-[rgba(31,27,22,0.1)] py-13 sm:py-17">
      <div className={`grid gap-8 lg:items-start ${hasMedia ? 'lg:grid-cols-[minmax(360px,0.88fr)_minmax(0,1.02fr)] lg:gap-14' : 'lg:grid-cols-[minmax(320px,0.4fr)_minmax(0,1fr)] lg:gap-14'}`}>
        {hasMedia ? <SectionMedia section={section} /> : null}

        <div className="space-y-6">
          <div className="space-y-3 border-b border-[rgba(31,27,22,0.12)] pb-5">
            <p className="m-0 text-[11px] uppercase tracking-[0.2em] text-[rgba(31,27,22,0.52)]">{section.eyebrow}</p>
            <h2 className="section-title-mincho break-keep hyphens-none m-0 max-w-[12ch] [text-wrap:balance] text-[clamp(1.95rem,2.55vw,2.38rem)] leading-[1.28] tracking-[0.01em] text-[var(--ink)]">{section.title}</h2>
          </div>

          {section.facts?.length ? (
            <dl className="grid gap-3 sm:grid-cols-2">
              {section.facts.map((fact) => (
                <div key={fact.label} className="border-b border-[rgba(31,27,22,0.08)] pb-3">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-[rgba(31,27,22,0.5)]">{fact.label}</dt>
                  <dd className="m-0 mt-2 text-[14px] leading-[1.78] text-[rgba(31,27,22,0.84)]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

      <div className="max-w-[66ch] space-y-5 sm:space-y-5.5 text-[14.9px] leading-[1.9] text-[rgba(31,27,22,0.8)]">
            {section.body.map((paragraph) => (
              <p key={paragraph} className="m-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMedia({ section }: { section: WineryTextSection }) {
  if (!section.media) return null;

  return (
    <figure className="space-y-3">
      <div className={`relative overflow-hidden border border-[rgba(31,27,22,0.1)] bg-[rgba(255,255,255,0.28)] shadow-[0_22px_46px_rgba(19,16,13,0.06)] ${ratioClass[section.media.ratio ?? 'landscape']}`}>
        <Image
          src={section.media.src}
          alt={section.media.alt}
          fill
          sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 42vw, 100vw"
          className="object-cover"
          style={section.media.position ? { objectPosition: section.media.position } : undefined}
        />
      </div>
      {section.media.caption ? <figcaption className="text-[12px] leading-[1.7] text-[rgba(31,27,22,0.54)]">{section.media.caption}</figcaption> : null}
    </figure>
  );
}
