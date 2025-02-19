import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, BookOpen, Users, Clock, Tool } from 'lucide-react';
import { Booking } from './types';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onPreviousDay: () => void;
  onNextDay: () => void;
  filteredBookings: Booking[];
  onNewBooking: () => void;
}

export function CalendarHeader({
  currentDate,
  onPrevious,
  onNext,
  onToday,
  onPreviousDay,
  onNextDay,
  filteredBookings,
  onNewBooking
}: CalendarHeaderProps) {
  return (
    <div className="p-4 border-b flex">
      {/* Calendar Widget */}
      <div className="flex-shrink-0 mr-6">
        <div className="w-[280px] border rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" size="icon" onClick={onPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">
              {format(currentDate, "MMMM yyyy")}
            </span>
            <Button variant="ghost" size="icon" onClick={onNext}>
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
                className={`p-0 h-8 w-8 ${
                  index === 0 ? `col-start-${day.getDay() + 1}` : ""
                }`}
                onClick={() => {/* Handle day selection */}}
              >
                {format(day, "d")}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats and Controls */}
      <div className="flex-grow grid grid-cols-2 gap-2 content-start">
        <div className="col-span-2 flex justify-between items-center mb-2">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onToday}>
              Today
            </Button>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={onPreviousDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <span className="mx-4 font-medium">
                {format(currentDate, "MMMM d, yyyy")}
              </span>
            </div>
          </div>
          <Button onClick={onNewBooking}>
            New Booking
          </Button>
        </div>

        {/* Stats Cards */}
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
              {filteredBookings.filter(
                (booking) =>
                  booking.type === "event" &&
                  isSameDay(booking.start, new Date())
              ).length}
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
              {filteredBookings.filter(
                (booking) => booking.type === "maintenance"
              ).length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}