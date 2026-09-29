import React from 'react';
import { Shield, ExternalLink, Terminal, Globe, Heart } from 'lucide-react';
import { MaanakLogo } from '../ui/MaanakLogo';
import { type NetworkId, NETWORK_CONFIGS, getExplorerContractUrl } from '../../services/midnightConfig';

interface FooterProps {
  network: NetworkId;
  contractAddress: string;
}

export const Footer: React.FC<FooterProps> = ({ network, contractAddress }) => {
  const activeConfig = NETWORK_CONFIGS[network];

  return (
    <footer className="border-t border-slate-800/80 bg-midnight-950 text-slate-400 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <MaanakLogo size={36} />
              <span className="font-display text-xl font-bold text-white tracking-tight">
                MaanakSetu
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              MaanakSetu is a privacy-preserving business credential network on the Midnight blockchain. Proving enterprise qualifications without exposing confidential financial, commercial, or operational records.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeConfig.name} Operational</span>
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com/MaanakSetu"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-midnight-900 border border-slate-800 text-xs text-slate-400 hover:text-cyan-neon hover:border-slate-700 transition-colors"
                title="Official X (@MaanakSetu)"
              >
                <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>@MaanakSetu</span>
              </a>
              <a
                href="https://github.com/bishalnium/MaanakSetu"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-midnight-900 border border-slate-800 text-xs text-slate-400 hover:text-cyan-neon hover:border-slate-700 transition-colors"
                title="GitHub Repository (bishalnium/MaanakSetu)"
              >
                <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
              Protocol
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#pipeline" className="hover:text-cyan-neon transition-colors">
                  ZK Proving Engine
                </a>
              </li>
              <li>
                <a href="#passport" className="hover:text-cyan-neon transition-colors">
                  Business Passport
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-cyan-neon transition-colors">
                  Trust Model Architecture
                </a>
              </li>
              <li>
                <a href="#policies" className="hover:text-cyan-neon transition-colors">
                  Buyer Policy Builder
                </a>
              </li>
              <li>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe5eljZ-GYVFtmuc-UIDPQwZrsek4JO9dsn1n3bZeVhGpwidw/viewform?usp=dialog"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-neon transition-colors inline-flex items-center gap-1 text-indigo-300"
                >
                  <span>Evaluator Feedback Form</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Midnight Infrastructure */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
              Midnight Network
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://midnight.network"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-neon transition-colors inline-flex items-center gap-1"
                >
                  <span>Midnight Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://docs.midnight.network"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-neon transition-colors inline-flex items-center gap-1"
                >
                  <span>Compact Docs</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={activeConfig.faucetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-neon transition-colors inline-flex items-center gap-1"
                >
                  <span>Testnet Faucet</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={getExplorerContractUrl(network, contractAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-neon transition-colors inline-flex items-center gap-1 text-cyan-neon"
                >
                  <span>Contract Explorer</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contract On-Chain Telemetry */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
              Contract Address
            </h4>
            <div className="p-3 rounded-xl bg-midnight-900 border border-slate-800 text-[11px] font-mono break-all text-slate-300">
              {contractAddress}
            </div>
            <p className="text-[11px] text-slate-400">
              Deployed on {activeConfig.name} via Compact v0.23 compiler.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} MaanakSetu Core Protocol. Released under Apache-2.0.
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with Zero-Knowledge Cryptography on</span>
            <span className="text-white font-semibold">Midnight</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
