'use client'

import { useState } from 'react'
import AdminLayout from "../AdminDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Switch } from "../../../components/ui/switch"
import { Label } from "../../../components/ui/label"
import { AlertCircle, Bell, Shield } from 'lucide-react'

// Mock data for security logs
const initialSecurityLogs = [
  { id: 'E001', timestamp: '2023-11-03 09:15:00', eventType: 'Login', user: 'admin@example.com', location: 'New York, USA', status: 'Success' },
  { id: 'E002', timestamp: '2023-11-03 10:30:00', eventType: 'Password Change', user: 'john@example.com', location: 'London, UK', status: 'Success' },
  { id: 'E003', timestamp: '2023-11-03 11:45:00', eventType: 'Failed Login', user: 'unknown@example.com', location: 'Beijing, China', status: 'Failure' },
  { id: 'E004', timestamp: '2023-11-03 13:00:00', eventType: 'Access Attempt', user: 'jane@example.com', location: 'Sydney, Australia', status: 'Blocked' },
]

export default function SecurityPage() {
  const [securityLogs, setSecurityLogs] = useState(initialSecurityLogs)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEventType, setFilterEventType] = useState('All')

  const filteredLogs = securityLogs.filter(log => 
    (log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.eventType.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterEventType === 'All' || log.eventType === filterEventType)
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Security</h2>
          <Button variant="destructive" className="flex items-center gap-2">
            <AlertCircle size={16} />
            Active Threats: 2
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Security Log</CardTitle>
              <CardDescription>
                View and manage security-related events and access logs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Input 
                  className="max-w-sm" 
                  placeholder="Search logs..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={filterEventType} onValueChange={setFilterEventType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Events</SelectItem>
                    <SelectItem value="Login">Login</SelectItem>
                    <SelectItem value="Password Change">Password Change</SelectItem>
                    <SelectItem value="Failed Login">Failed Login</SelectItem>
                    <SelectItem value="Access Attempt">Access Attempt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.id}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.eventType}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.location}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === 'Success' ? 'default' : log.status === 'Failure' ? 'destructive' : 'secondary'}>
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button variant="outline">Export Logs</Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Alerts</CardTitle>
                <CardDescription>
                  Configure and manage real-time security alerts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell size={20} />
                      <Label htmlFor="failed-logins">Failed Login Attempts</Label>
                    </div>
                    <Switch id="failed-logins" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield size={20} />
                      <Label htmlFor="unusual-activity">Unusual Account Activity</Label>
                    </div>
                    <Switch id="unusual-activity" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle size={20} />
                      <Label htmlFor="system-updates">Critical System Updates</Label>
                    </div>
                    <Switch id="system-updates" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage global security settings for the fitness center.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor">Enforce Two-Factor Authentication</Label>
                    <Switch id="two-factor" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger id="password-policy">
                        <SelectValue placeholder="Select password policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                        <SelectItem value="strong">Strong (12+ chars, uppercase, lowercase, number)</SelectItem>
                        <SelectItem value="very-strong">Very Strong (16+ chars, uppercase, lowercase, number, symbol)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue={30} className="w-20" />
                  </div>
                </div>
                <Button className="mt-4 w-full">Save Security Settings</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}