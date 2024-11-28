import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  File,
  Package,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const menuItems = [
    {
      name: "Playground",
      icon: <File className="w-5 h-5" />,
      subItems: ["History", "Starred", "Settings"],
    },
    {
      name: "Models",
      icon: <Package className="w-5 h-5" />,
      subItems: ["Documentation", "Settings"],
    },
    {
      name: "Team",
      icon: <Users className="w-5 h-5" />,
      subItems: ["Members", "Roles"],
    },
  ];

  return (
    <div className="h-full w-64 bg-gray-900 text-white p-4 space-y-6">
      {/* Static Items */}
      <div className="space-y-4">
        {menuItems.map((item) => (
          <div key={item.name}>
            <div
              onClick={() => toggleSection(item.name)}
              className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                openSections[item.name] ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <span className="flex items-center space-x-3">
                {item.icon}
                <span>{item.name}</span>
              </span>
              {openSections[item.name] ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </div>
            {openSections[item.name] && (
              <ul className="mt-2 ml-6 space-y-2">
                {item.subItems.map((subItem) => (
                  <li
                    key={subItem}
                    className="flex items-center text-sm p-2 rounded-md cursor-pointer hover:bg-gray-700"
                  >
                    <span className="ml-2">{subItem}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
