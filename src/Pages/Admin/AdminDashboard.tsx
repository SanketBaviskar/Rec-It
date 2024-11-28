"use client"

import React, { useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import SettingsPage from './Setting/Setting'
import AccessTabs from './Access/Access'
import AccountingPage from './Accounting/Accounting'
import CalendarsPage from './Calendar/Calendar'
import DocumentsPage from './Document/Document'
import FacilityPage from './Facility/Facility'
import GuestPasses from './GuestPasses/GuestPasses'
import IntegrationPage from './Integration/Integration'
import KioskPage from './Kiosk/Kiosk'
import LockerServicePage from './LockerService/LockerService'
import MembershipsPage from './Membership/Membership'
import SecurityPage from './Security/Security'
import TravelPage from './TravelService/TravelService'
import UtilitiesPage from './Utilities/Utilities'
import MultiVisitPassesPage from './MultiVisitPasses/MultiVisitPasses'
import ParkingPage from './Parking/Parking'
import ProductsPage from './Product/Product'
import SalesPage from './Sales/Sales'
import ProgramsPage from './Program/Program'

const sidebarNavItems = [
  { title: "General Settings", key: "settings" },
  { title: "Access", key: "access" },
  { title: "Accounting", key: "accounting" },
  { title: "Calendars", key: "calendars" },
  { title: "Documents & Templates", key: "documents" },
  { title: "Facility", key: "facility" },
  { title: "Guest Passes", key: "guest-passes" },
  { title: "Integration", key: "integration" },
  { title: "Kiosk", key: "kiosk" },
  { title: "Locker Service", key: "locker-service" },
  { title: "Memberships", key: "memberships" },
  { title: "Multi-Visit Passes", key: "multi-visit-passes" },
  { title: "Parking Permits", key: "parking" },
  { title: "Products & Equipment", key: "products" },
  { title: "Programs", key: "programs" },
  { title: "Sales", key: "sales" },
  { title: "Security", key: "security" },
  { title: "Travel Service", key: "travel" },
  { title: "Utilities", key: "utilities" },
]

function AdminHome() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
      <p>Select an option from the sidebar to manage your fitness center.</p>
    </div>
  )
}

function AdminSidebar({ setActiveSection }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2">Fitness Center Admin</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarNavItems.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                onClick={() => setActiveSection(item.key)}
              >
                {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

function AdminContent({ activeSection }) {
  switch (activeSection) {
    case 'home':
      return <AdminHome />
    case 'settings':
      return <SettingsPage />
    case 'access':
      return <AccessTabs />
    case 'accounting':
      return <AccountingPage />
    case 'calendars':
      return <CalendarsPage />
    case 'documents':
      return <DocumentsPage />
    case 'facility':
      return <FacilityPage />
    case 'guest-passes':
      return <GuestPasses />
    case 'integration':
      return <IntegrationPage />
    case 'kiosk':
      return <KioskPage />
    case 'locker-service':
      return <LockerServicePage />
    case 'memberships':
      return <MembershipsPage />
    case 'security':
      return <SecurityPage />
    case 'travel':
      return <TravelPage />
    case 'utilities':
      return <UtilitiesPage />
    case 'multi-visit-passes':
      return <MultiVisitPassesPage />
    case 'parking':
      return <ParkingPage />
    case 'products':
      return <ProductsPage />
    case 'sales':
      return <SalesPage />
    case 'programs':
      return <ProgramsPage />
    default:
      return <AdminHome />
  }
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('home')
  const [showSidebar, setShowSidebar] = useState(true)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {showSidebar && <AdminSidebar setActiveSection={setActiveSection} />}
        <div className="flex-1 p-8">
          <header className="flex items-center justify-between mb-8">
            <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-200">
              {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
            </button>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </header>
          <AdminContent activeSection={activeSection} />
        </div>
      </div>
    </SidebarProvider>
  )
}

