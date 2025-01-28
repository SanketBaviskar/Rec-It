import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronRight, EllipsisVertical, Loader2 } from "lucide-react";
import {  Category, CategoryTreeProps, } from "./dummy";


const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onAddEquipment,
  isLoading = false
}) => {
  // State management
  const [expanded, setExpanded] = useState<Set<string>>(new Set()); // Tracks expanded categories
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // Tracks active context menu
  const [selectedCategory, setSelectedCategory] = useState<{ // Stores selected leaf category info
    name: string;
    id: string;
  } | null>(null);

  // Ref for handling clicks outside context menu
  const menuRef = useRef<HTMLDivElement>(null);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle category expansion state
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

  // Wrap onDeleteCategory in useCallback
  const onDeleteCategory = useCallback((categoryId: string) => {
    console.log("Delete category", categoryId);
  }, []);

  // Handle leaf category click (no subcategories)
  const handleLeafClick = useCallback((category: Category) => {
    if (!category.subCategories?.length) {
      setSelectedCategory({ name: category.name, id: category.id });
    }
  }, []);

  // Main category click handler
  const handleCategoryClick = useCallback((category: Category) => {
    
    if (category.subCategories?.length) {
      toggleExpand(category.id); // Toggle expansion for parent categories
    } else {
      handleLeafClick(category); // Show popup for leaf categories
    }
  }, [ toggleExpand, handleLeafClick]);

  // Context menu actions
  const menuActions = useMemo(() => [
    { 
      label: "Add Equipment", 
      action: (categoryId: string) => onAddEquipment?.(categoryId) 
    },
    {
      label: "Delete Category",
      action: (categoryId: string) => onDeleteCategory(categoryId)
    }
  ], [onAddEquipment, onDeleteCategory]);

  

  // Recursive category renderer
  const renderCategory = useCallback((category: Category, level: number) => (
    <div key={category.id} className="group relative">
      {/* Category row container */}
      <div 
        className="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-accent"
        tabIndex={0}
        onKeyDown={(e) => {
          // Keyboard navigation support
          if (e.key === 'Enter') handleCategoryClick(category);
          if (e.key === 'ArrowRight' && !expanded.has(category.id)) toggleExpand(category.id);
          if (e.key === 'ArrowLeft' && expanded.has(category.id)) toggleExpand(category.id);
        }}
      >
        {/* Main category content */}
        <div 
          className="flex-1 flex items-center" 
          onClick={() => handleCategoryClick(category)}
        >
          {/* Expand/collapse indicator */}
          {category.subCategories?.length ? (
            <ChevronRight
              className={`h-4 w-4 transition-transform ${
                expanded.has(category.id) ? "rotate-90" : ""
              }`}
            />
          ) : (
            <div className="w-4" /> // Spacer for alignment
          )}
          <span className="ml-1">{category.name}</span>
        </div>
        {/* Context menu trigger */}
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
      
      {/* Context menu dropdown */}
      {activeMenu === category.id && (
        <div
          ref={menuRef}
          className="absolute z-10 bg-white shadow-lg rounded-md p-2 border"
          style={{
            left: 'calc(100% - 16px)',
            top: '0',
            minWidth: '200px'
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
      {/* Recursive subcategory rendering */}
      {expanded.has(category.id) && category.subCategories && (
        <div className="ml-4">
          {category.subCategories.map((subCategory) =>
            renderCategory(subCategory, level + 1)
          )}
        </div>
      )}
    </div>
  ), [expanded, activeMenu, handleCategoryClick, menuActions, toggleExpand]);

  // Category details popup component
  const CategoryPopup = () => {
    if (!selectedCategory) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4">Category Details</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {selectedCategory.name}</p>
            <p><span className="font-medium">ID:</span> {selectedCategory.id}</p>
          </div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  // Main component render
  return (
    <div className="space-y-1" role="tree">
      {/* Category details popup */}
      <CategoryPopup />
      
      {/* Loading state */}
      {isLoading ? (
        <div className="p-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        // Empty state or categories list
        categories.length > 0 ? (
          categories.map((category) => renderCategory(category, 0))
        ) : (
          <p className="text-muted-foreground text-sm px-2">
            No categories available
          </p>
        )
      )}
    </div>
  );
};

export default CategoryTree;