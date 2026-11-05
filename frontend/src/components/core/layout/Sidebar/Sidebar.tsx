import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { SIDEBAR_CONFIG, UserRole } from './sidebarConfig'

interface SidebarProps {
  role: UserRole
  onLogout?: () => void
}

const ACCENTS = {
  blue: 'bg-blue-600 text-white',
  green: 'bg-green-600 text-white',
  purple: 'bg-purple-600 text-white',
}

const Sidebar = ({ role, onLogout }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const config = SIDEBAR_CONFIG[role]
  const activeClass = ACCENTS[config.accent]

  return (
    <aside
      className={`shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 h-full ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <h2 className="font-bold text-gray-900 dark:text-gray-100 truncate">
            {config.title}
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 ml-auto"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {config.items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? activeClass
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1 truncate">
                    {item.label}
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full min-w-5 text-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        {onLogout ? (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title={collapsed ? 'Sign Out' : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        ) : (
          <Link
            to="/login"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title={collapsed ? 'Sign In' : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Sign In</span>}
          </Link>
        )}
      </div>
    </aside>
  )
}

export default Sidebar