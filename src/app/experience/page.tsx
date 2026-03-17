import Link from 'next/link'

export default function ExperiencePage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="experience-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="experience-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            Experience
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-12">
            Join our worship ceremonies online or at a home group. Our experiences are 90% music and 10% pecha kucha–style sermons from spiritual leaders and artists as spiritual leaders who speak to how God moves through music. Come expectant for encounter and transformation.
          </p>

          <div className="space-y-8">
            <article className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
                <Link href="/experience/momentum" className="hover:text-[#1b5e3f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 rounded">
                  Current Series: Momentum
                </Link>
              </h2>
              <p className="text-[#4a5568]">
                Our current worship series exploring how God moves through music to create momentum in faith and community.
              </p>
            </article>

            <article className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
                <Link href="/experience/online" className="hover:text-[#1b5e3f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 rounded">
                  Church Online
                </Link>
              </h2>
              <p className="text-[#4a5568]">
                Join our worship ceremonies online from anywhere. Stream our home group services and experience the power of music as worship—with spiritual leaders and artists as spiritual leaders leading you into encounter with God.
              </p>
            </article>

            <article className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
                <Link href="/experience/home-group" className="hover:text-[#1b5e3f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 rounded">
                  Home Group Workshop
                </Link>
              </h2>
              <p className="text-[#4a5568]">
                Attend a home group in person. Union and communion in the body of God happens when we gather regularly. Bring your own drink, workshop alongside artists as spiritual leaders, and participate in worship that is 90% music and 10% talk. Come often—your presence builds community and invites others in. Church members can register to host home groups.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
