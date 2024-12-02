"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Plus, Search } from "lucide-react";
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

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  brandName: string;
  introductionDate: string;
  status: "active" | "maintenance" | "retired";
}

interface Category {
  id: string;
  name: string;
  items: number;
  subCategories?: Category[];
}

type ActiveComponent = "addNewInventoryForm" | null;

export default function InventoryManagementTab() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Categories data
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

  // Manage expanded categories
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const updated = new Set(prev);
      if (updated.has(categoryId)) {
        updated.delete(categoryId);
      } else {
        updated.add(categoryId);
      }
      return updated;
    });
  };

  // Map active components to the corresponding UI
  const renderActiveComponent = () => {
    const componentMap: Record<string, React.ReactNode> = {
      addNewInventoryForm: (
        <AddInventoryForm
          onComplete={() => {
            setActiveComponent(null); // Reset to default view
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

  // Render the category tree
  const renderCategoryTree = (categories: Category[], level = 0) => {
    if (categories.length === 0) {
      return (
        <p className="text-muted-foreground text-sm">No categories available.</p>
      );
    }

    return categories.map((category) => (
      <div key={category.id} role="treeitem" aria-expanded={expandedCategories.has(category.id)}>
        <div
          className={`flex items-center gap-2 px-2 py-1.5 hover:bg-accent cursor-pointer ${
            selectedCategory === category.id ? "bg-accent" : ""
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            setSelectedCategory(category.id);
            if (category.subCategories?.length) {
              toggleCategory(category.id);
            }
          }}
        >
          {category.subCategories?.length ? (
            expandedCategories.has(category.id) ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : (
            <div className="w-4" />
          )}
          <span>{category.name}</span>
          <span className="text-muted-foreground text-sm ml-auto">
            ({category.items})
          </span>
        </div>
        {expandedCategories.has(category.id) && category.subCategories && (
          <div>{renderCategoryTree(category.subCategories, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-64 border-r bg-background p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold">Equipment Categories</div>
          <div>
            <Button
              className="bg-gray-400 w-[1rem] h-[2rem]"
              onClick={() => setActiveComponent("addNewInventoryForm")}
              aria-label="Add New Inventory"
            >
              <Plus />
            </Button>
          </div>
        </div>
        <div role="tree">{renderCategoryTree(categories)}</div>
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
                {/* Add equipment form content */}
              </DialogContent>
            </Dialog>
          </div>
        )}
        <div className="h-full overflow-y-auto">{renderActiveComponent()}</div>
      </div>
    </div>
  );
}
