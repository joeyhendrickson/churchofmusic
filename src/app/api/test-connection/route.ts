import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test basic connectivity
    const response = await fetch('https://cvyddwvselabwskbegvz.supabase.co/rest/v1/', {
      method: 'GET',
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    })
    
    console.log('Connection test response status:', response.status)
    
    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Supabase connection successful',
        status: response.status
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Supabase connection failed',
        status: response.status,
        statusText: response.statusText
      })
    }
    
  } catch (error) {
    console.error('Connection test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Connection test failed',
      details: error
    }, { status: 500 })
  }
}

