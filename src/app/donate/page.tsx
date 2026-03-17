'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  phone: string
  amount: string
  messageForEvent: string
}

const AMOUNTS = [
  { value: '', label: 'Select amount (optional)' },
  { value: '25', label: '$25' },
  { value: '50', label: '$50' },
  { value: '100', label: '$100' },
  { value: '250', label: '$250' },
  { value: '500', label: '$500' },
  { value: 'custom', label: 'Other amount' },
]

export default function DonatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    amount: '',
    messageForEvent: '',
  })

  const donationLink = process.env.NEXT_PUBLIC_STRIPE_DONATION_LINK || ''

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          amount: formData.amount || undefined,
          messageForEvent: formData.messageForEvent.trim() || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      setSuccess(true)

      if (donationLink && formData.email) {
        const separator = donationLink.includes('?') ? '&' : '?'
        const prefilledUrl = `${donationLink}${separator}prefilled_email=${encodeURIComponent(formData.email)}`
        window.location.href = prefilledUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'There was an error. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (success && !donationLink) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center border border-gray-200">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You</h2>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your information and will be in touch shortly to complete your
            donation. God moves through your giving.
          </p>
          <Link
            href="/give"
            className="inline-block bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#144d32] transition-colors"
          >
            Return to Give
          </Link>
        </div>
      </div>
    )
  }

  if (success && donationLink) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center border border-gray-200">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#1b5e3f]/10">
              <svg
                className="h-6 w-6 text-[#1b5e3f] animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Redirecting to Payment</h2>
          <p className="text-gray-600">Taking you to complete your donation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link href="/give" className="text-[#1b5e3f] hover:text-[#144d32] transition-colors">
            ← Back to Give
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">Give Online</h1>
            <p className="text-[#4a5568] text-lg">
              Share your information below. Your gift supports worship ceremonies, artists as
              spiritual leaders, and the mission of the Church of Music.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <p className="text-[#4a5568] text-sm mb-6 p-4 bg-[#f0f7f4] rounded-xl border border-[#1b5e3f]/20">
              The United States Church of Music is a 501(c)(3) non-profit church. Your donation is
              tax-deductible to the extent allowed by law. You will receive a written acknowledgment
              for your records.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-gray-900 placeholder-gray-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-gray-900 placeholder-gray-500"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-gray-900 placeholder-gray-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount (optional)
                </label>
                <select
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-gray-900"
                >
                  {AMOUNTS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal message for an upcoming event (optional)
                </label>
                <textarea
                  name="messageForEvent"
                  value={formData.messageForEvent}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-gray-900 placeholder-gray-500 resize-none"
                  placeholder="If you’d like a brief message (e.g. in memory of, in honor of, or a short note) shared at an upcoming worship or home group, enter it here."
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#144d32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Donate'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
