// src/pages/ProjectDetail.jsx
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ExternalLink,
  Laptop,
  Smartphone,
  Award,
  Trophy,
  Shield,
  CheckCircle2,
  Cloud,
  Database,
  Server,
  Code,
  Sparkles,
} from 'lucide-react'
import { findSpec } from '../lib/projectSpecs'

/* Animations */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const ProjectDetail = () => {
  const { id } = useParams()
  const spec = findSpec(id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!spec) {
    return (
      <section className="min-h-screen bg-[#f0f0ef] flex flex-col items-center justify-center gap-6 px-6">
        <p className="font-display font-bold text-4xl text-center">
          Project not found.
        </p>
        <Link
          to="/projects"
          className="text-sm font-mono uppercase tracking-widest underline"
        >
          ← Back to Projects
        </Link>
      </section>
    )
  }

  const getIcon = () => {
    switch (spec.icon) {
      case 'phone':
        return <Smartphone className="w-5 h-5" strokeWidth={1.75} />
      case 'award':
        return <Award className="w-5 h-5" strokeWidth={1.75} />
      default:
        return <Laptop className="w-5 h-5" strokeWidth={1.75} />
    }
  }

  return (
    <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-16 pb-20 px-6 lg:px-12 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* SINGLE ROW HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mb-10"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 flex-wrap"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 hover:text-[#111] transition-colors group shrink-0"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Projects
            </Link>

            <span className="text-gray-300 text-xs">/</span>

            <div className="p-1.5 bg-white border border-black/10 rounded-md shadow-sm shrink-0">
              {getIcon()}
            </div>

            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-none">
              {spec.title}
            </h1>

            {spec.subtitle && (
              <p className="font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.2em] uppercase">
                / {spec.subtitle}
              </p>
            )}
          </motion.div>

          {/* ANIMATED MOVING GRADIENT UNDERLINE */}
          <div className="mt-5 relative h-[2px] w-full overflow-hidden">
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

        {/* SPECIAL LAYOUTS */}
        {spec.slug === 'tryhackme' && <TryHackMeLayout spec={spec} />}
        {spec.slug === 'expense-tracker' && <ExpenseTrackerLayout spec={spec} />}
        {['n4yctf', 'n4yadmin', 'n4yvault'].includes(spec.slug) && (
          <N4yCaseStudyLayout spec={spec} />
        )}
        {['clearance-mrs', 'legal-connect'].includes(spec.slug) && (
          <StandardLayout spec={spec} />
        )}
      </div>

      {/* DEMONSTRATED SKILLS STICKER */}
      {spec.skills && spec.skills.length > 0 && (
        <div className="hidden lg:block fixed bottom-10 right-10 z-30 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
            whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
            viewport={{ once: false }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.6 }}
            className="relative"
          >
            <div className="bg-[#111] text-[#f0f0ef] px-6 py-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rotate-[-4deg]">
              <p className="text-[9px] uppercase tracking-[0.3em] opacity-60 mb-1">
                Demonstrated
              </p>
              <p
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: 'cursive' }}
              >
                Skills
              </p>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.9)]" />
          </motion.div>
        </div>
      )}
    </section>
  )
}

