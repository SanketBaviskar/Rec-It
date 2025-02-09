import apiClient from "@/Services/Utils/apiClient";

export const createEquipment = async (EquipmentId:number, data:any ) => {
  try {
    const response = await apiClient.post("/equipments", data);
    return response.data;
  } catch (error) {
    console.error("Error creating equipment:", error);
    throw error;
  }
};