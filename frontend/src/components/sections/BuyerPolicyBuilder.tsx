import React, { useState } from 'react';
import { Sliders, Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export const BuyerPolicyBuilder: React.FC = () => {
  const [minTurnoverLakh, setMinTurnoverLakh] = useState<number>(50);
  const [requiredIso, setRequiredIso] = useState<boolean>(true);
  const [minExperience, setMinExperience] = useState<number>(3);
  const [minInsuranceLakh, setMinInsuranceLakh] = useState<number>(25);
  const [copied, setCopied] = useState<boolean>(false);

  const policyJson = {
    policyName: 'Standard Enterprise Procurement Gate v1',
    schemaVersion: '2026.1',
    network: 'midnight-preprod',
    rules: {
      minimumTurnoverInr: minTurnoverLakh * 100000,
      turnoverPredicate: 'turnover >= threshold',
      mandatoryCertifications: requiredIso ? ['ISO/IEC 27001:2022'] : [],
      minimumExperienceYears: minExperience,
      minimumLiabilityInsuranceInr: minInsuranceLakh * 100000,
    },
    verificationCircuits: [
      'verifyTurnoverThreshold',
      'verifyCertificationValidity',
      'verifyExperienceAndInsurance',
    ],
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(policyJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="policies" className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/30 px-3.5 py-1 mb-4 text-xs font-semibold text-purple-300">
            <Sliders className="h-3.5 w-3.5" />
            <span>Buyer Workflow Automation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Buyer Policy Builder
          </h2>
          <p className="text-base text-slate-300">
            Define supplier requirements as cryptographic rules. Receive mathematical proofs without handling or storing vendor confidential paperwork.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls: Form / Sliders */}
          <div className="lg:col-span-6 space-y-6">
            <SpotlightCard className="space-y-5">
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Configure Qualification Thresholds
              </h3>

              {/* Turnover Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-300">Minimum Annual Turnover:</span>
                  <span className="text-cyan-neon font-mono font-bold">
                    ₹{minTurnoverLakh} Lakh (₹{(minTurnoverLakh * 100000).toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={minTurnoverLakh}
                  onChange={(e) => setMinTurnoverLakh(Number(e.target.value))}
                  className="w-full accent-cyan-neon cursor-pointer h-2 bg-midnight-950 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>₹10 Lakh</span>
                  <span>₹5.0 Crore</span>
                </div>
              </div>

              {/* ISO 27001 Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-midnight-950 border border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-white">Require ISO 27001 Certification</div>
                  <div className="text-[11px] text-slate-400">Enforces verified cyber security attestation</div>
                </div>
                <input
                  type="checkbox"
                  checked={requiredIso}
                  onChange={(e) => setRequiredIso(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-700 bg-midnight-900 text-indigo-600 focus:ring-cyan-neon"
                />
              </div>

              {/* Experience Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-300">Minimum Completed Contracts / Experience:</span>
                  <span className="text-cyan-neon font-mono font-bold">{minExperience} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={minExperience}
                  onChange={(e) => setMinExperience(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-midnight-950 rounded-lg"
                />
              </div>

              {/* Insurance Coverage Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-300">Minimum Liability Insurance:</span>
                  <span className="text-cyan-neon font-mono font-bold">
                    ₹{minInsuranceLakh} Lakh (₹{(minInsuranceLakh * 100000).toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={minInsuranceLakh}
                  onChange={(e) => setMinInsuranceLakh(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer h-2 bg-midnight-950 rounded-lg"
                />
              </div>
            </SpotlightCard>
          </div>

          {/* Right: Real-time Compiled JSON Policy Specification */}
          <div className="lg:col-span-6">
            <div className="glass-card rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-cyan-neon" />
                  <span className="font-display text-sm font-bold text-white">
                    Compiled Policy Specification
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 text-xs text-slate-200 transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>

              <pre className="font-mono text-xs text-cyan-300 bg-midnight-950 p-4 rounded-xl overflow-x-auto max-h-[380px] border border-slate-800/80">
                {JSON.stringify(policyJson, null, 2)}
              </pre>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
                <span>Compatible with Midnight Compact v0.23+</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Ready for RFP Distribution
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
