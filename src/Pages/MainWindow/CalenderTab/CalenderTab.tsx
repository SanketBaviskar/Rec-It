"use client";

import * as React from "react";
import { useState, useRef } from "react";
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
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Trash2,
  BookOpen,
  Users,
  Clock,
  PenToolIcon as Tool,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [selectedFacility, setSelectedFacility] = useState<string>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingDate, setSelectedBookingDate] = useState(new Date());
  const [draggedBooking, setDraggedBooking] = useState<Booking | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    setCurrentDate((prev) => {
      switch (view) {
        case "day":
          return subDays(prev, 1);
        case "week":
          return subDays(prev, 7);
        case "month":
          return subDays(prev, 30);
        default:
          return prev;
      }
    });
  };

  const handleNext = () => {
    setCurrentDate((prev) => {
      switch (view) {
        case "day":
          return addDays(prev, 1);
        case "week":
          return addDays(prev, 7);
        case "month":
          return addDays(prev, 30);
        default:
          return prev;
      }
    });
  };

  const handleBook = (booking: Booking) => {
    setBookings((prev) => [
      ...prev,
      { ...booking, id: Date.now().toString(), createdAt: new Date() },
    ]);
    setIsBookingModalOpen(false);
  };

  const openBookingModal = (date: Date, hour?: number, minute?: number) => {
    const selectedDate = new Date(date);
    if (hour !== undefined) {
      selectedDate.setHours(hour, minute || 0, 0, 0);
    }
    setSelectedBookingDate(selectedDate);
    setIsBookingModalOpen(true);
  };

  const groupOverlappingEvents = (events: Booking[]) => {
    const sortedEvents = events.sort(
      (a, b) => a.start.getTime() - b.start.getTime()
    );
    const groups: Booking[][] = [];

    for (const event of sortedEvents) {
      let added = false;
      for (const group of groups) {
        if (
          !group.some(
            (groupEvent) =>
              event.start < groupEvent.end && event.end > groupEvent.start
          )
        ) {
          group.push(event);
          added = true;
          break;
        }
      }
      if (!added) {
        groups.push([event]);
      }
    }

    return groups;
  };

  const renderBooking = (
    booking: Booking,
    dayStart: Date,
    totalWidth: number,
    groupIndex: number,
    totalGroups: number
  ) => {
    const facility = sampleFacilities.find((f) => f.id === booking.facility);
    const startMinutes = differenceInMinutes(booking.start, dayStart);
    const duration = differenceInMinutes(booking.end, booking.start);
    const width = totalWidth / totalGroups - 4;
    const left = 60 + groupIndex * (width + 4);

    return (
      <div
        key={booking.id}
        className="absolute rounded-md overflow-hidden cursor-move"
        style={{
          top: `${startMinutes}px`,
          height: `${duration}px`,
          left: `${left}px`,
          width: `${width}px`,
          backgroundColor: facility?.color || "#999",
        }}
        draggable
        onDragStart={(e) => handleDragStart(e, booking)}
        onDragEnd={handleDragEnd}
      >
        <div className="p-2 h-full flex flex-col justify-between">
          <div>
            <div className="font-bold text-white truncate">{booking.title}</div>
            <div className="text-white text-xs truncate">{facility?.name}</div>
          </div>
          <div className="text-white text-xs">
            {format(booking.start, "HH:mm")} - {format(booking.end, "HH:mm")}
          </div>
        </div>
        <button
          className="absolute top-1 right-1 text-white hover:text-red-500 transition-colors"
          onClick={() => handleDeleteBooking(booking.id)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    );
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== bookingId)
    );
  };

  const handleCalendarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const clickedMinute = Math.floor(y);
      const clickedHour = Math.floor(clickedMinute / 60);
      const clickedMinuteWithinHour = clickedMinute % 60;

      const newBookingDate = new Date(currentDate);
      setHours(newBookingDate, clickedHour);
      setMinutes(newBookingDate, clickedMinuteWithinHour);

      openBookingModal(newBookingDate);
    }
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
      : 200; // 60px for time labels

    const dayEvents = bookings.filter((booking) =>
      isSameDay(booking.start, currentDate)
    );
    const eventGroups = groupOverlappingEvents(dayEvents);

    return (
      <div
        className="relative"
        style={{ height: "1440px" }}
        onClick={handleCalendarClick}
      >
        {" "}
        {/* 24 hours * 60 minutes */}
        {intervals.map((interval, index) => (
          <div
            key={index}
            className="flex items-center border-t border-gray-200 dark:border-gray-700"
            style={{ height: "60px" }}
          >
            <div className="w-14 pr-2 text-right text-sm text-gray-500 dark:text-gray-400">
              {format(interval, "HH:mm")}
            </div>
            <div
              className="flex-1 h-full"
              onDragOver={handleDragOver}
              onDrop={(e) =>
                handleDrop(
                  e,
                  currentDate,
                  interval.getHours(),
                  interval.getMinutes()
                )
              }
            ></div>
          </div>
        ))}
        {eventGroups.map((group, groupIndex) =>
          group.map((booking, bookingIndex) =>
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

  const handleDragStart = (e: React.DragEvent, booking: Booking) => {
    setDraggedBooking(booking);
    if (e.dataTransfer) {
      e.dataTransfer.setData("text/plain", booking.id);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent,
    day: Date,
    hour: number,
    minute: number
  ) => {
    e.preventDefault();
    if (draggedBooking) {
      const newStart = new Date(day);
      newStart.setHours(hour, minute, 0, 0);
      const duration = differenceInMinutes(
        draggedBooking.end,
        draggedBooking.start
      );
      const newEnd = addMinutes(newStart, duration);

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === draggedBooking.id
            ? { ...booking, start: newStart, end: newEnd }
            : booking
        )
      );
    }
    setDraggedBooking(null);
  };

  const handleDragEnd = () => {
    setDraggedBooking(null);
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    const twoHoursLater = addMinutes(now, 120);
    return bookings
      .filter(
        (booking) => booking.start >= now && booking.start <= twoHoursLater
      )
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  };

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
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{facility.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {facility.type} • {facility.capacity} capacity
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
      <div className="flex-1 flex flex-col">
        {/* Header with Calendar and Stats */}
        <div className="p-4 border-b flex">
          <div className="flex-shrink-0 mr-4">
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(date) => date && setCurrentDate(date)}
              className="rounded-md border"
            />
          </div>
          <div className="flex-grow grid grid-cols-2 gap-4 content-start">
            <div className="col-span-2 flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" onClick={handlePrevious}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleNext}>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Bookings
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookings.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Attendees
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {bookings.reduce(
                    (sum, booking) => sum + (booking.attendees || 0),
                    0
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Classes Today
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    bookings.filter(
                      (booking) =>
                        booking.type === "event" &&
                        booking.start.toDateString() ===
                          new Date().toDateString()
                    ).length
                  }
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Maintenance
                </CardTitle>
                <Tool className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    bookings.filter((booking) => booking.type === "maintenance")
                      .length
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* View Tabs */}
        <div className="flex justify-center my-4">
          <div className="inline-flex space-x-1 bg-muted p-1 rounded-md">
            <button
              onClick={() => setView("day")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                view === "day"
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:bg-background/50"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                view === "week"
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:bg-background/50"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView("month")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                view === "month"
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
      <div className="w-64 border-l p-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Book</CardTitle>
          </CardHeader>
          <CardContent>
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
                    setIsBookingModalOpen(true);
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
  );
}

function BookingForm({
  selectedDate,
  facilities,
  onBook,
  onClose,
}: {
  selectedDate: Date;
  facilities: Facility[];
  onBook: (booking: Booking) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    facility: "",
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [startHours, startMinutes] = formData.startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes] = formData.endTime.split(":").map(Number);

    const start = new Date(selectedDate);
    start.setHours(startHours, startMinutes, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(endHours, endMinutes, 0, 0);

    onBook({
      id: "", // This will be set in the parent component
      title: formData.title,
      facility: formData.facility,
      start,
      end,
      type: formData.type,
      status: formData.status,
      description: formData.description,
      attendees: formData.attendees ? parseInt(formData.attendees) : undefined,
      instructor: formData.instructor || undefined,
      createdAt: new Date(),
      ...(formData.isRecurring && {
        recurring: {
          frequency: formData.recurringFrequency,
          endDate: new Date(formData.recurringEndDate),
        },
      }),
    });
    onClose();
  };

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

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isRecurring"
          checked={formData.isRecurring}
          onChange={(e) =>
            setFormData({ ...formData, isRecurring: e.target.checked })
          }
        />
        <Label
          htmlFor="isRecurring"
          className="text-sm font-medium text-foreground"
        >
          Recurring Booking
        </Label>
      </div>

      {formData.isRecurring && (
        <>
          <div>
            <Label
              htmlFor="recurringFrequency"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Recurring Frequency
            </Label>
            <Select
              value={formData.recurringFrequency}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  recurringFrequency: value as "daily" | "weekly" | "monthly",
                })
              }
            >
              <SelectTrigger id="recurringFrequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="recurringEndDate"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Recurring End Date
            </Label>
            <Input
              id="recurringEndDate"
              type="date"
              value={formData.recurringEndDate}
              onChange={(e) =>
                setFormData({ ...formData, recurringEndDate: e.target.value })
              }
            />
          </div>
        </>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Book</Button>
      </div>
    </form>
  );
}
