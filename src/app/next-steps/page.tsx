import Link from 'next/link'

export default function NextStepsPage() {
  const steps = [
    { id: 'get-started', title: 'Get Started', desc: 'Begin your journey with the Church of Music. Attend a home group, explore our beliefs, or reach out to connect. Come expectant for what God will do.' },
    { id: 'follow', title: 'Follow', desc: 'Follow us on social media and subscribe to our updates to stay connected with worship series, events, and home group schedules.' },
    { id: 'connect', title: 'Connect', desc: 'Connect with worship leaders, artists as spiritual leaders, and other church members. Build community through music and worship.' },
    { id: 'serve', title: 'Serve', desc: 'Serve the church by volunteering at home groups, supporting artists as spiritual leaders, or helping with worship ceremonies.' },
    { id: 'give', title: 'Give', desc: 'Support the church through tithes and donations. Membership donations sustain our home groups and support artists as spiritual leaders in their calling.' },
    { id: 'home-groups', title: 'Home Groups', desc: 'Union and communion in the body of God happens at home groups. Attend regularly—your presence builds community and draws others in. Host or join: acoustic artists lead worship in homes; people gather for fellowship and worship. Come often.' },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="next-steps-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="next-steps-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            Next Steps
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-12">
            Take the next step in your journey with the Church of Music. Whether you want to get started, connect, serve, or host a home group—we are here. Come expectant for transformation, encounter, and what God will do through music.
          </p>

          <div className="space-y-8">
            {steps.map((step) => (
              <article key={step.id} id={step.id} className="scroll-mt-24 bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">{step.title}</h2>
                <p className="text-[#4a5568]">{step.desc}</p>
                {step.id === 'home-groups' && (
                  <Link
                    href="/give"
                    className="inline-block mt-4 bg-[#1b5e3f] text-[#ffffff] font-semibold py-2 px-6 rounded-lg hover:bg-[#144d32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
                  >
                    Ways To Give
                  </Link>
                )}
              </article>
            ))}
          </div>

          <div className="mt-12 p-8 bg-[#1b5e3f] text-[#ffffff] rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Union, Communion & Regular Attendance</h2>
            <p className="mb-6 opacity-95">
              The body of God gathers in homes for worship. Register your home church as a home group—or attend one near you. Regular union and communion builds the church and draws more people into worship. Come often. Contact us to get started.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/home-church-signup"
                className="inline-block bg-[#ffffff] text-[#1b5e3f] font-semibold py-3 px-6 rounded-lg hover:bg-[#f7f7f5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b5e3f]"
              >
                Become a Home Church
              </Link>
              <Link
                href="/contact"
                className="inline-block border-2 border-[#ffffff] text-[#ffffff] font-semibold py-3 px-6 rounded-lg hover:bg-[#ffffff] hover:text-[#1b5e3f] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b5e3f]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
