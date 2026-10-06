// src/components/Skills.jsx
import { motion } from 'framer-motion'

const Skills = () => {
  const skills = [
    "Penetration Testing", 
    "Computer Network", 
    "Web Development", 
    "Mfg. Management",
    "Vulnerability Assessment",
    "DevSecOps",
    "Application Security",
    "Burp Suite",
    "Source Code Analysis"
  ]

  return (
    <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-16">
        <p className="text-gray-500 font-mono text-sm tracking-widest uppercase mb-2">// 02. CAPABILITIES</p>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#111]">SKILLS</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-6 text-[#111]">Core Competencies</h3>
          <div className="space-y-4">
            {skills.slice(0, 5).map((skill, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-[#111]">{skill}</span>
                <span className="font-mono text-xs text-gray-500">0{i+1}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-6 text-[#111]">Technical Arsenal</h3>
          <div className="flex flex-wrap gap-3">
            {skills.slice(5).map((skill, i) => (
              <span key={i} className="px-4 py-2 border border-[#111] text-sm font-medium text-[#111] uppercase tracking-wider">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills