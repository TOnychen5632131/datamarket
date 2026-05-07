-- DataMarket Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Extending Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'seller' CHECK (role IN ('seller', 'buyer', 'admin')),
    wallet_balance NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Datasets Table
CREATE TABLE IF NOT EXISTS public.datasets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    language TEXT DEFAULT 'English',
    message_count INTEGER DEFAULT 0,
    file_url TEXT NOT NULL, -- Original uploaded file
    sanitized_url TEXT,     -- Cleaned file after Agent 1
    
    -- Pricing & Scoring
    price NUMERIC(10, 2),
    ai_score NUMERIC(5, 2),
    metrics JSONB, -- Stores Logical Depth, Complexity, Diversity from Agent 2
    
    status TEXT DEFAULT 'processing' CHECK (status IN ('draft', 'processing', 'published', 'rejected')),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Transactions Table (Purchases)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    buyer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    dataset_id UUID REFERENCES public.datasets(id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL,
    stripe_session_id TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Public can view published datasets
CREATE POLICY "Public can view published datasets" 
ON public.datasets FOR SELECT 
USING (status = 'published');

-- Sellers can manage their own datasets
CREATE POLICY "Sellers can insert their datasets" 
ON public.datasets FOR INSERT 
WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their datasets" 
ON public.datasets FOR UPDATE 
USING (auth.uid() = seller_id);

-- Enterprise Lead Generation Table
CREATE TABLE IF NOT EXISTS purchase_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dataset_id TEXT NOT NULL,
  dataset_title TEXT,
  buyer_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  use_case TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
