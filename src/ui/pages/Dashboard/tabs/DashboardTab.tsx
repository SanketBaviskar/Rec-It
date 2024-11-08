import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/index"
import { StyledButton } from "../../../../components/Button/index"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/Avatar/Avatar"
import { Badge } from "../../../../components/Badge/Badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Cloud, CheckCircle, XCircle, Users } from 'lucide-react'

// Sample data for the graph
const dailyData = [
  { name: 'Mon', users: 120 },
  { name: 'Tue', users: 150 },
  { name: 'Wed', users: 200 },
  { name: 'Thu', users: 180 },
  { name: 'Fri', users: 220 },
  { name: 'Sat', users: 250 },
  { name: 'Sun', users: 190 },
]

const weeklyData = [
  { name: 'Week 1', users: 1000 },
  { name: 'Week 2', users: 1200 },
  { name: 'Week 3', users: 1100 },
  { name: 'Week 4', users: 1300 },
]

const monthlyData = [
  { name: 'Jan', users: 5000 },
  { name: 'Feb', users: 5500 },
  { name: 'Mar', users: 6000 },
  { name: 'Apr', users: 5800 },
  { name: 'May', users: 6200 },
  { name: 'Jun', users: 6500 },
]

const liveUsers = [
  { id: 1, name: 'John Doe', photo: '/placeholder.svg', membershipType: 'Gold', phoneNumber: '(123) 456-7890', hasNotes: true, status: 'active' },
  { id: 2, name: 'Jane Smith', photo: '/placeholder.svg', membershipType: 'Silver', phoneNumber: '(234) 567-8901', hasNotes: false, status: 'active' },
  { id: 3, name: 'Bob Johnson', photo: '/placeholder.svg', membershipType: 'Bronze', phoneNumber: '(345) 678-9012', hasNotes: true, status: 'suspended' },
  { id: 4, name: 'Alice Brown', photo: '/placeholder.svg', membershipType: 'Gold', phoneNumber: '(456) 789-0123', hasNotes: false, status: 'active' },
]

export default function DashboardTab() {
  const [graphOption, setGraphOption] = useState('daily')
  const [peopleInside, setPeopleInside] = useState(42)

  const getGraphData = () => {
    switch (graphOption) {
      case 'weekly':
        return weeklyData
      case 'monthly':
        return monthlyData
      default:
        return dailyData
    }
  }

  return (
    <div className="w-full h-full p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full max-h-screen">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* User Count Card */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>User Count</CardTitle>
              <div className="space-x-2">
                <StyledButton
                  variant={graphOption === 'daily' ? 'default' : 'outline'}
                  onClick={() => setGraphOption('daily')}
                >
                  Daily
                </StyledButton>
                <StyledButton
                  variant={graphOption === 'weekly' ? 'default' : 'outline'}
                  onClick={() => setGraphOption('weekly')}
                >
                  Weekly
                </StyledButton>
                <StyledButton
                  variant={graphOption === 'monthly' ? 'default' : 'outline'}
                  onClick={() => setGraphOption('monthly')}
                >
                  Monthly
                </StyledButton>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={getGraphData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* People Inside Facility Card */}
          <Card className="h-48">
            <CardHeader>
              <CardTitle>People Inside Facility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Users className="h-10 w-10 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{peopleInside}</p>
                  <p className="text-sm text-gray-500">Currently inside</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Section */}
        <div className="lg:col-span-1 h-full">
          <Card className="h-full">
            <CardHeader className="border-b">
              <CardTitle>LIVE</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[calc(100vh-12rem)] overflow-y-auto">
                {liveUsers.map((user) => (
                  <div key={user.id} className="p-4 border-b last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={user.photo} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold truncate">{user.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{user.membershipType}</p>
                        <p className="text-sm text-gray-500 truncate">{user.phoneNumber}</p>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {user.hasNotes && (
                          <Cloud className="h-5 w-5 text-blue-500" />
                        )}
                        <Badge
                          className={`flex items-center space-x-1 rounded-full px-3 py-1 ${user.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}
                        >
                          {user.status === 'active' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          <span className="capitalize">{user.status}</span>
                        </Badge>
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
  )
}