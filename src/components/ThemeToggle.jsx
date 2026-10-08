// src/components/ThemeToggle.jsx
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../lib/ThemeContext'

/**
 * Small animated light/dark toggle.
 * Usage: <ThemeToggle />
 */
const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-300 ${className}`}
      style={{
        borderColor: isDark
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(0, 0, 0, 0.15)',
        backgroundColor: isDark
          ? 'rgba(255, 255, 255, 0.03)'
          : 'rgba(255, 255, 255, 0.6)',
      }}
    >
      {/* Soft glow on hover */}
      <span
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: '0 0 0 1px rgba(6,182,212,0.4)',
        }}
      />

      {/* Icons — one fades out as the other fades in */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: isDark ? 180 : 0, opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Sun className="w-4 h-4 text-[#111]" strokeWidth={1.75} />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: isDark ? 0 : -180, opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Moon className="w-4 h-4 text-[#f0f0ef]" strokeWidth={1.75} />
      </motion.div>
    </button>
  )
}

export default ThemeToggle
