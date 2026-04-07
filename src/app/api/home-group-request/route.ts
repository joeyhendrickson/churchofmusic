import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { home_church_leader_id, artist_id, title, event_date, start_time, end_time } = body

    if (!home_church_leader_id || !artist_id || !title || !event_date || !start_time || !end_time) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: home_church_leader_id, artist_id, title, event_date, start_time, end_time' },
        { status: 400 }
      )
    }

    // Verify user is the home church leader and is approved
    const { data: hcl, error: hclError } = await supabase
      .from('home_church_leaders')
      .select('id, status')
      .eq('id', home_church_leader_id)
      .single()

    if (hclError || !hcl) {
      return NextResponse.json({ success: false, message: 'Home group location not found' }, { status: 404 })
    }
    if (hcl.status !== 'approved') {
      return NextResponse.json({ success: false, message: 'Your home group must be approved before submitting event requests' }, { status: 403 })
    }

    const { error } = await supabase
      .from('home_group_events')
      .insert({
        home_church_leader_id,
        artist_id,
        title,
        event_date,
        start_time,
        end_time,
        status: 'pending',
      })

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Event request submitted for admin approval.' })
  } catch (error) {
    console.error('Home group request error:', error)
    return NextResponse.json({ success: false, message: 'An unexpected error occurred' }, { status: 500 })
  }
}
