'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Star, Globe, Database, Shield, Zap, LayoutGrid, Lock, Languages, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

type Lang = 'zh' | 'en';

const translations = {
  zh: {
    nav: { home: '首页', features: '特性', company: '公司', pricing: '定价', signup: '立即加入' },
    hero: {
      badge: '企业级 AI 数据交易平台',
      rating: '超过 2700+ 卖家评分为 4.9/5',
      title: '让您的数据，\n产生商业价值。',
      desc: '全球领先的高质量 AI 训练数据集交易平台。自动模型评估定价、严苛的隐私脱敏、直接对接全球大模型企业采购需求。',
      cta: '开始售卖数据',
      explore: '探索市场'
    },
    features: [
      {
        title: 'AI 自动估值',
        desc: '基于 DeepSeek-v4 的多维分析，自动评估数据的逻辑深度和复杂度，瞬间给出公平的市场报价。',
        icon: Database,
        color: 'bg-blue-600'
      },
      {
        title: '隐私安全脱敏',
        desc: '零隐私泄露风险。我们的流水线会自动识别并剔除所有敏感个人信息（PII），确保数据合规上市。',
        icon: Lock,
        color: 'bg-slate-900'
      },
      {
        title: '企业直接支付',
        desc: '直接面向全球大模型企业。无需 Stripe 账户，支持通过实体支票或银行转账直接将收益寄送至您的地址。',
        icon: Zap,
        color: 'bg-emerald-600'
      }
    ],
    footer: '受全球领先的技术公司信赖',
    mobileCta: '创建账号开始赚钱',
    toggle: 'English'
  },
  en: {
    nav: { home: 'Home', features: 'Features', company: 'Company', pricing: 'Pricing', signup: 'Sign Up' },
    hero: {
      badge: 'Enterprise-Grade AI Data Marketplace',
      rating: 'Rated 4.9/5 by 2700+ sellers',
      title: 'Turn your Data,\ninto AI Gold.',
      desc: 'The premier platform for high-quality AI training datasets. Automated valuation, guaranteed PII sanitization, and direct enterprise demand.',
      cta: 'Start Selling Data',
      explore: 'Explore Marketplace'
    },
    features: [
      {
        title: 'AI Valuation',
        desc: 'DeepSeek-powered analysis evaluates logical depth and complexity to assign a fair market value instantly.',
        icon: Database,
        color: 'bg-blue-600'
      },
      {
        title: 'Privacy First',
        desc: 'Automated entity redaction and PII removal ensures your data remains compliant and secure before listing.',
        icon: Lock,
        color: 'bg-slate-900'
      },
      {
        title: 'Direct Payouts',
        desc: 'Sell directly to AI labs. No Stripe needed. Receive payment via physical mailed checks or direct bank transfer.',
        icon: Zap,
        color: 'bg-emerald-600'
      }
    ],
    footer: 'Trusted by Top-tier product companies',
    mobileCta: 'Create Account to Start',
    toggle: '中文'
  }
};

