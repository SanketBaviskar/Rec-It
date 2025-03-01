
import { useState } from 'react';
import { Gate } from '../types/dashboard';
import { toast } from "@/components/ui/sonner";

export const useGateActions = (createAlert: (type: 'info' | 'warning' | 'error', message: string) => void) => {
  const [gates, setGates] = useState<Gate[]>([]);

  // Method to toggle gate status
  const toggleGate = (id: string) => {
    const gateToUpdate = gates.find(g => g.id === id);
    if (!gateToUpdate) return;
    
    const newStatus = gateToUpdate.status === 'open' ? 'closed' : 'open';
    
    setGates(prev => 
      prev.map(g => 
        g.id === id ? { 
          ...g, 
          status: newStatus, 
          lastStatusChange: new Date() 
        } : g
      )
    );
    
    toast.success(`Gate ${gateToUpdate.name} is now ${newStatus}`);
    
    // Create alert if gate is left open for too long
    if (newStatus === 'open') {
      setTimeout(() => {
        setGates(prev => {
          const gate = prev.find(g => g.id === id);
          if (gate && gate.status === 'open') {
            createAlert('warning', `${gate.name} has been open for 15 seconds`);
          }
          return prev;
        });
      }, 15000);
    }
  };

  return {
    gates,
    setGates,
    toggleGate
  };
};

export default useGateActions;
