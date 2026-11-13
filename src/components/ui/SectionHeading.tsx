import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <header className={cn('max-w-2xl', centered && 'mx-auto text-center', className)} data-reveal>
      <p className="caps text-brass-light">{eyebrow}</p>
      <h2 className="mt-5 font-display text-[2.5rem] leading-[1.08] font-normal text-balance text-cream sm:text-[3.3rem]">
        {title}
      </h2>
      {centered && (
        <div className="ornament mt-7" aria-hidden="true">
          <i />
        </div>
      )}
      {lead && (
        <p className={cn('mt-6 text-[1.05rem] leading-relaxed text-pretty text-cream-soft')}>
          {lead}
        </p>
      )}
    </header>
  );
}
