import apiClient from "@/Services/Utils/apiClient";

export interface Equipment {
	id: number;
	name: string;
	code: string;
	image: string | null;
	quantity: number;
	replacementFees: number;
	description: string | null;
	location: string;
	inventoryId: number;
	createdAt: string;
	updatedAt: string;
}

interface ApiResponse<T> {
	status: string;
	data: T;
	message: string;
}

export const fetchEquipments = async (
	inventoryId?: number
): Promise<ApiResponse<Equipment[]>> => {
	try {
		const params = new URLSearchParams();
		if (inventoryId) params.append("inventoryId", inventoryId.toString());

		const response = await apiClient.get(
			`/equipments?${params.toString()}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching equipments:", error);
		throw error;
	}
};
