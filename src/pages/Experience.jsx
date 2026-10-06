// src/components/Experience.jsx
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

const Experience = () => {
  const experienceData = [
    {
      company: "CBE IS Security",
      role: "Vulnerability Assessment & Penetration Testing",
      period: "2024 - Present",
      description: "Conducted vulnerability assessments, performed penetration testing on web applications and APIs, and analyzed source code to identify security weaknesses. Implemented DevSecOps practices."
    },
    {
      company: "INSA",
      role: "Cybersecurity Intern",
      period: "2023",
      description: "Gained hands-on experience in cybersecurity operations, network monitoring, and incident response within a national security agency."
    }
  ]

  return (
    <section id="experience" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-y-2 border-[#111]">
      <div className="mb-16">
        <p className="text-gray-500 font-mono text-sm tracking-widest uppercase mb-2">// 03. PROFESSIONAL</p>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#111]">WORK EXPERIENCE</h2>
      </div>

      <div className="space-y-0">
        {experienceData.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="grid md:grid-cols-12 gap-6 py-10 border-b border-gray-300 last:border-0"
          >
            <div className="md:col-span-3">
              <p className="text-sm font-bold font-mono text-gray-500 uppercase">{exp.period}</p>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl font-bold text-[#111] mb-1">{exp.company}</h3>
              <p className="text-sm font-medium text-gray-500">{exp.role}</p>
            </div>
            <div className="md:col-span-5">
              <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience