'use client';

import { type MouseEvent as ReactMouseEvent, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SHOW_TRUST } from '@/data/my-landing/featureFlags';

const allNavItems = [
  { id: 'about', label: 'ABOUT', sectionId: 'about', href: '/#about' },
  { id: 'philosophy', label: 'philosophy', sectionId: 'philosophy', href: '/#philosophy' },
  { id: 'network', label: 'NETWORK', sectionId: 'noren-network', href: '/#noren-network' },
  { id: 'trust', label: 'TRUST', sectionId: 'rare', href: '/#rare' },
  { id: 'story', label: 'STORY', sectionId: 'story', href: '/#story' },
  { id: 'service', label: 'SERVICE', sectionId: 'service', href: '/#service' },
  { id: 'wineries', label: 'WINERIES', sectionId: 'catalogue', href: '/#catalogue' },
  { id: 'contact', label: 'CONTACT', sectionId: 'contact', href: '/#contact' },
] as const;

const navItems = SHOW_TRUST ? allNavItems : allNavItems.filter((item) => item.id !== 'trust');

export default function SiteHeader() {
  const DEFAULT_URL = 'https://wine.findest-japan.com/';
  const INSTAGRAM_WEB = 'https://www.instagram.com/findest_japan/';
  const pathname = usePathname();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [pageUrl, setPageUrl] = useState(DEFAULT_URL);

  const localizedHome = '/';

  const navLinks = useMemo(
    () => navItems.map(({ id, label, href, sectionId }) => ({ id, label, href, sectionId })),
    []
  );

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return false;
    const nav = document.querySelector<HTMLElement>('.site-nav');
    const offset = (nav?.getBoundingClientRect().height ?? 72) + 18;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    return true;
  };

  const handleSectionNav = (event: ReactMouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }
    if (!scrollToSection(sectionId)) return;
    window.history.replaceState(null, '', `/#${sectionId}`);
    setCurrentHash(sectionId);
  };

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash.replace('#', ''));
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const timer = window.setTimeout(() => {
      scrollToSection(hash);
      setCurrentHash(hash);
    }, 60);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageUrl(window.location.href);
  }, []);

  const enTranslateHref = `https://translate.google.com/translate?sl=ja&tl=en&u=${encodeURIComponent(pageUrl)}`;
  const deTranslateHref = `https://translate.google.com/translate?sl=ja&tl=de&u=${encodeURIComponent(pageUrl)}`;

  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="shell nav-inner flex items-center justify-between">
        <a href={localizedHome} className="brand-mark flex flex-col leading-none" aria-label="FINDEST top">
          <span className="brand-main uppercase tracking-[0.12em]">FINDEST</span>
          <span className="brand-sub mt-1 text-[10px] uppercase tracking-[0.22em] whitespace-nowrap opacity-80">German Wine Curation</span>
        </a>

        <div className="nav-right flex items-center gap-6">
          <div className="nav-links flex items-center gap-6">
            {navLinks.map(({ id, href, label, sectionId }) => {
              const isActive = pathname === '/' && currentHash === sectionId;
              return (
                <a key={href} href={href} className={`nav-link${isActive ? ' nav-link-active' : ''}`} onClick={(event) => handleSectionNav(event, sectionId)}>
                  {label}
                </a>
              );
            })}
            <a href={INSTAGRAM_WEB} target="_blank" rel="noreferrer" className="nav-link">
              INSTAGRAM
            </a>
          </div>

          <div className="inline-flex items-center rounded-full border border-white/20 bg-transparent text-[11px] uppercase tracking-[0.18em]">
            <a href={pageUrl} target="_blank" rel="noreferrer" className="px-2 py-1 text-white/80 transition-colors hover:text-white">
              JP
            </a>
            <a href={enTranslateHref} target="_blank" rel="noreferrer" className="border-l border-white/15 px-2 py-1 text-white/80 transition-colors hover:text-white">
              EN
            </a>
            <a href={deTranslateHref} target="_blank" rel="noreferrer" className="border-l border-white/15 px-2 py-1 text-white/80 transition-colors hover:text-white">
              DE
            </a>
          </div>

          <div className="nav-utilities nav-utilities-desktop" aria-label="Quick actions">
            <a href="/thought" className="nav-util-link">
              理念ページ
            </a>
            <div className="nav-util-consult">
              <a href="/collaboration-partner-proof" className="nav-util-link">
                協働パートナー向けページ
              </a>
            </div>
          </div>

          <button
            type="button"
            className="nav-menu-toggle"
            aria-label="Open menu"
            aria-expanded={isDrawerOpen}
            aria-controls="site-mobile-drawer"
            onClick={() => setIsDrawerOpen((prev) => !prev)}
          >
            MENU
          </button>
        </div>
      </div>

      <div id="site-mobile-drawer" className={`site-mobile-drawer${isDrawerOpen ? ' is-open' : ''}`} aria-hidden={!isDrawerOpen}>
        <div className="site-mobile-panel">
          <div className="site-mobile-links">
            {navLinks.map(({ id, href, label, sectionId }) => {
              const isActive = pathname === '/' && currentHash === sectionId;
              return (
                <a
                  key={`mobile-${href}`}
                  href={href}
                  className={`site-mobile-link${isActive ? ' is-active' : ''}`}
                  onClick={(event) => {
                    setIsDrawerOpen(false);
                    handleSectionNav(event, sectionId);
                  }}
                >
                  {label}
                </a>
              );
            })}
            <a
              href={INSTAGRAM_WEB}
              target="_blank"
              rel="noreferrer"
              className="site-mobile-link"
              onClick={() => setIsDrawerOpen(false)}
            >
              INSTAGRAM
            </a>
          </div>

          <div className="nav-utilities nav-utilities-mobile" aria-label="Quick actions">
            <a href="/thought" className="nav-util-link" onClick={() => setIsDrawerOpen(false)}>
              理念ページ
            </a>
            <div className="nav-util-consult">
              <a href="/collaboration-partner-proof" className="nav-util-link" onClick={() => setIsDrawerOpen(false)}>
                協働パートナー向けページ
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
