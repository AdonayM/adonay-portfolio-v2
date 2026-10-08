// src/components/AdminLayout.jsx
import { useState } from 'react'
import { Menu } from 'lucide-react'
import AdminSidebar from './AdminSidebar'

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f0f0ef] text-[#111]">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-60">
        {/* Compact mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 bg-[#f0f0ef]/95 backdrop-blur-xl border-b border-black/10 h-14 flex items-center px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5 text-[#111]" />
          </button>
          <span className="ml-3 font-display text-sm font-bold">
            Admin
          </span>
        </div>

        <main>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout