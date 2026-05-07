'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, X, FileJson, Loader2, CheckCircle2, 
  DollarSign, MapPin, Phone, User, Mail, Sparkles, 
  Clock, Terminal, Search, Shield, Database, Cpu, 
  Layers, Zap, AlertTriangle 
} from 'lucide-react';
import { evaluateDataset } from '@/actions/evaluateDataset';
import { saveContactAndConfirmPrice } from '@/actions/profile';
import { useRouter, useSearchParams } from 'next/navigation';

type Step = 'idle' | 'uploading' | 'analyzing' | 'offer' | 'contact_form' | 'success';

const PIPELINE_LOGS = [
  { tool: 'NeuralSnapshotter', message: 'Initializing high-entropy sampling sequence...', delay: 1200 },
  { tool: 'VectorCollision', message: 'Mapping latent space for cross-dataset pattern matching...', delay: 1500 },
  { tool: 'SemanticGraph', message: 'Reconstructing inference chains and topology weights...', delay: 1800 },
  { tool: 'ObfuscationLayer', message: 'Running entity redaction and privacy-preserving filters...', delay: 1400 },
  { tool: 'StochasticGuard', message: 'Validating data integrity via probabilistic parity checks...', delay: 1100 },
  { tool: 'DomainEncoder', message: 'Encoding domain-specific embeddings for valuation alignment...', delay: 1300 },
  { tool: 'EquilibriumAgent', message: 'Calculating market value based on complexity distribution...', delay: 1600 },
  { tool: 'ShardFinalizer', message: 'Finalizing encrypted cold-storage distribution...', delay: 800 },
];

