import apiClient from "@/Services/Utils/apiClient";
import {
	FacilityCategory,
	Facility,
} from "@/services/Api/FacilityCategory/facilityCategoryApi";

export type { Facility };

export const fetchFacilities = async (type?: string): Promise<Facility[]> => {
	try {
		const response = await apiClient.get("/facilities", {
			params: { type: type === "all" ? undefined : type },
		});
		// Backend wraps arrays in { items: [] } or returns array directly
		const result = response.data.data;
		return Array.isArray(result) ? result : result.items || [];
	} catch (error) {
		console.error("Error fetching facilities:", error);
		throw error;
	}
};

export const fetchFacilityById = async (id: number): Promise<Facility> => {
	try {
		const response = await apiClient.get(`/facilities/${id}`);
		return response.data.data;
	} catch (error) {
		console.error(`Error fetching facility ${id}:`, error);
		throw error;
	}
};

export const fetchFacilitiesByCategory = async (
	categoryId: number
): Promise<Facility[]> => {
	try {
		const response = await apiClient.get(
			`/facilities/category/${categoryId}`
		);
		const result = response.data.data;
		return Array.isArray(result) ? result : result.items || [];
	} catch (error) {
		console.error(
			`Error fetching facilities for category ${categoryId}:`,
			error
		);
		throw error;
	}
};

export const createFacility = async (data: {
	categoryId: number;
	name: string;
	description?: string;
	capacity?: number;
	location?: string;
	managerId?: number;
	status?: string;
}): Promise<Facility> => {
	try {
		const response = await apiClient.post("/facilities", data);
		return response.data.data;
	} catch (error) {
		console.error("Error creating facility:", error);
		throw error;
	}
};

export const updateFacility = async (
	id: number,
	data: Partial<{
		name: string;
		description: string;
		capacity: number;
		location: string;
		managerId: number;
		status: string;
	}>
): Promise<Facility> => {
	try {
		const response = await apiClient.put(`/facilities/${id}`, data);
		return response.data.data;
	} catch (error) {
		console.error("Error updating facility:", error);
		throw error;
	}
};

export const deleteFacility = async (id: string | number): Promise<void> => {
	try {
		await apiClient.delete(`/facilities/${id}`);
	} catch (error) {
		console.error(`Error deleting facility ${id}:`, error);
		throw error;
	}
};
