import { BaseButton } from "../../../components/Button/index"
import { 
  LayoutDashboard, 
  Search, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Wrench 
} from 'lucide-react'

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { name: 'dashboard', icon: LayoutDashboard },
    { name: 'calendar', icon: CalendarIcon },
    { name: 'sale', icon: DollarSign },
    { name: 'equipment', icon: Wrench },
    { name: 'search', icon: Search }
  ]

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-[1600px] mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mr-8">Rec-It</h2>
          <div className="flex items-center space-x-2 overflow-x-auto">
            {tabs.map(({ name, icon: Icon }) => (
              <BaseButton
                key={name}
                className={`flex items-center px-4 py-2 ${
                  activeTab === name
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(name)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </BaseButton>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
