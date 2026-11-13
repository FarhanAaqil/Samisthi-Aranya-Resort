import { expect, test } from '@playwright/test';

const PHONE_TEL = 'tel:+917981583940';
const WHATSAPP_PREFIX = 'https://wa.me/917981583940';
const SECTIONS = [
  '#resort',
  '#rooms',
  '#experiences',
  '#explore',
  '#gallery',
  '#events',
  '#contact',
];

test.describe('home page', () => {
  test('loads cleanly with one h1 and no console errors', async ({ page }) => {
    const problems: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') problems.push(message.text());
    });
    page.on('pageerror', (error) => problems.push(error.message));

    await page.goto('/');

    await expect(page).toHaveTitle(/Samisthi Aranya Resorts/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /Samisthi Aranya Resorts\s+Breathe Nallamala/,
    );
    expect(problems).toEqual([]);
  });

  test('every navigation target exists on the page', async ({ page }) => {
    await page.goto('/');
    for (const target of SECTIONS) {
      await expect(page.locator(`section${target}`)).toHaveCount(1);
    }
  });

  test('call and WhatsApp links all use the resort number', async ({ page }) => {
    await page.goto('/');

    const telLinks = await page
      .locator('a[href^="tel:"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    const whatsappLinks = await page
      .locator('a[href^="https://wa.me/"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));

    expect(telLinks.length).toBeGreaterThan(3);
    expect(new Set(telLinks)).toEqual(new Set([PHONE_TEL]));
    expect(whatsappLinks.length).toBeGreaterThan(3);
    for (const href of whatsappLinks) expect(href.startsWith(WHATSAPP_PREFIX)).toBe(true);
  });

  test('takes no payments and never claims live availability', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('input[type="password"], input[autocomplete^="cc-"], input[name*="card" i]'),
    ).toHaveCount(0);
    await expect(page.getByText(/available today|rooms left|pay now/i)).toHaveCount(0);
  });

  test('the availability form opens WhatsApp with the request written out', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const opened: string[] = [];
      (window as unknown as { __opened: string[] }).__opened = opened;
      window.open = ((url?: string | URL) => {
        opened.push(String(url));
        return null;
      }) as typeof window.open;
    });

    if (isMobile) await page.getByRole('button', { name: 'Book', exact: true }).click();
    else await page.getByRole('button', { name: 'Check availability' }).first().click();

    const dialog = page.getByRole('dialog', { name: 'Check availability' });
    await expect(dialog).toBeVisible();

    await dialog.getByLabel('Check-in').fill('2030-12-12');
    await dialog.getByLabel('Check-out').fill('2030-12-11');
    await dialog.getByRole('button', { name: 'Check on WhatsApp' }).click();
    await expect(dialog.getByRole('alert')).toHaveText('Check-out needs to be after check-in.');

    await dialog.getByLabel('Check-out').fill('2030-12-13');
    await dialog.getByLabel('Guests').selectOption('2');
    await dialog.getByLabel('Room').selectOption({ label: 'Suite' });
    await dialog.getByRole('button', { name: 'Check on WhatsApp' }).click();

    const opened = await page.evaluate(
      () => (window as unknown as { __opened: string[] }).__opened,
    );
    expect(opened).toHaveLength(1);
    const url = new URL(opened[0]);
    expect(url.origin + url.pathname).toBe(WHATSAPP_PREFIX);
    expect(url.searchParams.get('text')).toContain(
      'the Suite from 12 Dec 2030 to 13 Dec 2030 (1 night) for 2 guests',
    );
    await expect(dialog).toBeHidden();
  });

  test('room rates are shown for AC and Non-AC and the totals add up', async ({ page }) => {
    await page.goto('/#rooms');
    const twoPerson = page.locator('#rooms article').first();
    await expect(twoPerson.getByRole('heading', { level: 3 })).toHaveText('Two-Person Room');
    await expect(twoPerson.locator('dd').nth(0)).toHaveText('₹2,500');
    await expect(twoPerson.locator('dd').nth(1)).toHaveText('₹1,500');
    await expect(page.locator('#rooms article')).toHaveCount(3);
    await expect(page.locator('#rooms')).toContainText('24 rooms for up to 68 guests');
  });

  test('room cards show rates but never per-category room counts', async ({ page }) => {
    await page.goto('/#rooms');
    const cards = page.locator('#rooms article');
    await expect(cards).toHaveCount(3);
    for (const card of await cards.all()) {
      await expect(card).not.toContainText(/\b\d+\s+rooms?\b/i);
    }
  });

  test('the highlights cover every kind of gathering', async ({ page }) => {
    await page.goto('/#highlights');
    const tiles = page.locator('#highlights li');
    await expect(tiles).toHaveCount(7);
    for (const title of [
      'Corporate gatherings',
      'Get-together programmes',
      'Events and functions',
      'A play area',
      'Family gatherings',
      'A spacious resort',
      'Open gardens',
    ]) {
      await expect(page.locator('#highlights')).toContainText(title);
    }
  });

  test('room photo viewer opens, steps with the arrow keys and returns focus', async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, 'Arrow keys are a keyboard feature.');
    await page.goto('/#rooms');

    const trigger = page.getByRole('button', { name: /View all 9 photos of the Two-Person Room/ });
    await trigger.click();

    const dialog = page.getByRole('dialog', { name: 'Two-Person Room' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Photo 1 of 9')).toBeVisible();

    await page.keyboard.press('ArrowRight');
    await expect(dialog.getByText('Photo 2 of 9')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('the gallery preview opens the whole collection', async ({ page }) => {
    await page.goto('/#gallery');
    await expect(page.locator('#gallery ul > li')).toHaveCount(4);

    await page
      .getByRole('button', { name: /^View all \d+ photos$/ })
      .first()
      .click();
    const dialog = page.getByRole('dialog', { name: 'Samisthi Aranya in photos' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/^Photo 1 of \d+$/)).toBeVisible();

    await dialog.getByRole('button', { name: 'Next photo' }).click();
    await expect(dialog.getByText(/^Photo 2 of \d+$/)).toBeVisible();
    await dialog.getByRole('button', { name: 'Close photo viewer' }).click();
    await expect(dialog).toBeHidden();
  });

  test('FAQ answers open one at a time', async ({ page }) => {
    await page.goto('/#faq');
    const first = page.locator('#faq details').first();
    const second = page.locator('#faq details').nth(1);

    await expect(first).toHaveAttribute('open', '');
    await second.locator('summary').click();
    await expect(second).toHaveAttribute('open', '');
    await expect(first).not.toHaveAttribute('open', '');
  });

  test('a section reached from the menu is visible straight away', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Uses the desktop navigation.');
    await page.goto('/');
    await page.getByRole('banner').getByRole('link', { name: 'Celebrations' }).click();

    const heading = page.locator('#events h2');
    await expect(heading).toBeInViewport();
    const opacity = await heading.evaluate(
      (el) => getComputedStyle(el.closest('[data-reveal]') ?? el).opacity,
    );
    expect(opacity).toBe('1');
  });

  test('the first Tab stop is the skip link', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard-only behaviour.');
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  });

  test('mobile menu opens, navigates and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'The menu button only exists on small screens.');
    await page.goto('/');

    await page.getByRole('button', { name: 'Open menu' }).click();
    const menu = page.getByRole('navigation', { name: 'Mobile' });
    await expect(menu).toBeVisible();

    await menu.getByRole('link', { name: 'Stay' }).click();
    await expect(menu).toBeHidden();
    await expect(page.locator('#rooms')).toBeInViewport();
  });
});

test.describe('other pages', () => {
  test('privacy and terms pages render', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.getByRole('heading', { level: 1, name: 'Privacy' })).toBeVisible();

    await page.goto('/terms');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Terms and stay conditions' }),
    ).toBeVisible();
  });

  test('unknown routes show the branded 404 with a way back', async ({ page }) => {
    const response = await page.goto('/no-such-page');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('leads back to the resort');
    await expect(page.getByRole('link', { name: /Back to Samisthi Aranya Resorts/ })).toBeVisible();
  });

  test('robots.txt and the web manifest are served', async ({ request }) => {
    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBe(true);
    expect(await robots.text()).toContain('User-Agent: *');

    const manifest = await request.get('/manifest.webmanifest');
    expect(manifest.ok()).toBe(true);
    expect((await manifest.json()).name).toBe('Samisthi Aranya Resorts');
  });
});
