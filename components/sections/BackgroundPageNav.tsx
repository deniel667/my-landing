'use client';

import { useEffect, useState } from 'react';

type BackgroundNavItem = {
  id: string;
  label: string;
};

type Props = {
  items: BackgroundNavItem[];
};

export default function BackgroundPageNav({ items }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const updateActive = () => {
      const anchorLine = Math.max(140, window.innerHeight * 0.28);
      let currentId = sections[0].id;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= anchorLine && rect.bottom >= anchorLine) {
          currentId = section.id;
          break;
        }
      }

      setActiveId(currentId);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [items]);

  const handleJump = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const nav = document.querySelector<HTMLElement>('.site-nav');
    const offset = (nav?.getBoundingClientRect().height ?? 72) + 70;
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    setActiveId(id);
  };

  return (
    <div className="sticky top-[70px] z-30 border-y border-[rgba(31,27,22,0.08)] bg-[rgba(244,240,232,0.94)] backdrop-blur-[12px]">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
        <nav aria-label="Page sections" className="py-2">
          <ul className="nav-links flex items-center gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 lg:gap-8">
            {items.map((item) => {
              const isActive = item.id === activeId;

              return (
                <li key={item.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => handleJump(item.id)}
                    className={`nav-link border-b px-1 py-2 text-[12px] tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(31,27,22,0.14)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(244,240,232,0.94)] ${
                      isActive ? 'nav-link-active border-[rgba(31,27,22,0.78)]' : 'border-transparent'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
