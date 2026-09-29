import React from 'react';
import { motion } from 'framer-motion';

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  badge?: string;
  active?: boolean;
}

interface DockProps {
  items: DockItem[];
  className?: string;
}

export const Dock: React.FC<DockProps> = ({ items, className = '' }) => {
  return (
    <div className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 ${className}`}>
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-midnight-900/90 backdrop-blur-2xl border border-slate-700/80 shadow-2xl shadow-black/70"
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`group relative flex flex-col items-center justify-center p-2.5 rounded-full transition-all duration-200 ${
              item.active
                ? 'bg-indigo-600/30 text-cyan-neon border border-indigo-500/50 shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
            title={item.label}
          >
            <div className="text-xl transition-transform duration-200 group-hover:scale-125">
              {item.icon}
            </div>

            {/* Hover Tooltip */}
            <span className="pointer-events-none absolute -top-10 scale-0 rounded-md bg-midnight-800 px-2 py-1 text-xs font-medium text-slate-200 shadow-md transition-all duration-150 group-hover:scale-100">
              {item.label}
            </span>

            {/* Notification Badge */}
            {item.badge && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </motion.nav>
    </div>
  );
};
