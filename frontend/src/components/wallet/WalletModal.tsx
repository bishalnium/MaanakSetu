import React from 'react';
import { X, ExternalLink, ShieldCheck, Smartphone, AlertCircle } from 'lucide-react';
import type { WalletProviderOption } from '../../services/walletConnector';
import { detectDevice, getMobileWalletRedirect } from '../../utils/deviceDetect';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableWallets: WalletProviderOption[];
  onSelectProvider: (providerId: string) => void;
  isConnecting: boolean;
  error: string | null;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  availableWallets,
  onSelectProvider,
  isConnecting,
  error,
}) => {
  if (!isOpen) return null;

  const deviceInfo = detectDevice();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-2xl bg-midnight-900 border border-slate-700/80 p-6 shadow-2xl shadow-black/80 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-cyan-neon">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">Connect Midnight Wallet</h3>
              <p className="text-xs text-slate-400">Select a privacy-enabled provider to sign proofs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Device Notice */}
        {deviceInfo.isMobile && (
          <div className="mt-4 rounded-xl bg-indigo-950/50 border border-indigo-500/30 p-3.5 flex items-start gap-3">
            <Smartphone className="h-5 w-5 text-cyan-neon shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">Mobile Device Detected ({deviceInfo.os.toUpperCase()}): </span>
              Standard mobile browsers lack extension support. Connect using{' '}
              <a
                href={getMobileWalletRedirect('1aim', window.location.href)}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-neon underline font-medium"
              >
                1AM Mobile dApp Browser
              </a>{' '}
              or choose <span className="font-semibold text-white">Read-Only Explorer Mode</span> below.
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3 flex items-start gap-2.5 text-xs text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Provider Options */}
        <div className="mt-5 space-y-2.5">
          {availableWallets.map((wallet) => (
            <button
              key={wallet.id}
              disabled={isConnecting}
              onClick={() => onSelectProvider(wallet.id)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-midnight-850/80 p-3.5 text-left transition-all duration-200 hover:border-indigo-500/40 hover:bg-midnight-800 disabled:opacity-50 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{wallet.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-100 group-hover:text-cyan-neon transition-colors">
                      {wallet.name}
                    </span>
                    {wallet.isAvailable && wallet.type !== 'explorer' && (
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">
                        DETECTED
                      </span>
                    )}
                    {wallet.type === 'explorer' && (
                      <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300">
                        PUBLIC AUDIT
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400">{wallet.description}</div>
                </div>
              </div>

              <div className="text-slate-500 group-hover:text-cyan-neon transition-colors">
                ➔
              </div>
            </button>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400">
            Need testnet tokens for gas? Visit the{' '}
            <a
              href="https://faucet.preview.midnight.network"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-neon hover:underline"
            >
              Midnight Testnet Faucet ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
