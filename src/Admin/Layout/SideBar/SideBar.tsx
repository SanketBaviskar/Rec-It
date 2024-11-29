import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const Sidebar = ({ onItemClick }) => {
  
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const menuItems = [
    { name: "General Settings" },
    { name: "Access" },
    { name: "Accounting" },
    { name: "Calendars" },
    { name: "Documents & Templates" },
    {
      name: "Facility",
      subItems: ["Facility Settings", "Facilities", "Facility Rental Products"],
    },
    { name: "Booking" },
    { name: "Guest Passes" },
    { name: "Integration" },
    {
      name: "Inventory Management",
      subItems: ["Manage Inventory", "Reports"],
    },
    { name: "Kiosk" },
    { name: "Locker Service" },
    { name: "Memberships" },
    { name: "Multi-Visit Passes" },
    { name: "Parking Permits" },
    { name: "Products & Equipment" },
    { name: "Programs" },
    { name: "Sales" },
    { name: "Security" },
    { name: "Towel Service" },
    { name: "Utilities" },
  ];

  return (
    <div className="h-full bg-gray-800 text-white p-4 overflow-y-auto scrollbar-hide">
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.name} className="group">
            {/* Main Menu Item */}
            <div
              onClick={() => {
                if (!item.subItems) onItemClick(item.name);
                toggleSection(item.name);
              }}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                item.subItems
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-700 bg-transparent"
              }`}
            >
              <span className="text-sm font-medium">{item.name}</span>
              {item.subItems && (
                <span>
                  {openSections[item.name] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </span>
              )}
            </div>

            {/* Submenu */}
            {item.subItems && openSections[item.name] && (
              <ul className="mt-1 ml-4 space-y-1">
                {item.subItems.map((subItem) => (
                  <li
                    key={subItem}
                    className="p-2 text-sm rounded-md cursor-pointer hover:bg-gray-700"
                    onClick={() => onItemClick(subItem)}
                  >
                    {subItem}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
