'use client';

import { useEffect, useState } from 'react';

type SideNavItem = {
  id: string;
  label: string;
};

type Props = {
  items: SideNavItem[];
  className?: string;
};

export default function SideNavIndicator({ items, className }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const displayActiveId = activeId || items[0]?.id || '';

  useEffect(() => {
    if (!items.length) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    let rafId = 0;
    let ticking = false;

    const updateActive = () => {
      const viewportTop = Math.max(88, window.innerHeight * 0.18);
      const viewportBottom = window.innerHeight * 0.72;
      const anchorLine = Math.max(120, window.innerHeight * 0.36);

      // Prefer the first block whose visible range covers the anchor.
      let currentId = elements[0].id;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= anchorLine && rect.bottom >= anchorLine) {
          currentId = el.id;
          setActiveId(currentId);
          return;
        }
      }

      // Fallback: choose the block with the largest overlap in the active viewport band.
      let bestId = elements[0].id;
      let bestVisible = -1;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        const overlap = Math.max(0, Math.min(rect.bottom, viewportBottom) - Math.max(rect.top, viewportTop));
        if (overlap > bestVisible) {
          bestVisible = overlap;
          bestId = el.id;
        }
      }

      setActiveId(bestId);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActive);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [items]);

  const handleJump = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const fixedHeaderOffset = 108;
    const top = target.getBoundingClientRect().top + window.scrollY - fixedHeaderOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    setActiveId(id);
  };

  return (
    <nav className={className} aria-label="Section indicator">
      <ul className="side-nav-list">
        {items.map((item) => {
          const isActive = displayActiveId === item.id;

          return (
            <li key={item.id} className={`side-nav-item ${isActive ? 'is-active' : ''}`}>
              <span className="side-nav-dot" aria-hidden="true" />
              <button
                type="button"
                className="side-nav-link"
                aria-current={isActive ? 'true' : undefined}
                onClick={() => handleJump(item.id)}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
