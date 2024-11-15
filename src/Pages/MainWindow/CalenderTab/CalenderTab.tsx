'use client'

import React, { useState } from 'react'
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
import { CalendarIcon, ChevronLeft, ChevronRight, Users, Clock, BookOpen, PenToolIcon as Tool, Search, Filter, X } from 'lucide-react'

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
  type: 'booking' | 'class' | 'maintenance' | 'event'
  status: 'confirmed' | 'pending' | 'cancelled'
  description?: string
  attendees?: number
  instructor?: string
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    endDate: Date
  }
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

export default function CalendarTab() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'day' | 'week' | 'month'>('day')
  const [selectedFacility, setSelectedFacility] = useState<string>()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedBookingDate, setSelectedBookingDate] = useState(new Date())

  const handlePrevious = () => {
    setCurrentDate(prev => {
      switch (view) {
        case 'day':
          return subDays(prev, 1)
        case 'week':
          return subDays(prev, 7)
        case 'month':
          return subDays(prev, 1)
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
          return addDays(prev, 1)
        default:
          return prev
      }
    })
  }

  const handleBook = (booking: Booking) => {
    setBookings(prev => [...prev, { ...booking, id: Date.now().toString() }])
    setIsBookingModalOpen(false)
  }

  const renderDayView = () => (
    <div className="grid grid-cols-1 gap-2">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="flex items-center border-t py-1">
          <div className="w-16 text-sm text-muted-foreground">
            {String(i).padStart(2, '0')}:00
          </div>
          <div className="flex-1 h-8 rounded-md hover:bg-accent/50 transition-colors"></div>
        </div>
      ))}
    </div>
  )

  const renderWeekView = () => {
    const startDate = startOfWeek(currentDate)
    const endDate = endOfWeek(currentDate)
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <div className="grid grid-cols-8 gap-2">
        <div className="col-span-1"></div>
        {days.map((day, index) => (
          <div key={index} className="text-center font-medium">
            {format(day, 'EEE d')}
          </div>
        ))}
        {Array.from({ length: 24 }).map((_, hour) => (
          <React.Fragment key={`hour-${hour}`}>
            <div className="text-sm text-muted-foreground">
              {String(hour).padStart(2, '0')}:00
            </div>
            {days.map((day, index) => (
              <div key={`${day}-${hour}`} className="border-t h-8 hover:bg-accent/50 transition-colors"></div>
            ))}
          </React.Fragment>
        ))}
      </div>
    )
  }

  const renderMonthView = () => {
    const startDate = startOfMonth(currentDate)
    const endDate = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`h-24 border p-1 ${isSameMonth(day, currentDate) ? 'bg-background' : 'bg-muted'
              } hover:bg-accent/50 transition-colors`}
          >
            <div className="text-sm">{format(day, 'd')}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-64 border-r p-4">
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
                <Card key={facility.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{facility.name}</h3>
                        <p className="text-sm text-muted-foreground">{facility.type} • {facility.capacity} capacity</p>
                        <p className="text-sm text-muted-foreground">{facility.location}</p>
                      </div>
                      <Badge variant={facility.available ? "default" : "secondary"}>
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
      <div className="flex-1 flex">
        {/* Calendar Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
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
          <div className="grid grid-cols-4 gap-4 p-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookings.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {bookings.reduce((sum, booking) => sum + (booking.attendees || 0), 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {bookings.filter(booking =>
                    booking.type === 'class' &&
                    booking.start.toDateString() === new Date().toDateString()
                  ).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                <Tool className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {bookings.filter(booking => booking.type === 'maintenance').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="bg-card rounded-lg border p-4 h-full">
              {view === 'day' && renderDayView()}
              {view === 'week' && renderWeekView()}
              {view === 'month' && renderMonthView()}
            </div>
          </div>
        </div>

        {/* Quick Book Sidebar */}
        <div className="w-80 border-l p-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Book</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: 'Study Room 1', seats: '2/10' },
                { name: 'Study Room 2', seats: '4/10' },
                { name: 'Study Room 3', seats: '7/10' },
                { name: 'Study Room 4', seats: '10/10' }
              ].map((room) => (
                <div key={room.name}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{room.name}</h4>
                    <span className="text-sm text-muted-foreground">({room.seats} seats)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <Button variant="outline" size="sm"
                      onClick={() => {
                        setSelectedBookingDate(new Date())
                        setIsBookingModalOpen(true)
                      }}
                    >
                      30m
                    </Button>
                    <Button variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBookingDate(new Date())
                        setIsBookingModalOpen(true)
                      }}
                    >
                      60m
                    </Button>
                    <Button variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBookingDate(new Date())
                        setIsBookingModalOpen(true)
                      }}
                    >
                      90m
                    </Button>
                  </div>
                  <Button variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSelectedBookingDate(new Date())
                      setIsBookingModalOpen(true)
                    }}
                  >
                    120m
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No upcoming events</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Booking</DialogTitle>
          </DialogHeader>
          <BookingForm
            selectedDate={selectedBookingDate}
            facilities={sampleFacilities}
            onBook={handleBook}
            onClose={() => setIsBookingModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function BookingForm({ selectedDate, facilities, onBook, onClose }: {
  selectedDate: Date
  facilities: Facility[]
  onBook: (booking: Booking) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    title: '',
    facility: '',
    startTime: format(selectedDate, 'HH:mm'),
    endTime: format(new Date(selectedDate.getTime() + 3600000), 'HH:mm'),
    type: 'booking' as Booking['type'],
    status: 'pending' as Booking['status'],
    description: '',
    attendees: '',
    instructor: '',
    isRecurring: false,
    recurringFrequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
    recurringEndDate: format(new Date(selectedDate.getTime() + 7776000000), 'yyyy-MM-dd'), // 90 days ahead
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const [startHours, startMinutes] = formData.startTime.split(':').map(Number)
    const [endHours, endMinutes] = formData.endTime.split(':').map(Number)

    const start = new Date(selectedDate)
    start.setHours(startHours, startMinutes)

    const end = new Date(selectedDate)
    end.setHours(endHours, endMinutes)

    onBook({
      id: '',  // This will be set in the parent component
      title: formData.title,
      facility: formData.facility,
      start,
      end,
      type: formData.type,
      status: formData.status,
      description: formData.description,
      attendees: formData.attendees ? parseInt(formData.attendees) : undefined,
      instructor: formData.instructor || undefined,
      ...(formData.isRecurring && {
        recurring: {
          frequency: formData.recurringFrequency,
          endDate: new Date(formData.recurringEndDate),
        },
      }),
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Title
        </label>
        <Input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Facility
        </label>
        <Select
          value={formData.facility}
          onValueChange={(value) => setFormData({ ...formData, facility: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a facility" />
          </SelectTrigger>
          <SelectContent>
            {facilities.map((facility) => (
              <SelectItem key={facility.id} value={facility.id}>
                {facility.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Start Time
          </label>
          <Input
            type="time"
            required
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            End Time
          </label>
          <Input
            type="time"
            required
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Type
        </label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value as Booking['type'] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="booking">Booking</SelectItem>
            <SelectItem value="class">Class</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="event">Event</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.type === 'class' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Instructor
          </label>
          <Input
            type="text"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Description
        </label>
        <textarea
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Expected Attendees
        </label>
        <Input
          type="number"
          value={formData.attendees}
          onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Book
        </Button>
      </div>
    </form>
  )
}