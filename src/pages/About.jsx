// src/pages/About.jsx
import { motion } from 'framer-motion'
import {
  Shield,
  Globe,
  Code,
  Factory,
  FileText,
  Award,
  Briefcase,
  MapPin,
} from 'lucide-react'

const About = () => {
  /* ─── Bio ─── */
  const bioParagraphs = [
    "Hello! I'm Adonay Mussie, a cybersecurity professional passionate about Vulnerability Assessment and Penetration Testing, application security, and DevSecOps. I have hands-on experience testing web applications and APIs, performing vulnerability assessments, and analyzing source code to identify security weaknesses.",
    'I enjoy exploring how systems work, finding vulnerabilities, and developing security-focused projects to strengthen my practical skills. Through professional experience, certifications, and hands-on platforms such as TryHackMe, I continue to expand my knowledge of cybersecurity, networking, and secure software development.',
    'My goal is to grow into a well-rounded cybersecurity professional and contribute to building more secure applications, systems, and organizations.',
  ]

  /* ─── Education ─── */
  const education = [
    {
      institution: 'SeGoMe Academy',
      degree: 'KG – 1',
      period: 'Foundation',
      cgpa: null,
    },
    {
      institution: 'Abune MelkeTsedek Academy',
      degree: 'Elementary [Grade 2 – 10]',
      period: 'Foundation',
      cgpa: null,
    },
    {
      institution: 'Yaberus General Sec & Pre',
      degree: 'Preparatory [Grade 11 – 12]',
      period: 'Completed',
      cgpa: null,
    },
    {
      institution: 'Bahirdar University',
      degree: 'Bachelor of Computer Engineering',
      period: '2022 – 2026',
      cgpa: '3.68 / 4.0',
    },
    {
      institution: 'Bahirdar University',
      degree: 'Bachelor of Management',
      period: '2021 – 2025',
      cgpa: '3.20 / 4.0',
    },
  ]

  /* ─── Skills (with hover descriptions) ─── */
  const skills = [
    {
      name: 'Penetration Testing',
      icon: Shield,
      color: '#06b6d4',
      level: 'Advanced',
      description: 'More than 100 websites and APIs penetration tested.',
    },
    {
      name: 'Computer Network',
      icon: Globe,
      color: '#a855f7',
      level: 'Advanced',
      description: 'CISCO ITN certified — routing, switching, protocols.',
    },
    {
      name: 'Web Development',
      icon: Code,
      color: '#2563eb',
      level: 'Intermediate',
      description: 'CTF-based and daily-used websites developed.',
    },
    {
      name: 'Manufacturing Mgmt.',
      icon: Factory,
      color: '#10b981',
      level: 'Intermediate',
      description: 'Kayak boat development experience.',
    },
    {
      name: 'SharePoint Documentation',
      icon: FileText,
      color: '#f59e0b',
      level: 'Advanced',
      description: 'Enterprise documentation & knowledge base management.',
    },
  ]

  /* ─── Experience (INSA corrected) ─── */
  const experience = [
    {
      company: 'CBE IS Security',
      role: 'Vulnerability Assessment & Penetration Testing',
      focus: 'Application & DevSecOps Security',
      period: '2024 – Present',
      location: 'Addis Ababa, Ethiopia',
      description:
        'Conducted vulnerability assessments, performed penetration testing on web applications and APIs, and analyzed source code to identify security weaknesses.',
      highlights: [
        'Web app & API security testing',
        'Source code review',
        'DevSecOps pipeline integration',
        'Vulnerability reporting',
      ],
    },
    {
      company: 'INSA',
      role: 'Penetration Testing Intern',
      focus: 'Cyber Audit Division',
      period: '2023',
      location: 'Addis Ababa, Ethiopia',
      description:
        'Focused on penetration testing within the Cyber Audit Division — assessing systems, identifying vulnerabilities, and documenting security findings for internal audits.',
      highlights: [
        'Penetration testing engagements',
        'Security finding documentation',
      ],
    },
  ]

  /* ══════════ ANIMATION VARIANTS ══════════ */
  const paragraphVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -40, rotate: -4 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-2 pb-20 px-6 lg:px-12 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* ══════════ PAGE HEADER ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <div className="p-1 bg-white border border-black/10 rounded">
              <Award className="w-3.5 h-3.5 text-[#111]" strokeWidth={1.75} />
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500">
              About
            </p>
          </div>

          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-none">
            The Story So Far
          </h1>

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

        {/* ══════════ SECTION 1 + 2: ABOUT + EDUCATION ══════════ */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* ════ LEFT: About Me ════ */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                  // 01. About Me
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                  Hello, I'm Adonay.
                </h2>
              </motion.div>

              <div className="relative">
                {/* Profile card */}
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="float-left mr-5 mb-3 w-44 lg:w-52"
                >
                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                      boxShadow: [
                        '0 20px 50px -25px rgba(0,0,0,0.25)',
                        '0 30px 60px -25px rgba(6,182,212,0.35)',
                        '0 20px 50px -25px rgba(0,0,0,0.25)',
                      ],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white border border-black/10 rounded-xl p-4"
                  >
                    <div className="aspect-square rounded-lg mb-3 relative overflow-hidden">
  {/* Your photo */}
  <img
    src="/profile/adonay.jpg"
    alt="Adonay Mussie"
    className="w-full h-full object-cover"
  />

  {/* Shimmer overlay on top of the photo */}
  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      backgroundSize: '200% 200%',
    }}
    animate={{ backgroundPosition: ['-100% 0%', '200% 0%'] }}
    transition={{
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut',
      repeatDelay: 2,
    }}
  />

  {/* Subtle gradient tint for the cyber vibe */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0.15) 100%)',
      mixBlendMode: 'overlay',
    }}
  />
