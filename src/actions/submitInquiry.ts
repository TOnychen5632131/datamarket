'use server';

import { createClient } from '@/utils/supabase/server';

export async function submitInquiry(data: {
  datasetId: string;
  datasetTitle: string;
  buyerName: string;
  companyName: string;
  email: string;
  phone: string;
  useCase: string;
}) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from('purchase_inquiries').insert([
      {
        dataset_id: data.datasetId,
        dataset_title: data.datasetTitle,
        buyer_name: data.buyerName,
        company_name: data.companyName,
        email: data.email,
        phone: data.phone,
        use_case: data.useCase,
      }
    ]);

    if (error) {
      console.error('[SubmitInquiry] Supabase Insert Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('[SubmitInquiry] Server Error:', error);
    return { success: false, error: 'An unexpected error occurred while submitting your inquiry.' };
  }
}
