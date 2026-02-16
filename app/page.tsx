'use client';

import { useEffect } from 'react';
import { site } from '../data/my-landing/site';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/AboutSection';
import NorenSlitDivider from '../components/NorenSlitDivider';
import PhilosophySection from '../components/sections/PhilosophySection';
import NorenNetworkSection from '../components/sections/NorenNetworkSection';
import TrustSection from '../components/sections/TrustSection';
import FoundationSection from '../components/sections/FoundationSection';
import ServiceSection from '../components/sections/ServiceSection';
import StorySection from '../components/sections/StorySection';
import CatalogueSection from '../components/sections/CatalogueSection';
import VoiceSection from '../components/sections/VoiceSection';
import NextStepSection from '../components/sections/NextStepSection';
import ContactSection from '../components/sections/ContactSection';
import FooterSection from '../components/sections/FooterSection';
import Section from '../components/Section';

function TopNav() {
  const links = [
    ['#about', 'About'],
    ['#philosophy', 'Philosophy'],
    ['#noren-network', 'Network'],
    ['#rare', 'TRUST'],
    ['#story', 'Story'],
    ['#service', 'Service'],
    ['#catalogue', 'Wineries'],
    ['#contact', 'Contact'],
  ] as const;

  return (
    <nav className="site-nav">
      <div className="shell nav-inner">
        <a href="#hero" className="brand-mark" aria-label="FINDEST top">
          <span className="brand-main">FINDEST</span>
          <span className="brand-sub">German Wine Curation</span>
        </a>
        <div className="nav-links">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function Page() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const formKeys = ['name', 'company', 'email', 'businessType', 'message'];
    const hasFormParams = formKeys.some((key) => url.searchParams.has(key));
    if (!hasFormParams) return;

    formKeys.forEach((key) => url.searchParams.delete(key));
    const cleanUrl = `${url.pathname}${url.searchParams.toString() ? `?${url.searchParams.toString()}` : ''}${url.hash}`;
    window.history.replaceState({}, '', cleanUrl);
  }, []);

  useEffect(() => {
    const roots = Array.from(document.querySelectorAll<HTMLElement>('.section-reveal-root'));
    if (roots.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    roots.forEach((root) => observer.observe(root));
    return () => observer.disconnect();
  }, []);
  return (
    <main className="site-main">
      <TopNav />
      <HeroSection data={site.hero} />
      <AboutSection />
      <NorenSlitDivider id="slit-hero-philosophy" />
      <Section id="philosophy" variant="full">
        <PhilosophySection />
      </Section>
      <Section id="noren-network" variant="full">
        <NorenNetworkSection />
      </Section>
      <Section id="rare" variant="full">
        <TrustSection />
      </Section>
      <Section id="foundation" variant="full">
        <FoundationSection />
      </Section>
      <Section id="story" variant="full">
        <StorySection />
      </Section>
      <Section id="service" variant="editorial">
        <ServiceSection />
      </Section>
      <Section id="catalogue" variant="full">
        <CatalogueSection />
      </Section>
      <Section id="voice" variant="full">
        <VoiceSection />
      </Section>
      <Section id="contact" variant="full">
        <NextStepSection />
        <div className="bridgeWrap" aria-hidden="true">
          <div className="bridgeCard bridgeCard--noBtn">
            <span className="bridgeDot" />
            <span>次に、下のフォームで状況をお聞かせください。</span>
          </div>
        </div>
        <ContactSection />
      </Section>
      <FooterSection />
    </main>
  );
}

