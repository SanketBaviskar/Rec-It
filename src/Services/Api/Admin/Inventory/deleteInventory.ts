import apiClient from "@/Services/Utils/apiClient"

export const deleteInventory = async (inventoryId: number) => {
  try {
    const response = await apiClient.delete(`/inventories/${inventoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting inventory:", error);  // Fixed typo here
    throw error;
  }
};