"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import {
  format,
  addDays,
  subDays,
  startOfDay,
  endOfDay,
  eachMinuteOfInterval,
  differenceInMinutes,
  addMinutes,
  isSameDay,
  setHours,
  setMinutes,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
  parseISO,
} from "date-fns"
import { ChevronLeft, ChevronRight, Plus, Search, Filter, Trash2, BookOpen, Users, Clock, PenToolIcon as Tool } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Facility = {
  id: string;
  name: string;
  type: string;
  capacity: number;
  available: boolean;
  location: string;
  equipment: string[];
  color: string;
};

type Booking = {
  id: string;
  title: string;
  facility: string;
  start: Date;
  end: Date;
  type: "booking" | "maintenance" | "event";
  status: "pending" | "confirmed" | "cancelled";
  description?: string;
  attendees?: number;
  instructor?: string;
  createdAt: Date;
  recurring?: {
    frequency: "daily" | "weekly" | "monthly";
    endDate: Date;
  };
};

const sampleFacilities: Facility[] = [
  {
    id: "1",
    name: "Main Basketball Court",
    type: "court",
    capacity: 30,
    available: true,
    location: "Ground Floor",
    equipment: ["Basketballs", "Scoreboard"],
    color: "#4CAF50", // Green
  },
  {
    id: "2",
    name: "Swimming Pool",
    type: "pool",
    capacity: 40,
    available: true,
    location: "Basement Level",
    equipment: ["Lane Dividers", "Life Jackets"],
    color: "#2196F3", // Blue
  },
  {
    id: "3",
    name: "Fitness Studio",
    type: "studio",
    capacity: 20,
    available: true,
    location: "Second Floor",
    equipment: ["Yoga Mats", "Sound System"],
    color: "#FFC107", // Amber
  },
  {
    id: "4",
    name: "Weight Room",
    type: "gym",
    capacity: 25,
    available: true,
    location: "First Floor",
    equipment: ["Free Weights", "Machines"],
    color: "#9C27B0", // Purple
  },
];

