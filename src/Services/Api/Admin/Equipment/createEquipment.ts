import apiClient from "@/Services/Utils/apiClient";
import { Equipment } from "@/Admin/components/InventoryManagement/InventorymanagementIntetrface";

export const createEquipment = async (data: Equipment) => {
  try {
    const response = await apiClient.post("/equipments", data);
    return response.data;
  } catch (error) {
    console.error("Error creating equipment:", error);
    throw error;
  }
};