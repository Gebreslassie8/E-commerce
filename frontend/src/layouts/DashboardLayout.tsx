import { ReactNode, useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardHeader from '../components/core/layout/Header/DashboardHeader'
import { Sidebar, UserRole } from '../components/core/layout/Sidebar'

interface DashboardLayoutProps {
  role: UserRole
  children?: ReactNode
}

const DashboardLayout = ({ role, children }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Dashboard header (uses DashboardHeader, NOT PublicHeader) */}
      <DashboardHeader
        role={role}
        userName="Gebreslassie"
        onMenuToggle={() => setMobileOpen(!mobileOpen)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`md:block ${
            mobileOpen
              ? 'block fixed inset-y-0 left-0 z-30 pt-16 bg-white dark:bg-gray-900'
              : 'hidden'
          }`}
        >
          <Sidebar role={role} />
        </div>

        {/* Backdrop on mobile */}
        {mobileOpen && (
          <div
            className="md:hidden fixed inset-0 z-20 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children ?? <Outlet />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout