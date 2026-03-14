import Link from 'next/link'

export default function NextStepsPage() {
  const steps = [
    { id: 'get-started', title: 'Get Started', desc: 'Begin your journey with the Church of Music. Attend a home group, explore our beliefs, or reach out to connect.' },
    { id: 'follow', title: 'Follow', desc: 'Follow us on social media and subscribe to our updates to stay connected with worship series, events, and home group schedules.' },
    { id: 'connect', title: 'Connect', desc: 'Connect with worship leaders, artists, and other church members. Build community through music and worship.' },
    { id: 'serve', title: 'Serve', desc: 'Serve the church by volunteering at home groups, supporting artists, or helping with worship ceremonies.' },
    { id: 'give', title: 'Give', desc: 'Support the church through tithes and donations. Membership donations sustain our home groups and support artists.' },
    { id: 'home-groups', title: 'Home Groups', desc: 'Host a Church of Music Home Group. Register your home church as a home group and present music to church members. Worship ceremonies are 90% music and 10% talk. Reach out to learn how to register.' },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="next-steps-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="next-steps-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            Next Steps
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-12">
            Take the next step in your journey with the Church of Music. Whether you want to get started, connect, serve, or host a home group, we are here to support you.
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
            <h2 className="text-2xl font-bold mb-4">Host a Church of Music Home Group</h2>
            <p className="mb-6 opacity-95">
              Home churches can register on this site as home groups. Present music to church members and host worship ceremonies that center the power of music. Contact us to get started.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/home-church-signup"
                className="inline-block bg-[#ffffff] text-[#1b5e3f] font-semibold py-3 px-6 rounded-lg hover:bg-[#f7f7f5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffffff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b5e3f]"
              >
                Register as Home Church Leader
              </Link>
              <Link
                href="/report-issue"
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
