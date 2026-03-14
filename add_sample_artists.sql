-- Add sample artists to the database
-- Run this in Supabase SQL Editor

-- Insert sample artists if they don't already exist
INSERT INTO artists (id, name, bio, image_url, spotify_url, soundcloud_url, website_url, email, status, created_at, updated_at)
VALUES 
  (
    gen_random_uuid(),
    'Joey Hendrickson',
    'Alternative acoustic artist from Columbus, Ohio. Known for intimate live performances and heartfelt songwriting.',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    'https://open.spotify.com/artist/joeyhendrickson',
    'https://soundcloud.com/joeyhendrickson',
    'https://joeyhendrickson.com',
    'joey@launchthatsong.com',
    'approved',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Douggert',
    'Punk electronica and EDM producer pushing the boundaries of electronic music with raw energy and innovative sound design.',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
    'https://open.spotify.com/artist/douggert',
    'https://soundcloud.com/douggert',
    'https://douggert.com',
    'douggert@launchthatsong.com',
    'approved',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Columbus Songwriters Association',
    'A collective of talented songwriters from the Columbus area, showcasing the diverse musical talent of central Ohio.',
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
    'https://open.spotify.com/artist/columbussongwriters',
    'https://soundcloud.com/columbussongwriters',
    'https://columbussongwriters.org',
    'csa@launchthatsong.com',
    'approved',
    NOW(),
    NOW()
  )
ON CONFLICT (name) DO NOTHING;

-- Verify the artists were added
SELECT id, name, email, status, created_at FROM artists ORDER BY name;

