import apiClient from "@/Services/Utils/apiClient";

export const deleteEquipmentById = async (equipmentId: string) => {
  try {
    const response = await apiClient.delete(`/equipments/${equipmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting equipment:", error);
    throw error;
  }
};