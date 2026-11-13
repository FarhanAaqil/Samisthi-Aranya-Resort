import Image from 'next/image';

import logo from '@/assets/brand/samisthi-aranya-logo.png';
import { cn } from '@/lib/cn';

interface LogoProps {
  /** Size the logo with a height class; the width follows the badge's proportions. */
  className?: string;
  /** How wide the logo renders, so the browser downloads the right size. */
  sizes: string;
  priority?: boolean;
}

/**
 * The resort's badge: a tiger, a stag and forest hills above SAMISTHI ARANYA RESORTS and
 * "Breathe Nallamala". The square green field around the original artwork has been cut away, so
 * the badge sits directly on any background.
 */
export function Logo({ className, sizes, priority }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="Samisthi Aranya Resorts"
      sizes={sizes}
      priority={priority}
      className={cn('w-auto', className)}
    />
  );
}
