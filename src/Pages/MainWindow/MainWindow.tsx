'use client'

import { useState } from "react"
import Navbar from "./NavBar/NavBar"
import DashboardTab from './DashboardTab/DashboardTab'
import CalendarTab from './CalenderTab/CalenderTab'
import SalesTab from './SalesTab/SalesTab'
import EquipmentTab from './EquipmentTab/EquipmentTab'
import SearchTab from './SearchTab/SearchTab'

function DashboardContent({ activeTab }: { activeTab: string }) {
  switch (activeTab) {
    case 'dashboard':
      return <DashboardTab />
    case 'calendar':
      return <CalendarTab />
    case 'sale':
      return <SalesTab />
    case 'equipment':
      return <EquipmentTab />
    case 'search':
      return <SearchTab />
    default:
      return null
  }
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navbar Component with Active Tab Management */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto pt-14"> {/* pt-14 accounts for the navbar height */}
        <DashboardContent activeTab={activeTab} />
      </main>
    </div>
  )
}