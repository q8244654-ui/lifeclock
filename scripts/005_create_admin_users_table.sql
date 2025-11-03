-- Admin users table for dashboard authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow server-side API to read admin users for authentication
-- Only allow SELECT from service role (used by API route)
CREATE POLICY "Allow service role to read admin users"
  ON admin_users
  FOR SELECT
  TO service_role
  USING (true);

-- Allow authenticated users to read (for server-side checks)
CREATE POLICY "Allow authenticated to read admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default admin user
-- Password: "123" hashed with SHA-256
-- Hash généré avec: echo -n "123" | shasum -a 256
-- Résultat: a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3')
ON CONFLICT (username) DO NOTHING;

-- Create index on username for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

