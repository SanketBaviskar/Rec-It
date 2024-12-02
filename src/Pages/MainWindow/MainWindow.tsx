'use client'

import { useState } from "react"
import Navbar from "./NavBar/NavBar"
import DashboardTab from './DashboardTab/DashboardTab'
import CalendarTab from './CalenderTab/CalenderTab'
import SalesTab from './SalesTab/SalesTab'
import EquipmentTab from './EquipmentTab/EquipmentTab'
import SearchTab from './SearchTab/SearchTab'
import RecCenterFooter from "./Footer/Footer"

// Component Mapping
const componentMap: Record<string, React.ReactNode> = {
  dashboard: <DashboardTab />,
  calendar: <CalendarTab />,
  sale: <SalesTab />,
  equipment: <EquipmentTab />,
  search: <SearchTab />
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex flex-col bg-background overflow-hidden h-full">
      {/* Navbar Component with Active Tab Management */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-1 pt-0"> {/* pt-0 accounts for the navbar height */}
        {componentMap[activeTab] || (
          <p className="text-center text-muted-foreground">
            No content available for this tab.
          </p>
        )}
      </main>

      {/* Footer */}
      <RecCenterFooter />
    </div>
  )
}
