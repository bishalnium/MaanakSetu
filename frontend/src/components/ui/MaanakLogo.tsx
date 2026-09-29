import React from 'react';

interface MaanakLogoProps {
  className?: string;
  size?: number;
}

export const MaanakLogo: React.FC<MaanakLogoProps> = ({ className = '', size = 38 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
    >
      <defs>
        <linearGradient id="maanakGradient" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="0.6" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#00F0FF" />
        </linearGradient>
        <linearGradient id="glowGradient" x1="16" y1="16" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00F0FF" />
          <stop offset="1" stopColor="#34D399" />
        </linearGradient>
      </defs>

      {/* Modern Minimalist Rounded Container */}
      <rect
        width="40"
        height="40"
        rx="10"
        fill="#0B1222"
        stroke="rgba(99, 102, 241, 0.35)"
        strokeWidth="1.5"
      />

      {/* Iconic Geometric Bridge / M Monogram */}
      {/* Left Pillar to Arch */}
      <path
        d="M11 28V15C11 12.2386 13.2386 10 16 10C18.7614 10 20 12.5 20 15V26"
        stroke="url(#maanakGradient)"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Pillar to Arch */}
      <path
        d="M29 28V15C29 12.2386 26.7614 10 24 10C21.2386 10 20 12.5 20 15V26"
        stroke="url(#maanakGradient)"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Zero-Knowledge Bridge Foundation Beam */}
      <path
        d="M10 28H30"
        stroke="url(#maanakGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Central Privacy Nexus Core Node */}
      <circle
        cx="20"
        cy="15"
        r="2.5"
        fill="url(#glowGradient)"
      />
    </svg>
  );
};
