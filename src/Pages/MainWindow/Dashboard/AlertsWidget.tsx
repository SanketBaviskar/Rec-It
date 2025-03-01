
import React from 'react';
import { useDashboard } from './DashboardContext';
import Widget from './Widget';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Info, AlertTriangle, AlertOctagon, Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const AlertsWidget: React.FC<{ id: string }> = ({ id }) => {
  const { alerts, markAlertAsRead, removeAlert } = useDashboard();

  // Format timestamp to relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Get icon based on alert type
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertOctagon className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  // Get color based on alert type
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'warning': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'error': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <Widget id={id} title="Alerts">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="font-normal px-2 py-1">
            {alerts.filter(a => !a.read).length} New Alerts
          </Badge>
          {alerts.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7"
              onClick={() => alerts.forEach(a => markAlertAsRead(a.id))}
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>
        
        <ScrollArea className="flex-1 h-full pr-4">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No alerts at this time
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={cn(
                    "p-3 rounded-md border transition-colors",
                    alert.read ? "bg-muted/30" : "bg-secondary/50",
                    alert.type === 'error' && !alert.read && "animate-pulse border-red-200"
                  )}
                >
                  <div className="flex items-start">
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full mt-0.5",
                        getAlertColor(alert.type)
                      )}
                    >
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={cn("font-normal", getAlertColor(alert.type))}
                        >
                          {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatRelativeTime(alert.timestamp)}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">
                        {alert.message}
                      </p>
                      <div className="mt-2 flex items-center justify-end space-x-2">
                        {!alert.read && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => markAlertAsRead(alert.id)}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark as read
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs hover:text-destructive"
                          onClick={() => removeAlert(alert.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </Widget>
  );
};

export default AlertsWidget;
