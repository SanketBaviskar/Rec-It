import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

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
    { name: "Access",
      subItems: ["Access Settings", "Access Profiles", "Identification Types", "Suspension Settings"],
    },
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
    { name: "Services" },
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
              role="menuitem"
              aria-expanded={!!openSections[item.name]}
            >
              <span className="text-sm font-medium">{item.name}</span>
              {item.subItems && (
                <span
                  className={`transform transition-transform duration-300 ${
                    openSections[item.name] ? "rotate-90" : ""
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </div>

            {/* Submenu with Animation */}
            {item.subItems && (
              <ul
                className={`mt-1 ml-4 space-y-1 submenu ${
                  openSections[item.name] ? "submenu-expanded" : "submenu-collapsed"
                }`}
                role="menu"
              >
                {item.subItems.map((subItem) => (
                  <li
                    key={subItem}
                    className="p-2 text-sm rounded-md cursor-pointer hover:bg-gray-700"
                    onClick={() => onItemClick(subItem)}
                    role="menuitem"
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
