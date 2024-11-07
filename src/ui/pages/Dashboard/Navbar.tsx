// src/pages/Dashboard/Navbar.tsx
import  Button  from "../../../components/Button/Button"
import { LayoutDashboard, Search, Clipboard, DollarSign, Users, Building2, FileBarChart, Settings } from 'lucide-react'

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { name: 'dashboard', icon: LayoutDashboard },
    { name: 'search', icon: Search },
    { name: 'manage', icon: Clipboard },
    { name: 'sales', icon: DollarSign },
    { name: 'members', icon: Users },
    { name: 'facilities', icon: Building2 },
    { name: 'reports', icon: FileBarChart },
    { name: 'settings', icon: Settings },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center">
      <h2>Rect-It</h2>
        {tabs.map(({ name, icon: Icon }) => (
          <Button
            key={name}
            className={activeTab === name ? 'secondary' : 'ghost'}
            onClick={() => setActiveTab(name)}
          >
            <Icon className="mr-2 h-4 w-4" /> {name.charAt(0).toUpperCase() + name.slice(1)}
          </Button>
        ))}
      </div>
    </nav>
  )
}
