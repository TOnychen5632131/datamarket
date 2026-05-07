import { GlassPanel } from '@/components/ui/GlassPanel';
import { 
  ShoppingCart, 
  Download, 
  ExternalLink, 
  Clock, 
  ShieldCheck,
  AlertCircle,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function PurchasesPage() {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch transactions/purchases for this user
  const { data: userPurchases } = user 
    ? await supabase
        .from('transactions')
        .select(`*, dataset:datasets(*)`)
        .eq('buyer_id', user.id)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
    : { data: null };

  // Mock data for demo/unauthenticated state
  const mockPurchases = [
    {
      id: 'tx-1',
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
      amount: 49.00,
      dataset: {
        id: 'mock-1',
        title: 'High-Quality Coding Conversations',
        category: 'Coding',
        ai_score: 92,
      }
    },
    {
      id: 'tx-2',
      created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
      amount: 59.00,
      dataset: {
        id: 'mock-4',
        title: 'Medical Q&A Conversations',
        category: 'Medical',
        ai_score: 90,
      }
    }
  ];

  const displayData = userPurchases && userPurchases.length > 0 ? userPurchases : mockPurchases;

  return (
    <div className="max-w-[1000px] mx-auto py-4 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Purchases</h1>
          <p className="text-[13px] text-gray-500 mt-1">Access and download your acquired AI training datasets.</p>
        </div>
        <div className="relative w-64">
           <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
           <input 
             type="text" 
             placeholder="Search purchases..." 
             className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-[13px] outline-none focus:border-blue-400 transition-all"
           />
        </div>
      </div>

      {!user && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3 text-blue-700 text-[13px] font-medium">
           <AlertCircle className="w-5 h-5" />
           <span>You are viewing demo data. Please <Link href="?login=true" scroll={false} className="underline font-bold">sign in</Link> to access your real purchases.</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {displayData.map((item) => (
          <GlassPanel key={item.id} className="!p-6" hoverEffect={false}>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <ShoppingCart className="w-7 h-7" />
                   </div>
                   <div>
                      <h3 className="font-bold text-gray-900 text-[16px] mb-1">{item.dataset?.title}</h3>
                      <div className="flex items-center gap-3">
                         <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded uppercase tracking-wider">
                           {item.dataset?.category}
                         </span>
                         <span className="text-[12px] text-gray-400 flex items-center gap-1 font-medium">
                            <Clock className="w-3.5 h-3.5" /> 
                            Purchased on {new Date(item.created_at).toLocaleDateString()}
                         </span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-10">
                   <div className="text-right">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">AI Quality</p>
                      <div className="flex items-center gap-1 justify-end">
                         <ShieldCheck className="w-4 h-4 text-emerald-500" />
                         <span className="text-[15px] font-bold text-gray-900">{item.dataset?.ai_score}/100</span>
                      </div>
                   </div>

                   <div className="text-right">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Amount</p>
                      <span className="text-[15px] font-bold text-gray-900">${item.amount.toFixed(2)}</span>
                   </div>

                   <div className="flex items-center gap-3">
                      <Link 
                        href={`/dataset/${item.dataset?.id}`}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-all"
                      >
                         <ExternalLink className="w-4 h-4" /> View Page
                      </Link>
                      <button className="flex items-center gap-2 px-5 py-2 bg-[#4a72ff] hover:bg-blue-600 text-white rounded-xl text-[13px] font-bold shadow-sm transition-all shadow-blue-100">
                         <Download className="w-4 h-4" /> Download Data
                      </button>
                   </div>
                </div>
             </div>
          </GlassPanel>
        ))}

        {displayData.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
               <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="text-[16px] font-bold text-gray-900">No purchases found</h3>
            <p className="text-[13px] text-gray-500 mt-1">Explore the marketplace to find high-quality training data.</p>
            <Link href="/" className="inline-block mt-6 text-blue-600 font-bold hover:underline text-[14px]">
               Go to Marketplace →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
