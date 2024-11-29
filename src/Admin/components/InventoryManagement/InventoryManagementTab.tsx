"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function InventoryManagementTab() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
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
    // Add more categories as needed
  ];

  const inventoryItems: InventoryItem[] = [
    {
      id: "1",
      name: "Adjustable Wrench",
      category: "BS Program Only",
      brandName: "Craftsman",
      introductionDate: "8/29/2023",
      status: "active",
    },
    // Add more items as needed
  ];

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "addNewInventoryForm":
        return <AddInventoryForm />;
      default:
        return <p>Select a component to display.</p>;
    }
  };

  const renderCategoryTree = (categories: Category[], level = 0) => {
    return categories.map((category) => (
      <div key={category.id}>
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
              onClick={()=>setActiveComponent("addNewInventoryForm")}
            >
              <Plus />
            </Button>
          </div>
        </div>
        {renderCategoryTree(categories)}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 h-full overflow-hidden">
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
              {/* Add equipment form here */}
            </DialogContent>
          </Dialog>
        </div>

        {/* <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand Name</TableHead>
                <TableHead>Introduction Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.brandName}</TableCell>
                  <TableCell>{item.introductionDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs capitalize
                      ${
                        item.status === "active"
                          ? "bg-green-100 text-green-800"
                          : item.status === "maintenance"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div> */}
        <div className="h-full overflow-y-auto">{renderActiveComponent()}</div>
      </div>
    </div>
  );
}
