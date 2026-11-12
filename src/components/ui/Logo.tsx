import Image from 'next/image';

import badge from '@/assets/brand/samisthi-aranya-badge.jpg';
import { cn } from '@/lib/cn';

interface WordmarkProps {
  /** `light` sits on dark surfaces and over photographs. */
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Text wordmark for the header and other small spaces. The full badge is too detailed to stay
 * legible at header size, so it is reserved for large placements.
 */
export function Wordmark({ tone = 'dark', className }: WordmarkProps) {
  return (
    <span className={cn('inline-flex flex-col leading-none', className)}>
      <span
        className={cn(
          'font-caps text-[1.05rem] font-semibold tracking-[0.2em] sm:text-[1.2rem]',
          tone === 'light' ? 'text-ivory' : 'text-forest',
        )}
      >
        SAMISTHI ARANYA
      </span>{' '}
      <span
        className={cn(
          'mt-1.5 text-[0.56rem] font-medium tracking-[0.5em]',
          tone === 'light' ? 'text-gold-light' : 'text-gold-deep',
        )}
      >
        RESORTS · NALLAMALA
      </span>
    </span>
  );
}

interface BadgeProps {
  className?: string;
  sizes: string;
  priority?: boolean;
}

/**
 * The owner's full badge. Its own background is the same deep forest as `bg-forest-deep`, and a
 * soft radial mask feathers the square edge, so place it on forest-deep surfaces only.
 */
export function Badge({ className, sizes, priority }: BadgeProps) {
  return (
    <Image
      src={badge}
      alt="Samisthi Aranya Resorts badge: a tiger, a stag and forest hills above the words Breathe Nallamala"
      sizes={sizes}
      priority={priority}
      className={cn(
        'h-auto w-full [mask-image:radial-gradient(closest-side,#000_86%,transparent_100%)]',
        className,
      )}
    />
  );
}
