
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from './DashboardContext';
import { cn } from '@/lib/utils';

interface WidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  footerContent?: React.ReactNode;
  onRemove?: () => void;
  allowRemove?: boolean;
}

export const Widget: React.FC<WidgetProps> = ({
  id,
  title,
  children,
  className,
  footerContent,
  onRemove,
  allowRemove = true,
}) => {
  const { removeWidget } = useDashboard();

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      removeWidget(id);
    }
  };

  return (
    <Card 
      className={cn(
        "widget shadow-md transition-all duration-300 animate-scale-in h-full", 
        className
      )}
    >
      <CardHeader className="p-4 flex flex-row items-center space-y-0 gap-2 pb-2 border-b bg-muted/30">
        <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
        <CardTitle className="text-base font-medium flex-1">{title}</CardTitle>
        <div className="flex items-center space-x-1">
          {allowRemove && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 hover:text-destructive" 
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter className="p-4 pt-0">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};

export default Widget;
