import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { RegisteredComponents } from "../../components/componentRegistry";

interface SidebarProps {
  onItemClick: (componentName: RegisteredComponents) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionName: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const menuItems = [
    { 
      name: "General Settings",
      subItems: [] as RegisteredComponents[]
    },
    { 
      name: "Access",
      subItems: [
        "Access Settings",
        "Access Profiles",
        "Identification Types",
        "Suspension Settings"
      ] as RegisteredComponents[]
    },
    {
      name: "Inventory Management",
      subItems: ["Manage Inventory", "Reports"] as RegisteredComponents[]
    },
    {
      name: "Memberships and Passes",
      subItems: ["Membership Settings", "Passes Settings"] as RegisteredComponents[]
    },
    {
      name: "Member Settings",
      subItems: ["Member Types"]
    }
  ];

  return (
    <div className="h-full bg-gray-800 text-white p-4 overflow-y-auto">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <div
              onClick={() => {
                if (!item.subItems.length) onItemClick(item.name as RegisteredComponents);
                toggleSection(item.name);
              }}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                item.subItems.length ? "hover:bg-gray-700" : "hover:bg-gray-600"
              }`}
            >
              <span className="text-sm font-medium">{item.name}</span>
              {item.subItems.length > 0 && (
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    openSections[item.name] ? "rotate-90" : ""
                  }`}
                />
              )}
            </div>

            {item.subItems.length > 0 && openSections[item.name] && (
              <ul className="ml-4 space-y-1">
                {item.subItems.map((subItem) => (
                  <li
                    key={subItem}
                    className="p-2 text-sm rounded-md cursor-pointer hover:bg-gray-700"
                    onClick={() => onItemClick(subItem as RegisteredComponents)}
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