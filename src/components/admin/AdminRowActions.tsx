'use client';

import { useState } from 'react';
import { Download, MoreVertical, Check, X, Trash2, Loader2, Mail, CreditCard } from 'lucide-react';
import { updateDatasetStatus, deleteDataset, updateCheckStatus } from '@/actions/admin';

interface AdminRowActionsProps {
  datasetId: string;
  status: string;
  checkStatus?: string;
  fileUrl: string;
  sanitizedUrl?: string;
  isMock?: boolean;
}

export function AdminRowActions({ datasetId, status, checkStatus, fileUrl, sanitizedUrl, isMock }: AdminRowActionsProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = async (newStatus: 'published' | 'processing' | 'rejected') => {
    if (isMock) {
      alert('This is a mock dataset. Real actions require database setup.');
      setIsOpen(false);
      return;
    }
    
    setLoading(true);
    await updateDatasetStatus(datasetId, newStatus);
    setLoading(false);
    setIsOpen(false);
  };

  const handleCheckStatusChange = async (newStatus: string) => {
    if (isMock) {
      alert('This is a mock dataset.');
      setIsOpen(false);
      return;
    }
    
    setLoading(true);
    await updateCheckStatus(datasetId, newStatus);
    setLoading(false);
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (isMock) {
      alert('This is a mock dataset. Real actions require database setup.');
      setIsOpen(false);
      return;
    }

    if (confirm('Are you sure you want to delete this dataset? This action cannot be undone.')) {
      setLoading(true);
      await deleteDataset(datasetId);
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 relative">
      <a href={fileUrl} target="_blank" className="flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2 py-1.5 rounded-lg transition-colors" title="Original File">
        <Download className="w-3.5 h-3.5" />
      </a>
      
      {sanitizedUrl && (
        <a href={sanitizedUrl} target="_blank" className="flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-emerald-600 bg-gray-50 hover:bg-emerald-50 px-2 py-1.5 rounded-lg transition-colors" title="Sanitized File">
          <Download className="w-3.5 h-3.5" />
        </a>
      )}

      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading}
          className="flex items-center justify-center w-7 h-7 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreVertical className="w-4 h-4" />}
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden py-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dataset Review</div>
              {status !== 'published' && (
                <button onClick={() => handleStatusChange('published')} className="w-full flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors text-left">
                  <Check className="w-3.5 h-3.5" /> Approve & Publish
                </button>
              )}
              {status !== 'rejected' && (
                <button onClick={() => handleStatusChange('rejected')} className="w-full flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-red-600 hover:bg-red-50 transition-colors text-left">
                  <X className="w-3.5 h-3.5" /> Reject Data
                </button>
              )}

              <div className="h-px bg-gray-100 my-1"></div>
              <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Check Payout</div>
              
              {checkStatus === 'pending_review' && (
                <button onClick={() => handleCheckStatusChange('approved')} className="w-full flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-blue-600 hover:bg-blue-50 transition-colors text-left">
                  <CreditCard className="w-3.5 h-3.5" /> Approve Payment
                </button>
              )}
              {(checkStatus === 'approved' || checkStatus === 'pending_review') && (
                <button onClick={() => handleCheckStatusChange('mailed')} className="w-full flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-purple-600 hover:bg-purple-50 transition-colors text-left">
                  <Mail className="w-3.5 h-3.5" /> Mark as Mailed
                </button>
              )}

              <div className="h-px bg-gray-100 my-1"></div>
              <button onClick={handleDelete} className="w-full flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors text-left">
                <Trash2 className="w-3.5 h-3.5" /> Delete Entry
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
