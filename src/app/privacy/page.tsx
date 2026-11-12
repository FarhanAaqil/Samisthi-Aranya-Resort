import type { Metadata } from 'next';

import { LegalPage } from '@/components/LegalPage';
import { RESORT } from '@/data/resort';

export const metadata: Metadata = {
  title: 'Privacy',
  description: `How ${RESORT.name} handles information on this website.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="12 November 2026">
      <p>
        This website is an information and enquiry page for {RESORT.name}. It has no accounts,
        online payments or advertising, and it does not set cookies.
      </p>

      <h2>What we collect</h2>
      <p>
        Nothing is collected through the site itself. The availability form does not send anything
        to us or store anything: it only writes your dates, guests and room choice into a WhatsApp
        message, which you can read and edit before sending. When you call or message the resort, we
        see the number you contact us from and whatever you choose to tell us, and we use it only to
        answer your enquiry and manage your booking.
      </p>

      <h2>Third-party services</h2>
      <ul>
        <li>
          <strong>Weather.</strong> The small weather note near the top loads the current conditions
          from Open-Meteo. Your browser contacts their service directly, as with any website that
          loads outside content.
        </li>
        <li>
          <strong>Maps and WhatsApp.</strong> Buttons for directions and WhatsApp open Google Maps
          and WhatsApp. Their own privacy policies apply once you are on those services.
        </li>
        <li>
          <strong>Fonts.</strong> Fonts are served from our own domain at build time, so reading
          this page does not send a request to a font provider.
        </li>
      </ul>

      <h2>Questions</h2>
      <p>
        Call us on {RESORT.contact.phoneDisplay} if you would like to ask about information you have
        shared with the resort team.
      </p>
    </LegalPage>
  );
}
