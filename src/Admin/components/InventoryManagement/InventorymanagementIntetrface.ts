export interface Category {
  id: string;
  name: string;
  items: number;
  equipments?: Equipment[];
}
export interface Equipment {
  name: string;
  code: string;
  image?: any;
  quantity: number;
  price: number;
  replacementFees?: number;
  description?: string;
  location: string;
  inventoryId: number;
}
export interface InventoryListProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
  onAddEquipment?: (categoryId: string, catagoryName: string) => void;
  onEditEquipment?: (equipmentId: string) => void;
  onDeleteEquipment?: (equipmentId: string) => void;
  onDeleteCategory?: (categoryId: string) => void;
  isLoading?: boolean;
}
