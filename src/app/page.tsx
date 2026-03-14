'use client'

import Link from 'next/link'
import HomeChurchSection from '@/components/HomeChurchSection'
import ApprovedHomeGroups from '@/components/ApprovedHomeGroups'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1b5e3f] text-[#ffffff] py-16 md:py-24 px-4" aria-labelledby="hero-heading">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            The United States Church of Music
          </h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto mb-8">
            Spiritual revival through home churches across the country. We believe God works through the power of music.
          </p>
          <Link
            href="/next-steps#home-groups"
            className="inline-block bg-[#ffffff] text-[#1b5e3f] font-bold py-4 px-8 rounded-lg hover:bg-[#f7f7f5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b5e3f]"
          >
            Host a Church of Music Home Group
          </Link>
        </div>
      </section>

      {/* Approved Home Groups (from DB) */}
      <ApprovedHomeGroups />

      {/* Home Group CTA Banner */}
      <section className="bg-[#b8860b] text-[#1a1a1a] py-6 px-4" aria-labelledby="cta-heading">
        <div className="container mx-auto text-center">
          <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-2">
            Host a Church of Music Home Group
          </h2>
          <p className="text-lg opacity-95 max-w-2xl mx-auto">
            Home churches can register on this site as home groups. Present music to church members and host worship ceremonies that are 90% music and 10% talk.
          </p>
          <Link
            href="/next-steps#home-groups"
            className="inline-block mt-4 bg-[#1a1a1a] text-[#ffffff] font-semibold py-3 px-6 rounded-lg hover:bg-[#2d3748] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2"
          >
            Learn How to Host
          </Link>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="what-heading">
        <div className="container mx-auto max-w-4xl">
          <h2 id="what-heading" className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-8 text-center">
            Worship Through Music
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Home Groups</h3>
              <p className="text-[#4a5568] leading-relaxed">
                Worship leaders and spiritual leaders from established churches introduce artists at our home groups. Church members attend, bring their own drink, and participate in worship ceremonies that are 90% music and 10% pecha kucha–style sermons about how God works through music.
              </p>
            </div>
            <div className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Local & Touring Artists</h3>
              <p className="text-[#4a5568] leading-relaxed">
                We host local and touring artists in our worship ceremonies. We are partnered with Folk Alliance International. Artists are recognized as spiritual leaders in our community, and we invite them to present their spiritual journeys during our home groups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Home Group CTA repeated */}
      <section className="py-12 px-4 bg-[#1a1a1a] text-[#ffffff]" aria-labelledby="host-heading">
        <div className="container mx-auto text-center">
          <h2 id="host-heading" className="text-2xl md:text-3xl font-bold mb-4">
            Host a Church of Music Home Group
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
            Register your home church as a home group. Workshop alongside artists and church members in worship that centers the power of music.
          </p>
          <Link
            href="/next-steps#home-groups"
            className="inline-block bg-[#1b5e3f] text-[#ffffff] font-bold py-3 px-8 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Home Church section */}
      <HomeChurchSection />

      {/* Beliefs preview */}
      <section className="py-16 px-4" aria-labelledby="beliefs-heading">
        <div className="container mx-auto max-w-4xl">
          <h2 id="beliefs-heading" className="text-3xl font-bold text-[#1a1a1a] mb-6 text-center">
            Our Beliefs
          </h2>
          <p className="text-[#4a5568] text-lg text-center max-w-2xl mx-auto mb-8">
            We believe the Holy Spirit works through music, inspiring faith and empowering righteousness. Our beliefs are rooted in Biblical scripture about music as worship and connection with God.
          </p>
          <div className="text-center">
            <Link
              href="/beliefs"
              className="inline-block text-[#1b5e3f] font-semibold underline underline-offset-4 hover:text-[#144d32] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 rounded"
            >
              Read Our Beliefs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
