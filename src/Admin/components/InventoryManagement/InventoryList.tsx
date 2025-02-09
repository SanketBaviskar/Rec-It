import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, EllipsisVertical, Loader2, Trash } from "lucide-react";
import { Category, InventoryListProps } from "./InventorymanagementIntetrface";
import { deleteEquipmentById } from "@/Services/Api/Admin/Equipment/deleteEquipment";

const InventoryList: React.FC<InventoryListProps> = ({
  categories,
  onAddEquipment,
  onEditEquipment,
  onDeleteEquipment,
  onDeleteCategory,
  isLoading = false,
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    id: string;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      new Set(prev).has(id)
        ? new Set([...prev].filter((i) => i !== id))
        : new Set([...prev, id])
    );
  };

  const handleCategoryAction = (category: Category) => {
    // Check if category has equipment to toggle expand
    if (category.equipments && category.equipments.length > 0) {
      toggleExpand(category.id);
    } else {
      setSelectedCategory({ name: category.name, id: category.id });
    }
  };

  const renderCategory = (category: Category) => {
    // Check for equipment to determine if we show chevron
    const hasChildren = category.equipments && category.equipments.length > 0;
    return (
      <div key={category.id} className="group relative">
        <div
          className="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-accent"
          onClick={() => handleCategoryAction(category)}
          onKeyDown={(e) => e.key === "Enter" && handleCategoryAction(category)}
          tabIndex={0}
        >
          {hasChildren ? (
            <ChevronRight
              className={`h-4 w-4 transition-transform ${expanded.has(category.id) ? "rotate-90" : ""
                }`}
            />
          ) : (
            <div className="w-4" />
          )}
          <span className="ml-1">{category.name}</span>
          {/* Always show action menu if onAddEquipment exists */}
          {onAddEquipment && (
            <div
              className="p-2 hover:bg-accent/50 rounded-sm ml-auto"
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(activeMenu === category.id ? null : category.id);
              }}
            >
              <EllipsisVertical className="h-4 w-4" />
            </div>
          )}
        </div>
        {activeMenu === category.id && (
          <div
            ref={menuRef}
            className="absolute left-full top-0 ml-1 z-10 bg-white shadow-lg rounded-md p-2 border min-w-[200px]"
          >
            <div
            //add equipment code
              className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
              onClick={() => {
              onAddEquipment?.(category.id, category.name);
              setActiveMenu(null);
              }}
            >
              Add Equipment
            </div>
            {onDeleteCategory && (
              //delete equipment code
              <div
                className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm text-destructive font-medium"
                onClick={() => {
                  onDeleteCategory(category.id);
                  setActiveMenu(null);
                }}
              >
                Delete Inventory
              </div>
            )}
          </div>
        )}
        {/* Show equipment list when expanded */}
        {expanded.has(category.id) && hasChildren && (
          <div className="ml-4">
            {category.equipments?.map((equipment) => (
              <div
                key={equipment.id}
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-accent cursor-pointer group"
                onClick={() => onEditEquipment?.(equipment.id)}
              >
                <span className="ml-4 flex-1">{equipment.name}</span>
                <button
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-accent/50 rounded-sm"
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await deleteEquipmentById(equipment.id); // Call the API
                      onDeleteEquipment?.(equipment.id); // Update the UI
                    } catch (error) {
                      console.error("Failed to delete equipment:", error);
                    }
                  }}
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1" role="tree">
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Category Details</h3>
            <p className="font-medium">Name: {selectedCategory.name}</p>
            <p className="font-medium">ID: {selectedCategory.id}</p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="p-2 text-sm flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading categories...</span>
        </div>
      ) : categories.length > 0 ? (
        categories.map(renderCategory)
      ) : (
        <p className="text-sm px-2">No categories available</p>
      )}
    </div>
  );
};

export default InventoryList;