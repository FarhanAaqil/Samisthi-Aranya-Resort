'use client';

import React, { useEffect, useState } from 'react';
import { RESORT_CONFIG } from '@/data/resortData';

interface LiveWeatherState {
  status: 'loading' | 'ready' | 'unavailable';
  tempC?: number;
  windKmh?: number;
  conditionLabel?: string;
}

function decodeWmoCode(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code === 1 || code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Misty';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code === 71 || code === 73 || code === 75 || code === 77) return 'Snow';
  if (code === 80 || code === 81 || code === 82) return 'Rain Showers';
  if (code === 85 || code === 86) return 'Snow Showers';
  if (code === 95 || code === 96 || code === 99) return 'Thunderstorm';
  return 'Current conditions';
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<LiveWeatherState>({ status: 'loading' });

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6500);
    const { latitude, longitude } = RESORT_CONFIG.coordinates;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FKolkata`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Weather response not ok');
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        const current = data?.current;
        if (current && typeof current.temperature_2m === 'number') {
          setWeather({
            status: 'ready',
            tempC: Math.round(current.temperature_2m),
            windKmh:
              typeof current.wind_speed_10m === 'number'
                ? Math.round(current.wind_speed_10m)
                : undefined,
            conditionLabel: decodeWmoCode(Number(current.weather_code ?? 0)),
          });
        } else {
          setWeather({ status: 'unavailable' });
        }
      })
      .catch(() => {
        if (active) setWeather({ status: 'unavailable' });
      });

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <div
      className="inline-flex flex-wrap items-center gap-3 rounded-full border border-wine/70 bg-obsidian/85 px-4 py-2 text-xs text-palerose/90 backdrop-blur-md"
      aria-live="polite"
    >
      <span className="inline-block h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
      <span className="font-medium tracking-wide text-rose">Mannanur / Srisailam Corridor:</span>
      {weather.status === 'loading' && (
        <span className="text-palerose/75">Checking live local weather…</span>
      )}
      {weather.status === 'ready' && (
        <span>
          <strong className="text-palerose">{weather.tempC}°C</strong> • {weather.conditionLabel}
          {weather.windKmh !== undefined ? ` • Wind ${weather.windKmh} km/h` : ''}
        </span>
      )}
      {weather.status === 'unavailable' && (
        <span className="text-palerose/80">Live weather is temporarily unavailable</span>
      )}
      <a
        href="https://open-meteo.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded px-1 text-[11px] text-rose/80 underline decoration-wine hover:text-gold focus:ring-1 focus:ring-gold focus:outline-none"
      >
        Weather by Open-Meteo
      </a>
    </div>
  );
}
