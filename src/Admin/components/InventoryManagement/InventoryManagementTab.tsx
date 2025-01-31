import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InventoryList from "./InventoryList";
import { RegisteredComponents } from "../componentRegistry";
import RenderWindow from "@/Admin/Layout/RenderWindow";
import { categories } from "./dummy";

export default function InventoryManagementTab() {
  const [activeComponent, setActiveComponent] = useState<RegisteredComponents | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Add a handler for category selection
  const handleCategorySelect = (categoryId: string) => {
    console.log("Selected category ID:", categoryId);
    // Additional logic for handling category selection can be added here
  };

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
        <InventoryList
          categories={categories}
          onCategorySelect={handleCategorySelect}
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