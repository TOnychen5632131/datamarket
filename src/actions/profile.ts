'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveContactAndConfirmPrice(data: {
  datasetId: string;
  realName: string;
  address: string;
  phone: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: 'User not authenticated' };

  // 1. Update Profile with mailing info
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      real_name: data.realName,
      mailing_address: data.address,
      phone_number: data.phone,
    })
    .eq('id', user.id);

  if (profileError) {
    console.error('Profile update error:', profileError);
    return { success: false, error: 'Failed to save contact info' };
  }

  // 2. Update Dataset Status to confirmed/pending_review
  const { error: datasetError } = await supabase
    .from('datasets')
    .update({
      status: 'published', // Or a new status like 'confirmed_by_seller'
      check_status: 'pending_review'
    })
    .eq('id', data.datasetId);

  if (datasetError) {
    console.error('Dataset update error:', datasetError);
    return { success: false, error: 'Failed to confirm price' };
  }

  revalidatePath('/my-datasets');
  return { success: true };
}
