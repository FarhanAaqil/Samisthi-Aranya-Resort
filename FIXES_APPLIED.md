# Samisthi Aranya Resorts — Fixes in this Revision

This revision addresses the most important issues found during the review of the supplied Next.js project.

## Visual experience

- Added section/card reveal transitions using `IntersectionObserver` and a subtle hero parallax effect.
- Added a very thin scroll-progress indicator and a compact sticky navigation state.
- Kept the approved Obsidian Rose palette as the only UI colour system.
- Honoured `prefers-reduced-motion` so motion-sensitive visitors are not forced through the animation effects.
- Kept the intro short, silent and skippable; it is shown once per tab session.

## Accuracy and content

- Corrected facility imagery so unrelated resort photos are not presented as a rain-dance, restaurant, conference-hall or campfire photograph.
- Reclassified the guest gathering and balloon-decorated event photographs with captions that describe what is actually visible.
- Kept the campfire clearly marked as available on request/special occasions only.
- Clarified that restaurant food is vegetarian-only and charged separately.
- Kept room inventory at 23 rooms / 68 combined guest capacity, with category-only room display (no individual room numbers).
- Kept all rates per room / 24-hour stay and marked them GST-inclusive.
- Retained the owner-confirmed category prices. The handwritten Room 102 price differs from the public 2-person Non-AC category price; the site intentionally uses the category price and does not display room numbers.
- Kept exact room availability out of the UI; the site displays total rooms per category only.

## Enquiry flow

- Removed the optional room-selection/enquiry form. The resort does not accept online bookings or online payments through this site.
- Kept direct phone and WhatsApp actions, including room-specific prefilled WhatsApp enquiry messages.
- Did not add a floating WhatsApp widget.

## Images, mapping and weather

- Migrated the main page image elements to `next/image` with responsive sizing.
- Checked that referenced public image assets and WebP variants exist.
- Added route links from the resort pin to each user-supplied nearby attraction pin; no unverified kilometre distances are claimed.
- Updated the weather widget coordinates to the resort pin and improved its condition labels and unavailable state.

## SEO and deployment

- Kept title/description metadata, Open Graph image, `LodgingBusiness` JSON-LD, `robots.txt`, and sitemap support.
- Canonical URLs and sitemap generation use the configured production URL rather than a made-up domain. Set `NEXT_PUBLIC_SITE_URL` after deployment / custom-domain setup.
- Added `.env.example` guidance for the site URL and optional direct Google review URL.

## Verification status

- TypeScript/TSX syntax transpilation: passed for all 9 source files.
- Referenced image asset checks: passed.
- JSON config parsing: passed.
- Full `npm install`, `npm run typecheck`, `npm run lint`, production build and browser/device QA have **not** been completed in this environment because the project dependencies were not installed and npm registry access was unavailable during the earlier install attempt. Run those checks after `npm install` in your local environment or Vercel before production launch.

## Still pending before public launch

- Add the direct Google review/write-a-review URL when the owner retrieves it.
- Set `NEXT_PUBLIC_SITE_URL` to the actual deployed URL and later to the purchased custom domain.
- Confirm final logo approval and final Google Business Profile / postal-address details.
