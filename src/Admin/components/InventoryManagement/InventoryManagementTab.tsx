import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryTree from "./CatagoryTree";
import { RegisteredComponents } from "../componentRegistry";
import RenderWindow from "@/Admin/Layout/RenderWindow";

interface Category {
  id: string;
  name: string;
  items: number;
  subCategories?: Category[];
}

export default function InventoryManagementTab() {
  const [activeComponent, setActiveComponent] = useState<RegisteredComponents | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories: Category[] = [
    {
      id: "1",
      name: "Sports Equipment",
      items: 10,
      subCategories: [
        { id: "2-1", name: "Basketball", items: 5 },
        { id: "2-2", name: "Volleyball", items: 2 },
        { id: "2-3", name: "Table Tennis", items: 8 },
      ],
    },
    {
      id: "2",
      name: "Outdoor Adventure",
      items: 10,
      subCategories: [
        { id: "2-1", name: "Bike Shop", items: 5 },
        { id: "2-2", name: "Rental Shop", items: 5 },
      ],
    },
  ];

  const handleFormComplete = () => setActiveComponent(null);

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-64 border-r bg-background p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold">Inventory List</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setActiveComponent("AddNewInventoryForm")}
            aria-label="Add New Inventory"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <CategoryTree
          categories={categories}
          onCategorySelect={setSelectedCategory}
          onAddEquipment={() => setActiveComponent("AddNewEquipmentForm")}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 h-full overflow-hidden">
        {!activeComponent && (
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="h-full overflow-y-auto">
          {activeComponent ? (
            <RenderWindow activeComponent={activeComponent} />
          ) : (
            <p className="text-center text-muted-foreground">
              Welcome to Inventory Management. Please select an action.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}