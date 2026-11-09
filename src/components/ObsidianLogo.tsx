import React from 'react';

interface ObsidianLogoProps {
  className?: string;
  compact?: boolean;
}

export function ObsidianLogo({ className = '', compact = false }: ObsidianLogoProps) {
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <svg
          viewBox="0 0 120 100"
          className="h-9 w-auto shrink-0"
          fill="none"
          role="img"
          aria-label="Samisthi Aranya Resorts Emblem"
        >
          <defs>
            <linearGradient id="navSunGrad" x1="60" y1="12" x2="60" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C9A227" />
              <stop offset="65%" stopColor="#E79AB2" />
              <stop offset="100%" stopColor="#682E4E" />
            </linearGradient>
          </defs>
          <path d="M12 82 A48 48 0 0 1 108 82" stroke="#682E4E" strokeWidth="1.5" />
          <circle cx="66" cy="44" r="18" fill="url(#navSunGrad)" opacity="0.92" />
          <path d="M26 64 L56 42 L86 64" stroke="#C9A227" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="36" y="64" width="40" height="16" rx="1" fill="#120D0F" stroke="#C9A227" strokeWidth="1.4" />
          <rect x="43" y="68" width="7" height="7" fill="#C9A227" />
          <rect x="53" y="68" width="7" height="7" fill="#F6E7EC" />
          <path d="M8 82 Q40 74 60 80 T112 82" stroke="#C9A227" strokeWidth="1.8" fill="none" />
        </svg>
        <div className="flex flex-col text-left leading-none">
          <span className="font-serif text-lg tracking-[0.22em] text-palerose font-semibold">
            SAMISTHI
          </span>
          <span className="font-serif text-[10px] tracking-[0.28em] text-rose mt-0.5">
            ARANYA RESORTS
          </span>
        </div>
      </div>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 260"
      fill="none"
      role="img"
      aria-label="Samisthi Aranya Resorts — Where Nature Meets Luxury"
      className={className}
    >
      <defs>
        <linearGradient id="heroSunGrad" x1="320" y1="28" x2="320" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C9A227" />
          <stop offset="65%" stopColor="#E79AB2" />
          <stop offset="100%" stopColor="#682E4E" />
        </linearGradient>
        <linearGradient id="heroRoofGrad" x1="230" y1="74" x2="380" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#E79AB2" />
        </linearGradient>
        <linearGradient id="heroRuleGrad" x1="120" y1="0" x2="520" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#120D0F" stopOpacity="0" />
          <stop offset="22%" stopColor="#682E4E" />
          <stop offset="50%" stopColor="#C9A227" />
          <stop offset="78%" stopColor="#682E4E" />
          <stop offset="100%" stopColor="#120D0F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M196 138 A128 128 0 0 1 444 138" stroke="#682E4E" strokeWidth="1.2" strokeOpacity="0.65" />
      <path d="M206 138 A118 118 0 0 1 434 138" stroke="#C9A227" strokeWidth="0.75" strokeOpacity="0.45" />
      <circle cx="332" cy="78" r="32" fill="url(#heroSunGrad)" opacity="0.92" />
      <path d="M278 48 Q283 43 288 47 Q293 43 298 48" stroke="#F6E7EC" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M364 42 Q368 38 372 41 Q376 38 380 42" stroke="#E79AB2" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.85" />
      <g stroke="#C9A227" strokeLinecap="round" fill="none">
        <path d="M228 134 C229 116 232 102 230 84" strokeWidth="3.2" />
        <path d="M230 104 C218 96 210 92 202 90" strokeWidth="2.2" />
        <path d="M230 96 C240 88 248 83 256 80" strokeWidth="2.2" />
        <path d="M229 88 C222 79 216 74 210 72" strokeWidth="1.8" />
      </g>
      <ellipse cx="204" cy="86" rx="16" ry="7" fill="#682E4E" opacity="0.85" />
      <ellipse cx="226" cy="70" rx="22" ry="9" fill="#C9A227" opacity="0.88" />
      <ellipse cx="250" cy="77" rx="18" ry="7.5" fill="#E79AB2" opacity="0.82" />
      <g stroke="#C9A227" strokeLinecap="round" fill="none">
        <path d="M408 134 C406 118 404 105 406 88" strokeWidth="2.8" />
        <path d="M405 106 C395 99 389 94 383 92" strokeWidth="2" />
        <path d="M406 98 C415 91 422 87 429 85" strokeWidth="2" />
      </g>
      <ellipse cx="386" cy="88" rx="15" ry="6.5" fill="#E79AB2" opacity="0.82" />
      <ellipse cx="408" cy="76" rx="20" ry="8" fill="#C9A227" opacity="0.88" />
      <ellipse cx="428" cy="83" rx="15" ry="6.5" fill="#682E4E" opacity="0.85" />
      <path d="M248 108 L306 76 L364 108" stroke="url(#heroRoofGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M262 108 L306 84 L350 108 Z" fill="#682E4E" fillOpacity="0.55" />
      <rect x="266" y="108" width="80" height="26" rx="1.5" fill="#120D0F" stroke="#C9A227" strokeWidth="1.6" />
      <rect x="278" y="114" width="11" height="11" rx="1" fill="#C9A227" />
      <rect x="293" y="114" width="11" height="11" rx="1" fill="#F6E7EC" fillOpacity="0.9" />
      <rect x="318" y="113" width="16" height="21" rx="1" fill="#682E4E" stroke="#E79AB2" strokeWidth="1.1" />
      <path d="M168 138 Q248 126 320 136 T472 138" stroke="url(#heroRuleGrad)" strokeWidth="2.2" fill="none" />
      <text x="320" y="184" textAnchor="middle" fill="#F6E7EC" fontFamily="Georgia, serif" fontSize="34" fontWeight="600" letterSpacing="10">
        SAMISTHI
      </text>
      <line x1="150" y1="205" x2="212" y2="205" stroke="#C9A227" strokeWidth="1" strokeOpacity="0.7" />
      <text x="320" y="210" textAnchor="middle" fill="#E79AB2" fontFamily="Georgia, serif" fontSize="13.5" fontWeight="400" letterSpacing="7.5">
        ARANYA RESORTS
      </text>
      <line x1="428" y1="205" x2="490" y2="205" stroke="#C9A227" strokeWidth="1" strokeOpacity="0.7" />
      <path d="M320 228 C313 221 306 221 304 226 C306 231 313 231 320 228 Z" fill="#C9A227" />
      <path d="M320 228 C327 221 334 221 336 226 C334 231 327 231 320 228 Z" fill="#E79AB2" />
      <circle cx="320" cy="228" r="2" fill="#F6E7EC" />
    </svg>
  );
}
