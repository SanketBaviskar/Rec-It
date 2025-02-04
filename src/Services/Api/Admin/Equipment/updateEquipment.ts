import apiClient from "@/Services/Utils/apiClient";

export const updateEquipment = async (equipmentId: string, data: any) => {
  try {
    const response = await apiClient.put(`/equipments/${equipmentId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating equipment:", error);
    throw error;
  }
};