export function LandingPage() {
  const [lang, setLang] = useState<Lang>('zh');

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.includes('en')) {
      setLang('en');
    } else {
      setLang('zh');
    }
  }, []);

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Background Layered Gradient Glows */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-100px] w-[800px] h-[800px] rounded-full opacity-40 blur-[120px] bg-[#60B1FF]"></div>
        <div className="absolute top-[-100px] left-[200px] w-[600px] h-[600px] rounded-full opacity-30 blur-[100px] bg-[#319AFF]"></div>
      </div>

      {/* 2. The "Strong Liquid Glass" Navbar */}
      <nav className="fixed top-[30px] left-1/2 -translate-x-1/2 z-50 w-fit px-2 py-2 rounded-[16px] backdrop-blur-[50px] bg-white/30 border border-black/10 shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-6 px-4">
          <span className="text-[18px] font-brand font-black tracking-tight text-slate-900">DataMarket</span>
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">{t.nav.home}</Link>
            <Link href="#features" className="hover:text-blue-600 transition-colors">{t.nav.features}</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">{t.nav.pricing}</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 hover:bg-black/5 rounded-lg text-[12px] font-bold text-slate-600 transition-all"
          >
            <Languages className="w-4 h-4" />
            {t.toggle}
          </button>
          
          <Link 
            href="?login=true" 
            scroll={false}
            className="bg-white/40 hover:bg-white/60 text-slate-900 border border-black/5 px-5 py-2 rounded-[12px] text-[13px] font-bold transition-all flex items-center gap-2"
          >
            {t.nav.signup} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
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
            <span className="text-[12px] font-bold text-slate-600">{t.hero.rating}</span>
          </div>

          <h1 className="text-[42px] md:text-[75px] font-brand font-black text-slate-900 leading-[1.05] tracking-[-2px] mb-8 whitespace-pre-line">
            {t.hero.title}
          </h1>

          <p className="text-[18px] text-slate-500 leading-relaxed tracking-[-1px] max-w-lg mx-auto lg:mx-0 mb-10 font-medium">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
             <Link 
               href="?login=true" 
               scroll={false}
               className="group relative bg-[#0084ff]/80 backdrop-blur-[2px] hover:bg-[#0084ff] text-white px-10 py-5 rounded-[16px] text-[16px] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.35)] flex items-center gap-3 w-full sm:w-auto justify-center"
             >
               {t.hero.cta}
               <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-blue-600 group-hover:translate-x-1 transition-transform">
                 <ArrowRight className="w-4 h-4" />
               </div>
             </Link>
             
             <button 
               className="px-8 py-5 rounded-[16px] text-[16px] font-bold text-slate-600 hover:bg-slate-50 transition-all"
             >
               {t.hero.explore}
             </button>
          </div>
        </div>

        {/* Hero Right: Glassy Orb Video */}
        <div className="relative z-0 order-1 lg:order-2 flex justify-center items-center h-[350px] md:h-[600px]">
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

      {/* 4. Features Section */}
      <section id="features" className="max-w-[1600px] mx-auto px-6 py-24 border-t border-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.features.map((feature, i) => (
            <div key={i} className="group p-10 rounded-[40px] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 transition-all duration-700">
               <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
               </div>
               <h3 className="text-[22px] font-brand font-black text-slate-900 mb-4">{feature.title}</h3>
               <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
                 {feature.desc}
               </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Footer Logos */}
      <section className="py-20 border-t border-slate-50 bg-white/50">
        <div className="max-w-[1600px] mx-auto px-6 text-center">
          <p className="text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-12">
            {t.footer}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 md:gap-x-[100px] gap-y-12 grayscale opacity-30 hover:opacity-60 transition-opacity duration-700">
             <div className="flex items-center gap-2 font-brand font-black text-2xl"><Globe className="w-8 h-8" /> GLOBEX</div>
             <div className="flex items-center gap-2 font-brand font-black text-2xl"><Shield className="w-8 h-8" /> SHIELD</div>
             <div className="flex items-center gap-2 font-brand font-black text-2xl"><Zap className="w-8 h-8" /> VOLT</div>
             <div className="flex items-center gap-2 font-brand font-black text-2xl"><Database className="w-8 h-8" /> DATACO</div>
             <div className="flex items-center gap-2 font-brand font-black text-2xl"><LayoutGrid className="w-8 h-8" /> GRID</div>
          </div>
        </div>
      </section>

      {/* Floating Mobile CTA & Language Toggle */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-40 flex flex-col gap-3">
        <button 
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="self-end bg-white/90 backdrop-blur-md border border-slate-100 px-4 py-2 rounded-xl text-[12px] font-bold text-slate-600 shadow-lg flex items-center gap-2"
        >
          <Languages className="w-4 h-4" /> {t.toggle}
        </button>
        <Link 
          href="?login=true" 
          scroll={false}
          className="w-full bg-[#0084ff] text-white py-4 rounded-[16px] font-bold flex items-center justify-center gap-2 shadow-2xl"
        >
          {t.mobileCta}
        </Link>
      </div>

    </div>
  );
}
