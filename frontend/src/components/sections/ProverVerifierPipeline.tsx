import React from 'react';
import {
  Zap,
  ShieldCheck,
  Cpu,
  Lock,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { DecryptedText } from '../ui/DecryptedText';
import {
  useProofVerification,
  type QualificationType,
} from '../../hooks/useProofVerification';
import type { NetworkId } from '../../services/midnightConfig';

interface ProverVerifierPipelineProps {
  network: NetworkId;
  contractAddress: string;
}

export const ProverVerifierPipeline: React.FC<ProverVerifierPipelineProps> = ({
  network,
  contractAddress,
}) => {
  const {
    activeType,
    setActiveType,
    stage,
    progressPercent,
    errorMessage,
    receipt,
    inputs,
    updateInput,
    quickFillPreset,
    clearInputs,
    executeProofPipeline,
  } = useProofVerification(network, contractAddress);

  const [copied, setCopied] = React.useState(false);

  const handleCopyJson = () => {
    if (!receipt) return;
    navigator.clipboard.writeText(JSON.stringify(receipt, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isProving = stage === 'witness' || stage === 'proving' || stage === 'settling';

  return (
    <section id="pipeline" className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 mb-4 text-xs font-semibold text-cyan-neon">
            <Cpu className="h-3.5 w-3.5" />
            <span>Interactive Zero-Knowledge Proving Engine</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Unidirectional Prover-to-Verifier Pipeline
          </h2>
          <p className="text-base text-slate-300">
            Formulate confidential witness assertions locally on your machine, synthesize ZK-SNARK constraints, and verify qualification proofs on the Midnight testnet ledger.
          </p>
        </div>

        {/* Credential Gate Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {[
            { id: 'turnover', label: '1. Financial Turnover Gate', icon: '💰' },
            { id: 'iso_cert', label: '2. ISO 27001 Certification', icon: '📜' },
            { id: 'insurance', label: '3. Experience & Insurance', icon: '🛡️' },
            { id: 'comprehensive_bundle', label: '4. Comprehensive Bundle', icon: '📦' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveType(tab.id as QualificationType);
                clearInputs();
              }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeType === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/25 border border-cyan-neon/40'
                  : 'bg-midnight-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* The 3-Step Pipeline Container */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* STEP 1 (TOP): CLIENT-SIDE WITNESS FORMULATION (SUPPLIER DOMAIN) */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          <SpotlightCard className="border-indigo-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-indigo-500/20 flex items-center justify-center text-cyan-neon font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <span>Client-Side Prover</span>
                    <span className="rounded bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 font-mono border border-indigo-500/30">
                      LOCAL MEMORY ONLY
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Confidential inputs are processed strictly inside client browser memory and never broadcast.
                  </p>
                </div>
              </div>

              {/* Quick-Fill & Clear Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => quickFillPreset(activeType)}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/40 px-3 py-1.5 text-xs font-semibold text-cyan-neon hover:bg-indigo-600/30 transition-colors"
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Quick-Fill Preset</span>
                </button>
                <button
                  type="button"
                  onClick={clearInputs}
                  className="flex items-center gap-1 rounded-lg bg-slate-800/80 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  title="Clear inputs"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Dynamic Form Inputs based on active predicate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1.5">
                  Supplier Entity Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. ABC Technologies Pvt. Ltd."
                  value={inputs.companyName}
                  onChange={(e) => updateInput('companyName', e.target.value)}
                  className="w-full rounded-xl bg-midnight-950 border border-slate-800 px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-medium text-slate-300">
                    Business Registration / GSTIN
                  </label>
                  <span className="text-[10px] text-cyan-neon font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Reusable B2B Identity
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. GSTIN27AABCT4321Q1Z8"
                  value={inputs.registrationNumber}
                  onChange={(e) => updateInput('registrationNumber', e.target.value)}
                  className="w-full rounded-xl bg-midnight-950 border border-slate-800 px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon transition-all"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Cryptographically bound to your private wallet salt. One identity can prove qualifications across unlimited buyer tenders without forgery.
                </p>
              </div>

              {/* Predicate 1: Turnover Fields */}
              {(activeType === 'turnover' || activeType === 'comprehensive_bundle') && (
                <>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-cyan-neon">
                        <Lock className="h-3 w-3" /> Private Annual Turnover (₹ INR)
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal">NEVER DISCLOSED</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 12000000 (for ₹1.2 Crore)"
                      value={inputs.privateTurnover}
                      onChange={(e) => updateInput('privateTurnover', e.target.value)}
                      className="w-full rounded-xl bg-midnight-950 border border-indigo-500/40 px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1.5">
                      Buyer Required Minimum Threshold (₹ INR)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 5000000 (for ₹50 Lakh requirement)"
                      value={inputs.requiredTurnover}
                      onChange={(e) => updateInput('requiredTurnover', e.target.value)}
                      className="w-full rounded-xl bg-midnight-950 border border-slate-800 px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon transition-all font-mono"
                    />
                  </div>
                </>
              )}

              {/* Predicate 2: ISO Certification Fields */}
              {(activeType === 'iso_cert' || activeType === 'comprehensive_bundle') && (
                <>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1.5">
                      Certification Standard
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ISO/IEC 27001:2022"
                      value={inputs.certificationType}
                      onChange={(e) => updateInput('certificationType', e.target.value)}
                      className="w-full rounded-xl bg-midnight-950 border border-slate-800 px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1.5">
                      Private Expiry Date
                    </label>
                    <input
                      type="date"
                      value={inputs.certificationExpiry}
                      onChange={(e) => updateInput('certificationExpiry', e.target.value)}
                      className="w-full rounded-xl bg-midnight-950 border border-slate-800 px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon transition-all"
                    />
                  </div>
                </>
              )}

              {/* Predicate 3: Experience & Insurance Fields */}
              {(activeType === 'insurance' || activeType === 'comprehensive_bundle') && (
                <>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1.5">
                      Verified Experience (Years)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 5"
                      value={inputs.experienceYears}
                      onChange={(e) => updateInput('experienceYears', e.target.value)}
                      className="w-full rounded-xl bg-midnight-950 border border-slate-800 px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1.5">
                      Commercial Liability Coverage (₹ INR)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 7500000 (for ₹75 Lakh)"
                      value={inputs.insuranceCoverage}
                      onChange={(e) => updateInput('insuranceCoverage', e.target.value)}
                      className="w-full rounded-xl bg-midnight-950 border border-slate-800 px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon transition-all font-mono"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3.5 flex items-start gap-3 text-xs text-red-300">
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Generate Proof Trigger */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                disabled={isProving}
                onClick={executeProofPipeline}
                className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-cyan-500/30 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all duration-200"
              >
                <Zap className="h-4 w-4 text-cyan-neon" />
                <span>{isProving ? 'Synthesizing ZK Proof...' : 'Generate & Broadcast Proof'}</span>
              </button>
            </div>
          </SpotlightCard>

          {/* Pipeline Connector Arrow */}
          <div className="flex justify-center text-slate-600">
            <ArrowDown className="h-6 w-6 animate-bounce" />
          </div>

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* STEP 2 (MIDDLE): 3-STAGE ANIMATED ZK-SNARK SYNTHESIS PIPELINE    */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-neon font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    3-Stage ZK Proving Pipeline
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Live execution states across local witness, Docker proof server, and Midnight node
                  </p>
                </div>
              </div>

              <div className="font-mono text-xs font-bold text-cyan-neon">
                {progressPercent}%
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full rounded-full bg-midnight-950 overflow-hidden mb-6 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-cyan-neon to-emerald-400 transition-all duration-500 shadow-md shadow-cyan-500/50"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* 3 Interactive Pipeline Stages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {/* Stage 1: Witness Formulation */}
              <div
                className={`rounded-xl p-3.5 border transition-all duration-300 ${
                  stage === 'witness'
                    ? 'bg-indigo-600/20 border-cyan-neon shadow-lg shadow-indigo-500/20'
                    : stage === 'proving' || stage === 'settling' || stage === 'verified'
                    ? 'bg-midnight-900 border-emerald-500/40 text-emerald-300'
                    : 'bg-midnight-950 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-bold">
                  <span>Stage 1: Witness</span>
                  {stage === 'witness' && <span className="animate-spin text-cyan-neon">⟳</span>}
                  {(stage === 'proving' || stage === 'settling' || stage === 'verified') && (
                    <span className="text-emerald-400">✓</span>
                  )}
                </div>
                <div className="text-[11px] opacity-80">
                  Formulates private witness inputs strictly inside local client RAM.
                </div>
              </div>

              {/* Stage 2: ZK-SNARK Proving */}
              <div
                className={`rounded-xl p-3.5 border transition-all duration-300 ${
                  stage === 'proving'
                    ? 'bg-indigo-600/20 border-cyan-neon shadow-lg shadow-indigo-500/20'
                    : stage === 'settling' || stage === 'verified'
                    ? 'bg-midnight-900 border-emerald-500/40 text-emerald-300'
                    : 'bg-midnight-950 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-bold">
                  <span>Stage 2: Circuit Proof</span>
                  {stage === 'proving' && <span className="animate-spin text-cyan-neon">⟳</span>}
                  {(stage === 'settling' || stage === 'verified') && (
                    <span className="text-emerald-400">✓</span>
                  )}
                </div>
                <div className="text-[11px] opacity-80">
                  Synthesizes PLONK / Halo2 polynomial proof without exposing inputs.
                </div>
              </div>

              {/* Stage 3: On-Chain Settlement */}
              <div
                className={`rounded-xl p-3.5 border transition-all duration-300 ${
                  stage === 'settling'
                    ? 'bg-indigo-600/20 border-cyan-neon shadow-lg shadow-indigo-500/20'
                    : stage === 'verified'
                    ? 'bg-midnight-900 border-emerald-500/40 text-emerald-300'
                    : 'bg-midnight-950 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-bold">
                  <span>Stage 3: Settlement</span>
                  {stage === 'settling' && <span className="animate-spin text-cyan-neon">⟳</span>}
                  {stage === 'verified' && <span className="text-emerald-400">✓</span>}
                </div>
                <div className="text-[11px] opacity-80">
                  Records verified qualification boolean & timestamp on Midnight ledger.
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline Connector Arrow */}
          <div className="flex justify-center text-slate-600">
            <ArrowDown className="h-6 w-6" />
          </div>

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* STEP 3 (BOTTOM): VERIFIER & PUBLIC LEDGER AUDIT RECEIPT          */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          <SpotlightCard className="border-emerald-500/30">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <span>Public Ledger Audit & Verification Receipt</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Verifiers, buyers, and auditors inspect cryptographic proofs on the Midnight blockchain.
                  </p>
                </div>
              </div>

              {receipt && (
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied JSON' : 'Copy Payload'}</span>
                </button>
              )}
            </div>

            {receipt ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                {/* Result Hero Banner */}
                <div className="rounded-xl bg-emerald-950/40 border border-emerald-500/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                        Zero-Knowledge Verification Passed
                      </div>
                      <div className="font-display text-base font-bold text-white">
                        {receipt.statementProven}
                      </div>
                    </div>
                  </div>

                  <a
                    href={receipt.explorerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors self-start sm:self-auto"
                  >
                    <span>View on Midnight Explorer</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Technical Receipt Attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-midnight-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-slate-400">Transaction ID:</span>
                      <a
                        href={receipt.txExplorerUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-cyan-neon hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>View Tx</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                    <a
                      href={receipt.txExplorerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-200 hover:text-cyan-neon break-all transition-colors block"
                    >
                      {receipt.txHash}
                    </a>
                  </div>

                  <div className="p-3 rounded-lg bg-midnight-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-slate-400">Contract Target:</span>
                      <a
                        href={receipt.explorerUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>View Contract</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                    <a
                      href={receipt.explorerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-neon hover:text-white break-all transition-colors block"
                    >
                      {contractAddress}
                    </a>
                  </div>

                  <div className="p-3 rounded-lg bg-midnight-950 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Block Height:</span>
                    <span className="text-slate-200">#{receipt.blockHeight.toLocaleString()}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-midnight-950 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">DUST Consumed:</span>
                    <span className="text-slate-200">{receipt.gasSpentDust}</span>
                  </div>
                </div>

                {/* Selective Disclosure Guarantee Callout */}
                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-cyan-neon" />
                  <span>
                    <strong className="text-white">Selective Disclosure Guaranteed: </strong>
                    {receipt.selectiveDisclosureNote}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 text-xs">
                <Lock className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                <p>No proof executed yet. Configure inputs in Step 1 and execute the pipeline.</p>
              </div>
            )}
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
