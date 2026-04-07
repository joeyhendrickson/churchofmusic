'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

interface HomeChurchLeader {
  id: string
  name: string
  email: string
  address: string
  neighborhood: string
  city: string
  status: string
}

interface Artist {
  id: string
  name: string
  email: string
}

interface HomeGroupEvent {
  id: string
  title: string
  event_date: string
  start_time: string
  end_time: string
  status: string
  artists: { name: string } | null
}

const STANDARD_FORMAT = '45 min worship, 10 min message, 40 min worship'

export default function HomeChurchLeaderDashboard() {
  const router = useRouter()
  const [hcl, setHcl] = useState<HomeChurchLeader | null>(null)
  const [artists, setArtists] = useState<Artist[]>([])
  const [events, setEvents] = useState<HomeGroupEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestForm, setRequestForm] = useState({
    artist_id: '',
    title: '',
    event_date: '',
    start_time: '19:00',
    end_time: '21:00',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: hclData } = await supabase
      .from('home_church_leaders')
      .select('*')
      .eq('email', user.email)
      .single()

    if (!hclData || hclData.status !== 'approved') {
      router.push('/login')
      return
    }

    setHcl(hclData)
    await Promise.all([
      fetchArtists(),
      fetchEvents(hclData.id),
    ])
    setLoading(false)
  }

  const fetchArtists = async () => {
    const { data } = await supabase
      .from('artists')
      .select('id, name, email')
      .eq('status', 'approved')
    setArtists(data || [])
  }

  const fetchEvents = async (hclId: string) => {
    const { data } = await supabase
      .from('home_group_events')
      .select(`
        id,
        title,
        event_date,
        start_time,
        end_time,
        status,
        artists(name)
      `)
      .eq('home_church_leader_id', hclId)
      .order('event_date', { ascending: true })
    setEvents(data || [])
  }

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hcl) return
    setError('')
    setSubmitting(true)

    try {
      const { error: insertError } = await supabase
        .from('home_group_events')
        .insert({
          home_church_leader_id: hcl.id,
          artist_id: requestForm.artist_id,
          title: requestForm.title,
          event_date: requestForm.event_date,
          start_time: requestForm.start_time,
          end_time: requestForm.end_time,
          status: 'pending',
        })

      if (insertError) {
        setError(insertError.message)
        setSubmitting(false)
        return
      }

      setShowRequestForm(false)
      setRequestForm({ artist_id: '', title: '', event_date: '', start_time: '19:00', end_time: '21:00' })
      await fetchEvents(hcl.id)
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  const formatTime = (t: string) => {
    if (!t) return ''
    const [h, m] = t.split(':')
    const hour = parseInt(h, 10)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const h12 = hour % 12 || 12
    return `${h12}:${m || '00'} ${ampm}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f7f5] p-6">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-[#e2e8f0] rounded w-1/3 mb-6"></div>
          <div className="h-32 bg-[#e2e8f0] rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Home Group Location Dashboard</h1>
        <p className="text-[#4a5568] mb-8">
          {hcl?.name}, {hcl?.neighborhood}, {hcl?.city}
        </p>

        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 mb-8">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Request to Host an Artist</h2>
          <p className="text-[#4a5568] mb-4">
            Select an artist and propose a date and time for your home group. Admin will review and approve. Standard format: {STANDARD_FORMAT}. Typical time: 7–9 PM (adjustable).
          </p>
          <button
            onClick={() => setShowRequestForm(!showRequestForm)}
            className="bg-[#1b5e3f] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#144d32] transition-colors"
          >
            {showRequestForm ? 'Cancel' : 'New Event Request'}
          </button>

          {showRequestForm && (
            <form onSubmit={handleSubmitRequest} className="mt-6 space-y-4 p-4 bg-[#f7f7f5] rounded-lg">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Artist</label>
                <select
                  required
                  value={requestForm.artist_id}
                  onChange={(e) => setRequestForm({ ...requestForm, artist_id: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-[#1a1a1a]"
                >
                  <option value="">Select an artist</option>
                  {artists.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Worship Night with [Artist]"
                  value={requestForm.title}
                  onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-[#1a1a1a]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={requestForm.event_date}
                  onChange={(e) => setRequestForm({ ...requestForm, event_date: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-[#1a1a1a]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Start Time</label>
                  <input
                    type="time"
                    required
                    value={requestForm.start_time}
                    onChange={(e) => setRequestForm({ ...requestForm, start_time: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-[#1a1a1a]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1">End Time</label>
                  <input
                    type="time"
                    required
                    value={requestForm.end_time}
                    onChange={(e) => setRequestForm({ ...requestForm, end_time: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-[#1a1a1a]"
                  />
                </div>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#1b5e3f] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#144d32] disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit for Admin Approval'}
              </button>
            </form>
          )}
        </div>

        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Your Event Requests</h2>
          {events.length === 0 ? (
            <p className="text-[#4a5568]">No event requests yet. Create one above.</p>
          ) : (
            <ul className="space-y-4">
              {events.map((ev) => {
                const artistName = ev.artists && typeof ev.artists === 'object' && 'name' in ev.artists
                  ? (ev.artists as { name: string }).name
                  : 'Unknown Artist'
                return (
                  <li key={ev.id} className="flex justify-between items-start p-4 bg-[#f7f7f5] rounded-lg">
                    <div>
                      <p className="font-semibold text-[#1a1a1a]">{ev.title}</p>
                      <p className="text-[#4a5568] text-sm">{artistName}</p>
                      <p className="text-[#4a5568] text-sm">
                        {new Date(ev.event_date).toLocaleDateString()} • {formatTime(ev.start_time)} – {formatTime(ev.end_time)}
                      </p>
                      <p className="text-sm mt-1">
                        Format: {STANDARD_FORMAT}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      ev.status === 'approved' ? 'bg-green-100 text-green-800' :
                      ev.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {ev.status}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
