import apiClient from "@/services/Utils/apiClient";
import { Space } from "@/services/Api/Space/spaceApi";

export interface Zone {
	id: number;
	name: string;
	description?: string;
	rules?: string;
	timings?: string;
	spaces?: Space[];
	createdAt: string;
	updatedAt: string;
}

export const getAllZones = async (): Promise<Zone[]> => {
	try {
		const response = await apiClient.get<{
			data: Zone[] | { items: Zone[] };
		}>("/zones");
		// Handle both array and items wrapper
		const result = response.data.data;
		return Array.isArray(result) ? result : result.items || [];
	} catch (error) {
		console.error("Error fetching zones:", error);
		throw error;
	}
};

export const getZoneById = async (id: number): Promise<Zone> => {
	try {
		const response = await apiClient.get<{ data: Zone }>(`/zones/${id}`);
		return response.data.data;
	} catch (error) {
		console.error(`Error fetching zone ${id}:`, error);
		throw error;
	}
};

export const createZone = async (data: {
	name: string;
	description?: string;
	rules?: string;
	timings?: string;
}): Promise<Zone> => {
	try {
		const response = await apiClient.post<{ data: Zone }>("/zones", data);
		return response.data.data;
	} catch (error) {
		console.error("Error creating zone:", error);
		throw error;
	}
};

export const updateZone = async (
	id: number,
	data: {
		name?: string;
		description?: string;
		rules?: string;
		timings?: string;
	}
): Promise<Zone> => {
	try {
		const response = await apiClient.put<{ data: Zone }>(
			`/zones/${id}`,
			data
		);
		return response.data.data;
	} catch (error) {
		console.error("Error updating zone:", error);
		throw error;
	}
};

export const deleteZone = async (id: number): Promise<void> => {
	try {
		await apiClient.delete(`/zones/${id}`);
	} catch (error) {
		console.error("Error deleting zone:", error);
		throw error;
	}
};
