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
  { id: 'wines', label: 'WINES', sectionId: null, href: '/wines' },
  { id: 'contact', label: 'CONTACT', sectionId: 'contact', href: '/#contact' },
] as const;

const navItems = SHOW_TRUST ? allNavItems : allNavItems.filter((item) => item.id !== 'trust');

export default function SiteHeader() {
  const CANON_ORIGIN = 'https://wine.findest-japan.com';
  const TOP_ANCHOR = '/#hero';
  const INSTAGRAM_WEB = 'https://www.instagram.com/findest_japan/';
  const pathname = usePathname();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

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
  const fallbackCanonicalUrl = `${CANON_ORIGIN}/`;
  const fallbackToEN = `https://translate.google.com/translate?sl=ja&tl=en&u=${encodeURIComponent(fallbackCanonicalUrl)}`;
  const fallbackToDE = `https://translate.google.com/translate?sl=ja&tl=de&u=${encodeURIComponent(fallbackCanonicalUrl)}`;
  const fallbackTopUrl = `${CANON_ORIGIN}${TOP_ANCHOR}`;

  const stripTranslateParams = (urlStr: string) => {
    try {
      const parsed = new URL(urlStr);
      const keysToDelete: string[] = [];
      parsed.searchParams.forEach((_, key) => {
        if (key.startsWith('_x_tr_')) keysToDelete.push(key);
      });
      keysToDelete.forEach((key) => parsed.searchParams.delete(key));
      return parsed.toString();
    } catch {
      return urlStr;
    }
  };

  const getCanonicalUrlFromWindow = () => {
    if (typeof window === 'undefined') return fallbackCanonicalUrl;
    const loc = window.location;
    const host = loc.hostname;

    if (host.includes('translate.google.')) {
      const params = new URLSearchParams(loc.search);
      const sourceUrl = params.get('u');
      return sourceUrl ? stripTranslateParams(sourceUrl) : fallbackCanonicalUrl;
    }

    if (host.endsWith('translate.goog')) {
      const params = new URLSearchParams(loc.search);
      const keysToDelete: string[] = [];
      params.forEach((_, key) => {
        if (key.startsWith('_x_tr_')) keysToDelete.push(key);
      });
      keysToDelete.forEach((key) => params.delete(key));
      const query = params.toString();
      const search = query ? `?${query}` : '';
      return `${CANON_ORIGIN}${loc.pathname || '/'}${search}${loc.hash || ''}`;
    }

    return `${CANON_ORIGIN}${loc.pathname || '/'}${loc.search || ''}${loc.hash || ''}`;
  };

  const goToLang = (lang: 'jp' | 'en' | 'de') => {
    const canonical = getCanonicalUrlFromWindow();
    if (lang === 'jp') {
      window.location.assign(canonical);
      return;
    }
    const tl = lang === 'en' ? 'en' : 'de';
    const url = `https://translate.google.com/translate?sl=ja&tl=${tl}&u=${encodeURIComponent(canonical)}`;
    window.location.assign(url);
  };

  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="shell nav-inner flex items-center justify-between">
        <a
          href={fallbackTopUrl}
          className="brand-mark flex flex-col leading-none"
          aria-label="FINDEST top"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.assign(fallbackTopUrl);
          }}
        >
          <span className="brand-main uppercase tracking-[0.12em]">FINDEST</span>
          <span className="brand-sub mt-1 text-[10px] uppercase tracking-[0.22em] whitespace-nowrap opacity-80">German Wine Curation</span>
        </a>

        <div className="nav-right flex items-center gap-6">
          <div className="nav-links flex items-center gap-6">
            {navLinks.map(({ id, href, label, sectionId }) => {
              const isSectionLink = Boolean(sectionId);
              const isActive = isSectionLink ? pathname === '/' && currentHash === sectionId : pathname === href;
              return (
                <a
                  key={href}
                  href={href}
                  className={`nav-link${isActive ? ' nav-link-active' : ''}`}
                  onClick={isSectionLink ? (event) => handleSectionNav(event, sectionId) : undefined}
                >
                  {label}
                </a>
              );
            })}
            <a href={INSTAGRAM_WEB} target="_blank" rel="noreferrer" className="nav-link">
              INSTAGRAM
            </a>
          </div>

          <div className="inline-flex items-center rounded-full border border-white/20 bg-transparent text-[11px] uppercase tracking-[0.18em]">
            <a
              href={fallbackCanonicalUrl}
              className="px-2 py-1 text-white/80 transition-colors hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToLang('jp');
              }}
            >
              JP
            </a>
            <a
              href={fallbackToEN}
              className="border-l border-white/15 px-2 py-1 text-white/80 transition-colors hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToLang('en');
              }}
            >
              EN
            </a>
            <a
              href={fallbackToDE}
              className="border-l border-white/15 px-2 py-1 text-white/80 transition-colors hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToLang('de');
              }}
            >
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
              const isSectionLink = Boolean(sectionId);
              const isActive = isSectionLink ? pathname === '/' && currentHash === sectionId : pathname === href;
              return (
                <a
                  key={`mobile-${href}`}
                  href={href}
                  className={`site-mobile-link${isActive ? ' is-active' : ''}`}
                  onClick={(event) => {
                    setIsDrawerOpen(false);
                    if (isSectionLink) {
                      handleSectionNav(event, sectionId);
                    }
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
