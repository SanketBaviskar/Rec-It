import apiClient from "@/services/Utils/apiClient";
import {
	Pass,
	UserPass,
	CreatePassDTO,
	UpdatePassDTO,
	PurchasePassDTO,
} from "@/services/Api/Pass/passApi";

/**
 * Create a new pass type (admin only)
 */
export const createPass = async (data: CreatePassDTO): Promise<Pass> => {
	try {
		const response = await apiClient.post("/passes/", data);
		return response.data.data;
	} catch (error) {
		console.error("Error creating pass:", error);
		throw error;
	}
};

/**
 * Update an existing pass type (admin only)
 */
export const updatePass = async (
	id: number,
	data: UpdatePassDTO,
): Promise<Pass> => {
	try {
		const response = await apiClient.put(`/passes/${id}`, data);
		return response.data.data;
	} catch (error) {
		console.error("Error updating pass:", error);
		throw error;
	}
};

/**
 * Delete a pass type (admin only)
 */
export const deletePass = async (id: number): Promise<void> => {
	try {
		await apiClient.delete(`/passes/${id}`);
	} catch (error) {
		console.error("Error deleting pass:", error);
		throw error;
	}
};

/**
 * Purchase a pass for a user (sales action)
 */
export const purchasePass = async (
	data: PurchasePassDTO,
): Promise<UserPass> => {
	try {
		const response = await apiClient.post("/passes/purchase", data);
		return response.data.data;
	} catch (error) {
		console.error("Error purchasing pass:", error);
		throw error;
	}
};

/**
 * Use a visit from a user's pass (admin/staff action)
 */
export const usePassVisit = async (userPassId: number): Promise<UserPass> => {
	try {
		const response = await apiClient.post(`/passes/use/${userPassId}`);
		return response.data.data;
	} catch (error) {
		console.error("Error using pass visit:", error);
		throw error;
	}
};

// Re-export DTO types for convenience
export type { CreatePassDTO, UpdatePassDTO, PurchasePassDTO };
