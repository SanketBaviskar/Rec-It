"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EquipmentInventory } from "./EquipmentInventory";
import { EquipmentManage } from "./EquipmentManage";
import {
  Volleyball,
  Mountain,
  Key,
  PenTool,
  User,
  Loader2,
} from "lucide-react";
import { fetchInventoryCategories } from "@/Services/Api/Equipment/inventorySidebar";

// Type definitions based on your API response
interface Department {
  id: number;
  name: string;
  departmentIcon: string;
  createdAt: string;
  updatedAt: string;
}


export default function EquipmentNavBar() {
  const [activeSection, setActiveSection] = useState("inventory");
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map of department names to Lucide icon components
  const iconMap: Record<string, any> = {
    Sports: Volleyball,
    Rockwalls: Mountain,
    Keys: Key,
    Stationary: PenTool,
    Staff: User,
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchInventoryCategories();
        // Check if the response is successful
        if (response.status === "success" && response.data?.items) {
          setCategories(response.data.items);
          // Set initial active category if none is selected
          if (!activeCategory && response.data.items.length > 0) {
            setActiveCategory(response.data.items[0].name);
          }
        } else {
          throw new Error(response.message || "Failed to load departments");
        }
      } catch (error) {
        setError(error.message || "Failed to load departments");
        console.error("Error loading departments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Add a retry function
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    loadCategories();
  };

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
    if (section === "inventory") {
      setActiveCategory(category || (categories[0]?.name ?? ""));
    } else {
      setActiveCategory("");
    }
  };

  // Get the appropriate icon component for a department
  const getDepartmentIcon = (departmentName: string) => {
    const IconComponent = iconMap[departmentName] || User;
    return IconComponent;
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
                    onClick={() => handleSectionChange(section.toLowerCase())}
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
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin" />
              </div>
            ) : error ? (
              <div className="p-4 flex flex-col items-center">
                <div className="text-red-500 mb-4">{error}</div>
                <Button
                  variant="outline"
                  onClick={handleRetry}
                  className="flex items-center gap-2 "
                >
                  <Loader2 className="h-4 w-4" /> Retry
                </Button>
              </div>
            ) : (
              <ul className="py-4 px-4">
                {categories.map((department) => {
                  const IconComponent = getDepartmentIcon(department.name);
                  return (
                    <li key={department.id} className="py-1">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start py-2 px-4 text-left min-h-[50px] h-auto flex items-center gap-2`}
                        onClick={() => setActiveCategory(department.name)}
                      >
                        <IconComponent className="mr-2 flex-shrink-0" />{" "}
                        {/* Icon */}
                        <div className="flex flex-col min-w-0">
                          {department.name.split(" ").map((word, index) => (
                            <span
                              key={index}
                              className="whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                              {word}
                            </span>
                          ))}
                        </div>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        )}

        {/* Right Content Area */}
        <main
          className={`flex-1 ${activeSection !== "inventory" ? "w-full" : ""}`}
        >
          {/* Inventory Section */}
          {activeSection === "inventory" && (
            <div className="h-full flex flex-col">
              {activeCategory && (
                <div className="flex-1">
                  <EquipmentInventory />
                </div>
              )}
            </div>
          )}

          {/* Reserve Section */}
          {activeSection === "reserve" && (
            <div className="p-4 h-full">
              <h2 className="text-2xl font-bold mb-4">Reserve</h2>
              {/* Reserve section content */}
            </div>
          )}

          {/* Manage Section */}
          {activeSection === "manage" && (
            <div className="h-full">
              <EquipmentManage initialItems={initialCheckedOutItems} />
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
