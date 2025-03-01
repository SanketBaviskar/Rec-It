
import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import Widget from './Widget';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { Clock, Calendar, BarChart2, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const OccupancyChart: React.FC<{ id: string }> = ({ id }) => {
  const { occupancyStats } = useDashboard();
  const [timeRange, setTimeRange] = useState<'today' | 'week'>('today');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  // Prepare data for today's chart
  const todayData = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return {
      time: `${hour}:00`,
      value: occupancyStats.today[i] || 0,
    };
  });

  // For the hours that have not happened yet today, filter them out
  const currentHour = new Date().getHours();
  const filteredTodayData = todayData.filter((_, i) => i <= currentHour);

  // Get the data depending on selected time range
  const data = timeRange === 'today' ? filteredTodayData : occupancyStats.history;

  // Format X Axis ticks
  const formatXAxisTick = (value: string) => {
    if (timeRange === 'today') {
      // For today's data, show hour without minutes
      return value.split(':')[0];
    } else {
      // For weekly data, show abbreviated day
      const date = new Date(value);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <Widget id={id} title="Occupancy Chart">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <Tabs defaultValue="today" className="w-[200px]">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger 
                value="today" 
                onClick={() => setTimeRange('today')}
                className="text-xs"
              >
                <Clock className="h-3 w-3 mr-1" />
                Today
              </TabsTrigger>
              <TabsTrigger 
                value="week" 
                onClick={() => setTimeRange('week')}
                className="text-xs"
              >
                <Calendar className="h-3 w-3 mr-1" />
                This Week
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center space-x-1">
            <Badge
              variant={chartType === 'line' ? "default" : "outline"}
              className={cn(
                "cursor-pointer",
                chartType === 'line' ? "bg-primary" : ""
              )}
              onClick={() => setChartType('line')}
            >
              <LineChart className="h-3 w-3 mr-1" />
              Line
            </Badge>
            <Badge 
              variant={chartType === 'bar' ? "default" : "outline"}
              className={cn(
                "cursor-pointer",
                chartType === 'bar' ? "bg-primary" : ""
              )}
              onClick={() => setChartType('bar')}
            >
              <BarChart2 className="h-3 w-3 mr-1" />
              Bar
            </Badge>
          </div>
        </div>
        
        <div className="flex-1 min-h-[280px]">
          {chartType === 'line' ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey={timeRange === 'today' ? "time" : "date"} 
                  tickFormatter={formatXAxisTick}
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} people`, 'Occupancy']}
                  labelFormatter={(label) => timeRange === 'today' ? `Time: ${label}` : `Date: ${label}`}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey={timeRange === 'today' ? "time" : "date"} 
                  tickFormatter={formatXAxisTick}
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} people`, 'Occupancy']}
                  labelFormatter={(label) => timeRange === 'today' ? `Time: ${label}` : `Date: ${label}`}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div>Average: {occupancyStats.average} people</div>
          <div>Max today: {Math.max(...filteredTodayData.map(d => d.value))} people</div>
        </div>
      </div>
    </Widget>
  );
};

export default OccupancyChart;
