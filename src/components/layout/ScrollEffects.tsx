'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

/** A hairline progress bar at the top and a back-to-top button that appears after a screenful. */
export function ScrollEffects() {
  const bar = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const { scrollY, innerHeight } = window;
      const scrollable = document.documentElement.scrollHeight - innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0;
      bar.current?.style.setProperty('transform', `scaleX(${progress})`);
      setShowTop(scrollY > innerHeight * 0.9);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-gold/80" />
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={cn(
          'fixed right-5 bottom-5 z-30 grid size-12 place-items-center rounded-full bg-wine text-petal shadow-lift',
          'transition-[opacity,transform] duration-300 hover:bg-wine-deep',
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
        )}
      >
        <ArrowUp className="size-5" aria-hidden="true" />
      </button>
    </>
  );
}
