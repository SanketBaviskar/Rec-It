export type Facility = {
    id: string;
    name: string;
    type: string;
    capacity: number;
    available: boolean;
    location: string;
    equipment: string[];
    color: string;
  };
  
  export type Booking = {
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