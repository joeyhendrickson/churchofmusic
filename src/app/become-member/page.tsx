'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  phone: string
  preferredLocation: string
  monthlyAmount: string
}

const LOCATIONS = [
  { value: '', label: 'Select a location (optional)' },
  { value: 'westerville', label: 'Westerville' },
  { value: 'grove-city', label: 'Grove City' },
  { value: 'downtown-columbus', label: 'Downtown Columbus' },
  { value: 'dublin', label: 'Dublin' },
  { value: 'new-albany', label: 'New Albany' },
]

const MONTHLY_AMOUNTS = [
  { value: '', label: 'Select monthly amount (optional)' },
  { value: '25', label: '$25/month' },
  { value: '50', label: '$50/month' },
  { value: '100', label: '$100/month' },
  { value: 'custom', label: 'Other amount (set at checkout)' },
]

export default function BecomeMember() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    preferredLocation: '',
    monthlyAmount: '',
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
      const res = await fetch('/api/member-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      setSuccess(true)

      // If Stripe donation link exists, redirect to set up monthly giving
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Membership Request Received</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in becoming a member. We&apos;ll contact you soon to set up
            your monthly membership donation.
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
    // Redirecting to Stripe - show brief message
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
          <p className="text-gray-600">Taking you to set up your monthly membership donation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link href="/give" className="text-[#1b5e3f] hover:text-[#144d32] transition-colors">
            ← Back to Give
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">Become a Church Member</h1>
            <p className="text-[#4a5568] text-lg">
              Join the Church of Music through monthly membership. Complete the form below and
              you&apos;ll be directed to set up your recurring donation.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
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

              {/* Email */}
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

              {/* Phone */}
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

              {/* Preferred Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Home Group Location (optional)
                </label>
                <select
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-gray-900"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monthly Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Donation Amount (optional)
                </label>
                <select
                  name="monthlyAmount"
                  value={formData.monthlyAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-gray-900"
                >
                  {MONTHLY_AMOUNTS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  You can choose or adjust the amount when you complete checkout
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#144d32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Continue to Monthly Donation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
