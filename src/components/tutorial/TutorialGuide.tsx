'use client';

import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Sparkles } from 'lucide-react';
import { completeTutorial } from '@/actions/tutorial';

interface TutorialGuideProps {
  hasSeen?: boolean;
}

export function TutorialGuide({ hasSeen }: TutorialGuideProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Disable tutorial on mobile
    if (window.innerWidth < 1024) return;

    // Check both prop and local storage for extra safety
    const hasSeenLocal = localStorage.getItem('datamarket_tutorial_seen');
    
    if (!hasSeen && !hasSeenLocal) {
      const timer = setTimeout(() => {
        startTutorial();
      }, 1500); // Slightly more delay to ensure layout is ready
      return () => clearTimeout(timer);
    }
  }, [hasSeen]);

  const startTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      steps: [
        {
          element: '#tutorial-wallet',
          popover: {
            title: 'Your Wallet',
            description: 'This is where you track your earnings. Once you make sales, click Withdraw here to have a physical check mailed to your address.',
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '#tutorial-upload',
          popover: {
            title: 'Upload Data',
            description: 'Drag and drop your real datasets here. Our AI Pipeline will sanitize PII and automatically price your dataset.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#tutorial-marketplace',
          popover: {
            title: 'The Marketplace',
            description: 'Browse datasets from other sellers. Real uploads will appear here alongside our template mocks.',
            side: 'top',
            align: 'start'
          }
        }
      ],
      onDestroyStarted: async () => {
        // Mark as seen both locally and in DB
        localStorage.setItem('datamarket_tutorial_seen', 'true');
        await completeTutorial();
        driverObj.destroy();
      }
    });

    driverObj.drive();
  };

  if (!mounted) return null;

  return (
    <button 
      onClick={startTutorial}
      className="fixed bottom-6 right-6 bg-white border border-blue-100 shadow-[0_4px_14px_rgba(0,0,0,0.06)] rounded-full px-4 py-2 flex items-center gap-2 text-[12px] font-bold text-blue-600 hover:bg-blue-50 transition-colors z-40"
    >
      <Sparkles className="w-4 h-4" /> Restart Tutorial
    </button>
  );
}
