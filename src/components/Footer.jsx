// src/components/Footer.jsx
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative py-6 bg-[#f0f0ef]">
      {/* Glowing gray divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(120,120,120,0.9) 50%, transparent 100%)',
            backgroundSize: '40% 100%',
            backgroundRepeat: 'no-repeat',
          }}
          animate={{ backgroundPosition: ['-50% 0%', '150% 0%'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: 1.2 }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <p className="text-[11px] font-mono text-gray-500">
          © {new Date().getFullYear()} Adonay Mussie
        </p>
        <p className="text-[11px] font-mono text-gray-400 uppercase tracking-[0.2em]">
          Addis Ababa · Ethiopia
        </p>
      </div>
    </footer>
  )
}

export default Footer