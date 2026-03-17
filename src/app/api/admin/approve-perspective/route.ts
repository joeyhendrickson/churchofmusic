import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
const supabase =
  supabaseUrl !== 'https://placeholder.supabase.co' && supabaseServiceKey !== 'placeholder_key'
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null

export async function POST(req: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      )
    }
    const { perspectiveId, action } = await req.json()
    if (!perspectiveId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'perspectiveId and action (approve|reject) required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('artist_perspectives')
      .update({
        status: action === 'approve' ? 'approved' : 'rejected',
        updated_at: new Date().toISOString(),
      })
      .eq('id', perspectiveId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('approve-perspective error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
