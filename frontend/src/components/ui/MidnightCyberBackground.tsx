import React, { useMemo } from 'react';
import { MidnightLogo } from './MidnightLogo';

interface MidnightCyberBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const MidnightCyberBackground: React.FC<MidnightCyberBackgroundProps> = ({
  children,
  className = '',
}) => {
  // Generate random static particle coordinates once
  const particles = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      x: (i * 17 + 7) % 100,
      y: (i * 23 + 13) % 100,
      size: (i % 3) + 1.5,
      delay: (i * 0.3) % 4,
      duration: 3 + (i % 4),
      color: i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#38bdf8' : '#818cf8',
    }));
  }, []);

  return (
    <div className={`relative w-full min-h-screen overflow-hidden bg-[#060913] text-slate-100 ${className}`}>
      {/* 1. Cybernetic Grid Plane with Horizon Fade */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 85%)',
        }}
      />

      {/* 2. Floating Zero-Knowledge Cryptographic Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* 3. Official Midnight Network Clock Portal Watermark (Subtle Background Presence) */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] select-none">
        <MidnightLogo size={720} glow={false} />
      </div>

      {/* 4. Multi-Layer Dynamic Breathing Nebula Auroras */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Midnight Blue Core Orb */}
        <div
          className="absolute -top-[15%] left-[20%] h-[600px] w-[600px] rounded-full opacity-35 blur-[160px] filter animate-orb-breathe"
          style={{ background: 'radial-gradient(circle, #0000fe 0%, #0369a1 60%, transparent 100%)' }}
        />

        {/* Neon Cyan Glow */}
        <div
          className="absolute top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full opacity-25 blur-[140px] filter animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #00f0ff 0%, #0284c7 70%, transparent 100%)' }}
        />

        {/* Deep Violet Indigo Accent */}
        <div
          className="absolute top-[30%] -right-[10%] h-[550px] w-[550px] rounded-full opacity-25 blur-[150px] filter animate-orb-breathe"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, #4338ca 70%, transparent 100%)' }}
        />

        {/* Verification Emerald Ambient Underglow */}
        <div
          className="absolute -bottom-[10%] left-[30%] h-[400px] w-[500px] rounded-full opacity-15 blur-[130px] filter"
          style={{ background: 'radial-gradient(circle, #10b981 0%, #065f46 70%, transparent 100%)' }}
        />
      </div>

      {/* 5. Main Content Wrapper */}
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
};
