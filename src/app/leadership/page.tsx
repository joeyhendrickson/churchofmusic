import Link from 'next/link'

export default function LeadershipPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="leadership-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="leadership-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            Leadership
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-12">
            The Church of Music is led by worship leaders, spiritual leaders from established churches, and artists—whom we acknowledge as developing and developed spiritual leaders in our community. Together they introduce worship through music and speak to how God moves through the power of music. The Spirit is at work among them. Come expectant.
          </p>

          <section className="mb-12" aria-labelledby="spiritual-leaders-heading">
            <h2 id="spiritual-leaders-heading" className="text-2xl font-bold text-[#1a1a1a] mb-6">
              Spiritual Leaders
            </h2>
            <p className="text-[#4a5568] leading-relaxed mb-6">
              Worship leaders and spiritual leaders from established churches across our cities introduce artists—whom we acknowledge as spiritual leaders—at home groups and provide pecha kucha–style sermons (10% of our worship) about how God moves through music. They feel called to speak to music as a conduit for transformation, awakening, and encounter with God.
            </p>
          </section>

          <section className="mb-12" aria-labelledby="artists-leaders-heading">
            <h2 id="artists-leaders-heading" className="text-2xl font-bold text-[#1a1a1a] mb-6">
              Artists as Spiritual Leaders
            </h2>
            <p className="text-[#4a5568] leading-relaxed mb-6">
              We celebrate artists as spiritual leaders in our community. The Holy Spirit has gifted them to lead the 90% music portion of our worship ceremonies, present their spiritual journeys during our home groups, and create space for healing, awakening, and encounter with God. We host local and touring artists and are partnered with Folk Alliance International. We acknowledge artists as developing and developed spiritual leaders who support the wellness, emotional intelligence, and spiritual transformation of audiences. Come meet them.
            </p>
            <Link
              href="/#artists"
              className="inline-block text-[#1b5e3f] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 rounded"
            >
              Explore Artists as Spiritual Leaders →
            </Link>
          </section>

          <section aria-labelledby="home-church-leaders-heading">
            <h2 id="home-church-leaders-heading" className="text-2xl font-bold text-[#1a1a1a] mb-6">
              Home Church Leaders
            </h2>
            <p className="text-[#4a5568] leading-relaxed mb-6">
              Home Church Leaders host home groups in their neighborhoods. They register on this site, are approved by admin, and request to host artists on specific dates and times. They facilitate worship ceremonies that are 90% music and 10% talk, welcoming church members to bring their own drink and food and workshop alongside artists.
            </p>
            <Link
              href="/next-steps#home-groups"
              className="inline-block text-[#1b5e3f] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 rounded"
            >
              Host a Church of Music Home Group →
            </Link>
          </section>

          <p className="mt-12 text-[#4a5568]">
            To connect with leadership, <a href="/report-issue" className="text-[#1b5e3f] font-semibold hover:underline">contact us</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
