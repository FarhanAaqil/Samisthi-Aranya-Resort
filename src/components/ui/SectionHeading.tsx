import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  /** Use on the wine section so the eyebrow and text stay readable. */
  onDark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  onDark,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <header className={cn('max-w-2xl', centered && 'mx-auto text-center', className)} data-reveal>
      <p
        className={cn(
          'flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase',
          onDark ? 'text-gold-light' : 'text-gold-deep',
          centered && 'justify-center',
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          'mt-4 font-display text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl',
          onDark ? 'text-petal' : 'text-wine',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed text-pretty sm:text-lg',
            onDark ? 'text-petal/85' : 'text-ink-soft',
          )}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
