export default function LegalPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="legal-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="legal-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            Legal
          </h1>
          <p className="text-lg text-[#4a5568] mb-12">
            All things should be done decently and in order.
          </p>

          <article className="space-y-12">
            {/* Article I: Name & Organization */}
            <section id="name" className="scroll-mt-24" aria-labelledby="name-heading">
              <h2 id="name-heading" className="text-2xl font-bold text-[#1a1a1a] mb-4">
                Article I: Name &amp; Organization
              </h2>
              <p className="text-[#4a5568] leading-relaxed">
                This congregation of believers shall be known as The United States Church of Music. The church is an approved and registered non-profit religious organization, incorporated as a non-profit corporation under the laws of the state in which it is registered, and operates exclusively for religious purposes.
              </p>
            </section>

            {/* Article II: Non-Profit Status */}
            <section id="nonprofit" className="scroll-mt-24" aria-labelledby="nonprofit-heading">
              <h2 id="nonprofit-heading" className="text-2xl font-bold text-[#1a1a1a] mb-4">
                Article II: Non-Profit Religious Organization
              </h2>
              <p className="text-[#4a5568] leading-relaxed mb-4">
                The United States Church of Music is organized as a church exclusively for religious, charitable, and educational purposes within the meaning of Section 501(c)(3) of the Internal Revenue Code of 1986 (or the corresponding provision of any future United States Revenue Law). The church is an approved and registered non-profit religious organization. Its purposes include, but are not limited to:
              </p>
              <ul className="list-disc pl-6 text-[#4a5568] space-y-2" role="list">
                <li>Proclaiming the Gospel of the Lord Jesus Christ</li>
                <li>Establishing and maintaining religious worship through the power of music</li>
                <li>Teaching believers in a manner consistent with the requirements of Holy Scripture</li>
                <li>Hosting home church gatherings and worship ceremonies across the United States</li>
                <li>Supporting artists as spiritual leaders in our community</li>
              </ul>
            </section>

            {/* Article III: Constitutional & Legal Foundation */}
            <section id="constitutional" className="scroll-mt-24" aria-labelledby="constitutional-heading">
              <h2 id="constitutional-heading" className="text-2xl font-bold text-[#1a1a1a] mb-4">
                Article III: Constitutional Rights &amp; Religious Freedom
              </h2>
              <p className="text-[#4a5568] leading-relaxed mb-4">
                The United States Church of Music exercises its rights under the First Amendment to the United States Constitution, which guarantees the free exercise of religion and the right to worship according to the dictates of conscience. The church affirms:
              </p>
              <ul className="list-disc pl-6 text-[#4a5568] space-y-2" role="list">
                <li>The right to assemble for religious worship in homes and designated spaces</li>
                <li>The right to practice sacraments and ordinances in accordance with biblical principles</li>
                <li>The right to gather as a body of believers without government interference in matters of faith and worship</li>
                <li>The right to support and be supported by members through voluntary contributions (tithes and offerings)</li>
              </ul>
              <p className="text-[#4a5568] leading-relaxed mt-4">
                As an approved and registered non-profit religious organization, the church operates in compliance with applicable federal and state laws governing religious organizations while preserving the constitutional protections afforded to religious worship and practice.
              </p>
            </section>

            {/* Article IV: Sacrament & Worship Practice */}
            <section id="sacrament" className="scroll-mt-24" aria-labelledby="sacrament-heading">
              <h2 id="sacrament-heading" className="text-2xl font-bold text-[#1a1a1a] mb-4">
                Article IV: Sacrament &amp; Worship Practice
              </h2>
              <p className="text-[#4a5568] leading-relaxed mb-4">
                The United States Church of Music believes in the biblical practice of sharing bread and cup as a sacrament of remembrance and unity, drawing upon the scriptural foundations of the Passover and the Lord&apos;s Supper (Exodus 12; Matthew 26:26–29; 1 Corinthians 11:23–26). In keeping with these biblical principles of worship:
              </p>
              <p className="text-[#4a5568] leading-relaxed mb-4">
                <strong className="text-[#1a1a1a]">Members are invited to bring their own beverages and food</strong> into home group gatherings to be consumed as passover, unifying them with the body of the church. This practice reflects the scriptural model of the Passover meal, where each household prepared its own provisions (Exodus 12), and the early church&apos;s practice of breaking bread together in homes (Acts 2:46). By bringing and sharing that which they have, members participate in a communal act of worship that draws them together as one body in Christ.
              </p>
              <p className="text-[#4a5568] leading-relaxed">
                The church recognizes that the sacrament of communion—the remembrance of Christ&apos;s body and blood—can be observed in varied forms and settings. Home groups provide an intimate context for this remembrance, where members bring their own elements as an expression of personal devotion and communal unity, in accordance with the biblical call to &quot;do this in remembrance of me&quot; (Luke 22:19).
              </p>
            </section>

            {/* Article V: Governance */}
            <section id="governance" className="scroll-mt-24" aria-labelledby="governance-heading">
              <h2 id="governance-heading" className="text-2xl font-bold text-[#1a1a1a] mb-4">
                Article V: Governance
              </h2>
              <p className="text-[#4a5568] leading-relaxed">
                The United States Church of Music is governed by its leadership in accordance with its bylaws and governing documents. Home churches operate as registered home groups under the oversight of the church. The church maintains financial accountability, handles contributions in accordance with its charitable purposes, and operates with transparency consistent with its status as an approved and registered non-profit religious organization.
              </p>
            </section>

            {/* Contact */}
            <section id="contact" className="scroll-mt-24 pt-8 border-t border-[#e2e8f0]" aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="text-2xl font-bold text-[#1a1a1a] mb-4">
                Contact
              </h2>
              <p className="text-[#4a5568] leading-relaxed">
                For questions regarding the legal structure, non-profit status, or governance of The United States Church of Music, please contact us through the <a href="/report-issue" className="text-[#1b5e3f] font-semibold underline underline-offset-4 hover:text-[#144d32] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 rounded">Report Issue / Contact</a> page.
              </p>
            </section>
          </article>
        </div>
      </section>
    </div>
  )
}
