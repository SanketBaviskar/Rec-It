export interface Category {
  id: string;
  name: string;
  items: number;
  equipments?: Equipment[];
}
interface Equipment {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface InventoryListProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
  onAddEquipment?: (categoryId: string) => void;
  onDeleteCategory?: (categoryId: string) => void;
  onEditEquipment?: (equipmentId: string) => void;
  isLoading?: boolean;
}
export const dummy_categories: Category[] = [
  {
    id: "1",
    name: "Sports Equipment",
    items: 10,
    equipments: [
      { id: "1-1", name: "Basketball", items: 5, subCategories: [] },
      { id: "1-2", name: "Volleyball", items: 2 },
      { id: "1-3", name: "Table Tennis", items: 8 },
    ],
  },
  {
    id: "2",
    name: "Outdoor Adventure",
    items: 10,
    equipments: [
      { id: "2-1", name: "Bike Shop", items: 5 },
      { id: "2-2", name: "Rental Shop", items: 5 },
    ],
  },
  {
    id: "3",
    name: "Clothing",
    items: 10,
    equipments: [{ id: "2-1", name: "Bike Shop", items: 5 },],
  },
];
