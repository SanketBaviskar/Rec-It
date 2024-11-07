import DashboardTab from './tabs/DashboardTab'
import SearchTab from './tabs/SearchTab'
import ManageTab from './tabs/ManageTab'
import SalesTab from './tabs/SalesTab'
import MembersTab from './tabs/MembersTab'
import FacilitiesTab from './tabs/FacilitiesTab'
import ReportsTab from './tabs/ReportsTab'
import SettingsTab from './tabs/SettingsTab'

export default function DashboardContent({ activeTab }) {
  switch (activeTab) {
    case 'dashboard': return <DashboardTab />
    case 'search': return <SearchTab />
    case 'manage': return <ManageTab />
    case 'sales': return <SalesTab />
    case 'members': return <MembersTab />
    case 'facilities': return <FacilitiesTab />
    case 'reports': return <ReportsTab />
    case 'settings': return <SettingsTab />
    default: return null
  }
}
