import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/Card/Card";
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, Clock, Activity, Cloud, CheckCircle, XCircle } from 'lucide-react';

const DashboardPage = () => {
  // Your existing data declarations remain the same
  const [timeRange, setTimeRange] = useState('daily');
  
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

  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, trend: '+12%' },
    { title: 'Active Now', value: '42', icon: Activity, trend: '+5%' },
    { title: 'Avg. Session', value: '48m', icon: Clock, trend: '+8%' },
    { title: 'Revenue', value: '$12.4k', icon: TrendingUp, trend: '+15%' }
  ];

  return (
    // Added pt-16 to account for navbar height
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Added mt-4 for extra spacing from navbar */}
      <div className="container mx-auto px-4 py-8 mt-4">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="text-xl font-bold mt-1">{stat.value}</h3>
                    <span className="inline-flex items-center text-sm text-green-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </span>
                  </div>
                  <stat.icon className="w-10 h-10 text-blue-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Activity Chart */}
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

              {/* Revenue Chart */}
              <Card className="h-[300px]">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userStats[timeRange]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Active Users Section */}
          <div className="lg:col-span-2">
            <Card className="h-[620px]">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Active Users</h3>
                <div className="space-y-3 overflow-y-auto h-[540px]">
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