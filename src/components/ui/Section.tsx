import { cn } from '@/lib/cn';
import { Container } from './Container';

type Tone = 'sand' | 'petal' | 'clay' | 'wine';

const tones: Record<Tone, string> = {
  sand: 'bg-sand text-ink',
  petal: 'bg-petal text-ink',
  clay: 'bg-clay text-ink',
  wine: 'on-dark bg-wine-deep text-petal',
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: Tone;
  containerSize?: 'default' | 'narrow';
}

/** Page section with consistent vertical rhythm. The id doubles as the anchor target. */
export function Section({
  tone = 'sand',
  containerSize,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn('py-20 sm:py-28', tones[tone], className)} {...rest}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
