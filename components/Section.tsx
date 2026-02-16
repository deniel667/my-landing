import type { PropsWithChildren } from 'react';

type SectionVariant = 'editorial' | 'vitrine' | 'full';

type SectionProps = PropsWithChildren<{
  id: string;
  eyebrow?: string;
  title?: string;
  variant?: SectionVariant;
}>;

export default function Section({ id, eyebrow, title, variant = 'full', children }: SectionProps) {
  const contentClass =
    variant === 'editorial' ? 'section-content section-content-editorial' : variant === 'vitrine' ? 'section-content section-content-vitrine' : 'section-content';

  return (
    <section id={id} className="layout-section">
      <div className="container">
        <div className="section-inner top-rule">
          {(eyebrow || title) && (
            <header className="section-headline">
              {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
              {title ? <h2 className="section-heading">{title}</h2> : null}
            </header>
          )}
          <div className={contentClass}>{children}</div>
        </div>
      </div>
    </section>
  );
}
