'use client';

import { useState, useEffect } from 'react';
import { Monitor, Smartphone, LayoutGrid } from 'lucide-react';

export function MobileRestriction() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-500 mb-8">
        <Monitor className="w-10 h-10" />
      </div>
      
      <h1 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
        请在电脑端访问
      </h1>
      
      <p className="text-gray-500 text-[15px] leading-relaxed max-w-[280px] mb-8">
        为了保证您的数据评估和交易体验，DataMarket 目前仅支持桌面端。移动端优化正在进行中，敬请期待。
      </p>
      
      <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 rounded-2xl border border-gray-100">
        <Smartphone className="w-5 h-5 text-gray-400" />
        <div className="w-px h-4 bg-gray-200" />
        <span className="text-[13px] font-bold text-gray-400">Mobile version coming soon</span>
      </div>
      
      <div className="mt-12 opacity-20 flex gap-4">
        <LayoutGrid className="w-6 h-6" />
        <LayoutGrid className="w-6 h-6" />
        <LayoutGrid className="w-6 h-6" />
      </div>
    </div>
  );
}
