import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MidnightCyberBackground } from './components/ui/MidnightCyberBackground';
import { Navbar } from './components/layout/Navbar';
import { WalletModal } from './components/wallet/WalletModal';
import { HeroSection } from './components/sections/HeroSection';
import { ProverVerifierPipeline } from './components/sections/ProverVerifierPipeline';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { BusinessPassportShowcase } from './components/sections/BusinessPassportShowcase';
import { BuyerPolicyBuilder } from './components/sections/BuyerPolicyBuilder';
import { Footer } from './components/layout/Footer';
import { Dock, type DockItem } from './components/ui/Dock';
import { useMidnightWallet } from './hooks/useMidnightWallet';
import { Zap, ShieldCheck, Sliders, Info, Home, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGES = [
  { id: 'home', label: 'Home', title: 'Portal Overview' },
  { id: 'pipeline', label: 'ZK Prover', title: 'Prover Pipeline' },
  { id: 'passport', label: 'Passport', title: 'Digital Passport' },
  { id: 'architecture', label: 'Architecture', title: 'Trust Model' },
  { id: 'policies', label: 'Policies', title: 'Buyer Policies' },
];

export function App() {
  const {
    network,
    wallet,
    isConnecting,
    error,
    availableWallets,
    activeConfig,
    connect,
    disconnect,
    switchNetwork,
  } = useMidnightWallet();

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [activePage, setActivePage] = useState<string>('home');
  const [direction, setDirection] = useState<number>(0);

  const currentIndex = PAGES.findIndex((p) => p.id === activePage);

  // Horizontal Navigation Function - 60fps Instant Scroll Reset
  const navigateToPage = (newPageId: string) => {
    const nextIdx = PAGES.findIndex((p) => p.id === newPageId);
    if (nextIdx !== -1 && nextIdx !== currentIndex) {
      setDirection(nextIdx > currentIndex ? 1 : -1);
      setActivePage(newPageId);
      window.scrollTo(0, 0);
    }
  };

  const goToNextPage = () => {
    if (currentIndex < PAGES.length - 1) {
      navigateToPage(PAGES[currentIndex + 1].id);
    }
  };

  const goToPrevPage = () => {
    if (currentIndex > 0) {
      navigateToPage(PAGES[currentIndex - 1].id);
    }
  };

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') goToNextPage();
      if (e.key === 'ArrowLeft') goToPrevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Floating Bottom Dock Navigation Items
  const dockItems: DockItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="h-5 w-5" />,
      active: activePage === 'home',
      onClick: () => navigateToPage('home'),
    },
    {
      id: 'pipeline',
      label: 'ZK Prover',
      icon: <Zap className="h-5 w-5" />,
      active: activePage === 'pipeline',
      onClick: () => navigateToPage('pipeline'),
    },
    {
      id: 'passport',
      label: 'Passport',
      icon: <ShieldCheck className="h-5 w-5" />,
      active: activePage === 'passport',
      onClick: () => navigateToPage('passport'),
    },
    {
      id: 'architecture',
      label: 'Architecture',
      icon: <Info className="h-5 w-5" />,
      active: activePage === 'architecture',
      onClick: () => navigateToPage('architecture'),
    },
    {
      id: 'policies',
      label: 'Policies',
      icon: <Sliders className="h-5 w-5" />,
      active: activePage === 'policies',
      onClick: () => navigateToPage('policies'),
    },
  ];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '50%' : '-50%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.36 },
        opacity: { duration: 0.24, ease: 'easeOut' },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '50%' : '-50%',
      opacity: 0,
      transition: {
        x: { type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.30 },
        opacity: { duration: 0.18, ease: 'easeIn' },
      },
    }),
  };

  return (
    <MidnightCyberBackground>
      <div className="flex min-h-screen flex-col text-slate-100 selection:bg-indigo-500/30 selection:text-cyan-neon relative">
        {/* Navigation Bar */}
        <Navbar
          network={network}
          wallet={wallet}
          activePage={activePage}
          onNavigatePage={navigateToPage}
          onOpenWalletModal={() => setIsWalletModalOpen(true)}
          onDisconnectWallet={disconnect}
          onSwitchNetwork={switchNetwork}
        />

        {/* Floating Left Slide Trigger Arrow */}
        {currentIndex > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrevPage}
            className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full bg-midnight-900/80 border border-slate-700/80 backdrop-blur-xl text-slate-300 hover:text-cyan-neon hover:border-cyan-500/50 shadow-2xl transition-colors"
            title={`Slide back to ${PAGES[currentIndex - 1]?.label}`}
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
        )}

        {/* Floating Right Slide Trigger Arrow */}
        {currentIndex < PAGES.length - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNextPage}
            className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full bg-midnight-900/80 border border-slate-700/80 backdrop-blur-xl text-slate-300 hover:text-cyan-neon hover:border-cyan-500/50 shadow-2xl transition-colors"
            title={`Slide over to ${PAGES[currentIndex + 1]?.label}`}
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        )}

        {/* Main Content Stage with Ultra-Smooth 60fps GPU Horizontal Slide Transitions */}
        <main className="flex-1 flex flex-col justify-start relative overflow-x-hidden min-h-[calc(100vh-5rem)]">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={activePage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              className="w-full flex-1 flex flex-col justify-between"
            >
              {/* Page View Body */}
              <div className="w-full flex-1">
                {activePage === 'home' && <HeroSection onNavigate={navigateToPage} />}
                {activePage === 'pipeline' && (
                  <ProverVerifierPipeline
                    network={network}
                    contractAddress={activeConfig.contractAddress}
                  />
                )}
                {activePage === 'passport' && <BusinessPassportShowcase />}
                {activePage === 'architecture' && <HowItWorksSection />}
                {activePage === 'policies' && <BuyerPolicyBuilder />}
              </div>

              {/* Integrated Page Footer */}
              <Footer
                network={network}
                contractAddress={activeConfig.contractAddress}
              />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating Bottom Dock Navigation */}
        <Dock items={dockItems} />

        {/* Web3 Wallet Modal */}
        <WalletModal
          isOpen={isWalletModalOpen}
          onClose={() => setIsWalletModalOpen(false)}
          availableWallets={availableWallets}
          onSelectProvider={(id) => {
            connect(id);
            setIsWalletModalOpen(false);
          }}
          isConnecting={isConnecting}
          error={error}
        />
      </div>
    </MidnightCyberBackground>
  );
}

export default App;
