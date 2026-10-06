// src/components/Education.jsx
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const Education = () => {
  const educationData = [
    {
      institution: "Bahirdar University",
      degree: "Bachelor of Computer Engineering",
      period: "2022 - 2026",
      cgpa: "3.68 / 4.0",
      description: "Focused on computer architecture, networking, and hardware security."
    },
    {
      institution: "Bahirdar University",
      degree: "Bachelor of Management",
      period: "2021 - 2025",
      cgpa: "3.20 / 4.0",
      description: "Studied organizational management and business administration."
    },
    {
      institution: "Yaberus General Sec & Pre",
      degree: "Preparatory [Grade 11 - 12]",
      period: "Completed",
      cgpa: "N/A",
      description: "Natural Science stream."
    }
  ]

  return (
    <section id="education" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-y-2 border-[#111]">
      <div className="mb-16">
        <p className="text-gray-500 font-mono text-sm tracking-widest uppercase mb-2">// 01. ACADEMIC</p>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#111]">EDUCATION</h2>
      </div>

      <div className="space-y-0">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="grid md:grid-cols-12 gap-6 py-8 border-b border-gray-300 last:border-0"
          >
            <div className="md:col-span-3">
              <p className="text-sm font-bold font-mono text-gray-500 uppercase">{edu.period}</p>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl font-bold text-[#111] mb-1">{edu.institution}</h3>
              <p className="text-sm font-medium text-gray-500">{edu.degree}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-bold text-[#111]">CGPA: {edu.cgpa}</p>
            </div>
            <div className="md:col-span-3">
              <p className="text-sm text-gray-600 leading-relaxed">{edu.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Education