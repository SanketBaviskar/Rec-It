import apiClient from "@/Services/Utils/apiClient";

export interface EquipmentItem {
  id: number;
  equipmentId: number;
  serialNumber: string | null;
  status: string;
  condition: string;
}

export const getEquipmentItems = async (
  equipmentId: number | string
): Promise<EquipmentItem[]> => {
  const response = await apiClient.get(`/equipments/${equipmentId}/items`);
  return response.data.data.items;
};

export const deleteEquipmentItem = async (itemId: number) => {
  const response = await apiClient.delete(`/equipments/items/${itemId}`);
  return response.data;
};
