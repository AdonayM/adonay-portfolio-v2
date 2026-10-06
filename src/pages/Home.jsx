// src/pages/Home.jsx
import { motion, animate, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/* ─── Animated counter ─── */
const Counter = ({ from = 0, to, duration = 1.8, suffix = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView) return
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, from, to, duration])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

/* ─── Glowing gray divider ─── */
const GlowDivider = ({ delay = 0 }) => (
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
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
    />
  </div>
)

const Home = ({ profile }) => {
  /* ─── Hero animation variants ─── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const stats = [
    { from: 0, to: 1, suffix: '%', label: 'TryHackMe Rank', pad: true },
    { from: 0, to: 225, suffix: '+', label: 'Rooms Completed' },
    { from: 0, to: 22, suffix: '', label: 'Badges Earned' },
  ]

  /* ─── Radar blips ─── */
  const blips = [
    { x: 28, y: 34, delay: 0.5, duration: 3.2 },
    { x: 68, y: 26, delay: 1.4, duration: 3.8 },
    { x: 72, y: 68, delay: 2.6, duration: 3.4 },
    { x: 34, y: 74, delay: 3.5, duration: 4.0 },
    { x: 52, y: 48, delay: 5.0, duration: 3.6 },
  ]

  return (
    <section className="bg-[#f0f0ef] text-[#111] pt-2 pb-16 px-6 lg:px-12 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto w-full">

        {/* ══════════ PAGE HEADER ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <div className="p-1 bg-white border border-black/10 rounded">
              <Terminal className="w-3.5 h-3.5 text-[#111]" strokeWidth={1.75} />
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500">
              // 00. Welcome
            </p>
          </div>

          <div className="mt-2.5 relative h-[2px] w-full overflow-hidden">
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

        {/* ══════════ HERO GRID ══════════ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center py-4"
        >
          {/* ════ LEFT: Text ════ */}
          <div className="lg:col-span-6 space-y-5">

            {/* Availability badge */}
            <motion.div
              variants={itemVariants}
              className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#06b6d4]/40 bg-gradient-to-r from-[#06b6d4]/8 to-[#a855f7]/8 backdrop-blur-sm overflow-hidden"
              style={{
                boxShadow:
                  '0 0 20px rgba(6,182,212,0.15), inset 0 0 12px rgba(6,182,212,0.05)',
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.25) 50%, transparent 100%)',
                  backgroundSize: '40% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
                animate={{ backgroundPosition: ['-50% 0%', '150% 0%'] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1.5,
                }}
              />
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-[#06b6d4]" />
              </span>
              <span className="relative text-[10px] font-mono uppercase tracking-[0.25em] text-[#111]">
                Available for opportunities
              </span>
            </motion.div>

            {/* Big title */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-black tracking-tighter leading-[0.95]"
            >
              Adonay's{' '}
              <span className="relative block">
                <span
                  style={{
                    WebkitTextStroke: '2px #111',
                    color: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  PORTFOLIO
                </span>

                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    WebkitTextStroke: '2px transparent',
                    color: 'transparent',
                    background:
                      'linear-gradient(90deg, transparent 0%, #06b6d4 50%, transparent 100%)',
                    backgroundSize: '40% 100%',
                    backgroundRepeat: 'no-repeat',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    display: 'inline-block',
                  }}
                  animate={{ backgroundPosition: ['-50% 0%', '150% 0%'] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 2,
                  }}
                >
                  PORTFOLIO
                </motion.span>
              </span>
            </motion.h1>

            {/* Bio — glowing left border */}
            <motion.div
              variants={itemVariants}
              className="relative max-w-lg"
            >
              <div
                className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full"
                style={{
                  background:
                    'linear-gradient(180deg, #06b6d4 0%, #a855f7 100%)',
                  boxShadow: '0 0 10px rgba(6,182,212,0.6)',
                }}
              />
              <p className="pl-5 text-[15px] leading-[1.8] text-gray-700 font-light">
                {profile?.bio ||
                  'Cybersecurity professional passionate about Vulnerability Assessment and Penetration Testing, application security, and DevSecOps.'}
              </p>
            </motion.div>

            {/* CTAs — enhanced hover */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-1"
            >
              <Link
                to="/projects"
                className="group relative inline-flex items-center gap-2 px-5 py-3 bg-[#111] text-[#f0f0ef] text-[10px] font-mono uppercase tracking-widest rounded-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow:
                      '0 12px 30px -8px rgba(6,182,212,0.6), 0 0 0 1px rgba(6,182,212,0.4)',
                  }}
                />
                <motion.span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.3) 50%, transparent 100%)',
                    backgroundSize: '60% 100%',
                    backgroundRepeat: 'no-repeat',
                  }}
                  animate={{
                    backgroundPosition: ['-60% 0%', '160% 0%'],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <span className="relative z-10">View Projects</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 px-5 py-3 border border-[#111] text-[10px] font-mono uppercase tracking-widest rounded-lg hover:bg-[#111] hover:text-[#f0f0ef] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <span
                  className="absolute inset-0 bg-[#111] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
                <span className="relative z-10">Contact Me</span>
              </Link>
            </motion.div>

            {/* Animated stats bar */}
            <motion.div
              variants={itemVariants}
              className="relative grid grid-cols-3 gap-4 pt-6 max-w-lg"
            >
              <GlowDivider delay={0} />

              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#111]">
                    {stat.pad && stat.to < 10 ? '0' : ''}
                    <Counter
                      from={stat.from}
                      to={stat.to}
                      suffix={stat.suffix}
                      duration={1.6 + i * 0.15}
                    />
                  </p>
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500 mt-1.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ════ RIGHT: Radar ════ */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 relative hidden lg:flex items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-[420px]">

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">

                  {[100, 75, 50, 25].map((size, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border border-[#06b6d4]/20"
                      style={{
                        width: `${size}%`,
                        height: `${size}%`,
                      }}
                    />
                  ))}

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-full h-[1px] bg-[#06b6d4]/10" />
                    <div className="absolute h-full w-[1px] bg-[#06b6d4]/10" />
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 0deg, rgba(6,182,212,0.4) 0deg, rgba(6,182,212,0.1) 40deg, transparent 90deg, transparent 360deg)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  <motion.div
                    className="absolute w-1/2 h-[1.5px] top-1/2 left-1/2 origin-left"
                    style={{
                      background:
                        'linear-gradient(90deg, #06b6d4 0%, transparent 100%)',
                      boxShadow: '0 0 12px rgba(6,182,212,0.9)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  <div className="absolute w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_20px_rgba(6,182,212,0.9)]" />

                  {blips.map((blip, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-[#06b6d4]"
                      style={{
                        left: `${blip.x}%`,
                        top: `${blip.y}%`,
                        boxShadow: '0 0 10px rgba(6,182,212,0.9)',
                      }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1, 1, 0.5],
                      }}
                      transition={{
                        duration: blip.duration,
                        delay: blip.delay,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}

                  <div className="absolute w-1/2 h-1/2 rounded-full bg-[#06b6d4]/8 blur-3xl pointer-events-none" />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute left-0 top-[28%] flex items-center gap-2"
              >
                <div className="flex items-center gap-2 bg-[#f0f0ef] border border-[#06b6d4]/30 rounded-full pl-1 pr-3 py-1 shadow-[0_10px_30px_-15px_rgba(6,182,212,0.4)]">
                  <div className="w-6 h-6 rounded-full bg-[#06b6d4]/15 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#111]">
                    Network Security
                  </span>
                </div>
                <div className="w-8 h-[1px] bg-gradient-to-r from-[#06b6d4]/60 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.85 }}
                className="absolute right-0 bottom-[28%] flex items-center gap-2 flex-row-reverse"
              >
                <div className="flex items-center gap-2 bg-[#f0f0ef] border border-[#a855f7]/30 rounded-full pl-1 pr-3 py-1 shadow-[0_10px_30px_-15px_rgba(168,85,247,0.4)]">
                  <div className="w-6 h-6 rounded-full bg-[#a855f7]/15 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#111]">
                    Pentester
                  </span>
                </div>
                <div className="w-8 h-[1px] bg-gradient-to-l from-[#a855f7]/60 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute top-0 right-0"
              >
                <div className="bg-[#111] text-[#f0f0ef] rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em]">
                    Top 1% TryHackMe
                  </span>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>

        {/* ══════════ BOTTOM SECTION — Quick links ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <GlowDivider delay={0.6} />

          {[
            { label: 'About Me', desc: 'Background & skills', href: '/about' },
            { label: 'Projects', desc: 'Security & full-stack', href: '/projects' },
            { label: 'Certifications', desc: 'Achievements & badges', href: '/achievements' },
            { label: 'Contact', desc: 'Get in touch', href: '/contact' },
          ].map((link, i) => (
            <Link key={link.label} to={link.href} className="group">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500 mb-1.5 group-hover:text-[#06b6d4] transition-colors">
                {`// 0${i + 1}`}
              </p>
              <p className="font-display text-lg font-bold text-[#111] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                {link.label}
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">{link.desc}</p>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Home