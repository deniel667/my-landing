'use client';

import { useEffect } from 'react';

export default function Reveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = document.querySelectorAll<HTMLElement>('.fade-in-block, .chapter-block');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    items.forEach((item, index) => {
      item.style.transitionDelay = `${(index % 5) * 90}ms`;
      observer.observe(item);
    });

    let rafId = 0;
    const onScroll = () => {
      if (reducedMotion) {
        return;
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        const parallaxY = Math.min(window.scrollY * -0.08, 0);
        document.documentElement.style.setProperty('--parallax-y', `${parallaxY}px`);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
