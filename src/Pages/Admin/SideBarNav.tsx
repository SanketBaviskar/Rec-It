import React from 'react'
import { Link } from 'react-router-dom'

interface SidebarNavProps {
  items: {
    title: string
    href: string
  }[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

