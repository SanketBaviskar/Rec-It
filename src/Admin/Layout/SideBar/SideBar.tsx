import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  onSelect: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionName: string) => {
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
    <div className="h-[calc(100vh-4rem)] bg-gray-800 text-white p-4 overflow-y-auto scrollbar-hide">
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.name} className="group">
            <div
              onClick={() => {
                if (item.subItems) {
                  toggleSection(item.name);
                } else {
                  onSelect(item.name);
                }
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
            {item.subItems && openSections[item.name] && (
              <ul className="mt-1 ml-4 space-y-1">
                {item.subItems.map((subItem) => (
                  <li
                    key={subItem}
                    className="p-2 text-sm rounded-md cursor-pointer hover:bg-gray-700"
                    onClick={() => onSelect(subItem)}
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
