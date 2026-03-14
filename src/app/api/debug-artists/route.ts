import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  try {
    console.log('Debug: Testing artists database connection...')
    
    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('artists')
      .select('count')
      .limit(1)
    
    console.log('Debug: Test query result:', { testData, testError })
    
    // Get all artists
    const { data: artists, error } = await supabase
      .from('artists')
      .select('*')
      .order('name')
    
    console.log('Debug: Artists query result:', { 
      artistsCount: artists?.length || 0, 
      artists: artists?.slice(0, 3), // First 3 for debugging
      error 
    })
    
    if (error) {
      console.error('Debug: Database error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      artistsCount: artists?.length || 0,
      artists: artists || [],
      testData,
      testError
    })
    
  } catch (error) {
    console.error('Debug: Unexpected error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected error occurred',
      details: error
    }, { status: 500 })
  }
}

