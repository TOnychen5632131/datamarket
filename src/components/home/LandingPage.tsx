'use client';

import { ArrowRight, Star, Globe, Database, Shield, Zap, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Background Layered Gradient Glows */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-100px] w-[800px] h-[800px] rounded-full opacity-40 blur-[120px] bg-[#60B1FF]"></div>
        <div className="absolute top-[-100px] left-[200px] w-[600px] h-[600px] rounded-full opacity-30 blur-[100px] bg-[#319AFF]"></div>
      </div>

      {/* 2. The "Strong Liquid Glass" Navbar */}
      <nav className="fixed top-[30px] left-1/2 -translate-x-1/2 z-50 w-fit px-2 py-2 rounded-[16px] backdrop-blur-[50px] bg-white/30 border border-black/10 shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] flex items-center gap-8">
        <div className="flex items-center gap-6 px-4">
          <span className="text-[18px] font-brand font-black tracking-tight text-slate-900">DataMarket</span>
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#company" className="hover:text-blue-600 transition-colors">Company</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
          </div>
        </div>
        <Link 
          href="?login=true" 
          scroll={false}
          className="bg-white/40 hover:bg-white/60 text-slate-900 border border-black/5 px-5 py-2 rounded-[12px] text-[13px] font-bold transition-all flex items-center gap-2"
        >
          Sign Up <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* 3. Hero Section */}
      <section className="relative pt-44 md:pt-56 pb-20 px-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Hero Left Content */}
        <div className="z-10 order-2 lg:order-1 text-center lg:text-left">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full mb-8">
            <div className="flex -space-x-1">
               {[1,2,3,4,5].map(i => (
                 <Star key={i} className="w-3.5 h-3.5 fill-[#FF801E] text-[#FF801E]" />
               ))}
            </div>
            <span className="text-[12px] font-bold text-slate-600">Rated 4.9/5 by 2700+ customers</span>
          </div>

          <h1 className="text-[48px] md:text-[75px] font-brand font-black text-slate-900 leading-[1.05] tracking-[-2px] mb-8">
            Work smarter, <br className="hidden md:block"/> achieve faster
          </h1>

          <p className="text-[18px] text-slate-500 leading-relaxed tracking-[-1px] max-w-lg mx-auto lg:mx-0 mb-10 font-medium">
            Effortlessly manage your AI datasets, collaborate with your team, and achieve your goals with our intuitive data marketplace tool.
          </p>

          <div className="flex items-center justify-center lg:justify-start">
             <Link 
               href="?login=true" 
               scroll={false}
               className="group relative bg-[#0084ff]/80 backdrop-blur-[2px] hover:bg-[#0084ff] text-white px-10 py-5 rounded-[16px] text-[16px] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.35)] flex items-center gap-3"
             >
               Get Started Now
               <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-blue-600 group-hover:translate-x-1 transition-transform">
                 <ArrowRight className="w-4 h-4" />
               </div>
             </Link>
          </div>
        </div>

        {/* Hero Right: Glassy Orb Video */}
        <div className="relative z-0 order-1 lg:order-2 flex justify-center items-center h-[400px] md:h-[600px]">
           <div className="absolute w-[120%] h-[120%] pointer-events-none">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-contain mix-blend-screen scale-[1.25] filter hue-rotate-[-55deg] saturate-[250%] brightness-[1.2] contrast-[1.1]"
              >
                <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
              </video>
           </div>
        </div>
      </section>

      {/* 4. Footer Logos */}
      <section className="py-20 border-t border-slate-50 bg-white/50">
        <div className="max-w-[1600px] mx-auto px-6 text-center">
          <p className="text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-12">
            Trusted by Top-tier product companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-[100px] gap-y-12 grayscale opacity-30 hover:opacity-60 transition-opacity duration-700">
             {/* Grayscale SVG Placeholders */}
             <div className="flex items-center gap-2 font-black text-2xl"><Globe className="w-8 h-8" /> GLOBEX</div>
             <div className="flex items-center gap-2 font-black text-2xl"><Shield className="w-8 h-8" /> SHIELD</div>
             <div className="flex items-center gap-2 font-black text-2xl"><Zap className="w-8 h-8" /> VOLT</div>
             <div className="flex items-center gap-2 font-black text-2xl"><Database className="w-8 h-8" /> DATACO</div>
             <div className="flex items-center gap-2 font-black text-2xl"><LayoutGrid className="w-8 h-8" /> GRID</div>
          </div>
        </div>
      </section>

      {/* Floating Mobile CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-40">
        <Link 
          href="?login=true" 
          scroll={false}
          className="w-full bg-[#0084ff] text-white py-4 rounded-[16px] font-bold flex items-center justify-center gap-2 shadow-2xl"
        >
          Get Started Now
        </Link>
      </div>

    </div>
  );
}
