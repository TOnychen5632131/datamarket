import { Database, Shield, DollarSign } from 'lucide-react';
import Link from 'next/link';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fbfcff] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="z-10 text-center max-w-3xl px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[12px] font-bold mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Now Open for Data Sellers
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
          Monetize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Training Data</span> seamlessly.
        </h1>
        
        <p className="text-[16px] text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Upload your high-quality datasets. Our Multi-Agent pipeline automatically sanitizes PII, calculates fair market value, and lists it for buyers globally. 
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="?login=true" 
            scroll={false} 
            className="w-full sm:w-auto bg-[#4a72ff] hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl text-[15px] font-bold transition-all shadow-md hover:shadow-lg"
          >
            Start Selling Data
          </Link>
          <button 
            onClick={() => document.getElementById('tutorial-marketplace')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl text-[15px] font-bold transition-all hover:bg-gray-50"
          >
            Explore Marketplace
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
               <Database className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-[15px] mb-2">Automated AI Pricing</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">DeepSeek evaluates your data's logical depth and complexity to assign a fair market value instantly.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
               <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-[15px] mb-2">Strict PII Sanitization</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">Zero privacy leaks. Our pipeline automatically identifies and removes all sensitive information before listing.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
               <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-[15px] mb-2">Get Paid via Mailed Check</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">No Stripe account needed. Provide your mailing address and we will mail physical checks directly to your door.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
