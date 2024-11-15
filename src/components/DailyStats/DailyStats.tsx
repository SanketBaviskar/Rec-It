import React from 'react';
import { Users, Calendar, Clock, AlertCircle } from 'lucide-react';
import type { Booking } from '../../types/Calendar';

interface DailyStatsProps {
  bookings: Booking[];
  date: Date;
}

export const DailyStats: React.FC<DailyStatsProps> = ({ bookings, date }) => {
  const todayBookings = bookings.filter(
    booking => booking.start.toDateString() === date.toDateString()
  );

  const stats = {
    totalBookings: todayBookings.length,
    totalAttendees: todayBookings.reduce((sum, booking) => sum + (booking.attendees || 0), 0),
    upcomingMaintenance: todayBookings.filter(b => b.type === 'maintenance').length,
    classes: todayBookings.filter(b => b.type === 'class').length
  };

  return (
    <div className="grid grid-cols-4 gap-1.5">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <Calendar className="w-5 h-5" />
          <h3 className="font-medium">Total Bookings</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <Users className="w-5 h-5" />
          <h3 className="font-medium">Total Attendees</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.totalAttendees}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
          <Clock className="w-5 h-5" />
          <h3 className="font-medium">Classes Today</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.classes}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 text-amber-600 mb-2">
          <AlertCircle className="w-5 h-5" />
          <h3 className="font-medium">Maintenance</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.upcomingMaintenance}</p>
      </div>
    </div>
  );
};