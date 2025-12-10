import apiClient from "@/services/Utils/apiClient";

export interface FacilityCategory {
	id: number;
	name: string;
	description?: string;
	location: string;
	manager?: string;
	capacity?: number;
	facilities?: any[]; // Keep flexible or use Facility interface
	createdAt: string;
	updatedAt: string;
}

export const getFacilityCategories = async (): Promise<FacilityCategory[]> => {
	try {
		const response = await apiClient.get<{
			data: { items: FacilityCategory[] };
		}>("/facility-categories");
		// Accessing data inside the wrapper as standard in this project
		return response.data.data.items;
	} catch (error) {
		console.error("Error fetching facility categories:", error);
		throw error;
	}
};

export const createFacilityCategory = async (data: {
	name: string;
	description?: string;
	location: string;
	manager?: string;
	capacity?: number;
}): Promise<FacilityCategory> => {
	try {
		const response = await apiClient.post<{ data: FacilityCategory }>(
			"/facility-categories",
			data
		);
		return response.data.data;
	} catch (error) {
		console.error("Error creating facility category:", error);
		throw error;
	}
};

export const deleteFacilityCategory = async (id: number): Promise<void> => {
	try {
		await apiClient.delete(`/facility-categories/${id}`);
	} catch (error) {
		console.error("Error deleting facility category:", error);
		throw error;
	}
};
