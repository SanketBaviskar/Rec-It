import apiClient from "@/Services/Utils/apiClient";

export const updateEquipmentItem = async (itemId: string, data: any) => {
	try {
		const response = await apiClient.put(
			`/equipments/items/${itemId}`,
			data
		);
		return response.data;
	} catch (error) {
		console.error("Error updating equipment item:", error);
		throw error;
	}
};
