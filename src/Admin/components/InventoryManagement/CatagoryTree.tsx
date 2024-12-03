import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

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

  const renderCategoryTree = (categories: Category[], level = 0) => {
    if (categories.length === 0) {
      return (
        <p className="text-muted-foreground text-sm">No categories available.</p>
      );
    }

    return categories.map((category) => (
      <div
        key={category.id}
        role="treeitem"
        aria-expanded={expandedCategories.has(category.id)}
      >
        <div
          className={`flex items-center gap-2 px-2 py-1.5 hover:bg-accent cursor-pointer`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            onCategorySelect(category.id);
            if (category.subCategories?.length) {
              toggleCategory(category.id);
            }
          }}
        >
          {category.subCategories?.length ? (
            <span
              className={`transform transition-transform duration-300 ${
                expandedCategories.has(category.id) ? "rotate-90" : ""
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </span>
          ) : (
            <div className="w-4" />
          )}
          <span>{category.name}</span>
          <span className="text-muted-foreground text-sm ml-auto">
            ({category.items})
          </span>
        </div>
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
