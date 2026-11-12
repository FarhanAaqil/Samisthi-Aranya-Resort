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
 * Current conditions at the resort. Loaded after the page is interactive so it can never hold
 * up the hero. It shows nothing at all if the service can’t be reached.
 */
export function Weather() {
  const [state, setState] = useState<WeatherState>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6000);
    const { latitude, longitude } = RESORT.coordinates;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=Asia%2FKolkata`;

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

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  // The wrapper keeps its height while loading so the hero doesn't shift.
  return (
    <div className="min-h-10" aria-live="polite">
      {state.status === 'ready' && (
        <p className="inline-flex items-center gap-2.5 rounded-full border border-wine/20 bg-petal/80 py-2 pr-4 pl-3 text-sm text-ink-soft">
          <CloudSun className="size-4 text-gold" aria-hidden="true" />
          <span>
            Right now at the resort:{' '}
            <strong className="font-semibold text-wine">{state.temperature}°C</strong>,{' '}
            {state.condition.toLowerCase()}
          </span>
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs whitespace-nowrap text-ink-soft underline decoration-wine/30 underline-offset-2 hover:text-wine"
          >
            Open-Meteo
          </a>
        </p>
      )}
    </div>
  );
}
