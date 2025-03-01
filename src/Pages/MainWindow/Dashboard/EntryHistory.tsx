
import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import Widget from './Widget';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, LogIn, LogOut, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const EntryHistory: React.FC<{ id: string }> = ({ id }) => {
  const { entryEvents } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events based on search query
  const filteredEvents = entryEvents.filter(event => {
    if (searchQuery && !event.personName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Format timestamp to readable time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Group events by date
  const groupedEvents: { [key: string]: typeof entryEvents } = {};
  
  filteredEvents.forEach(event => {
    const dateKey = formatDate(event.timestamp);
    if (!groupedEvents[dateKey]) {
      groupedEvents[dateKey] = [];
    }
    groupedEvents[dateKey].push(event);
  });

  return (
    <Widget id={id} title="Entry History">
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search history..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 pr-4">
          {Object.keys(groupedEvents).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No entry/exit events found
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedEvents).map(([date, events]) => (
                <div key={date} className="space-y-2">
                  <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-1">
                    <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
                  </div>
                  
                  <div className="space-y-2 pl-2 border-l">
                    {events.map((event) => (
                      <div 
                        key={event.id} 
                        className={cn(
                          "flex items-center p-2 rounded-md border",
                          event.type === 'entry' ? "bg-secondary/50" : "bg-muted/30"
                        )}
                      >
                        <div className="flex-shrink-0">
                          <div
                            className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full",
                              event.type === 'entry' 
                                ? "bg-primary/10 text-primary" 
                                : "bg-destructive/10 text-destructive"
                            )}
                          >
                            {event.type === 'entry' ? (
                              <LogIn className="h-4 w-4" />
                            ) : (
                              <LogOut className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                        
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex items-center">
                            <p className="text-sm font-medium truncate">{event.personName}</p>
                            <Badge
                              variant="secondary"
                              className={cn(
                                "ml-2 text-xs font-normal",
                                event.type === 'entry' 
                                  ? "bg-primary/10 text-primary" 
                                  : "bg-destructive/10 text-destructive"
                              )}
                            >
                              {event.type === 'entry' ? 'Entry' : 'Exit'}
                            </Badge>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              {formatTime(event.timestamp)} via {event.gateName}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default EntryHistory;
