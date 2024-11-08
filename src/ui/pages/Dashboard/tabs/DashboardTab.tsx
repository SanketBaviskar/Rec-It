import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/index"
import { StyledButton } from "../../../../components/Button/StyledButton"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/Avatar/Avatar"
import { Badge } from "../../../../components/Badge/Badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Cloud, Users } from 'lucide-react'

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
  const [graphOption, setGraphOption] = useState<'daily' | 'weekly' | 'monthly'>('daily')
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
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
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
              <ResponsiveContainer width="100%" height={300}>
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

          <Card>
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

        <Card>
          <CardHeader>
            <CardTitle>LIVE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liveUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="flex items-center space-x-4 p-4">
                    <Avatar>
                      <AvatarImage src={user.photo} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.membershipType}</p>
                      <p className="text-sm text-gray-500">{user.phoneNumber}</p>
                    </div>
                    {user.hasNotes && (
                      <Cloud className="h-5 w-5 text-blue-500" />
                    )}
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'destructive'}
                      className={user.status === 'active' ? 'bg-green-500' : ''}
                    >
                      {user.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}