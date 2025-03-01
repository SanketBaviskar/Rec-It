
import { Person, Gate, EntryEvent, OccupancyStats, Alert, Widget } from '@/types/dashboard';

// Define available widgets
export const defaultAvailableWidgets: Widget[] = [
  { id: 'occupancy-counter', type: 'occupancy-counter', title: 'Occupancy Counter', visible: true },
  { id: 'gate-controls', type: 'gate-controls', title: 'Gate Controls', visible: true },
  { id: 'visitor-list', type: 'visitor-list', title: 'Visitor List', visible: true },
  { id: 'entry-history', type: 'entry-history', title: 'Entry History', visible: true },
  { id: 'occupancy-chart', type: 'occupancy-chart', title: 'Occupancy Chart', visible: true },
  { id: 'alerts', type: 'alerts', title: 'Alerts', visible: true },
  { id: 'clock', type: 'clock', title: 'Clock', visible: true },
];

// Default widgets to show
export const defaultWidgets: Widget[] = [
  { 
    id: 'widget-occupancy-counter',
    type: 'occupancy-counter', 
    title: 'Occupancy Counter', 
    visible: true, 
    x: 0, 
    y: 0, 
    w: 1, 
    h: 1 
  },
  { 
    id: 'widget-gate-controls', 
    type: 'gate-controls', 
    title: 'Gate Controls', 
    visible: true, 
    x: 1, 
    y: 0, 
    w: 1, 
    h: 1 
  },
  { 
    id: 'widget-visitor-list', 
    type: 'visitor-list', 
    title: 'Visitor List', 
    visible: true, 
    x: 0, 
    y: 1, 
    w: 2, 
    h: 1 
  },
  { 
    id: 'widget-occupancy-chart', 
    type: 'occupancy-chart', 
    title: 'Occupancy Chart', 
    visible: true, 
    x: 0, 
    y: 2, 
    w: 2, 
    h: 1 
  },
];

// Mock data generators
export const generateMockPeople = (): Person[] => {
  const names = [
    "John Smith", "Emma Johnson", "Michael Brown", "Olivia Davis", 
    "James Wilson", "Sophia Martinez", "William Anderson", "Isabella Taylor", 
    "Benjamin Thomas", "Ava Garcia", "Alexander Rodriguez", "Mia Lee"
  ];
  
  const types: Person['type'][] = ['employee', 'visitor', 'contractor'];
  
  // Return 5-10 random people
  return Array.from({ length: Math.floor(Math.random() * 5) + 5 }, (_, i) => {
    const entryTime = new Date();
    entryTime.setMinutes(entryTime.getMinutes() - Math.floor(Math.random() * 180));
    
    return {
      id: `person-${i + 1}`,
      name: names[Math.floor(Math.random() * names.length)],
      type: types[Math.floor(Math.random() * types.length)],
      entryTime,
      status: Math.random() > 0.3 ? 'active' : 'inactive',
      exitTime: Math.random() > 0.7 ? new Date() : undefined,
    };
  });
};

export const generateMockGates = (): Gate[] => {
  return Array.from({ length: 3 }, (_, i) => {
    const lastStatusChange = new Date();
    lastStatusChange.setMinutes(lastStatusChange.getMinutes() - Math.floor(Math.random() * 60));
    
    return {
      id: `gate-${i + 1}`,
      name: `Gate ${i + 1}`,
      status: Math.random() > 0.5 ? 'open' : 'closed',
      lastStatusChange,
      isAutomatic: i === 0 ? true : false, // First gate is automatic
    };
  });
};

export const generateMockEvents = (people: Person[], gates: Gate[]): EntryEvent[] => {
  const events: EntryEvent[] = [];
  
  // Create entry events for all people
  people.forEach(person => {
    const gate = gates[Math.floor(Math.random() * gates.length)];
    
    events.push({
      id: `entry-${person.id}`,
      personId: person.id,
      personName: person.name,
      type: 'entry',
      gateId: gate.id,
      gateName: gate.name,
      timestamp: person.entryTime,
    });
    
    // Add exit events for those who have exited
    if (person.exitTime) {
      events.push({
        id: `exit-${person.id}`,
        personId: person.id,
        personName: person.name,
        type: 'exit',
        gateId: gate.id,
        gateName: gate.name,
        timestamp: person.exitTime,
      });
    }
  });
  
  // Sort by timestamp
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const generateMockOccupancyStats = (): OccupancyStats => {
  const current = Math.floor(Math.random() * 50) + 30;
  
  // Generate today's hourly data (24 hours)
  const today = Array.from({ length: 24 }, () => Math.floor(Math.random() * 50) + 10);
  
  // Generate last 7 days history
  const history = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    return {
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 100) + 50,
    };
  }).reverse();
  
  return {
    current,
    max: 150,
    average: 75,
    today,
    history,
  };
};

export const generateMockAlerts = (): Alert[] => {
  const alertMessages = [
    { type: 'info', message: 'System maintenance scheduled for tonight at 02:00 AM' },
    { type: 'warning', message: 'Gate 2 has been open for over 15 minutes' },
    { type: 'error', message: 'Occupancy nearing maximum capacity (95%)' },
    { type: 'info', message: 'New visitor policy in effect starting tomorrow' },
    { type: 'warning', message: 'Unregistered visitor attempted entry at Gate 1' },
  ];
  
  return alertMessages.slice(0, 3).map((alert, i) => {
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 60));
    
    return {
      id: `alert-${i + 1}`,
      type: alert.type as Alert['type'],
      message: alert.message,
      timestamp,
      read: false,
    };
  });
};
