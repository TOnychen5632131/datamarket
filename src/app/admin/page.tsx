import { GlassPanel } from '@/components/ui/GlassPanel';
import { createClient } from '@/utils/supabase/server';
import { ShieldCheck, FileJson, Clock, CheckCircle2, XCircle, Search, User } from 'lucide-react';
import Link from 'next/link';
import { AdminRowActions } from '@/components/admin/AdminRowActions';

export default async function AdminPage() {
  const supabase = await createClient();

  // Fetch all datasets for admin view
  const { data: datasets } = await supabase
    .from('datasets')
    .select(`*, seller:profiles(username, email, real_name, mailing_address, phone_number)`)
    .order('created_at', { ascending: false });

  // Fetch all enterprise inquiries
  const { data: inquiries } = await supabase
    .from('purchase_inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  // Dummy data to ensure the admin panel always looks populated during development/demo
  const dummyAdminDatasets = [
    {
      id: 'demo-1',
      title: 'Global Healthcare QA Pairs',
      category: 'Medical',
      status: 'processing',
      check_status: 'pending_review',
      ai_score: null,
      price: null,
      file_url: 'https://storage.supabase.co/demo/health_qa.json',
      created_at: new Date().toISOString(),
      seller: { username: 'MedData_Corp', email: 'admin@meddata.com', real_name: 'MedData Admin', mailing_address: '123 Health St, NY', phone_number: '+1 234 567' }
    },
    {
      id: 'demo-2',
      title: 'Python Algorithmic Trading Scripts',
      category: 'Finance',
      status: 'published',
      check_status: 'mailed',
      ai_score: 94,
      price: 155.00,
      file_url: 'https://storage.supabase.co/demo/algo_trading.zip',
      sanitized_url: 'https://storage.supabase.co/demo/algo_trading_clean.zip',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      seller: { username: 'QuantGuru', email: 'quant@guru.io', real_name: 'John Quant', mailing_address: '456 Wall St, NY', phone_number: '+1 987 654' }
    }
  ];

  const displayData = datasets && datasets.length > 0 ? datasets : dummyAdminDatasets;

  // Stats
  const totalUploads = displayData.length;
  const publishedCount = displayData.filter(d => d.status === 'published').length;
  const pendingChecks = displayData.filter(d => d.check_status === 'pending_review').length;

  return (
    <div className="max-w-[1200px] mx-auto pt-2 pb-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Admin Dashboard <ShieldCheck className="w-6 h-6 text-blue-600" />
          </h2>
          <p className="text-[13px] text-gray-500 mt-1">Review datasets and approve mailed check payouts.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6">
        <GlassPanel className="!p-5" hoverEffect={false}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <FileJson className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-500">Total Uploads</p>
              <p className="text-2xl font-extrabold text-gray-900">{totalUploads}</p>
            </div>
          </div>
        </GlassPanel>
        
        <GlassPanel className="!p-5" hoverEffect={false}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-500">Published</p>
              <p className="text-2xl font-extrabold text-gray-900">{publishedCount}</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="!p-5" hoverEffect={false}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-500">Pending Checks</p>
              <p className="text-2xl font-extrabold text-gray-900">{pendingChecks}</p>
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* Table Section */}
      <GlassPanel className="!p-0 overflow-hidden" hoverEffect={false}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <h3 className="text-[16px] font-bold text-gray-900">Queue & Payouts</h3>
          <div className="relative w-[300px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search files or users..." 
              className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-[13px] text-gray-700 outline-none focus:border-blue-400 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-gray-100">
                <th className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Dataset</th>
                <th className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Seller & Mailing Info</th>
                <th className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status / Payout</th>
                <th className="px-6 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {displayData.map((row: any) => (
                <tr key={row.id} className="hover:bg-[#fbfcff] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-gray-900 mb-1">{row.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{row.category}</span>
                        <span className="text-[11px] text-gray-500">{new Date(row.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-gray-900">{row.seller?.real_name || row.seller?.username}</span>
                        <span className="text-[11px] text-gray-400">({row.seller?.username})</span>
                      </div>
                      <span className="text-[11px] text-gray-500 flex items-center gap-1 leading-snug max-w-[200px]">
                         {row.seller?.mailing_address || 'No address provided'}
                      </span>
                      <span className="text-[11px] text-blue-600 font-medium">{row.seller?.phone_number || 'No phone'}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-gray-900">${row.price?.toFixed(2) || '0.00'}</span>
                        {row.check_status === 'pending_review' && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded">Pending Review</span>}
                        {row.check_status === 'approved' && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">Approved</span>}
                        {row.check_status === 'mailed' && <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold rounded">Mailed</span>}
                      </div>
                      <div className="text-[11px] text-gray-400 font-medium italic">AI Score: {row.ai_score || '--'}/100</div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <AdminRowActions 
                      datasetId={row.id}
                      status={row.status}
                      checkStatus={row.check_status}
                      fileUrl={row.file_url}
                      sanitizedUrl={row.sanitized_url}
                      isMock={row.id.startsWith('demo-')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>

      {/* Enterprise Leads Section */}
      <div className="mt-8">
        <h3 className="text-[18px] font-bold text-gray-900 mb-4 flex items-center gap-2">
          Enterprise Leads <User className="w-5 h-5 text-blue-600" />
        </h3>
        {inquiries && inquiries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inquiries.map((inquiry: any) => (
              <GlassPanel key={inquiry.id} className="!p-5" hoverEffect={false}>
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[13px] font-bold text-gray-900 block">{inquiry.dataset_title}</span>
                    <span className="text-[11px] text-gray-500">ID: {inquiry.dataset_id}</span>
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${
                    inquiry.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                    inquiry.status === 'contacted' ? 'bg-blue-50 text-blue-600' :
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    {inquiry.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-bold text-gray-900">{inquiry.buyer_name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500">Company:</span>
                    <span className="font-bold text-gray-900">{inquiry.company_name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-medium text-blue-600">{inquiry.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-medium text-gray-900">{inquiry.phone || 'N/A'}</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-50">
                    <span className="text-[11px] text-gray-500 block mb-1">Use Case:</span>
                    <p className="text-[12px] text-gray-700 bg-gray-50 p-2 rounded-lg leading-relaxed">
                      {inquiry.use_case}
                    </p>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>
        ) : (
          <GlassPanel className="!p-8 text-center" hoverEffect={false}>
            <p className="text-[14px] text-gray-500 font-medium">No enterprise leads have been submitted yet.</p>
          </GlassPanel>
        )}
      </div>
    </div>
  );
}
