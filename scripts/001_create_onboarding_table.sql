-- Create onboarding_data table to store user information from onboarding
CREATE TABLE IF NOT EXISTS onboarding_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  referral_code TEXT UNIQUE, -- Added referral_code column to store user's unique referral code
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE onboarding_data ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert their onboarding data
CREATE POLICY "Allow anonymous insert onboarding data"
  ON onboarding_data
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to read referral codes (needed for referral tracking)
CREATE POLICY "Allow anonymous read referral codes"
  ON onboarding_data
  FOR SELECT
  TO anon
  USING (true);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_onboarding_email ON onboarding_data(email);

-- Create index on created_at for analytics
CREATE INDEX IF NOT EXISTS idx_onboarding_created_at ON onboarding_data(created_at);

-- Create index on referral_code for faster lookups
CREATE INDEX IF NOT EXISTS idx_onboarding_referral_code ON onboarding_data(referral_code);
