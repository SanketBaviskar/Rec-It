import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Facility } from '@/types/types';

interface QuickBookPanelProps {
  facilities: Facility[];
  onQuickBook: (facilityId: string, duration: number) => void;
}

export function QuickBookPanel({ facilities, onQuickBook }: QuickBookPanelProps) {
  // ... Quick book panel implementation
}
