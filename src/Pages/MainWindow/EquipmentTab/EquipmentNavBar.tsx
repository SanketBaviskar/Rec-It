"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EquipmentInventory } from "./EquipmentInventory";
import { EquipmentManage } from "./EquipmentManage";
import { Volleyball, Mountain, Key, PenTool, User } from "lucide-react";

export default function EquipmentNavBar() {
  const [activeSection, setActiveSection] = useState("inventory");
  const [activeCategory, setActiveCategory] = useState("Sports");

  const inventoryCategories = [
    { id: 1, name: "Sports", icon: Volleyball },
    { id: 2, name: "Rockwall", icon: Mountain },
    { id: 3, name: "Keys", icon: Key },
    { id: 4, name: "Stationary", icon: PenTool },
    { id: 5, name: "Staff", icon: User },
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
  ];

  const handleSectionChange = (section: string, category: string = "") => {
    setActiveSection(section);
    if (section === "inventory") setActiveCategory(category || "Sports");
    else setActiveCategory("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-start items-center h-16">
            <ul className="flex space-x-4 py-4">
              {["Inventory", "Reserve", "Manage"].map((section) => (
                <li key={section}>
                  <Button
                    variant="ghost"
                    className={`${
                      activeSection === section.toLowerCase()
                        ? "bg-gray-200"
                        : ""
                    }`}
                    onClick={() =>
                      handleSectionChange(section.toLowerCase())
                    }
                  >
                    {section}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Vertical Navbar (Inventory Categories) */}
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
                    <item.icon className="mr-2" />
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Right Content Area */}
        <main
          className={`flex-1 ${
            activeSection !== "inventory" ? "w-full" : ""
          }`}
        >
          {/* Inventory Section */}
          {activeSection === "inventory" && (
            <div className="h-full flex flex-col overflow-y-auto overflow-x-hidden">
              {activeCategory && (
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                  {activeCategory === "Sports" && <EquipmentInventory />}
                  {/* Add conditional rendering for other categories if needed */}
                </div>
              )}
            </div>
          )}

          {/* Reserve Section */}
          {activeSection === "reserve" && (
            <div className="p-4 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Reserve</h2>
              {/* Reserve section content */}
            </div>
          )}

          {/* Manage Section */}
          {activeSection === "manage" && (
            <div className="p-4 h-full overflow-y-auto">
              <EquipmentManage initialItems={initialCheckedOutItems} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
