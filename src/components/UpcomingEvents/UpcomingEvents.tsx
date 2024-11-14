import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import type { Booking } from '../../types/Calendar';

interface UpcomingEventsProps {
  bookings: Booking[];
  date: Date;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ bookings, date }) => {
  const upcomingBookings = bookings
    .filter(booking => booking.start >= date)
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-500" />
        Upcoming Events
      </h3>

      <div className="space-y-3">
        {upcomingBookings.map((booking) => (
          <div
            key={booking.id}
            className={`p-3 rounded-lg border ${
              booking.type === 'class'
                ? 'border-blue-200 bg-blue-50'
                : booking.type === 'maintenance'
                ? 'border-red-200 bg-red-50'
                : 'border-green-200 bg-green-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{booking.title}</h4>
                <p className="text-sm text-gray-600">{booking.facility}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {format(booking.start, 'HH:mm')}
                </div>
                <p className="text-xs text-gray-500">
                  {format(booking.start, 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            {booking.attendees && (
              <div className="mt-2 text-sm text-gray-600">
                {booking.attendees} attendees
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};