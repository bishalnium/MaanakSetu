import React from 'react';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative w-full overflow-hidden bg-midnight-950 ${className}`}>
      {/* Dynamic Animated Ambient Aurora Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-Left Cyan Glow */}
        <div
          className="absolute -top-[20%] -left-[10%] h-[550px] w-[550px] rounded-full opacity-30 blur-[130px] filter animate-orb-breathe"
          style={{ background: 'radial-gradient(circle, #00f0ff 0%, #0284c7 70%, transparent 100%)' }}
        />

        {/* Center-Top Indigo Aurora Wave */}
        <div
          className="absolute top-[10%] left-[30%] h-[600px] w-[700px] rounded-full opacity-25 blur-[150px] filter animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, #4338ca 60%, transparent 100%)' }}
        />

        {/* Right Neon Violet Glow */}
        <div
          className="absolute top-[25%] -right-[15%] h-[500px] w-[550px] rounded-full opacity-20 blur-[140px] filter animate-orb-breathe"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, #7e22ce 60%, transparent 100%)' }}
        />

        {/* Bottom Emerald Subtle Verification Tone */}
        <div
          className="absolute -bottom-[15%] left-[20%] h-[400px] w-[600px] rounded-full opacity-15 blur-[120px] filter"
          style={{ background: 'radial-gradient(circle, #10b981 0%, #059669 60%, transparent 100%)' }}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
