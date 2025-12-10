import apiClient from "@/Services/Utils/apiClient";

export const getEquipmentItems = async (id: string, params = {}) => {
	try {
		const response = await apiClient.get(`/equipment/${id}/items`, {
			params,
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching equipment items:", error);
		throw error;
	}
};
