'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const navItems = [
  {
    label: 'About',
    href: '/about',
    subnav: [
      { label: 'Our Tenets', href: '/about#tenets' },
      { label: 'Artists as Leaders', href: '/about#artists' },
      { label: 'Biblical Perspectives', href: '/biblical-perspectives' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Legal', href: '/legal' },
    ],
  },
  {
    label: 'Experience',
    href: '/experience',
    subnav: [
      { label: 'Current Series: Momentum', href: '/experience/momentum' },
      { label: 'Church Online', href: '/experience/online' },
      { label: 'Home Group Workshop', href: '/experience/home-group' },
    ],
  },
  {
    label: 'Locations',
    href: '/locations',
    subnav: [
      { label: 'Westerville', href: '/locations/westerville' },
      { label: 'Grove City', href: '/locations/grove-city' },
      { label: 'Downtown Columbus', href: '/locations/downtown-columbus' },
      { label: 'Dublin', href: '/locations/dublin' },
      { label: 'New Albany', href: '/locations/new-albany' },
    ],
  },
  {
    label: 'Next Steps',
    href: '/next-steps',
    subnav: [
      { label: 'Get Started', href: '/next-steps#get-started' },
      { label: 'Follow', href: '/next-steps#follow' },
      { label: 'Connect', href: '/next-steps#connect' },
      { label: 'Serve', href: '/next-steps#serve' },
      { label: 'Give', href: '/next-steps#give' },
      { label: 'Home Groups', href: '/next-steps#home-groups' },
    ],
  },
  {
    label: 'Give',
    href: '/give',
    subnav: [
      { label: 'What Is Tithing?', href: '/give#tithing' },
      { label: 'Ways To Give', href: '/give#ways' },
      { label: 'Our Impact', href: '/give#impact' },
    ],
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('click', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff] border-b-2 border-[#1a1a1a]" role="banner">
      <div className="container mx-auto flex justify-between items-center px-4 h-16">
        <Link
          href="/"
          className="text-xl font-bold text-[#1a1a1a] hover:text-[#1b5e3f] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2 rounded"
          aria-label="The United States Church of Music - Home"
        >
          The United States Church of Music
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-[#1a1a1a] hover:bg-[#f7f7f5] rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
          aria-expanded={isOpen}
          aria-controls="main-navigation-panel"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Right-side navigation panel */}
      <div
        id="main-navigation-panel"
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#ffffff] border-l-2 border-[#1a1a1a] shadow-2xl transform transition-transform duration-300 ease-out z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="p-6 pt-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-[#1a1a1a]">Menu</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#1a1a1a] hover:bg-[#f7f7f5] rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b5e3f] focus-visible:ring-offset-2"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1" aria-label="Primary">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-[#e2e8f0] last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-[#1a1a1a] font-semibold hover:text-[#1b5e3f] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1b5e3f] rounded"
                >
                  {item.label}
                </Link>
                {item.subnav && item.subnav.length > 0 && (
                  <ul className="pl-4 pb-3 space-y-1" role="list">
                    {item.subnav.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-[#4a5568] text-sm hover:text-[#1b5e3f] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1b5e3f] rounded"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="/beliefs"
                onClick={() => setIsOpen(false)}
                className="block py-3 text-[#1a1a1a] font-semibold hover:text-[#1b5e3f] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1b5e3f] rounded"
              >
                Our Beliefs
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Backdrop when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#1a1a1a]/30 z-40"
          aria-hidden
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  )
}
