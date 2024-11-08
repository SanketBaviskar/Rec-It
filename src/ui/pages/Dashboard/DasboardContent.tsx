import DashboardTab from './tabs/DashboardTab'
import CalendarTab from './tabs/CalendarTab'
import SalesTab from './tabs/SalesTab'
import EquipmentTab from './tabs/EquipmentTab'
import SearchTab from './tabs/SearchTab'

export default function DashboardContent({ activeTab }) {
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
