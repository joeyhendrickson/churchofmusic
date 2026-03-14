export default function LocationsPage() {
  const locations = [
    { id: 'westerville', name: 'Westerville', description: 'Home groups and worship ceremonies in Westerville.' },
    { id: 'grove-city', name: 'Grove City', description: 'Home groups and worship ceremonies in Grove City.' },
    { id: 'downtown-columbus', name: 'Downtown Columbus', description: 'Home groups and worship ceremonies in Downtown Columbus.' },
    { id: 'dublin', name: 'Dublin', description: 'Home groups and worship ceremonies in Dublin.' },
    { id: 'new-albany', name: 'New Albany', description: 'Home groups and worship ceremonies in New Albany.' },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="locations-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="locations-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            Locations
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-12">
            The Church of Music has home groups across the Columbus area. Join us at a location near you or register to host a home group in your community.
          </p>

          <ul className="space-y-8" role="list">
            {locations.map((loc) => (
              <li key={loc.id} id={loc.id} className="scroll-mt-24">
                <article className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">{loc.name}</h2>
                  <p className="text-[#4a5568]">{loc.description}</p>
                  <p className="text-[#4a5568] mt-2 text-sm">
                    Contact us for specific meeting times and addresses.
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
