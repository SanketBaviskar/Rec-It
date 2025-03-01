
import { useState } from 'react';
import { Alert } from '../types/dashboard';
// import { toast } from "@/components/ui/use-toast";

export const useAlertActions = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Method to mark alert as read
  const markAlertAsRead = (id: string) => {
    setAlerts(prev => 
      prev.map(a => 
        a.id === id ? { ...a, read: true } : a
      )
    );
  };

  // Method to remove an alert
  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  // Method to create an alert
  const createAlert = (type: Alert['type'], message: string) => {
    const newAlert: Alert = {
      id: `alert-${Date.now()}`,
      type,
      message,
      timestamp: new Date(),
      read: false,
    };
    
    setAlerts(prev => [newAlert, ...prev]);
    
    // Show toast notification
  //   if (type === 'warning') {
  //     toast({
  //       variant: "destructive",
  //       title: "Warning",
  //       description: message,
  //     });
  //   } else if (type === 'error') {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: message,
  //     });
  //   } else {
  //     toast({
  //       title: "Notification",
  //       description: message,
  //     });
  //   }
  };

  return {
    alerts,
    setAlerts,
    markAlertAsRead,
    removeAlert,
    createAlert
  };
};

export default useAlertActions;