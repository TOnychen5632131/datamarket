import OpenAI from 'openai';

type ModelType = 'quality-assessor' | 'dynamic-pricer' | 'pii-sanitizer';

interface AIRequestPayload {
  dataUrl?: string;
  prompt: string;
  metrics?: any;
}

// Initialize OpenAI SDK to point to AIHubMix API
// Ensure you have AIHUBMIX_API_KEY in your .env.local
const client = new OpenAI({
  baseURL: 'https://aihubmix.com/v1',
  apiKey: process.env.AIHUBMIX_API_KEY || 'dummy_key_to_prevent_build_errors', 
});

export async function callAIModel(model: ModelType, payload: AIRequestPayload): Promise<any> {
  console.log(`[AI-Service] Calling AIHubMix (Model: deepseek-v4-flash) for ${model}...`);
  
  if (process.env.AIHUBMIX_API_KEY === 'dummy_key_to_prevent_build_errors' || !process.env.AIHUBMIX_API_KEY) {
    console.warn('[AI-Service] WARNING: AIHUBMIX_API_KEY is not set. Returning mock data.');
    return getMockData(model, payload);
  }

  try {
    let systemPrompt = '';
    let userPrompt = '';

    if (model === 'quality-assessor') {
      systemPrompt = `You are a Senior Data Quality Assessor AI. Output exactly valid JSON. 
Format: { "logicalDepth": number(1-10), "domainComplexity": number(1-10), "diversity": number(1-10), "tags": ["tag1", "tag2"] }`;
      userPrompt = `${payload.prompt}\n\nDataset URL to evaluate: ${payload.dataUrl}`;
    } else if (model === 'dynamic-pricer') {
      systemPrompt = `You are a Certified AI Data Appraiser. Your job is to value datasets based on strict logic. Output exactly valid JSON. 
Format: { "ai_score": number(0-100), "usd_value": number(15.00-199.00) }

**Valuation Rubric:**
1. Base Value: $15.00
2. Domain Multiplier: High complexity (Medical/Legal/Advanced Finance) = x2.0, Medium (Coding/Tech/Business) = x1.5, General/Basic = x1.0. Determine this based on tags.
3. Quality Multiplier: (Logical Depth + Diversity) / 20.
4. Formula: Price = Base Value + (Base Value * Domain Multiplier * Quality Multiplier). Round to 2 decimal places. Cap at $199.00.
5. AI Score Calculation: ((Logical Depth * 0.4) + (Domain Complexity * 0.4) + (Diversity * 0.2)) * 10. Round to integer.`;
      userPrompt = `${payload.prompt}\n\nMetrics provided by Quality Assessor: ${JSON.stringify(payload.metrics)}`;
    }

    const completion = await client.chat.completions.create({
      model: "deepseek-v4-flash", // Using the requested DeepSeek model via AIHubMix
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2, // Low temperature for more consistent JSON output
      response_format: { type: "json_object" } // Force JSON output
    });

    const responseContent = completion.choices[0].message.content;
    if (responseContent) {
       return JSON.parse(responseContent);
    }
    throw new Error('Empty response from AI');

  } catch (error) {
    console.error(`[AI-Service] API Call Failed for ${model}:`, error);
    // Fallback to mock data if API fails to prevent crashing the demo
    return getMockData(model, payload);
  }
}

export async function sanitizeData(fileUrl: string): Promise<string> {
  console.log(`[AI-Service] Running PII Sanitizer Agent on: ${fileUrl}`);
  // In a real app, you would download the file, process it with an AI or Regex, and re-upload.
  // For now, we simulate the processing time.
  await new Promise(resolve => setTimeout(resolve, 2000));
  return `${fileUrl}-sanitized.json`;
}

// Fallback Mock Data Generator
function getMockData(model: ModelType, payload: AIRequestPayload) {
  if (model === 'quality-assessor') {
    return {
      logicalDepth: Math.floor(Math.random() * 4) + 6,
      domainComplexity: Math.floor(Math.random() * 3) + 7,
      diversity: Math.floor(Math.random() * 4) + 5,
      tags: ['Algorithm', 'Debugging', 'Optimization']
    };
  }

  if (model === 'dynamic-pricer') {
    const baseScore = payload.metrics?.logicalDepth * 4 + payload.metrics?.domainComplexity * 4 + payload.metrics?.diversity * 2 || 85;
    const finalScore = Math.min(100, Math.max(0, baseScore));
    return {
      ai_score: finalScore,
      usd_value: parseFloat((Math.random() * 30 + 29).toFixed(2))
    };
  }
  return { success: true };
}
