'use client';

import { Database, Shield, DollarSign, ArrowRight, CheckCircle2, Zap, Globe, Lock } from 'lucide-react';
import Link from 'next/link';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative overflow-hidden">
      
      {/* Refined Blue Background Accents (No Purple) */}
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] pointer-events-none opacity-60"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-50 rounded-full blur-[100px] pointer-events-none opacity-60"></div>

      {/* Hero Section */}
      <div className="z-10 text-center max-w-4xl px-6 pt-20 md:pt-32 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[12px] font-bold mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          Enterprise-Grade AI Data Marketplace
        </div>

        <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8">
          Turn your data into <br/>
          <span className="text-blue-600">Institutional Value.</span>
        </h1>
        
        <p className="text-[16px] md:text-[18px] text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          The premier platform for high-quality AI training datasets. Automated valuation, 
          guaranteed PII sanitization, and direct enterprise demand.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link 
            href="?login=true" 
            scroll={false} 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl text-[16px] font-bold transition-all shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Start Selling <ArrowRight className="w-5 h-5" />
          </Link>
          <button 
            onClick={() => {
              const el = document.getElementById('marketplace-preview');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.location.href = '?login=true';
            }}
            className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-10 py-4 rounded-2xl text-[16px] font-bold transition-all hover:bg-slate-50 flex items-center justify-center gap-2"
          >
            View Marketplace
          </button>
        </div>

        {/* Trust Badges - Mobile Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center justify-center gap-2 font-bold text-slate-800">
             <Shield className="w-5 h-5" /> SECURE
           </div>
           <div className="flex items-center justify-center gap-2 font-bold text-slate-800">
             <CheckCircle2 className="w-5 h-5" /> VERIFIED
           </div>
           <div className="flex items-center justify-center gap-2 font-bold text-slate-800">
             <Zap className="w-5 h-5" /> INSTANT
           </div>
           <div className="flex items-center justify-center gap-2 font-bold text-slate-800">
             <Globe className="w-5 h-5" /> GLOBAL
           </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="w-full max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
               <Database className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-black text-slate-900 text-[20px] mb-3">AI Valuation</h3>
            <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
              DeepSeek-powered analysis evaluates logical depth and complexity to assign fair market value instantly.
            </p>
          </div>

          <div className="group p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-200">
               <Lock className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-black text-slate-900 text-[20px] mb-3">Privacy First</h3>
            <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
              Automated entity redaction and PII removal ensures your data remains compliant and secure before listing.
            </p>
          </div>

          <div className="group p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
               <DollarSign className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-black text-slate-900 text-[20px] mb-3">Direct Payouts</h3>
            <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
              Sell to enterprise buyers and receive payment via physical mailed checks or bank transfer. No Stripe needed.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile CTA (Floating for mobile) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <Link 
          href="?login=true" 
          scroll={false}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-2xl"
        >
          Create Account to Start
        </Link>
      </div>

      <footer className="w-full py-12 border-t border-slate-50 text-center">
         <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
           © 2026 DATAMARKET INC. PROXIMITY TO EXCELLENCE.
         </p>
      </footer>
    </div>
  );
}
