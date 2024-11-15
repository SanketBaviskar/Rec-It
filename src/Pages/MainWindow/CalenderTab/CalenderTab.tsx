'use client'

import { useState } from 'react'
import { addDays, subDays, format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, ChevronLeft, ChevronRight, Users, Clock, BookOpen, PenToolIcon as Tool, Search, LayoutDashboard, ShoppingCart, Wrench, Filter } from 'lucide-react'

interface Facility {
  id: string
  name: string
  type: string
  capacity: number
  available: boolean
  location: string
  equipment: string[]
}

interface Booking {
  id: string
  title: string
  facility: string
  start: Date
  end: Date
  type: 'booking'
  status: 'confirmed' | 'pending' | 'cancelled'
  attendees?: number
}

const sampleFacilities: Facility[] = [
  {
    id: '1',
    name: 'Main Basketball Court',
    type: 'court',
    capacity: 30,
    available: true,
    location: 'Ground Floor',
    equipment: ['Basketballs', 'Scoreboard'],
  },
  {
    id: '2',
    name: 'Swimming Pool',
    type: 'pool',
    capacity: 40,
    available: true,
    location: 'Basement Level',
    equipment: ['Lane Dividers', 'Life Jackets'],
  },
  {
    id: '3',
    name: 'Fitness Studio',
    type: 'studio',
    capacity: 20,
    available: true,
    location: 'Second Floor',
    equipment: ['Yoga Mats', 'Sound System'],
  },
  {
    id: '4',
    name: 'Weight Room',
    type: 'gym',
    capacity: 25,
    available: true,
    location: 'First Floor',
    equipment: ['Free Weights', 'Machines'],
  },
]

export default function CalenderTab() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'day' | 'week' | 'month'>('day')
  const [selectedFacility, setSelectedFacility] = useState<string>()
  const [bookings, setBookings] = useState<Booking[]>([])

  const handlePrevious = () => {
    setCurrentDate(prev => view === 'week' ? subDays(prev, 7) : subDays(prev, 1))
  }

  const handleNext = () => {
    setCurrentDate(prev => view === 'week' ? addDays(prev, 7) : addDays(prev, 1))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search facilities..." className="pl-8" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="court">Court</SelectItem>
                <SelectItem value="pool">Pool</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="gym">Gym</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
              {sampleFacilities.map((facility) => (
                <Card key={facility.id} className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{facility.name}</h3>
                        <p className="text-sm text-muted-foreground">{facility.type} • {facility.capacity} capacity</p>
                        <p className="text-sm text-muted-foreground">{facility.location}</p>
                      </div>
                      <Badge variant={facility.available ? "success" : "destructive"}>
                        {facility.available ? 'Available' : 'In Use'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="bg-white border-b px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="default" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                Calendar
              </Button>
              <Button variant="ghost" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Sale
              </Button>
              <Button variant="ghost" className="gap-2">
                <Wrench className="h-4 w-4" />
                Equipment
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search..."
                className="w-64"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Header */}
        <div className="p-4 bg-white border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline">Today</Button>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <span className="mx-4 font-medium">
                  {format(currentDate, 'MMMM d, yyyy')}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={view === 'day' ? 'default' : 'ghost'}
                onClick={() => setView('day')}
              >
                Day
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'ghost'}
                onClick={() => setView('week')}
              >
                Week
              </Button>
              <Button
                variant={view === 'month' ? 'default' : 'ghost'}
                onClick={() => setView('month')}
              >
                Month
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 p-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Attendees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Classes Today
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Maintenance
              </CardTitle>
              <Tool className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-4 gap-4 h-full">
            <div className="col-span-3 bg-white rounded-lg shadow p-4">
              <div className="grid grid-cols-1 gap-4">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="flex items-center border-t py-2">
                    <div className="w-16 text-sm text-muted-foreground">
                      {String(i).padStart(2, '0')}:00
                    </div>
                    <div className="flex-1 h-8 rounded hover:bg-gray-50"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Book</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Study Room 1', 'Study Room 2', 'Study Room 3', 'Study Room 4'].map((room) => (
                      <div key={room}>
                        <h4 className="font-medium mb-2">{room}</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" size="sm">30m</Button>
                          <Button variant="outline" size="sm">60m</Button>
                          <Button variant="outline" size="sm">90m</Button>
                          <Button variant="outline" size="sm" className="col-span-3">120m</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    No upcoming events
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}