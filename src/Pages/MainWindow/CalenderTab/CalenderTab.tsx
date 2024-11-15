'use client'

import { useState } from 'react'
import { addDays, subDays, format, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, isSameMonth } from 'date-fns'
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
    setCurrentDate(prev => {
      switch (view) {
        case 'day':
          return subDays(prev, 1)
        case 'week':
          return subDays(prev, 7)
        case 'month':
          return subDays(prev, 30)
        default:
          return prev
      }
    })
  }

  const handleNext = () => {
    setCurrentDate(prev => {
      switch (view) {
        case 'day':
          return addDays(prev, 1)
        case 'week':
          return addDays(prev, 7)
        case 'month':
          return addDays(prev, 30)
        default:
          return prev
      }
    })
  }

  const renderDayView = () => (
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
  )

  const renderWeekView = () => {
    const startDate = startOfWeek(currentDate)
    const endDate = endOfWeek(currentDate)
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-1"></div>
        {days.map((day, index) => (
          <div key={index} className="text-center font-medium">
            {format(day, 'EEE d')}
          </div>
        ))}
        {Array.from({ length: 24 }).map((_, hour) => (
          <>
            <div key={`hour-${hour}`} className="text-sm text-muted-foreground">
              {String(hour).padStart(2, '0')}:00
            </div>
            {days.map((day, index) => (
              <div key={`${day}-${hour}`} className="border-t h-8 hover:bg-gray-50"></div>
            ))}
          </>
        ))}
      </div>
    )
  }

  const renderMonthView = () => {
    const startDate = startOfMonth(currentDate)
    const endDate = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`h-24 border p-1 ${isSameMonth(day, currentDate) ? 'bg-white' : 'bg-gray-100'
              }`}
          >
            <div className="text-sm">{format(day, 'd')}</div>
          </div>
        ))}
      </div>
    )
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
        {/* Calendar Header */}
        <div className="p-4 bg-white border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Today</Button>
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
        <div className="grid grid-cols-4 gap-1 p-1">
          <Card className="bg-white rounded-lg shadow p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-blue-600">
                Total Bookings
              </CardTitle>
              <BookOpen className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">0</div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg shadow p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-green-600">
                Total Attendees
              </CardTitle>
              <Users className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">0</div>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-lg shadow p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-purple-600">
                Classes Today
              </CardTitle>
              <Clock className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">0</div>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-lg shadow p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-amber-600">
                Maintenance
              </CardTitle>
              <Tool className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">0</div>
            </CardContent>
          </Card>
        </div>
        {/* Calendar Grid */}
        <div className="flex-1 p-1">
          <div className="grid grid-cols-4 gap-1 h-full">
            <div className="col-span-3 bg-white rounded-lg shadow p-4 overflow-auto">
              {view === 'day' && renderDayView()}
              {view === 'week' && renderWeekView()}
              {view === 'month' && renderMonthView()}
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