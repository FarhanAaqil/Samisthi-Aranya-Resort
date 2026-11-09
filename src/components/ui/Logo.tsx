import { cn } from '@/lib/cn';

interface LogoProps {
  /** `mark` is the emblem alone, `full` adds the wordmark beside it, `stacked` centres it below. */
  variant?: 'mark' | 'full' | 'stacked';
  /** `dark` renders for use on the wine-deep sections. */
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Cabin-and-trees emblem redrawn as a clean vector. Colours follow the tone so the
 * mark works on both the sand canvas and the wine sections.
 */
export function LogoMark({ tone = 'light', className }: Pick<LogoProps, 'tone' | 'className'>) {
  const line = tone === 'dark' ? '#f5e6dc' : '#682e4e';
  const warm = tone === 'dark' ? '#d9b565' : '#b8892b';
  const blush = tone === 'dark' ? '#f2c4d2' : '#e79ab2';

  return (
    <svg
      viewBox="0 0 120 92"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      <circle cx="62" cy="33" r="14" fill={warm} opacity="0.9" />
      <path
        d="M30 58 62 36l32 22"
        stroke={line}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="40" y="58" width="44" height="18" rx="1.5" stroke={line} strokeWidth="2" />
      <rect x="46" y="63" width="8" height="8" rx="1" fill={warm} />
      <rect x="62" y="63" width="9" height="13" rx="1" fill={line} />
      <g stroke={warm} strokeLinecap="round">
        <path d="M20 78c1-12 2-22 0-34" strokeWidth="3" />
        <path d="M20 62c-7-5-12-8-17-9M20 54c6-5 11-8 17-10" strokeWidth="2" />
        <path d="M103 78c-1-10-2-19 0-29" strokeWidth="2.6" />
        <path d="M103 62c-6-4-10-7-14-8M103 56c5-4 9-6 13-7" strokeWidth="1.8" />
      </g>
      <ellipse cx="12" cy="49" rx="11" ry="5.5" fill={line} opacity="0.85" />
      <ellipse cx="22" cy="40" rx="15" ry="6.5" fill={warm} opacity="0.9" />
      <ellipse cx="36" cy="46" rx="11" ry="5" fill={blush} opacity="0.9" />
      <ellipse cx="92" cy="50" rx="10" ry="4.5" fill={blush} opacity="0.9" />
      <ellipse cx="104" cy="45" rx="13" ry="5.5" fill={warm} opacity="0.9" />
      <ellipse cx="114" cy="51" rx="7" ry="3.6" fill={line} opacity="0.85" />
      <path
        d="M3 80c18-5 36-9 58-4s40 3 56 0"
        stroke={warm}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M34 18q3-3 6 0 3-3 6 0M82 14q3-3 6 0 3-3 6 0"
        stroke={line}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

export function Logo({ variant = 'full', tone = 'light', className }: LogoProps) {
  if (variant === 'mark') return <LogoMark tone={tone} className={cn('h-10 w-auto', className)} />;

  const name = tone === 'dark' ? 'text-petal' : 'text-wine';
  const sub = tone === 'dark' ? 'text-gold-light' : 'text-gold-deep';

  if (variant === 'stacked') {
    return (
      <div className={cn('inline-flex flex-col items-center text-center', className)}>
        <LogoMark tone={tone} className="h-20 w-auto" />
        <span className={cn('mt-3 font-display text-3xl font-semibold tracking-[0.3em]', name)}>
          SAMISTHI
        </span>
        <span className={cn('mt-1 text-[0.68rem] font-semibold tracking-[0.42em]', sub)}>
          ARANYA RESORTS
        </span>
      </div>
    );
  }

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark tone={tone} className="h-9 w-auto" />
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-xl font-semibold tracking-[0.24em]', name)}>
          SAMISTHI
        </span>
        <span className={cn('mt-1 text-[0.6rem] font-semibold tracking-[0.34em]', sub)}>
          ARANYA RESORTS
        </span>
      </span>
    </span>
  );
}
