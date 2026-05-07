'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, User, Mail, Phone, MessageSquare, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { submitInquiry } from '@/actions/submitInquiry';

interface PurchaseInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: {
    id: string;
    title: string;
  };
}

export function PurchaseInquiryModal({ isOpen, onClose, dataset }: PurchaseInquiryModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setStep('form');
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep('processing');
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      datasetId: dataset.id,
      datasetTitle: dataset.title,
      buyerName: formData.get('buyerName') as string,
      companyName: formData.get('companyName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      useCase: formData.get('useCase') as string,
    };

    const result = await submitInquiry(data);

    if (result.success) {
      setStep('success');
    } else {
      setError(result.error || 'Submission failed');
      setStep('form');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            onClick={handleClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-[500px] overflow-hidden border border-gray-100 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-sm z-10">
              <div>
                 <h2 className="text-[20px] font-bold text-gray-900 tracking-tight flex items-center gap-2">
                   Enterprise Inquiry <ShieldCheck className="w-5 h-5 text-blue-600" />
                 </h2>
                 <p className="text-[13px] text-gray-500 mt-1">
                   Request custom delivery for <strong>{dataset.title}</strong>.
                 </p>
              </div>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {step === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6 text-[13px] text-blue-800">
                     This high-quality dataset is currently only available for enterprise clients. Please leave your details, and our data specialists will contact you within 24 hours to discuss delivery and licensing.
                  </div>

                  {error && (
                    <div className="p-3 mb-4 text-[13px] font-medium text-red-600 bg-red-50 rounded-lg border border-red-100">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input name="buyerName" type="text" required placeholder="John Doe" className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm" />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Company Name</label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input name="companyName" type="text" required placeholder="Acme Corp" className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm" />
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Work Email</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input name="email" type="email" required placeholder="john@acme.com" className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm" />
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input name="phone" type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm" />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Primary Use Case</label>
                      <div className="relative">
                        <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <textarea name="useCase" rows={3} required placeholder="e.g., Fine-tuning our customer support LLM..." className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm resize-none"></textarea>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#4a72ff] hover:bg-blue-600 text-white px-5 py-3 rounded-xl text-[14px] font-bold transition-all shadow-sm mt-4 flex items-center justify-center gap-2">
                    Submit Inquiry
                  </button>
                </form>
              )}

              {step === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                  <p className="text-[15px] font-bold text-gray-900">Submitting your inquiry...</p>
                  <p className="text-[13px] text-gray-500 mt-2">Please do not close this window.</p>
                </div>
              )}

              {step === 'success' && (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-[20px] font-bold text-gray-900 mb-2">Inquiry Received</h3>
                  <p className="text-[14px] text-gray-500 max-w-[300px] mb-8">
                    Thank you for your interest. Our data team has received your request and will be in touch via email shortly.
                  </p>
                  <button onClick={handleClose} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-3 rounded-xl text-[14px] font-bold transition-all">
                    Return to Dataset
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
