// src/pages/Projects.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Smartphone, Laptop, Shield, Bug, Folder, Award } from 'lucide-react'
import { useProjects } from '../lib/hooks'

const Projects = () => {
  const { data: projects, loading } = useProjects()

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

  /* Build gradient/glow helpers from accent color */
  const getGradient = (accent) =>
    `linear-gradient(90deg, ${accent}, #a855f7, ${accent})`
  const getGlow = (accent) => `${accent}99`

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

        {/* ══════════ LOADING STATE ══════════ */}
        {loading ? (
          <div className="py-20 text-center">
            <p className="text-[#06b6d4] text-sm font-mono tracking-[0.25em] uppercase animate-pulse">
              Loading projects...
            </p>
          </div>
        ) : !projects || projects.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-sm font-mono">
              No projects found.
            </p>
          </div>
        ) : (
          /* ══════════ PROJECT GRID ══════════ */
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
                        background: getGradient(project.accent),
                        boxShadow: `0 0 20px ${getGlow(project.accent)}, 0 0 40px ${getGlow(project.accent)}`,
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

                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-5 border-t border-black/10">
                        {project.tech_stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-[#f0f0ef] text-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#111] group-hover:gap-4 transition-all">
                      <span>View Case Study</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects