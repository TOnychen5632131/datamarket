import { GlassPanel } from '@/components/ui/GlassPanel';
import { Shield, Lock, FileText, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto py-12 px-6">
      <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-bold text-gray-500 hover:text-blue-600 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Marketplace
      </Link>

      <div className="space-y-12">
        <header>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Terms of Data Acquisition</h1>
          <p className="text-gray-500 font-medium">Last updated: May 7, 2026</p>
        </header>

        <section className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
               <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-gray-900 mb-2">1. Data Ownership & Rights</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                By uploading your dataset to DataMarket, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute the data for AI training purposes. You represent that you own the rights to the data or have explicit permission to monetize it.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
               <Lock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-gray-900 mb-2">2. PII & Privacy Policy</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                We use high-level NeuralSnapshotter and ObfuscationLayer agents to automatically sanitize your data. While we strive for 100% anonymization, you are responsible for ensuring your data does not contain sensitive personal information that could violate local privacy laws.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
               <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-gray-900 mb-2">3. Payout & Check Issuance</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Payouts are calculated based on our proprietary EquilibriumAgent valuation. Once an offer is accepted and mailing information is provided, physical checks are typically issued within 1-3 business days. We are not responsible for delays caused by postal services or incorrect address information.
              </p>
            </div>
          </div>
        </section>

        <GlassPanel className="!p-8 bg-gray-50 border-none" hoverEffect={false}>
          <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-[12px]">Important Notice</h4>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            DataMarket reserves the right to reject any dataset that does not meet our logic depth thresholds or contains excessive duplicates. Rejected data will be purged from our active processing shards within 48 hours.
          </p>
        </GlassPanel>

        <footer className="pt-12 border-t border-gray-100 text-center">
          <p className="text-[13px] text-gray-400">© 2026 DataMarket AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
