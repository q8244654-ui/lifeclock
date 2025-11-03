-- Conversions table for funnel tracking (page_visit, email_given, quiz_complete, payment_complete)
CREATE TABLE IF NOT EXISTS conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL CHECK (event_type IN ('page_visit','email_given','quiz_complete','payment_complete')),
  email TEXT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for analytics
CREATE INDEX IF NOT EXISTS idx_conversions_event_type ON conversions(event_type);
CREATE INDEX IF NOT EXISTS idx_conversions_email ON conversions(email);
CREATE INDEX IF NOT EXISTS idx_conversions_session_id ON conversions(session_id);
CREATE INDEX IF NOT EXISTS idx_conversions_created_at ON conversions(created_at);

-- Enable Row Level Security
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow anonymous inserts from the client (tracking events)
CREATE POLICY "Allow anon insert conversions"
  ON conversions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (e.g., admin dashboards) to SELECT
CREATE POLICY "Allow authenticated select conversions"
  ON conversions
  FOR SELECT
  TO authenticated
  USING (true);

-- Enable Realtime replication
ALTER PUBLICATION supabase_realtime ADD TABLE conversions;


