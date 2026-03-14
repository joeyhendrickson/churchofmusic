'use client'

import Link from 'next/link'
import { useState } from 'react'

const footerLinks = {
  connect: [
    { label: 'Next Steps', href: '/next-steps' },
    { label: 'Artists as Spiritual Leaders', href: '/#artists' },
    { label: 'Host a Home Group', href: '/next-steps#home-groups' },
  ],
  learn: [
    { label: 'Our Beliefs', href: '/beliefs' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Legal', href: '/legal' },
    { label: 'Leadership', href: '/leadership' },
  ],
  experience: [
    { label: 'Church Online', href: '/experience/online' },
    { label: 'Home Group Workshop', href: '/experience/home-group' },
    { label: 'Locations', href: '/locations' },
  ],
  support: [
    { label: 'Give', href: '/give' },
    { label: 'Request Prayer', href: '/request-prayer' },
    { label: 'Contact', href: '/report-issue' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-[#1a1a1a] text-[#ffffff] pt-16 pb-8 px-4" role="contentinfo">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#e2e8f0] mb-4">Connect</h3>
            <ul className="space-y-2" role="list">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#e2e8f0] hover:text-[#ffffff] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] rounded">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#e2e8f0] mb-4">Learn</h3>
            <ul className="space-y-2" role="list">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#e2e8f0] hover:text-[#ffffff] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] rounded">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#e2e8f0] mb-4">Experience</h3>
            <ul className="space-y-2" role="list">
              {footerLinks.experience.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#e2e8f0] hover:text-[#ffffff] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] rounded">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#e2e8f0] mb-4">Support</h3>
            <ul className="space-y-2" role="list">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#e2e8f0] hover:text-[#ffffff] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] rounded">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#374151] pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-[#e2e8f0] text-sm">
                The United States Church of Music — spiritual revival through home churches. God works through the power of music.
              </p>
            </div>
            <form onSubmit={handleEmailSubmit} className="flex gap-2 max-w-sm">
              <label htmlFor="footer-email" className="sr-only">
                Email for updates
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email for updates"
                className="flex-1 px-3 py-2 bg-[#374151] border border-[#4b5563] rounded-lg text-[#ffffff] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1b5e3f] focus:border-transparent"
                disabled={submitted}
              />
              <button
                type="submit"
                disabled={submitted}
                className="px-4 py-2 bg-[#1b5e3f] text-white font-semibold rounded-lg hover:bg-[#144d32] transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
              >
                {submitted ? 'Subscribed' : 'Subscribe'}
              </button>
            </form>
          </div>
          <p className="text-[#9ca3af] text-sm mt-6">
            © {new Date().getFullYear()} The United States Church of Music. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
