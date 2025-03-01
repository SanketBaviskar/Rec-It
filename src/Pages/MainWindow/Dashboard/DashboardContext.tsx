
import React, { createContext, useContext, useEffect } from 'react';
import { 
  DashboardContextValue, 
  Person
} from './types/dashboard';
import { 
  generateMockPeople, 
  generateMockGates, 
  generateMockEvents, 
  generateMockOccupancyStats, 
  generateMockAlerts 
} from './utils/mockDataGenerators';
import { useWidgetActions } from './hooks/useWidgetActions';
import { useAlertActions } from './hooks/useAlertActions';
import { useOccupancyStats } from './hooks/useOccupancyStats';
import { useGateActions } from './hooks/useGateActions';
import { usePersonActions } from './hooks/usePersonActions';
import { useState } from 'react';

// Create the context
const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

// Provider component
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get alert actions
  console.log("DashboardProvider");
  const { alerts, setAlerts, markAlertAsRead, removeAlert, createAlert } = useAlertActions();
  
  // Get occupancy stats actions
  const { occupancyStats, setOccupancyStats, updateOccupancyStats, checkOccupancyThresholds } = useOccupancyStats(createAlert);
  
  // Get gate actions
  const { gates, setGates, toggleGate } = useGateActions(createAlert);
  
  // Get widget actions
  const { widgets, availableWidgets, addWidget, removeWidget, toggleWidgetVisibility, updateWidgetPosition } = useWidgetActions();
  
  // Entry events state
  const [entryEvents, setEntryEvents] = useState([]);
  
  // Get person actions
  const { people, setPeople, addPerson, removePerson, updatePersonStatus } = usePersonActions(
    gates, 
    setEntryEvents,
    updateOccupancyStats
  );

  // Initialize with mock data
  useEffect(() => {
    const mockPeople = generateMockPeople();
    const mockGates = generateMockGates();
    const mockEvents = generateMockEvents(mockPeople, mockGates);
    const mockOccupancyStats = generateMockOccupancyStats();
    const mockAlerts = generateMockAlerts();
    
    setPeople(mockPeople);
    setGates(mockGates);
    setEntryEvents(mockEvents);
    setOccupancyStats(mockOccupancyStats);
    setAlerts(mockAlerts);
  }, []);

  // If occupancy is above certain threshold, create alert
  useEffect(() => {
    checkOccupancyThresholds();
  }, [occupancyStats.current]);

  // Simulate random entries and exits
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAction = Math.random();
      
      if (randomAction < 0.3 && people.filter(p => p.status === 'active').length > 0) {
        // Random exit
        const activePeople = people.filter(p => p.status === 'active');
        if (activePeople.length > 0) {
          const randomPersonIndex = Math.floor(Math.random() * activePeople.length);
          const personToExit = activePeople[randomPersonIndex];
          
          updatePersonStatus(personToExit.id, 'inactive', new Date());
        }
      } else if (randomAction >= 0.3 && randomAction < 0.6) {
        // Random entry
        const names = [
          "John Smith", "Emma Johnson", "Michael Brown", "Olivia Davis", 
          "James Wilson", "Sophia Martinez", "William Anderson", "Isabella Taylor", 
          "Benjamin Thomas", "Ava Garcia", "Alexander Rodriguez", "Mia Lee"
        ];
        const types: Person['type'][] = ['employee', 'visitor', 'contractor'];
        
        const newPerson: Omit<Person, 'id'> = {
          name: names[Math.floor(Math.random() * names.length)],
          type: types[Math.floor(Math.random() * types.length)],
          entryTime: new Date(),
          status: 'active',
        };
        
        addPerson(newPerson);
      }
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [people]);

  const value: DashboardContextValue = {
    widgets,
    availableWidgets,
    addWidget,
    removeWidget,
    toggleWidgetVisibility,
    updateWidgetPosition,
    people,
    addPerson,
    removePerson,
    updatePersonStatus,
    gates,
    toggleGate,
    occupancyStats,
    entryEvents,
    alerts,
    markAlertAsRead,
    removeAlert,
    createAlert,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

// Custom hook to use the dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  console.log("useDashboard");
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
