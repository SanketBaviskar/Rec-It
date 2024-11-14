import React, { useState } from 'react';
import { addDays, subDays } from 'date-fns';
import { CalendarHeader } from '../../../../components/CalendarHeader/CalendarHeader';
import { TimeGrid } from '../../../../components/TimeGrid/TimeGrid';
import { WeekView } from '../../../../components/WeekView/WeekView';
import { BookingModal } from '../../../../components/BookingForm/BookingForm';
import { FacilityList } from '../../../../components/FacilityList/FacilityList';
import { QuickBookingPanel } from '../../../../components/QuickBookingPanel/QuickBookingPanel';
import { DailyStats } from '../../../../components/DailyStats/DailyStats';
import { UpcomingEvents } from '../../../../components/UpcomingEvents/UpcomingEvents';
import type { Booking, Facility, CalendarView } from '../../../../types/Calendar';

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
];

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('day');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedFacility, setSelectedFacility] = useState<string>();

  const handlePrevious = () => {
    setCurrentDate(prev => view === 'week' ? subDays(prev, 7) : subDays(prev, 1));
  };

  const handleNext = () => {
    setCurrentDate(prev => view === 'week' ? addDays(prev, 7) : addDays(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleSlotClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleBook = (bookingData: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      ...bookingData,
    };
    setBookings([...bookings, newBooking]);
  };

  const handleQuickBook = ({
    facility,
    duration,
    type,
    attendees,
  }: {
    facility: string;
    duration: number;
    type: 'booking';
    attendees?: number;
  }) => {
    const start = new Date();
    const end = new Date(start.getTime() + duration * 60000);

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      title: `Quick ${duration}min Booking`,
      facility,
      start,
      end,
      type,
      status: 'confirmed',
      attendees,
    };

    setBookings([...bookings, newBooking]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <FacilityList
        facilities={sampleFacilities}
        onSelect={setSelectedFacility}
        selectedFacility={selectedFacility}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden p-4 space-y-4">
        <CalendarHeader
          currentDate={currentDate}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          view={view}
          onViewChange={setView}
        />

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 space-y-4">
            <DailyStats bookings={bookings} date={currentDate} />
            
            <div className="bg-white rounded-lg shadow">
              {view === 'day' ? (
                <TimeGrid
                  bookings={bookings}
                  date={currentDate}
                  onSlotClick={handleSlotClick}
                />
              ) : (
                <WeekView
                  currentDate={currentDate}
                  bookings={bookings}
                  onSlotClick={handleSlotClick}
                />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <QuickBookingPanel
              facilities={sampleFacilities}
              onQuickBook={handleQuickBook}
            />
            <UpcomingEvents bookings={bookings} date={currentDate} />
          </div>
        </div>

        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          facilities={sampleFacilities}
          onBook={handleBook}
        />
      </div>
    </div>
  );
}

export default App;