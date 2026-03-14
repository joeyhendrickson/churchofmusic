'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface HomeGroupEvent {
  id: string
  title: string
  event_date: string
  start_time: string
  end_time: string
  artists: { name: string } | null
  home_church_leaders: { neighborhood: string; city: string } | null
}

const STANDARD_FORMAT = '45 min worship, 10 min sermon, 40 min worship'

function formatTime(t: string) {
  if (!t) return ''
  const parts = String(t).split(':')
  const hour = parseInt(parts[0], 10)
  const min = parts[1] || '00'
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const h12 = hour % 12 || 12
  return `${h12}:${min} ${ampm}`
}

export default function ApprovedHomeGroups() {
  const [events, setEvents] = useState<HomeGroupEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data } = await supabase
          .from('home_group_events')
          .select(`
            id,
            title,
            event_date,
            start_time,
            end_time,
            artists(name),
            home_church_leaders(neighborhood, city)
          `)
          .eq('status', 'approved')
          .gte('event_date', new Date().toISOString().slice(0, 10))
          .order('event_date', { ascending: true })
          .order('start_time', { ascending: true })
        setEvents(data || [])
      } catch {
        setEvents([])
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  if (loading) return null
  if (events.length === 0) return null

  return (
    <section className="py-16 px-4 bg-[#ffffff] border-t border-[#e2e8f0]" aria-labelledby="upcoming-home-groups-heading">
      <div className="container mx-auto max-w-4xl">
        <h2 id="upcoming-home-groups-heading" className="text-3xl font-bold text-[#1a1a1a] mb-8 text-center">
          Upcoming Home Groups
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((ev) => {
            const artistName = ev.artists && typeof ev.artists === 'object' && 'name' in ev.artists
              ? (ev.artists as { name: string }).name
              : 'Artist'
            const loc = ev.home_church_leaders
              ? `${(ev.home_church_leaders as any).neighborhood || ''}, ${(ev.home_church_leaders as any).city || ''}`.trim()
              : ''
            return (
              <article
                key={ev.id}
                className="bg-[#f7f7f5] rounded-xl p-6 border-2 border-[#e2e8f0]"
              >
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{ev.title}</h3>
                <p className="text-[#1b5e3f] font-semibold mb-2">{artistName}</p>
                {loc && <p className="text-[#4a5568] text-sm mb-2">{loc}</p>}
                <p className="text-[#4a5568] text-sm mb-2">
                  {new Date(ev.event_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} • {formatTime(ev.start_time)} – {formatTime(ev.end_time)}
                </p>
                <p className="text-[#4a5568] text-sm">Format: {STANDARD_FORMAT}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
