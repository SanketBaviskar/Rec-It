import React, { useState } from 'react';
import { format } from 'date-fns';
import { X, Calendar, Clock, Users, Info } from 'lucide-react';
import type { Facility } from '../../types/Calendar';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  facilities: Facility[];
  onBook: (booking: {
    title: string;
    facility: string;
    start: Date;
    end: Date;
    type: 'class' | 'booking' | 'maintenance' | 'event';
    status: 'confirmed' | 'pending' | 'cancelled';
    description?: string;
    attendees?: number;
    instructor?: string;
    recurring?: {
      frequency: 'daily' | 'weekly' | 'monthly';
      endDate: Date;
    };
  }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  facilities,
  onBook,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    facility: '',
    startTime: format(selectedDate, 'HH:mm'),
    endTime: format(new Date(selectedDate.getTime() + 3600000), 'HH:mm'),
    type: 'booking' as 'class' | 'booking' | 'maintenance' | 'event',
    status: 'pending' as 'confirmed' | 'pending' | 'cancelled',
    description: '',
    attendees: '',
    instructor: '',
    isRecurring: false,
    recurringFrequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
    recurringEndDate: format(new Date(selectedDate.getTime() + 7776000000), 'yyyy-MM-dd'), // 90 days ahead
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [startHours, startMinutes] = formData.startTime.split(':').map(Number);
    const [endHours, endMinutes] = formData.endTime.split(':').map(Number);

    const start = new Date(selectedDate);
    start.setHours(startHours, startMinutes);

    const end = new Date(selectedDate);
    end.setHours(endHours, endMinutes);

    onBook({
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
    });
    onClose();
  };

  const selectedFacility = facilities.find((f) => f.id === formData.facility);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Booking</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Facility
            </label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.facility}
              onChange={(e) =>
                setFormData({ ...formData, facility: e.target.value })
              }
            >
              <option value="">Select a facility</option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          {selectedFacility && (
            <div className="bg-blue-50 p-3 rounded-md">
              <h4 className="font-medium text-blue-900 mb-2">
                Facility Information
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>Location: {selectedFacility.location}</li>
                <li>Capacity: {selectedFacility.capacity} people</li>
                {selectedFacility.equipment && (
                  <li>
                    Equipment: {selectedFacility.equipment.join(', ')}
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-8"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                />
                <Clock className="absolute left-2 top-[0.95rem] h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-8"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                />
                <Clock className="absolute left-2 top-[0.95rem] h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as 'booking' | 'class' | 'maintenance' | 'event',
                })
              }
            >
              <option value="booking">Booking</option>
              <option value="class">Class</option>
              <option value="maintenance">Maintenance</option>
              <option value="event">Event</option>
            </select>
          </div>

          {formData.type === 'class' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instructor
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.instructor}
                onChange={(e) =>
                  setFormData({ ...formData, instructor: e.target.value })
                }
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expected Attendees
            </label>
            <div className="relative">
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-8"
                value={formData.attendees}
                onChange={(e) =>
                  setFormData({ ...formData, attendees: e.target.value })
                }
              />
              <Users className="absolute left-2 top-[0.95rem] h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};