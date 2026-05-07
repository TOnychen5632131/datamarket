'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateDatasetStatus(datasetId: string, newStatus: 'published' | 'processing' | 'rejected') {
  const supabase = await createClient();

  // In a real app, verify the user is an admin here
  // const { data: { user } } = await supabase.auth.getUser();
  // if (user?.role !== 'admin') throw new Error('Unauthorized');

  const { error } = await supabase
    .from('datasets')
    .update({ status: newStatus })
    .eq('id', datasetId);

  if (error) {
    console.error('Failed to update status:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath('/'); // Revalidate home page to show/hide the dataset
  return { success: true };
}

export async function updateCheckStatus(datasetId: string, newStatus: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('datasets')
    .update({ check_status: newStatus })
    .eq('id', datasetId);

  if (error) {
    console.error('Failed to update check status:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  return { success: true };
}

export async function deleteDataset(datasetId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('datasets')
    .delete()
    .eq('id', datasetId);

  if (error) {
    console.error('Failed to delete dataset:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}
