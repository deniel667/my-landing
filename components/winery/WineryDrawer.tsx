'use client';

import Image from 'next/image';
import { type KeyboardEvent as ReactKeyboardEvent, type ReactNode, useEffect, useMemo, useState } from 'react';

export type WineType = '白' | '赤' | '泡';

export type WineryWine = {
  id: string;
  name: string;
  type: WineType;
  subline: string;
  producer: string;
  region: string;
  volume: string;
  image: string;
  quickSpecs: string[];
  oneLine: string;
  recommend: string;
  pairing: string;
  tastingNote: string;
  analysis: string;
  vinification: string;
  soil: string;
  metrics: {
    dryness: number;
    acid: number;
    bubbles: number;
  };
};

export type WineryDrawerWinery = {
  id: string;
  name: string;
  region: string;
  wines: WineryWine[];
};

type Props = {
  winery: WineryDrawerWinery;
  onClose: () => void;
};

const filters: Array<'全部' | WineType> = ['全部', '白', '赤', '泡'];
const orderedTypes: WineType[] = ['泡', '白', '赤'];

function DotScale({ value }: { value: number }) {
  return (
    <span className="winery-dots" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={`winery-dot ${index < value ? 'is-active' : ''}`} />
      ))}
    </span>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="winery-metric-row">
      <span>{label}</span>
      <DotScale value={value} />
      <span>{value}/5</span>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="winery-kv">
      <div className="winery-kv-key">{k}</div>
      <div className="winery-kv-value">{v}</div>
    </div>
  );
}

function AccordionCard({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <section className="winery-acc-card">
      <button className="winery-acc-head" onClick={() => setOpen((prev) => !prev)} type="button">
        <span className="winery-kicker">{title}</span>
        <span className="winery-acc-chev" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? <div className="winery-acc-body winery-text">{children}</div> : null}
    </section>
  );
}

