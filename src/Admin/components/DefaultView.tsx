import { 
  Users, 
  Settings, 
  ClipboardList,
  Dumbbell
} from 'lucide-react';

const quickActions = [
  {
    id: 1,
    name: 'Member Management',
    description: 'View and manage member information',
    icon: Users,
    path: '/admin/members'
  },
  {
    id: 2,
    name: 'Equipment Inventory',
    description: 'Track and manage facility equipment',
    icon: Dumbbell,
    path: '/admin/inventory'
  },
  {
    id: 3,
    name: 'Access Settings',
    description: 'Configure access control settings',
    icon: Settings,
    path: '/admin/access'
  },
  {
    id: 4,
    name: 'Reports',
    description: 'View facility reports and analytics',
    icon: ClipboardList,
    path: '/admin/reports'
  }
];

export default function DefaultView() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Select a category to manage your facility
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {action.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}