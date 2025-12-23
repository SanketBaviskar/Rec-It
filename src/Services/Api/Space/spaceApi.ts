import apiClient from "@/services/Utils/apiClient";
import { Zone } from "@/services/Api/Zone/zoneApi";

export interface Space {
	id: number;
	zoneId: number;
	name: string;
	description?: string;
	capacity?: number;
	location?: string;
	rules?: string;
	timings?: string;
	managerId?: number;
	status: "available" | "maintenance" | "closed" | "occupied";
	zone?: Zone;
	manager?: {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
	};
	createdAt: string;
	updatedAt: string;
}

export const getAllSpaces = async (type?: string): Promise<Space[]> => {
	try {
		const response = await apiClient.get("/spaces", {
			params: { type: type === "all" ? undefined : type },
		});
		// Backend wraps arrays in { items: [] } or returns array directly
		const result = response.data.data;
		return Array.isArray(result) ? result : result.items || [];
	} catch (error) {
		console.error("Error fetching spaces:", error);
		throw error;
	}
};

export const getSpaceById = async (id: number): Promise<Space> => {
	try {
		const response = await apiClient.get(`/spaces/${id}`);
		return response.data.data;
	} catch (error) {
		console.error(`Error fetching space ${id}:`, error);
		throw error;
	}
};

export const getSpacesByZone = async (zoneId: number): Promise<Space[]> => {
	try {
		const response = await apiClient.get(`/spaces/zone/${zoneId}`);
		const result = response.data.data;
		return Array.isArray(result) ? result : result.items || [];
	} catch (error) {
		console.error(`Error fetching spaces for zone ${zoneId}:`, error);
		throw error;
	}
};

export const createSpace = async (data: {
	zoneId: number;
	name: string;
	description?: string;
	capacity?: number;
	location?: string;
	rules?: string;
	timings?: string;
	managerId?: number;
	status?: string;
}): Promise<Space> => {
	try {
		const response = await apiClient.post("/spaces", data);
		return response.data.data;
	} catch (error) {
		console.error("Error creating space:", error);
		throw error;
	}
};

export const updateSpace = async (
	id: number,
	data: Partial<{
		name: string;
		description: string;
		capacity: number;
		location: string;
		rules: string;
		timings: string;
		managerId: number;
		status: string;
	}>
): Promise<Space> => {
	try {
		const response = await apiClient.put(`/spaces/${id}`, data);
		return response.data.data;
	} catch (error) {
		console.error("Error updating space:", error);
		throw error;
	}
};

export const deleteSpace = async (id: string | number): Promise<void> => {
	try {
		await apiClient.delete(`/spaces/${id}`);
	} catch (error) {
		console.error(`Error deleting space ${id}:`, error);
		throw error;
	}
};
