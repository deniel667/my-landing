'use client';

import { useEffect } from 'react';
import { site } from '@/data/my-landing/site';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/AboutSection';
import NorenSlitDivider from '@/components/NorenSlitDivider';
import PhilosophySection from '@/components/sections/PhilosophySection';
import NorenNetworkSection from '@/components/sections/NorenNetworkSection';
import TrustSection from '@/components/sections/TrustSection';
import FoundationSection from '@/components/sections/FoundationSection';
import ServiceSection from '@/components/sections/ServiceSection';
import StorySection from '@/components/sections/StorySection';
import CatalogueSection from '@/components/sections/CatalogueSection';
import WinePreviewSection from '@/components/sections/WinePreviewSection';
import VoiceSection from '@/components/sections/VoiceSection';
import NextStepSection from '@/components/sections/NextStepSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';
import Section from '@/components/Section';
import SiteToast, { showSiteToast } from '@/components/ui/SiteToast';
import { SHOW_TRUST } from '@/data/my-landing/featureFlags';

export default function HomePage() {
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

  useEffect(() => {
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash !== 'contact-final' && currentHash !== 'contact') return;

    const scrollToContactForm = () => {
      const target = document.getElementById('contact-final') ?? document.getElementById('contact');
      if (!target) return;

      const nav = document.querySelector<HTMLElement>('.site-nav');
      const navOffset = (nav?.getBoundingClientRect().height ?? 72) + 24;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    };

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToContactForm);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const scrollToContactForm = () => {
      const target = document.getElementById('contact-final') ?? document.getElementById('contact');
      if (!target) return false;

      const nav = document.querySelector<HTMLElement>('.site-nav');
      const navOffset = (nav?.getBoundingClientRect().height ?? 72) + 24;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      return true;
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const contactAnchor = target.closest<HTMLAnchorElement>('a[href="#contact"], a[href="#contact-final"]');
      if (contactAnchor) {
        event.preventDefault();
        if (scrollToContactForm()) {
          showSiteToast('お問い合わせフォームへ移動します。', 'info');
        }
        return;
      }

      const cta = target.closest<HTMLElement>('a.cta-button, button.cta-button');
      if (!cta) return;

      const href = cta instanceof HTMLAnchorElement ? cta.getAttribute('href') ?? '' : '';
      if (href.includes('#contact') || href.includes('#contact-final')) {
        event.preventDefault();
        if (scrollToContactForm()) {
          showSiteToast('お問い合わせフォームへ移動します。', 'info');
        }
        return;
      }

      if (href.startsWith('#')) {
        const targetEl = document.getElementById(href.slice(1));
        if (targetEl) {
          event.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      showSiteToast('選択ありがとうございます。', 'info');
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <main className="site-main">
      <HeroSection data={site.hero} />
      <AboutSection />
      <NorenSlitDivider id="slit-hero-philosophy" />
      <section id="philosophy" className="relative w-full bg-[linear-gradient(180deg,#0f1012_0%,#16171a_100%)]">
        <div className="relative h-[88px] lg:h-[120px]" aria-hidden="true">
          <div
            className="absolute inset-0 z-0"
            style={{ background: 'linear-gradient(to bottom, var(--page-bg) 0%, rgba(0,0,0,0) 88%)' }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-[1120px] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <PhilosophySection />
        </div>
        <div className="relative h-[72px] lg:h-[96px]" aria-hidden="true">
          <div
            className="absolute inset-0 z-0"
            style={{ background: 'linear-gradient(to top, var(--page-bg) 0%, rgba(0,0,0,0) 88%)' }}
          />
        </div>
      </section>
      <section id="noren-network" className="relative pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <div className="section-inner section-inner--tight top-rule pt-0">
            <div className="section-content">
              <NorenNetworkSection />
            </div>
          </div>
        </div>
      </section>
      {SHOW_TRUST ? (
        <Section id="rare" variant="full">
          <TrustSection />
        </Section>
      ) : null}
      <section id="foundation" className="layout-section">
        <FoundationSection />
      </section>
      <section id="story" className="relative pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <div className="section-inner section-inner--tight top-rule pt-0">
            <div className="section-content">
              <StorySection />
            </div>
          </div>
        </div>
      </section>
      <section id="service" className="relative pt-8 pb-16 lg:pt-10 lg:pb-20">
        <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
          <div className="section-inner section-inner--tight top-rule pt-0">
            <div className="section-content section-content-editorial">
              <ServiceSection />
            </div>
          </div>
        </div>
      </section>
      <WinePreviewSection />
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
      <SiteToast />
    </main>
  );
}