export default function CalendarTab() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("day")
  const [selectedFacility, setSelectedFacility] = useState<string | undefined>(undefined)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedBookingDate, setSelectedBookingDate] = useState(new Date())
  const [draggedBooking, setDraggedBooking] = useState<Booking | null>(null)
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Filter bookings based on the selected facilities
  const filteredBookings = selectedFacility
    ? bookings.filter(booking => booking.facility === selectedFacility)
    : bookings

  const handlePrevious = () => {
    setCurrentDate((prev) => subMonths(prev, 1))
  }

  const handleNext = () => {
    setCurrentDate((prev) => addMonths(prev, 1))
  }

  const handlePreviousDay = () => {
    setCurrentDate((prev) => subDays(prev, 1))
  }
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Sets the current date to the next day
   */
  /******  40ee3015-5554-4c2b-b1ea-d7e596e0411f  *******/
  const handleNextDay = () => {
    setCurrentDate((prev) => addDays(prev, 1))
  }

  const handleBook = (booking: Booking) => {
    if (editingBooking) {
      setBookings((prev) =>
        prev.map((b) => (b.id === editingBooking.id ? { ...booking, id: b.id } : b))
      )
      setEditingBooking(null)
    } else {
      setBookings((prev) => [
        ...prev,
        { ...booking, id: Date.now().toString(), createdAt: new Date() },
      ])
    }
    setIsBookingModalOpen(false)
  }

  const openBookingModal = (date: Date, hour?: number, minute?: number) => {
    const selectedDate = new Date(date)
    if (hour !== undefined) {
      selectedDate.setHours(hour, minute || 0, 0, 0)
    }
    setSelectedBookingDate(selectedDate)
    setEditingBooking(null)
    setIsBookingModalOpen(true)
  }

  const toggleFacilitySelection = (facilityId: string) => {
    setSelectedFacility(prev => prev === facilityId ? undefined : facilityId)
  }

  const groupOverlappingEvents = (events: Booking[]) => {
    const sortedEvents = events.sort(
      (a, b) => a.start.getTime() - b.start.getTime()
    )
    const groups: Booking[][] = []

    for (const event of sortedEvents) {
      let added = false
      for (const group of groups) {
        if (
          !group.some(
            (groupEvent) =>
              event.start < groupEvent.end && event.end > groupEvent.start
          )
        ) {
          group.push(event)
          added = true
          break
        }
      }
      if (!added) {
        groups.push([event])
      }
    }

    return groups
  }

  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Add these new functions for drag and drop
  const handleDragStart = (e: React.MouseEvent, booking: Booking) => {
    e.stopPropagation()
    const element = e.currentTarget as HTMLDivElement
    const rect = element.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setDraggedBooking(booking)
    setIsDragging(true)
  }

  const handleDragMove = (e: MouseEvent) => {
    if (!draggedBooking || !calendarRef.current || !isDragging) return

    const rect = calendarRef.current.getBoundingClientRect()
    const y = e.clientY - rect.top - dragOffset.y

    // Convert y position to time
    const minutes = Math.floor(y)
    const hours = Math.floor(minutes / 60)
    const minutesWithinHour = minutes % 60

    // Snap to 5-minute intervals
    const snappedMinutes = Math.round(minutesWithinHour / 5) * 5

    // Create new dates for the dragged booking
    const newStart = new Date(currentDate)
    newStart.setHours(hours, snappedMinutes, 0, 0)

    // Maintain the same duration
    const duration = differenceInMinutes(draggedBooking.end, draggedBooking.start)
    const newEnd = addMinutes(newStart, duration)

    // Update bookings
    setBookings(prevBookings =>
      prevBookings.map(b =>
        b.id === draggedBooking.id
          ? { ...b, start: newStart, end: newEnd }
          : b
      )
    )
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setDraggedBooking(null)
  }

  // Add event listeners for drag and drop
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove)
      window.addEventListener('mouseup', handleDragEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove)
      window.removeEventListener('mouseup', handleDragEnd)
    }
  }, [isDragging, draggedBooking])

  const renderBooking = (
    booking: Booking,
    dayStart: Date,
    totalWidth: number,
    groupIndex: number,
    totalGroups: number
  ) => {
    const facility = sampleFacilities.find((f) => f.id === booking.facility)
    const startMinutes = differenceInMinutes(booking.start, dayStart) * 2
    const duration = differenceInMinutes(booking.end, booking.start) * 2
    const width = totalWidth / totalGroups - 4
    const left = 60 + groupIndex * (width + 4)

    const handleResizeStart = (e: React.MouseEvent, position: 'top' | 'bottom') => {
      e.stopPropagation()
      const startY = e.clientY
      const startTime = position === 'top' ? booking.start : booking.end

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaY = moveEvent.clientY - startY
        const deltaMinutes = Math.round(deltaY / 2) * 5
        const newTime = new Date(startTime.getTime() + deltaMinutes * 60000)

        const dayStart = startOfDay(booking.start)
        const dayEnd = endOfDay(booking.start)

        if (newTime >= dayStart && newTime <= dayEnd) {
          setBookings(prevBookings =>
            prevBookings.map(b => {
              if (b.id === booking.id) {
                if (position === 'top') {
                  return { ...b, start: newTime }
                } else {
                  return { ...b, end: newTime }
                }
              }
              return b
            })
          )
        }
      }

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    const handleEventClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      setEditingBooking(booking)
      setIsBookingModalOpen(true)
    }

    return (
      <div
        key={booking.id}
        className={`absolute rounded-md overflow-hidden cursor-move ${isDragging && draggedBooking?.id === booking.id ? 'opacity-50' : ''
          }`}
        style={{
          top: `${startMinutes}px`,
          height: `${duration}px`,
          left: `${left}px`,
          width: `${width}px`,
          backgroundColor: facility?.color || "#999",
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: isDragging && draggedBooking?.id === booking.id ? 1000 : 1,
        }}
        onMouseDown={(e) => handleDragStart(e, booking)}
        onClick={handleEventClick}
      >
        <div className="p-2 h-full flex flex-col justify-between relative">
          <div
            className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize"
            onMouseDown={(e) => handleResizeStart(e, 'top')}
          />
          <div>
            <div className="font-bold text-white truncate">{booking.title}</div>
            <div className="text-white text-xs truncate">{facility?.name}</div>
          </div>
          <div className="text-white text-xs">
            {format(booking.start, "HH:mm")} - {format(booking.end, "HH:mm")}
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize"
            onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          />
        </div>
        <button
          className="absolute top-1 right-1 text-white hover:text-red-500 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteBooking(booking.id)
          }}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    )
  }

  const handleDeleteBooking = (bookingId: string) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== bookingId)
    )
  }

  const handleCalendarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect()
      const y = e.clientY - rect.top
      const clickedMinute = Math.floor(y)
      const clickedHour = Math.floor(clickedMinute / 60)
      const clickedMinuteWithinHour = clickedMinute % 60

      const newBookingDate = new Date(currentDate)
      setHours(newBookingDate, clickedHour)
      setMinutes(newBookingDate, clickedMinuteWithinHour)

      openBookingModal(newBookingDate)
    }
  }
  const [mouseTime, setMouseTime] = useState<Date | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mouseY, setMouseY] = useState<number | null>(null);

  // Update handleMouseMove to track mouse position relative to scrolled position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect();
      const scrollTop = calendarRef.current.scrollTop;
      const y = e.clientY - rect.top + scrollTop;
      setMouseY(y);
      
      const minutes = Math.floor(y / 2); // Since each pixel represents 0.5 minutes
      const newDate = new Date(currentDate);
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      newDate.setHours(hours, mins, 0, 0);

      setMouseTime(newDate);
      setIsHovering(true);
    }
  };


  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const renderDayView = () => {
    const dayStart = startOfDay(currentDate);
    const dayEnd = endOfDay(currentDate);
    const intervals = eachMinuteOfInterval(
      { start: dayStart, end: dayEnd },
      { step: 30 }
    );
    const columnWidth = calendarRef.current
      ? calendarRef.current.offsetWidth - 60
      : 200;

    const dayEvents = filteredBookings.filter((booking) =>
      isSameDay(booking.start, currentDate)
    );
    const eventGroups = groupOverlappingEvents(dayEvents);

    return (
      <div
      className="relative"
      style={{ height: "2880px" }}
      onClick={handleCalendarClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
        {/* Time grid lines */}
        {intervals.map((interval, index) => (
          <div
            key={index}
            className="relative flex"
            style={{ height: "60px" }}
          >
            <div
              className="absolute w-14 pr-2 text-right text-sm text-gray-500 dark:text-gray-400"
              style={{
                top: "-9px",
                left: "0",
                zIndex: 10,
                background: "var(--background)",
                paddingTop: "2px",
                paddingBottom: "2px"
              }}
            >
              {format(interval, "HH:mm")}
            </div>
            <div
              className="absolute left-14 right-0 border-t border-gray-200 dark:border-gray-700"
              style={{ top: "-1px" }}
            />
            <div className="flex-1 h-full"></div>
          </div>
        ))}

        {/* Time indicator line */}
        {mouseTime && (
        <div 
          className="absolute left-0 right-0 flex items-center pointer-events-none"
          style={{
            top: `${(mouseY||0) - 28}px`,
            zIndex: 20,
            transition: isHovering ? 'none' : 'top 0.1s ease-out'
          }}
        >
            <div className="w-14 pr-2 text-right">
              <span className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                {format(mouseTime, "HH:mm")}
              </span>
            </div>
            <div className="flex-1 h-px bg-blue-500" />
          </div>
        )}

        {/* Render bookings */}
        {eventGroups.map((group, groupIndex) =>
          group.map((booking) =>
            renderBooking(
              booking,
              dayStart,
              columnWidth,
              groupIndex,
              eventGroups.length
            )
          )
        )}
      </div>
    );
  };
  const getUpcomingEvents = () => {
    const now = new Date()
    const twoHoursLater = addMinutes(now, 120)
    return filteredBookings
      .filter(
        (booking) => booking.start >= now && booking.start <= twoHoursLater
      )
      .sort((a, b) => a.start.getTime() - b.start.getTime())
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
                <Card
                  key={facility.id}
                  className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedFacility === facility.id ? 'bg-accent' : ''
                    }`}
                  onClick={() => toggleFacilitySelection(facility.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{facility.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {facility.type} • {" "}
                          {facility.capacity} capacity
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {facility.location}
                        </p>
                      </div>
                      <Badge
                        variant={facility.available ? "default" : "secondary"}
                      >
                        {facility.available ? "Available" : "In Use"}
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Calendar and Stats */}
        <div className="p-4 border-b flex">
          <div className="flex-shrink-0 mr-6">
            <div className="w-[280px] border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" size="icon" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium">
                  {format(currentDate, "MMMM yyyy")}
                </span>
                <Button variant="ghost" size="icon" onClick={handleNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                {eachDayOfInterval({
                  start: startOfMonth(currentDate),
                  end: endOfMonth(currentDate),
                }).map((day, index) => (
                  <Button
                    key={day.toISOString()}
                    variant={isSameDay(day, currentDate) ? "default" : "ghost"}
                    className={`p-0 h-8 w-8 ${index === 0 ? `col-start-${day.getDay() + 1}` : ""
                      }`}
                    onClick={() => setCurrentDate(day)}
                  >
                    {format(day, "d")}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-grow grid grid-cols-2 gap-2 content-start">
            <div className="col-span-2 flex justify-between items-center mb-2">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" onClick={handlePreviousDay}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleNextDay}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 font-medium">
                    {format(currentDate, "MMMM d, yyyy")}
                  </span>
                </div>
              </div>
              <Button onClick={() => setIsBookingModalOpen(true)}>
                New Booking
              </Button>
            </div>
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Bookings
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredBookings.length}</div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Attendees
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {filteredBookings.reduce(
                    (sum, booking) => sum + (booking.attendees || 0),
                    0
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Classes Today
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    filteredBookings.filter(
                      (booking) =>
                        booking.type === "event" &&
                        booking.start.toDateString() ===
                        new Date().toDateString()
                    ).length
                  }
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Maintenance
                </CardTitle>
                <Tool className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    filteredBookings.filter((booking) => booking.type === "maintenance")
                      .length
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* View Tabs */}
        <div className="flex justify-center my-2">
          <div className="inline-flex space-x-1 bg-muted p-1 rounded-md">
            <button
              onClick={() => setView("day")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${view === "day"
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:bg-background/50"
                }`}
            >
              Day
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${view === "week"
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:bg-background/50"
                }`}
            >
              Week
            </button>
            <button
              onClick={() => setView("month")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${view === "month"
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:bg-background/50"
                }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Calendar View */}
        <div className="flex-1 overflow-auto p-4" ref={calendarRef}>
          {renderDayView()}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 border-l p-4 flex flex-col">
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Quick Book</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {sampleFacilities.map((room) => (
                <div key={room.id} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{room.name}</h4>
                    <span className="text-sm text-muted-foreground">
                      ({room.capacity} seats)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBookingDate(new Date());
                        setSelectedFacility(room.id);
                        setIsBookingModalOpen(true);
                      }}
                    >
                      30m
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBookingDate(new Date());
                        setSelectedFacility(room.id);
                        setIsBookingModalOpen(true);
                      }}
                    >
                      60m
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBookingDate(new Date());
                        setSelectedFacility(room.id);
                        setIsBookingModalOpen(true);
                      }}
                    >
                      90m
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSelectedBookingDate(new Date());
                      setSelectedFacility(room.id);
                      setIsBookingModalOpen(true);
                    }}
                  >
                    120m
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {getUpcomingEvents().length > 0 ? (
              <ul className="space-y-2">
                {getUpcomingEvents().map((event) => (
                  <li key={event.id} className="text-sm">
                    <span className="font-medium">{event.title}</span>
                    <br />
                    {format(event.start, "HH:mm")} -{" "}
                    {format(event.end, "HH:mm")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No upcoming events in the next 2 hours
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingBooking ? "Edit Booking" : "New Booking"}</DialogTitle>
          </DialogHeader>
          <BookingForm
            selectedDate={selectedBookingDate}
            facilities={sampleFacilities}
            selectedFacility={selectedFacility}
            onBook={handleBook}
            onClose={() => {
              setIsBookingModalOpen(false)
              setEditingBooking(null)
            }}
            editingBooking={editingBooking}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function BookingForm({
  selectedDate,
  facilities,
  selectedFacility,
  onBook,
  onClose,
  editingBooking,
}: {
  selectedDate: Date;
  facilities: Facility[];
  selectedFacility?: string;
  onBook: (booking: Booking) => void;
  onClose: () => void;
  editingBooking: Booking | null;
}) {
  const [formData, setFormData] = useState({
    title: "",
    facility: selectedFacility || "",
    startTime: format(selectedDate, "HH:mm"),
    endTime: format(addMinutes(selectedDate, 60), "HH:mm"),
    type: "booking" as Booking["type"],
    status: "pending" as Booking["status"],
    description: "",
    attendees: "",
    instructor: "",
    isRecurring: false,
    recurringFrequency: "weekly" as "daily" | "weekly" | "monthly",
    recurringEndDate: format(addDays(selectedDate, 90), "yyyy-MM-dd"),
  })

  useEffect(() => {
    if (editingBooking) {
      setFormData({
        title: editingBooking.title,
        facility: editingBooking.facility,
        startTime: format(editingBooking.start, "HH:mm"),
        endTime: format(editingBooking.end, "HH:mm"),
        type: editingBooking.type,
        status: editingBooking.status,
        description: editingBooking.description || "",
        attendees: editingBooking.attendees?.toString() || "",
        instructor: editingBooking.instructor || "",
        isRecurring: !!editingBooking.recurring,
        recurringFrequency: editingBooking.recurring?.frequency || "weekly",
        recurringEndDate: editingBooking.recurring
          ? format(editingBooking.recurring.endDate, "yyyy-MM-dd")
          : format(addDays(selectedDate, 90), "yyyy-MM-dd"),
      })
    } else {
      setFormData(prevData => ({
        ...prevData,
        facility: selectedFacility || "",
      }))
    }
  }, [editingBooking, selectedFacility, selectedDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const [startHours, startMinutes] = formData.startTime
      .split(":")
      .map(Number)
    const [endHours, endMinutes] = formData.endTime.split(":").map(Number)

    const start = new Date(selectedDate)
    start.setHours(startHours, startMinutes, 0, 0)

    const end = new Date(selectedDate)
    end.setHours(endHours, endMinutes, 0, 0)

    onBook({
      id: editingBooking?.id || "", // This will be set in the parent component for new bookings
      title: formData.title,
      facility: formData.facility,
      start,
      end,
      type: formData.type,
      status: formData.status,
      description: formData.description,
      attendees: formData.attendees ? parseInt(formData.attendees) : undefined,
      instructor: formData.instructor || undefined,
      createdAt: editingBooking?.createdAt || new Date(),
      ...(formData.isRecurring && {
        recurring: {
          frequency: formData.recurringFrequency,
          endDate: parseISO(formData.recurringEndDate),
        },
      }),
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label
          htmlFor="title"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Title
        </Label>
        <Input
          id="title"
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <Label
          htmlFor="facility"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Facility
        </Label>
        <Select
          value={formData.facility}
          onValueChange={(value) =>
            setFormData({ ...formData, facility: value })
          }
        >
          <SelectTrigger id="facility">
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
          <Label
            htmlFor="startTime"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Start Time
          </Label>
          <Input
            id="startTime"
            type="time"
            required
            value={formData.startTime}
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
          />
        </div>
        <div>
          <Label
            htmlFor="endTime"
            className="block text-sm font-medium text-foreground mb-1"
          >
            End Time
          </Label>
          <Input
            id="endTime"
            type="time"
            required
            value={formData.endTime}
            onChange={(e) =>
              setFormData({ ...formData, endTime: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="type"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Type
        </Label>
        <Select
          value={formData.type}
          onValueChange={(value) =>
            setFormData({ ...formData, type: value as Booking["type"] })
          }
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select booking type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="booking">Booking</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="event">Event</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          htmlFor="description"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Description
        </Label>
        <Input
          id="description"
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div>
        <Label
          htmlFor="attendees"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Attendees
        </Label>
        <Input
          id="attendees"
          type="number"
          value={formData.attendees}
          onChange={(e) =>
            setFormData({ ...formData, attendees: e.target.value })
          }
        />
      </div>

      <div>
        <Label
          htmlFor="instructor"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Instructor
        </Label>
        <Input
          id="instructor"
          type="text"
          value={formData.instructor}
          onChange={(e) =>
            setFormData({ ...formData, instructor: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{editingBooking ? "Update" : "Book"}</Button>
      </div>
    </form>
  )
}