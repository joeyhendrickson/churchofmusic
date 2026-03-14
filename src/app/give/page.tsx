export default function GivePage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="give-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="give-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            Give
          </h1>
          <p className="text-lg text-[#4a5568] leading-relaxed mb-12">
            We believe in the direct support of artists through membership donations (tithes) that provide sustenance for our home groups as community gatherings. Your generosity supports worship ceremonies, artists, and the mission of the Church of Music.
          </p>

          <section id="ways" className="scroll-mt-24" aria-labelledby="ways-heading">
            <h2 id="ways-heading" className="text-2xl font-bold text-[#1a1a1a] mb-6">
              Ways To Give
            </h2>
            <ul className="space-y-4 text-[#4a5568] text-lg" role="list">
              <li className="flex gap-3">
                <span className="text-[#1b5e3f] font-bold" aria-hidden>•</span>
                <span>Membership tithes to sustain home groups and worship ceremonies</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1b5e3f] font-bold" aria-hidden>•</span>
                <span>Direct support of artists who lead worship at our home groups</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1b5e3f] font-bold" aria-hidden>•</span>
                <span>Donations to support venue costs, equipment, and community events</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1b5e3f] font-bold" aria-hidden>•</span>
                <span>One-time or recurring gifts to the Church of Music</span>
              </li>
            </ul>
            <p className="mt-8 text-[#4a5568]">
              Contact us through the Report Issue page or our community channels for specific giving options and instructions.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
