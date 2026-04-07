export default function FAQPage() {
  const faqs = [
    {
      q: 'What does the Church of Music believe?',
      a: 'We believe God moves through the power of music—awakening hearts, inspiring faith, and empowering righteousness. Our tenets include: regular worship through music and inspired word from spiritual leaders and artists as spiritual leaders; mentorship, safety, and acceptance of all people; and direct support of artists through membership donations (tithes) that sustain our home groups. We cite Biblical scripture about God working through music. Come expectant for what God will do.',
    },
    {
      q: 'What happens at a home group?',
      a: 'Home groups are where we experience union and communion in the body of God. Worship ceremonies are 90% music and 10% message. Acoustic artists lead from living rooms and home stages. Church members attend, bring their own beverage and food (passover style, unifying with the body), and workshop alongside artists as spiritual leaders. The format is 45 minutes worship, 10 minutes message, 40 minutes worship—typically 7–9 PM. Come often. Regular attendance builds community and draws others in.',
    },
    {
      q: 'How do I host a home group?',
      a: 'Register as a Home Group Location on this site. Provide your address, neighborhood, and city. Admin will review and approve your request. Once approved, you can request to host specific artists on dates and times through your dashboard. Admin approves those event requests, and approved home groups are displayed on our homepage.',
    },
    {
      q: 'Who are the artists?',
      a: 'We acknowledge artists as developing and developed spiritual leaders in our community. God has gifted them to lead worship through music, present their spiritual journeys during our home groups, and create space for healing, awakening, and encounter with God. We host local and touring artists and are partnered with Folk Alliance International. Explore our Artists as Spiritual Leaders section to stream music, leave feedback, and support their ministry.',
    },
    {
      q: 'Why do members bring their own drink and food?',
      a: 'Drawing on Biblical principles of the Passover and the Lord\'s Supper, we invite members to bring their own beverages and food to consume as passover, unifying them with the body of the church. This reflects the scriptural model where each household prepared its own provisions and the early church\'s practice of breaking bread together in homes.',
    },
    {
      q: 'How can I give?',
      a: 'We believe in direct support of artists as spiritual leaders through membership donations (tithes) that sustain our home groups and worship ceremonies. Visit our Give page for options: give online, text to give, mail a check, or contribute stock, crypto, or other assets. Your gifts support artists in their calling, venue costs, equipment, and community events. See “What Is Tithing?” on the Give page for our theology of giving.',
    },
    {
      q: 'Is the Church of Music a registered non-profit?',
      a: 'Yes. The United States Church of Music is an approved and registered non-profit religious organization under Section 501(c)(3) of the Internal Revenue Code. See our Legal page for constitutional rights, sacraments, and governance.',
    },
    {
      q: 'What if I need prayer or spiritual support?',
      a: 'We invite you to submit a Request Prayer form. Someone from our community will reach out to pray with you and offer spiritual support. We believe in mentorship, safety, acceptance of all people, and the power of God to bring healing and breakthrough. You are not alone.',
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 px-4 bg-[#f7f7f5]" aria-labelledby="faq-heading">
        <div className="container mx-auto max-w-3xl">
          <h1 id="faq-heading" className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[#4a5568] mb-12">
            We believe clarity is kindness. Here are answers to common questions about the Church of Music, our beliefs, home groups, and how to get involved.
          </p>

          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <article key={i} className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0]">
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">{faq.q}</h2>
                <p className="text-[#4a5568] leading-relaxed">{faq.a}</p>
              </article>
            ))}
          </div>

          <p className="mt-12 text-[#4a5568]">
            Have another question? <a href="/contact" className="text-[#1b5e3f] font-semibold hover:underline">Contact us</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
