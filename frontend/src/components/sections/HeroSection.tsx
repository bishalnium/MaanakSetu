import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Lock, Eye, EyeOff, Zap, CheckCircle2 } from 'lucide-react';
import { SplitText } from '../ui/SplitText';
import { BlurText } from '../ui/BlurText';
import { ShinyText } from '../ui/ShinyText';
import { CountUp } from '../ui/CountUp';
import { TiltCard } from '../ui/TiltCard';
import { DecryptedText } from '../ui/DecryptedText';

interface HeroSectionProps {
  onNavigate?: (pageId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'shielded' | 'public'>('shielded');

  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:pt-8 sm:pb-14">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Fade-In Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 mb-6 overflow-hidden backdrop-blur-md animate-fade-in shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-cyan-neon animate-pulse flex-shrink-0" />
              <span className="text-xs font-semibold tracking-wide text-slate-200">
                Zero-Knowledge Business Credentials on Midnight Network
              </span>
            </div>

            {/* Main Headline with SplitText Animation */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              <SplitText
                text="Prove Qualification. Protect Evidence."
                highlightWords={['Qualification.', 'Evidence.']}
                delay={0.02}
              />
            </h1>

            {/* Subhead with BlurText */}
            <div className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
              <BlurText
                text="MaanakSetu replaces intrusive document auditing with mathematical certainty. Suppliers prove turnover, ISO standards, and certifications without repeatedly exposing confidential financial records."
                delay={0.04}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={() => onNavigate ? onNavigate('pipeline') : document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-cyan-500/30 hover:brightness-110 active:scale-95 transition-all duration-200"
              >
                <Zap className="h-4 w-4 text-cyan-neon" />
                <span>Launch ZK Prover</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigate ? onNavigate('passport') : document.getElementById('passport')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-midnight-900/90 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:border-indigo-500/40 hover:bg-midnight-850 hover:text-white active:scale-95 transition-all duration-200"
              >
                <ShieldCheck className="h-4 w-4 text-indigo-400" />
                <span>Inspect Passport</span>
              </button>
            </div>

            {/* Live Telemetry Banner (CountUp) */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  <CountUp to={8950} duration={2200} suffix="+" />
                </div>
                <div className="text-xs text-slate-400 font-medium">ZK Proofs Verified</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-cyan-neon">
                  <CountUp to={1420} duration={2000} suffix="+" />
                </div>
                <div className="text-xs text-slate-400 font-medium">Credentials Registered</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-indigo-300">
                  <CountUp to={54} duration={1800} />
                </div>
                <div className="text-xs text-slate-400 font-medium">Active Buyers</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-400">
                  &lt; 1.8s
                </div>
                <div className="text-xs text-slate-400 font-medium">Proving Latency</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Maanak Business Passport Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <TiltCard className="w-full max-w-lg">
              <div className="glass-card rounded-2xl p-5 border border-indigo-500/30 shadow-2xl relative overflow-hidden group">
                {/* 100% Full-Height Scanning Line Animation */}
                <div className="animate-full-scan" />

                {/* Card Header with View Toggle */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-cyan-neon font-bold text-xs">
                      MS
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">Maanak Business Passport</h4>
                      <p className="text-[10px] text-slate-400 font-mono">ID: 0x78cf...a083</p>
                    </div>
                  </div>

                  {/* Public vs Shielded Toggle */}
                  <button
                    onClick={() => setViewMode((prev) => (prev === 'shielded' ? 'public' : 'shielded'))}
                    className="flex items-center gap-1.5 rounded-lg bg-midnight-950 border border-slate-700 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:border-cyan-neon/50 transition-colors"
                  >
                    {viewMode === 'shielded' ? (
                      <>
                        <EyeOff className="h-3 w-3 text-cyan-neon" />
                        <span className="text-cyan-neon">Shielded View</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 text-emerald-400" />
                        <span>Public View</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Isometric 3D Visual Asset Preview */}
                <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 border border-slate-800 bg-midnight-950">
                  <img
                    src="/hero_passport_banner.jpg"
                    alt="Maanak Business Passport Visualizer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-cyan-neon font-semibold flex items-center gap-1">
                      <Lock className="h-3 w-3" /> Midnight Dual-State
                    </span>
                    <span className="rounded bg-emerald-500/20 text-emerald-400 px-2 py-0.5 font-bold text-[10px] border border-emerald-500/30">
                      ON-CHAIN VERIFIED
                    </span>
                  </div>
                </div>

                {/* Credential Attributes (Simulating Public vs Shielded) */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-midnight-950/70 border border-slate-800/80">
                    <span className="text-slate-400">Financial Revenue:</span>
                    {viewMode === 'shielded' ? (
                      <span className="font-mono text-slate-400 flex items-center gap-1">
                        <Lock className="h-3 w-3 text-cyan-neon" />
                        <DecryptedText text="HASH: 0x8a9f...41e2" />
                      </span>
                    ) : (
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> QUALIFIED (Turnover &ge; ₹50L)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-midnight-950/70 border border-slate-800/80">
                    <span className="text-slate-400">ISO 27001 Certification:</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> VALID THROUGH 2028
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-midnight-950/70 border border-slate-800/80">
                    <span className="text-slate-400">Commercial Liability:</span>
                    {viewMode === 'shielded' ? (
                      <span className="font-mono text-slate-400 flex items-center gap-1">
                        <Lock className="h-3 w-3 text-cyan-neon" />
                        <DecryptedText text="BLIND: 0x3d4b...c98a" />
                      </span>
                    ) : (
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> PASSED (Policy Verified)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
