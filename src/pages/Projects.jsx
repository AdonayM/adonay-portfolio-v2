// src/pages/Projects.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Smartphone, Laptop, Shield, Bug, Folder, Award } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      slug: 'tryhackme',
      title: 'TryHackMe',
      subtitle: 'Hands-on Cybersecurity Practice',
      category: 'Security Labs',
      kind: 'award',
      description:
        'Over 237 rooms completed and 22 badges earned — continuous hands-on practice in SOC analysis, web exploitation, Linux, and OWASP vulnerabilities. Currently ranked in the top 1% globally.',
      stack: ['SOC Analysis', 'Web Exploitation', 'Linux', 'OWASP'],
      accent: '#06b6d4',
      gradient: 'linear-gradient(90deg, #06b6d4, #a855f7, #06b6d4)',
      glow: 'rgba(6,182,212,0.6)',
    },
    {
      slug: 'n4yctf',
      title: 'N4yCTF',
      subtitle: 'TOCTOU Race Condition',
      category: 'Security Tool',
      kind: 'security',
      description:
        'A points-based CTF game with a non-atomic balance check in the purchase endpoint. Players race the check with Burp Suite parallel requests.',
      stack: ['React 18', 'TypeScript', 'Node', 'PostgreSQL'],
      accent: '#06b6d4',
      gradient: 'linear-gradient(90deg, #06b6d4, #a855f7, #06b6d4)',
      glow: 'rgba(6,182,212,0.6)',
    },
    {
      slug: 'n4yadmin',
      title: 'N4yAdmin',
      subtitle: 'IDOR / Broken Access Control',
      category: 'Vulnerability Research',
      kind: 'security',
      description:
        'An internal admin panel whose GET /api/users/:id returns the full user record with no ownership check. Sequential IDs make enumeration trivial.',
      stack: ['React 18', 'TypeScript', 'Node', 'Prisma'],
      accent: '#a855f7',
      gradient: 'linear-gradient(90deg, #a855f7, #ec4899, #a855f7)',
      glow: 'rgba(168,85,247,0.6)',
    },
    {
      slug: 'n4yvault',
      title: 'N4yVault',
      subtitle: 'Bookmark Manager',
      category: 'Security App',
      kind: 'security',
      description:
        'A secure bookmark manager teaching the correct ownership-check pattern (findFirst({ where: { id, userId } })) — the exact primitive that prevents IDOR.',
      stack: ['React 18', 'TypeScript', 'Node', 'PostgreSQL'],
      accent: '#06b6d4',
      gradient: 'linear-gradient(90deg, #06b6d4, #22d3ee, #06b6d4)',
      glow: 'rgba(6,182,212,0.6)',
    },
    {
      slug: 'clearance-mrs',
      title: 'Clearance MRS',
      subtitle: 'Security Clearance Dashboard',
      category: 'Full Stack',
      kind: 'web',
      description:
        'A Flask app for tracking security clearance workflows across 5 categories, with automated Excel/PowerPoint generation and Active Directory SSO.',
      stack: ['Flask', 'Python', 'PostgreSQL', 'LDAP'],
      accent: '#8b5cf6',
      gradient: 'linear-gradient(90deg, #8b5cf6, #a855f7, #8b5cf6)',
      glow: 'rgba(139,92,246,0.6)',
    },
    {
      slug: 'expense-tracker',
      title: 'Expense Tracker',
      subtitle: 'Mobile Finance App',
      category: 'Mobile App',
      kind: 'mobile',
      description:
        'A Flutter app tracking income/expense across Cash, CBE, CBE Birr, and Telebirr. Auto-parses bank SMS into transactions with rich analytics.',
      stack: ['Flutter', 'Dart', 'fl_chart', 'Android SDK'],
      accent: '#06b6d4',
      gradient: 'linear-gradient(90deg, #06b6d4, #10b981, #06b6d4)',
      glow: 'rgba(6,182,212,0.6)',
    },
    {
      slug: 'legal-connect',
      title: 'Legal Connect',
      subtitle: 'Client–Lawyer Platform',
      category: 'Full Stack',
      kind: 'web',
      description:
        'A connected legal system connecting clients and lawyers in Ethiopia. Reduces legal costs and automates case management workflows.',
      stack: ['React', 'Node.js', 'MongoDB', 'REST API'],
      accent: '#2563eb',
      gradient: 'linear-gradient(90deg, #2563eb, #06b6d4, #2563eb)',
      glow: 'rgba(37,99,235,0.6)',
    },
  ]

  const getIcon = (kind) => {
    switch (kind) {
      case 'mobile':
        return <Smartphone className="w-6 h-6" strokeWidth={1.75} />
      case 'web':
        return <Laptop className="w-6 h-6" strokeWidth={1.75} />
      case 'security':
        return <Shield className="w-6 h-6" strokeWidth={1.75} />
      case 'award':
        return <Award className="w-6 h-6" strokeWidth={1.75} />
      default:
        return <Bug className="w-6 h-6" strokeWidth={1.75} />
    }
  }

  return (
    <section className="bg-[#f0f0ef] text-[#111] pt-2 pb-20 px-6 lg:px-12 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* ══════════ PAGE HEADER ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <div className="p-1 bg-white border border-black/10 rounded">
              <Folder className="w-3.5 h-3.5 text-[#111]" strokeWidth={1.75} />
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500">
              // 04. Featured Work
            </p>
          </div>

          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-none">
            Projects
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
            A selection of security tools, vulnerability research, and full-stack applications I've built.
          </p>
        </motion.div>

        {/* ══════════ PROJECT GRID ══════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="h-full"
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group flex flex-col h-full bg-white border border-black/10 hover:border-black/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] relative"
              >
                {/* ANIMATED GRADIENT BAR */}
                <div className="relative h-[4px] w-full overflow-hidden flex-shrink-0">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: project.gradient,
                      boxShadow: `0 0 20px ${project.glow}, 0 0 40px ${project.glow}`,
                    }}
                  />
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)',
                      backgroundSize: '40% 100%',
                      backgroundRepeat: 'no-repeat',
                    }}
                    animate={{
                      backgroundPosition: ['-50% 0%', '150% 0%'],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>

                {/* ICON HEADER */}
                <div className="px-7 pt-7 flex items-start justify-between flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${project.accent}15`,
                      color: project.accent,
                      border: `1px solid ${project.accent}40`,
                    }}
                  >
                    {getIcon(project.kind)}
                  </div>

                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500 text-right pt-1">
                    {project.category}
                  </p>
                </div>

                {/* BODY */}
                <div className="px-7 pb-7 pt-5 flex flex-col flex-grow">
                  <h3 className="font-display text-3xl font-bold leading-tight mb-1 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-500 italic mb-5">
                    {project.subtitle}
                  </p>

                  <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex-grow" />

                  <div className="flex flex-wrap gap-1.5 pt-5 border-t border-black/10">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-[#f0f0ef] text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#111] group-hover:gap-4 transition-all">
                    <span>View Case Study</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects