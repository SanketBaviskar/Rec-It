// Import necessary React hooks and components
import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, EllipsisVertical, Loader2 } from "lucide-react";
import { Category, CategoryTreeProps } from "./dummy";

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onAddEquipment,
  isLoading = false,
}) => {
  // State management for expanded/collapsed categories
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  // Track which category's context menu is active
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // Store selected category details for modal display
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    id: string;
  } | null>(null);
  // Reference for detecting clicks outside context menu
  const menuRef = useRef<HTMLDivElement>(null);

  // Effect to close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle expand/collapse state for categories
  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      new Set(prev).has(id)
        ? new Set([...prev].filter((i) => i !== id))
        : new Set([...prev, id])
    );
  };

  // Handle category click - expand if has children, else select
  const handleCategoryAction = (category: Category) => {
    if (category.subCategories?.length) {
      toggleExpand(category.id);
    } else {
      setSelectedCategory({ name: category.name, id: category.id });
    }
  };

  // Recursive function to render categories and their subcategories
  const renderCategory = (category: Category) => {
    const hasChildren =
      category.subCategories && category.subCategories.length > 0;

    return (
      <div key={category.id} className="group relative">
        {/* Category row with interactive elements */}
        <div
          className="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-accent"
          onClick={() => handleCategoryAction(category)}
          onKeyDown={(e) => e.key === "Enter" && handleCategoryAction(category)}
          tabIndex={0}
        >
          {/* Expand/collapse chevron icon */}
          {hasChildren ? (
            <ChevronRight
              className={`h-4 w-4 transition-transform ${
                expanded.has(category.id) ? "rotate-90" : ""
              }`}
            />
          ) : (
            <div className="w-4" /> // Spacer for alignment
          )}
          <span className="ml-1">{category.name}</span>

          {/* Context menu trigger for parent categories */}
          {hasChildren && (
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

        {/* Context menu with actions */}
        {activeMenu === category.id && (
          <div
            ref={menuRef}
            className="absolute left-full top-0 ml-1 z-10 bg-white shadow-lg rounded-md p-2 border min-w-[200px]"
          >
            <div
              className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
              onClick={() => {
                onAddEquipment?.(category.id);
                setActiveMenu(null);
              }}
            >
              Add Equipment
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
              onClick={() => {
                console.log("Delete category", category.id);
                setActiveMenu(null);
              }}
            >
              Delete Category
            </div>
          </div>
        )}

        {/* Recursively render subcategories if expanded */}
        {expanded.has(category.id) && hasChildren && (
          <div className="ml-4">
            {category.subCategories?.map(renderCategory)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1" role="tree">
      {/* Modal for displaying selected category details */}
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

      {/* Loading state */}
      {isLoading ? (
        <div className="p-2 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : categories.length > 0 ? (
        // Render category tree
        categories.map(renderCategory)
      ) : (
        // Empty state
        <p className="text-sm px-2">No categories available</p>
      )}
    </div>
  );
};

export default CategoryTree;
