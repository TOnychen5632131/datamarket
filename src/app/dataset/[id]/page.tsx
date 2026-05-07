import { GlassPanel } from '@/components/ui/GlassPanel';
import { 
  ChevronLeft, 
  Star, 
  MessageSquare, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Download, 
  ShoppingCart, 
  User, 
  Clock, 
  BarChart3, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { BuyButtonWrapper } from '@/components/ui/BuyButtonWrapper';

// Replicating MOCK_DATASETS for the demo
const MOCK_DATASETS = [
  {
    id: 'mock-1',
    title: 'High-Quality Coding Conversations',
    desc: 'Diverse coding Q&A including algorithms, debugging, and best practices. This dataset contains over 120,000 unique conversation pairs focusing on Python, TypeScript, and Rust. Each conversation has been manually verified for logical correctness and follows a clear instruction-response pattern.',
    score: 92,
    category: 'Coding',
    messages: '120K messages',
    lang: 'English',
    seller: 'DevDataLab',
    rating: 4.8,
    price: 49.00,
    scoreColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    metrics: { depth: 95, complexity: 88, diversity: 93 }
  },
  {
    id: 'mock-2',
    title: 'Finance & Investment Discussions',
    desc: 'Realistic finance conversations about trading, investing, and analysis. This dataset captures nuanced discussions on market trends, portfolio management, and risk assessment. Ideal for training financial advisors or analysis bots.',
    score: 85,
    category: 'Finance',
    messages: '85K messages',
    lang: 'English',
    seller: 'FinInsights',
    rating: 4.7,
    price: 39.00,
    scoreColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    metrics: { depth: 82, complexity: 89, diversity: 84 }
  },
  {
    id: 'mock-3',
    title: 'Customer Support Dialogues',
    desc: 'Multi-domain support chats with resolution and satisfaction insights. Includes various industries such as E-commerce, SaaS, and Telecommunications. Each dialogue includes metadata about user intent and agent performance.',
    score: 78,
    category: 'Customer Support',
    messages: '150K messages',
    lang: 'English',
    seller: 'SupportHub',
    rating: 4.6,
    price: 29.00,
    scoreColor: 'text-amber-500 bg-amber-50 border-amber-100',
    metrics: { depth: 75, complexity: 72, diversity: 87 }
  },
  {
    id: 'mock-4',
    title: 'Medical Q&A Conversations',
    desc: 'Accurate medical conversations with cases, treatments, and explanations. These conversations cover a wide range of medical specialties and are structured to simulate professional consultation and patient education.',
    score: 90,
    category: 'Medical',
    messages: '60K messages',
    lang: 'English',
    seller: 'MedChat Data',
    rating: 4.9,
    price: 59.00,
    scoreColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    metrics: { depth: 94, complexity: 91, diversity: 85 }
  }
];

export default async function DatasetDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await createClient();

  // Try to find in Supabase first
  const { data: realDataset } = await supabase
    .from('datasets')
    .select(`*, seller:profiles(username, avatar_url)`)
    .eq('id', id)
    .single();

  let dataset: any = null;

  if (realDataset) {
    dataset = {
      id: realDataset.id,
      title: realDataset.title,
      desc: realDataset.description,
      score: Math.round(realDataset.ai_score || 0),
      category: realDataset.category,
      messages: `${realDataset.message_count || '10K'}+ messages`,
      lang: realDataset.language || 'English',
      seller: realDataset.seller?.username || 'VerifiedSeller',
      rating: 5.0,
      price: realDataset.price || 15.00,
      scoreColor: (realDataset.ai_score || 0) >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-500 bg-amber-50 border-amber-100',
      metrics: realDataset.metrics || { depth: 85, complexity: 80, diversity: 82 }
    };
  } else {
    // Check mock data
    dataset = MOCK_DATASETS.find(d => d.id === id);
  }

  if (!dataset) {
    return notFound();
  }

  return (
    <div className="max-w-[1200px] mx-auto py-4 space-y-8">
      {/* Breadcrumbs */}
      <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-bold text-gray-500 hover:text-blue-600 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Marketplace
      </Link>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Column: Details & Preview (Span 8) */}
        <div className="col-span-8 space-y-8">
          
          {/* Main Info */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded uppercase tracking-wider">
                 {dataset.category}
               </span>
               <span className="text-gray-300">|</span>
               <div className="flex items-center gap-1.5 text-[12px] text-gray-500 font-medium">
                 <Globe className="w-3.5 h-3.5" /> {dataset.lang}
               </div>
            </div>
            
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {dataset.title}
            </h1>
            
            <p className="text-[15px] text-gray-500 leading-relaxed max-w-2xl">
              {dataset.desc}
            </p>
          </section>

          {/* AI Score Breakdown */}
          <GlassPanel className="!p-8 bg-gradient-to-br from-white to-blue-50/30" hoverEffect={false}>
            <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="text-[18px] font-bold text-gray-900 flex items-center gap-2">
                  AI Quality Evaluation <ShieldCheck className="w-5 h-5 text-blue-600" />
                </h3>
                <p className="text-[13px] text-gray-500 mt-1">Multi-agent analysis based on logical depth and complexity.</p>
              </div>
              <div className={`px-4 py-2 rounded-xl border-2 flex flex-col items-center ${dataset.scoreColor}`}>
                <span className="text-2xl font-black">{dataset.score}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">AI Score</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
               <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-gray-700">Logical Depth</span>
                    <span className="text-[12px] font-bold text-blue-600">{dataset.metrics.depth}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${dataset.metrics.depth}%` }}></div>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-tight">Measures the reasoning chains and factual accuracy.</p>
               </div>
               
               <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-gray-700">Complexity</span>
                    <span className="text-[12px] font-bold text-purple-600">{dataset.metrics.complexity}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${dataset.metrics.complexity}%` }}></div>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-tight">Analyzes vocabulary richness and structural variety.</p>
               </div>

               <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-gray-700">Diversity</span>
                    <span className="text-[12px] font-bold text-emerald-600">{dataset.metrics.diversity}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${dataset.metrics.diversity}%` }}></div>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-tight">Evaluates the range of topics and edge cases covered.</p>
               </div>
            </div>
          </GlassPanel>

          {/* Sample Preview */}
          <section className="space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-gray-900">Dataset Sample</h3>
                <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                  Instruction-Response Format
                </span>
             </div>
             
             <GlassPanel className="!p-0 border border-gray-200 overflow-hidden" hoverEffect={false}>
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/20 border border-red-400/30"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20 border border-amber-400/30"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20 border border-emerald-400/30"></div>
                   </div>
                   <span className="text-[11px] font-mono text-gray-400">preview_sample_01.json</span>
                </div>
                <div className="p-6 font-mono text-[13px] leading-relaxed text-gray-700 bg-white">
                   <div className="mb-4">
                      <span className="text-blue-600 font-bold">"instruction":</span> "Write a secure Python function to handle user session tokens using Redis..."
                   </div>
                   <div>
                      <span className="text-emerald-600 font-bold">"output":</span> "To implement secure session management in Python with Redis, you should use the `redis-py` library along with a secure token generation method like `secrets.token_urlsafe()`. Here is an example implementation...\n\n```python\nimport secrets\nimport redis\n\ndef create_session(user_id, r_client):\n    token = secrets.token_urlsafe(32)\n    r_client.setex(f'session:{token}', 3600, user_id)\n    return token\n```"
                   </div>
                </div>
             </GlassPanel>
          </section>

        </div>

        {/* Right Column: Actions & Seller (Span 4) */}
        <div className="col-span-4 space-y-6">
          
          {/* Purchase Card */}
          <GlassPanel className="!p-6 sticky top-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border-2 border-blue-50" hoverEffect={false}>
             <div className="mb-6">
                <p className="text-[13px] font-medium text-gray-400 mb-1">Price</p>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-black text-gray-900">${dataset.price.toFixed(2)}</span>
                   <span className="text-[14px] font-bold text-gray-400">USD</span>
                </div>
             </div>

             <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-[13px] text-gray-600 font-medium">
                   <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                   </div>
                   Commercial Use License
                </div>
                <div className="flex items-center gap-3 text-[13px] text-gray-600 font-medium">
                   <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                   </div>
                   Full Sanitized Dataset (.json)
                </div>
                <div className="flex items-center gap-3 text-[13px] text-gray-600 font-medium">
                   <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                   </div>
                   AI Quality Certificate
                </div>
             </div>

             <button className="w-full bg-[#4a72ff] hover:bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
                <ShoppingCart className="w-5 h-5" /> Buy Now
             </button>
             
             <p className="text-[11px] text-center text-gray-400 mt-4 px-4">
                Secure payment via Stripe. Instant download available after purchase.
             </p>
          </GlassPanel>

          {/* Dataset Stats */}
          <GlassPanel className="!p-6" hoverEffect={false}>
             <h4 className="text-[14px] font-bold text-gray-900 mb-4">Dataset Stats</h4>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-[12px] text-gray-500 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Volume</span>
                   <span className="text-[12px] font-bold text-gray-900">{dataset.messages}</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[12px] text-gray-500 flex items-center gap-2"><Download className="w-4 h-4" /> File Type</span>
                   <span className="text-[12px] font-bold text-gray-900">JSON</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[12px] text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Last Updated</span>
                   <span className="text-[12px] font-bold text-gray-900">May 2026</span>
                </div>
             </div>
          </GlassPanel>

          {/* Seller Info */}
          <GlassPanel className="!p-6" hoverEffect={false}>
             <h4 className="text-[14px] font-bold text-gray-900 mb-4">Verified Seller</h4>
             <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${dataset.seller}`} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                   <p className="text-[14px] font-bold text-gray-900 flex items-center gap-1">
                      {dataset.seller} <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white" />
                   </p>
                   <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="text-[12px] font-bold text-amber-500">{dataset.rating}</span>
                      <span className="text-[12px] text-gray-400 font-medium">(24 reviews)</span>
                   </div>
                </div>
             </div>
             <button className="w-full py-2.5 border border-gray-200 rounded-xl text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                View Profile
             </button>
          </GlassPanel>

        </div>
      </div>
    </div>
  );
}
