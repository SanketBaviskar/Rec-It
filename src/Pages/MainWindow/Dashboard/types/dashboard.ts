
// Define our widget types
export type WidgetType = 
  | 'occupancy-counter' 
  | 'gate-controls' 
  | 'visitor-list' 
  | 'entry-history' 
  | 'occupancy-chart'
  | 'alerts'
  | 'clock';

// Interface for widget positions and visibility
export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  visible: boolean;
  gridArea?: string;
  w?: number;
  h?: number;
  x?: number;
  y?: number;
}

// Interface for person/visitor
export interface Person {
  id: string;
  name: string;
  type: 'visitor' | 'employee' | 'contractor';
  entryTime: Date;
  exitTime?: Date;
  status: 'active' | 'inactive';
  avatar?: string;
}

// Interface for gates
export interface Gate {
  id: string;
  name: string;
  status: 'open' | 'closed';
  lastStatusChange: Date;
  isAutomatic: boolean;
}

// Interface for entry/exit events
export interface EntryEvent {
  id: string;
  personId: string;
  personName: string;
  type: 'entry' | 'exit';
  gateId: string;
  gateName: string;
  timestamp: Date;
}

// Interface for occupancy statistics
export interface OccupancyStats {
  current: number;
  max: number;
  average: number;
  today: number[];
  history: {
    date: string;
    value: number;
  }[];
}

// Interface for alerts
export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  read: boolean;
}

// Dashboard context interface
export interface DashboardContextValue {
  widgets: Widget[];
  availableWidgets: Widget[];
  addWidget: (type: WidgetType) => void;
  removeWidget: (id: string) => void;
  toggleWidgetVisibility: (id: string) => void;
  updateWidgetPosition: (id: string, position: { x?: number, y?: number, w?: number, h?: number }) => void;
  people: Person[];
  addPerson: (person: Omit<Person, 'id'>) => void;
  removePerson: (id: string) => void;
  updatePersonStatus: (id: string, status: Person['status'], exitTime?: Date) => void;
  gates: Gate[];
  toggleGate: (id: string) => void;
  occupancyStats: OccupancyStats;
  entryEvents: EntryEvent[];
  alerts: Alert[];
  markAlertAsRead: (id: string) => void;
  removeAlert: (id: string) => void;
  createAlert: (type: Alert['type'], message: string) => void;
}
