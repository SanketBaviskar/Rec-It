import apiClient from "@/services/Utils/apiClient";

export interface Equipment {
	id: number;
	name: string;
	code: string;
	image: string | null;
	quantity: number;
	price: number;
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

export interface PaginatedResponse<T> {
	items: T[];
	nextCursor: number | null;
	hasMore: boolean;
}

export const fetchEquipments = async (
	inventoryId?: number,
	cursor?: number,
	limit?: number
): Promise<ApiResponse<PaginatedResponse<Equipment>>> => {
	try {
		const params = new URLSearchParams();
		if (inventoryId) params.append("inventoryId", inventoryId.toString());
		if (cursor) params.append("cursor", cursor.toString());
		if (limit) params.append("limit", limit.toString());

		const response = await apiClient.get(
			`/equipments?${params.toString()}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching equipments:", error);
		throw error;
	}
};
