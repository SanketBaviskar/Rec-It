import apiClient from "@/Services/Utils/apiClient";

export const getEquipmentById = async (equipmentId: string) => {
  try {
    const response = await apiClient.get(`/equipments/${equipmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching equipment:", error);
    throw error;
  }
};