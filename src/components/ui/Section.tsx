import { cn } from '@/lib/cn';
import { Container } from './Container';

type Tone = 'ivory' | 'paper' | 'stone' | 'forest' | 'sand' | 'petal' | 'clay' | 'wine';

const tones: Record<Tone, string> = {
  ivory: 'bg-ivory text-ink',
  paper: 'bg-paper text-ink',
  stone: 'bg-stone text-ink',
  forest: 'on-dark bg-forest text-ivory',
  // Earlier names, mapped onto the new palette until every section moves over.
  sand: 'bg-ivory text-ink',
  petal: 'bg-paper text-ink',
  clay: 'bg-stone text-ink',
  wine: 'on-dark bg-forest text-ivory',
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: Tone;
  containerSize?: 'default' | 'narrow' | 'wide';
}

/** Page section with consistent vertical rhythm. The id doubles as the anchor target. */
export function Section({
  tone = 'ivory',
  containerSize,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn('py-24 sm:py-32', tones[tone], className)} {...rest}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
