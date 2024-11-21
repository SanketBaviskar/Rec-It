import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    image: './EquipmentImages/basketball.jpg',
  },
  {
    id: "2",
    name: "Volleyball",
    quantity: 8,
    condition: "Excellent",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "3",
    name: "Table Tennis Set",
    quantity: 5,
    condition: "Fair",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "4",
    name: "Soccer Ball",
    quantity: 12,
    condition: "Good",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "5",
    name: "Tennis Racket",
    quantity: 6,
    condition: "Excellent",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "6",
    name: "Badminton Set",
    quantity: 4,
    condition: "Good",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "7",
    name: "Frisbee",
    quantity: 15,
    condition: "Excellent",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "8",
    name: "Jump Rope",
    quantity: 20,
    condition: "Good",
    image: "/placeholder.svg?height=50&width=50",
  },
];

export function EquipmentInventory() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {sportsEquipment.map((item) => (
        <Card key={item.id} className="flex flex-col h-48">
          <CardHeader className="p-3">
            <CardTitle className="text-sm">{item.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 flex-grow">
            <div className="flex items-center mb-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-contain mr-2"
              />
              <span className="text-sm">Qty: {item.quantity}</span>
            </div>
            <Badge
              variant={
                item.condition === "Excellent"
                  ? "default"
                  : item.condition === "Good"
                  ? "secondary"
                  : item.condition === "Fair"
                  ? "outline"
                  : "destructive"
              }
              className="text-xs"
            >
              {item.condition}
            </Badge>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <Button size="sm" className="w-full text-xs">
              Reserve
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
