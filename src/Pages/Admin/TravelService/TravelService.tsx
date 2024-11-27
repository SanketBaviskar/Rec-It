'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Calendar } from "../../../components/ui/calendar"
import { MapPin, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

// Mock data for travel services
const initialTrips = [
  { id: 'T001', name: 'Mountain Hiking Retreat', destination: 'Rocky Mountains', startDate: '2023-12-15', endDate: '2023-12-20', capacity: 20, registered: 15, status: 'Upcoming' },
  { id: 'T002', name: 'Beach Volleyball Tournament', destination: 'Miami Beach', startDate: '2024-03-10', endDate: '2024-03-15', capacity: 50, registered: 50, status: 'Full' },
  { id: 'T003', name: 'Ski Trip', destination: 'Aspen', startDate: '2024-01-05', endDate: '2024-01-10', capacity: 30, registered: 25, status: 'Upcoming' },
]

export default function TravelServicesPage() {
  const [trips, setTrips] = useState(initialTrips)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddTripOpen, setIsAddTripOpen] = useState(false)
  const [newTripDates, setNewTripDates] = useState({ start: null, end: null })

  const filteredTrips = trips.filter(trip => 
    trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addNewTrip = (newTrip) => {
    setTrips([...trips, { ...newTrip, id: `T00${trips.length + 1}`, registered: 0, status: 'Upcoming' }])
    setIsAddTripOpen(false)
  }

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Travel Services</h2>
          <Input 
            className="max-w-sm" 
            placeholder="Search trips..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="past">Past Trips</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Trips</CardTitle>
                <CardDescription>Manage and view upcoming fitness travel services.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trip ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrips.map((trip) => (
                      <TableRow key={trip.id}>
                        <TableCell>{trip.id}</TableCell>
                        <TableCell>{trip.name}</TableCell>
                        <TableCell>{trip.destination}</TableCell>
                        <TableCell>{`${trip.startDate} - ${trip.endDate}`}</TableCell>
                        <TableCell>{`${trip.registered}/${trip.capacity}`}</TableCell>
                        <TableCell>
                          <Badge variant={trip.status === 'Full' ? 'secondary' : 'default'}>
                            {trip.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Cancel</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-between">
                  <Dialog open={isAddTripOpen} onOpenChange={setIsAddTripOpen}>
                    <DialogTrigger asChild>
                      <Button>Add New Trip</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Trip</DialogTitle>
                        <DialogDescription>
                          Enter the details of the new fitness trip here.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.target as HTMLFormElement)
                        addNewTrip({
                          ...Object.fromEntries(formData),
                          startDate: format(newTripDates.start, 'yyyy-MM-dd'),
                          endDate: format(newTripDates.end, 'yyyy-MM-dd'),
                        })
                      }}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input id="name" name="name" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="destination" className="text-right">
                              Destination
                            </Label>
                            <Input id="destination" name="destination" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dates" className="text-right">
                              Dates
                            </Label>
                            <div className="col-span-3">
                              <Calendar
                                mode="range"
                                selected={{ from: newTripDates.start, to: newTripDates.end }}
                                onSelect={(range) => setNewTripDates({ start: range?.from, end: range?.to })}
                                numberOfMonths={2}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="capacity" className="text-right">
                              Capacity
                            </Label>
                            <Input id="capacity" name="capacity" type="number" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Add Trip</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">Export Trip Data</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Trips</CardTitle>
                <CardDescription>View details of completed fitness trips.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add a table similar to the upcoming trips, but for past trips */}
                <p>Past trips data will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Trip Statistics</CardTitle>
            <CardDescription>Overview of travel service performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
                <h3 className="text-2xl font-bold">3</h3>
                <p className="text-sm text-muted-foreground">Upcoming Trips</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
                <h3 className="text-2xl font-bold">90%</h3>
                <p className="text-sm text-muted-foreground">Average Occupancy</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
                <h3 className="text-2xl font-bold">4.8/5</h3>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
