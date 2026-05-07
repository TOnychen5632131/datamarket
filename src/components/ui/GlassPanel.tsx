'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassPanel({ children, className = '', hoverEffect = true }: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={hoverEffect ? { y: -2, boxShadow: "0px 12px 24px -4px rgba(0,0,0,0.05)" } : {}}
      className={`
        bg-white border border-gray-100
        shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)]
        rounded-2xl p-5 ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
