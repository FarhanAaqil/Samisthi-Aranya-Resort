'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  RESORT_CONFIG,
  ROOM_CATEGORIES,
  CONFIRMED_FACILITIES,
  GALLERY_ITEMS,
  NEARBY_DESTINATIONS,
  FAQ_ITEMS,
  type RoomCategory,
  type GalleryItem,
} from '@/data/resortData';
import { ObsidianLogo } from '@/components/ObsidianLogo';
import { WeatherWidget } from '@/components/WeatherWidget';

export function LandingPageClient() {
  const [showPrelude, setShowPrelude] = useState(false);
  const [compactNav, setCompactNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tariffHighlight, setTariffHighlight] = useState<'BOTH' | 'AC' | 'NON_AC'>('BOTH');
  const [activeRoomModal, setActiveRoomModal] = useState<{
    room: RoomCategory;
    index: number;
  } | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  // Show the short, sound-free brand reveal once per tab session. Returning visitors
  // go straight to the content; reduced-motion users never get an animated intro.
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadySeen = window.sessionStorage.getItem('samisthi-intro-seen') === '1';
    if (prefersReduced || alreadySeen) return;

    const start = window.setTimeout(() => setShowPrelude(true), 0);
    const end = window.setTimeout(() => {
      setShowPrelude(false);
      window.sessionStorage.setItem('samisthi-intro-seen', '1');
    }, 1450);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, []);

  // Keep scroll work off React's render loop. CSS variables drive the subtle progress
  // line and hero parallax; React only updates the compact-nav state at the threshold.
  useEffect(() => {
    let frame = 0;
    const updateScrollEffects = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${pct}%`);
      document.documentElement.style.setProperty(
        '--hero-parallax-y',
        `${Math.min(scrollTop, 720) * 0.12}px`,
      );
      const shouldCompact = scrollTop > 64;
      setCompactNav((current) => (current === shouldCompact ? current : shouldCompact));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollEffects);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollEffects();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Reveal section content and selected cards as they enter the viewport. The
  // observer unobserves each item after revealing it, avoiding continuous work.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        'main section:not(#home) > div > *, main section article, main section figure',
      ),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
    );

    nodes.forEach((node, index) => {
      node.classList.add('scroll-reveal');
      node.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 75}ms`);
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPrelude(false);
        setActiveRoomModal(null);
        setLightboxItem(null);
        setLegalModal(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredGallery =
    galleryFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.group === galleryFilter);

  return (
    <div className="min-h-screen bg-obsidian text-palerose selection:bg-wine selection:text-palerose">
      {/* Top Thin Scroll-Progress Line */}
      <div
        className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[2px] bg-obsidian/40"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gold transition-all duration-150"
          style={{ width: 'var(--scroll-progress, 0%)' }}
        />
      </div>

      {/* Brief Sound-Free Logo Reveal Prelude */}
      {showPrelude && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian px-6 transition-opacity duration-500"
          role="dialog"
          aria-label="Samisthi Aranya Resorts Intro"
        >
          <div className="w-full max-w-md text-center">
            <ObsidianLogo className="mx-auto w-full max-w-[340px]" />
            <p className="mt-3 font-serif text-lg tracking-wide text-rose italic">
              {RESORT_CONFIG.tagline}
            </p>
            <button
              type="button"
              onClick={() => {
                window.sessionStorage.setItem('samisthi-intro-seen', '1');
                setShowPrelude(false);
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-wine/30 px-4 py-1.5 text-xs tracking-[0.2em] text-palerose uppercase hover:bg-wine/60 focus:ring-2 focus:ring-gold focus:outline-none"
            >
              Enter Experience
            </button>
          </div>
        </div>
      )}

      {/* Sticky Compact Navigation */}
      <header
        className={`fixed top-0 right-0 left-0 z-40 border-b transition-all duration-300 ${
          compactNav
            ? 'border-wine/60 bg-obsidian/95 py-2.5 backdrop-blur-md'
            : 'border-wine/30 bg-obsidian/75 py-4 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="rounded-lg focus:ring-2 focus:ring-gold focus:outline-none"
            aria-label="Samisthi Aranya Resorts Home"
          >
            <ObsidianLogo compact />
          </a>

          <nav
            className="hidden items-center gap-6 text-xs tracking-[0.16em] uppercase lg:flex"
            aria-label="Primary Navigation"
          >
            {[
              ['#home', 'Home'],
              ['#resort', 'The Resort'],
              ['#rooms', 'Rooms'],
              ['#experiences', 'Experiences'],
              ['#gallery', 'Gallery'],
              ['#nearby', 'Explore Nearby'],
              ['#reviews', 'Reviews'],
              ['#contact', 'Contact'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded px-1 py-0.5 text-palerose/85 transition-colors hover:text-gold focus:ring-2 focus:ring-gold focus:outline-none"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 sm:flex">
            <a
              href={RESORT_CONFIG.contact.telHref}
              className="rounded-full border border-gold/70 bg-obsidian px-3.5 py-1.5 text-xs font-medium tracking-wider text-palerose hover:bg-wine/50 focus:ring-2 focus:ring-gold focus:outline-none"
            >
              Call {RESORT_CONFIG.contact.phoneDisplay}
            </a>
            <a
              href={`${RESORT_CONFIG.contact.whatsappHref}?text=${encodeURIComponent(
                RESORT_CONFIG.contact.whatsappDefaultText,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-rose/50 bg-wine px-4 py-1.5 text-xs font-medium tracking-wider text-palerose transition-colors hover:bg-rose hover:text-obsidian focus:ring-2 focus:ring-gold focus:outline-none"
            >
              WhatsApp Enquiry
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-lg border border-wine px-3 py-1.5 text-xs tracking-widest text-palerose uppercase hover:border-gold focus:ring-2 focus:ring-gold focus:outline-none lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="space-y-2 border-t border-wine/50 bg-obsidian/95 px-4 pt-3 pb-5 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-2 text-xs tracking-wider uppercase">
              {[
                ['#home', 'Home'],
                ['#resort', 'The Resort'],
                ['#rooms', 'Rooms & Tariffs'],
                ['#experiences', 'Experiences'],
                ['#gallery', 'Visual Gallery'],
                ['#nearby', 'Explore Nearby'],
                ['#reviews', 'Reviews'],
                ['#contact', 'Contact'],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg border border-wine/40 bg-wine/15 px-3 py-2 text-palerose hover:border-gold"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={RESORT_CONFIG.contact.telHref}
                className="flex-1 rounded-full border border-gold bg-obsidian py-2 text-center text-xs font-medium text-palerose"
              >
                Call {RESORT_CONFIG.contact.phoneDisplay}
              </a>
              <a
                href={`${RESORT_CONFIG.contact.whatsappHref}?text=${encodeURIComponent(RESORT_CONFIG.contact.whatsappDefaultText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-rose/50 bg-wine py-2 text-center text-xs font-medium text-palerose"
              >
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* 01. CINEMATIC HERO */}
        <section
          id="home"
          className="relative flex min-h-[92vh] items-end justify-center overflow-hidden border-b border-wine/40 pt-28 pb-16 sm:pb-24"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/IMG-20261107-WA0040(1).webp"
              alt="Samisthi Aranya Resorts main building and expansive green lawn under an evening sky"
              fill
              priority
              sizes="100vw"
              className="hero-parallax object-cover object-[center_58%]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(18,13,15,0.72) 0%, rgba(18,13,15,0.42) 42%, rgba(18,13,15,0.92) 90%, #120D0F 100%)',
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto mb-4 max-w-xs sm:max-w-sm">
              <ObsidianLogo className="h-auto w-full" />
            </div>
            <p className="mb-4 inline-block rounded-full border border-gold/60 bg-obsidian/75 px-4 py-1 text-[11px] tracking-[0.26em] text-gold uppercase">
              Mannanur • Srisailam Highway Nature Retreat
            </p>
            <h1 className="font-serif text-4xl font-semibold tracking-wider text-palerose sm:text-6xl lg:text-7xl">
              SAMISTHI ARANYA RESORTS
            </h1>
            <p className="mt-3 font-serif text-xl text-rose italic sm:text-3xl">
              Where Nature Meets Luxury.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-palerose/90 sm:text-base">
              An inviting sanctuary of manicured green lawns, 24-hour swimming pools and rain dance,
              pure vegetarian dining, and restful AC &amp; Non-AC stays near Mannanur, Amrabad Tiger
              Reserve, and Srisailam Dam View Point.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#rooms"
                className="rounded-full bg-gold px-7 py-3 text-xs font-semibold tracking-[0.18em] text-obsidian uppercase transition-colors hover:bg-rose focus:ring-2 focus:ring-palerose focus:outline-none sm:text-sm"
              >
                Explore the Resort &amp; Rooms
              </a>
              <a
                href="#contact"
                className="rounded-full border border-rose bg-wine/70 px-7 py-3 text-xs font-semibold tracking-[0.18em] text-palerose uppercase transition-colors hover:bg-wine focus:ring-2 focus:ring-gold focus:outline-none sm:text-sm"
              >
                Direct Enquiry
              </a>
              <a
                href={RESORT_CONFIG.contact.telHref}
                className="rounded-full border border-gold/60 bg-obsidian/80 px-6 py-3 text-xs font-medium tracking-wider text-palerose hover:border-gold focus:ring-2 focus:ring-gold focus:outline-none sm:text-sm"
              >
                Call {RESORT_CONFIG.contact.phoneDisplay}
              </a>
            </div>

            <div className="mt-8 flex justify-center">
              <WeatherWidget />
            </div>
          </div>
        </section>

        {/* 02. THE RESORT / NATURE INTRODUCTION */}
        <section id="resort" className="border-b border-wine/40 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-6">
                <p className="text-xs tracking-[0.25em] text-gold uppercase">
                  01 • The Resort &amp; Natural Setting
                </p>
                <h2 className="font-serif text-3xl leading-tight text-palerose sm:text-5xl">
                  A Warm, Welcoming Haven Along the Srisailam Forest Corridor
                </h2>
                <p className="text-base leading-relaxed text-palerose/85">
                  Set amidst the open skies and gentle hills of Mannanur along the Srisailam route,
                  <strong className="font-medium text-palerose">
                    {' '}
                    Samisthi Aranya Resorts
                  </strong>{' '}
                  brings together generous outdoor breathing room and thoughtful hospitality for
                  families, couples, and group travellers.
                </p>
                <p className="text-sm leading-relaxed text-palerose/80 sm:text-base">
                  Step out from airy upper-level corridors and private sit-out balconies onto
                  sweeping lawns built for cricket, volleyball, and evening gatherings. Whether
                  cooling off in our 24-hour swimming pool and rain dance arena or setting out
                  toward Srisailam Dam View Point and the Amarabad Tiger Reserve safari gate, every
                  stay is grounded in calm nature and direct personal care.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3">
                  <div className="rounded-xl border border-wine/70 bg-wine/15 p-4">
                    <p className="font-serif text-2xl font-semibold text-gold">23 Rooms</p>
                    <p className="mt-1 text-xs text-palerose/80">
                      Across 4 confirmed categories (up to 68 guests)
                    </p>
                  </div>
                  <div className="rounded-xl border border-wine/70 bg-wine/15 p-4">
                    <p className="font-serif text-2xl font-semibold text-gold">24-Hr Stay</p>
                    <p className="mt-1 text-xs text-palerose/80">
                      11:00 AM check-in to 11:00 AM next day
                    </p>
                  </div>
                  <div className="col-span-2 rounded-xl border border-wine/70 bg-wine/15 p-4 sm:col-span-1">
                    <p className="font-serif text-2xl font-semibold text-gold">24-Hr Pool</p>
                    <p className="mt-1 text-xs text-palerose/80">
                      Main pool, kids’ pool &amp; rain dance in tariff
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:col-span-6">
                <div className="space-y-4">
                  <figure className="overflow-hidden rounded-2xl border border-wine/60 bg-wine/10">
                    <Image
                      src="/images/resort/AISelect_20261110_004937_Maps.webp"
                      alt="Daylight view of green lawn and resort building at Samisthi Aranya Resorts"
                      width={960}
                      height={720}
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <figcaption className="px-3 py-2 text-xs text-rose">
                      Expansive central lawn &amp; resort wing
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-2xl border border-wine/60 bg-wine/10">
                    <Image
                      src="/images/resort/IMG-20261107-WA0045.webp"
                      alt="Upper floor airy corridor overlooking central courtyard"
                      width={960}
                      height={720}
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <figcaption className="px-3 py-2 text-xs text-rose">
                      Spacious upper-floor atrium corridors
                    </figcaption>
                  </figure>
                </div>
                <div className="space-y-4 pt-6">
                  <figure className="overflow-hidden rounded-2xl border border-wine/60 bg-wine/10">
                    <Image
                      src="/images/resort/AISelect_20261110_004836_Maps.webp"
                      alt="Covered checkered courtyard promenade bordering the resort lawn"
                      width={960}
                      height={720}
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      className="h-52 w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <figcaption className="px-3 py-2 text-xs text-rose">
                      Covered courtyard promenade
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-2xl border border-wine/60 bg-wine/10">
                    <Image
                      src="/images/resort/AISelect_20261110_005053_Maps.webp"
                      alt="View across Samisthi Aranya Resorts lawn toward surrounding hills"
                      width={960}
                      height={720}
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      className="h-60 w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <figcaption className="px-3 py-2 text-xs text-rose">
                      Scenic Nallamala foothills backdrop
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03. ROOMS AND STAY CATALOGUE */}
        <section id="rooms" className="border-b border-wine/40 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs tracking-[0.25em] text-gold uppercase">
                  02 • Confirmed Public Room Catalogue
                </p>
                <h2 className="mt-2 font-serif text-3xl text-palerose sm:text-5xl">
                  Rooms, Suites &amp; 24-Hour Tariffs
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-palerose/85 sm:text-base">
                  All rates are per room for a{' '}
                  <strong className="text-palerose">24-hour stay</strong> (Check-in{' '}
                  <strong className="text-palerose">11:00 AM</strong> • Check-out{' '}
                  <strong className="text-palerose">11:00 AM next day</strong>) and{' '}
                  <strong className="text-gold">include GST</strong>. Fixed category room counts are
                  shown below; contact our team directly to confirm availability for your dates.
                </p>
              </div>

              <div className="inline-flex self-start rounded-full border border-wine bg-wine/20 p-1">
                {[
                  ['BOTH', 'Compare AC & Non-AC'],
                  ['AC', 'Highlight AC Tariff'],
                  ['NON_AC', 'Highlight Non-AC Tariff'],
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTariffHighlight(mode as 'BOTH' | 'AC' | 'NON_AC')}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus:ring-2 focus:ring-gold focus:outline-none ${
                      tariffHighlight === mode
                        ? 'bg-gold font-semibold text-obsidian'
                        : 'text-palerose hover:text-rose'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {ROOM_CATEGORIES.map((room) => (
                <article
                  key={room.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-wine/80 bg-wine/15 transition-all duration-500 hover:-translate-y-1 hover:border-gold/70"
                >
                  <div>
                    <div className="relative h-64 w-full overflow-hidden bg-obsidian sm:h-72">
                      <Image
                        src={room.photos[0].webp || room.photos[0].src}
                        alt={room.photos[0].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-gold/60 bg-obsidian/90 px-3 py-1 text-xs font-medium text-gold">
                          {room.totalRooms} {room.totalRooms === 1 ? 'Room' : 'Rooms'} in Category
                        </span>
                        <span className="rounded-full border border-rose/50 bg-wine/90 px-3 py-1 text-xs font-medium text-palerose">
                          Capacity: {room.occupancyGuests} Guests
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveRoomModal({ room, index: 0 })}
                        className="absolute right-3 bottom-3 rounded-full border border-rose/70 bg-obsidian/90 px-3.5 py-1.5 text-xs font-medium text-palerose hover:border-gold hover:text-gold focus:ring-2 focus:ring-gold focus:outline-none"
                      >
                        View All {room.photos.length} Real Photos
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-2xl font-semibold text-palerose sm:text-3xl">
                          {room.name}
                        </h3>
                        <span className="text-xs tracking-wider text-rose uppercase">
                          {room.shortLabel}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-palerose/85">
                        {room.summary}
                      </p>

                      {/* AC vs Non-AC Tariff Comparison */}
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <div
                          className={`rounded-xl border p-3.5 transition-all ${
                            tariffHighlight === 'AC' || tariffHighlight === 'BOTH'
                              ? 'border-gold bg-obsidian/80'
                              : 'border-wine/40 bg-obsidian/40 opacity-70'
                          }`}
                        >
                          <span className="block text-[11px] tracking-wider text-rose uppercase">
                            AC Variant (24 Hrs)
                          </span>
                          <span className="font-serif text-2xl font-semibold text-gold sm:text-3xl">
                            ₹{room.acTariffINR.toLocaleString('en-IN')}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-palerose/75">
                            Per room • Includes GST
                          </span>
                        </div>

                        <div
                          className={`rounded-xl border p-3.5 transition-all ${
                            tariffHighlight === 'NON_AC' || tariffHighlight === 'BOTH'
                              ? 'border-rose bg-obsidian/80'
                              : 'border-wine/40 bg-obsidian/40 opacity-70'
                          }`}
                        >
                          <span className="block text-[11px] tracking-wider text-rose uppercase">
                            Non-AC Variant (24 Hrs)
                          </span>
                          <span className="font-serif text-2xl font-semibold text-palerose sm:text-3xl">
                            ₹{room.nonAcTariffINR.toLocaleString('en-IN')}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-palerose/75">
                            Per room • Includes GST
                          </span>
                        </div>
                      </div>

                      {/* Thumbnail Strip */}
                      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                        {room.photos.map((photo, idx) => (
                          <button
                            key={photo.src}
                            type="button"
                            onClick={() => setActiveRoomModal({ room, index: idx })}
                            className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-wine hover:border-gold focus:ring-2 focus:ring-gold focus:outline-none"
                            aria-label={`View ${room.name} photo ${idx + 1}: ${photo.caption}`}
                          >
                            <Image
                              src={photo.webp || photo.src}
                              alt={photo.alt}
                              width={160}
                              height={112}
                              sizes="80px"
                              className="h-full w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 border-t border-wine/40 px-6 pt-2 pb-6">
                    <a
                      href={`${RESORT_CONFIG.contact.whatsappHref}?text=${encodeURIComponent(
                        room.whatsappPrefill,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-full border border-rose/50 bg-wine px-4 py-2.5 text-center text-xs font-semibold tracking-wider text-palerose uppercase transition-colors hover:bg-rose hover:text-obsidian focus:ring-2 focus:ring-gold focus:outline-none"
                    >
                      WhatsApp Enquiry
                    </a>
                    <a
                      href={RESORT_CONFIG.contact.telHref}
                      className="flex-1 rounded-full border border-gold/70 bg-obsidian px-4 py-2.5 text-center text-xs font-semibold tracking-wider text-palerose uppercase transition-colors hover:bg-wine/40 focus:ring-2 focus:ring-gold focus:outline-none"
                    >
                      Call +91 79815 83940
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Summary Table */}
            <div className="mt-12 overflow-x-auto rounded-2xl border border-wine/70 bg-obsidian/90">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-wine bg-wine/30 text-xs tracking-wider text-rose uppercase">
                    <th className="px-4 py-3.5">Room Category</th>
                    <th className="px-4 py-3.5">Guest Capacity</th>
                    <th className="px-4 py-3.5">Total Category Rooms</th>
                    <th className="px-4 py-3.5 text-right">AC Tariff (24 Hrs, Incl. GST)</th>
                    <th className="px-4 py-3.5 text-right">Non-AC Tariff (24 Hrs, Incl. GST)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-wine/40">
                  {ROOM_CATEGORIES.map((r) => (
                    <tr key={r.id} className="hover:bg-wine/10">
                      <td className="px-4 py-3.5 font-medium text-palerose">{r.name}</td>
                      <td className="px-4 py-3.5 text-palerose/85">{r.occupancyGuests} guests</td>
                      <td className="px-4 py-3.5 text-palerose/85">{r.totalRooms} rooms</td>
                      <td className="px-4 py-3.5 text-right font-semibold text-gold">
                        ₹{r.acTariffINR.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold text-palerose">
                        ₹{r.nonAcTariffINR.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-wine/25 font-semibold text-palerose">
                    <td className="px-4 py-3.5">Resort Total</td>
                    <td className="px-4 py-3.5">68 guests combined</td>
                    <td className="px-4 py-3.5">23 rooms</td>
                    <td className="px-4 py-3.5 text-right text-xs text-rose" colSpan={2}>
                      Check-in 11:00 AM • Check-out 11:00 AM following day
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 04. EXPERIENCES & FACILITIES */}
        <section id="experiences" className="border-b border-wine/40 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              03 • Confirmed Amenities &amp; On-Site Experiences
            </p>
            <h2 className="mt-2 font-serif text-3xl text-palerose sm:text-5xl">
              24-Hour Pools, Rain Dance, Pure Veg Dining &amp; Lawn Sports
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-palerose/85 sm:text-base">
              Every facility listed below reflects confirmed on-site offerings at Samisthi Aranya
              Resorts.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CONFIRMED_FACILITIES.map((fac) => (
                <article
                  key={fac.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-wine/70 bg-wine/15 transition-all duration-500 hover:-translate-y-1 hover:border-gold/70"
                >
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-obsidian">
                      {fac.image ? (
                        <Image
                          src={fac.image.replace(/\.jpg$/i, '.webp')}
                          alt={`${fac.title} at Samisthi Aranya Resorts`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="facility-visual absolute inset-0 flex flex-col justify-between p-6">
                          <span className="text-[10px] tracking-[0.32em] text-gold/90 uppercase">
                            Samisthi · On-site
                          </span>
                          <div>
                            <div className="mb-3 h-px w-16 bg-gold/80" />
                            <p className="font-serif text-3xl leading-tight text-palerose">
                              {fac.visualLabel || fac.title}
                            </p>
                            <p className="mt-2 max-w-xs text-xs leading-relaxed text-palerose/65">
                              An on-site experience for a more memorable stay.
                            </p>
                          </div>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 rounded-full border border-gold/60 bg-obsidian/90 px-3 py-1 text-[11px] font-medium text-gold">
                        {fac.badge}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-semibold text-palerose">
                        {fac.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-palerose/85">
                        {fac.description}
                      </p>
                      <p className="mt-3 border-t border-wine/50 pt-3 text-xs leading-relaxed text-rose/95">
                        {fac.details}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 05. DEDICATED VISUAL GALLERY */}
        <section id="gallery" className="border-b border-wine/40 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs tracking-[0.25em] text-gold uppercase">
                  04 • Authentic Property Photography
                </p>
                <h2 className="mt-2 font-serif text-3xl text-palerose sm:text-5xl">
                  Visual Gallery ({GALLERY_ITEMS.length} Resort Photographs)
                </h2>
                <p className="mt-2 text-sm text-palerose/85 sm:text-base">
                  Every image is an authentic photograph of Samisthi Aranya Resorts — zero generic
                  stock imagery.
                </p>
              </div>

              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Gallery category filters"
              >
                {[
                  ['all', `All (${GALLERY_ITEMS.length})`],
                  ['lawns-exterior', 'Lawns & Exterior'],
                  ['pool', 'Swimming Pool'],
                  ['rooms-2p', '2-Person Rooms'],
                  ['rooms-4p', '4-Person Rooms'],
                  ['rooms-6p-suite', '6-Person & Suites'],
                  ['balconies-corridors', 'Balconies & Corridors'],
                  ['events', 'Events & Gatherings'],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setGalleryFilter(key)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus:ring-2 focus:ring-gold focus:outline-none ${
                      galleryFilter === key
                        ? 'border-gold bg-gold font-semibold text-obsidian'
                        : 'border-wine bg-wine/20 text-palerose hover:border-rose'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredGallery.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxItem(item)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-wine/60 bg-wine/10 text-left transition-all duration-500 hover:-translate-y-1 hover:border-gold focus:ring-2 focus:ring-gold focus:outline-none"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-obsidian">
                    <Image
                      src={item.webp || item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 rounded-full border border-wine bg-obsidian/85 px-2.5 py-0.5 text-[10px] tracking-wider text-rose uppercase">
                      {item.groupLabel}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-2 text-xs text-palerose/90">{item.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 06. EVENTS & FULL-RESORT EXCLUSIVE BOOKING */}
        <section id="events" className="border-b border-wine/40 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-gold/60 bg-wine/20 p-6 sm:p-12">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="space-y-5 lg:col-span-7">
                  <span className="inline-block rounded-full border border-gold bg-obsidian/80 px-3.5 py-1 text-xs tracking-widest text-gold uppercase">
                    05 • Celebrations, Retreats &amp; Full-Resort Hire
                  </span>
                  <h2 className="font-serif text-3xl text-palerose sm:text-5xl">
                    Exclusive Whole-Resort Booking &amp; Private Gatherings
                  </h2>
                  <p className="text-sm leading-relaxed text-palerose/85 sm:text-base">
                    Host unforgettable family gatherings, milestone birthdays, weddings, corporate
                    offsites, and team outings across our central courtyard lawns, conference hall,
                    and all 23 guest rooms (accommodating up to 68 guests).
                  </p>
                  <div className="rounded-2xl border border-gold/50 bg-obsidian/80 p-5">
                    <p className="text-xs tracking-wider text-rose uppercase">
                      Indicative Whole-Resort Exclusive Buyout Range
                    </p>
                    <p className="mt-1 font-serif text-3xl font-semibold text-gold sm:text-4xl">
                      {RESORT_CONFIG.wholeResortBooking.priceRangeDisplay}
                    </p>
                    <p className="mt-1 text-xs text-palerose/80">
                      {RESORT_CONFIG.wholeResortBooking.pricingTypeLabel}. Final quotation is
                      tailored to your event date, duration, and guest count.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {RESORT_CONFIG.wholeResortBooking.supportedEvents.map((ev) => (
                      <span
                        key={ev}
                        className="rounded-full border border-wine bg-obsidian/70 px-3.5 py-1 text-xs text-palerose"
                      >
                        {ev}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={`${RESORT_CONFIG.contact.whatsappHref}?text=${encodeURIComponent(
                        'Hello Samisthi Aranya Resorts, I would like to request a custom quote for an event / full-resort exclusive booking.',
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-gold px-6 py-3 text-xs font-semibold tracking-wider text-obsidian uppercase transition-colors hover:bg-rose"
                    >
                      Request Event Quote on WhatsApp
                    </a>
                    <a
                      href={RESORT_CONFIG.contact.telHref}
                      className="rounded-full border border-palerose/60 bg-obsidian px-6 py-3 text-xs font-semibold tracking-wider text-palerose uppercase hover:border-gold"
                    >
                      Call the Resort
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:col-span-5">
                  <figure className="overflow-hidden rounded-2xl border border-wine bg-obsidian">
                    <Image
                      src="/images/resort/IMG-20261107-WA0050.webp"
                      alt="A colourful balloon decoration prepared for a celebration at Samisthi Aranya Resorts"
                      width={900}
                      height={1200}
                      sizes="(max-width: 1024px) 50vw, 22vw"
                      className="h-72 w-full object-cover"
                    />
                    <figcaption className="p-2.5 text-xs text-rose">
                      Celebration decoration in the courtyard
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-2xl border border-wine bg-obsidian">
                    <Image
                      src="/images/resort/IMG-20261107-WA0049.webp"
                      alt="Guests gathered for a group activity in the resort courtyard"
                      width={900}
                      height={1200}
                      sizes="(max-width: 1024px) 50vw, 22vw"
                      className="h-72 w-full object-cover"
                    />
                    <figcaption className="p-2.5 text-xs text-rose">
                      Family and group gathering in the courtyard
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 07. EXPLORE NEARBY */}
        <section id="nearby" className="border-b border-wine/40 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              06 • Local Discovery &amp; Sightseeing
            </p>
            <h2 className="mt-2 font-serif text-3xl text-palerose sm:text-5xl">
              Explore Nearby — Srisailam Dam View Point &amp; Nallamala Destinations
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-palerose/85 sm:text-base">
              Open each Google Maps pin for current directions and route information from Samisthi
              Aranya Resorts.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {NEARBY_DESTINATIONS.map((dest) => (
                <article
                  key={dest.id}
                  className={`flex flex-col justify-between rounded-2xl border p-6 ${
                    dest.isPrimaryHighlight
                      ? 'border-gold bg-wine/25 lg:col-span-12'
                      : 'border-wine/70 bg-wine/15 lg:col-span-4'
                  }`}
                >
                  <div>
                    <span className="inline-block rounded-full border border-gold/60 bg-obsidian/80 px-3 py-1 text-xs font-medium text-gold">
                      {dest.badge}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl font-semibold text-palerose sm:text-3xl">
                      {dest.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-palerose/85">
                      {dest.description}
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-wine/50 pt-4">
                    <span className="text-xs text-rose">{dest.verificationNote}</span>
                    <a
                      href={dest.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold tracking-wider text-obsidian uppercase transition-colors hover:bg-rose"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 08. GUEST REVIEWS (VERIFIED GOOGLE REVIEWS INTEGRATION PLACEHOLDER) */}
        <section id="reviews" className="border-b border-wine/40 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-xs tracking-[0.25em] text-gold uppercase">07 • Guest Feedback</p>
            <h2 className="mt-2 font-serif text-3xl text-palerose sm:text-5xl">
              Guest Feedback & Google Reviews
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-palerose/85 sm:text-base">
              We believe in transparent, genuine guest feedback. No unverified testimonials or
              synthetic star ratings are displayed here.
            </p>
            <div className="mt-8 rounded-2xl border border-wine bg-wine/15 p-8">
              <p className="font-serif text-xl text-palerose">
                Visiting Samisthi Aranya Resorts along the Mannanur – Srisailam Highway?
              </p>
              <p className="mx-auto mt-2 max-w-xl text-sm text-palerose/80">
                Read guest feedback on our Google Maps listing. Once the direct review link is
                added, guests can also leave a review from here.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a
                  href={RESORT_CONFIG.maps.resortDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gold bg-obsidian px-6 py-2.5 text-xs font-semibold tracking-wider text-gold uppercase transition-colors hover:bg-gold hover:text-obsidian"
                >
                  Read Google Reviews on Maps
                </a>
                {RESORT_CONFIG.pendingOwnerConfig.googleReviewUrl && (
                  <a
                    href={RESORT_CONFIG.pendingOwnerConfig.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gold px-6 py-2.5 text-xs font-semibold tracking-wider text-obsidian uppercase transition-colors hover:bg-rose"
                  >
                    Write a Google Review
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 09. FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="border-b border-wine/40 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs tracking-[0.25em] text-gold uppercase">
              08 • Essential Stay Information
            </p>
            <h2 className="mt-2 text-center font-serif text-3xl text-palerose sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 space-y-3">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-wine/70 bg-wine/15"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                      className="flex w-full items-center justify-between px-6 py-4 text-left font-serif text-lg text-palerose hover:text-gold focus:ring-2 focus:ring-gold focus:outline-none sm:text-xl"
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      <span className="ml-4 text-xl text-gold">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-wine/40 px-6 pt-3 pb-5 text-sm leading-relaxed text-palerose/85">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. CONTACT / PLAN YOUR ESCAPE */}
        <section id="contact" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-6">
                <p className="text-xs tracking-[0.25em] text-gold uppercase">
                  09 • Plan Your Escape
                </p>
                <h2 className="font-serif text-3xl text-palerose sm:text-5xl">
                  Direct Enquiry &amp; Resort Directions
                </h2>
                <p className="text-sm leading-relaxed text-palerose/85 sm:text-base">
                  {RESORT_CONFIG.stayPolicy.bookingProcessNote}
                </p>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-gold/60 bg-wine/20 p-5">
                    <p className="text-xs tracking-wider text-rose uppercase">
                      Direct Phone &amp; WhatsApp Desk
                    </p>
                    <p className="mt-1 font-serif text-3xl font-semibold text-palerose">
                      {RESORT_CONFIG.contact.phoneDisplay}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={RESORT_CONFIG.contact.telHref}
                        className="rounded-full bg-gold px-6 py-2.5 text-xs font-semibold tracking-wider text-obsidian uppercase transition-colors hover:bg-rose"
                      >
                        Call Now
                      </a>
                      <a
                        href={`${RESORT_CONFIG.contact.whatsappHref}?text=${encodeURIComponent(RESORT_CONFIG.contact.whatsappDefaultText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-rose bg-wine px-6 py-2.5 text-xs font-semibold tracking-wider text-palerose uppercase transition-colors hover:bg-rose hover:text-obsidian"
                      >
                        WhatsApp Direct
                      </a>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-wine/70 bg-wine/15 p-5">
                    <p className="text-xs tracking-wider text-rose uppercase">
                      Resort Location &amp; Route Navigation
                    </p>
                    <p className="mt-1 text-base font-medium text-palerose">
                      {RESORT_CONFIG.verifiedLocalityLabel}
                    </p>
                    <p className="mt-1 text-xs text-palerose/75">
                      Check-in: {RESORT_CONFIG.stayPolicy.checkIn} • Check-out:{' '}
                      {RESORT_CONFIG.stayPolicy.checkOut}
                    </p>
                    <a
                      href={RESORT_CONFIG.maps.resortDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2 text-xs font-semibold tracking-wider text-gold uppercase transition-colors hover:bg-gold hover:text-obsidian"
                    >
                      Open Resort Directions in Google Maps →
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-wine bg-wine/15 p-6 sm:p-8 lg:col-span-6">
                <div>
                  <p className="text-xs tracking-[0.25em] text-gold uppercase">
                    A simple, personal booking process
                  </p>
                  <h3 className="mt-3 font-serif text-3xl text-palerose sm:text-4xl">
                    Talk directly with the resort team.
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-palerose/80">
                    No online booking form and no online payment. Call or message the resort to
                    discuss your dates, check current room availability and confirm the details
                    directly with the team.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <a
                    href={RESORT_CONFIG.contact.telHref}
                    className="rounded-full bg-gold px-6 py-3 text-center text-xs font-semibold tracking-[0.16em] text-obsidian uppercase transition-colors hover:bg-rose"
                  >
                    Call the Resort
                  </a>
                  <a
                    href={`${RESORT_CONFIG.contact.whatsappHref}?text=${encodeURIComponent(RESORT_CONFIG.contact.whatsappDefaultText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-rose bg-obsidian px-6 py-3 text-center text-xs font-semibold tracking-[0.16em] text-palerose uppercase transition-colors hover:border-gold hover:text-gold"
                  >
                    WhatsApp the Resort
                  </a>
                </div>
                <p className="mt-6 border-t border-wine/60 pt-4 text-xs text-palerose/65">
                  Room rates shown on this website are per room for a 24-hour stay. Food is charged
                  separately; swimming pool and rain dance access are included in the room tariff.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-wine/60 bg-obsidian py-12 text-xs text-palerose/75">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <ObsidianLogo compact />
            <span className="hidden text-palerose/60 md:inline">|</span>
            <span className="hidden font-serif text-sm text-rose italic md:inline">
              Where Nature Meets Luxury.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={RESORT_CONFIG.maps.resortDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              Google Maps Directions
            </a>
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="underline hover:text-gold"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="underline hover:text-gold"
            >
              Terms &amp; Stay Conditions
            </button>
            <span>© {new Date().getFullYear()} Samisthi Aranya Resorts</span>
          </div>
        </div>
      </footer>

      {/* Back to Top Control */}
      {compactNav && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed right-5 bottom-5 z-30 rounded-full border border-gold/70 bg-obsidian/90 px-3.5 py-2 text-xs font-medium text-palerose hover:bg-wine focus:ring-2 focus:ring-gold focus:outline-none"
          aria-label="Back to top"
        >
          ↑ Top
        </button>
      )}

      {/* Room Gallery Modal */}
      {activeRoomModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeRoomModal.room.name} Gallery`}
        >
          <div className="w-full max-w-4xl rounded-2xl border border-gold/60 bg-obsidian p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-wine pb-3">
              <div>
                <h3 className="font-serif text-2xl text-palerose">
                  {activeRoomModal.room.name} ({activeRoomModal.index + 1} /{' '}
                  {activeRoomModal.room.photos.length})
                </h3>
                <p className="text-xs text-rose">
                  {activeRoomModal.room.photos[activeRoomModal.index].caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRoomModal(null)}
                className="rounded-full border border-wine px-3 py-1 text-xs text-palerose hover:border-gold"
              >
                Close ✕
              </button>
            </div>
            <div className="relative my-4 h-[62vh] w-full overflow-hidden rounded-xl bg-obsidian">
              <Image
                src={
                  activeRoomModal.room.photos[activeRoomModal.index].webp ||
                  activeRoomModal.room.photos[activeRoomModal.index].src
                }
                alt={activeRoomModal.room.photos[activeRoomModal.index].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  setActiveRoomModal((prev) =>
                    prev
                      ? {
                          ...prev,
                          index:
                            (prev.index - 1 + prev.room.photos.length) % prev.room.photos.length,
                        }
                      : null,
                  )
                }
                className="rounded-full border border-wine px-4 py-1.5 text-xs text-palerose hover:border-gold"
              >
                ← Previous Photo
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveRoomModal((prev) =>
                    prev
                      ? {
                          ...prev,
                          index: (prev.index + 1) % prev.room.photos.length,
                        }
                      : null,
                  )
                }
                className="rounded-full border border-wine px-4 py-1.5 text-xs text-palerose hover:border-gold"
              >
                Next Photo →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.caption}
        >
          <div className="w-full max-w-4xl rounded-2xl border border-gold/60 bg-obsidian p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-wine pb-3">
              <div>
                <span className="text-[11px] tracking-wider text-gold uppercase">
                  {lightboxItem.groupLabel}
                </span>
                <h3 className="font-serif text-xl text-palerose">{lightboxItem.caption}</h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="rounded-full border border-wine px-3 py-1 text-xs text-palerose hover:border-gold"
              >
                Close ✕
              </button>
            </div>
            <div className="relative mt-4 h-[68vh] w-full overflow-hidden rounded-xl bg-obsidian">
              <Image
                src={lightboxItem.webp || lightboxItem.src}
                alt={lightboxItem.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Privacy & Terms Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={legalModal === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'}
        >
          <div className="w-full max-w-xl space-y-4 rounded-2xl border border-gold/60 bg-obsidian p-6">
            <div className="flex items-center justify-between border-b border-wine pb-3">
              <h3 className="font-serif text-2xl text-palerose">
                {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Stay Conditions'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="rounded-full border border-wine px-3 py-1 text-xs text-palerose hover:border-gold"
              >
                Close ✕
              </button>
            </div>
            {legalModal === 'privacy' ? (
              <div className="space-y-3 text-xs leading-relaxed text-palerose/85 sm:text-sm">
                <p>
                  Samisthi Aranya Resorts operates this website as a direct information and enquiry
                  showcase. We do not run advertising pixels, tracking cookies, or automated lead
                  databases on this site.
                </p>
                <p>
                  When you click Call Now or WhatsApp Enquiry, you communicate directly with our
                  resort desk (+91 79815 83940) to check room availability or arrange an event
                  quote.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs leading-relaxed text-palerose/85 sm:text-sm">
                <p>
                  • Published room tariffs are per room for a 24-hour stay (11:00 AM check-in to
                  11:00 AM check-out the next day) and include GST.
                </p>
                <p>
                  • All reservations and final room allocations are confirmed directly by the resort
                  team over phone or WhatsApp.
                </p>
                <p>
                  • Our on-site restaurant serves pure vegetarian food only; meals are charged
                  separately from room tariffs. Campfire arrangements are available on prior request
                  for special occasions.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
