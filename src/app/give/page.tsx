import Link from 'next/link'

const donationLink = process.env.NEXT_PUBLIC_STRIPE_DONATION_LINK || ''
const textNumber = process.env.NEXT_PUBLIC_GIVE_TEXT_NUMBER || ''
const checkAddress = process.env.NEXT_PUBLIC_GIVE_CHECK_ADDRESS || 'Church of Music, Columbus, OH'
const annualReportUrl = process.env.NEXT_PUBLIC_ANNUAL_REPORT_URL || ''

export default function GivePage() {
  const memberCta = donationLink ? (
    <a
      href={donationLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
    >
      Set Up Member Donation
    </a>
  ) : (
    <Link
      href="/become-member"
      className="inline-block bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
    >
      Become a Member
    </Link>
  )
  const impactContent = annualReportUrl ? (
    <>
      <p className="text-[#4a5568] mb-4">
        See how your generosity fuels worship, artist support, and community growth.
      </p>
      <a
        href={annualReportUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-[#1b5e3f] font-semibold hover:underline"
      >
        View Our Annual Impact Report →
      </a>
    </>
  ) : (
    <p className="text-[#4a5568]">
      Our annual impact report will be available soon. In the meantime, your gifts fund worship ceremonies, support artists as spiritual leaders in their calling, sustain home groups, and grow our community. Thank you for being part of what God is doing through the Church of Music.
    </p>
  )
  const onlineCta = donationLink ? (
    <a
      href={donationLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
    >
      Give Online Now
    </a>
  ) : (
    <Link
      href="/donate"
      className="inline-block bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
    >
      Give Online
    </Link>
  )
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="give-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="give-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            Give
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-12">
            We believe in the direct support of artists as spiritual leaders through membership donations (tithes) that sustain our home groups as community gatherings. Your generosity fuels worship ceremonies, empowers artists in their calling, and advances the mission of the Church of Music. God moves through your giving.
          </p>

          {/* Church Membership - Subscription Donations */}
          <section id="member" className="scroll-mt-24 mb-12 p-6 bg-[#f0f7f4] rounded-xl border-2 border-[#1b5e3f]" aria-labelledby="member-heading">
            <h2 id="member-heading" className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Become a Church Member
            </h2>
            <p className="text-[#4a5568] leading-relaxed mb-4">
              Church membership is sustained through regular, subscription-based tithes. As a member, you support worship ceremonies, artists as spiritual leaders, and the growth of our home groups. Choose a recurring donation below to join the body and partner with us month by month.
            </p>
            {memberCta}
          </section>

          {/* What is Tithing? */}
          <section id="tithing" className="scroll-mt-24 mb-12" aria-labelledby="tithing-heading">
            <h2 id="tithing-heading" className="text-2xl font-bold text-[#1a1a1a] mb-4">
              What Is Tithing?
            </h2>
            <p className="text-[#4a5568] leading-relaxed mb-4">
              Tithing—giving a portion of what we have back to support the work of faith—is a cornerstone of the Church of Music. For us, it means sustaining the artists who lead worship as spiritual leaders and the home groups where music brings us into encounter with God. We believe God moves through the power of music, and your tithes make that possible: they fund worship ceremonies, support artists in their calling, cover venue and equipment costs, and grow our community. Whether you give regularly as a member or contribute one-time gifts, your support directly fuels revival.
            </p>
          </section>

          {/* Ways To Give */}
          <section id="ways" className="scroll-mt-24 mb-12" aria-labelledby="ways-heading">
            <h2 id="ways-heading" className="text-2xl font-bold text-[#1a1a1a] mb-6">
              Ways To Give
            </h2>
            <div className="space-y-6">
              {/* Online Giving */}
              <div className="bg-[#ffffff] rounded-xl p-6 border border-[#e2e8f0]">
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Give Online</h3>
                <p className="text-[#4a5568] mb-4">
                  Make a one-time or recurring gift with a credit or debit card. Your donation goes toward membership tithes, support for artists as spiritual leaders, venue costs, and the mission of the Church of Music.
                </p>
                {onlineCta}
              </div>

              {/* Text to Give */}
              {textNumber && (
                <div className="bg-[#ffffff] rounded-xl p-6 border border-[#e2e8f0]">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Text to Give</h3>
                  <p className="text-[#4a5568] mb-4">
                    Text <strong>GIVE</strong> to <strong>{textNumber}</strong> to give via text message. Follow the prompts to complete your donation.
                  </p>
                </div>
              )}

              {/* Give by Check */}
              <div className="bg-[#ffffff] rounded-xl p-6 border border-[#e2e8f0]">
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Give by Check</h3>
                <p className="text-[#4a5568] mb-4">
                  Mail checks payable to <strong>Church of Music</strong> to:
                </p>
                <address className="text-[#4a5568] not-italic">
                  {checkAddress}
                </address>
              </div>

              {/* Other Options */}
              <div className="bg-[#ffffff] rounded-xl p-6 border border-[#e2e8f0]">
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Stock, Crypto & Other Assets</h3>
                <p className="text-[#4a5568] mb-4">
                  Interested in giving stock, cryptocurrency, or other non-cash assets? We accept these contributions. <Link href="/contact" className="text-[#1b5e3f] font-semibold hover:underline">Contact us</Link> and we&apos;ll provide instructions for your preferred method.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-[#f0f7f4] rounded-lg">
              <p className="text-[#4a5568] text-sm">
                <strong>What your gifts support:</strong> Membership tithes sustain our home groups and worship ceremonies. Direct support flows to artists as spiritual leaders who lead worship. Donations also cover venue costs, equipment, and community events. Thank you for your generosity—God moves through your giving.
              </p>
            </div>
          </section>

          {/* Annual Report */}
          <section id="impact" className="scroll-mt-24" aria-labelledby="impact-heading">
            <h2 id="impact-heading" className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Our Impact
            </h2>
            {impactContent}
          </section>

          <p className="mt-12 text-[#4a5568]">
            Questions about giving? <Link href="/contact" className="text-[#1b5e3f] font-semibold hover:underline">Contact us</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
