import { GlassPanel } from '@/components/ui/GlassPanel';
import { UploadCloud, Folder, TrendingUp, Sparkles, CheckCircle2, Shield, Award, DollarSign, MoreVertical, MessageSquare, Globe, ChevronDown, Search, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { LandingPage } from '@/components/home/LandingPage';
import { TutorialGuide } from '@/components/tutorial/TutorialGuide';

const MOCK_DATASETS = [
  {
    id: 'mock-1',
    title: 'High-Quality Coding Conversations',
    desc: 'Diverse coding Q&A including algorithms, debugging, and best practices.',
    score: 92,
    category: 'Coding',
    messages: '120K messages',
    lang: 'English',
    seller: 'DevDataLab',
    rating: 4.8,
    price: 49.00,
    scoreColor: 'text-emerald-600 bg-emerald-50 border-emerald-100'
  },
  {
    id: 'mock-2',
    title: 'Finance & Investment Discussions',
    desc: 'Realistic finance conversations about trading, investing, and analysis.',
    score: 85,
    category: 'Finance',
    messages: '85K messages',
    lang: 'English',
    seller: 'FinInsights',
    rating: 4.7,
    price: 39.00,
    scoreColor: 'text-emerald-600 bg-emerald-50 border-emerald-100'
  },
  {
    id: 'mock-3',
    title: 'Customer Support Dialogues',
    desc: 'Multi-domain support chats with resolution and satisfaction insights.',
    score: 78,
    category: 'Customer Support',
    messages: '150K messages',
    lang: 'English',
    seller: 'SupportHub',
    rating: 4.6,
    price: 29.00,
    scoreColor: 'text-amber-500 bg-amber-50 border-amber-100'
  },
  {
    id: 'mock-4',
    title: 'Medical Q&A Conversations',
    desc: 'accurate medical conversations with cases, treatments, and explanations.',
    score: 90,
    category: 'Medical',
    messages: '60K messages',
    lang: 'English',
    seller: 'MedChat Data',
    rating: 4.9,
    price: 59.00,
    scoreColor: 'text-emerald-600 bg-emerald-50 border-emerald-100'
  }
];

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch real published datasets from the database
  const { data: realData } = await supabase
    .from('datasets')
    .select(`*, seller:profiles(username)`)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  // Map real data to match the UI component structure
  const formattedRealDatasets = (realData || []).map((d: any) => ({
    id: d.id,
    title: d.title || 'Untitled Dataset',
    desc: d.description || 'A high-quality dataset processed by AI pipeline.',
    score: Math.round(d.ai_score || 0),
    category: d.category || 'General',
    messages: '10K+ messages', // Currently mocked volume
    lang: d.language || 'English',
    seller: d.seller?.username || 'VerifiedSeller',
    rating: 5.0, // New real datasets start with 5 stars
    price: d.price || 15.00,
    scoreColor: (d.ai_score || 0) >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-500 bg-amber-50 border-amber-100'
  }));

  // Hybrid Data Array: Real uploads show up first, followed by the template mocks
  const displayDatasets = [...formattedRealDatasets, ...MOCK_DATASETS];

  // Dynamic Stat Calculations
  const totalDatasets = 12 + formattedRealDatasets.length;
  
  // Calculate total earnings by summing mock base ($1,240.50) + real prices (assuming 1 sale each for demo)
  const realEarnings = formattedRealDatasets.reduce((acc: number, curr: any) => acc + curr.price, 0);
  const totalEarnings = (1240.50 + realEarnings).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  const totalSales = 28 + formattedRealDatasets.length;
  
  // Recalculate average AI Score
  const allScores = displayDatasets.map(d => d.score);
  const avgScore = (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1);

  return (
    <>
      <TutorialGuide />
      <div className="max-w-[1200px] mx-auto pt-2 pb-12 space-y-8">
        
        {/* Top Section: Upload & Overview */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Upload Panel (Span 4) */}
          <div id="tutorial-upload" className="col-span-4 relative z-0">
            <div className="mb-4">
            <h2 className="text-[22px] font-bold text-gray-900 tracking-tight flex items-center gap-2">
              Welcome back, Jane! <span className="text-xl">👋</span>
            </h2>
            <p className="text-[13px] text-gray-500 mt-1">Upload, discover and sell high-quality AI training data.</p>
          </div>
          
          <GlassPanel className="h-[200px] border-2 border-dashed border-[#d2dcfd] bg-[#f8faff] flex flex-col items-center justify-center text-center !p-0 shadow-none hover:border-blue-300 transition-colors" hoverEffect={false}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 mb-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-[14px] font-bold text-gray-900">Drag & drop your files here</p>
            <p className="text-[12px] text-gray-500 mb-4 mt-0.5">.json or .zip up to 2GB</p>
            <Link href="?upload=true" scroll={false} className="bg-[#4a72ff] hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-[13px] font-semibold transition-all shadow-sm">
              Choose Files
            </Link>
          </GlassPanel>
        </div>

        {/* Overview Stats Panel (Span 8) */}
        <div className="col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-4 pt-1">
            <h3 className="text-[15px] font-bold text-gray-900">Overview</h3>
            <button className="text-[13px] text-blue-600 font-semibold hover:underline flex items-center gap-1">
              View Analytics <span className="text-[16px] leading-none">→</span>
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            <GlassPanel className="p-4 flex flex-col justify-between h-[110px]" hoverEffect={false}>
               <p className="text-[12px] font-semibold text-gray-400">Total Datasets</p>
               <div className="flex items-end justify-between mt-auto">
                 <span className="text-2xl font-bold text-gray-900">{totalDatasets}</span>
                 <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Folder className="w-4 h-4 text-blue-500" />
                 </div>
               </div>
            </GlassPanel>
            
            <GlassPanel className="p-4 flex flex-col justify-between h-[110px]" hoverEffect={false}>
               <p className="text-[12px] font-semibold text-gray-400">Total Earnings</p>
               <div className="flex items-end justify-between mt-auto">
                 <span className="text-2xl font-bold text-gray-900 tracking-tight">${totalEarnings}</span>
                 <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mb-1">
                   <TrendingUp className="w-3 h-3" /> +12.5%
                 </span>
               </div>
            </GlassPanel>

            <GlassPanel className="p-4 flex flex-col justify-between h-[110px]" hoverEffect={false}>
               <p className="text-[12px] font-semibold text-gray-400">Total Sales</p>
               <div className="flex items-end justify-between mt-auto">
                 <span className="text-2xl font-bold text-gray-900">{totalSales}</span>
                 <div className="flex flex-col items-end">
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mb-1">
                      <TrendingUp className="w-3 h-3" /> +8.3%
                    </span>
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                    </div>
                 </div>
               </div>
            </GlassPanel>

            <GlassPanel className="p-4 flex flex-col justify-between h-[110px]" hoverEffect={false}>
               <p className="text-[12px] font-semibold text-gray-400">Avg. AI Score</p>
               <div className="flex items-end justify-between mt-auto">
                 <span className="text-2xl font-bold text-gray-900">{avgScore}</span>
                 <div className="flex flex-col items-end">
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 mb-1">
                      <TrendingUp className="w-3 h-3" /> {formattedRealDatasets.length > 0 ? '+1.2%' : '+5.6%'}
                    </span>
                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-amber-400" />
                    </div>
                 </div>
               </div>
            </GlassPanel>
          </div>

          {/* Tips Banner */}
          <div className="bg-gradient-to-r from-[#f0f4ff] to-[#f8f5ff] rounded-xl p-4 border border-blue-50 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-gray-900">Tips to improve your AI Score</h4>
                <p className="text-[12px] text-gray-500">Clean data, remove PII, and provide diverse, high-quality conversations.</p>
              </div>
            </div>
            <button className="text-[12px] text-blue-600 font-bold bg-white px-4 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors shadow-sm">
              View Guide
            </button>
          </div>
        </div>
      </div>

      {/* Marketplace Section */}
      <div id="tutorial-marketplace" className="pt-2 relative z-0">
        <div className="mb-4">
          <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Marketplace</h3>
          <p className="text-[13px] text-gray-500">Discover premium datasets for AI model training.</p>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-[280px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search datasets..." 
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-[13px] text-gray-700 outline-none focus:border-blue-400 shadow-sm"
            />
          </div>
          
          <button className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-600 flex items-center gap-2 shadow-sm">
            All Categories <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-600 flex items-center gap-2 shadow-sm">
            All Tags <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <div className="flex-1"></div>
          <button className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-600 flex items-center gap-2 shadow-sm">
            Sort: Latest <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Tags Row */}
        <div className="flex gap-2 mb-6">
          {['All', 'Coding', 'General', 'Finance', 'Medical', 'Legal', 'Customer Support', 'Multilingual', 'More v'].map((tag, idx) => (
            <button 
              key={tag} 
              className={`px-4 py-1.5 text-[12px] font-semibold rounded-full transition-colors ${
                idx === 0 
                  ? 'bg-[#eef2ff] text-blue-600 border border-blue-100' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Dataset Cards Grid */}
        <div className="grid grid-cols-4 gap-5">
          {displayDatasets.map((dataset) => (
            <Link href={`/dataset/${dataset.id}`} key={dataset.id}>
              <GlassPanel className="flex flex-col group cursor-pointer relative !p-4 h-full">
                
                <div className="flex justify-between items-start mb-3">
                  <div className={`px-2 py-0.5 rounded border text-[11px] font-bold flex items-center gap-1 ${dataset.scoreColor}`}>
                    {dataset.score} <span className="font-medium opacity-80 font-normal">AI Score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                      {dataset.category}
                    </span>
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <h4 className="font-bold text-gray-900 text-[14px] leading-snug mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">{dataset.title}</h4>
                <p className="text-[12px] text-gray-500 mb-4 line-clamp-2 flex-1 leading-relaxed">{dataset.desc}</p>
                
                <div className="flex items-center gap-4 text-[11px] font-medium text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-gray-400"/> {dataset.messages}</span>
                  <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-gray-400"/> {dataset.lang}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100">
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${dataset.seller}`} alt={dataset.seller} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[11px] font-bold text-gray-900 flex items-center gap-1">
                        {dataset.seller} 
                        <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500 text-white"/>
                      </p>
                      <p className="text-[11px] text-amber-500 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {dataset.rating}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-blue-600 text-[15px]">${dataset.price.toFixed(2)}</span>
                </div>
              </GlassPanel>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Badges */}
      <div className="grid grid-cols-3 gap-6 pt-6">
         <GlassPanel className="flex gap-4 items-center !p-4" hoverEffect={false}>
            <div className="w-10 h-10 rounded-full border border-blue-100 bg-blue-50 flex items-center justify-center text-blue-600">
               <Shield className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-gray-900 text-[13px]">Secure & Private</h5>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">All data is encrypted and stored<br/>securely. PII is automatically removed.</p>
            </div>
         </GlassPanel>
         
         <GlassPanel className="flex gap-4 items-center !p-4" hoverEffect={false}>
            <div className="w-10 h-10 rounded-full border border-purple-100 bg-purple-50 flex items-center justify-center text-purple-600">
               <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-gray-900 text-[13px]">High Quality</h5>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">AI-powered scoring ensures<br/>high-quality training data.</p>
            </div>
         </GlassPanel>
         
         <GlassPanel className="flex gap-4 items-center !p-4" hoverEffect={false}>
            <div className="w-10 h-10 rounded-full border border-emerald-100 bg-emerald-50 flex items-center justify-center text-emerald-600">
               <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-gray-900 text-[13px]">Fair Earnings</h5>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">Transparent pricing and automatic<br/>payouts via Stripe.</p>
            </div>
         </GlassPanel>
      </div>
    </div>
    </>
  );
}
