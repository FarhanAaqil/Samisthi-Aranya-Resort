import { Container } from '@/components/ui/Container';
import { RESORT } from '@/data/resort';

export default function HomePage() {
  return (
    <main id="main">
      <section id="home" className="pt-40 pb-32">
        <Container>
          <h1 className="font-display text-6xl font-semibold text-wine">{RESORT.name}</h1>
          <p className="mt-3 font-display text-3xl text-ink-soft italic">{RESORT.tagline}</p>
        </Container>
      </section>
    </main>
  );
}
