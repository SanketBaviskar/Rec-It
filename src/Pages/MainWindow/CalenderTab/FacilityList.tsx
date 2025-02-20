// components/calendar/FacilityList.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Facility } from '@/types/types';

interface FacilityListProps {
    facilities: Facility[];
    selectedFacility?: string;
    onFacilitySelect: (facilityId: string) => void;
}

export function FacilityList({ facilities, selectedFacility, onFacilitySelect }: FacilityListProps) {
    return (
        <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
                {facilities.map((facility) => (
                    <Card
                        key={facility.id}
                        className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedFacility === facility.id ? 'bg-accent' : ''
                            }`}
                        onClick={() => onFacilitySelect(facility.id)}
                    >
                        {/* ... facility card content */}
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium">{facility.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {facility.type} • {" "}
                                        {facility.capacity} capacity
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {facility.location}
                                    </p>
                                </div>
                                <Badge
                                    variant={facility.available ? "default" : "secondary"}
                                >
                                    {facility.available ? "Available" : "In Use"}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}