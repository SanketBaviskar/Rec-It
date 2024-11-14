import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import type { Booking } from '../../types/Calendar';

interface WeekViewProps {
  currentDate: Date;
  bookings: Booking[];
  onSlotClick: (date: Date) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  bookings,
  onSlotClick,
}) => {
  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="flex-1 overflow-auto">
      <div className="grid grid-cols-7 border-b">
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className="p-2 text-center border-r last:border-r-0"
          >
            <div className="text-sm font-medium text-gray-900">
              {format(day, 'EEE')}
            </div>
            <div className="text-sm text-gray-500">{format(day, 'd')}</div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 divide-x h-full min-h-[600px]">
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="relative">
            {bookings
              .filter(
                (booking) =>
                  booking.start.getDate() === day.getDate() &&
                  booking.start.getMonth() === day.getMonth()
              )
              .map((booking) => (
                <div
                  key={booking.id}
                  className={`absolute left-1 right-1 rounded-md p-1 text-xs ${
                    booking.type === 'class'
                      ? 'bg-blue-100 text-blue-800'
                      : booking.type === 'maintenance'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                  style={{
                    top: `${(booking.start.getHours() * 60 +
                      booking.start.getMinutes()) /
                      2}px`,
                    height: `${
                      ((booking.end.getTime() - booking.start.getTime()) /
                        (1000 * 60)) /
                      2
                    }px`,
                  }}
                >
                  <div className="font-semibold truncate">{booking.title}</div>
                  <div className="truncate">{booking.facility}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};