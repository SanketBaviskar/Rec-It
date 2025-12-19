import apiClient from "@/Services/Utils/apiClient";

export const deleteEquipmentItem = async (itemId: string) => {
	try {
		const response = await apiClient.delete(`/equipments/items/${itemId}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting equipment item:", error);
		throw error;
	}
};
