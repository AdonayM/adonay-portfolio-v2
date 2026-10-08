// src/components/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, FileText } from 'lucide-react'
import { useProfile } from '../lib/hooks'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { data: profile } = useProfile()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certifications', path: '/achievements' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f0f0ef]/90 backdrop-blur-xl border-b border-black/10 py-3'
          : 'bg-[#f0f0ef] py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Shield className="w-5 h-5 text-[#111]" />
            <span className="font-black text-[15px] tracking-tighter text-[#111]">
              Adonay<span className="text-[#06b6d4]">.</span>
            </span>
          </Link>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                location.pathname.startsWith(link.path) && link.path !== '/'
              const isHome = link.path === '/' && location.pathname === '/'
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-[12px] font-medium transition-all duration-200 ${
                    isActive || isHome
                      ? 'text-[#111] font-bold underline underline-offset-4 decoration-[#06b6d4] decoration-2'
                      : 'text-gray-600 hover:text-[#111]'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Right: Theme toggle + Resume + Mobile menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {profile?.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-[10px] font-mono uppercase tracking-widest text-[#111] border border-[#111] rounded-lg hover:bg-[#111] hover:text-[#f0f0ef] transition-all"
                title="Download Resume"
              >
                <FileText className="w-3 h-3" />
                Resume
              </a>
            )}

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#111] p-2"
              >
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#f0f0ef] border-b border-black/10 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-4 py-3 text-gray-700 hover:text-[#111] hover:bg-black/5 rounded-xl text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {profile?.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-[#111] border border-[#111] rounded-xl text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar