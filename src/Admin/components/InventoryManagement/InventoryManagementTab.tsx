"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddInventoryForm } from "./AddNewInventory";
import CategoryTree from "./CatagoryTree";

interface Category {
  id: string;
  name: string;
  items: number;
  subCategories?: Category[];
}

type ActiveComponent = "addNewInventoryForm" | null;

export default function InventoryManagementTab() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories: Category[] = [
    {
      id: "1",
      name: "Facility Access Sets",
      items: 5,
      subCategories: [
        { id: "1-1", name: "BS Program Only", items: 3 },
        { id: "1-2", name: "CW Program Only", items: 2 },
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

  const renderActiveComponent = () => {
    const componentMap: Record<string, React.ReactNode> = {
      addNewInventoryForm: (
        <AddInventoryForm
          onComplete={() => {
            setActiveComponent(null);
          }}
        />
      ),
    };

    return componentMap[activeComponent] || (
      <p className="text-center text-muted-foreground">
        Welcome to Inventory Management. Please select an action.
      </p>
    );
  };

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-64 border-r bg-background p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold">Equipment Categories</div>
          <Button
            className="bg-gray-400 w-[1rem] h-[2rem]"
            onClick={() => setActiveComponent("addNewInventoryForm")}
            aria-label="Add New Inventory"
          >
            <Plus />
          </Button>
        </div>
        <CategoryTree
          categories={categories}
          onCategorySelect={setSelectedCategory}
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
                aria-label="Search equipment"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Equipment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Equipment</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )}
        <div className="h-full overflow-y-auto">{renderActiveComponent()}</div>
      </div>
    </div>
  );
}
