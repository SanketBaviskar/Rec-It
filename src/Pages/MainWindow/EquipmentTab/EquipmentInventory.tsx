import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { EquipmentItem } from "./types"; // Assume we created a shared types file
import React from "react";

const sportsEquipment: EquipmentItem[] = [
  // Cleaned duplicate entries
  {
    id: "8",
    name: "Jump Rope",
    quantity: 20,
    photoUrl: "jumprope",
  },
  // ... other items
];

export function EquipmentInventory() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(
    () =>
      sportsEquipment.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  return (
    <div className="h-[83vh]">
      <div className="p-4 sticky top-0 z-50">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
      </div>
      <div className="h-[75vh] overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const EquipmentCard = React.memo(({ item }: { item: EquipmentItem }) => (
  <Card className="flex flex-col h-48 transition-shadow hover:shadow-lg">
    <CardHeader className="p-3">
      <CardTitle className="text-sm">{item.name}</CardTitle>
    </CardHeader>
    <CardContent className="p-3 pt-0 flex-grow">
      <div className="flex items-center mb-2">
        <img
          src={item.photoUrl}
          alt={item.name}
          loading="lazy"
          className="w-20 h-20 object-contain mr-2"
        />
        <span className="text-sm">Qty: {item.quantity}</span>
      </div>
    </CardContent>
    <CardFooter className="p-3 pt-0">
      <Button size="sm" className="w-full text-xs">
        Reserve
      </Button>
    </CardFooter>
  </Card>
));
