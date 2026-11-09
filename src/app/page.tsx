import { Contact } from '@/components/sections/Contact';
import { Events } from '@/components/sections/Events';
import { Experiences } from '@/components/sections/Experiences';
import { Faq } from '@/components/sections/Faq';
import { Gallery } from '@/components/sections/Gallery';
import { Hero } from '@/components/sections/Hero';
import { Nearby } from '@/components/sections/Nearby';
import { ResortIntro } from '@/components/sections/ResortIntro';
import { Rooms } from '@/components/sections/Rooms';

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <ResortIntro />
      <Rooms />
      <Experiences />
      <Gallery />
      <Events />
      <Nearby />
      <Faq />
      <Contact />
    </main>
  );
}
