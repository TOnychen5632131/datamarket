'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login, signup } from '@/actions/auth';

export function AuthModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOpen = searchParams.get('login') === 'true';

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const closeModal = () => {
    setErrorMsg('');
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = isLogin ? await login(formData) : await signup(formData);
      if (res?.error) {
        setErrorMsg(res.error);
      } else {
        // Successful login/signup
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.delete('login');
        router.push(`/${nextParams.toString() ? '?' + nextParams.toString() : ''}`);
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred.');
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
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-[400px] overflow-hidden border border-gray-100"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                 <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">
                   {isLogin ? 'Welcome Back' : 'Create an Account'}
                 </h2>
                 <p className="text-[13px] text-gray-500 mt-0.5">
                   {isLogin ? 'Sign in to access your datasets.' : 'Join the premier AI data marketplace.'}
                 </p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-[13px] text-red-600 font-medium">
                    {errorMsg}
                  </div>
                )}
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="jane@example.com" 
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="password" 
                      name="password"
                      required
                      placeholder="••••••••" 
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#4a72ff] hover:bg-blue-600 text-white px-5 py-3 rounded-xl text-[14px] font-bold transition-all shadow-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {isLogin ? 'Sign In' : 'Sign Up'}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <div className="mt-6 text-center text-[13px]">
                <span className="text-gray-500">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
                <button 
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }}
                  className="ml-1 text-blue-600 font-bold hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
