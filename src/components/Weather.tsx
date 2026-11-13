'use client';

import { CloudSun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { RESORT } from '@/data/resort';

type WeatherState =
  | { status: 'loading' }
  | { status: 'ready'; temperature: number; condition: string }
  | { status: 'unavailable' };

/** Plain-language label for an Open-Meteo (WMO) weather code. */
function describe(code: number): string {
  if (code === 0) return 'Clear sky';
  if (code <= 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Misty';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Mixed conditions';
}

/**
 * Current conditions at the resort. Loaded once the browser is idle so it never competes with the
 * hero image, and it shows nothing if the service is down.
 */
export function Weather() {
  const [state, setState] = useState<WeatherState>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    const { latitude, longitude } = RESORT.coordinates;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=Asia%2FKolkata`;

    const load = () => {
      const timeout = window.setTimeout(() => controller.abort(), 6000);
      fetch(url, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
          return response.json() as Promise<{
            current?: { temperature_2m?: number; weather_code?: number };
          }>;
        })
        .then(({ current }) => {
          if (typeof current?.temperature_2m !== 'number') {
            setState({ status: 'unavailable' });
            return;
          }
          setState({
            status: 'ready',
            temperature: Math.round(current.temperature_2m),
            condition: describe(current.weather_code ?? -1),
          });
        })
        .catch(() => setState({ status: 'unavailable' }))
        .finally(() => window.clearTimeout(timeout));
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 3000 })
      : window.setTimeout(load, 1500);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-6 text-sm text-cream-soft" aria-live="polite">
      {state.status === 'ready' && (
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <CloudSun className="size-4 text-brass" aria-hidden="true" />
          <span>
            At the resort now:{' '}
            <strong className="font-normal text-cream">{state.temperature}°C</strong>,{' '}
            {state.condition.toLowerCase()}
          </span>
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cream-soft underline decoration-brass/60 underline-offset-2 hover:text-cream"
          >
            Open-Meteo
          </a>
        </p>
      )}
    </div>
  );
}
