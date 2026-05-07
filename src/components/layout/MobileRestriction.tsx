'use client';

import { useState, useEffect } from 'react';
import { Monitor, Smartphone, LayoutGrid, Languages } from 'lucide-react';

type Lang = 'zh' | 'en';

const translations = {
  zh: {
    title: '请在电脑端访问',
    desc: '为了保证您的数据评估和交易体验，DataMarket 目前仅支持桌面端。移动端优化正在进行中，敬请期待。',
    badge: '移动版即将推出',
    toggle: 'English'
  },
  en: {
    title: 'Please Visit on Desktop',
    desc: 'To ensure the best experience for data evaluation and trading, DataMarket currently only supports desktop. Mobile optimization is in progress.',
    badge: 'Mobile version coming soon',
    toggle: '中文'
  }
};

export function MobileRestriction({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const [lang, setLang] = useState<Lang>('zh');

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.includes('en')) {
      setLang('en');
    } else {
      setLang('zh');
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only restrict if user is mobile AND authenticated (using the app)
  if (!isMobile || !isAuthenticated) return null;

  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center overflow-hidden">
      {/* Language Toggle Button */}
      <button 
        onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-[12px] font-bold text-gray-600 transition-all border border-gray-100"
      >
        <Languages className="w-4 h-4" />
        {t.toggle}
      </button>

      <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-500 mb-8">
        <Monitor className="w-10 h-10" />
      </div>
      
      <h1 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
        {t.title}
      </h1>
      
      <p className="text-gray-500 text-[15px] leading-relaxed max-w-[280px] mb-8">
        {t.desc}
      </p>
      
      <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 rounded-2xl border border-gray-100">
        <Smartphone className="w-5 h-5 text-gray-400" />
        <div className="w-px h-4 bg-gray-200" />
        <span className="text-[13px] font-bold text-gray-400">{t.badge}</span>
      </div>
      
      <div className="mt-12 opacity-20 flex gap-4">
        <LayoutGrid className="w-6 h-6" />
        <LayoutGrid className="w-6 h-6" />
        <LayoutGrid className="w-6 h-6" />
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
    </div>
  );
}
