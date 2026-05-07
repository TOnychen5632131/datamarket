import { GlassPanel } from '@/components/ui/GlassPanel';
import { 
  FileText, 
  UploadCloud, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MoreVertical, 
  ExternalLink, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function MyDatasetsPage() {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch datasets for this user
  const { data: userDatasets } = user 
    ? await supabase
        .from('datasets')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false })
    : { data: null };

  // Mock data for demo/unauthenticated state
  const mockUserDatasets = [
    {
      id: 'mock-1',
      title: 'High-Quality Coding Conversations',
      category: 'Coding',
      status: 'published',
      ai_score: 92,
      price: 49.00,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'user-upload-1',
      title: 'Advanced Legal Research Logs',
      category: 'Legal',
      status: 'processing',
      ai_score: null,
      price: null,
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'user-upload-2',
      title: 'Common Slang & Dialects',
      category: 'General',
      status: 'rejected',
      ai_score: 42,
      price: 0,
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    }
  ];

  const displayData = userDatasets && userDatasets.length > 0 ? userDatasets : mockUserDatasets;

  return (
    <div className="max-w-[1000px] mx-auto py-4 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Datasets</h1>
          <p className="text-[13px] text-gray-500 mt-1">Manage and track the status of your uploaded data.</p>
        </div>
        <Link href="?upload=true" scroll={false} className="bg-[#4a72ff] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-[14px] font-bold transition-all shadow-sm flex items-center gap-2">
          <UploadCloud className="w-4 h-4" /> Upload New
        </Link>
      </div>

      {!user && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3 text-blue-700 text-[13px] font-medium">
           <AlertCircle className="w-5 h-5" />
           <span>You are viewing demo data. Please <Link href="?login=true" scroll={false} className="underline font-bold">sign in</Link> to manage your real uploads.</span>
        </div>
      )}

      <div className="space-y-4">
        {displayData.map((dataset) => (
          <GlassPanel key={dataset.id} className="!p-0 overflow-hidden" hoverEffect={false}>
            <div className="p-5 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    dataset.status === 'published' ? 'bg-emerald-50 text-emerald-600' :
                    dataset.status === 'processing' ? 'bg-amber-50 text-amber-600' :
                    'bg-red-50 text-red-600'
                  }`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[15px]">{dataset.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                       <span className="text-[11px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase tracking-wider">
                         {dataset.category}
                       </span>
                       <span className="text-[12px] text-gray-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> 
                          {new Date(dataset.created_at).toLocaleDateString()}
                       </span>
                    </div>
                  </div>
               </div>

               <div className="flex items-center gap-12">
                  <div className="flex flex-col items-end min-w-[140px]">
                     <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                     {dataset.status === 'processing' ? (
                        <span className="flex items-center gap-1.5 text-[13px] font-bold text-amber-500 animate-pulse">
                           <Clock className="w-4 h-4" /> Analyzing Data...
                        </span>
                     ) : (
                        <div className="flex flex-col items-end">
                           {dataset.check_status === 'pending_review' && (
                              <span className="flex items-center gap-1.5 text-[13px] font-bold text-blue-600">
                                 <Clock className="w-4 h-4" /> Pending Review
                              </span>
                           )}
                           {dataset.check_status === 'approved' && (
                              <span className="flex items-center gap-1.5 text-[13px] font-bold text-emerald-600">
                                 <CheckCircle2 className="w-4 h-4" /> Check Approved
                              </span>
                           )}
                           {dataset.check_status === 'mailed' && (
                              <span className="flex items-center gap-1.5 text-[13px] font-bold text-purple-600">
                                 <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                 </div> Check Mailed
                              </span>
                           )}
                        </div>
                     )}
                  </div>

                  <div className="flex flex-col items-end w-24">
                     <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">AI Score</p>
                     <span className={`text-[15px] font-black ${
                       dataset.ai_score ? (dataset.ai_score >= 80 ? 'text-emerald-600' : 'text-amber-500') : 'text-gray-300'
                     }`}>
                       {dataset.ai_score || '--'}/100
                     </span>
                  </div>

                  <div className="flex flex-col items-end w-20">
                     <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Payout</p>
                     <span className="text-[15px] font-bold text-gray-900">
                       {dataset.price ? `$${dataset.price.toFixed(2)}` : '--'}
                     </span>
                  </div>

                  <div className="flex items-center gap-2">
                     {dataset.status === 'published' && (
                        <Link href={`/dataset/${dataset.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                           <ExternalLink className="w-5 h-5" />
                        </Link>
                     )}
                     <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                     </button>
                     <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <MoreVertical className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
          </GlassPanel>
        ))}

        {displayData.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
               <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-[16px] font-bold text-gray-900">No datasets yet</h3>
            <p className="text-[13px] text-gray-500 mt-1">Upload your first dataset to start earning.</p>
          </div>
        )}
      </div>
    </div>
  );
}
