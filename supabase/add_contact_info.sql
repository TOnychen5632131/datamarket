-- Add contact and mailing info to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS mailing_address TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS real_name TEXT;

-- Add check status to datasets
ALTER TABLE public.datasets
ADD COLUMN IF NOT EXISTS check_status TEXT DEFAULT 'pending_review' 
CHECK (check_status IN ('pending_review', 'approved', 'mailed', 'delivered', 'cancelled'));
