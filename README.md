# Samisthi Aranya Resorts — Official Website (Obsidian Rose Edition)

> **Where Nature Meets Luxury.**
> Single-page cinematic nature retreat website built with **Next.js App Router + TypeScript + Tailwind CSS**, strictly adhering to the **Obsidian Rose** visual system and verified owner data.

---

## 1. Brand & Design System Authority (Obsidian Rose)

This project enforces the exact 5-colour **Obsidian Rose** palette (`IMG_20260912_131454.jpg`) across all UI components (`tailwind.config.ts` and `src/app/globals.css`):

| Palette Role              | Hex Code  | Tailwind Token | Primary Usage                                                    |
| :------------------------ | :-------- | :------------- | :--------------------------------------------------------------- |
| **Obsidian / Near-Black** | `#120D0F` | `obsidian`     | Primary background, deep overlays, modal surfaces                |
| **Deep Wine**             | `#682E4E` | `wine`         | Section accents, card borders, active states, secondary buttons  |
| **Rose**                  | `#E79AB2` | `rose`         | Editorial highlights, subtitles, hover states, secondary badges  |
| **Pale Rose**             | `#F6E7EC` | `palerose`     | Primary light typography, headings, high-contrast reading copy   |
| **Gold**                  | `#C9A227` | `gold`         | Fine rules, emblem details, primary CTA buttons, tariff callouts |

- **Logo Assets**:
  - `public/images/brand/samisthi-aranya-logo.svg` & `src/components/ObsidianLogo.tsx`: Crisp vector cabin-and-nature emblem & wordmark redrawn in the Obsidian Rose palette on `#120D0F` / transparent background (zero green).
  - `public/images/brand/samisthi-aranya-logo-obsidian.png`: Recoloured raster concept mark in Obsidian Rose hues.

---

## 2. Central Data Configuration (`src/data/resortData.ts`)

All property details, room categories, tariffs, facility descriptions, gallery mappings, nearby Google Maps links, and FAQ entries live in one central file:

- **`src/data/resortData.ts`**

### Confirmed Public Room Catalogue (24-Hour Stay • Check-in 11:00 AM / Check-out 11:00 AM • GST Included)

| Category                            | Guest Capacity         | Total Rooms  | AC Tariff (24 Hrs) | Non-AC Tariff (24 Hrs) |
| :---------------------------------- | :--------------------- | :----------- | :----------------- | :--------------------- |
| **2-Person Room**                   | 2 guests               | 11           | ₹2,500             | ₹1,500                 |
| **4-Person Room**                   | 4 guests               | 7            | ₹4,000             | ₹2,500                 |
| **6-Person Room**                   | 6 guests               | 2            | ₹6,000             | ₹3,500                 |
| **Suite** (Living Lounge + Bedroom) | 2 guests               | 3            | ₹6,000             | ₹5,000                 |
| **Total**                           | **68 guests combined** | **23 rooms** | —                  | —                      |

---

## 3. Local Development & Build Instructions

### Prerequisites

- Node.js `>= 18.17.0` (LTS recommended)
- `npm`, `pnpm`, or `yarn`

### Install & Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variable template
cp .env.example .env.local

# 3. Start local development server (http://localhost:3000)
npm run dev

# 4. Run TypeScript check and production build verification
npm run typecheck
npm run build
npm run start
```

---

## 4. GitHub + Vercel Deployment Checklist

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial release: Samisthi Aranya Resorts Obsidian Rose website"
   git branch -M main
   git remote add origin https://github.com/<your-org>/samisthi-aranya-resorts.git
   git push -u origin main
   ```
2. **Import into Vercel**:
   - Connect the GitHub repository in the Vercel dashboard.
   - Framework Preset: **Next.js** (detected automatically).
   - Set `NEXT_PUBLIC_SITE_URL` to your initial `.vercel.app` production URL, then update it once the custom domain is connected.
3. **Commercial Plan Verification Note**:
   - Per [Vercel Pricing](https://vercel.com/pricing) and [Vercel Terms of Service](https://vercel.com/legal/terms), the Hobby plan (`$0/month`) is restricted to personal, non-commercial use, while the Pro plan (`$20/month`) supports commercial production sites. Because Samisthi Aranya Resorts is a commercial hospitality business, select an appropriate commercial plan before public launch.
4. **Post-Domain SEO & Google Search Console Steps**:
   - Once the custom domain is connected, update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables so `/sitemap.xml`, `/robots.txt`, canonical tags, and Schema.org `LodgingBusiness` JSON-LD emit the final domain automatically.
   - Submit `/sitemap.xml` in Google Search Console and align the resort's Google Business Profile name (`Samisthi Aranya Resorts`), phone (`+91 79815 83940`), and map pin (`https://maps.app.goo.gl/qJF7ig8nu8stzFhW6`) following the [Google Search Central SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

---

## 5. Pending Owner Inputs & Verification Notes (Non-Blocking)

1. **Room 102 Rate Discrepancy Flag**:
   - The handwritten room sheet lists Room 102 at `₹1,600` for a 2-person Non-AC room, whereas the owner confirmed the public category-level 2-person Non-AC rate as `₹1,500`. The website displays the confirmed category rate (`₹1,500`) and omits individual room numbers and the un-reconciled handwritten total. Please verify Room 102 if room-by-room pricing is ever published in the future.
2. **Official Google Review Link**:
   - Once the owner retrieves the direct Google review/write-a-review link, set `NEXT_PUBLIC_GOOGLE_REVIEW_URL` in `.env.local` / Vercel (or `pendingOwnerConfig.googleReviewUrl` in `src/data/resortData.ts`).
3. **Recoloured Obsidian Rose Logo Approval**:
   - Both the crisp vector SVG emblem (`public/images/brand/samisthi-aranya-logo.svg`) and recoloured concept PNG (`public/images/brand/samisthi-aranya-logo-obsidian.png`) are included for final owner sign-off.
4. **Nearby Destination Pin Names & Exact Postal Address Line**:
   - The 5 Google Maps links (`https://maps.app.goo.gl/qJF7ig8nu8stzFhW6`, `https://maps.app.goo.gl/t8roSR29dQLuMqyE9`, `https://maps.app.goo.gl/QXp46SM2mBZuUCMy5`, `https://maps.app.goo.gl/LF679T3D1o5vqBF68`, `https://maps.app.goo.gl/uVvbNh7McWDtNca47`) are integrated directly without unverified driving distances. Confirm any formatted postal street line in `src/data/resortData.ts` (`pendingOwnerConfig.formattedPostalAddress`) if desired alongside the Google Maps directions button.

---

## 6. Latest Review & Fixes

See **`FIXES_APPLIED.md`** for the source changes made after the first review, the asset/content corrections, and the exact verification status. Before launch, install dependencies and run:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

Also test the deployed site on a real phone and desktop browser, especially the scroll effects, menus, room galleries, enquiry links, map links, and weather fallback.
