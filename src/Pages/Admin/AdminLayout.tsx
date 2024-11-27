import { SidebarNav } from "./SideBarNav"

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

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
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
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}

