'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CheckCircle2, Loader2, Home } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export function WithdrawModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOpen = searchParams.get('withdraw') === 'true';

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');

  const closeModal = () => {
    setStep('form');
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate server request to save physical address
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep('success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-[450px] overflow-hidden border border-gray-100"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                 <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">Withdraw Funds</h2>
                 <p className="text-[13px] text-gray-500 mt-0.5">We will mail a physical check to your address.</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {step === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6 flex items-center gap-3">
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                        <MapPin className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-[13px] font-bold text-blue-900">Current Balance: $1,240.50</p>
                       <p className="text-[12px] text-blue-700">Please provide a valid mailing address to receive your check.</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Full Name (Payee)</label>
                      <input type="text" required placeholder="Jane Doe" className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Street Address</label>
                      <div className="relative">
                        <Home className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" required placeholder="123 Main St, Apt 4B" className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-gray-700 mb-1.5">City</label>
                      <input type="text" required placeholder="San Francisco" className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-gray-700 mb-1.5">State / ZIP</label>
                      <div className="flex gap-2">
                        <input type="text" required placeholder="CA" className="w-1/3 bg-[#f8fafc] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm" />
                        <input type="text" required placeholder="94105" className="w-2/3 bg-[#f8fafc] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#4a72ff] hover:bg-blue-600 text-white px-5 py-3 rounded-xl text-[14px] font-bold transition-all shadow-sm mt-4">
                    Request Check
                  </button>
                </form>
              )}

              {step === 'processing' && (
                <div className="py-12 flex flex-col items-center text-center">
                   <Loader2 className="w-12 h-12 text-blue-500 mb-6 animate-spin" />
                   <p className="text-[16px] font-bold text-gray-900 mb-2">Processing Request...</p>
                   <p className="text-[13px] text-gray-500">Securely saving your mailing address.</p>
                </div>
              )}

              {step === 'success' && (
                <div className="py-8 flex flex-col items-center text-center">
                   <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                     <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                   </div>
                   <p className="text-[18px] font-bold text-gray-900 mb-1">Withdrawal Successful!</p>
                   <p className="text-[13px] text-gray-500 mb-6 max-w-[280px]">Your check for <strong>$1,240.50</strong> has been processed and will be mailed to your address within 3-5 business days.</p>
                   <button onClick={closeModal} className="w-full bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-[14px] font-bold transition-all">
                     Done
                   </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
