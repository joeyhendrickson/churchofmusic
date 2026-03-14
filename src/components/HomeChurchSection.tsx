'use client'

import Link from 'next/link'
import Image from 'next/image'

const features = [
  {
    title: 'Host a Home Group',
    description: 'Make your home a gathering place for the body of Christ. Regular union and communion in home groups strengthens the church—and draws more people into worship. Register your home church, present music, and lead ceremonies that are 90% music and 10% reflection.',
    href: '/next-steps#home-groups',
  },
  {
    title: 'Gather in Union & Communion',
    description: 'Home groups are where we break bread, share our tables, and unite as one body. Come weekly. Bring your own drink and food. Workshop alongside artists as spiritual leaders. The more we gather, the more we grow—and the more others are drawn in.',
    href: '/experience/home-group',
  },
  {
    title: 'Worship Through Music',
    description: 'God moves through the power of music—inspiring faith, empowering righteousness, and drawing us into His presence. Attend regularly. Your presence matters. Each gathering builds the body and invites others to join.',
    href: '/beliefs',
  },
  {
    title: 'Support Artists as Spiritual Leaders',
    description: 'Membership donations (tithes) sustain our home groups and support artists directly—whom we acknowledge as spiritual leaders. Your giving fuels their ministry and keeps our doors open for more worship.',
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
          Union, Communion & Worship at Home Groups
        </h2>
        <p className="text-lg text-[#4a5568] text-center max-w-2xl mx-auto mb-12">
          The body of Christ gathers in homes—acoustic artists leading worship, people in union and communion. Come often. Bring others. Regular attendance builds community and draws more into worship. Join us.
        </p>

        {/* Home Group Visual */}
        <div className="relative rounded-xl overflow-hidden mb-16 aspect-[16/9] max-w-4xl mx-auto border-2 border-[#e2e8f0]">
          <Image
            src="/images/home-groups/home-group-worship-living-room.jpg"
            alt="Acoustic artist performing in a living room while people gather in worship at a Church of Music home group"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>
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
