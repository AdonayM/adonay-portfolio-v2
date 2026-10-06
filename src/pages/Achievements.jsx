// src/pages/Achievements.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'

const Achievements = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('date_earned', { ascending: false })

      if (error) throw error
      setAchievements(data || [])
    } catch (error) {
      console.error('Failed to load achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDescription = (title = '') => {
    if (title.includes('CCNA')) {
      return 'Developed foundational knowledge of networking, including network protocols, IPv4/IPv6 addressing, Ethernet, and network connectivity.'
    }
    if (title.includes('Byte Lotus') || title.includes('Challenge')) {
      return 'Completed a 14 day cybersecurity learning challenge, strengthening practical skills through hands on security labs and rooms.'
    }
    if (title.includes('Foundations')) {
      return 'Built foundational cybersecurity knowledge covering security principles, threats, risk management, and the role of cybersecurity professionals.'
    }
    if (title.includes('Play it Safe')) {
      return 'Learned key security risk management concepts, including identifying risks, applying security controls, and protecting organizational assets.'
    }
    if (title.includes('Programming')) {
      return 'Developed core programming skills and problem-solving techniques through fundamental programming concepts and practical exercises.'
    }
    return 'A certified achievement demonstrating practical skills in cybersecurity and development.'
  }

  const getAch = (keyword) =>
    achievements.find((a) =>
      (a.title || '').toLowerCase().includes(keyword.toLowerCase())
    )

  const getImage = (achievement, fallback) =>
    achievement?.image_url ||
    achievement?.image ||
    achievement?.certificate_url ||
    fallback

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f3] flex items-center justify-center">
        <div className="text-[#222] text-sm tracking-[0.25em] uppercase animate-pulse">
          Loading certifications...
        </div>
      </div>
    )
  }

  const defaultData = [
    { title: 'CCNAv7: Introduction to Networks', issuer: 'Cisco', date_earned: '2023-06-01' },
    { title: 'Byte Lotus 14-Day Challenge', issuer: 'TryHackMe', date_earned: '2024-08-15' },
    { title: 'Foundations of Cybersecurity', issuer: 'Google', date_earned: '2023-09-01' },
    { title: 'Play It Safe: Manage Security Risks', issuer: 'Google', date_earned: '2023-10-01' },
    { title: 'Programming Fundamentals', issuer: 'Udacity', date_earned: '2024-09-23' },
  ]

  const data = achievements.length > 0 ? achievements : defaultData

  const ccna = getAch('CCNA') || data.find((a) => a.title.includes('CCNA'))
  const byteLotus =
    getAch('Byte Lotus') ||
    data.find((a) => a.title.includes('Byte Lotus') || a.title.includes('Challenge'))
  const foundations =
    getAch('Foundations') || data.find((a) => a.title.includes('Foundations'))
  const playSafe =
    getAch('Play it Safe') ||
    data.find((a) => a.title.includes('Play It Safe'))
  const programming =
    getAch('Programming') || data.find((a) => a.title.includes('Programming'))

  const certificates = [
    {
      id: 'ccna',
      image: getImage(ccna, '/certificates/ccna.png'),
      alt: 'CCNA certificate',
      className: 'left-[1%] top-[5%] w-[30%] rotate-[-3deg]',
      z: 10,
      hoverX: '-2%',
      hoverY: '-4%',
      description: getDescription('CCNA'),
      issuer: 'Cisco',
      title: 'CCNAv7: Introduction to Networks',
    },
    {
      id: 'byte',
      image: getImage(byteLotus, '/certificates/byte-lotus.png'),
      alt: 'Byte Lotus certificate',
      className: 'left-[22%] top-[18%] w-[34%] rotate-[2deg]',
      z: 30,
      hoverX: '-5%',
      hoverY: '-5%',
      description: getDescription('Byte Lotus'),
      issuer: 'TryHackMe',
      title: 'Byte Lotus 14-Day Challenge',
    },
    {
      id: 'foundations',
      image: getImage(foundations, '/certificates/google-foundations.png'),
      alt: 'Google Foundations of Cybersecurity certificate',
      className: 'left-[40%] top-[4%] w-[30%] rotate-[3deg]',
      z: 20,
      hoverX: '-4%',
      hoverY: '-3%',
      description: getDescription('Foundations'),
      issuer: 'Google',
      title: 'Foundations of Cybersecurity',
    },
    {
      id: 'play',
      image: getImage(playSafe, '/certificates/google-play-it-safe.png'),
      alt: 'Google Play It Safe certificate',
      className: 'left-[52%] top-[30%] w-[32%] rotate-[-2deg]',
      z: 15,
      hoverX: '-8%',
      hoverY: '-4%',
      description: getDescription('Play it Safe'),
      issuer: 'Google',
      title: 'Play It Safe: Manage Security Risks',
    },
    {
      id: 'programming',
      image: getImage(programming, '/certificates/programming-fundamentals.png'),
      alt: 'Udacity Programming Fundamentals certificate',
      className: 'left-[68%] top-[12%] w-[32%] rotate-[1deg]',
      z: 25,
      hoverX: '-8%',
      hoverY: '-5%',
      description: getDescription('Programming'),
      issuer: 'Udacity',
      title: 'Programming Fundamentals',
    },
  ]

  return (
    <section className="min-h-screen bg-[#f5f5f3] text-[#151515] pt-2 pb-20 px-6 lg:px-12 overflow-x-hidden">
      <div className="max-w-[1500px] mx-auto">

        {/* ══════════ PAGE HEADER ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <div className="p-1 bg-white border border-black/10 rounded">
              <Trophy className="w-3.5 h-3.5 text-[#111]" strokeWidth={1.75} />
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500">
              // 05. Certifications
            </p>
          </div>

          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-none">
            Certifications
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

          <p className="text-[14px] md:text-[15px] leading-[1.75] text-gray-600 font-light mt-6 max-w-2xl">
            Professional certifications, TryHackMe milestones, and continuous learning accomplishments.
          </p>
        </motion.div>

        {/* DESKTOP: Overlapping collage */}
        <div
          className="relative hidden lg:block pt-40"
          style={{ height: '820px' }}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Subtle paper texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
            <div className="h-full w-full bg-[radial-gradient(#000_0.6px,transparent_0.6px)] [background-size:7px_7px]" />
          </div>

          {certificates.map((cert) => {
            const isHovered = hovered === cert.id
            const someoneElseHovered = hovered !== null && hovered !== cert.id

            return (
              <motion.div
                key={cert.id}
                className={`absolute ${cert.className} cursor-pointer`}
                style={{
                  zIndex: isHovered ? 200 : cert.z,
                  transformOrigin: 'center center',
                }}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: someoneElseHovered ? 0.72 : 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                animate={{
                  x: isHovered ? cert.hoverX : 0,
                  y: isHovered ? cert.hoverY : 0,
                  scale: isHovered ? 1.35 : 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHovered(cert.id)}
              >
                <div
                  className={[
                    'relative overflow-hidden bg-white p-[7px]',
                    'shadow-[0_12px_30px_rgba(0,0,0,0.16)]',
                    'transition-shadow duration-300',
                    isHovered ? 'shadow-[0_30px_70px_rgba(0,0,0,0.32)]' : '',
                  ].join(' ')}
                >
                  <img
                    src={cert.image}
                    alt={cert.alt}
                    draggable="false"
                    className="block h-auto w-full select-none object-cover"
                  />

                  {/* Bottom info bar on hover */}
                  <div
                    className={[
                      'absolute left-0 right-0 bottom-0',
                      'transition-all duration-500 ease-out',
                      isHovered
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-full',
                    ].join(' ')}
                  >
                    <div className="h-[2px] w-full bg-gradient-to-r from-[#06b6d4] via-[#06b6d4] to-[#a855f7]" />

                    <div className="bg-[#0a0a0a]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                          <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#06b6d4] animate-ping" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#06b6d4] leading-none mb-1">
                            {cert.issuer}
                          </p>
                          <h4 className="text-white font-semibold text-[13px] leading-tight truncate">
                            {cert.title}
                          </h4>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-[#06b6d4]" />
                        <div className="w-1 h-1 rounded-full bg-[#a855f7]" />
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 ml-1">
                          CERT
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* MOBILE / TABLET */}
        <div className="space-y-12 lg:hidden">
          {certificates.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div
                className="overflow-hidden bg-white p-2 shadow-[0_12px_28px_rgba(0,0,0,0.15)]"
                style={{
                  transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})`,
                }}
              >
                <img src={cert.image} alt={cert.alt} className="block w-full" />
              </div>

              <div className="mt-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#06b6d4]">
                  {cert.issuer}
                </span>
                <h3 className="text-[17px] font-bold text-[#111] mt-1 mb-2">
                  {cert.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-[#272727]">
                  {cert.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements