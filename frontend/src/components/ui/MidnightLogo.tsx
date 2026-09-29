import React from 'react';

interface MidnightLogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const MidnightLogo: React.FC<MidnightLogoProps> = ({
  className = '',
  size = 32,
  glow = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <defs>
        <radialGradient id="midnightCore" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0000FE" />
          <stop offset="0.6" stopColor="#00F0FF" />
          <stop offset="1" stopColor="#0B1222" />
        </radialGradient>
        <filter id="midnightGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Dial Ring (The Midnight Portal) */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="#1E293B"
        strokeWidth="3"
        fill="#070A12"
      />
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="url(#midnightCore)"
        strokeWidth="2"
        strokeDasharray="4 6"
        className="opacity-70"
      />

      {/* Clock Hands Pointing to 12:00 (Midnight) */}
      {/* Hour Hand */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="28"
        stroke="#38BDF8"
        strokeWidth="4"
        strokeLinecap="round"
        filter={glow ? 'url(#midnightGlow)' : undefined}
      />
      {/* Minute Hand pointing straight to Midnight (12 o'clock) */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="14"
        stroke="#00F0FF"
        strokeWidth="3.5"
        strokeLinecap="round"
        filter={glow ? 'url(#midnightGlow)' : undefined}
      />

      {/* Center Pivot Core */}
      <circle cx="50" cy="50" r="6" fill="#0000FE" stroke="#00F0FF" strokeWidth="2" />
      <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />

      {/* Official 3-Dot Motif (Freedom of Association, Commerce, Expression) */}
      <g filter={glow ? 'url(#midnightGlow)' : undefined}>
        {/* Dot 1: Top Right */}
        <circle cx="68" cy="36" r="3.5" fill="#00F0FF" />
        {/* Dot 2: Right */}
        <circle cx="76" cy="50" r="3.5" fill="#38BDF8" />
        {/* Dot 3: Bottom Right */}
        <circle cx="68" cy="64" r="3.5" fill="#6366F1" />
      </g>

      {/* Subtle Dial Markers */}
      <circle cx="50" cy="12" r="2" fill="#FFFFFF" />
      <circle cx="88" cy="50" r="1.5" fill="#64748B" />
      <circle cx="50" cy="88" r="1.5" fill="#64748B" />
      <circle cx="12" cy="50" r="1.5" fill="#64748B" />
    </svg>
  );
};
