import { Card, CardContent } from "../../../../components/Card/Card";
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cloud, CheckCircle, XCircle } from 'lucide-react';

const Gate = ({ isOpen, gateNumber, handleGateClick }) => {
  return (
    <div className="relative w-full h-16 mb-2" onClick={handleGateClick}>
      <div className="absolute inset-0 border-4 border-gray-300 rounded-lg overflow-hidden cursor-pointer">
        <div 
          className={`absolute top-0 left-0 w-1/2 h-full bg-gray-200 border-r-2 border-gray-400 transition-transform duration-1000 
            ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}
        >
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <div className="w-4 h-8 bg-gray-400 rounded-full" />
          </div>
        </div>
        <div 
          className={`absolute top-0 right-0 w-1/2 h-full bg-gray-200 border-l-2 border-gray-400 transition-transform duration-1000 
            ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
        >
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <div className="w-4 h-8 bg-gray-400 rounded-full" />
          </div>
        </div>
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-600">
          Gate {gateNumber}
        </div>
        <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-semibold 
          ${isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isOpen ? 'OPEN' : 'CLOSED'}
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState('daily');
  const [gateStates, setGateStates] = useState({
    gate1: false,
    gate2: false,
    gate3: false,
  });
  const [manualToggle, setManualToggle] = useState({
    gate1: false,
    gate2: false,
    gate3: false,
  });

  const userStats = {
    daily: [
      { name: 'Mon', users: 120, revenue: 1200, avgTime: 45 },
      { name: 'Tue', users: 150, revenue: 1500, avgTime: 52 },
      { name: 'Wed', users: 200, revenue: 2000, avgTime: 48 },
      { name: 'Thu', users: 180, revenue: 1800, avgTime: 50 },
      { name: 'Fri', users: 220, revenue: 2200, avgTime: 55 },
      { name: 'Sat', users: 250, revenue: 2500, avgTime: 60 },
      { name: 'Sun', users: 190, revenue: 1900, avgTime: 47 }
    ],
    weekly: [
      { name: 'Week 1', users: 1000, revenue: 10000, avgTime: 49 },
      { name: 'Week 2', users: 1200, revenue: 12000, avgTime: 51 },
      { name: 'Week 3', users: 1100, revenue: 11000, avgTime: 48 },
      { name: 'Week 4', users: 1300, revenue: 13000, avgTime: 53 }
    ]
  };

  const activeUsers = [
    {
      id: 1,
      name: 'John Doe',
      status: 'active',
      membershipType: 'Premium',
      lastActive: '2 min ago',
      avatar: '/api/placeholder/32/32',
      note: 'VIP customer - Priority support'
    },
    {
      id: 2,
      name: 'Jane Smith',
      status: 'active',
      membershipType: 'Basic',
      lastActive: '5 min ago',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 3,
      name: 'Alice Brown',
      status: 'suspended',
      membershipType: 'Premium',
      lastActive: '15 min ago',
      avatar: '/api/placeholder/32/32',
      note: 'Account under review'
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      id: i + 4,
      name: `User ${i + 4}`,
      status: i % 2 === 0 ? 'active' : 'inactive',
      membershipType: i % 2 === 0 ? 'Premium' : 'Basic',
      lastActive: `${(i + 1) * 5} min ago`,
      avatar: '/api/placeholder/32/32',
      note: i % 2 === 0 ? 'Regular customer' : undefined
    }))
  ];

  const handleGateClick = (gate) => {
    if (!manualToggle[gate]) {
      setGateStates(prevState => ({
        ...prevState,
        [gate]: true
      }));
      
      setTimeout(() => {
        setGateStates(prevState => ({
          ...prevState,
          [gate]: false
        }));
      }, 3000);
    }
  };

  const toggleGateSwitch = (gate) => {
    setManualToggle(prevState => ({
      ...prevState,
      [gate]: !prevState[gate]
    }));
    setGateStates(prevState => ({
      ...prevState,
      [gate]: !prevState[gate]
    }));
  };

  return (
    <div className="w-full pt-16">
      <div className="mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="h-[300px]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">User Activity</h3>
                  <div className="flex space-x-2">
                    {['daily', 'weekly'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          timeRange === range
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userStats[timeRange]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#3b82f6" />
                      <Line type="monotone" dataKey="avgTime" stroke="#10b981" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Gates Control</h3>
                <div className="space-y-4">
                  {Object.entries(gateStates).map(([gate, isOpen], index) => (
                    <div key={gate} className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700">
                          Gate Control {index + 1}
                        </span>
                        <button
                          onClick={() => toggleGateSwitch(gate)}
                          className={`relative w-14 h-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                              ${isOpen ? 'bg-blue-500' : 'bg-gray-200'}`}
                        >
                          <span className="sr-only">Toggle gate</span>
                          <span
                            className={`absolute w-6 h-6 mx-1 my-1 bg-white rounded-full transition-transform duration-200 transform
                                ${isOpen ? 'translate-x-6' : 'translate-x-0'}`}
                          />
                        </button>
                      </div>
                      <Gate 
                        isOpen={isOpen} 
                        gateNumber={index + 1} 
                        handleGateClick={() => handleGateClick(gate)} 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <Card className="flex-1">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Active Users</h3>
                <div className="space-y-3 overflow-y-auto flex-1">
                  {activeUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.membershipType}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {user.note && (
                          <div className="relative group">
                            <Cloud className="w-4 h-4 text-blue-500 cursor-pointer" />
                            <div className="absolute right-0 w-48 p-2 mt-2 text-sm bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                              {user.note}
                            </div>
                          </div>
                        )}
                        <div className="text-right">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : user.status === 'suspended'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {user.status === 'active' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className={`w-3 h-3 mr-1 ${user.status === 'suspended' ? 'text-red-500' : ''}`} />
                            )}
                            {user.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{user.lastActive}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
