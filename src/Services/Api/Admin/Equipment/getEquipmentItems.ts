import apiClient from "@/Services/Utils/apiClient";

export interface EquipmentItem {
	id: number;
	equipmentId: number;
	serialNumber: string;
	barcode: string | null;
	status: string;
	condition: string;
	notes: string | null;
}

export const getEquipmentItems = async (id: string, params = {}) => {
	try {
		const response = await apiClient.get(`/equipments/${id}/items`, {
			params,
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching equipment items:", error);
		throw error;
	}
};
