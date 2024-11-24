"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EquipmentInventory } from "./EquipmentInventory";
import { EquipmentManage } from "./EquipmentManage";
import { Volleyball, Mountain, Key, PenTool, User } from 'lucide-react' // Import Lucide icons


export default function EquipmentNavBar() {
  const [activeSection, setActiveSection] = useState("inventory");
  const [activeCategory, setActiveCategory] = useState("Sports");

  const inventoryCategories = [
    {
      id: 1,
      name: "Sports",
      icon: Volleyball, // Replace with an actual Lucide icon name
    },
    {
      id: 2,
      name: "Rockwall",
      icon: Mountain, // Replace with an actual Lucide icon name
    },
    {
      id: 3,
      name: "Keys",
      icon: Key, // Replace with an actual Lucide icon name
    },
    {
      id: 4,
      name: "Stationary",
      icon: PenTool, // Replace with an actual Lucide icon name
    },
    {
      id: 5,
      name: "Staff",
      icon: User, // Replace with an actual Lucide icon name
    },
  ];

  const initialCheckedOutItems = [
    {
      id: 1,
      name: "Basketball",
      itemNumber: "BB001",
      checkedOutBy: "John Doe",
      checkedOutDate: "2024-01-20",
      dueDate: "2024-01-27",
    },
    {
      id: 2,
      name: "Tennis Racket",
      itemNumber: "TR002",
      checkedOutBy: "Jane Smith",
      checkedOutDate: "2024-01-19",
      dueDate: "2024-01-26",
    },
    {
      id: 3,
      name: "Climbing Harness",
      itemNumber: "CH003",
      checkedOutBy: "Mike Johnson",
      checkedOutDate: "2024-01-18",
      dueDate: "2024-01-25",
    },
    {
      id: 4,
      name: "Volleyball",
      itemNumber: "VB004",
      checkedOutBy: "Sarah Brown",
      checkedOutDate: "2024-01-21",
      dueDate: "2024-01-28",
    },
    {
      id: 5,
      name: "Yoga Mat",
      itemNumber: "YM005",
      checkedOutBy: "Emily Davis",
      checkedOutDate: "2024-01-22",
      dueDate: "2024-01-29",
    },
    {
      id: 1,
      name: "Basketball",
      itemNumber: "BB001",
      checkedOutBy: "John Doe",
      checkedOutDate: "2024-01-20",
      dueDate: "2024-01-27",
    },
    {
      id: 2,
      name: "Tennis Racket",
      itemNumber: "TR002",
      checkedOutBy: "Jane Smith",
      checkedOutDate: "2024-01-19",
      dueDate: "2024-01-26",
    },
    {
      id: 3,
      name: "Climbing Harness",
      itemNumber: "CH003",
      checkedOutBy: "Mike Johnson",
      checkedOutDate: "2024-01-18",
      dueDate: "2024-01-25",
    },
    {
      id: 4,
      name: "Volleyball",
      itemNumber: "VB004",
      checkedOutBy: "Sarah Brown",
      checkedOutDate: "2024-01-21",
      dueDate: "2024-01-28",
    },
    {
      id: 5,
      name: "Yoga Mat",
      itemNumber: "YM005",
      checkedOutBy: "Emily Davis",
      checkedOutDate: "2024-01-22",
      dueDate: "2024-01-29",
    },
    {
      id: 1,
      name: "Basketball",
      itemNumber: "BB001",
      checkedOutBy: "John Doe",
      checkedOutDate: "2024-01-20",
      dueDate: "2024-01-27",
    },
    {
      id: 2,
      name: "Tennis Racket",
      itemNumber: "TR002",
      checkedOutBy: "Jane Smith",
      checkedOutDate: "2024-01-19",
      dueDate: "2024-01-26",
    },
    {
      id: 3,
      name: "Climbing Harness",
      itemNumber: "CH003",
      checkedOutBy: "Mike Johnson",
      checkedOutDate: "2024-01-18",
      dueDate: "2024-01-25",
    },
    {
      id: 4,
      name: "Volleyball",
      itemNumber: "VB004",
      checkedOutBy: "Sarah Brown",
      checkedOutDate: "2024-01-21",
      dueDate: "2024-01-28",
    },
    {
      id: 5,
      name: "Yoga Mat",
      itemNumber: "YM005",
      checkedOutBy: "Emily Davis",
      checkedOutDate: "2024-01-22",
      dueDate: "2024-01-29",
    },
    {
      id: 1,
      name: "Basketball",
      itemNumber: "BB001",
      checkedOutBy: "John Doe",
      checkedOutDate: "2024-01-20",
      dueDate: "2024-01-27",
    },
    {
      id: 2,
      name: "Tennis Racket",
      itemNumber: "TR002",
      checkedOutBy: "Jane Smith",
      checkedOutDate: "2024-01-19",
      dueDate: "2024-01-26",
    },
    {
      id: 3,
      name: "Climbing Harness",
      itemNumber: "CH003",
      checkedOutBy: "Mike Johnson",
      checkedOutDate: "2024-01-18",
      dueDate: "2024-01-25",
    },
    {
      id: 4,
      name: "Volleyball",
      itemNumber: "VB004",
      checkedOutBy: "Sarah Brown",
      checkedOutDate: "2024-01-21",
      dueDate: "2024-01-28",
    },
    {
      id: 5,
      name: "Yoga Mat",
      itemNumber: "YM005",
      checkedOutBy: "Emily Davis",
      checkedOutDate: "2024-01-22",
      dueDate: "2024-01-29",
    },
  ];

  const handleInventoryClick = () => {
    setActiveSection("inventory");
    setActiveCategory("Sports"); // Reset to default category
  };

  return (
    <div className="flex flex-col h-full">
      {/* Horizontal Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-start items-center h-16">
            <ul className="flex space-x-4 py-4">
              <li>
                <Button
                  variant="ghost"
                  className={`${
                    activeSection === "inventory" ? "bg-gray-200" : ""
                  }`}
                  onClick={handleInventoryClick}
                >
                  Inventory
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`${
                    activeSection === "reserve" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    setActiveSection("reserve");
                    setActiveCategory("");
                  }}
                >
                  Reserve
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`${
                    activeSection === "manage" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    setActiveSection("manage");
                    setActiveCategory("");
                  }}
                >
                  Manage
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Area with Conditional Vertical Navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Vertical Navbar for Inventory - only visible when Inventory is active */}
        {activeSection === "inventory" && (
          <nav className="w-48 bg-white border-r">
            <ul className="py-4 px-4">
              {inventoryCategories.map((item) => (
                <li key={item.id}>
                    
                  <Button
                    variant="ghost"
                    className={`w-full justify-start py-2 px-4 ${
                      activeCategory === item.name ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setActiveCategory(item.name)}
                  >
                    <item.icon></item.icon>
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Content Area */}
        <main
          className={`flex-1 ${activeSection !== "inventory" ? "w-full" : ""}`}
        >
          {activeSection === "inventory" && (
            <div>
              {activeCategory && (
                <div className="p-4">
                  {activeCategory === "Sports" && <EquipmentInventory />}
                  {/* {activeCategory !== 'Sports' && <p className="text-sm">Select a category from the left to view inventory items.</p>} */}
                </div>
              )}
              {/* Add inventory content here */}
            </div>
          )}
          {activeSection === "reserve" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Reserve</h2>
              {/* Reserve section is intentionally left blank as per the original request */}
            </div>
          )}
          {activeSection === "manage" && (
            <div>
              <EquipmentManage initialItems={initialCheckedOutItems} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
