import { Experiences } from '@/components/sections/Experiences';
import { Hero } from '@/components/sections/Hero';
import { ResortIntro } from '@/components/sections/ResortIntro';
import { Rooms } from '@/components/sections/Rooms';

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <ResortIntro />
      <Rooms />
      <Experiences />
    </main>
  );
}
