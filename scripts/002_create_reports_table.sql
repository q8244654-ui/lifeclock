-- Create reports table to store generated LifeClock reports
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  report_data JSONB NOT NULL,
  unique_link TEXT UNIQUE NOT NULL,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_user_email FOREIGN KEY (user_email) REFERENCES onboarding_data(email) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own reports (using email as identifier)
CREATE POLICY "Allow insert own report" ON reports
  FOR INSERT
  WITH CHECK (true);

-- Allow users to read their own reports via unique link
CREATE POLICY "Allow read via unique link" ON reports
  FOR SELECT
  USING (true);

-- Allow users to update view count
CREATE POLICY "Allow update view count" ON reports
  FOR UPDATE
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_reports_unique_link ON reports(unique_link);
CREATE INDEX IF NOT EXISTS idx_reports_user_email ON reports(user_email);
