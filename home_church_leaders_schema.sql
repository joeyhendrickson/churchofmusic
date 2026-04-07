-- Home group locations (home_church_leaders) and Home Group Events Schema
-- Run this in Supabase SQL Editor
-- Adds: home_church_leaders table, home_group_events table, RLS policies

-- 1. Create home_church_leaders table
CREATE TABLE IF NOT EXISTS home_church_leaders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  city TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create home_group_events table (requests that become published events when approved)
CREATE TABLE IF NOT EXISTS home_group_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_church_leader_id UUID NOT NULL REFERENCES home_church_leaders(id) ON DELETE CASCADE,
  artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Standard format: 45 min worship, 10 min message, 40 min worship (stored as constant description)
COMMENT ON TABLE home_group_events IS 'Home group event requests. When approved, displayed on front page. Standard format: 45 min worship, 10 min message, 40 min worship.';

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_home_church_leaders_email ON home_church_leaders(email);
CREATE INDEX IF NOT EXISTS idx_home_church_leaders_status ON home_church_leaders(status);
CREATE INDEX IF NOT EXISTS idx_home_church_leaders_user_id ON home_church_leaders(user_id);
CREATE INDEX IF NOT EXISTS idx_home_group_events_status ON home_group_events(status);
CREATE INDEX IF NOT EXISTS idx_home_group_events_event_date ON home_group_events(event_date);
CREATE INDEX IF NOT EXISTS idx_home_group_events_home_church_leader_id ON home_group_events(home_church_leader_id);

-- 4. Enable RLS
ALTER TABLE home_church_leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_group_events ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies - home_church_leaders
-- Public can read approved home church leaders (for display)
CREATE POLICY "Public can read approved home church leaders" ON home_church_leaders
  FOR SELECT USING (status = 'approved');

-- Authenticated users can insert (signup)
CREATE POLICY "Anyone can insert home church leader signup" ON home_church_leaders
  FOR INSERT WITH CHECK (true);

-- Home church leaders can read their own record
CREATE POLICY "Home church leaders can read own record" ON home_church_leaders
  FOR SELECT USING (
    auth.uid() = user_id OR
    email = auth.jwt() ->> 'email'
  );

-- Admins can read all home church leaders (for admin dashboard)
CREATE POLICY "Admins can read all home church leaders" ON home_church_leaders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid() AND admin_users.is_active = true)
  );

-- 6. RLS Policies - home_group_events
-- Public can read approved events (for homepage)
CREATE POLICY "Public can read approved home group events" ON home_group_events
  FOR SELECT USING (status = 'approved');

-- Home church leaders can insert their own event requests
CREATE POLICY "Home church leaders can insert event requests" ON home_group_events
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM home_church_leaders hcl
      WHERE hcl.id = home_church_leader_id
      AND (hcl.user_id = auth.uid() OR hcl.email = auth.jwt() ->> 'email')
      AND hcl.status = 'approved'
    )
  );

-- Home church leaders can read their own event requests
CREATE POLICY "Home church leaders can read own events" ON home_group_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM home_church_leaders hcl
      WHERE hcl.id = home_church_leader_id
      AND (hcl.user_id = auth.uid() OR hcl.email = auth.jwt() ->> 'email')
    )
  );

-- Admins can read all home group events (for admin dashboard)
CREATE POLICY "Admins can read all home group events" ON home_group_events
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid() AND admin_users.is_active = true)
  );
