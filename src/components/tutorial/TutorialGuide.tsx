'use client';

import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Sparkles } from 'lucide-react';

export function TutorialGuide() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client after a slight delay to ensure UI is rendered
    setMounted(true);
    const hasSeenTutorial = localStorage.getItem('datamarket_tutorial_seen');
    
    if (!hasSeenTutorial) {
      const timer = setTimeout(() => {
        startTutorial();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const startTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      steps: [
        {
          element: '#tutorial-wallet',
          popover: {
            title: 'Your Wallet',
            description: 'We know you don\'t have Stripe yet! Once you make sales, click Withdraw here to have a physical check mailed to your address.',
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '#tutorial-upload',
          popover: {
            title: 'Upload Data',
            description: 'Drag and drop a JSON file here. It will trigger our Multi-Agent AI Pipeline to sanitize PII and automatically price your dataset.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#tutorial-marketplace',
          popover: {
            title: 'The Marketplace',
            description: 'These are mock datasets. They show you exactly what your data will look like once approved and published. Go ahead, upload a file to test it out!',
            side: 'top',
            align: 'start'
          }
        }
      ],
      onDestroyStarted: () => {
        if (!driverObj.hasNextStep()) {
          localStorage.setItem('datamarket_tutorial_seen', 'true');
        }
        driverObj.destroy();
      }
    });

    driverObj.drive();
  };

  if (!mounted) return null;

  // We can also add a floating button to restart the tutorial
  return (
    <button 
      onClick={startTutorial}
      className="fixed bottom-6 right-6 bg-white border border-blue-100 shadow-[0_4px_14px_rgba(0,0,0,0.06)] rounded-full px-4 py-2 flex items-center gap-2 text-[12px] font-bold text-blue-600 hover:bg-blue-50 transition-colors z-40"
    >
      <Sparkles className="w-4 h-4" /> Restart Tutorial
    </button>
  );
}