export default function WineryDrawer({ winery, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'全部' | WineType>('全部');
  const [activeWineId, setActiveWineId] = useState(winery.wines[0]?.id ?? '');

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const filteredWines = useMemo(() => {
    const q = query.trim().toLowerCase();
    return winery.wines.filter((wine) => {
      const matchFilter = filter === '全部' || wine.type === filter;
      const haystack = `${wine.name} ${wine.subline} ${wine.quickSpecs.join(' ')}`.toLowerCase();
      const matchQuery = !q || haystack.includes(q);
      return matchFilter && matchQuery;
    });
  }, [filter, query, winery.wines]);

  const grouped = useMemo(() => {
    return orderedTypes
      .map((type) => ({
        type,
        wines: filteredWines.filter((wine) => wine.type === type),
      }))
      .filter((group) => group.wines.length > 0);
  }, [filteredWines]);

  const activeWine = filteredWines.find((wine) => wine.id === activeWineId) ?? filteredWines[0] ?? winery.wines[0];

  const onTypeChipKeyDown = (event: ReactKeyboardEvent<HTMLSpanElement>, type: WineType) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    event.stopPropagation();
    setFilter(type);
  };

  return (
    <div className="winery-drawer-overlay" role="dialog" aria-modal="true" aria-label={`${winery.name} drawer`} onClick={onClose}>
      <div className="winery-drawer-modal" onClick={(event) => event.stopPropagation()}>
        <header className="winery-drawer-head">
          <div className="winery-drawer-logo">
            <p>{winery.name}</p>
          </div>
          <button type="button" className="winery-drawer-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className="winery-drawer-body">
          <aside className="winery-drawer-left">
            <div className="winery-drawer-search-wrap">
              <input
                className="winery-drawer-search"
                type="text"
                value={query}
                placeholder="ワイン名・品種で検索"
                onChange={(event) => setQuery(event.target.value)}
              />
              <div className="winery-drawer-search-actions">
                {query ? (
                  <button type="button" onClick={() => setQuery('')} aria-label="Clear query">
                    ×
                  </button>
                ) : null}
                <span className="winery-search-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="winery-drawer-filters">
              {filters.map((item) => (
                <button key={item} type="button" className={`winery-chip ${filter === item ? 'is-active' : ''}`} onClick={() => setFilter(item)}>
                  {item}
                </button>
              ))}
            </div>

            <p className="winery-drawer-count">
              {winery.wines.length}件中{filteredWines.length}件
            </p>

            <div className="winery-drawer-list">
              {filter === '全部'
                ? grouped.map((group) => (
                    <section key={group.type}>
                      <p className="winery-group-label">{group.type}</p>
                      {group.wines.map((wine) => (
                        <button key={wine.id} type="button" className={`winery-row ${activeWine?.id === wine.id ? 'is-active' : ''}`} onClick={() => setActiveWineId(wine.id)}>
                          <span>
                            <span
                              role="button"
                              tabIndex={0}
                              className="winery-type"
                              onClick={(event) => {
                                event.stopPropagation();
                                setFilter(wine.type);
                              }}
                              onKeyDown={(event) => onTypeChipKeyDown(event, wine.type)}
                            >
                              {wine.type}
                            </span>
                          </span>
                          <span>
                            <span className="winery-row-title">{wine.name}</span>
                            <span className="winery-row-sub">{wine.subline}</span>
                          </span>
                          <span className="winery-row-chevron">›</span>
                        </button>
                      ))}
                    </section>
                  ))
                : filteredWines.map((wine) => (
                    <button key={wine.id} type="button" className={`winery-row ${activeWine?.id === wine.id ? 'is-active' : ''}`} onClick={() => setActiveWineId(wine.id)}>
                      <span>
                        <span
                          role="button"
                          tabIndex={0}
                          className="winery-type is-active"
                          onClick={(event) => {
                            event.stopPropagation();
                            setFilter(wine.type);
                          }}
                          onKeyDown={(event) => onTypeChipKeyDown(event, wine.type)}
                        >
                          {wine.type}
                        </span>
                      </span>
                      <span>
                        <span className="winery-row-title">{wine.name}</span>
                        <span className="winery-row-sub">{wine.subline}</span>
                      </span>
                      <span className="winery-row-chevron">›</span>
                    </button>
                  ))}
            </div>
          </aside>

          <span className="winery-divider" aria-hidden="true" />

          <section className="winery-drawer-right">
            {activeWine ? (
              <div className="winery-right-col">
                <div className="winery-sticky-top">
                  <div className="winery-card winery-card-pad winery-detail-hero">
                    <div className="winery-top-row">
                      <div>
                        <h3 className="winery-detail-title">{activeWine.name}</h3>
                        <p className="winery-kicker winery-detail-meta">
                          {activeWine.producer} ｜ {activeWine.region} ｜ {activeWine.volume}
                        </p>
                      </div>

                      <div className="winery-btn-row winery-detail-actions">
                        <a href="#contact" className="winery-btn winery-btn-primary">
                          テックシート（PDF）
                        </a>
                        <a href="#contact" className="winery-btn winery-btn-ghost">
                          導入相談
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="winery-card winery-card-pad winery-detail-top">
                  <div className="winery-photo-box winery-detail-bottle">
                    <Image src={activeWine.image} alt={activeWine.name} fill className="object-cover" sizes="220px" />
                  </div>

                  <div className="winery-metric-box winery-detail-main">
                    <div className="winery-metrics">
                      <Metric label="辛口度" value={activeWine.metrics.dryness} />
                      <Metric label="酸（キレ）" value={activeWine.metrics.acid} />
                      <Metric label="泡のきめ" value={activeWine.metrics.bubbles} />
                    </div>

                    <p className="winery-kicker winery-metric-note">※当社基準（同カテゴリ内の目安）</p>

                    <div className="winery-specs">
                      {activeWine.quickSpecs.slice(0, 4).map((spec) => (
                        <span key={spec} className="winery-pill winery-spec-chip">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="winery-card winery-card-pad winery-key-block">
                  <div className="winery-key-item">
                    <p className="winery-kicker winery-text-title">ひとこと</p>
                    <p className="winery-text">{activeWine.oneLine}</p>
                  </div>
                  <div className="winery-key-item">
                    <p className="winery-kicker winery-text-title">おすすめ</p>
                    <p className="winery-text">{activeWine.recommend}</p>
                  </div>
                  <div className="winery-key-item">
                    <p className="winery-kicker winery-text-title">ペアリング</p>
                    <p className="winery-text">{activeWine.pairing}</p>
                  </div>
                  <div className="winery-key-item">
                    <p className="winery-kicker winery-text-title">分析値</p>
                    <p className="winery-text">{activeWine.analysis}</p>
                  </div>
                </div>

                <div className="winery-accordion">
                  <AccordionCard title="テイスティングノート">{activeWine.tastingNote}</AccordionCard>
                  <AccordionCard title="分析値">
                    <KV k="分析" v={activeWine.analysis} />
                  </AccordionCard>
                  <AccordionCard title="醸造">{activeWine.vinification}</AccordionCard>
                  <AccordionCard title="畑・土壌">{activeWine.soil}</AccordionCard>
                </div>
              </div>
            ) : (
              <p className="winery-text">該当するワインがありません。</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
