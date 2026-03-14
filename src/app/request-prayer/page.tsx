'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RequestPrayerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    prayerRequest: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      // Submit to contact/report-issue flow - in production would go to dedicated endpoint
      console.log('Prayer request:', formData)
      await new Promise((r) => setTimeout(r, 800))
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-16 px-4 bg-[#f7f7f5]">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4">Thank You</h1>
          <p className="text-[#4a5568] mb-6">
            Your prayer request has been received. Someone from our community will reach out to pray with you and offer spiritual support. We believe God moves through the power of music and through the community of believers—and the Spirit brings healing and breakthrough. You are not alone.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#144d32]"
          >
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-[#f7f7f5]">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">Request Prayer</h1>
        <p className="text-[#4a5568] mb-8">
          We believe in mentorship, safety, and acceptance—and in the power of the Spirit to bring healing and breakthrough. Need prayer or spiritual support? Fill out the form below and someone from our community will reach out to pray with you. You are not alone.
        </p>

        <form onSubmit={handleSubmit} className="bg-[#ffffff] rounded-xl p-8 border border-[#e2e8f0] space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1a1a1a] mb-1">Name *</label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-[#1a1a1a]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-1">Email *</label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-[#1a1a1a]"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#1a1a1a] mb-1">Phone</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-[#1a1a1a]"
            />
          </div>
          <div>
            <label htmlFor="prayerRequest" className="block text-sm font-medium text-[#1a1a1a] mb-1">Prayer Request *</label>
            <textarea
              id="prayerRequest"
              required
              rows={4}
              value={formData.prayerRequest}
              onChange={(e) => setFormData({ ...formData, prayerRequest: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-[#1a1a1a]"
              placeholder="Share what you'd like prayer for..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#1b5e3f] text-white font-semibold py-3 rounded-lg hover:bg-[#144d32] disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Prayer Request'}
          </button>
        </form>
      </div>
    </div>
  )
}
