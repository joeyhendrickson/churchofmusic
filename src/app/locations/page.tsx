import Link from 'next/link'
import LocationsMapWrapper from '@/components/LocationsMapWrapper'

const locations = [
  { id: 'westerville', name: 'Westerville' },
  { id: 'grove-city', name: 'Grove City' },
  { id: 'downtown-columbus', name: 'Downtown Columbus' },
  { id: 'dublin', name: 'Dublin' },
  { id: 'new-albany', name: 'New Albany' },
]

export default function LocationsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="locations-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="locations-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            Locations
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-8">
            The Church of Music has home groups across the Columbus area. Union and communion happen when we gather regularly. Join us at a location near you—acoustic artists leading worship in homes, people in fellowship. Attend often. Your presence builds the body and draws others into worship.
          </p>

          <div className="mb-12" aria-label="Map of Church of Music locations in Columbus">
            <LocationsMapWrapper />
            <p className="text-sm text-[#4a5568] mt-2 text-center">
              Click a star to become a member
            </p>
          </div>

          <ul className="space-y-6" role="list">
            {locations.map((loc) => (
              <li key={loc.id}>
                <Link
                  href={`/locations/${loc.id}`}
                  className="block bg-[#ffffff] rounded-xl p-8 border-2 border-[#e2e8f0] hover:border-[#1b5e3f] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
                >
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">{loc.name}</h2>
                  <p className="text-[#4a5568]">Home groups and worship ceremonies. Learn more →</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
