# Samisthi Aranya Resorts

Website for **Samisthi Aranya Resorts**, a retreat on the edge of the Nallamala forest near Mannanur, on the Srisailam highway in Telangana. _Breathe Nallamala. Where Nature Meets Luxury._

Live: https://samisthiaranyaresort.vercel.app/ (a custom domain will be connected later).

It is one long page: the resort, rooms and rates, experiences, the jungle safari and nearby places, a gallery, celebrations, FAQs and contact. Guests reach the resort team by phone or WhatsApp. **The site takes no bookings and no payments, and shows no live availability.** The availability form only writes a WhatsApp message for the guest to send.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router), React 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4, with the design tokens in `src/app/globals.css`
- `next/font` for Cormorant Garamond (headlines), Jost (text) and Cinzel (wordmark)
- [lucide-react](https://lucide.dev) icons
- ESLint 9, Prettier, Playwright and axe-core for checks

Every page is statically generated. The only code that runs in the browser is the header, the booking form, dialog and bars, the photo viewers, the scroll effects and the small weather note.

## Getting started

You need Node 20.9 or newer (`.nvmrc` pins the version CI uses).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command             | What it does                                             |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Development server                                       |
| `npm run build`     | Production build                                         |
| `npm run start`     | Serve the production build                               |
| `npm run lint`      | ESLint                                                   |
| `npm run format`    | Format everything with Prettier (`format:check` to test) |
| `npm run typecheck` | Generate Next's types, then run the TypeScript compiler  |
| `npm run test:e2e`  | Build, then run the browser and accessibility tests      |
| `npm run check`     | Everything CI runs, in order                             |

The first time you run the browser tests, install the browser with `npx playwright install chromium`.

## Updating content

Everything a guest reads lives in `src/data/`, so details can change without touching the components.

| File            | Holds                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------ |
| `resort.ts`     | Name, taglines, phone and WhatsApp, WhatsApp messages, map link, stay times, event pricing |
| `rooms.ts`      | Room categories, counts, AC and Non-AC rates, descriptions and photos                      |
| `facilities.ts` | Pool, lawns, safari, rain dance, restaurant and the other facilities                       |
| `nearby.ts`     | Nearby places and their directions links                                                   |
| `faq.ts`        | Questions and answers. Rates and totals are pulled in from `rooms.ts`                      |
| `gallery.ts`    | Which photos appear in the gallery, in order                                               |
| `photos.ts`     | Every photograph with its alt text and caption                                             |

Totals such as **21 rooms** and **56 guests** are calculated from the room list, so they can't drift out of date. The room types offered in the availability form come from `rooms.ts` too.

To add a photo, resize it to about 2000px on the long edge, strip its location metadata, and put it in `src/assets/photos/`. Import it in `photos.ts` with a description for the alt text, then reference it where it belongs. Images imported this way get their dimensions and a blur placeholder automatically, and Next serves them as AVIF or WebP at the right size.

## Design

The palette follows the owner's badge: forest green and antique gold on an ivory canvas, with sharp corners, hairline rules and generous space.

| Token         | Hex       | Used for                                                 |
| ------------- | --------- | -------------------------------------------------------- |
| `ivory`       | `#F6F2EA` | Page background                                          |
| `paper`       | `#FBF8F2` | Alternate sections                                       |
| `stone`       | `#ECE5D8` | Alternate sections, image placeholders                   |
| `ink`         | `#1F1D1A` | Body text                                                |
| `forest`      | `#12351F` | Headings, buttons, the safari band                       |
| `forest-deep` | `#08230F` | Footer, booking bars; matches the badge's own background |
| `gold`        | `#B8913F` | Rules and icons, never text on the light canvas          |
| `gold-light`  | `#D8BC7A` | Accents and labels on dark surfaces                      |
| `gold-deep`   | `#7A5A1C` | Small labels on the light canvas                         |

Contrast ratios are noted next to the tokens in `globals.css`, and the axe scan in the test suite keeps them honest. The full badge (`src/assets/brand/`) appears in the footer, where a soft mask blends its square edge into the matching background; the header uses a text wordmark because the badge's detail is lost at small sizes.

Motion is limited to short fade-ins and slow image zooms. Fade-ins start before a section arrives, and anything reached from the menu appears at once. Everything respects the reduced-motion setting.

## Booking flow

- The **Check availability** buttons open a dialog with check-in, check-out, guests and room type.
- On large screens the same form sits in a bar that slides up from the bottom once the visitor has scrolled past the first screen.
- On phones a bar pinned to the bottom always offers **Call**, **WhatsApp** and **Book**.
- Sending opens WhatsApp with a message such as _"I'd like to check availability for the Suite from 12 Dec 2026 to 13 Dec 2026 (1 night) for 2 guests."_ Nothing is stored or sent anywhere else.

## Quality checks and workflow

GitHub Actions (`.github/workflows/ci.yml`) runs on every push to `master` and every pull request:

1. **Lint, types and build**: ESLint, Prettier check, TypeScript, production build
2. **Browser tests**: Playwright on a desktop and a phone profile. They cover the booking form, photo viewers, gallery, FAQ, menus and links, plus an axe accessibility scan of every page

Work happens on `master`. Each phase goes into `main` through a pull request once CI is green, and Vercel deploys `main`.

## Performance notes

Measured with Chrome's CPU slowed four times: the hero paints at about one second, and scrolling the whole page produces no long main-thread tasks. Lighthouse run against `localhost` reports a slower simulated LCP than real Chrome does. Locally all the JavaScript finishes before first paint, and Lighthouse's simulation then counts it towards LCP. Measure the deployed site for representative numbers.

## Going live on a custom domain

1. Connect the domain in the Vercel project.
2. Set `NEXT_PUBLIC_SITE_URL` to it (no trailing slash). Until then, canonical links, the sitemap and social previews use the Vercel production URL automatically.
3. Vercel's Hobby plan is for personal, non-commercial use, so a commercial resort site needs a plan that permits it. Check [Vercel's pricing and terms](https://vercel.com/pricing).
4. Submit `/sitemap.xml` in Google Search Console, and keep the Google Business Profile's name, phone number and map pin identical to the site's.

Preview deployments send `noindex` and a disallow-all `robots.txt`, so only production is indexed.

## Still needed from the owner

- **Google review link.** Set `NEXT_PUBLIC_GOOGLE_REVIEW_URL` and a "Write a review" link appears. Until then the site links to the Google Maps listing and shows no reviews or ratings.
- **Photos of the rain dance, restaurant, conference hall and a daytime pool.** These facilities are currently described without their own photographs.
- **Postal address line.** Optional. Set `postalAddress` in `src/data/resort.ts` to show it in the contact section.
- **Social links.** Add them to `socialLinks` in `src/data/resort.ts`. Nothing is shown while the list is empty.
- **Nearby pin names.** Srisailam Dam View Point, the Amrabad safari gate and Octopus View Point have not been checked against their Google Maps pins yet. No distances or drive times are shown until they are measured from a route source.
