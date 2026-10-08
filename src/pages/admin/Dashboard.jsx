// src/pages/admin/Dashboard.jsx
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  User,
  GraduationCap,
  Wrench,
  Briefcase,
  Rocket,
  Award,
  Target,
  LogOut,
  LayoutDashboard,
  ArrowUpRight,
  ExternalLink,
  FileArchive,
  BarChart3,   
} from 'lucide-react'
import { useAuth } from '../../lib/AuthContext'
import ThemeToggle from '../../components/ThemeToggle'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  /* The 8 admin sections */
  const sections = [
    {
      label: 'Profile',
      desc: 'Bio, photo, contact info, availability',
      icon: User,
      href: '/admin/profile',
      color: '#06b6d4',
    },
    {
      label: 'Education',
      desc: 'Degrees and academic history',
      icon: GraduationCap,
      href: '/admin/education',
      color: '#a855f7',
    },
    {
      label: 'Skills',
      desc: 'Skills, levels, hover descriptions',
      icon: Wrench,
      href: '/admin/skills',
      color: '#2563eb',
    },
    {
      label: 'Experience',
      desc: 'Work history with highlights',
      icon: Briefcase,
      href: '/admin/experience',
      color: '#10b981',
    },
    {
      label: 'Projects',
      desc: 'Grid cards and case studies',
      icon: Rocket,
      href: '/admin/projects',
      color: '#f59e0b',
    },
    {
      label: 'Certifications',
      desc: 'Certificates and achievements',
      icon: Award,
      href: '/admin/certifications',
      color: '#8b5cf6',
    },
    {
      label: 'TryHackMe',
      desc: 'Stats and badge collection',
      icon: Target,
      href: '/admin/tryhackme',
      color: '#dc2626',
    },
    {
      label: 'CV & Files',
      desc: 'Private documents — CV, resume',
      icon: FileArchive,
      href: '/admin/files',
      color: '#0ea5e9',
    },
    {
      label: 'Analytics',
      desc: 'Visitor stats, countries, devices',
      icon: BarChart3,
      href: '/admin/analytics',
      color: '#06b6d4',
    },
  ]

  return (
    <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-16 pb-20 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* ══════════ HEADER ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <div className="p-1 bg-white border border-black/10 rounded">
                  <LayoutDashboard
                    className="w-3.5 h-3.5 text-[#111]"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500">
                  // Admin Dashboard
                </p>
              </div>

              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-none">
                Welcome back, {user?.email?.split('@')[0] || 'Admin'}.
              </h1>

              <div className="mt-2.5 relative h-[2px] w-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(90deg, #06b6d4, #a855f7, #06b6d4)',
                    boxShadow: '0 0 15px rgba(6,182,212,0.4)',
                  }}
                />
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)',
                    backgroundSize: '40% 100%',
                    backgroundRepeat: 'no-repeat',
                  }}
                  animate={{ backgroundPosition: ['-50% 0%', '150% 0%'] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2 mt-6">
                <ThemeToggle />
                <Link
                  to="/"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest px-4 py-2.5 border border-black/15 rounded-lg hover:bg-white hover:border-black/30 transition-all"
                >
                  View Site
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest px-4 py-2.5 border border-red-200 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all"
                >
                  <LogOut className="w-3 h-3" />
                  Sign Out
                </button>
              </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mt-4 max-w-2xl font-light">
            Manage all portfolio content from here. Changes save directly to
            Supabase and appear instantly on the live site.
          </p>
        </motion.div>

        {/* ══════════ SECTIONS GRID ══════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, i) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  to={section.href}
                  className="group block bg-white border border-black/10 rounded-xl p-6 hover:border-black/30 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Radial glow */}
                  <div
                    className="absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 0% 50%, ${section.color}15, transparent 60%)`,
                    }}
                  />

                  <div className="relative flex items-start justify-between gap-4 mb-6">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${section.color}15`,
                        border: `1px solid ${section.color}40`,
                        color: section.color,
                      }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#111] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <div className="relative">
                    <h3 className="font-display text-xl font-bold text-[#111] leading-tight mb-1">
                      {section.label}
                    </h3>
                    <p className="text-[12px] text-gray-500 leading-snug">
                      {section.desc}
                    </p>
                  </div>

                  {/* Bottom accent bar on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      backgroundColor: section.color,
                      boxShadow: `0 0 20px ${section.color}`,
                    }}
                  />
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* ══════════ INFO CARD ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 p-6 bg-white border border-black/10 rounded-xl"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-3">
            // Session Info
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">
                Logged in as
              </p>
              <p className="text-[#111] font-medium truncate">{user?.email}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">
                User ID
              </p>
              <p className="text-[#111] font-mono text-xs truncate">
                {user?.id}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Dashboard