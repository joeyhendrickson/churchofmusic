import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, address, neighborhood, city } = body

    if (!email || !password || !name || !address || !neighborhood || !city) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: email, password, name, address, neighborhood, city' },
        { status: 400 }
      )
    }

    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${request.nextUrl.origin}/login` },
    })

    if (authError) {
      return NextResponse.json(
        { success: false, message: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { success: false, message: 'Failed to create user' },
        { status: 500 }
      )
    }

    // 2. Insert home_church_leader record (status: pending)
    const { error: insertError } = await supabase
      .from('home_church_leaders')
      .insert({
        user_id: authData.user.id,
        email,
        name,
        address,
        neighborhood,
        city,
        status: 'pending',
      })

    if (insertError) {
      // Auth user was created but DB insert failed - user can try logging in and we could add logic to retry
      return NextResponse.json(
        { success: false, message: insertError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Home Group Location account created. Please check your email to confirm. Once confirmed, you can log in. Your request to be approved as a home group is pending admin review.',
    })
  } catch (error) {
    console.error('Home church signup error:', error)
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
