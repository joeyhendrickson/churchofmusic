import { createClient } from '@supabase/supabase-js'

// Use placeholders at build time (e.g. Vercel) when env vars may be unavailable
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

export const supabase = createClient(supabaseUrl, supabaseKey)