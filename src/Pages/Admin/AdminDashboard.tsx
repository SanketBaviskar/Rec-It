import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SidebarNav } from './SideBarNav'
import SettingsPage from './Setting/Setting'
import AccessPage from './Access/Access'
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
  {
    title: "General Settings",
    href: "/admin/settings",
  },
  {
    title: "Access",
    href: "/admin/access",
  },
  {
    title: "Accounting",
    href: "/admin/accounting",
  },
  {
    title: "Calendars",
    href: "/admin/calendars",
  },
  {
    title: "Documents & Templates",
    href: "/admin/documents",
  },
  {
    title: "Facility",
    href: "/admin/facility",
  },
  {
    title: "Guest Passes",
    href: "/admin/guest-passes",
  },
  {
    title: "Integration",
    href: "/admin/integration",
  },
  {
    title: "Kiosk",
    href: "/admin/kiosk",
  },
  {
    title: "Locker Service",
    href: "/admin/locker-service",
  },
  {
    title: "Memberships",
    href: "/admin/memberships",
  },
  {
    title: "Multi-Visit Passes",
    href: "/admin/multi-visit-passes",
  },
  {
    title: "Parking Permits",
    href: "/admin/parking",
  },
  {
    title: "Products & Equipment",
    href: "/admin/products",
  },
  {
    title: "Programs",
    href: "/admin/programs",
  },
  {
    title: "Sales",
    href: "/admin/sales",
  },
  {
    title: "Security",
    href: "/admin/security",
  },
  {
    title: "Travel Service",
    href: "/admin/travel",
  },
  {
    title: "Utilities",
    href: "/admin/utilities",
  },
]

function AdminHome() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
      <p>Select an option from the sidebar to manage your fitness center.</p>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-bold">Fitness Center Admin</h1>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<AdminHome />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/access" element={<AccessPage />} />
                <Route path="/accounting" element={<AccountingPage />} />
                <Route path="/calendars" element={<CalendarsPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/facility" element={<FacilityPage />} />
                <Route path="/guest-passes" element={<GuestPasses />} />
                <Route path="/integration" element={<IntegrationPage />} />
                <Route path="/kiosk" element={<KioskPage />} />
                <Route path="/locker-service" element={<LockerServicePage />} />
                <Route path="/memberships" element={<MembershipsPage />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route path="/travel" element={<TravelPage />} />
                <Route path="/utilities" element={<UtilitiesPage />} />
                <Route path="/multi-visit-passes" element={<MultiVisitPassesPage />} />
                <Route path="/parking" element={<ParkingPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/programs" element={<ProgramsPage />} />
              {/* Add routes for other admin pages here */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}