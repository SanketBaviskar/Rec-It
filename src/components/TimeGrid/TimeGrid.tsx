import React from 'react';
import { format, addHours, startOfDay } from 'date-fns';
import type { Booking } from '../../types/Calendar';

interface TimeGridProps {
  bookings: Booking[];
  date: Date;
  onSlotClick: (time: Date) => void;
}

export const TimeGrid: React.FC<TimeGridProps> = ({ bookings, date, onSlotClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => addHours(startOfDay(date), i));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="min-w-full divide-y divide-gray-200">
        {hours.map((hour) => (
          <div
            key={hour.toISOString()}
            className="group relative min-h-[60px] hover:bg-gray-50"
            onClick={() => onSlotClick(hour)}
          >
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              {format(hour, 'HH:mm')}
            </div>
            <div className="relative">
              {bookings
                .filter(
                  (booking) =>
                    booking.start.getHours() === hour.getHours() &&
                    booking.start.getDate() === date.getDate()
                )
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="absolute inset-x-0 mx-2 rounded-lg bg-blue-100 p-2"
                    style={{
                      top: '0',
                      height: `${
                        ((booking.end.getTime() - booking.start.getTime()) /
                          (1000 * 60 * 60)) *
                        60
                      }px`,
                    }}
                  >
                    <div className="flex flex-col h-full rounded-lg border-2 border-blue-200 p-1">
                      <p className="text-sm font-semibold text-blue-700">
                        {booking.title}
                      </p>
                      <p className="text-xs text-blue-600">{booking.facility}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};