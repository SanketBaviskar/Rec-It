export interface Category {
  id: string;
  name: string;
  items: number;
  subCategories?: Category[];
}
export interface InventoryListProps {
    categories: Category[];
    onCategorySelect: (categoryId: string) => void;
    onAddEquipment?: (categoryId: string) => void;
    onDeleteCategory?: (categoryId: string) => void; // Add this
    isLoading?: boolean;
  }
export const categories: Category[] = [
  {
    id: "1",
    name: "Sports Equipment",
    items: 10,
    subCategories: [
      { id: "1-1", name: "Basketball", items: 5 },
      { id: "1-2", name: "Volleyball", items: 2 },
      { id: "1-3", name: "Table Tennis", items: 8 },
    ],
  },
  {
    id: "2",
    name: "Outdoor Adventure",
    items: 10,
    subCategories: [
      { id: "2-1", name: "Bike Shop", items: 5 },
      { id: "2-2", name: "Rental Shop", items: 5 },
    ],
  },
  {
    id: "3",
    name: "Clothing",
    items: 10,
    subCategories: [{ id: "2-1", name: "Bike Shop", items: 5 },],
  },
];
