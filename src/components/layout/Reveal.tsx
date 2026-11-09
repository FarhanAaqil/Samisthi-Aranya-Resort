'use client';

import { useEffect } from 'react';

/**
 * Fades elements marked with `data-reveal` up as they scroll into view.
 *
 * Everything starts visible in the server-rendered HTML. Only elements that are below the fold
 * when the page hydrates are hidden and then revealed, so nothing flashes and the page works
 * fully without JavaScript. Visitors who prefer reduced motion see everything immediately.
 */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const belowFold = targets.filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    if (belowFold.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove('reveal-hidden');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    belowFold.forEach((el) => {
      el.classList.add('reveal-hidden');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      belowFold.forEach((el) => el.classList.remove('reveal-hidden'));
    };
  }, []);

  return null;
}
