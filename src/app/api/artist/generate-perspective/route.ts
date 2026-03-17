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
      .select('id, name')
      .eq('email', user.email)
      .single()
    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 403 })
    }

    const { prompt } = await req.json()
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      )
    }

    const systemPrompt = `You are writing for the Church of Music, a community that believes God works through the power of music. Artists share spiritual perspectives about how God has worked through music in their lives.

Write a full, well-structured article (600-1200 words) based on the artist's prompt. The article should:
- Be personal and reflective, drawing from the artist's experiences and stories
- Reflect on how God works through music—all genres, not just "Christian" music
- Include moments of healing, encounter, transformation, or connection
- Be warm, charismatic, and accessible
- Have a clear title, a 2-3 sentence excerpt, and a full body with logical paragraphs
- Avoid generic platitudes; use concrete examples and narrative where possible

Output valid JSON with exactly these keys:
{
  "title": "A clear, engaging title",
  "excerpt": "2-3 sentence summary for the listing page",
  "body": "Full article text with paragraphs separated by double newlines. Can use **bold** for emphasis."
}`

    const completionRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    })

    if (!completionRes.ok) {
      const err = await completionRes.json().catch(() => ({}))
      console.error('OpenAI error:', err)
      return NextResponse.json(
        { error: 'Failed to generate article' },
        { status: 500 }
      )
    }

    const data = await completionRes.json()
    const content = data.choices?.[0]?.message?.content
    if (!content) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      )
    }

    let parsed: { title?: string; excerpt?: string; body?: string }
    try {
      const cleaned = content.replace(/```json\n?|\n?```/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch {
      return NextResponse.json(
        { error: 'Invalid AI response format' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      title: parsed.title || 'Untitled',
      excerpt: parsed.excerpt || '',
      body: parsed.body || '',
    })
  } catch (err) {
    console.error('generate-perspective error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
