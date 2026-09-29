import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Wallet, Power } from 'lucide-react';
import { type NetworkId, NETWORK_CONFIGS } from '../../services/midnightConfig';
import type { ConnectedWallet } from '../../services/walletConnector';
import { MaanakLogo } from '../ui/MaanakLogo';

interface NavbarProps {
  network: NetworkId;
  wallet: ConnectedWallet | null;
  activePage: string;
  onNavigatePage: (pageId: string) => void;
  onOpenWalletModal: () => void;
  onDisconnectWallet: () => void;
  onSwitchNetwork: (net: NetworkId) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'pipeline', label: 'ZK Prover' },
  { id: 'passport', label: 'Business Passport' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'policies', label: 'Buyer Policies' },
];

export const Navbar: React.FC<NavbarProps> = ({
  network,
  wallet,
  activePage,
  onNavigatePage,
  onOpenWalletModal,
  onDisconnectWallet,
  onSwitchNetwork,
}) => {
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);
  const activeConfig = NETWORK_CONFIGS[network];

  // Truncate address for clean display
  const truncateAddr = (addr: string) => {
    if (!addr) return '';
    if (addr.length <= 16) return addr;
    return `${addr.slice(0, 8)}...${addr.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-midnight-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-[1440px] items-center justify-between px-3 sm:px-6 lg:px-8 gap-2 sm:gap-4 py-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <motion.button
            onClick={() => onNavigatePage('home')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 text-left group flex-shrink-0"
          >
            <MaanakLogo size={36} />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-cyan-neon transition-colors">
                  MaanakSetu
                </span>
                <span className="rounded-md bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-300 border border-indigo-500/30">
                  ZK-B2B
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap hidden sm:block">
                Privacy Credential Network
              </span>
            </div>
          </motion.button>
        </div>

        {/* Center Navigation Links - Guaranteed Single Line */}
        <nav className="hidden md:flex items-center p-1 rounded-xl bg-midnight-900/70 border border-slate-800/90 backdrop-blur-md relative flex-shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigatePage(item.id)}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.94 }}
                className={`relative px-3 py-1.5 text-xs lg:text-[13px] font-medium transition-colors duration-200 rounded-lg whitespace-nowrap flex-shrink-0 ${
                  isActive ? 'text-cyan-neon font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavGlider"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/25 via-cyan-500/20 to-indigo-500/25 border border-cyan-400/40 shadow-[0_0_16px_rgba(0,240,255,0.25)] pointer-events-none"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Right Actions: Social Links + Network Switcher + Connect Wallet */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* Social Links */}
          <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
            <a
              href="https://x.com/MaanakSetu"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-midnight-900 border border-slate-800 text-slate-400 hover:text-cyan-neon hover:border-slate-700 transition-colors flex-shrink-0"
              title="Official X (@MaanakSetu)"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://github.com/bishalnium/MaanakSetu"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-midnight-900 border border-slate-800 text-slate-400 hover:text-cyan-neon hover:border-slate-700 transition-colors flex-shrink-0"
              title="GitHub Repository (bishalnium/MaanakSetu)"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
          </div>

          {/* Clean Network Switcher Pill */}
          <div className="relative flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowNetworkMenu((prev) => !prev)}
              className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-midnight-900 border border-slate-700/80 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-200 hover:border-indigo-500/50 hover:bg-midnight-850 whitespace-nowrap transition-all duration-200"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="whitespace-nowrap">{activeConfig.name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
            </motion.button>

            {/* Network Dropdown */}
            <AnimatePresence>
              {showNetworkMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-midnight-900 border border-slate-700 shadow-2xl p-1.5 z-50"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Select Midnight Network
                  </div>
                  {(['preview', 'preprod'] as NetworkId[]).map((net) => {
                    const cfg = NETWORK_CONFIGS[net];
                    const isSelected = net === network;
                    return (
                      <motion.button
                        key={net}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onSwitchNetwork(net);
                          setShowNetworkMenu(false);
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                          isSelected
                            ? 'bg-indigo-600/30 text-cyan-neon font-semibold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div>
                          <div className="font-medium whitespace-nowrap">{cfg.name}</div>
                          <div className="text-[10px] text-slate-400">{cfg.tagline}</div>
                        </div>
                        {isSelected && <span className="text-cyan-neon font-bold">✓</span>}
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wallet Connect / Connected State */}
          {wallet ? (
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-mono font-semibold text-slate-200 whitespace-nowrap">
                  {truncateAddr(wallet.unshieldedAddress)}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 whitespace-nowrap">
                  ● {wallet.providerName}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={onDisconnectWallet}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20 whitespace-nowrap transition-all duration-200"
                title="Disconnect Wallet"
              >
                <Power className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">Disconnect</span>
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05, y: -1, boxShadow: '0 0 25px rgba(99,102,241,0.45)' }}
              whileTap={{ scale: 0.94 }}
              onClick={onOpenWalletModal}
              className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 hover:brightness-110 whitespace-nowrap transition-all duration-200 flex-shrink-0"
            >
              <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Connect Wallet</span>
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
};