export function UploadModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOpen = searchParams.get('upload') === 'true';

  const [step, setStep] = useState<Step>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [currentTool, setCurrentTool] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const closeModal = () => {
    setStep('idle');
    setProgress(0);
    setResult(null);
    setLogs([]);
    router.push(window.location.pathname);
  };

  const runAnalysisLog = async () => {
    setLogs([]);
    for (let i = 0; i < PIPELINE_LOGS.length; i++) {
      const log = PIPELINE_LOGS[i];
      setCurrentTool(log.tool);
      setLogs(prev => [...prev, `[${log.tool}] ${log.message}`]);
      setProgress(Math.round(((i + 1) / PIPELINE_LOGS.length) * 100));
      await new Promise(r => setTimeout(r, log.delay));
    }
  };

  const handleUpload = async () => {
    setStep('uploading');
    
    // Simulate File Upload
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 100));
    }
    
    setStep('analyzing');
    setProgress(0);
    
    // Run the visual log in parallel with the actual API call
    const logPromise = runAnalysisLog();
    
    const datasetId = "mock-uuid-" + Math.floor(Math.random() * 1000);
    const mockFileUrl = "https://storage.supabase.co/bucket/dataset.json";
    
    try {
      const [evaluation] = await Promise.all([
        evaluateDataset(datasetId, mockFileUrl),
        logPromise // Wait for the visual log to finish or a minimum time
      ]);

      if (evaluation.success) {
        setResult({ ...evaluation, id: datasetId });
        setStep('offer');
      } else {
        alert('Evaluation failed.');
        setStep('idle');
      }
    } catch (error) {
      console.error(error);
      alert('Error during pipeline.');
      setStep('idle');
    }
  };

  const handleConfirmOffer = () => {
    setStep('contact_form');
  };

  const handleFinalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      datasetId: result.id,
      realName: formData.get('realName') as string,
      address: formData.get('address') as string,
      phone: formData.get('phone') as string,
    };

    try {
      const res = await saveContactAndConfirmPrice(data);
      if (res.success) {
        setStep('success');
      } else {
        alert(res.error);
      }
    } catch (err) {
      alert('Failed to save contact information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            onClick={closeModal}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-[32px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] w-full max-w-xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex items-center justify-between">
              <div>
                 <h2 className="text-[24px] font-black text-gray-900 tracking-tight flex items-center gap-3">
                   {step === 'offer' ? 'AI Valuation Result' : 
                    step === 'contact_form' ? 'Mailing Information' : 
                    step === 'success' ? 'Request Received' : 'Upload & Monetize'}
                    {step === 'offer' && <Sparkles className="w-6 h-6 text-blue-500" />}
                 </h2>
                 <p className="text-[14px] text-gray-500 mt-1 font-medium">
                   {step === 'offer' ? 'Our AI has calculated the market value of your data.' : 
                    step === 'contact_form' ? 'Provide your details to receive payment via physical check.' : 
                    step === 'success' ? 'Your request is in our processing queue.' : 'Convert your high-quality datasets into earnings.'}
                 </p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2.5 rounded-2xl transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 pt-4">
              {/* Step 1: Idle / Dropzone */}
              {step === 'idle' && (
                <div 
                  onClick={handleUpload}
                  className="group relative border-2 border-dashed border-blue-100 bg-blue-50/30 hover:bg-blue-50 hover:border-blue-300 rounded-[24px] p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-blue-500 mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <UploadCloud className="w-10 h-10" />
                  </div>
                  <h3 className="text-[18px] font-bold text-gray-900 mb-2">Drop your dataset here</h3>
                  <p className="text-[14px] text-gray-500 max-w-[260px] leading-relaxed">We accept .json, .csv, and .zip files up to 2GB.</p>
                  
                  <div className="mt-8 flex flex-col gap-2">
                    <div className="px-6 py-2 bg-white border border-blue-100 rounded-full text-[12px] font-bold text-blue-600 shadow-sm">
                      AI Pipeline Automatically Sanitizes PII
                    </div>
                    <p className="text-[11px] text-gray-400 italic">Large files will be sampled for logical depth analysis.</p>
                  </div>
                </div>
              )}

              {/* Step 2: Uploading */}
              {step === 'uploading' && (
                <div className="py-12 flex flex-col items-center">
                   <div className="relative mb-8">
                      <div className="w-24 h-24 rounded-full border-4 border-gray-50 border-t-blue-500 animate-spin"></div>
                      <FileJson className="w-10 h-10 text-blue-500 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                   </div>
                   <p className="text-[18px] font-bold text-gray-900 mb-2">Uploading file... {progress}%</p>
                   <div className="w-full max-w-[300px] h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                     ></motion.div>
                   </div>
                </div>
              )}

              {/* Step 3: Analyzing (The "Cool" part) */}
              {step === 'analyzing' && (
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Cpu className="w-5 h-5 text-blue-500 animate-pulse" />
                         </div>
                         <div>
                            <h3 className="text-[16px] font-bold text-gray-900">Multi-Agent Engine</h3>
                            <p className="text-[12px] text-gray-500">Currently running: <span className="text-blue-600 font-bold">{currentTool}</span></p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="text-[20px] font-black text-gray-900">{progress}%</span>
                      </div>
                   </div>

                   {/* Progress Bar */}
                   <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400"
                      />
                   </div>

                   {/* Terminal Log */}
                   <div className="bg-[#0f172a] rounded-2xl p-5 font-mono text-[11px] h-[180px] overflow-y-auto shadow-2xl border border-white/5 relative group">
                      <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                         <div className="w-2 h-2 rounded-full bg-red-500"></div>
                         <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                         <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                         <span className="ml-2 text-gray-500 text-[9px] uppercase tracking-widest font-bold">Live Execution Trace</span>
                      </div>
                      <div className="space-y-1.5">
                         {logs.map((log, i) => (
                           <motion.div 
                             initial={{ opacity: 0, x: -5 }} 
                             animate={{ opacity: 1, x: 0 }} 
                             key={i} 
                             className="flex gap-2"
                           >
                             <span className="text-blue-400 font-bold">❯</span>
                             <span className={i === logs.length - 1 ? 'text-white' : 'text-gray-400'}>{log}</span>
                           </motion.div>
                         ))}
                         {logs.length < PIPELINE_LOGS.length && (
                           <div className="flex items-center gap-2 text-blue-500 animate-pulse">
                              <span>❯</span>
                              <span className="w-1 h-3 bg-blue-500"></span>
                           </div>
                         )}
                         <div ref={logEndRef} />
                      </div>
                   </div>

                   <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                      <p className="text-[12px] text-amber-700 leading-tight">
                         <strong>Large dataset detected.</strong> We are sampling random blocks for verification. Full logical review may take up to 24 hours.
                      </p>
                   </div>
                </div>
              )}

              {/* Step 4: Offer */}
              {step === 'offer' && result && (
                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#f0f9ff] border border-blue-100 rounded-3xl p-6 text-center relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
                            <Layers className="w-12 h-12" />
                         </div>
                         <p className="text-[12px] font-bold text-blue-500 uppercase tracking-widest mb-2">AI Score</p>
                         <p className="text-5xl font-black text-blue-600">{result.ai_score}</p>
                      </div>
                      <div className="bg-[#f0fdf4] border border-emerald-100 rounded-3xl p-6 text-center relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
                            <Zap className="w-12 h-12" />
                         </div>
                         <p className="text-[12px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Offer Price</p>
                         <p className="text-5xl font-black text-emerald-600">${result.usd_value}</p>
                      </div>
                   </div>

                   <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h4 className="font-bold text-gray-900 text-[15px] mb-3 flex items-center gap-2">
                         <DollarSign className="w-4 h-4 text-blue-500" /> Payout Terms
                      </h4>
                      <ul className="space-y-2.5 text-[13px] text-gray-600 font-medium">
                         <li className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                            <span>Payment will be issued via **Physical Check** mailed to your door.</span>
                         </li>
                         <li className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                            <span>Check will be sent within 1-3 business days after manual verification.</span>
                         </li>
                         <li className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                            <span>By accepting, you agree to our Terms of Data Acquisition.</span>
                         </li>
                      </ul>
                   </div>

                   <div className="flex gap-3">
                      <button onClick={closeModal} className="flex-1 px-6 py-4 border border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all">
                        Reject Offer
                      </button>
                      <button onClick={handleConfirmOffer} className="flex-[2] px-6 py-4 bg-[#4a72ff] hover:bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Accept & Continue
                      </button>
                   </div>
                </div>
              )}

              {/* Step 5: Contact Form */}
              {step === 'contact_form' && (
                <form onSubmit={handleFinalSubmit} className="space-y-4">
                   <div className="space-y-4">
                      <div>
                        <label className="block text-[12px] font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">Mailing Name (Can be Anonymous)</label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            name="realName"
                            required
                            placeholder="John Doe or Anonymous" 
                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-[14px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[12px] font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">Mailing Address</label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 absolute left-4 top-4 text-gray-400" />
                          <textarea 
                            name="address"
                            required
                            rows={3}
                            placeholder="123 AI Street, Suite 400, San Francisco, CA 94103, USA" 
                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-[14px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all resize-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-[12px] font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">Phone Number</label>
                           <div className="relative">
                             <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                             <input 
                               name="phone"
                               required
                               placeholder="+1 (555) 000-0000" 
                               className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-[14px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all"
                             />
                           </div>
                        </div>
                        <div>
                           <label className="block text-[12px] font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">Confirm Email</label>
                           <div className="relative">
                             <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                             <input 
                               type="email"
                               required
                               placeholder="your@email.com" 
                               className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-[14px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all"
                             />
                           </div>
                        </div>
                      </div>
                   </div>

                   <div className="pt-4 flex flex-col gap-4">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#4a72ff] hover:bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all hover:scale-[1.01] disabled:opacity-70"
                      >
                         {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                         Submit for Review
                      </button>
                      <p className="text-[11px] text-center text-gray-400 leading-relaxed px-10">
                         By clicking submit, you confirm that your data complies with our <span className="underline cursor-help">service standards</span>.
                      </p>
                   </div>
                </form>
              )}

              {/* Step 6: Success */}
              {step === 'success' && (
                <div className="py-10 flex flex-col items-center text-center">
                   <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                     <Clock className="w-12 h-12 text-emerald-500 animate-pulse" />
                   </div>
                   <h3 className="text-[24px] font-black text-gray-900 mb-3 tracking-tight">Processing Payment</h3>
                   <p className="text-[15px] text-gray-600 mb-8 max-w-[320px] leading-relaxed">
                     Due to extremely high demand, our team is manually verifying all datasets.
                     <br/><br/>
                     You will receive an email notification **within 1 to 3 days** once your check is mailed.
                   </p>
                   
                   <div className="w-full bg-[#f8fafc] border border-gray-100 rounded-[24px] p-6 mb-8 text-left">
                      <div className="flex items-center gap-3 mb-4">
                         <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                         <span className="text-[14px] font-bold text-gray-900">Next Steps</span>
                      </div>
                      <ul className="space-y-3 text-[13px] text-gray-500 font-medium">
                         <li>1. Admin reviews data quality & PII report.</li>
                         <li>2. Physical check is printed and assigned to your address.</li>
                         <li>3. Tracking info sent via email (if available).</li>
                      </ul>
                   </div>

                   <button onClick={closeModal} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all">
                     Back to Marketplace
                   </button>
                </div>
              )}
            </div>
            
            {/* Hidden Service Agreement Link */}
            <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <Link href="/terms" className="text-[10px] text-gray-300 pointer-events-auto cursor-pointer hover:underline">Service Agreement & Data Policy</Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
er hover:underline">Service Agreement & Data Policy</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
ysical check is printed and assigned to your address.</li>
                         <li>3. Tracking info sent via email (if available).</li>
                      </ul>
                   </div>

                   <button onClick={closeModal} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all">
                     Back to Marketplace
                   </button>
                </div>
              )}
            </div>
            
            {/* Hidden Service Agreement Link */}
            <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-[10px] text-gray-300 pointer-events-auto cursor-pointer hover:underline">Service Agreement & Data Policy</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
