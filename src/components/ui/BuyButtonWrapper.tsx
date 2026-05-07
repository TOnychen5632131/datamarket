'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { PurchaseInquiryModal } from '@/components/modals/PurchaseInquiryModal';

interface BuyButtonWrapperProps {
  dataset: {
    id: string;
    title: string;
  };
}

export function BuyButtonWrapper({ dataset }: BuyButtonWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="w-full bg-[#4a72ff] hover:bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <ShoppingCart className="w-5 h-5" /> Buy Now
      </button>
      
      <PurchaseInquiryModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        dataset={dataset} 
      />
    </>
  );
}
