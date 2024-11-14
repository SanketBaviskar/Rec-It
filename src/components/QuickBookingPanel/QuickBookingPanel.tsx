import React from 'react';
import { Clock, Users, Repeat } from 'lucide-react';
import type { Facility } from '../../types/Calendar';

interface QuickBookingProps {
  facilities: Facility[];
  onQuickBook: (booking: {
    facility: string;
    duration: number;
    type: 'booking';
    attendees?: number;
  }) => void;
}

export const QuickBookingPanel: React.FC<QuickBookingProps> = ({
  facilities,
  onQuickBook,
}) => {
  const commonDurations = [30, 60, 90, 120];
  // const frequentFacilities = facilities.filter(f => f.available);
  const studyRooms = [
    { id: 'room1', name: 'Study Room 1', capacity: 10, available: 2 },
    { id: 'room2', name: 'Study Room 2', capacity: 10, available: 4 },
    { id: 'room3', name: 'Study Room 3', capacity: 10, available: 7 },
    { id: 'room4', name: 'Study Room 4', capacity: 10, available: 10 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-500" />
        Quick Book
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {studyRooms.slice(0, 4).map((facility) => (
          <div key={facility.id} className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">{facility.name}</h4>
            <span className="text-xs text-gray-500">
                ({facility.available}/{facility.capacity} seats)
              </span>
            <div className="flex flex-wrap gap-1">
              {commonDurations.map((duration) => (
                <button
                  key={`${facility.id}-${duration}`}
                  onClick={() => onQuickBook({
                    facility: facility.id,
                    duration,
                    type: 'booking'
                  })}
                  className="px-2 py-1 text-xs font-medium rounded-full
                    bg-blue-50 text-blue-700 hover:bg-blue-100
                    border border-blue-200 transition-colors"
                >
                  {duration}m
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

