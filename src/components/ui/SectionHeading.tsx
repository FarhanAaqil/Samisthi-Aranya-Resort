import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  /** Use on forest sections so the eyebrow and text stay readable. */
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
          'eyebrow flex items-center gap-4',
          onDark ? 'text-gold-light' : 'text-gold-deep',
          centered && 'justify-center',
        )}
      >
        <span aria-hidden="true" className="rule" />
        {eyebrow}
        {centered && <span aria-hidden="true" className="rule" />}
      </p>
      <h2
        className={cn(
          'mt-6 font-display text-[2.6rem] leading-[1.06] font-medium text-balance sm:text-[3.4rem]',
          onDark ? 'text-ivory' : 'text-forest',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            'mt-6 text-lg leading-relaxed font-light text-pretty',
            onDark ? 'text-ivory/80' : 'text-ink-soft',
          )}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
