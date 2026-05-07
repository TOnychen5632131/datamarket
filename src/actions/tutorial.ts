'use server';

import { createClient } from '@/utils/supabase/server';

export async function completeTutorial() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: 'Not authenticated' };

  const { error } = await supabase
    .from('profiles')
    .update({ has_seen_tutorial: true })
    .eq('id', user.id);

  if (error) {
    console.error('[CompleteTutorial] Error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
