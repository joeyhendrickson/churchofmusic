import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
const supabaseAdmin = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseServiceKey !== 'placeholder_key'
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, message: 'Database connection not available' }, { status: 503 })
    }
    const body = await request.json()
    const { home_church_leader_id, action } = body

    if (!home_church_leader_id || !action) {
      return NextResponse.json(
        { success: false, message: 'Missing home_church_leader_id or action' },
        { status: 400 }
      )
    }
    if (!['approved', 'rejected'].includes(action)) {
      return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('home_church_leaders')
      .update({ status: action, updated_at: new Date().toISOString() })
      .eq('id', home_church_leader_id)

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: `Home church leader ${action}` })
  } catch (error) {
    console.error('Approve home church error:', error)
    return NextResponse.json({ success: false, message: 'An unexpected error occurred' }, { status: 500 })
  }
}
