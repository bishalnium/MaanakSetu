import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, ArrowUpRight, FileCheck, Layers } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export const BusinessPassportShowcase: React.FC = () => {
  const [selectedCred, setSelectedCred] = useState<number>(0);

  const credentials = [
    {
      id: 0,
      title: 'Audited Annual Turnover Attestation',
      issuer: 'Institute of Chartered Accountants (ICAI)',
      category: 'Financial Capacity',
      status: 'VERIFIED',
      issuedDate: '2026-04-15',
      expiryDate: '2027-04-14',
      zkCommitment: '0x9d4a8f11...c289',
      details: 'Confidential audited balance sheet proving turnover exceeds threshold without publishing ledger books.',
    },
    {
      id: 1,
      title: 'ISO/IEC 27001:2022 Cyber Security',
      issuer: 'BSI Global Certification Body',
      category: 'Compliance & Standards',
      status: 'VERIFIED',
      issuedDate: '2025-09-01',
      expiryDate: '2028-08-31',
      zkCommitment: '0x12bb45e9...88fa',
      details: 'Proves stringent enterprise information security controls and zero critical audit non-conformities.',
    },
    {
      id: 2,
      title: 'GSTIN Pan-India Tax Good Standing',
      issuer: 'Goods & Services Tax Network (GSTN)',
      category: 'Statutory Registry',
      status: 'VERIFIED',
      issuedDate: '2026-01-10',
      expiryDate: '2027-01-09',
      zkCommitment: '0x33cfa104...77bc',
      details: 'Attests zero tax default history and active filing record across all operating states.',
    },
    {
      id: 3,
      title: 'Professional Indemnity Insurance',
      issuer: 'Tata AIG General Insurance',
      category: 'Commercial Liability',
      status: 'VERIFIED',
      issuedDate: '2026-03-20',
      expiryDate: '2027-03-19',
      zkCommitment: '0x76de8890...44ee',
      details: 'Proves liability coverage exceeds buyer tender requirement without disclosing exact policy cost or underwriters.',
    },
  ];

  return (
    <section id="passport" className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 mb-4 text-xs font-semibold text-cyan-neon">
            <Layers className="h-3.5 w-3.5" />
            <span>Reusable Business Identity</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            The Maanak Business Passport
          </h2>
          <p className="text-base text-slate-300">
            One tamper-proof passport. Multiple cryptographically signed credentials. Instant qualification across unlimited enterprise buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Credential List Selection */}
          <div className="lg:col-span-6 space-y-3">
            {credentials.map((cred) => {
              const isSelected = selectedCred === cred.id;
              return (
                <div
                  key={cred.id}
                  onClick={() => setSelectedCred(cred.id)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                    isSelected
                      ? 'bg-midnight-900 border-cyan-neon/50 shadow-xl shadow-cyan-500/10'
                      : 'bg-midnight-950/80 border-slate-800 hover:border-slate-700 hover:bg-midnight-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                      {cred.category}
                    </span>
                    <span className="rounded bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> {cred.status}
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-bold text-white mb-1">
                    {cred.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Issuer: {cred.issuer}</span>
                    <span className="font-mono text-[11px] text-slate-400">
                      Valid thru {cred.expiryDate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Credential Inspector Card */}
          <div className="lg:col-span-6">
            <SpotlightCard className="border-indigo-500/30 h-full p-6">
              <div className="flex items-start justify-between pb-4 mb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-neon">
                    {credentials[selectedCred].category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mt-1">
                    {credentials[selectedCred].title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Attested by {credentials[selectedCred].issuer}
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-midnight-950 border border-slate-800 overflow-hidden shrink-0">
                  <img
                    src="/zk_credential_shield.jpg"
                    alt="Cryptographic Credential Shield"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {credentials[selectedCred].details}
              </p>

              {/* Technical Credential Breakdown */}
              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">On-Chain Commitment:</span>
                  <span className="text-cyan-neon font-bold">{credentials[selectedCred].zkCommitment}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Issued Date:</span>
                    <span className="text-slate-200">{credentials[selectedCred].issuedDate}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Expiry Date:</span>
                    <span className="text-emerald-400">{credentials[selectedCred].expiryDate}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between font-sans">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-cyan-neon" />
                    <span className="text-xs text-indigo-200">
                      Ready for Zero-Knowledge Verification
                    </span>
                  </div>
                  <a
                    href="#pipeline"
                    className="text-xs font-bold text-cyan-neon hover:underline flex items-center gap-1"
                  >
                    <span>Prove Now</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
