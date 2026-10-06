// src/App.jsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { supabase } from './lib/supabaseClient'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Achievements from './pages/Achievements'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .single()
      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f0ef] flex items-center justify-center">
        <div className="text-[#06b6d4] text-xl font-mono animate-pulse">
          LOADING_SYSTEM...
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#f0f0ef] text-[#111] selection:bg-[#06b6d4] selection:text-black flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home profile={profile} />} />
            <Route path="/about" element={<About profile={profile} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact profile={profile} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App