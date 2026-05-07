'use server';

import { createClient } from '@/utils/supabase/server';
import { callAIModel, sanitizeData } from '@/utils/ai-service';

/**
 * Server Action: Triggers the multi-agent AI pipeline.
 * Called when a Seller uploads a dataset and requests evaluation.
 */
export async function evaluateDataset(datasetId: string, fileUrl: string) {
  // Initialize Supabase client
  const supabase = await createClient();
  
  console.log(`[Pipeline] Starting evaluation for Dataset ID: ${datasetId}`);

  try {
    // ---------------------------------------------------------
    // Agent 1: PII & Sanitizer
    // ---------------------------------------------------------
    console.log('[Pipeline] Triggering Agent 1 (Sanitization)...');
    const sanitizedDataUrl = await sanitizeData(fileUrl);
    
    // ---------------------------------------------------------
    // Agent 2: Quality Assessor (e.g., DeepSeek/Kimi)
    // ---------------------------------------------------------
    console.log('[Pipeline] Triggering Agent 2 (Quality Assessment)...');
    const qualityMetrics = await callAIModel('quality-assessor', { 
      dataUrl: sanitizedDataUrl,
      prompt: "Analyze the dataset for logical depth, coding knowledge, and domain complexity. Return JSON with metrics."
    });

    // ---------------------------------------------------------
    // Agent 3: Dynamic Pricer
    // ---------------------------------------------------------
    console.log('[Pipeline] Triggering Agent 3 (Dynamic Pricing)...');
    const pricingResult = await callAIModel('dynamic-pricer', {
      metrics: qualityMetrics,
      prompt: "Based on these metrics, calculate an AI Score (0-100) and an estimated USD Market Value."
    });

    // ---------------------------------------------------------
    // Update Database via Supabase
    // ---------------------------------------------------------
    console.log('[Pipeline] Updating database with final results...');
    
    // NOTE: In a real environment with RLS, ensure the server role or the
    // authenticated user has permissions to update this row.
    const { error } = await supabase.from('datasets').update({
      status: 'published',
      ai_score: pricingResult.ai_score,
      price: pricingResult.usd_value,
      sanitized_url: sanitizedDataUrl,
      metrics: qualityMetrics
    }).eq('id', datasetId);

    if (error) {
      console.error('[Pipeline] Supabase Update Error:', error);
      throw new Error('Database update failed');
    }

    console.log('[Pipeline] Evaluation complete!');
    return { success: true, ...pricingResult };

  } catch (error) {
    console.error("[Pipeline] Critical pipeline failure:", error);
    return { success: false, error: "Evaluation pipeline failed." };
  }
}
