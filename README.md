# Samisthi Aranya Resorts

Website for **Samisthi Aranya Resorts**, a nature retreat near Mannanur on the Srisailam highway in Telangana. _Where Nature Meets Luxury._

It is a single, long landing page that shows the property, rooms and rates, facilities, photos, nearby places and FAQs, and sends guests to the resort team by phone or WhatsApp. There is **no online booking, no payment and no live availability** by design, and the tests check for that.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) with React 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4, with design tokens in `src/app/globals.css`
- [lucide-react](https://lucide.dev) icons, `next/font` for Cormorant Garamond and DM Sans
- ESLint 9, Prettier, Playwright and axe-core for checks

Pages are statically generated. The only client-side code is the navigation, scroll effects, photo viewer, rate toggle, gallery filter and the small weather note.

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

Everything a guest reads lives in `src/data/`, so the owner's details can change without touching components.

| File            | Holds                                                                       |
| --------------- | --------------------------------------------------------------------------- |
| `resort.ts`     | Phone and WhatsApp number, map link, check-in and out, whole-resort pricing |
| `rooms.ts`      | Room categories, counts, AC and Non-AC rates, descriptions and photos       |
| `facilities.ts` | Pool, lawns, rain dance, restaurant and the other facilities                |
| `faq.ts`        | Questions and answers. Rates and totals are pulled in from `rooms.ts`       |
| `nearby.ts`     | Nearby places and their directions links                                    |
| `gallery.ts`    | Which photos appear in the gallery and under which filter                   |
| `photos.ts`     | Every photograph with its alt text and caption                              |

Totals such as **21 rooms** and **56 guests** are calculated from the room list, so they cannot drift out of date.

To add a photo, put the file in `src/assets/photos/`, import it in `photos.ts` with a description for the alt text, then reference it from the data file where it belongs.

## Design

The palette keeps the brand's wine, rose and gold but sits them on a warm blush-sand canvas instead of the original obsidian one.

| Token       | Hex       | Used for                         |
| ----------- | --------- | -------------------------------- |
| `sand`      | `#F5E6DC` | Page background                  |
| `petal`     | `#FBF0E9` | Raised cards and alternate bands |
| `clay`      | `#EBD2C5` | Image placeholders               |
| `ink`       | `#3A2230` | Body text                        |
| `wine`      | `#682E4E` | Headings, buttons                |
| `wine-deep` | `#4A1F38` | Footer and the events band       |
| `rose`      | `#E79AB2` | Soft highlights                  |
| `gold`      | `#B8892B` | Rules and icons, never text      |
| `gold-deep` | `#6B4D0E` | Small gold labels                |

Contrast ratios are noted next to the tokens in `globals.css`, and the axe scan in the test suite keeps them honest. Motion is limited to gentle fade-ups and image zooms, and respects the reduced-motion setting.

The logo is redrawn as a vector in `src/components/ui/Logo.tsx`. The original concept image and the palette reference are kept in `docs/brand/`.

## Quality checks and workflow

GitHub Actions (`.github/workflows/ci.yml`) runs on every push to `master` and every pull request:

1. **Lint, types and build**: ESLint, Prettier check, TypeScript, production build
2. **Browser tests**: Playwright on a desktop and a phone profile, including an axe accessibility scan of every page

Work happens on `master`. Each phase of work goes into `main` through a pull request once CI is green.

## Before going live

Deployment has not been set up yet. When it is time:

1. Import the GitHub repository in Vercel. The Next.js preset needs no changes.
2. Set `NEXT_PUBLIC_SITE_URL` to the production address, first the `.vercel.app` URL and later the custom domain.
3. Vercel's Hobby plan is for personal, non-commercial use, so a commercial resort site needs a plan that permits it. Check [Vercel's pricing and terms](https://vercel.com/pricing) at the time of deploying.
4. After the domain is connected, submit `/sitemap.xml` in Google Search Console, and make sure the Google Business Profile has the same name, phone number and map pin as the site.

Preview deployments and local builds send `noindex` and a disallow-all `robots.txt` automatically, so only the production site is indexed.

## Still needed from the owner

- **Google review link.** Set `NEXT_PUBLIC_GOOGLE_REVIEW_URL` and a "Write a review" link appears. Until then, the site links to the Google Maps listing and shows no reviews or ratings.
- **Logo approval.** The redrawn mark follows the original concept in new colours.
- **Postal address line.** Optional. Set `postalAddress` in `src/data/resort.ts` to show it beside the map link.
- **Social links.** Add them to `socialLinks` in `src/data/resort.ts`. Nothing is shown while the list is empty.
- **Nearby pin names.** Srisailam Dam View Point, the Amrabad safari gate and Octopus View Point have not been checked against their Google Maps pins yet. No distances or drive times are shown until they are measured from a route source.
