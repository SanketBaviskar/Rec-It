import apiClient from "@/Services/Utils/apiClient";

export const fetchInventoryCategories = async () => {
  try {
    const response = await apiClient.get("/departments/");
    return response.data; // Returning the 'items' array directly
  } catch (error) {
    console.error("Error fetching inventory categories:", error);
    throw error;
  }
};
