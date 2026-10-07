// src/pages/admin/Login.jsx
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight, Shield, ArrowLeft } from 'lucide-react'
import { useAuth } from '../../lib/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, isAuthenticated } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/admin'
    navigate(from, { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await signIn(email, password)
      const from = location.state?.from?.pathname || '/admin'
      navigate(from, { replace: true })
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'Invalid credentials. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#f0f0ef] text-[#111] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Back to site */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 hover:text-[#111] mb-8 transition-colors group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <div className="p-1.5 bg-white border border-black/10 rounded">
              <Shield className="w-4 h-4 text-[#06b6d4]" strokeWidth={1.75} />
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
              // Admin Access
            </p>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Welcome back.
          </h1>

          <div className="mt-3 relative h-[2px] w-full overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, #06b6d4, #a855f7, #06b6d4)',
                boxShadow: '0 0 15px rgba(6,182,212,0.4)',
              }}
            />
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mt-4 font-light">
            Sign in to manage your portfolio content.
          </p>
        </motion.div>

        {/* Login form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                strokeWidth={1.75}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full pl-10 pr-4 py-3 bg-white border border-black/10 rounded-xl text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:border-[#06b6d4] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                strokeWidth={1.75}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-4 py-3 bg-white border border-black/10 rounded-xl text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:border-[#06b6d4] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
            >
              {error}
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[#f0f0ef] text-[11px] font-mono uppercase tracking-widest rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.4)',
            }}
          >
            <span
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow:
                  '0 15px 40px -10px rgba(6,182,212,0.55), 0 0 0 1px rgba(6,182,212,0.35)',
              }}
            />
            <span className="relative z-10">
              {submitting ? 'Signing in...' : 'Sign In'}
            </span>
            {!submitting && (
              <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </motion.form>

        <p className="text-center text-[11px] font-mono text-gray-400 mt-8">
          Authorized access only · Adonay Mussie
        </p>
      </div>
    </section>
  )
}

export default Login