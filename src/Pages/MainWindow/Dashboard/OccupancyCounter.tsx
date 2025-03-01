
import React, { useState, useEffect } from 'react';
import { useDashboard } from './DashboardContext';
import Widget from './Widget';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const OccupancyCounter: React.FC<{ id: string }> = ({ id }) => {
  const { occupancyStats, entryEvents } = useDashboard();
  const [isIncreasing, setIsIncreasing] = useState<boolean | null>(null);
  const [previousCount, setPreviousCount] = useState(occupancyStats.current);
  const [animateCount, setAnimateCount] = useState(false);

  // Calculate percentage of capacity
  const occupancyPercentage = Math.min(100, Math.round((occupancyStats.current / occupancyStats.max) * 100));
  
  // Determine status color based on occupancy
  const getStatusColor = () => {
    if (occupancyPercentage < 50) return "bg-green-500";
    if (occupancyPercentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTextColor = () => {
    if (occupancyPercentage < 50) return "text-green-500";
    if (occupancyPercentage < 80) return "text-yellow-500";
    return "text-red-500";
  };

  // Calculate trend based on entry events in the last hour
  useEffect(() => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    const recentEvents = entryEvents.filter(event => event.timestamp > oneHourAgo);
    const entries = recentEvents.filter(event => event.type === 'entry').length;
    const exits = recentEvents.filter(event => event.type === 'exit').length;
    
    setIsIncreasing(entries > exits);
  }, [entryEvents]);

  // Animate when count changes
  useEffect(() => {
    if (previousCount !== occupancyStats.current) {
      setAnimateCount(true);
      setPreviousCount(occupancyStats.current);
      
      const timer = setTimeout(() => {
        setAnimateCount(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [occupancyStats.current, previousCount]);

  return (
    <Widget id={id} title="Occupancy Counter">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="font-normal py-1">
              <Clock className="h-3 w-3 mr-1" />
              Live
            </Badge>
            <Badge variant="outline" className="font-normal py-1">
              <Users className="h-3 w-3 mr-1" />
              Max: {occupancyStats.max}
            </Badge>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "font-normal py-1",
              isIncreasing === null ? "" : isIncreasing ? "text-green-500" : "text-red-500"
            )}
          >
            {isIncreasing === null ? (
              "Stable"
            ) : isIncreasing ? (
              <>
                <ArrowUp className="h-3 w-3 mr-1" />
                Increasing
              </>
            ) : (
              <>
                <ArrowDown className="h-3 w-3 mr-1" />
                Decreasing
              </>
            )}
          </Badge>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Current Occupancy
          </div>
          <div 
            className={cn(
              "text-5xl font-bold",
              getTextColor(),
              animateCount ? 
                occupancyStats.current > previousCount ? "animate-counter-up" : "animate-counter-down" 
                : ""
            )}
          >
            {occupancyStats.current}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            of {occupancyStats.max} maximum
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs font-medium">
              {occupancyPercentage}% Capacity
            </div>
            <div className="text-xs text-muted-foreground">
              {occupancyStats.current}/{occupancyStats.max}
            </div>
          </div>
          <Progress value={occupancyPercentage} className="h-2" />
          <div 
            className={cn("h-2 w-2 rounded-full mt-1 ml-[calc(var(--value)*1%)] -translate-x-1", getStatusColor())}
            style={{ "--value": occupancyPercentage } as React.CSSProperties}
          />
        </div>
      </div>
    </Widget>
  );
};

export default OccupancyCounter;
