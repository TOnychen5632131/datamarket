'use client';

import { LayoutDashboard, FileText, UploadCloud, ShoppingCart, DollarSign, BarChart2, MessageSquare, Settings, Copy, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Marketplace', href: '/' },
    { icon: FileText, label: 'My Datasets', href: '/my-datasets' },
    { icon: UploadCloud, label: 'Upload Dataset', href: '/?upload=true' },
    { icon: ShoppingCart, label: 'Purchases', href: '/purchases' },
    { icon: DollarSign, label: 'Earnings', href: '/earnings' },
    { icon: BarChart2, label: 'Analytics', href: '/analytics' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: ShieldCheck, label: 'Admin Panel', href: '/admin' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href.startsWith('/?') || href.startsWith('?')) return false; // Don't highlight modal triggers as active pages
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside className="w-[260px] border-r border-gray-100 bg-[#fbfcff] h-screen fixed left-0 top-0 flex flex-col p-6 z-40">
      <div className="flex items-center gap-3 mb-10 pl-2">
        <div className="relative flex items-center justify-center">
          {/* Replicating the layered diamonds logo */}
          <div className="w-6 h-6 bg-blue-600 rounded-[4px] rotate-45 transform"></div>
          <div className="w-6 h-6 bg-blue-400 rounded-[4px] rotate-45 transform absolute -top-1.5 opacity-80"></div>
          <div className="w-6 h-6 bg-blue-300 rounded-[4px] rotate-45 transform absolute -top-3 opacity-60"></div>
        </div>
        <Link href="/">
          <div>
            <h1 className="font-bold text-gray-900 text-lg leading-tight tracking-tight">DataMarket</h1>
            <p className="text-[10px] text-gray-500 font-medium tracking-wide">AI Training Data Marketplace</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                active 
                  ? 'bg-blue-50/80 text-blue-600' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-[18px] h-[18px] ${active ? 'text-blue-600' : 'text-gray-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        {/* Wallet Balance */}
        <div id="tutorial-wallet" className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] relative z-0">
          <p className="text-[11px] text-gray-500 font-medium mb-1">Wallet Balance</p>
          <div className="flex items-center gap-2 mb-3">
             <p className="text-xl font-bold text-gray-900 tracking-tight">$1,240.50</p>
             <Copy className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
          <Link href="?withdraw=true" scroll={false} className="block w-full py-2 bg-white border border-blue-200 text-blue-600 rounded-xl text-[13px] font-semibold text-center hover:bg-blue-50 transition-colors">
            Withdraw
          </Link>
        </div>

        {/* Become a Top Seller */}
        <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-2xl p-4 border border-blue-100/50">
          <div className="w-8 h-8 bg-blue-100/50 rounded-full flex items-center justify-center mb-3">
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h4 className="text-[13px] font-bold text-blue-900 mb-1">Become a Top Seller</h4>
          <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">Upload high-quality datasets and earn more.</p>
          <Link href="/learn-more" className="text-[12px] text-blue-600 font-semibold hover:underline">
            Learn more →
          </Link>
        </div>
      </div>
    </aside>
  );
}
