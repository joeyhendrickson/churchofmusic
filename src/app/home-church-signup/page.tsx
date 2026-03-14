'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomeChurchSignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    address: '',
    neighborhood: '',
    city: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/home-church-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          address: formData.address,
          neighborhood: formData.neighborhood,
          city: formData.city,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.message || 'Signup failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen py-16 px-4 bg-[#f7f7f5]">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4">Check Your Email</h1>
          <p className="text-[#4a5568] mb-6">
            Your Home Church Leader account has been created. Please confirm your email, then log in. Your request to be approved as a home group is pending admin review.
          </p>
          <Link
            href="/login"
            className="inline-block bg-[#1b5e3f] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#144d32] transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-[#f7f7f5]">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Become a Home Church Leader</h1>
        <p className="text-[#4a5568] mb-8">
          Register your home as a Church of Music home group. Provide your address and neighborhood. Admin will review and approve your request.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-[#e2e8f0]">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1a1a1a] mb-1">Name</label>
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
            <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-1">Email</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-[#1a1a1a] mb-1">Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-[#1a1a1a]"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1a1a1a] mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-[#1a1a1a]"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-[#1a1a1a] mb-1">Home Address</label>
            <input
              id="address"
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-[#1a1a1a]"
            />
          </div>
          <div>
            <label htmlFor="neighborhood" className="block text-sm font-medium text-[#1a1a1a] mb-1">Neighborhood (in your city)</label>
            <input
              id="neighborhood"
              type="text"
              required
              placeholder="e.g. Olde Towne East, Victorian Village"
              value={formData.neighborhood}
              onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-[#1a1a1a]"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-[#1a1a1a] mb-1">City</label>
            <input
              id="city"
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#1b5e3f] focus:border-[#1b5e3f] text-[#1a1a1a]"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1b5e3f] text-white font-semibold py-3 rounded-lg hover:bg-[#144d32] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Submitting...' : 'Register as Home Church Leader'}
          </button>
        </form>

        <p className="mt-6 text-center text-[#4a5568] text-sm">
          Already have an account? <Link href="/login" className="text-[#1b5e3f] font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
