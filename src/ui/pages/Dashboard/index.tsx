'use client'

import { useState } from 'react'
import Navbar from './Navbar'
import DashboardContent from '../Dashboard/DasboardContent'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto">
          <DashboardContent activeTab={activeTab} />
        </div>
      </main>
    </div>
  )
}