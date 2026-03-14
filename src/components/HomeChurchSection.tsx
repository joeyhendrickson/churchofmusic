'use client'

import Link from 'next/link'

const features = [
  {
    title: 'Host a Home Group',
    description: 'Register your home church as a home group on this site. Present music to church members and lead worship ceremonies that are 90% music and 10% pecha kucha–style reflection on how God works through music.',
    href: '/next-steps#home-groups',
  },
  {
    title: 'Workshop With Artists',
    description: 'Church members attend home groups and workshop alongside artists. Worship leaders and spiritual leaders from established churches introduce artists, who we recognize as spiritual leaders in our community.',
    href: '/experience/home-group',
  },
  {
    title: 'Worship Through Music',
    description: 'Bring your own drink and participate in worship ceremonies centered on music. We believe God works through the power of music to inspire faith, empower righteousness, and bring people closer to the presence of God.',
    href: '/beliefs',
  },
  {
    title: 'Support Artists',
    description: 'Membership donations (tithes) sustain our home groups and support artists directly. We believe in the direct support of artists who lead worship in our community.',
    href: '/give',
  },
]

export default function HomeChurchSection() {
  return (
    <section
      id="home-church"
      className="py-16 md:py-24 px-4 bg-[#ffffff]"
      aria-labelledby="home-church-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 id="home-church-heading" className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 text-center">
          Host a Church of Music Home Group
        </h2>
        <p className="text-lg text-[#4a5568] text-center max-w-2xl mx-auto mb-12">
          Home churches across the USA put on religious services with the belief that God works through music. Join us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="block bg-[#f7f7f5] rounded-xl p-8 border-2 border-transparent hover:border-[#1b5e3f] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
            >
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">{feature.title}</h3>
              <p className="text-[#4a5568] leading-relaxed">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
