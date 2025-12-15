export interface Inventory {
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
  categories: Inventory[];
  onComplete:() => void;
  onInventorySelect: (inventoryId: string) => void;
  onAddEquipment?: (inventoryId: string, inventoryName: string) => void;
  onEditEquipment?: (equipmentId: string) => void;
  onDeleteEquipment?: (equipmentId: string) => void;
  onDeleteInventory?: (inventoryId: string) => void;
  onOpenEquipment?: (equipmentId: string) => void;
  isLoading?: boolean;
}

export interface AddNewEquipmentFormProps {
  onComplete: () => void;
  inventoryId?: string;
  inventoryName?: string;
  mode?: 'create' | 'edit' ;// Received from parent component
  equipment:any;
  equipmentId:string;
}