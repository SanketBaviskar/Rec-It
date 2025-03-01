
import { Widget as WidgetInterface } from './types/dashboard';
import OccupancyCounter from './OccupancyCounter';
import GateControls from './GateControls';
import VisitorList from './VisitorList';
import EntryHistory from './EntryHistory';
import OccupancyChart from './OccupancyChart';
import AlertsWidget from './AlertsWidget';
import ClockWidget from './ClockWidget';

interface WidgetFactoryProps {
  widget: WidgetInterface;
}

export const WidgetFactory: React.FC<WidgetFactoryProps> = ({ widget }) => {
  // If widget is not visible, return null
  if (!widget.visible) return null;
  
  // Return the appropriate widget based on type
  switch (widget.type) {
    case 'occupancy-counter':
      return <OccupancyCounter id={widget.id} />;
    case 'gate-controls':
      return <GateControls id={widget.id} />;
    case 'visitor-list':
      return <VisitorList id={widget.id} />;
    case 'entry-history':
      return <EntryHistory id={widget.id} />;
    case 'occupancy-chart':
      return <OccupancyChart id={widget.id} />;
    case 'alerts':
      return <AlertsWidget id={widget.id} />;
    case 'clock':
      return <ClockWidget id={widget.id} />;
    default:
      return null;
  }
};

export default WidgetFactory;
