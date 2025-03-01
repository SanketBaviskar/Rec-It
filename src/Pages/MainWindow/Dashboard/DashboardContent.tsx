import React, { useEffect } from 'react';
import { useDashboard } from './DashboardContext';
import WidgetFactory from './WidgetFactory';
import AddWidgetButton from './AddWidgetButton';
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList, RefreshCw } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

interface DashboardContentProps {
  className?: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ className }) => {
  const { widgets, occupancyStats } = useDashboard();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [isRefreshing, setIsRefreshing] = React.useState(false);


  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate a refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboard data refreshed");
    }, 1000);
  };

  return (
    <div className="flex flex-col bg-background p-4 h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6 sticky ">
        {/* <div>
          <h1 className="text-2xl font-bold">Building Occupancy Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Currently {occupancyStats.current} people in the building ({Math.round((occupancyStats.current / occupancyStats.max) * 100)}% capacity)
          </p>
        </div> */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-9 w-9"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('grid')}
            className={`h-9 w-9 ${viewMode === 'grid' ? 'bg-secondary' : ''}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('list')}
            className={`h-9 w-9 ${viewMode === 'list' ? 'bg-secondary' : ''}`}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <AddWidgetButton />
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'dashboard-grid' : 'space-y-4' } >
        {widgets.length === 0 ? (
          <div className="col-span-full grid-placeholder">
            <div className="text-center p-4">
              <h3 className="text-lg font-medium">No widgets added</h3>
              <p className="text-muted-foreground mt-1">
                Click the "Add Widget" button to add widgets to your dashboard.
              </p>
              <AddWidgetButton />
            </div>
          </div>
        ) : (
          widgets.map((widget) => (
            <div key={widget.id} className={viewMode === 'grid' ? '' : 'w-full'}>
              <WidgetFactory widget={widget} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
