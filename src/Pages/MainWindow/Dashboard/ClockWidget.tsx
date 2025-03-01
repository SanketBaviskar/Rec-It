
import React, { useState, useEffect } from 'react';
import Widget from './Widget';
import { cn } from '@/lib/utils';

const ClockWidget: React.FC<{ id: string }> = ({ id }) => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time as HH:MM:SS
  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: true 
  });
  
  // Format date as Day, Month DD, YYYY
  const formattedDate = time.toLocaleDateString([], { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Widget id={id} title="Clock">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-4xl font-bold">{formattedTime}</div>
        <div className="mt-2 text-muted-foreground">{formattedDate}</div>
      </div>
    </Widget>
  );
};

export default ClockWidget;
