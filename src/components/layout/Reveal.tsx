'use client';

import { useEffect } from 'react';

/**
 * Fades elements marked with `data-reveal` in as they approach the viewport.
 *
 * Everything starts visible in the server-rendered HTML; only elements below the fold at load are
 * hidden, so nothing flashes and the page works without JavaScript. Elements start fading in a
 * little before they scroll into view, and jumping to a section from the menu shows it at once,
 * so a section is never blank while an animation catches up. Reduced-motion visitors see
 * everything immediately.
 */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const hidden = new Set(
      Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
        (el) => el.getBoundingClientRect().top > window.innerHeight,
      ),
    );
    if (hidden.size === 0) return;

    const show = (el: Element, instantly = false) => {
      if (!(el instanceof HTMLElement) || !hidden.has(el)) return;
      hidden.delete(el);
      observer.unobserve(el);
      if (instantly) {
        el.style.transition = 'none';
        el.classList.remove('reveal-hidden');
        requestAnimationFrame(() => el.style.removeProperty('transition'));
      } else {
        el.classList.remove('reveal-hidden');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) show(entry.target);
      },
      // Start the fade a fifth of a screen before the element arrives.
      { rootMargin: '0px 0px 20% 0px' },
    );

    hidden.forEach((el) => {
      el.classList.add('reveal-hidden');
      observer.observe(el);
    });

    // In-page links (menu, buttons) jump straight to a section: show its contents immediately.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href*="#"]');
      const id = link?.getAttribute('href')?.split('#')[1];
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      target.querySelectorAll('[data-reveal]').forEach((el) => show(el, true));
      if (target.hasAttribute('data-reveal')) show(target, true);
    };
    document.addEventListener('click', onClick);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', onClick);
      hidden.forEach((el) => el.classList.remove('reveal-hidden'));
    };
  }, []);

  return null;
}
