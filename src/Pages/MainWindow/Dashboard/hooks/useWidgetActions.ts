
import { useState } from 'react';
import { Widget, WidgetType } from '../types/dashboard';
import { defaultWidgets, defaultAvailableWidgets } from '../utils/mockDataGenerators';
import { toast } from "@/components/ui/sonner";

export const useWidgetActions = () => {
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [availableWidgets] = useState<Widget[]>(defaultAvailableWidgets);

  // Method to add a widget
  const addWidget = (type: WidgetType) => {
    const availableWidget = availableWidgets.find(w => w.type === type);
    if (!availableWidget) return;
    
    const newWidget: Widget = {
      id: `widget-${type}-${Date.now()}`,
      type,
      title: availableWidget.title,
      visible: true,
      x: 0,
      y: widgets.length,
      w: 1,
      h: 1,
    };
    
    setWidgets(prev => [...prev, newWidget]);
    
    toast.success(`Added ${availableWidget.title} widget`);
  };

  // Method to remove a widget
  const removeWidget = (id: string) => {
    const widgetToRemove = widgets.find(w => w.id === id);
    if (!widgetToRemove) return;
    
    setWidgets(prev => prev.filter(w => w.id !== id));
    
    toast.info(`Removed ${widgetToRemove.title} widget`);
  };

  // Method to toggle widget visibility
  const toggleWidgetVisibility = (id: string) => {
    setWidgets(prev => 
      prev.map(w => 
        w.id === id ? { ...w, visible: !w.visible } : w
      )
    );
  };

  // Method to update widget position
  const updateWidgetPosition = (id: string, position: { x?: number, y?: number, w?: number, h?: number }) => {
    setWidgets(prev => 
      prev.map(w => 
        w.id === id ? { ...w, ...position } : w
      )
    );
  };

  return {
    widgets,
    availableWidgets,
    addWidget,
    removeWidget,
    toggleWidgetVisibility,
    updateWidgetPosition
  };
};

export default useWidgetActions;
