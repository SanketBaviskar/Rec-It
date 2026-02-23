import apiClient from "@/services/Utils/apiClient";
import {
	Membership,
	CreateMembershipDTO,
	UpdateMembershipDTO,
	AssignMembershipDTO,
} from "@/services/Api/Membership/membershipApi";

/**
 * Create a new membership plan (admin only)
 */
export const createMembership = async (
	data: CreateMembershipDTO,
): Promise<Membership> => {
	try {
		const response = await apiClient.post("/memberships/", data);
		return response.data.data;
	} catch (error) {
		console.error("Error creating membership:", error);
		throw error;
	}
};

/**
 * Update an existing membership plan (admin only)
 */
export const updateMembership = async (
	id: number,
	data: UpdateMembershipDTO,
): Promise<Membership> => {
	try {
		const response = await apiClient.put(`/memberships/${id}`, data);
		return response.data.data;
	} catch (error) {
		console.error("Error updating membership:", error);
		throw error;
	}
};

/**
 * Delete a membership plan (admin only)
 */
export const deleteMembership = async (id: number): Promise<void> => {
	try {
		await apiClient.delete(`/memberships/${id}`);
	} catch (error) {
		console.error("Error deleting membership:", error);
		throw error;
	}
};

/**
 * Assign a membership to a user (admin/sales action)
 */
export const assignMembershipToUser = async (
	data: AssignMembershipDTO,
): Promise<{ id: number; userId: number; membershipId: number }> => {
	try {
		const response = await apiClient.post(
			"/memberships/assignMembershipToUser",
			data,
		);
		return response.data.data;
	} catch (error) {
		console.error("Error assigning membership:", error);
		throw error;
	}
};

// Re-export DTO types for convenience
export type { CreateMembershipDTO, UpdateMembershipDTO, AssignMembershipDTO };
