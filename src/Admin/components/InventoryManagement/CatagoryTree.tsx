import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, EllipsisVertical } from "lucide-react";

interface Category {
  id: string;
  name: string;
  items: number;
  subCategories?: Category[];
}

interface CategoryTreeProps {
  categories: Category[];
  onCategorySelect: (categoryId: string | null) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onCategorySelect,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );


  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null); // Close the menu if clicking outside of it
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const updated = new Set(prev);
      if (updated.has(categoryId)) {
        updated.delete(categoryId);
      } else {
        updated.add(categoryId);
      }
      return updated;
    });
  };

  const handleMenuClick = (categoryId: string) => {
    if (activeMenu === categoryId) {
      setActiveMenu(null); // Close if already open
    } else {
      setActiveMenu(categoryId); // Open the menu for the clicked category
    }
  };

  const renderMenu = (categoryId: string) => {
    if (activeMenu === categoryId) {
      return (
        <div className="menu" ref={menuRef}>
          <ul className="bg-white shadow-lg rounded-md p-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={setActiveComponent("AddNewEquipment")}>
              Add Equipment
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Delete Equipment
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Rename
            </li>
          </ul>
        </div>
      );
    }
  };

  const renderCategoryTree = (categories: Category[], level = 0) => {
    if (categories.length === 0) {
      return (
        <p className="text-muted-foreground text-sm">
          No categories available.
        </p>
      );
    }

    return categories.map((category) => (
      <div
        key={category.id}
        role="treeitem"
        aria-expanded={expandedCategories.has(category.id)}
      >
        <div
          className="flex items-center gap-1 px-2 py-1.5 cursor-pointer"
          style={{ paddingLeft: `${level * 20 + 8}px` }}
        >
          {/* Left side: Chevron and Category Name */}
          <div
            className="flex-1 flex items-center hover:bg-accent cursor-pointer"
            onClick={() => {
              onCategorySelect(category.id);
              if (category.subCategories?.length) {
                toggleCategory(category.id);
              }
            }}
          >
            {category.subCategories?.length ? (
              <span
                className={`transform transition-transform duration-300 p-1 ${
                  expandedCategories.has(category.id) ? "rotate-90" : ""
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </span>
            ) : (
              <div className="w-4" /> // Empty space when no subcategories exist
            )}
            <span>{category.name}</span>
          </div>

          {/* Right side: Menu Icon */}
          {category.subCategories?.length > 0 && (
            <div
              className="hover:bg-accent p-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent category toggle when clicking the menu
                handleMenuClick(category.id);
              }}
            >
              <EllipsisVertical className="h-4 w-4" />
            </div>
          )}
        </div>
        {renderMenu(category.id)}
        {expandedCategories.has(category.id) && category.subCategories && (
          <div
            className={`submenu ${
              expandedCategories.has(category.id)
                ? "submenu-expanded"
                : "submenu-collapsed"
            }`}
          >
            {renderCategoryTree(category.subCategories, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return <div role="tree">{renderCategoryTree(categories)}</div>;
};

export default CategoryTree;
