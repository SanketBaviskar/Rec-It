
import React from 'react';
import { useDashboard } from './DashboardContext';
import Widget from './Widget';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DoorOpen, DoorClosed, Clock, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const GateControls: React.FC<{ id: string }> = ({ id }) => {
  const { gates, toggleGate } = useDashboard();

  // Format timestamp to relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <Widget id={id} title="Gate Controls">
      <div className="space-y-4">
        {gates.map((gate) => (
          <div 
            key={gate.id} 
            className={cn(
              "border rounded-lg p-3 transition-colors",
              gate.status === 'open' ? "bg-secondary/50 border-primary/20" : "bg-muted/30"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {gate.status === 'open' ? (
                  <DoorOpen className="h-5 w-5 text-primary" />
                ) : (
                  <DoorClosed className="h-5 w-5" />
                )}
                <span className="font-medium">{gate.name}</span>
              </div>
              <Badge 
                variant={gate.status === 'open' ? "default" : "outline"} 
                className={cn(
                  "font-medium",
                  gate.status === 'open' ? "bg-primary" : "text-muted-foreground"
                )}
              >
                {gate.status === 'open' ? 'Open' : 'Closed'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Last change: {formatRelativeTime(gate.lastStatusChange)}</span>
              </div>
              <Badge variant="outline" className="text-xs font-normal">
                {gate.isAutomatic ? 'Automatic' : 'Manual'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={gate.status === 'open'}
                  onCheckedChange={() => toggleGate(gate.id)}
                  className="data-[state=checked]:bg-primary"
                />
                <span className="text-sm font-medium">
                  {gate.status === 'open' ? 'Close Gate' : 'Open Gate'}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => toggleGate(gate.id)}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Widget>
  );
};

export default GateControls;
