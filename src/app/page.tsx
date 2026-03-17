'use client'

import Link from 'next/link'
import Image from 'next/image'
import HomeChurchSection from '@/components/HomeChurchSection'
import ApprovedHomeGroups from '@/components/ApprovedHomeGroups'
import ArtistsAsLeadersSection from '@/components/ArtistsAsLeadersSection'

export default function Home() {
  return (
    <div>
      {/* First Time? */}
      <section className="bg-[#f7f7f5] py-8 px-4 border-b border-[#e2e8f0]" aria-labelledby="first-time-heading">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 id="first-time-heading" className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-4">
            First time here?
          </h2>
          <p className="text-[#4a5568] max-w-2xl mx-auto mb-6">
            Come expectant. God is moving through the power of music—awakening hearts, transforming lives, and drawing us into His presence. Find a home group near you and come regularly. Union and communion in the body of God grows when we gather often. The Spirit is at work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations"
              className="inline-block bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
            >
              Find a Home Group Near You
            </Link>
            <Link
              href="/experience/online"
              className="inline-block bg-[#ffffff] text-[#1a1a1a] border-2 border-[#1b5e3f] font-semibold py-3 px-6 rounded-lg hover:bg-[#f7f7f5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
            >
              Church Online
            </Link>
            <Link
              href="/next-steps"
              className="inline-block bg-[#ffffff] text-[#1a1a1a] border-2 border-[#1b5e3f] font-semibold py-3 px-6 rounded-lg hover:bg-[#f7f7f5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
            >
              Next Steps
            </Link>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-[#1b5e3f] text-[#ffffff] py-16 md:py-24 px-4" aria-labelledby="hero-heading">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            The United States<br />
            Church of Music
          </h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto mb-8">
            Spiritual revival through home churches across the country. God is moving through music—and we believe the Holy Spirit empowers artists as spiritual leaders in our community to lead us into encounter with Him.
          </p>
          <Link
            href="/next-steps#home-groups"
            className="inline-block bg-[#ffffff] text-[#1b5e3f] font-bold py-4 px-8 rounded-lg hover:bg-[#f7f7f5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b5e3f]"
          >
            Host a Church of Music Home Group
          </Link>
        </div>
      </section>

      {/* Church Online / Watch */}
      <section className="py-12 px-4 bg-[#ffffff]" aria-labelledby="watch-heading">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 id="watch-heading" className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">
            Watch
          </h2>
          <p className="text-[#4a5568] max-w-2xl mx-auto mb-6">
            Join our worship ceremonies online. Church Online brings the same 90% music, 10% talk format to your screen—spiritual leaders and artists—whom we acknowledge as spiritual leaders—leading worship through the power of music. Come expectant for what the Spirit will do.
          </p>
          <Link
            href="/experience/online"
            className="inline-block bg-[#1b5e3f] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
          >
            Church Online
          </Link>
        </div>
      </section>

      {/* Biblical Perspectives – eye-catching promo */}
      <section className="py-14 px-4 bg-gradient-to-br from-[#2d5016] via-[#1b5e3f] to-[#0d3318] text-white relative overflow-hidden" aria-labelledby="perspectives-promo-heading">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 left-0 w-64 h-64 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 border-2 border-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <p className="text-[#b8e0a8] font-semibold text-sm uppercase tracking-wider mb-2">
            Scripture &amp; Music
          </p>
          <h2 id="perspectives-promo-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Biblical Perspectives
          </h2>
          <p className="text-lg opacity-95 max-w-2xl mx-auto mb-8">
            How does the Holy Spirit move through music—in every genre and culture? Explore scripture, from David’s lyre to Miriam’s tambourine, and reflections from our artists as spiritual leaders.
          </p>
          <Link
            href="/biblical-perspectives"
            className="inline-block bg-white text-[#1b5e3f] font-bold py-4 px-8 rounded-xl hover:bg-[#f7f7f5] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b5e3f]"
          >
            Explore Biblical Perspectives →
          </Link>
        </div>
      </section>

      {/* Approved Home Groups (from DB) */}
      <ApprovedHomeGroups />

      {/* Home Group CTA Banner */}
      <section className="bg-[#b8860b] text-[#1a1a1a] py-6 px-4" aria-labelledby="cta-heading">
        <div className="container mx-auto text-center">
          <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-2">
            Union & Communion at Home Groups
          </h2>
          <p className="text-lg opacity-95 max-w-2xl mx-auto">
            The body of God gathers in homes for worship. Come often. Regular attendance deepens community and draws others in. Host or attend—both build the church.
          </p>
          <Link
            href="/next-steps#home-groups"
            className="inline-block mt-4 bg-[#1a1a1a] text-[#ffffff] font-semibold py-3 px-6 rounded-lg hover:bg-[#2d3748] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2"
          >
            Learn How to Host
          </Link>
        </div>
      </section>

      {/* Artists as Spiritual Leaders */}
      <ArtistsAsLeadersSection />

      {/* What We Do */}
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="what-heading">
        <div className="container mx-auto max-w-4xl">
          <h2 id="what-heading" className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-8 text-center">
            Worship Through Music
          </h2>
          {/* Home group visual: acoustic artist in home with gathered worshipers */}
          <div className="relative rounded-xl overflow-hidden mb-12 aspect-[16/9] max-w-3xl mx-auto border-2 border-[#e2e8f0]">
            <Image
              src="/images/home-groups/home-group-stage-audience.jpg"
              alt="Acoustic artist on home stage with people gathered in worship at Church of Music"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Home Groups: Union & Communion</h3>
              <p className="text-[#4a5568] leading-relaxed">
                The body of God gathers in homes for regular union and communion. Worship leaders and spiritual leaders introduce artists as spiritual leaders. Church members attend often—bringing their own drink, sharing the table—and participate in worship that is 90% music and 10% reflection. Come consistently. Your presence strengthens the body and invites others in.
              </p>
            </div>
            <div className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Local & Touring Artists as Spiritual Leaders</h3>
              <p className="text-[#4a5568] leading-relaxed">
                We host local and touring artists in our worship ceremonies—partnered with Folk Alliance International. We acknowledge artists as spiritual leaders in our community: they present their spiritual journeys, lead worship through music, and the Holy Spirit moves through their giftings to bring healing, awakening, and encounter with God. Come meet them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Home Group CTA repeated */}
      <section className="py-12 px-4 bg-[#1a1a1a] text-[#ffffff]" aria-labelledby="host-heading">
        <div className="container mx-auto text-center">
          <h2 id="host-heading" className="text-2xl md:text-3xl font-bold mb-4">
            Gather Often. Build the Body.
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
            Regular union and communion at home groups deepens the church. Host or attend—each gathering draws more people into worship. Register your home or find one near you.
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

      {/* Still Have Questions? */}
      <section className="py-12 px-4 bg-[#f7f7f5]" aria-labelledby="questions-heading">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 id="questions-heading" className="text-2xl font-bold text-[#1a1a1a] mb-4">
            Still Have Questions?
          </h2>
          <p className="text-[#4a5568] mb-6">
            We believe clarity is kindness. Visit our FAQ or reach out.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/faq"
              className="inline-block text-[#1b5e3f] font-semibold underline underline-offset-4 hover:text-[#144d32] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 rounded"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="inline-block text-[#1b5e3f] font-semibold underline underline-offset-4 hover:text-[#144d32] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 rounded"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Beliefs preview */}
      <section className="py-16 px-4" aria-labelledby="beliefs-heading">
        <div className="container mx-auto max-w-4xl">
          <h2 id="beliefs-heading" className="text-3xl font-bold text-[#1a1a1a] mb-6 text-center">
            Our Beliefs
          </h2>
          <p className="text-[#4a5568] text-lg text-center max-w-2xl mx-auto mb-8">
            The Holy Spirit moves through music—inspiring faith, empowering righteousness, and drawing us into the presence of God. We believe in miracles through music, in artists as spiritual leaders, and in revival. Our beliefs are rooted in Biblical scripture.
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
