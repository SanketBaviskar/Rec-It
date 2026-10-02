export interface Inventory {
  id: number;
  name: string;
  items: number;
  equipments?: Equipment[];
}
export interface Equipment {
  id?: number; // Assigned by the backend
  name: string;
  code: string;
  image?: string;
  quantity: number;
  price: number;
  replacementFees?: number;
  description?: string;
  location: string;
  inventoryId: number;
}
export interface InventoryListProps {
  categories: Inventory[];
  onComplete?: () => void;
  onInventorySelect: (inventoryId: number) => void;
  onAddEquipment?: (inventoryId: number, inventoryName: string) => void;
  onEditEquipment?: (equipmentId: number) => void;
  onDeleteEquipment?: (equipmentId: number) => void;
  onDeleteInventory?: (inventoryId: number) => void;
  onOpenEquipment?: (equipmentId: number) => void;
  isLoading?: boolean;
}

export interface AddNewEquipmentFormProps {
  onComplete: () => void;
  inventoryId?: string;
  inventoryName?: string;
  mode?: 'create' | 'edit' ;// Received from parent component
  equipment?: Equipment & { inventory?: { name: string } };
  equipmentId:string;
}