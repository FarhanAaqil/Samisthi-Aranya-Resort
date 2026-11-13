import Image from 'next/image';

import badge from '@/assets/brand/samisthi-aranya-badge.jpg';
import { cn } from '@/lib/cn';

interface WordmarkProps {
  className?: string;
  /** Smaller version for the compact header and phones. */
  compact?: boolean;
}

/**
 * Text wordmark for the header. The full badge is too detailed to stay legible at header size,
 * so it is shown large in the footer instead.
 */
export function Wordmark({ className, compact }: WordmarkProps) {
  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span
        className={cn(
          'font-display font-normal tracking-[0.24em] text-cream',
          compact ? 'text-[1.05rem] sm:text-[1.2rem]' : 'text-[1.2rem] sm:text-[1.55rem]',
        )}
      >
        SAMISTHI ARANYA
      </span>{' '}
      <span className="caps mt-2 text-[0.58rem] text-brass-light">Resorts</span>
    </span>
  );
}

interface BadgeProps {
  className?: string;
  sizes: string;
}

/**
 * The owner's full badge, shown as a framed crest. Its own deep-green background sits inside a
 * brass hairline frame so it reads as a deliberate plaque on the olive ground.
 */
export function Badge({ className, sizes }: BadgeProps) {
  return (
    <div className={cn('border border-brass/50 p-2', className)}>
      <Image
        src={badge}
        alt="Samisthi Aranya Resorts badge: a tiger, a stag and forest hills above the words Breathe Nallamala"
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}
