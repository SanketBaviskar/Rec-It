import apiClient from "@/Services/Utils/apiClient";

export const fetchInventoryCategories = async () => {
  try {
    const response = await apiClient.get("/inventories/");
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory categories:", error);
    throw error;
  }
};
