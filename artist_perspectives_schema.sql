-- Artist Perspectives Schema
-- Run in Supabase SQL Editor
-- Artists write prompts; AI generates articles; admin approves for publication on Perspectives page

CREATE TABLE IF NOT EXISTS artist_perspectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  title TEXT,
  excerpt TEXT,
  body TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_artist_perspectives_artist_id ON artist_perspectives(artist_id);
CREATE INDEX IF NOT EXISTS idx_artist_perspectives_status ON artist_perspectives(status);
CREATE INDEX IF NOT EXISTS idx_artist_perspectives_created_at ON artist_perspectives(created_at DESC);

-- RLS
ALTER TABLE artist_perspectives ENABLE ROW LEVEL SECURITY;

-- Artists can insert their own perspectives
CREATE POLICY "Artists can insert own perspectives" ON artist_perspectives
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM artists a WHERE a.id = artist_id AND a.email = auth.jwt() ->> 'email')
  );

-- Artists can read their own perspectives
CREATE POLICY "Artists can read own perspectives" ON artist_perspectives
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM artists a WHERE a.id = artist_id AND a.email = auth.jwt() ->> 'email')
  );

-- Public can read approved perspectives (for Perspectives page)
CREATE POLICY "Public can read approved perspectives" ON artist_perspectives
  FOR SELECT USING (status = 'approved');

-- Admins can read all, update status
CREATE POLICY "Admins can read all perspectives" ON artist_perspectives
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid() AND admin_users.is_active = true)
  );

CREATE POLICY "Admins can update perspective status" ON artist_perspectives
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid() AND admin_users.is_active = true)
  );
