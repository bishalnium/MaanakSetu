import React from 'react';
import { Award, Lock, Cpu, CheckCircle } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Credential Issuance',
      desc: 'Authorized issuers (certifiers, tax registries, auditors) digitally attest business facts to the supplier.',
      icon: <Award className="h-6 w-6 text-indigo-400" />,
      tag: 'Off-Chain Attestation',
    },
    {
      step: '02',
      title: 'Private Witness Formulation',
      desc: 'Supplier stores credentials inside their local Maanak Passport. Documents never leave their device.',
      icon: <Lock className="h-6 w-6 text-cyan-neon" />,
      tag: 'Zero Exposure',
    },
    {
      step: '03',
      title: 'ZK-SNARK Synthesis',
      desc: 'Client-side proof engine evaluates buyer requirements against private witness data, producing a mathematical proof.',
      icon: <Cpu className="h-6 w-6 text-purple-400" />,
      tag: 'Compact Circuits',
    },
    {
      step: '04',
      title: 'Midnight Settlement',
      desc: 'The zero-knowledge proof is verified on-chain. The buyer receives a tamper-proof QUALIFIED confirmation.',
      icon: <CheckCircle className="h-6 w-6 text-emerald-400" />,
      tag: 'Public Truth',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1 mb-4 text-xs font-semibold text-indigo-300">
            <span>Enterprise Trust Model</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How Zero-Knowledge Qualification Works
          </h2>
          <p className="text-base text-slate-300">
            A three-actor trust model engineered specifically for B2B supply chains, compliance audits, and public tenders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <SpotlightCard key={idx} className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-midnight-950 border border-slate-800 shadow-md">
                    {item.icon}
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-700">
                    {item.step}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-neon">
                    {item.tag}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white mt-1">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Phase {item.step}</span>
                <span className="text-emerald-400">● Active</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};
