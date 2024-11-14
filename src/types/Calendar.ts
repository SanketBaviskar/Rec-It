export interface Booking {
    id: string;
    title: string;
    start: Date;
    end: Date;
    facility: string;
    type: 'class' | 'booking' | 'maintenance' | 'event';
    status: 'confirmed' | 'pending' | 'cancelled';
    description?: string;
    attendees?: number;
    instructor?: string;
    color?: string;
    recurring?: {
      frequency: 'daily' | 'weekly' | 'monthly';
      endDate: Date;
    };
  }
  
  export interface Facility {
    id: string;
    name: string;
    type: 'room' | 'court' | 'pool' | 'gym' | 'studio' | 'outdoor';
    capacity: number;
    available: boolean;
    location: string;
    equipment?: string[];
    rules?: string[];
    maintenanceSchedule?: {
      day: string;
      time: string;
    }[];
  }
  
  export type CalendarView = 'day' | 'week' | 'month' | 'agenda';
  
  export interface TimeSlot {
    start: Date;
    end: Date;
    isAvailable: boolean;
  }