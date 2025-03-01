
import { useState } from 'react';
import { Person, EntryEvent, Gate } from '../types/dashboard';
import { toast } from "@/components/ui/sonner";

export const usePersonActions = (
  gates: Gate[], 
  setEntryEvents: React.Dispatch<React.SetStateAction<EntryEvent[]>>,
  updateOccupancyStats: (change: number) => void
) => {
  const [people, setPeople] = useState<Person[]>([]);

  // Method to add a person
  const addPerson = (person: Omit<Person, 'id'>) => {
    const newPerson: Person = {
      ...person,
      id: `person-${Date.now()}`,
    };
    
    setPeople(prev => [...prev, newPerson]);
    
    // Create entry event
    const gate = gates[Math.floor(Math.random() * gates.length)];
    const newEvent: EntryEvent = {
      id: `entry-${newPerson.id}`,
      personId: newPerson.id,
      personName: newPerson.name,
      type: 'entry',
      gateId: gate.id,
      gateName: gate.name,
      timestamp: newPerson.entryTime,
    };
    
    setEntryEvents(prev => [newEvent, ...prev]);
    
    // Update occupancy stats
    updateOccupancyStats(1);
    
    toast.success(`${newPerson.name} has entered the building`);
  };

  // Method to remove a person
  const removePerson = (id: string) => {
    const personToRemove = people.find(p => p.id === id);
    if (!personToRemove) return;
    
    setPeople(prev => prev.filter(p => p.id !== id));
    
    // Create exit event if person was active
    if (personToRemove.status === 'active') {
      const gate = gates[Math.floor(Math.random() * gates.length)];
      const newEvent: EntryEvent = {
        id: `exit-${personToRemove.id}`,
        personId: personToRemove.id,
        personName: personToRemove.name,
        type: 'exit',
        gateId: gate.id,
        gateName: gate.name,
        timestamp: new Date(),
      };
      
      setEntryEvents(prev => [newEvent, ...prev]);
      
      // Update occupancy stats
      updateOccupancyStats(-1);
    }
  };

  // Method to update person status
  const updatePersonStatus = (id: string, status: Person['status'], exitTime?: Date) => {
    const personToUpdate = people.find(p => p.id === id);
    if (!personToUpdate) return;
    
    setPeople(prev => 
      prev.map(p => 
        p.id === id ? { ...p, status, exitTime } : p
      )
    );
    
    // Create exit event if status changed to inactive
    if (status === 'inactive' && personToUpdate.status === 'active') {
      const gate = gates[Math.floor(Math.random() * gates.length)];
      const newEvent: EntryEvent = {
        id: `exit-${personToUpdate.id}`,
        personId: personToUpdate.id,
        personName: personToUpdate.name,
        type: 'exit',
        gateId: gate.id,
        gateName: gate.name,
        timestamp: exitTime || new Date(),
      };
      
      setEntryEvents(prev => [newEvent, ...prev]);
      
      // Update occupancy stats
      updateOccupancyStats(-1);
      
      toast.info(`${personToUpdate.name} has left the building`);
    }
  };

  return {
    people,
    setPeople,
    addPerson,
    removePerson,
    updatePersonStatus
  };
};

export default usePersonActions;
