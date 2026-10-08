// src/App.jsx
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { supabase } from './lib/supabaseClient'
import { trackPageView } from './lib/analytics'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Public pages
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Achievements from './pages/Achievements'
import Contact from './pages/Contact'

// Admin pages
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProfileEditor from './pages/admin/Profile'
import EducationEditor from './pages/admin/Education'
import SkillsEditor from './pages/admin/Skills'
import ExperienceEditor from './pages/admin/Experience'
import ProjectsEditor from './pages/admin/Projects'
import CertificationsEditor from './pages/admin/Certifications'
import TryHackMeEditor from './pages/admin/TryHackMe'
import FilesManager from './pages/admin/Files'

import ProtectedRoute from './components/ProtectedRoute'

/* ═══════════════════════════════════════════════════════
   Layout wrapper — hides Navbar/Footer on /admin routes
   ═══════════════════════════════════════════════════════ */
function AppLayout({ children }) {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  /* Custom analytics — fires on every public page view */
  useEffect(() => {
    if (!isAdminRoute) {
      trackPageView(location.pathname)
    }
  }, [location.pathname, isAdminRoute])

  return (
    <div className="min-h-screen bg-[#f0f0ef] text-[#111] selection:bg-[#06b6d4] selection:text-black flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className={`flex-grow ${!isAdminRoute ? 'pt-24' : ''}`}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}

      {/* Vercel Analytics — kept as a backup/parallel tracker */}
      {!isAdminRoute && <Analytics />}
    </div>
  )
}

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
        <div className="text-[#06b6d4] text-sm font-mono tracking-[0.25em] uppercase animate-pulse">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute><ProfileEditor /></ProtectedRoute>} />
          <Route path="/admin/education" element={<ProtectedRoute><EducationEditor /></ProtectedRoute>} />
          <Route path="/admin/skills" element={<ProtectedRoute><SkillsEditor /></ProtectedRoute>} />
          <Route path="/admin/experience" element={<ProtectedRoute><ExperienceEditor /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><ProjectsEditor /></ProtectedRoute>} />
          <Route path="/admin/certifications" element={<ProtectedRoute><CertificationsEditor /></ProtectedRoute>} />
          <Route path="/admin/tryhackme" element={<ProtectedRoute><TryHackMeEditor /></ProtectedRoute>} />
          <Route path="/admin/files" element={<ProtectedRoute><FilesManager /></ProtectedRoute>} />
        </Routes>
      </AppLayout>
    </Router>
  )
}

export default App