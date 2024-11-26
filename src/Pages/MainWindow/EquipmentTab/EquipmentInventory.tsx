import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import basketball from "@/assets/EquipmentImages/basketball.jpg";
import vollyball from "@/assets/EquipmentImages/vollyball.jpg";
import soccerball from "@/assets/EquipmentImages/soccerball.jpg";
import tabletennis from "@/assets/EquipmentImages/tabletennis.webp";
import badminton from "@/assets/EquipmentImages/badminton.jpg";
import tennisrq from "@/assets/EquipmentImages/tennisrq.webp";
import jumprope from "@/assets/EquipmentImages/jumprope.jpg";
import frisbee from "@/assets/EquipmentImages/frisbee.jpg";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type EquipmentItem = {
  id: string;
  name: string;
  quantity: number;
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  image: string;
};

const sportsEquipment: EquipmentItem[] = [
  {
    id: "1",
    name: "Basketball",
    quantity: 10,
    condition: "Good",
    image: basketball,
  },
  {
    id: "2",
    name: "Volleyball",
    quantity: 8,
    condition: "Excellent",
    image: vollyball,
  },
  {
    id: "3",
    name: "Table Tennis Set",
    quantity: 5,
    condition: "Fair",
    image: tabletennis,
  },
  {
    id: "4",
    name: "Soccer Ball",
    quantity: 12,
    condition: "Good",
    image: soccerball,
  },
  {
    id: "5",
    name: "Tennis Racket",
    quantity: 6,
    condition: "Excellent",
    image: tennisrq,
  },
  {
    id: "6",
    name: "Badminton Set",
    quantity: 4,
    condition: "Good",
    image: badminton,
  },
  {
    id: "7",
    name: "Frisbee",
    quantity: 15,
    condition: "Excellent",
    image: frisbee,
  },
  {
    id: "8",
    name: "Jump Rope",
    quantity: 20,
    condition: "Good",
    image: jumprope,
  },
  {
    id: "9",
    name: "Jump Rope",
    quantity: 20,
    condition: "Good",
    image: jumprope,
  },
  {
    id: "10",
    name: "Jump Rope",
    quantity: 20,
    condition: "Good",
    image: jumprope,
  },
  {
    id: "11",
    name: "Jump Rope",
    quantity: 20,
    condition: "Good",
    image: jumprope,
  },
];

export function EquipmentInventory() {
  return (
    <div className="h-[83vh] ">
      <div className="p-4 sticky top-0 z-50">
      <Search className="absolute left-2 top-2.5 h-4 w-4 translate-x-4 translate-y-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search equipment..."
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 w-[97.4%]"
        />
      </div>
      <div className="h-[75vh] overflow-y-auto overflow-x-hidden px-4 pb-4 ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
          {sportsEquipment.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col h-48 transform transition-transform duration-200 hover:shadow-lg hover:scale-105"
            >
              <CardHeader className="p-3">
                <CardTitle className="text-sm">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 flex-grow">
                <div className="flex items-center mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
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
          ))}
        </div>
      </div>
    </div>
  );
}
