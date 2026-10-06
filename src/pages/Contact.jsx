// src/pages/Contact.jsx
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  Send,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react'

const Contact = ({ profile }) => {
  /* ─── Inline SVG icons ─── */
  const GithubIcon = ({ className }) => (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  )

  const LinkedinIcon = ({ className }) => (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )

  /* ─── Contact channels ─── */
  const contactChannels = [
    {
      label: 'Email',
      value: profile?.email || 'adonayneamn@gmail.com',
      href: `mailto:${profile?.email || 'adonayneamn@gmail.com'}`,
      icon: Mail,
      color: '#06b6d4',
      hint: 'Drop me a message',
    },
    {
      label: 'Phone',
      value: profile?.phone || '0942162425',
      href: `tel:${profile?.phone || '0942162425'}`,
      icon: Phone,
      color: '#a855f7',
      hint: 'Available 9am – 6pm EAT',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/adonaymussie',
      href:
        profile?.linkedin_url ||
        'https://www.linkedin.com/in/adonaymussie/',
      icon: LinkedinIcon,
      color: '#0a66c2',
      hint: 'Connect professionally',
    },
    {
      label: 'GitHub',
      value: 'github.com/AdonayM',
      href: profile?.github_url || 'https://github.com/AdonayM',
      icon: GithubIcon,
      color: '#111111',
      hint: 'Code, projects & security labs',
    },
    {
      label: 'Telegram',
      value: 't.me/AdonayM',
      href: profile?.telegram_url || 'https://t.me/AdonayM',
      icon: Send,
      color: '#0088cc',
      hint: 'Quick chats',
    },
  ]

  /* ══════════ ANIMATION VARIANTS ══════════ */
  const cardVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-2 pb-20 px-6 lg:px-12 overflow-x-hidden">
      <div className="max-w-[900px] mx-auto">

        {/* ══════════ PAGE HEADER ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <div className="p-1 bg-white border border-black/10 rounded">
              <MessageCircle
                className="w-3.5 h-3.5 text-[#111]"
                strokeWidth={1.75}
              />
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500">
              // 06. Get in Touch
            </p>
          </div>

          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-none">
            Contact
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

        {/* ══════════ INTRO TEXT ══════════ */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[15px] md:text-base leading-[1.75] text-gray-700 font-light max-w-2xl mb-10"
        >
          Reach out through whichever channel works best for you.
        </motion.p>

        {/* ══════════ CONTACT CARDS — VERTICAL STACK ══════════ */}
        <div className="space-y-3">
          {contactChannels.map((channel, i) => {
            const Icon = channel.icon
            return (
              <motion.a
                key={channel.label}
                href={channel.href}
                target={
                  channel.label === 'Email' || channel.label === 'Phone'
                    ? '_self'
                    : '_blank'
                }
                rel="noreferrer"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                className="group relative bg-white border border-black/10 rounded-xl p-4 flex items-center gap-4 hover:border-black/30 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Radial glow */}
                <div
                  className="absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 0% 50%, ${channel.color}15, transparent 60%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${channel.color}15`,
                    border: `1px solid ${channel.color}40`,
                    color: channel.color,
                  }}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 relative z-10">
                  <p
                    className="text-[9px] font-mono uppercase tracking-[0.25em] mb-1 font-bold"
                    style={{ color: channel.color }}
                  >
                    {channel.label}
                  </p>
                  <p className="text-[13px] font-medium text-[#111] truncate">
                    {channel.value}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5">
                    {channel.hint}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowUpRight className="w-4 h-4 shrink-0 text-gray-300 group-hover:text-[#111] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all relative z-10" />

                {/* Left accent bar on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: channel.color }}
                />
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Contact