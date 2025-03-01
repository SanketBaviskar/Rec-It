
import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import Widget from './Widget';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Clock, ArrowUpRight, Filter, Search, CheckCircle, XCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';

const VisitorList: React.FC<{ id: string }> = ({ id }) => {
  const { people, updatePersonStatus } = useDashboard();
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter people based on status and search query
  const filteredPeople = people.filter(person => {
    // Filter by status
    if (filter === 'active' && person.status !== 'active') return false;
    if (filter === 'inactive' && person.status !== 'inactive') return false;
    
    // Filter by search query
    if (searchQuery && !person.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  // Format timestamp to readable time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format duration
  const formatDuration = (startDate: Date, endDate?: Date) => {
    const end = endDate || new Date();
    const diffInMinutes = Math.floor((end.getTime() - startDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} min`;
    
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    
    return `${hours} hr${hours > 1 ? 's' : ''} ${minutes} min`;
  };

  // Get avatar fallback from name
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
  };

  // Get color based on person type
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'employee': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'visitor': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'contractor': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // Handle checkout
  const handleCheckout = (personId: string) => {
    updatePersonStatus(personId, 'inactive', new Date());
  };

  return (
    <Widget id={id} title="Visitor List">
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search visitors..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all" onClick={() => setFilter('all')}>All</TabsTrigger>
            <TabsTrigger value="active" onClick={() => setFilter('active')}>Active</TabsTrigger>
            <TabsTrigger value="inactive" onClick={() => setFilter('inactive')}>Checked Out</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="flex-1">
            <ScrollArea className="h-[280px]">
              <div className="space-y-2">
                {filteredPeople.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No visitors match your filters
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <div 
                      key={person.id} 
                      className={cn(
                        "flex items-center p-2 rounded-md border",
                        person.status === 'active' ? "bg-secondary/50" : "bg-muted/30"
                      )}
                    >
                      <Avatar className="h-10 w-10 border">
                        <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex items-center">
                          <p className="text-sm font-medium truncate">{person.name}</p>
                          <Badge 
                            variant="secondary" 
                            className={cn("ml-2 text-xs font-normal", getTypeColor(person.type))}
                          >
                            {person.type}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {person.status === 'active' 
                              ? `Entered at ${formatTime(person.entryTime)} (${formatDuration(person.entryTime)} ago)`
                              : `Visit: ${formatDuration(person.entryTime, person.exitTime)}`
                            }
                          </span>
                        </div>
                      </div>
                      
                      <div className="ml-2 flex items-center">
                        {person.status === 'active' ? (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleCheckout(person.id)}
                          >
                            <LogOut className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Badge variant="outline" className="bg-muted text-muted-foreground">
                            Checked out
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="active" className="flex-1">
            <ScrollArea className="h-[280px]">
              <div className="space-y-2">
                {filteredPeople.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No active visitors
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <div 
                      key={person.id} 
                      className="flex items-center p-2 rounded-md border bg-secondary/50"
                    >
                      <Avatar className="h-10 w-10 border">
                        <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex items-center">
                          <p className="text-sm font-medium truncate">{person.name}</p>
                          <Badge 
                            variant="secondary" 
                            className={cn("ml-2 text-xs font-normal", getTypeColor(person.type))}
                          >
                            {person.type}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            Entered at {formatTime(person.entryTime)} ({formatDuration(person.entryTime)} ago)
                          </span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleCheckout(person.id)}
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="inactive" className="flex-1">
            <ScrollArea className="h-[280px]">
              <div className="space-y-2">
                {filteredPeople.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No checked out visitors
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <div 
                      key={person.id} 
                      className="flex items-center p-2 rounded-md border bg-muted/30"
                    >
                      <Avatar className="h-10 w-10 border">
                        <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex items-center">
                          <p className="text-sm font-medium truncate">{person.name}</p>
                          <Badge 
                            variant="secondary" 
                            className={cn("ml-2 text-xs font-normal", getTypeColor(person.type))}
                          >
                            {person.type}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            Visit: {formatDuration(person.entryTime, person.exitTime)}
                          </span>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="bg-muted text-muted-foreground">
                        Checked out
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t pt-2">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
              <span>{people.filter(p => p.status === 'active').length} Active</span>
            </div>
            <div className="flex items-center">
              <XCircle className="h-3 w-3 text-muted-foreground mr-1" />
              <span>{people.filter(p => p.status === 'inactive').length} Checked out</span>
            </div>
          </div>
          <div>
            <ArrowUpRight className="h-3 w-3 inline mr-1" />
            <span>View all visitors</span>
          </div>
        </div>
      </div>
    </Widget>
  );
};

export default VisitorList;
