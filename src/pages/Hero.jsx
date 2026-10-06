// src/components/Hero.jsx
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const Hero = ({ profile }) => {
  return (
    <section id="about" className="min-h-screen flex items-center pt-20 relative bg-[#f4f4f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-[#111]" />
              <span className="text-xs font-bold uppercase tracking-widest">Portfolio 2026</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] text-[#111]">
              ADONAY'S <br />
              <span className="text-outline-dark">PORTFOLIO</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-xl font-light leading-relaxed border-l-2 border-[#111] pl-6">
              {profile?.bio || "Cybersecurity professional passionate about Vulnerability Assessment and Penetration Testing, application security, and DevSecOps."}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#projects" className="px-8 py-4 bg-[#111] text-[#f4f4f0] font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-all">
                View Work
              </a>
              <a href="#contact" className="px-8 py-4 border-2 border-[#111] text-[#111] font-bold text-sm uppercase tracking-widest hover:bg-[#111] hover:text-[#f4f4f0] transition-all">
                Contact
              </a>
            </div>
          </motion.div>

          {/* Right Column: Abstract Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative border-editorial p-4 bg-white">
              {/* Replace this div with an actual image of yourself or a abstract graphic */}
              <div className="aspect-[4/5] bg-gray-200 flex items-center justify-center border border-gray-300">
                 <ArrowDown className="w-12 h-12 text-gray-400 animate-bounce" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#111] text-[#f4f4f0] px-4 py-2 text-xs font-mono">
                SEC_01
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-8 mt-24 pt-8 border-t-2 border-[#111]">
          <div>
            <p className="text-4xl font-black text-[#111]">Top 1%</p>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-2">TryHackMe Rank</p>
          </div>
          <div>
            <p className="text-4xl font-black text-[#111]">225+</p>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-2">Rooms Completed</p>
          </div>
          <div>
            <p className="text-4xl font-black text-[#111]">22</p>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-2">Badges Earned</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero