import { cn } from '@/lib/cn';
import { Container } from './Container';

type Tone = 'olive' | 'deep';

const tones: Record<Tone, string> = {
  olive: 'bg-olive',
  deep: 'bg-olive-deep',
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: Tone;
  containerSize?: 'default' | 'narrow' | 'wide';
}

/** Page section with consistent vertical rhythm. The id doubles as the anchor target. */
export function Section({
  tone = 'olive',
  containerSize,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn('py-24 text-cream sm:py-32', tones[tone], className)} {...rest}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
