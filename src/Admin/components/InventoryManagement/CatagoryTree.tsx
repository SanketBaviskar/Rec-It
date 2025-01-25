import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronRight, EllipsisVertical, Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  items: number;
  subCategories?: Category[];
}

interface CategoryTreeProps {
  categories: Category[];
  onCategorySelect: (categoryId: string | null) => void;
  onAddEquipment?: (categoryId: string) => void;
  isLoading?: boolean;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onCategorySelect,
  onAddEquipment,
  isLoading = false
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleExpand = useCallback((id: string) => {
    setExpanded(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleCategoryClick = useCallback((category: Category) => {
    onCategorySelect(category.id);
    if (category.subCategories?.length) toggleExpand(category.id);
  }, [onCategorySelect, toggleExpand]);

  const menuActions = useMemo(() => [
    { 
      label: "Add Equipment", 
      action: (categoryId: string) => onAddEquipment?.(categoryId) 
    },
    { label: "Delete Equipment", action: () => {} },
    { label: "Rename", action: () => {} },
  ], [onAddEquipment]);

  const renderCategory = useCallback((category: Category, level: number) => (
    <div key={category.id} className="group relative">
      <div 
        className="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-accent"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCategoryClick(category);
          if (e.key === 'ArrowRight' && !expanded.has(category.id)) toggleExpand(category.id);
          if (e.key === 'ArrowLeft' && expanded.has(category.id)) toggleExpand(category.id);
        }}
      >
        <div 
          className="flex-1 flex items-center" 
          onClick={() => handleCategoryClick(category)}
        >
          {category.subCategories?.length ? (
            <ChevronRight
              className={`h-4 w-4 transition-transform ${
                expanded.has(category.id) ? "rotate-90" : ""
              }`}
            />
          ) : (
            <div className="w-4" />
          )}
          <span className="ml-1">{category.name}</span>
        </div>

        {category.subCategories?.length && (
          <div
            className="p-2 hover:bg-accent/50 rounded-sm"
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
          className="absolute z-10 bg-white shadow-lg rounded-md p-2 border"
          style={{
            left: 'calc(100% - 16px)', // Adjust this value as needed
            top: '0',
            minWidth: '200px' // Ensure the menu has a minimum width
          }}
        >
          {menuActions.map((item) => (
            <div
              key={item.label}
              className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
              onClick={() => {
                item.action(category.id);
                setActiveMenu(null);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}

      {expanded.has(category.id) && category.subCategories && (
        <div className="ml-4">
          {category.subCategories.map((subCategory) =>
            renderCategory(subCategory, level + 1)
          )}
        </div>
      )}
    </div>
  ), [expanded, activeMenu, handleCategoryClick, menuActions, toggleExpand]);

  return (
    <div className="space-y-1" role="tree">
      {isLoading ? (
        <div className="p-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : categories.length > 0 ? (
        categories.map((category) => renderCategory(category, 0))
      ) : (
        <p className="text-muted-foreground text-sm px-2">
          No categories available
        </p>
      )}
    </div>
  );
};

export default CategoryTree;