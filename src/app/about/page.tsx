import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="about-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="about-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            About the Church
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-6">
            The United States Church of Music is a collection of home churches across the USA. We host worship ceremonies where God moves through the power of music—awakening hearts, transforming lives, and drawing us into His presence. Worship leaders and spiritual leaders from established churches introduce artists, whom we acknowledge as spiritual leaders in our community. Church members attend home groups to workshop alongside them in ceremonies that are 90% music and 10% talk. Come expectant.
          </p>
          <p className="text-lg text-[#4a5568] leading-relaxed">
            We host local and touring artists and are partnered with Folk Alliance International. Our mission is spiritual revival through home groups across the country—and we believe the Holy Spirit empowers artists as spiritual leaders to lead us into encounter with God.
          </p>
        </div>
      </section>

      <section id="tenets" className="py-16 px-4 scroll-mt-24" aria-labelledby="tenets-heading">
        <div className="container mx-auto max-w-3xl">
          <h2 id="tenets-heading" className="text-3xl font-bold text-[#1a1a1a] mb-8">
            Our Tenets
          </h2>
          <ul className="space-y-4 text-[#4a5568] text-lg" role="list">
            <li className="flex gap-3">
              <span className="text-[#1b5e3f] font-bold" aria-hidden>•</span>
              <span>God works through the power of music.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#1b5e3f] font-bold" aria-hidden>•</span>
              <span>Regular worship through the expression and presentation of music and inspired word from spiritual leaders—including artists as spiritual leaders in our community.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#1b5e3f] font-bold" aria-hidden>•</span>
              <span>Mentorship, safety, and acceptance of all people with diverse backgrounds and faiths.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#1b5e3f] font-bold" aria-hidden>•</span>
              <span>Direct support of artists as spiritual leaders through membership donations (tithes) that sustain our home groups.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="artists" className="py-16 px-4 bg-[#f7f7f5] scroll-mt-24" aria-labelledby="artists-heading">
        <div className="container mx-auto max-w-3xl">
          <h2 id="artists-heading" className="text-3xl font-bold text-[#1a1a1a] mb-8">
            Artists as Leaders
          </h2>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-6">
            We acknowledge artists as developing and developed spiritual leaders in our community. The Holy Spirit has gifted them to lead worship through music, present their spiritual journeys in our home groups, and create space for healing, awakening, and encounter with God. We celebrate the music that has led many artists of multiple faiths and beliefs to step into this calling—supporting the creative economy and the wellness, emotional intelligence, and spiritual transformation of audiences. Come meet them and experience the Spirit moving.
          </p>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-6">
            We encourage our members&apos; deeper journeys into music and nearby places of worship through Christian and spiritual ministries they feel called to explore.
          </p>
          <p className="text-lg text-[#4a5568]">
            Explore our <Link href="/biblical-perspectives" className="text-[#1b5e3f] font-semibold hover:underline">Biblical Perspectives</Link>—a blog-style section where we reflect on scripture and how the Holy Spirit works through all genres of music to draw people closer to God.
          </p>
        </div>
      </section>
    </div>
  )
}
