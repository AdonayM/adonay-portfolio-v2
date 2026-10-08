// src/pages/admin/Dashboard.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  User,
  GraduationCap,
  Wrench,
  Briefcase,
  Rocket,
  Award,
  Target,
  FileArchive,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react'
import { useAuth } from '../../lib/AuthContext'
import {
  useProjects,
  useEducation,
  useSkills,
  useExperience,
  useAchievements,
  useThmStats,
} from '../../lib/hooks'

const Dashboard = () => {
  const { user } = useAuth()
  const { data: projects } = useProjects()
  const { data: education } = useEducation()
  const { data: skills } = useSkills()
  const { data: experience } = useExperience()
  const { data: achievements } = useAchievements()
  const { data: thmStats } = useThmStats()

  /* ─── Content Overview stats ─── */
  const contentStats = [
    {
      label: 'Projects',
      value: projects?.length || 0,
      icon: Rocket,
      color: '#f59e0b',
      href: '/admin/projects',
    },
    {
      label: 'Certifications',
      value: achievements?.length || 0,
      icon: Award,
      color: '#8b5cf6',
      href: '/admin/certifications',
    },
    {
      label: 'Skills',
      value: skills?.length || 0,
      icon: Wrench,
      color: '#2563eb',
      href: '/admin/skills',
    },
    {
      label: 'Education',
      value: education?.length || 0,
      icon: GraduationCap,
      color: '#a855f7',
      href: '/admin/education',
    },
    {
      label: 'Experience',
      value: experience?.length || 0,
      icon: Briefcase,
      color: '#10b981',
      href: '/admin/experience',
    },
    {
      label: 'THM Badges',
      value: thmStats?.badges_count || 0,
      icon: Target,
      color: '#dc2626',
      href: '/admin/tryhackme',
    },
  ]

  /* ─── All admin sections ─── */
  const sections = [
    {
      label: 'Profile',
      desc: 'Bio, photo, contact, availability',
      icon: User,
      href: '/admin/profile',
      color: '#06b6d4',
      count: null,
    },
    {
      label: 'Education',
      desc: 'Academic timeline',
      icon: GraduationCap,
      href: '/admin/education',
      color: '#a855f7',
      count: education?.length,
    },
    {
      label: 'Skills',
      desc: 'Skills & hover descriptions',
      icon: Wrench,
      href: '/admin/skills',
      color: '#2563eb',
      count: skills?.length,
    },
    {
      label: 'Experience',
      desc: 'Work history & highlights',
      icon: Briefcase,
      href: '/admin/experience',
      color: '#10b981',
      count: experience?.length,
    },
    {
      label: 'Projects',
      desc: 'Grid cards & case studies',
      icon: Rocket,
      href: '/admin/projects',
      color: '#f59e0b',
      count: projects?.length,
    },
    {
      label: 'Certifications',
      desc: 'Certificates & achievements',
      icon: Award,
      href: '/admin/certifications',
      color: '#8b5cf6',
      count: achievements?.length,
    },
    {
      label: 'TryHackMe',
      desc: 'Stats & badge collection',
      icon: Target,
      href: '/admin/tryhackme',
      color: '#dc2626',
      count: thmStats?.badges_count,
    },
    {
      label: 'CV & Files',
      desc: 'Private documents vault',
      icon: FileArchive,
      href: '/admin/files',
      color: '#0ea5e9',
      count: null,
    },
    {
      label: 'Analytics',
      desc: 'Visitor stats & world map',
      icon: BarChart3,
      href: '/admin/analytics',
      color: '#06b6d4',
      count: null,
    },
  ]

  return (
    <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-6 pb-16 px-6 lg:px-10">
      <div className="w-full max-w-[1600px]">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            Welcome back, {user?.email?.split('@')[0] || 'Admin'}.
          </h1>
          <div className="mt-2 relative h-[2px] w-full overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, #06b6d4, #a855f7, #06b6d4)',
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
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>

        {/* CONTENT OVERVIEW — compact stat cards */}
        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4">
            // Content Overview
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {contentStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <Link
                    to={stat.href}
                    className="group block bg-white border border-black/10 rounded-xl p-4 hover:border-black/30 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${stat.color}15`,
                        border: `1px solid ${stat.color}40`,
                        color: stat.color,
                      }}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <p className="font-display text-2xl font-bold tracking-tight text-[#111]">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mt-0.5 truncate">
                      {stat.label}
                    </p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ALL SECTIONS GRID */}
        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4">
            // Manage Content
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section, i) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <Link
                    to={section.href}
                    className="group block bg-white border border-black/10 rounded-xl p-5 hover:border-black/30 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all relative overflow-hidden"
                  >
                    <div
                      className="absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 0% 50%, ${section.color}15, transparent 60%)`,
                      }}
                    />

                    <div className="relative flex items-start justify-between gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0"
                        style={{
                          backgroundColor: `${section.color}15`,
                          border: `1px solid ${section.color}40`,
                          color: section.color,
                        }}
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                      </div>

                      <div className="flex items-center gap-2">
                        {section.count != null && (
                          <span
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: `${section.color}15`,
                              color: section.color,
                            }}
                          >
                            {section.count}
                          </span>
                        )}
                        <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#111] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>

                    <div className="relative">
                      <h3 className="font-display text-lg font-bold text-[#111] leading-tight mb-0.5">
                        {section.label}
                      </h3>
                      <p className="text-[11px] text-gray-500 leading-snug">
                        {section.desc}
                      </p>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: section.color }}
                    />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* SESSION INFO */}
        <div className="p-5 bg-white border border-black/10 rounded-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-3">
            // Session
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">
                Logged in as
              </p>
              <p className="text-[#111] font-medium truncate">
                {user?.email}
              </p>
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
        </div>
      </div>
    </section>
  )
}

export default Dashboard