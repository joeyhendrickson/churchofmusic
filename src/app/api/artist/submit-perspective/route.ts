import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req: NextRequest) {
  try {
    if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseKey === 'placeholder_key') {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: artist } = await supabase
      .from('artists')
      .select('id')
      .eq('email', user.email)
      .single()
    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 403 })
    }

    const body = await req.json()
    const { prompt, title, excerpt, articleBody } = body
    if (!prompt || !title || !excerpt || !articleBody) {
      return NextResponse.json(
        { error: 'prompt, title, excerpt, and articleBody are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('artist_perspectives')
      .insert({
        artist_id: artist.id,
        prompt,
        title: String(title).trim(),
        excerpt: String(excerpt).trim(),
        body: String(articleBody).trim(),
        status: 'pending',
      })
      .select('id')
      .single()

    if (error) {
      console.error('submit-perspective error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to submit' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (err) {
    console.error('submit-perspective error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
