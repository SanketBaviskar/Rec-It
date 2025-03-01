
import { useState } from 'react';
import { OccupancyStats } from '../types/dashboard';

export const useOccupancyStats = (
  createAlert: (type: 'info' | 'warning' | 'error', message: string) => void
) => {
  const [occupancyStats, setOccupancyStats] = useState<OccupancyStats>({
    current: 0,
    max: 150,
    average: 0,
    today: [],
    history: [],
  });

  // Update occupancy stats
  const updateOccupancyStats = (change: number) => {
    setOccupancyStats(prev => ({
      ...prev,
      current: Math.max(0, prev.current + change),
    }));
  };

  // Check occupancy thresholds and create alerts if needed
  const checkOccupancyThresholds = () => {
    if (occupancyStats.current > occupancyStats.max * 0.9) {
      createAlert('warning', `Building occupancy at ${Math.round(occupancyStats.current / occupancyStats.max * 100)}%`);
    }
    
    if (occupancyStats.current > occupancyStats.max * 0.95) {
      createAlert('error', `Building occupancy critical at ${Math.round(occupancyStats.current / occupancyStats.max * 100)}%`);
    }
  };

  return {
    occupancyStats,
    setOccupancyStats,
    updateOccupancyStats,
    checkOccupancyThresholds
  };
};

export default useOccupancyStats;
