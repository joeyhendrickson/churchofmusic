import Link from 'next/link'
import { notFound } from 'next/navigation'

const locations: Record<string, { name: string; description: string; neighborhood?: string; note?: string }> = {
  westerville: {
    name: 'Westerville',
    description: 'Home groups and worship ceremonies in Westerville. Join us for 90% music, 10% pecha kucha–style reflection—bring your own drink, workshop alongside artists as spiritual leaders, and experience the power of music as worship. Come expectant for what the Spirit will do.',
    neighborhood: 'Northeast Columbus',
    note: 'Contact us for specific meeting times, addresses, and upcoming home group events.',
  },
  'grove-city': {
    name: 'Grove City',
    description: 'Home groups and worship ceremonies in Grove City. Worship leaders and spiritual leaders introduce artists—whom we acknowledge as spiritual leaders—and church members participate in worship that centers the power of music. Expect transformation.',
    neighborhood: 'Southwest Columbus',
    note: 'Contact us for specific meeting times, addresses, and upcoming home group events.',
  },
  'downtown-columbus': {
    name: 'Downtown Columbus',
    description: 'Home groups and worship ceremonies in Downtown Columbus. We host local and touring artists as spiritual leaders—partnered with Folk Alliance International—in worship ceremonies that are 90% music and 10% talk. God moves through the power of music.',
    neighborhood: 'Downtown Columbus',
    note: 'Contact us for specific meeting times, addresses, and upcoming home group events.',
  },
  dublin: {
    name: 'Dublin',
    description: 'Home groups and worship ceremonies in Dublin. Experience spiritual revival through music. Artists present their spiritual journeys as developing and developed spiritual leaders in our community—come expectant for encounter and transformation.',
    neighborhood: 'Northwest Columbus',
    note: 'Contact us for specific meeting times, addresses, and upcoming home group events.',
  },
  'new-albany': {
    name: 'New Albany',
    description: 'Home groups and worship ceremonies in New Albany. We believe in mentorship, safety, acceptance, and the power of the Spirit to bring healing and breakthrough. Bring your own beverage and food to share as passover, unifying with the body of the church. Artists lead as spiritual leaders in our community.',
    neighborhood: 'Northeast Columbus',
    note: 'Contact us for specific meeting times, addresses, and upcoming home group events.',
  },
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
          <p className="text-[#4a5568] text-sm mb-8">
            {location.note}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/report-issue"
              className="inline-block bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
            >
              Contact Us
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
