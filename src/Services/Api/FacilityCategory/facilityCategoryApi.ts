import apiClient from "@/services/Utils/apiClient";

export interface FacilityCategory {
	id: number;
	name: string;
	description?: string;
	facilities?: Facility[];
	createdAt: string;
	updatedAt: string;
}

export interface Facility {
	id: number;
	categoryId: number;
	name: string;
	description?: string;
	capacity?: number;
	location?: string;
	managerId?: number;
	status: "available" | "maintenance" | "closed" | "occupied";
	category?: FacilityCategory;
	manager?: {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
	};
	createdAt: string;
	updatedAt: string;
}

export const getFacilityCategories = async (): Promise<FacilityCategory[]> => {
	try {
		const response = await apiClient.get<{
			data: FacilityCategory[] | { items: FacilityCategory[] };
		}>("/facility-categories");
		// Handle both array and items wrapper
		const result = response.data.data;
		return Array.isArray(result) ? result : result.items || [];
	} catch (error) {
		console.error("Error fetching facility categories:", error);
		throw error;
	}
};

export const createFacilityCategory = async (data: {
	name: string;
	description?: string;
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

export const updateFacilityCategory = async (
	id: number,
	data: {
		name?: string;
		description?: string;
	}
): Promise<FacilityCategory> => {
	try {
		const response = await apiClient.put<{ data: FacilityCategory }>(
			`/facility-categories/${id}`,
			data
		);
		return response.data.data;
	} catch (error) {
		console.error("Error updating facility category:", error);
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
