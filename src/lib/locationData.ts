export interface ExampleEvent {
  id: string
  title: string
  date: string // YYYY-MM-DD
  startTime: string // HH:MM
  endTime: string
  artistName: string
  format: string
  addressHint: string
}

export interface LocationData {
  name: string
  description: string
  neighborhood?: string
  note?: string
  exampleEvents: ExampleEvent[]
}

function buildGoogleCalendarUrl(ev: ExampleEvent, locationName: string): string {
  const [y, m, d] = ev.date.split('-').map(Number)
  const [sh, sm] = ev.startTime.split(':').map(Number)
  const [eh, em] = ev.endTime.split(':').map(Number)
  // Assume Eastern time (UTC-5 non-DST, UTC-4 DST). Use UTC-4 for March onward.
  const offset = m >= 3 && m <= 10 ? 4 : 5
  const start = new Date(Date.UTC(y, m - 1, d, sh + offset, sm, 0))
  const end = new Date(Date.UTC(y, m - 1, d, eh + offset, em, 0))
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `Church of Music Home Group - ${locationName}\n${ev.artistName}\nFormat: ${ev.format}\n\nContact us for the full address.`,
    location: `${locationName}, Columbus, OH`,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export { buildGoogleCalendarUrl }

export const locations: Record<string, LocationData> = {
  westerville: {
    name: 'Westerville',
    neighborhood: 'Northeast Columbus',
    description:
      'Home groups and worship ceremonies in Westerville. Join us for 90% music, 10% pecha kucha–style message—bring your own drink, workshop alongside artists as spiritual leaders, and experience the power of music as worship. Come expectant for what God will do.',
    note: 'Contact us for full addresses and to RSVP for home groups.',
    exampleEvents: [
      {
        id: 'w1',
        title: 'Momentum Worship – Westerville',
        date: '2025-03-21',
        startTime: '19:00',
        endTime: '21:00',
        artistName: 'Acoustic trio',
        format: '45 min worship, 10 min message, 40 min worship',
        addressHint: 'Westerville home (address provided after RSVP)',
      },
      {
        id: 'w2',
        title: 'Friday Night House Worship',
        date: '2025-03-28',
        startTime: '19:00',
        endTime: '21:00',
        artistName: 'Piano & acoustic',
        format: '45 min worship, 10 min message, 40 min worship',
        addressHint: 'Westerville home (address provided after RSVP)',
      },
    ],
  },
  'grove-city': {
    name: 'Grove City',
    neighborhood: 'Southwest Columbus',
    description:
      'Home groups and worship ceremonies in Grove City. Worship leaders and spiritual leaders introduce artists—whom we acknowledge as spiritual leaders—and church members participate in worship that centers the power of music. Expect transformation.',
    note: 'Contact us for full addresses and to RSVP for home groups.',
    exampleEvents: [
      {
        id: 'g1',
        title: 'Saturday Evening Worship – Grove City',
        date: '2025-03-22',
        startTime: '18:00',
        endTime: '20:00',
        artistName: 'Folk duo',
        format: '45 min worship, 10 min message, 40 min worship',
        addressHint: 'Grove City home (address provided after RSVP)',
      },
      {
        id: 'g2',
        title: 'House Concert Worship',
        date: '2025-03-29',
        startTime: '18:00',
        endTime: '20:00',
        artistName: 'Acoustic trio',
        format: '45 min worship, 10 min message, 40 min worship',
        addressHint: 'Grove City home (address provided after RSVP)',
      },
    ],
  },
  'downtown-columbus': {
    name: 'Downtown Columbus',
    neighborhood: 'Downtown Columbus',
    description:
      'Home groups and worship ceremonies in Downtown Columbus. We host local and touring artists as spiritual leaders—partnered with Folk Alliance International—in worship ceremonies that are 90% music and 10% message. God moves through the power of music.',
    note: 'Contact us for full addresses and to RSVP for home groups.',
    exampleEvents: [
      {
        id: 'd1',
        title: 'Downtown Home Worship',
        date: '2025-03-23',
        startTime: '19:00',
        endTime: '21:00',
        artistName: 'Piano & vocals',
        format: '45 min worship, 10 min message, 40 min worship',
        addressHint: 'Downtown Columbus (address provided after RSVP)',
      },
      {
        id: 'd2',
        title: 'Sunday Evening House Concert',
        date: '2025-03-30',
        startTime: '19:00',
        endTime: '21:00',
        artistName: 'Touring artist',
        format: '45 min worship, 10 min message, 40 min worship',
        addressHint: 'Downtown Columbus (address provided after RSVP)',
      },
    ],
  },
  dublin: {
    name: 'Dublin',
    neighborhood: 'Northwest Columbus',
    description:
      'Home groups and worship ceremonies in Dublin. Experience spiritual revival through music. Artists present their spiritual journeys as developing and developed spiritual leaders in our community—come expectant for encounter and transformation.',
    note: 'Contact us for full addresses and to RSVP for home groups.',
    exampleEvents: [
      {
        id: 'db1',
        title: 'Dublin House Worship',
        date: '2025-03-21',
        startTime: '19:00',
        endTime: '21:00',
        artistName: 'Acoustic & piano',
        format: '45 min worship, 10 min message, 40 min worship',
        addressHint: 'Dublin home (address provided after RSVP)',
      },
      {
        id: 'db2',
        title: 'Friday Night Fellowship',
        date: '2025-03-28',
        startTime: '19:00',
        endTime: '21:00',
        artistName: 'Singer-songwriter',
        format: '45 min worship, 10 min message, 40 min worship',
        addressHint: 'Dublin home (address provided after RSVP)',
      },
    ],
  },
  'new-albany': {
    name: 'New Albany',
    neighborhood: 'Northeast Columbus',
    description:
      'Home groups and worship ceremonies in New Albany. We believe in mentorship, safety, acceptance, and the power of God to bring healing and breakthrough. Bring your own beverage and food to share as passover, unifying with the body of the church. Artists lead as spiritual leaders in our community.',
    note: 'Contact us for full addresses and to RSVP for home groups.',
    exampleEvents: [
      {
        id: 'na1',
        title: 'New Albany Home Group',
        date: '2025-03-22',
        startTime: '18:30',
        endTime: '20:30',
        artistName: 'Piano trio',
        format: '45 min worship, 10 min message, 40 min worship',
        addressHint: 'New Albany home (address provided after RSVP)',
      },
      {
        id: 'na2',
        title: 'Saturday Worship & Communion',
        date: '2025-03-29',
        startTime: '18:30',
        endTime: '20:30',
        artistName: 'Acoustic ensemble',
        format: '45 min worship, 10 min message, 40 min worship',
        addressHint: 'New Albany home (address provided after RSVP)',
      },
    ],
  },
}
