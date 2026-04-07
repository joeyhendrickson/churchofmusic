'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [userType, setUserType] = useState<'artist' | 'admin' | null>(null)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)

  // This useEffect hook is crucial for handling the auth callback.
  // It listens for the SIGNED_IN event which Supabase triggers
  // after a user clicks the confirmation link.
  useEffect(() => {
    // This is the correct way to handle the auth state change.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // This event fires automatically after the user clicks the verification link.
      if (event === 'SIGNED_IN') {
        setSuccess('✅ Email verified successfully! You can now log in.');
      }
    });

    // This part just shows a helpful message while Supabase works in the background.
    if (searchParams.get('verified')) {
      setSuccess('Verifying email, please wait...');
    }
    
    // This cleans up the listener when you navigate away.
    return () => {
      subscription?.unsubscribe();
    };
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      console.log('Attempting login with email:', email)
      
      // Test database connection first
      try {
        const { data: testData, error: testError } = await supabase
          .from('artists')
          .select('count')
          .limit(1)
        
        if (testError) {
          console.log('Database connection failed:', testError)
          // Database is not accessible, show temporary message
          setError('Database connection temporarily unavailable. Please check back later or contact support.')
          setLoading(false)
          return
        }
      } catch (dbError) {
        console.log('Database connection error:', dbError)
        setError('Database connection temporarily unavailable. Please check back later or contact support.')
        setLoading(false)
        return
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.log('Auth error:', error)
        setError(error.message)
      } else if (data.user) {
        console.log('User authenticated:', data.user.email)
        
        // Check if user is an admin using the admin_users table (by email)
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('id, role, is_active')
          .eq('email', email)
          .eq('is_active', true)
          .single()
        
        console.log('Admin check result:', { adminUser, adminError })
        
        if (!adminError && adminUser) {
          setUserType('admin')
          router.push('/admin-dashboard')
          return
        }

        // Check if user is a home church leader
        const { data: homeChurchLeader, error: hclError } = await supabase
          .from('home_church_leaders')
          .select('id, status')
          .eq('email', email)
          .single()

        if (!hclError && homeChurchLeader) {
          setUserType('admin') // reuse for routing
          if (homeChurchLeader.status === 'pending') {
            setError('Your Home Group Location request is pending admin approval. You will be notified once approved.')
            setLoading(false)
            return
          }
          if (homeChurchLeader.status === 'rejected') {
            setError('Your Home Group Location request was not approved. Contact support for more information.')
            setLoading(false)
            return
          }
          router.push('/home-church-leader-dashboard')
          return
        }

        // Check if user is an artist
        const { data: artist, error: artistError } = await supabase
          .from('artists')
          .select('id, status')
          .eq('email', email)
          .single()

        console.log('Artist check result:', { artist, artistError })

        if (artistError || !artist) {
          setError('No artist, home group location, or admin account found with this email')
        } else {
          setUserType('artist')
          
          // Check if artist account is approved
          if (artist.status === 'pending') {
            setError('Your account is pending admin approval. You will be notified once approved.')
          } else {
            router.push('/artist-dashboard')
          }
        }
      }
    } catch (error) {
      console.log('Unexpected error:', error)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login?reset=true`,
      })

      if (error) {
        setError(error.message)
      } else {
        setResetEmailSent(true)
        setSuccess('Password reset link sent to your email! Check your inbox and spam folder.')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    setShowForgotPassword(false)
    setResetEmailSent(false)
    setError('')
    setSuccess('')
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 p-8 rounded-2xl max-w-md w-full shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600">Enter your email to receive a reset link</p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label htmlFor="reset-email" className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#E55A2B] focus:ring-2 focus:ring-[#E55A2B] transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading || resetEmailSent}
                className="w-full bg-[#E55A2B] text-white hover:bg-[#D14A1B] py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : resetEmailSent ? 'Email Sent!' : 'Send Reset Link'}
              </button>

              <button
                type="button"
                onClick={handleBackToLogin}
                disabled={loading}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back to Login
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              ← Back to Church of Music
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 p-8 rounded-2xl max-w-md w-full shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">The United States Church of Music</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#E55A2B] focus:ring-2 focus:ring-[#E55A2B] transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#E55A2B] focus:ring-2 focus:ring-[#E55A2B] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E55A2B] text-white hover:bg-[#D14A1B] py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="flex flex-col gap-2">
              <Link
                href="/artist-signup"
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 inline-block text-center"
              >
                Create Artist Account
              </Link>
              <Link
                href="/home-church-signup"
                className="w-full bg-[#1b5e3f] hover:bg-[#144d32] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 inline-block text-center"
              >
                Become a Home Church
              </Link>
            </div>
          </div>
        </form>

        <div className="mt-8 text-center">
          <div className="space-y-2">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="block text-black hover:text-gray-700 transition-colors text-sm text-center w-full font-bold"
            >
              Forgot your Password?
            </button>
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              ← Back to Church of Music
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 