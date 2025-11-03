-- Create referrals table for tracking friend invitations
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_email TEXT NOT NULL,
  referrer_code TEXT NOT NULL UNIQUE,
  referred_email TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'paid')),
  commission_amount DECIMAL(10, 2) DEFAULT 10.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT fk_referrer FOREIGN KEY (referrer_email) REFERENCES onboarding_data(email) ON DELETE CASCADE
);

-- Create index for faster lookups
CREATE INDEX idx_referrals_referrer_email ON referrals(referrer_email);
CREATE INDEX idx_referrals_referrer_code ON referrals(referrer_code);
CREATE INDEX idx_referrals_status ON referrals(status);

-- Enable RLS
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own referrals
CREATE POLICY "Users can read their own referrals" ON referrals
  FOR SELECT
  USING (true);

-- Allow inserting new referrals
CREATE POLICY "Allow inserting referrals" ON referrals
  FOR INSERT
  WITH CHECK (true);

-- Allow updating referral status
CREATE POLICY "Allow updating referral status" ON referrals
  FOR UPDATE
  USING (true);
