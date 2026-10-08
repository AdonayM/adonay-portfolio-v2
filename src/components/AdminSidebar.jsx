// src/components/AdminSidebar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Wrench,
  Briefcase,
  Rocket,
  Award,
  Target,
  FileArchive,
  BarChart3,
  LogOut,
  ExternalLink,
  X,
  Sun,
  Moon,
} from 'lucide-react'
import { useAuth } from '../lib/AuthContext'
import { useTheme } from '../lib/ThemeContext'

const SECTIONS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, color: '#06b6d4' },
  { label: 'Profile', href: '/admin/profile', icon: User, color: '#06b6d4' },
  { label: 'Education', href: '/admin/education', icon: GraduationCap, color: '#a855f7' },
  { label: 'Skills', href: '/admin/skills', icon: Wrench, color: '#2563eb' },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase, color: '#10b981' },
  { label: 'Projects', href: '/admin/projects', icon: Rocket, color: '#f59e0b' },
  { label: 'Certifications', href: '/admin/certifications', icon: Award, color: '#8b5cf6' },
  { label: 'TryHackMe', href: '/admin/tryhackme', icon: Target, color: '#dc2626' },
  { label: 'CV & Files', href: '/admin/files', icon: FileArchive, color: '#0ea5e9' },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, color: '#06b6d4' },
]

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'fixed top-0 left-0 h-screen w-60 z-50',
          'bg-white border-r border-black/10',
          'flex flex-col',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        {/* Logo + Theme toggle */}
        <div className="flex items-center justify-between h-14 px-3 border-b border-black/10 shrink-0">
          <Link
            to="/admin"
            className="flex items-center gap-2 group"
            onClick={onClose}
          >
            <div className="w-7 h-7 rounded-lg bg-[#111] flex items-center justify-center">
              <span className="text-[#f0f0ef] text-[11px] font-black">A</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-[13px] font-bold text-[#111]">
                Admin
              </span>
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                v2
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg hover:bg-black/5 transition-colors"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#111]" />
              ) : (
                <Moon className="w-4 h-4 text-[#111]" />
              )}
            </button>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg hover:bg-black/5"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <div className="space-y-0.5">
            {SECTIONS.map((section) => {
              const Icon = section.icon
              const isActive =
                section.href === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(section.href)

              return (
                <Link
                  key={section.href}
                  to={section.href}
                  onClick={onClose}
                  className={[
                    'group flex items-center gap-3 px-2.5 py-2 rounded-lg',
                    'transition-all duration-150',
                    isActive
                      ? 'bg-[#111] text-[#f0f0ef]'
                      : 'text-gray-700 hover:bg-black/5',
                  ].join(' ')}
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all"
                    style={{
                      backgroundColor: isActive
                        ? section.color
                        : `${section.color}15`,
                      color: isActive ? '#0a0a0a' : section.color,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </div>
                  <span className="text-[13px] font-medium truncate">
                    {section.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-black/10 p-3 space-y-0.5 shrink-0">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-gray-700 hover:bg-black/5 transition-all"
          >
            <div className="w-7 h-7 rounded-md bg-black/5 flex items-center justify-center">
              <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <span className="text-[13px] font-medium">View Site</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          >
            <div className="w-7 h-7 rounded-md bg-red-50 flex items-center justify-center">
              <LogOut className="w-3.5 h-3.5 text-red-600" />
            </div>
            <span className="text-[13px] font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar