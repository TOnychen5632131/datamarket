import { Search, Bell, UploadCloud, ChevronDown, LogOut } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { signout } from '@/actions/auth';

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="h-[72px] border-b border-gray-100 bg-white flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex-1 max-w-[400px] relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search datasets, tags, topics..." 
          className="w-full bg-[#f8fafc] border border-gray-100/50 rounded-full pl-10 pr-4 py-2 text-[13px] text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-200 outline-none transition-all"
        />
      </div>
      
      <div className="flex items-center gap-5">
        {user ? (
          <>
            <Link href="?upload=true" scroll={false} className="flex items-center gap-2 bg-[#5c7cfa] hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-[13px] font-semibold transition-colors shadow-sm">
              <UploadCloud className="w-[18px] h-[18px]" />
              Upload Dataset
            </Link>
            
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 group relative border-l border-gray-100 pl-5">
              <img 
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.email}&backgroundColor=f8fafc`} 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full border border-gray-100"
              />
              <div className="flex flex-col">
                 <span className="text-[13px] font-bold text-gray-900 leading-tight">
                   {user.email?.split('@')[0]}
                 </span>
                 <span className="text-[10px] text-emerald-500 font-bold">Top Seller</span>
              </div>
              
              <form action={signout} className="ml-2">
                <button type="submit" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Log out">
                   <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <Link href="?login=true" scroll={false} className="flex items-center gap-2 bg-[#4a72ff] hover:bg-blue-600 text-white px-6 py-2 rounded-xl text-[13px] font-bold transition-colors shadow-sm">
              Sign In
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