/* ============================================================ */
/* N4y CASE STUDY LAYOUT — 2×2 quadrant                          */
/* ============================================================ */
const N4yCaseStudyLayout = ({ spec }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">

      {/* LEFT COLUMN — screenshots + cards */}
      <div className="space-y-6">

        {spec.screenshots && spec.screenshots[0] && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScreenshotCard
              src={spec.screenshots[0]}
              alt={`${spec.title} preview`}
            />
          </motion.div>
        )}

        {spec.screenshots && spec.screenshots[1] && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <ScreenshotCard
              src={spec.screenshots[1]}
              alt={`${spec.title} detail`}
            />
          </motion.div>
        )}

        {spec.highlights && spec.highlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white border border-black/10 rounded-xl p-6"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-4">
              Highlights
            </p>
            <ul className="space-y-3">
              {spec.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
                  className="flex gap-3 text-sm leading-relaxed"
                >
                  <span className="text-[#06b6d4] shrink-0 mt-0.5 text-xs">
                    ▸
                  </span>
                  <span className="text-gray-800">{h}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {spec.specs && spec.specs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm border border-black/10 rounded-xl p-6"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-4">
              Tech Stack
            </p>
            <div className="space-y-3">
              {spec.specs.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.06 }}
                  className="grid grid-cols-[90px_1fr] gap-3 items-start"
                >
                  <div className="flex items-center gap-1.5">
                    <SpecIcon label={row.label} />
                    <span className="font-bold text-[10px] uppercase tracking-widest text-[#111]">
                      {row.label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-700 leading-relaxed">
                    {row.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* RIGHT COLUMN — prose + takeaway + links */}
      <div className="space-y-6 lg:pt-4">

        {spec.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display italic text-2xl md:text-[28px] leading-tight text-gray-800"
          >
            {spec.tagline}
          </motion.p>
        )}

        {spec.intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-base md:text-[17px] leading-[1.75] text-gray-800 font-light"
          >
            {spec.intro}
          </motion.p>
        )}

        {spec.challenge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative pl-5"
          >
            <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-[#06b6d4] via-[#a855f7] to-transparent" />
            <p className="font-display italic text-[17px] md:text-lg leading-[1.6] text-gray-900">
              {spec.challenge}
            </p>
          </motion.div>
        )}

        {spec.build && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base md:text-[17px] leading-[1.75] text-gray-800 font-light"
          >
            {spec.build}
          </motion.p>
        )}

        {spec.takeaway && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display italic text-[15px] leading-[1.7] text-gray-700 pt-4 border-t border-black/10"
          >
            {spec.takeaway}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap gap-2 pt-2"
        >
          <a
            href="https://github.com/AdonayM"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-4 py-3 border border-[#111] rounded-lg hover:bg-[#111] hover:text-[#f0f0ef] transition-all hover:-translate-y-0.5"
          >
            View Source
          </a>
          {spec.slug === 'n4yctf' && (
            <a
              href="https://n4y-ctf-one.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-4 py-3 bg-[#111] text-[#f0f0ef] rounded-lg hover:bg-gray-800 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.6)]"
            >
              Live Demo <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </motion.div>
      </div>
    </div>
  )
}

/* ============================================================ */
/* STANDARD LAYOUT — screenshots left, prose right               */
/* Used for: Clearance MRS, Legal Connect                        */
/* ============================================================ */
const StandardLayout = ({ spec }) => {
  return (
    <div className="space-y-20">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        <div className="lg:col-span-7 space-y-8">
          {spec.screenshots && spec.screenshots[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ScreenshotCard
                src={spec.screenshots[0]}
                alt={`${spec.title} preview`}
              />
            </motion.div>
          )}

          {spec.screenshots && spec.screenshots[1] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <ScreenshotCard
                src={spec.screenshots[1]}
                alt={`${spec.title} detail`}
              />
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">

          {spec.tagline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display italic text-2xl md:text-[28px] leading-tight text-gray-800"
            >
              {spec.tagline}
            </motion.p>
          )}

          {spec.intro && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-base md:text-[17px] leading-[1.75] text-gray-800 font-light"
            >
              {spec.intro}
            </motion.p>
          )}

          {spec.challenge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative pl-5"
            >
              <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-[#06b6d4] via-[#a855f7] to-transparent" />
              <p className="font-display italic text-[17px] md:text-lg leading-[1.6] text-gray-900">
                {spec.challenge}
              </p>
            </motion.div>
          )}

          {spec.build && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base md:text-[17px] leading-[1.75] text-gray-800 font-light"
            >
              {spec.build}
            </motion.p>
          )}

          {spec.highlights && spec.highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-black/10 rounded-xl p-6"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-4">
                Highlights
              </p>
              <ul className="space-y-3">
                {spec.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.25 + i * 0.05 }}
                    className="flex gap-3 text-sm leading-relaxed"
                  >
                    <span className="text-[#06b6d4] shrink-0 mt-0.5 text-xs">
                      ▸
                    </span>
                    <span className="text-gray-800">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {spec.specs && spec.specs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="bg-white/70 backdrop-blur-sm border border-black/10 rounded-xl p-6"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-4">
                Tech Stack
              </p>
              <div className="space-y-3">
                {spec.specs.map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                    className="grid grid-cols-[90px_1fr] gap-3 items-start"
                  >
                    <div className="flex items-center gap-1.5">
                      <SpecIcon label={row.label} />
                      <span className="font-bold text-[10px] uppercase tracking-widest text-[#111]">
                        {row.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-700 leading-relaxed">
                      {row.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {spec.framework && spec.framework.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-4">
                Built Frameworks
              </p>
              <div className="grid grid-cols-2 gap-3">
                {spec.framework.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.35 + i * 0.05 }}
                    className="px-4 py-3 bg-white border border-black/10 rounded-lg text-center font-bold text-sm hover:border-[#06b6d4] hover:shadow-md transition-all"
                  >
                    {f}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {spec.takeaway && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-display italic text-[15px] leading-[1.7] text-gray-700 pt-4 border-t border-black/10"
            >
              {spec.takeaway}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            <a
              href="https://github.com/AdonayM"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-4 py-3 border border-[#111] rounded-lg hover:bg-[#111] hover:text-[#f0f0ef] transition-all hover:-translate-y-0.5"
            >
              View Source
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================ */
/* EXPENSE TRACKER LAYOUT                                        */
/* ============================================================ */
const ExpenseTrackerLayout = ({ spec }) => {
  const hasVideo = spec.videos && spec.videos.length > 0
  const videoSrc = hasVideo ? spec.videos[0] : null
  const screenshotSrc = spec.screenshots[0]

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div className="w-full max-w-[280px]">
            <PhoneCard
              src={videoSrc || spec.screenshots[0]}
              alt="Expense Tracker demo"
              isVideo={hasVideo}
            />
          </div>
        </motion.div>

        {spec.highlights && spec.highlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border border-black/10 rounded-xl p-6"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-4">
              Highlights
            </p>
            <ul className="space-y-3">
              {spec.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.05 }}
                  className="flex gap-3 text-sm leading-relaxed"
                >
                  <span className="text-[#06b6d4] shrink-0 mt-0.5 text-xs">
                    ▸
                  </span>
                  <span className="text-gray-800">{h}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {spec.techStack && spec.techStack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/70 backdrop-blur-sm border border-black/10 rounded-xl p-6"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-4">
              Tech Stack
            </p>
            <ul className="space-y-2.5">
              {spec.techStack.map((t, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
                  className="flex gap-3 text-sm leading-relaxed"
                >
                  <span className="text-[#a855f7] shrink-0 mt-0.5 text-xs">
                    ▸
                  </span>
                  <span className="text-gray-800">{t}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      <div className="space-y-6">
        {spec.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display italic text-2xl md:text-[28px] leading-tight text-gray-800"
          >
            {spec.tagline}
          </motion.p>
        )}

        {spec.intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-base leading-[1.75] text-gray-800 font-light"
          >
            {spec.intro}
          </motion.p>
        )}

        {spec.challenge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative pl-5"
          >
            <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-[#06b6d4] via-[#a855f7] to-transparent" />
            <p className="font-display italic text-[16px] leading-[1.6] text-gray-900">
              {spec.challenge}
            </p>
          </motion.div>
        )}

        {spec.build && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base leading-[1.75] text-gray-800 font-light"
          >
            {spec.build}
          </motion.p>
        )}

        {spec.takeaway && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display italic text-[15px] leading-[1.7] text-gray-700 pt-4 border-t border-black/10"
          >
            {spec.takeaway}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="flex justify-center pt-2"
        >
          <div className="w-full max-w-[320px]">
            <ScreenshotCard
              src={screenshotSrc}
              alt="Expense Tracker preview"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ============================================================ */
/* TRYHACKME LAYOUT — stats + all 22 badges                      */
/* ============================================================ */
const TryHackMeLayout = ({ spec }) => {
  const stats = [
    { value: '18,911', label: 'Global Rank', accent: '#06b6d4' },
    { value: 'Top 1%', label: 'Percentile', accent: '#a855f7' },
    { value: '237', label: 'Rooms Completed', accent: '#2563eb' },
    { value: '22', label: 'Badges Earned', accent: '#10b981' },
    { value: '77', label: 'Day Streak', accent: '#f59e0b' },
  ]

  const badges = [
    { name: 'First Four', desc: 'Completing four rooms in your first week of joining!', rarity: 'Common: 30.9%', color: '#a855f7' },
    { name: '3 Day Streak', desc: 'Achieving a 3 day hacking streak', rarity: 'Common: 33%', color: '#10b981' },
    { name: 'cat linux.txt', desc: 'Being competent in Linux', rarity: 'Common: 21%', color: '#f59e0b' },
    { name: 'OhSINT', desc: 'Completing the OhSINT room', rarity: 'Rare: 4.6%', color: '#2563eb' },
    { name: 'Silver League', desc: 'Silver League 1st place', rarity: 'Rare: 2.5%', color: '#94a3b8' },
    { name: 'Webbed', desc: 'Understands how the world wide web works', rarity: 'Common: 18.5%', color: '#6b7280' },
    { name: 'World Wide Web', desc: "Completing the 'How The Web Works' module", rarity: 'Common: 16%', color: '#06b6d4' },
    { name: 'Sapphire League', desc: 'Sapphire League 1st place', rarity: 'Epic: 0.9%', color: '#2563eb' },
    { name: 'Session Held', desc: 'Completing 4 weekly missions in a row!', rarity: 'Rare: 4.7%', color: '#06b6d4' },
    { name: 'Introduction to Security Engineering', desc: 'Completed the Security Engineer Intro room!', rarity: 'Rare: 4.8%', color: '#0ea5e9' },
    { name: 'OWASP Top 10', desc: 'Understanding every OWASP vulnerability', rarity: 'Rare: 8%', color: '#eab308' },
    { name: 'Bronze League', desc: 'Bronze League 1st place', rarity: 'Rare: 6.1%', color: '#a16207' },
    { name: '7 Day Streak', desc: 'Achieving a 7 day hacking streak', rarity: 'Common: 20.1%', color: '#10b981' },
    { name: 'Cyber Ready', desc: 'Understanding impact of training on teams', rarity: 'Rare: 6.8%', color: '#eab308' },
    { name: 'Blue', desc: 'Hacking into Windows via EternalBlue', rarity: 'Rare: 9.6%', color: '#2563eb' },
    { name: 'Defrosted Five', desc: 'Completing AoC Side Quest 2024!', rarity: 'Epic: 0.3%', color: '#a855f7' },
    { name: '3 Million Legend', desc: 'Was a legend and solved any room in the 3 Million Users Special Module!', rarity: 'Rare: 1.5%', color: '#10b981' },
    { name: 'SOC Level-Up', desc: 'Begin your journey as a SOC L2 analyst', rarity: 'Rare: 1.3%', color: '#0ea5e9' },
    { name: '30 Day Streak', desc: 'Hacking for 30 days solid', rarity: 'Rare: 9.6%', color: '#dc2626' },
    { name: 'The Return of the Yeti', desc: 'Completed at least one Advent of Cyber 2023 Side Quest Challenge!', rarity: 'Epic: 0.6%', color: '#2563eb' },
    { name: 'Advent of Cyber 2025', desc: 'Completing Advent of Cyber 2025!', rarity: 'Rare: 2.6%', color: '#f59e0b' },
    { name: 'Hash Cracker', desc: 'Cracking all those hashes', rarity: 'Rare: 4.2%', color: '#7c3aed' },
  ]

  const rarityColor = (rarity) => {
    if (rarity.startsWith('Epic')) return '#a855f7'
    if (rarity.startsWith('Rare')) return '#06b6d4'
    if (rarity.startsWith('Common')) return '#6b7280'
    return '#111111'
  }

  return (
    <div className="space-y-16">

      {/* Stage 1 — Prose + Stats */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-7 space-y-5">
          {spec.tagline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display italic text-2xl md:text-[26px] leading-tight text-gray-800"
            >
              {spec.tagline}
            </motion.p>
          )}

          {spec.intro && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-base md:text-[16px] leading-[1.75] text-gray-800 font-light"
            >
              {spec.intro}
            </motion.p>
          )}

          {spec.challenge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative pl-5"
            >
              <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-[#06b6d4] via-[#a855f7] to-transparent" />
              <p className="font-display italic text-[16px] leading-[1.6] text-gray-900">
                {spec.challenge}
              </p>
            </motion.div>
          )}

          {spec.build && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base md:text-[16px] leading-[1.75] text-gray-800 font-light"
            >
              {spec.build}
            </motion.p>
          )}

          {spec.takeaway && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display italic text-[15px] leading-[1.7] text-gray-700 pt-4 border-t border-black/10"
            >
              {spec.takeaway}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="pt-2"
          >
            <a
              href="https://tryhackme.com/p/4d0n4y"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-5 py-3.5 bg-[#111] text-[#f0f0ef] rounded-lg hover:bg-gray-800 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.6)]"
            >
              View Full Profile on TryHackMe
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white border border-black/10 rounded-xl p-5 hover:border-black/30 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.25)] transition-all"
              >
                <div
                  className="w-8 h-1 rounded-full mb-3"
                  style={{
                    backgroundColor: stat.accent,
                    boxShadow: `0 0 12px ${stat.accent}80`,
                  }}
                />
                <p className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#111]">
                  {stat.value}
                </p>
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500 mt-1.5">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stage 2 — Badges grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="mb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
            // Badge Collection
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            All 22 Badges Earned
          </h2>
          <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-[#06b6d4] to-[#a855f7]" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="group bg-white border border-black/10 rounded-xl p-4 hover:border-black/30 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-display font-bold text-[13px] text-white"
                  style={{
                    backgroundColor: badge.color,
                    boxShadow: `0 4px 12px ${badge.color}40`,
                  }}
                >
                  {badge.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[13px] text-[#111] leading-tight mb-1">
                    {badge.name}
                  </p>
                  <p className="text-[11px] text-gray-600 leading-snug mb-2">
                    {badge.desc}
                  </p>
                  <span
                    className="inline-block text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${rarityColor(badge.rarity)}15`,
                      color: rarityColor(badge.rarity),
                    }}
                  >
                    {badge.rarity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/* ============================================================ */
/* SHARED COMPONENTS                                             */
/* ============================================================ */

const ScreenshotCard = ({ src, alt }) => (
  <div className="group relative">
    <div className="absolute -inset-3 bg-gradient-to-br from-[#06b6d4]/10 to-[#a855f7]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-white border border-black/10 rounded-xl p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_30px_70px_-20px_rgba(6,182,212,0.3)] group-hover:-translate-y-1 transition-all duration-500">
      <img src={src} alt={alt} className="w-full h-auto block rounded-lg" />
    </div>
  </div>
)

const PhoneCard = ({ src, alt, isVideo = false }) => (
  <div className="group relative">
    <div className="absolute -inset-4 bg-gradient-to-br from-[#06b6d4]/15 to-[#a855f7]/15 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-black rounded-[36px] p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] group-hover:-translate-y-1 transition-all duration-500">
      {isVideo ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-[26px] w-full block"
        />
      ) : (
        <img src={src} alt={alt} className="rounded-[26px] w-full block" />
      )}
    </div>
  </div>
)

const SpecIcon = ({ label }) => {
  const cls = 'w-3.5 h-3.5 text-[#06b6d4]'
  switch (label.toLowerCase()) {
    case 'frontend':
      return <Code className={cls} />
    case 'backend':
      return <Server className={cls} />
    case 'database':
      return <Database className={cls} />
    case 'security':
      return <Shield className={cls} />
    case 'cloud':
      return <Cloud className={cls} />
    default:
      return <Sparkles className={cls} />
  }
}

export default ProjectDetail