</div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-[#06b6d4] shrink-0" />
                        <span className="text-[10px] font-mono text-gray-600 truncate">
                          Ethiopia
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 text-[#06b6d4] shrink-0" />
                        <span className="text-[10px] font-mono text-gray-600 truncate">
                          DevSecOps Security
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-3 h-3 text-[#06b6d4] shrink-0" />
                        <span className="text-[10px] font-mono text-gray-600 truncate">
                          Top 1% TryHackMe
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Bio paragraphs */}
                <div className="space-y-4 text-[15px] leading-[1.75] text-gray-800 font-light">
                  {bioParagraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      variants={paragraphVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.4 }}
                      custom={i}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>

                <div className="clear-both" />
              </div>
            </div>

            {/* ════ RIGHT: Education ════ */}
            <div className="lg:col-span-5 lg:pl-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                  // 02. Education
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                  Academic Background
                </h2>

                <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-[#06b6d4] to-[#a855f7]" />
              </motion.div>

              <div className="relative pl-5">
                <motion.div
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="absolute left-[3px] top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-[#06b6d4] via-[#a855f7] to-transparent"
                  style={{
                    boxShadow:
                      '0 0 8px rgba(6,182,212,0.6), 0 0 16px rgba(168,85,247,0.3)',
                  }}
                />

                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative pb-3 last:pb-0 group"
                  >
                    <div className="absolute -left-5 top-[6px] flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.08 + 0.3,
                          type: 'spring',
                          stiffness: 200,
                        }}
                        className="w-2.5 h-2.5 rounded-full bg-white border-2 border-[#06b6d4] group-hover:scale-125 transition-transform"
                        style={{
                          boxShadow:
                            '0 0 8px rgba(6,182,212,0.7), 0 0 16px rgba(6,182,212,0.3)',
                        }}
                      />
                    </div>

                    <div className="pb-3 border-b border-black/10 group-last:border-b-0">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-[#06b6d4] mb-1">
                        {edu.period}
                      </p>

                      <h3 className="font-display text-[14px] font-bold text-[#111] leading-tight group-hover:text-[#06b6d4] transition-colors">
                        {edu.institution}
                      </h3>

                      <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                        {edu.degree}
                        {edu.cgpa && (
                          <span className="ml-2 font-mono text-[10px] text-gray-500">
                            · CGPA {edu.cgpa}
                          </span>
                        )}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 3 + 4: SKILLS + EXPERIENCE ══════════ */}
        <section className="mb-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* ════ LEFT: SKILLS ════ */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                  // 03. Skills
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                  What I Bring to the Table
                </h2>

                <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-[#06b6d4] to-[#a855f7]" />
              </motion.div>

              <div className="space-y-3">
                {skills.map((skill, i) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="group relative"
                    >
                      <div className="relative bg-white border border-black/10 rounded-lg px-4 py-3 flex items-center gap-4 hover:border-black/30 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)] transition-all duration-300 overflow-hidden cursor-default">
                        <div
                          className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: `${skill.color}15`,
                            border: `1px solid ${skill.color}40`,
                            color: skill.color,
                          }}
                        >
                          <Icon className="w-4 h-4" strokeWidth={1.75} />
                        </div>

                        <h3 className="font-display font-bold text-[#111] text-[14px] flex-1 leading-tight">
                          {skill.name}
                        </h3>

                        <span
                          className="shrink-0 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: `${skill.color}15`,
                            color: skill.color,
                          }}
                        >
                          {skill.level}
                        </span>

                        <div
                          className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: skill.color }}
                        />
                      </div>

                      {/* HOVER TOOLTIP */}
                      <div
                        className="pointer-events-none absolute left-0 right-0 -bottom-1 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20"
                        style={{ transitionDelay: '50ms' }}
                      >
                        <div
                          className="mt-2 mx-2 bg-[#111] text-white text-[11px] leading-snug rounded-lg px-3 py-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] border border-white/10 flex items-start gap-2"
                          style={{
                            boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5), 0 0 0 1px ${skill.color}30`,
                          }}
                        >
                          <div
                            className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                            style={{
                              backgroundColor: skill.color,
                              boxShadow: `0 0 6px ${skill.color}`,
                            }}
                          />
                          <span className="flex-1">{skill.description}</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* ════ RIGHT: EXPERIENCE ════ */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
                  // 04. Experience
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                  Where I've Worked
                </h2>

                <div className="mt-4 h-[2px] w-16 bg-gradient-to-r from-[#06b6d4] to-[#a855f7]" />
              </motion.div>

              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white border border-black/10 rounded-xl p-5 hover:border-black/30 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.25)] transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <Briefcase
                          className="w-3.5 h-3.5 shrink-0"
                          style={{
                            color: i === 0 ? '#06b6d4' : '#a855f7',
                          }}
                        />
                        <span
                          className="text-[9px] font-mono uppercase tracking-[0.22em] font-bold"
                          style={{
                            color: i === 0 ? '#06b6d4' : '#a855f7',
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {exp.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                          <span className="text-[10px] font-mono text-gray-500">
                            {exp.location}
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#111] leading-tight">
                      {exp.company}
                    </h3>
                    <p className="text-[13px] font-medium text-gray-700 mt-0.5">
                      {exp.role}
                    </p>
                    <p className="text-[10px] font-mono text-gray-500 mt-0.5 mb-3">
                      {exp.focus}
                    </p>

                    <p className="text-[13px] text-gray-700 leading-[1.65] font-light mb-3">
                      {exp.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-1.5 pt-3 border-t border-black/10">
                      {exp.highlights.map((h, j) => (
                        <div
                          key={j}
                          className="flex gap-1.5 text-[12px] text-gray-600 leading-snug"
                        >
                          <span
                            className="shrink-0 mt-0.5 text-[10px]"
                            style={{
                              color: i === 0 ? '#06b6d4' : '#a855f7',
                            }}
                          >
                            ▸
                          </span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default About