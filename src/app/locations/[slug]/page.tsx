import Link from 'next/link'
import { notFound } from 'next/navigation'
import { locations, buildGoogleCalendarUrl } from '@/lib/locationData'

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

function formatTime(time: string) {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const location = locations[slug]

  if (!location) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="location-heading">
        <div className="container mx-auto max-w-3xl">
          <Link href="/locations" className="text-[#1b5e3f] font-semibold hover:underline mb-6 inline-block">
            ← All Locations
          </Link>
          <h1 id="location-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            {location.name}
          </h1>
          {location.neighborhood && (
            <p className="text-lg text-[#4a5568] mb-8">{location.neighborhood}</p>
          )}
          <p className="text-lg text-[#4a5568] leading-relaxed mb-6">
            {location.description}
          </p>
          <p className="text-[#4a5568] text-sm mb-10">
            {location.note}
          </p>

          {/* Upcoming Home Groups */}
          {location.exampleEvents.length > 0 && (
            <section className="mb-12" aria-labelledby="upcoming-heading">
              <h2 id="upcoming-heading" className="text-2xl font-bold text-[#1a1a1a] mb-6">
                Upcoming Home Groups
              </h2>
              <ul className="space-y-6" role="list">
                {location.exampleEvents.map((ev) => {
                  const calendarUrl = buildGoogleCalendarUrl(ev, location.name)
                  return (
                    <li
                      key={ev.id}
                      className="bg-[#ffffff] rounded-xl p-6 border-2 border-[#e2e8f0]"
                    >
                      <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{ev.title}</h3>
                      <p className="text-[#4a5568] font-medium mb-1">
                        {formatEventDate(ev.date)} · {formatTime(ev.startTime)}–{formatTime(ev.endTime)}
                      </p>
                      <p className="text-[#4a5568] text-sm mb-2">{ev.artistName}</p>
                      <p className="text-[#4a5568] text-sm mb-1">{ev.format}</p>
                      <p className="text-[#4a5568] text-sm mb-4">{ev.addressHint}</p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={calendarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-[#1b5e3f] text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 text-sm"
                        >
                          Add to Calendar
                        </a>
                        <Link
                          href="/report-issue"
                          className="inline-block bg-[#ffffff] text-[#1a1a1a] border-2 border-[#1b5e3f] font-semibold py-2.5 px-5 rounded-lg hover:bg-[#f7f7f5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 text-sm"
                        >
                          RSVP / Get Address
                        </Link>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          <div className="flex flex-wrap gap-4">
            <Link
              href="/report-issue"
              className="inline-block bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
            >
              Contact Us
            </Link>
            <Link
              href="/give#member"
              className="inline-block bg-[#ffffff] text-[#1a1a1a] border-2 border-[#1b5e3f] font-semibold py-3 px-6 rounded-lg hover:bg-[#f7f7f5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
            >
              Become a Church Member
            </Link>
            <Link
              href="/next-steps#home-groups"
              className="inline-block bg-[#ffffff] text-[#1a1a1a] border-2 border-[#1b5e3f] font-semibold py-3 px-6 rounded-lg hover:bg-[#f7f7f5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
            >
              Host a Home Group Here
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
