// src/pages/Dashboard/index.tsx
"use client"

import { useState } from 'react'
import Navbar from './Navbar'
import DashboardContent from './DasboardContent'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-7xl mx-auto">
          <DashboardContent activeTab={activeTab} />
        </div>
      </main>
    </div>
  )
}
