'use client'

import { useState } from 'react'
import AdminLayout from "../AdminDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Badge } from "../../../components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data for utility usage
const utilityData = [
  { month: 'Jan', electricity: 5000, water: 2000, gas: 1000 },
  { month: 'Feb', electricity: 5200, water: 2100, gas: 1100 },
  { month: 'Mar', electricity: 4800, water: 1900, gas: 950 },
  { month: 'Apr', electricity: 5100, water: 2000, gas: 1050 },
  { month: 'May', electricity: 5300, water: 2200, gas: 1150 },
  { month: 'Jun', electricity: 5600, water: 2400, gas: 1250 },
]

// Mock data for utility bills
const initialBills = [
  { id: 'B001', month: 'June 2023', type: 'Electricity', amount: 5600, status: 'Paid' },
  { id: 'B002', month: 'June 2023', type: 'Water', amount: 2400, status: 'Pending' },
  { id: 'B003', month: 'June 2023', type: 'Gas', amount: 1250, status: 'Paid' },
  { id: 'B004', month: 'May 2023', type: 'Electricity', amount: 5300, status: 'Paid' },
  { id: 'B005', month: 'May 2023', type: 'Water', amount: 2200, status: 'Paid' },
]

export default function UtilitiesPage() {
  const [bills, setBills] = useState(initialBills)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddBillOpen, setIsAddBillOpen] = useState(false)

  const filteredBills = bills.filter(bill => 
    bill.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.month.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addNewBill = (newBill) => {
    setBills([...bills, { ...newBill, id: `B00${bills.length + 1}`, status: 'Pending' }])
    setIsAddBillOpen(false)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Utilities Management</h2>
          <Input 
            className="max-w-sm" 
            placeholder="Search bills..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Utility Usage Overview</CardTitle>
            <CardDescription>Monthly consumption of electricity, water, and gas.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="electricity" fill="#8884d8" />
                <Bar dataKey="water" fill="#82ca9d" />
                <Bar dataKey="gas" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utility Bills</CardTitle>
            <CardDescription>Manage and view utility bills for the fitness center.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Utility Type</TableHead>
                  <TableHead>Amount ($)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => (
                
<TableRow key={bill.id}>
                    <TableCell>{bill.id}</TableCell>
                    <TableCell>{bill.month}</TableCell>
                    <TableCell>{bill.type}</TableCell>
                    <TableCell>{bill.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={bill.status === 'Paid' ? 'default' : 'secondary'}>
                        {bill.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Pay</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between">
              <Dialog open={isAddBillOpen} onOpenChange={setIsAddBillOpen}>
                <DialogTrigger asChild>
                  <Button>Add New Bill</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Utility Bill</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new utility bill here.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    addNewBill(Object.fromEntries(formData))
                  }}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="month" className="text-right">
                          Month
                        </Label>
                        <Input id="month" name="month" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                          Utility Type
                        </Label>
                        <Select name="type">
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select utility type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Electricity">Electricity</SelectItem>
                            <SelectItem value="Water">Water</SelectItem>
                            <SelectItem value="Gas">Gas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                          Amount ($)
                        </Label>
                        <Input id="amount" name="amount" type="number" step="0.01" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Bill</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline">Export Bill Data</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Efficiency Metrics</CardTitle>
            <CardDescription>Key performance indicators for utility usage efficiency.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
                <h3 className="text-2xl font-bold">85%</h3>
                <p className="text-sm text-muted-foreground">Energy Efficiency Rating</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
                <h3 className="text-2xl font-bold">-5%</h3>
                <p className="text-sm text-muted-foreground">YoY Consumption Change</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
                <h3 className="text-2xl font-bold">$12,500</h3>
                <p className="text-sm text-muted-foreground">Projected Monthly Savings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

