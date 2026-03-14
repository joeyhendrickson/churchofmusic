export default function BeliefsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="beliefs-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="beliefs-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            Our Beliefs
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-12">
            The United States Church of Music is grounded in the belief that God works through the power of music. Our beliefs reference specific Biblical scriptures about how the Holy Spirit can work through music, inspiring faith and empowering righteousness. We cite examples from the Bible about music as a way of worship and connection with God.
          </p>

          <section className="mb-16" aria-labelledby="scripture-heading">
            <h2 id="scripture-heading" className="text-2xl font-bold text-[#1a1a1a] mb-6">
              Scripture and Music
            </h2>
            <p className="text-[#4a5568] leading-relaxed mb-4">
              Throughout the Bible, music appears as a vehicle for worship and connection with God. We believe the Holy Spirit works through music to inspire faith, empower righteousness, and draw people closer to the presence of God. Our worship ceremonies reflect this conviction: 90% music, 10% talk, with spiritual leaders offering pecha kucha–style reflections on how God works through the modality of music.
            </p>
            <p className="text-[#4a5568] leading-relaxed">
              We do not believe God is limited to the specific modalities of miracles that the Bible presents. Miracles can happen through music as a conduit for transformation that leads people closer to the presence of God. We believe in the regular worship of God through the expression and presentation of music and inspired word from spiritual leaders who feel called to speak to how God works through music.
            </p>
          </section>

          <section className="mb-16" aria-labelledby="community-heading">
            <h2 id="community-heading" className="text-2xl font-bold text-[#1a1a1a] mb-6">
              Community and Belief
            </h2>
            <p className="text-[#4a5568] leading-relaxed mb-4">
              We believe God works through a community of believers. Drawing from the insights of Tocqueville and our understanding of American civic life, we believe that even communities of people who are believers in music—as a form of nature and creation—can serve as a conduit through which God can reinspire faith and wellness. Secular music has had its place in unifying people in ways that God can work through for health benefits, leading them towards greater connection with the Holy Spirit, through the early semblance of what &quot;church&quot; looks like and feels like: community gatherings centered on shared experience.
            </p>
            <p className="text-[#4a5568] leading-relaxed">
              We encourage our members&apos; deeper journeys into music and also nearby places of worship through Christian and spiritual ministries they feel called to investigate. We believe in mentorship within our community, safety, and acceptance of all people with diverse backgrounds and faiths.
            </p>
          </section>

          <section className="mb-16" aria-labelledby="artists-heading">
            <h2 id="artists-heading" className="text-2xl font-bold text-[#1a1a1a] mb-6">
              Artists and Spiritual Leadership
            </h2>
            <p className="text-[#4a5568] leading-relaxed">
              We believe in celebrating the giftings of music that have led many artists, of multiple faiths and beliefs, to present music publicly in our city&apos;s spaces and places. This supports not just the creative economy but the wellness, emotional intelligence, and spiritual transformation of audiences as they experience the power of music and encounter God through music that may have blessed, healed, or supported their understanding, growth, and wellness in life. We invite artists to present their spiritual journeys during our home groups and encourage the acknowledgement of artists as developing and developed spiritual leaders in our community. We believe in the direct support of artists through membership donations (tithes) that provide sustenance for our home groups as community gatherings.
            </p>
          </section>

          <hr className="border-[#e2e8f0] my-16" />

          <section aria-labelledby="perspectives-heading">
            <h2 id="perspectives-heading" className="text-2xl font-bold text-[#1a1a1a] mb-8">
              Perspectives
            </h2>
            <p className="text-[#4a5568] mb-8">
              Perspectives is a blog where we reflect on how God is multi-genre, working through all types of music and all types of people. We share thoughts on scripture, community, and the many ways music serves as a conduit for transformation.
            </p>

            <div className="space-y-8">
              <article className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">God Is Multi-Genre</h3>
                <p className="text-[#4a5568] leading-relaxed mb-4">
                  We believe God works through all types of music and all types of people. Folk, gospel, rock, classical, jazz, hip-hop—no genre is outside the possibility of the Holy Spirit&apos;s movement. Music transcends the categories we create for it and can serve as a conduit for transformation regardless of its label.
                </p>
                <p className="text-[#4a5568] text-sm">More perspectives coming soon.</p>
              </article>

              <article className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Secular Music and Community</h3>
                <p className="text-[#4a5568] leading-relaxed mb-4">
                  Secular music has long unified people in ways that God can work through—from concerts to house parties to shared listening. These gatherings echo the early semblance of what church looks and feels like: community, presence, and a sense of something greater than oneself. We do not draw a rigid line between sacred and secular; we believe God can work through both.
                </p>
              </article>

              <article className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Miracles Through Music</h3>
                <p className="text-[#4a5568] leading-relaxed">
                  The Bible describes many modalities of miracles. We do not believe God is limited to those specific forms. Miracles can happen through music as a conduit—healing, awakening, reconciliation, renewal. When a song brings someone closer to the presence of God, that is a form of miracle we celebrate.
                </p>
              </article>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
