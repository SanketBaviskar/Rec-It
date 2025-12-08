import { InventoryData } from "@/types/inventoryData";
import apiClient from "@/services/Utils/apiClient"

export const addInventory = async (inventoryData: InventoryData) => {
  try {
    const response = await apiClient.post("/inventories/", inventoryData);
    return response.data;
  } catch (error) {
    console.error("Error adding inventory:", error);
    throw error; // Propagate error to handle it in the component
  }
};
