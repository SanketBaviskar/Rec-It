import { InventoryData } from "@/Interface/inventoryData";
import apiClient from "@/Services/Utils/apiClient"

export const addInventory = async (inventoryData: InventoryData) => {
  try {
    const response = await apiClient.post("/inventories/", inventoryData);
    return response.data;
  } catch (error) {
    console.error("Error adding inventory:", error);
    throw error; // Propagate error to handle it in the component
  }
};
